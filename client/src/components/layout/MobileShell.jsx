export default function MobileShell({ children }) {
  return (
    <div className="min-h-screen bg-[#EBE9E4] dark:bg-[#0D0D0C] flex justify-center selection:bg-terracotta selection:text-white transition-colors">
      <div className="w-full max-w-shell relative bg-cream dark:bg-[#151514] text-charcoal dark:text-neutral-100 min-h-screen flex flex-col pb-20 shadow-2xl border-x border-black/5 dark:border-white/5 overflow-x-hidden transition-colors">
        {children}
      </div>
    </div>
  );
}
