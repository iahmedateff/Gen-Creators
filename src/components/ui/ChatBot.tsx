"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, User, Bot, Sparkles, BookOpen, ArrowLeft } from 'lucide-react';
import { getChatResponse, COURSES_DATA } from '@/lib/gemini';
import { useBooking } from '@/providers/BookingProvider';

interface Message {
  role: 'user' | 'model';
  content: string;
  recommendation?: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "أهلاً بيك في Gen Creators! أنا مستشارك الذكي 🤖\n\nحابب أعرف اسمك وإيه المجال اللي مهتم بيه عشان أرشحلك أحسن كورس ليك؟" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const updatedMessages = [...messages, { role: 'user', content: userMessage } as Message];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const history = updatedMessages
        .filter((_, index) => index !== 0)
        .slice(0, -1)
        .map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }));

      const { text, recommendation } = await getChatResponse(history, userMessage);
      setMessages(prev => [...prev, { role: 'model', content: text, recommendation }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "آسف جداً، حصل مشكلة في الاتصال. جرب تسألني تاني؟ 😅" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const RecommendationCard = ({ courseKey }: { courseKey: string }) => {
    const course = COURSES_DATA.find(c => c.key === courseKey);
    if (!course) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg"
      >
        <div className={`bg-gradient-to-r ${course.color} p-4 text-white`}>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={16} />
            <span className="text-xs font-bold uppercase opacity-80">{course.type === 'track' ? 'مسار متكامل' : 'كورس'}</span>
          </div>
          <h4 className="text-lg font-black">{course.title}</h4>
          <p className="text-sm opacity-90 mt-0.5">{course.desc}</p>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-gray-900 dark:text-white">{course.price}</span>
            <span className="text-gray-500 text-sm mr-1">ج.م</span>
          </div>
          <button
            onClick={() => { openBooking(course.title, course.price); setIsOpen(false); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black bg-gradient-to-r ${course.color} text-white shadow-lg hover:scale-105 active:scale-95 transition-all`}
          >
            احجز الآن
            <ArrowLeft size={16} />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-16 h-16 bg-gradient-to-r from-primary to-[#ff8c00] rounded-full flex items-center justify-center shadow-2xl text-white outline-none border-4 border-white dark:border-[#111]"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
        {!isOpen && (
          <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white dark:border-[#111] animate-bounce"></span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[100] w-[90vw] sm:w-[420px] h-[580px] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
            dir="rtl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-[#ff8c00] text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-black">مستشار Gen Creators</h3>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block animate-pulse"></span>
                    ذكاء اصطناعي - نشط الآن
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow p-4 overflow-y-auto space-y-4 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div key={i}>
                  <div className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`flex gap-2 max-w-[90%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                        msg.role === 'user' ? 'bg-primary/10 text-primary' : 'bg-gradient-to-br from-primary/20 to-orange-400/20 text-primary'
                      }`}>
                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none shadow-md' 
                          : 'bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                  
                  {/* Inline Recommendation Card */}
                  {msg.recommendation && (
                    <div className="mt-2 mr-10">
                      <RecommendationCard courseKey={msg.recommendation} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-end">
                  <div className="flex gap-2 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-orange-400/20 text-primary flex items-center justify-center mt-1">
                      <Bot size={16} />
                    </div>
                    <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex-shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="اكتب هنا..."
                  className="w-full pl-14 pr-4 py-3.5 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-primary to-[#ff8c00] text-white rounded-xl disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
