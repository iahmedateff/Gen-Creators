"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, BookOpen, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Enrollment {
  id: string;
  created_at: string;
  full_name: string;
  course_or_track: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function MyRequestsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let channel: any;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      
      const userEmail = session.user.email!;
      fetchMyEnrollments(userEmail);

      // Create a unique channel name for this user to avoid conflicts
      channel = supabase.channel(`user-requests-${userEmail.replace(/[@.]/g, '-')}`);
      
      channel
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'enrollments',
            filter: `email=eq.${userEmail}`
          },
          (payload: any) => {
            console.log('Real-time update received:', payload);
            setEnrollments(current => 
              current.map(e => e.id === payload.new.id ? { ...e, ...payload.new } : e)
            );
          }
        )
        .subscribe((status: string) => {
          console.log(`Supabase Real-time status for ${userEmail}:`, status);
        });
    };
    
    init();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const fetchMyEnrollments = async (email: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('enrollments')
      .select('id, created_at, full_name, course_or_track, price, status')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (!error) {
      setEnrollments(data || []);
    }
    setIsLoading(false);
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'accepted':
        return {
          label: 'تم القبول',
          icon: <CheckCircle2 className="text-green-500" size={18} />,
          bgColor: 'bg-green-500/10',
          textColor: 'text-green-600 dark:text-green-400'
        };
      case 'rejected':
        return {
          label: 'تم الرفض',
          icon: <XCircle className="text-red-500" size={18} />,
          bgColor: 'bg-red-500/10',
          textColor: 'text-red-600 dark:text-red-400'
        };
      default:
        return {
          label: 'قيد المراجعة',
          icon: <Clock className="text-orange-500" size={18} />,
          bgColor: 'bg-orange-500/10',
          textColor: 'text-orange-600 dark:text-orange-400'
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] pt-32 pb-20 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">طلباتي</h1>
          <p className="text-gray-600 dark:text-gray-400">تابع حالة طلبات الاشتراك الخاصة بك هنا (تحديث فوري ⚡).</p>
        </div>

        {enrollments.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm">
            <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 text-lg">لم تقم بالاشتراك في أي كورس أو مسار بعد.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {enrollments.map((item) => {
              const statusInfo = getStatusDisplay(item.status);
              return (
                <div 
                  key={item.id} 
                  className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-r-4"
                  style={{ borderRightColor: item.status === 'accepted' ? '#22c55e' : item.status === 'rejected' ? '#ef4444' : '#f97316' }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.course_or_track}</h3>
                          <span className="text-[12px] bg-primary/10 text-primary px-3 py-1 rounded-full font-extrabold">{item.price} ج.م</span>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                          <Clock size={14} />
                          {new Date(item.created_at).toLocaleDateString('ar-EG', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm self-start md:self-center ${statusInfo.bgColor} ${statusInfo.textColor} shadow-sm border border-black/5 dark:border-white/5`}>
                      {statusInfo.icon}
                      <span>{statusInfo.label}</span>
                    </div>
                  </div>
                  
                  {item.status === 'accepted' && (
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={16} className="text-primary" />
                      <span>سيتم التواصل معك عبر الواتساب لتأكيد الدفع وبدء الدراسة. مبروك! 🎉</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
