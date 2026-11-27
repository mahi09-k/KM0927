import DesktopNav from './DesktopNav';

export default function MobileShell({ children }) {
  return (
    <div className="min-h-screen bg-[#F6F5F2] dark:bg-[#0E0E0D] text-charcoal dark:text-neutral-100 selection:bg-terracotta selection:text-white transition-colors">
      {/* Desktop Top Navigation */}
      <DesktopNav />

      {/* Main Content Responsive Wrapper */}
      <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col pb-24 md:pb-12 transition-colors">
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
