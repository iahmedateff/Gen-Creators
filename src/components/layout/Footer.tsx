export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/5 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-2xl font-bold flex items-center gap-1.5" dir="ltr">
            <span className="text-gradient">Gen</span>
            <span>Creators</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-right max-w-sm">
            المنصة الأولى لتعلم المهارات المطلوبة في سوق العمل وبناء مسارك المهني بنجاح.
          </p>
        </div>
        
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Gen Creators. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
