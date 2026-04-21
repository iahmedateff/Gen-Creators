import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const COURSES_INFO = `
Available Courses:
1. Marketing (1200 EGP) - Digital campaigns, ads, results.
2. Programming (1800 EGP) - Web development from scratch.
3. Artificial Intelligence (2200 EGP) - Future tech, AI applications.
4. Business (1000 EGP) - Starting and managing projects.
5. Design (1300 EGP) - Graphic design, UI/UX.

Available Tracks (Integrated bundles):
1. Marketing Track (3000 EGP) - Marketing basics, campaign management, data analysis.
2. Programming Track (4000 EGP) - Programming basics, frontend development, databases, full applications.
3. AI Track (5000 EGP) - Intro to AI, Machine Learning, AI apps, practical projects.
4. Design Track (3200 EGP) - Design basics, UI/UX, visual identity, portfolio building.
`;

const systemInstruction = `You are the "Gen Creators AI Counselor". Your goal is to help users find the best course or track on our platform. 
Platform Context: ${COURSES_INFO}
Tone: Friendly, professional, and encouraging (use Egyptian Arabic primarily).
Rules:
1. Welcome the user and ask for their name, level, and interests.
2. Based on their level and interests, recommend one or two specific courses or tracks.
3. Explain WHY this choice is good for them.
4. If they seem interested in booking, tell them to click the "Book Now" button on the course card or visit the "Tracks" section.
5. Always be concise and use emojis.
`;

export async function getChatResponse(history: { role: string, parts: { text: string }[] }[], message: string) {
  // Try Gemini 2.0 Flash, fallback to lite version on rate limit
  try {
    return await callGemini("gemini-2.0-flash", history, message);
  } catch (error: any) {
    const is429 = error.message?.includes('429') || error.message?.includes('Resource exhausted');
    const is404 = error.message?.includes('404') || error.message?.includes('not found');
    if (is429 || is404) {
      console.warn('Primary model unavailable, falling back to gemini-2.0-flash-lite');
      return await callGemini("gemini-2.0-flash-lite", history, message);
    }
    throw error;
  }
}

async function callGemini(modelName: string, history: any[], message: string) {
  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: systemInstruction
  });

  const chat = model.startChat({
    history: history,
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}
