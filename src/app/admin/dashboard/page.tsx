"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, User, Phone, Mail, BookOpen, Clock, Trash2, LogOut, Check, X, Bell } from 'lucide-react';
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

  const handleUpdateStatus = async (id: string, status: 'accepted' | 'rejected') => {
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">لوحة التحكم - طلبات الاشتراك</h1>
            <p className="text-gray-600 dark:text-gray-400">إجمالي الطلبات المعروضة: {filteredEnrollments.length}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-1 shadow-sm">
              {[
                { id: 'all', label: 'الكل', color: 'primary' },
                { id: 'pending', label: 'قيد الانتظار', color: 'orange-500' },
                { id: 'accepted', label: 'تم القبول', color: 'green-500' },
                { id: 'rejected', label: 'تم الرفض', color: 'red-500' }
              ].map((f) => (
                <button 
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === f.id 
                    ? `bg-${f.id === 'all' ? 'primary' : f.color} text-white shadow-md` 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                  style={filter === f.id && f.id !== 'all' ? { backgroundColor: f.id === 'pending' ? '#f97316' : f.id === 'accepted' ? '#22c55e' : '#ef4444' } : {}}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={fetchEnrollments} className="flex items-center gap-2">
              تحديث البيانات
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
              <LogOut size={18} />
              تسجيل الخروج
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl">
            <p className="text-gray-500">لا توجد طلبات في هذا القسم حاليًا.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredEnrollments.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-1.5 h-full transition-colors duration-500 ${
                  item.status === 'accepted' ? 'bg-green-500' : 
                  item.status === 'rejected' ? 'bg-red-500' : 'bg-orange-500'
                }`}></div>

                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">الاسم</p>
                        <p className="font-bold text-gray-900 dark:text-white">{item.full_name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">الهاتف</p>
                        <p className="font-bold text-gray-900 dark:text-white underline decoration-dotted underline-offset-4" dir="ltr">
                          <a href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">{item.phone}</a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">الكورس / المسار</p>
                        <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          {item.course_or_track}
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full whitespace-nowrap">{item.price} ج.م</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">التاريخ</p>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">
                          {new Date(item.created_at).toLocaleDateString('ar-EG', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-4 lg:border-r border-gray-100 dark:border-white/5 pt-4 lg:pt-0 lg:pr-6">
                    <div className="text-right flex-grow">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Mail size={14} />
                        <span>{item.email}</span>
                      </div>
                      {item.details && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-white/5 p-3 rounded-xl italic line-clamp-2 hover:line-clamp-none transition-all">
                          "{item.details}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {updatingId === item.id ? (
                        <div className="p-3 text-primary animate-spin">
                          <Loader2 size={24} />
                        </div>
                      ) : (
                        <>
                          {item.status === 'pending' ? (
                            <>
                              <button 
                                onClick={() => handleUpdateStatus(item.id, 'accepted')}
                                className="p-3 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-xl transition-all shadow-sm"
                                title="قبول الطلب"
                              >
                                <Check size={22} />
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(item.id, 'rejected')}
                                className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                                title="رفض الطلب"
                              >
                                <X size={22} />
                              </button>
                            </>
                          ) : (
                            <div className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-inner ${
                              item.status === 'accepted' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                              {item.status === 'accepted' ? <Check size={16} /> : <X size={16} />}
                              {item.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                              <button 
                                onClick={() => handleUpdateStatus(item.id, 'pending' as any)}
                                className="mr-2 text-[10px] underline underline-offset-2 opacity-50 hover:opacity-100"
                              >
                                تراجع
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                        title="حذف نهائي"
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
