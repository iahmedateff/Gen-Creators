import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const COURSES_DATA = [
  { key: "Marketing", title: "Marketing", price: 1200, type: 'course', desc: "اتعلم تعمل حملات وإعلانات وتجيب نتايج", color: "from-pink-500 to-orange-400" },
  { key: "Programming", title: "Programming", price: 1800, type: 'course', desc: "ابني مواقع واشتغل كمبرمج من الصفر", color: "from-blue-500 to-cyan-400" },
  { key: "Artificial Intelligence", title: "Artificial Intelligence", price: 2200, type: 'course', desc: "ادخل مجال المستقبل واشتغل بالـ AI", color: "from-purple-500 to-indigo-500" },
  { key: "Business", title: "Business", price: 1000, type: 'course', desc: "ابدأ مشروعك واديره صح", color: "from-green-400 to-emerald-600" },
  { key: "Design", title: "Design", price: 1300, type: 'course', desc: "اشتغل جرافيك و UI/UX باحتراف", color: "from-yellow-400 to-orange-500" },
  { key: "Marketing Track", title: "Marketing Track", price: 3000, type: 'track', desc: "مسار متكامل من أساسيات التسويق لإدارة الحملات", color: "from-orange-500 to-red-600" },
  { key: "Programming Track", title: "Programming Track", price: 4000, type: 'track', desc: "مسار متكامل من الصفر لبناء تطبيقات كاملة", color: "from-blue-600 to-indigo-700" },
  { key: "AI Track", title: "AI Track", price: 5000, type: 'track', desc: "مسار متكامل في تعلم الآلة وتطبيقات الذكاء الاصطناعي", color: "from-purple-600 to-violet-800" },
  { key: "Design Track", title: "Design Track", price: 3200, type: 'track', desc: "مسار متكامل من أساسيات التصميم لبناء Portfolio", color: "from-pink-500 to-rose-600" },
];

const COURSES_INFO = COURSES_DATA.map(c => 
  `- ${c.title} (${c.price} EGP, ${c.type}): ${c.desc}`
).join('\n');

const systemInstruction = `You are the "Gen Creators AI Counselor". Your goal is to help users find the best course or track.
Platform offerings:
${COURSES_INFO}

Rules:
1. Welcome the user, ask for their name, level, and interests.
2. Based on their answers, recommend ONE specific course or track.
3. IMPORTANT: When you make a recommendation, you MUST end your message with this EXACT JSON tag (no markdown, no backticks):
   [RECOMMEND:CourseName]
   Where CourseName is EXACTLY one of: Marketing, Programming, Artificial Intelligence, Business, Design, Marketing Track, Programming Track, AI Track, Design Track
4. Only include ONE [RECOMMEND:...] tag per message.
5. Use Egyptian Arabic. Be friendly, concise, and use emojis.
`;

export async function getChatResponse(history: { role: string, parts: { text: string }[] }[], message: string): Promise<{ text: string; recommendation?: string }> {
  try {
    const raw = await callGemini("gemini-2.0-flash", history, message);
    return parseResponse(raw);
  } catch (error: any) {
    const is429 = error.message?.includes('429') || error.message?.includes('Resource exhausted');
    const is404 = error.message?.includes('404') || error.message?.includes('not found');
    if (is429 || is404) {
      console.warn('Primary model unavailable, falling back to gemini-2.0-flash-lite');
      const raw = await callGemini("gemini-2.0-flash-lite", history, message);
      return parseResponse(raw);
    }
    throw error;
  }
}

function parseResponse(raw: string): { text: string; recommendation?: string } {
  const match = raw.match(/\[RECOMMEND:([^\]]+)\]/);
  if (match) {
    const recommendation = match[1].trim();
    const text = raw.replace(/\[RECOMMEND:[^\]]+\]/, '').trim();
    return { text, recommendation };
  }
  return { text: raw };
}

async function callGemini(modelName: string, history: any[], message: string) {
  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: systemInstruction
  });

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}
