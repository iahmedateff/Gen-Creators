"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, User, Phone, Mail, BookOpen, Clock, Trash2, LogOut, Check, X, TrendingUp, Users, Clock4, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Enrollment {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  course_or_track: string;
  price: number;
  details: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const ADMIN_EMAIL = 'gen@admin.com';

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const router = useRouter();

  useEffect(() => {
    checkUser();
    
    // Subscribe to new enrollments
    const subscription = supabase
      .channel('admin_enrollments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'enrollments' },
        (payload) => {
          setEnrollments(current => [payload.new as Enrollment, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || session.user.email !== ADMIN_EMAIL) {
      router.push('/login');
      return;
    }

    setIsAuthorized(true);
    fetchEnrollments();
  };

  const fetchEnrollments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setEnrollments(data || []);
    }
    setIsLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: 'accepted' | 'rejected' | 'pending') => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('enrollments')
      .update({ status })
      .eq('id', id);

    if (error) {
      alert('خطأ في التحديث: ' + error.message);
    } else {
      setEnrollments(enrollments.map(e => e.id === id ? { ...e, status } : e));
    }
    setUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;

    const { error } = await supabase
      .from('enrollments')
      .delete()
      .eq('id', id);

    if (!error) {
      setEnrollments(enrollments.filter(e => e.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const filteredEnrollments = enrollments.filter(e => filter === 'all' || e.status === filter);

  // Stats calculation
  const stats = {
    total: enrollments.length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    accepted: enrollments.filter(e => e.status === 'accepted').length,
    revenue: enrollments.filter(e => e.status === 'accepted').reduce((sum, e) => sum + (e.price || 0), 0)
  };

  if (!isAuthorized && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] p-4 md:p-8 pt-24" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">لوحة التحكم</h1>
            <p className="text-gray-600 dark:text-gray-400">تابع وأدر جميع طلبات الانضمام لـ Gen Creators</p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
              <LogOut size={18} className="ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'إجمالي الطلبات', value: stats.total, icon: <Users size={24} />, color: 'blue' },
            { label: 'قيد الانتظار', value: stats.pending, icon: <Clock4 size={24} />, color: 'orange' },
            { label: 'تم القبول', value: stats.accepted, icon: <TrendingUp size={24} />, color: 'green' },
            { label: 'الأرباح المتوقعة', value: `${stats.revenue} ج.م`, icon: <DollarSign size={24} />, color: 'emerald' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500`} 
                     style={{ color: stat.color === 'blue' ? '#3b82f6' : stat.color === 'orange' ? '#f97316' : stat.color === 'green' ? '#22c55e' : '#10b981' }}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
            <div className="flex bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 rounded-2xl p-1.5 shadow-sm overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'كل الطلبات', color: '#ff5e00' },
                { id: 'pending', label: 'قيد المراجعة', color: '#f97316' },
                { id: 'accepted', label: 'مقبولة', color: '#22c55e' },
                { id: 'rejected', label: 'مرفوضة', color: '#ef4444' }
              ].map((f) => (
                <button 
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    filter === f.id ? 'text-white shadow-lg' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  style={{ backgroundColor: filter === f.id ? f.color : 'transparent' }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={fetchEnrollments} className="rounded-2xl h-14 px-8 border-black/5 dark:border-white/5">
                تحديث البيانات
            </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 rounded-[3rem]">
             <div className="bg-gray-100 dark:bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} className="text-gray-300" />
             </div>
             <p className="text-gray-500 font-bold text-xl">لا يوجد طلبات حالياً في هذا القسم</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredEnrollments.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-2 h-full transition-colors duration-500 ${
                  item.status === 'accepted' ? 'bg-green-500' : 
                  item.status === 'rejected' ? 'bg-red-500' : 'bg-orange-500'
                }`}></div>

                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 flex-grow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-0.5">الاسم</p>
                        <p className="font-extrabold text-gray-900 dark:text-white">{item.full_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-0.5">الهاتف</p>
                        <p className="font-extrabold text-gray-900 dark:text-white underline decoration-black/10 dark:decoration-white/10" dir="ltr">
                          <a href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{item.phone}</a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-0.5">الكورس - السعر</p>
                        <p className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                          {item.course_or_track}
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.price} ج.م</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                        <Clock size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-0.5">تاريخ الطلب</p>
                        <p className="font-extrabold text-gray-900 dark:text-white text-sm">
                          {new Date(item.created_at).toLocaleDateString('ar-EG', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 lg:border-r border-black/5 dark:border-white/5 pt-6 lg:pt-0 lg:pr-8">
                    <div className="text-right flex-grow max-w-[200px]">
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                        <Mail size={14} />
                        <span className="truncate">{item.email}</span>
                      </div>
                      {item.details && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 p-3 rounded-xl italic">
                          "{item.details}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {updatingId === item.id ? (
                        <div className="p-4 text-primary animate-spin">
                          <Loader2 size={24} />
                        </div>
                      ) : (
                        <>
                          {item.status === 'pending' ? (
                            <>
                              <button 
                                onClick={() => handleUpdateStatus(item.id, 'accepted')}
                                className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                                title="قبول"
                              >
                                <Check size={24} strokeWidth={3} />
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(item.id, 'rejected')}
                                className="w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                                title="رفض"
                              >
                                <X size={24} strokeWidth={3} />
                              </button>
                            </>
                          ) : (
                            <div className={`px-5 py-2.5 rounded-2xl text-sm font-black flex items-center gap-2 border shadow-sm ${
                              item.status === 'accepted' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-red-500/10 text-red-600 border-red-500/20'
                            }`}>
                              {item.status === 'accepted' ? 'تم القبول' : 'تم الرفض'}
                              <button 
                                onClick={() => handleUpdateStatus(item.id, 'pending')}
                                className="mr-3 text-[10px] text-gray-400 hover:text-primary transition-colors underline"
                              >
                                تراجع
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="w-12 h-12 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl flex items-center justify-center transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
