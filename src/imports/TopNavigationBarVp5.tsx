import svgPaths from "./svg-pc5x2o8hcp";
import { Search as SearchIcon, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import classNotebookIcon from 'figma:asset/2f173971636b421ff0273180a4600c3546b454b0.png';
import staffNotebookIcon from 'figma:asset/3a975afe9c0dd16c1341fb550f63e4838acc47a0.png';

function Microsoft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Microsoft">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#f25022] left-[calc(50%-5.25px)] size-[9.5px] top-[calc(50%-5.25px)]" data-name="microsoft" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#80ba01] left-[calc(50%+5.25px)] size-[9.5px] top-[calc(50%-5.25px)]" data-name="microsoft" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#ffb902] left-[calc(50%+5.25px)] size-[9.5px] top-[calc(50%+5.25px)]" data-name="microsoft" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#02a4ef] left-[calc(50%-5.25px)] size-[9.5px] top-[calc(50%+5.25px)]" data-name="microsoft" />
    </div>
  );
}

function MicrosoftLogo() {
  return (
    <div className="flex gap-[4px] items-center" data-name="Microsoft Logo">
      <Microsoft />
      <div className="h-[13.111px] relative shrink-0 w-[67.75px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.75 13.1111">
          <path d={svgPaths.p8091d00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 size-[20px] ${className}`} data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Chevron">
          <path d={svgPaths.p13f170} fill="var(--fill-0, black)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

interface TopNavigationBarVpProps {
  onSignIn?: () => void;
  notebookType?: 'class' | 'staff';
  onNotebookTypeChange?: (type: 'class' | 'staff') => void;
}

export default function TopNavigationBarVp({ onSignIn, notebookType = 'class', onNotebookTypeChange }: TopNavigationBarVpProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileM365Open, setIsMobileM365Open] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileM365Open(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <div className="backdrop-blur-[20px] bg-white w-full h-full flex items-center justify-between px-4 lg:px-6 relative z-50" data-name="Top Navigation Bar/VP5">
      {/* ═══ MOBILE LAYOUT (< lg) ═══ */}
      <div className="flex lg:hidden items-center justify-between w-full">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:bg-gray-100 p-2 rounded" 
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-black" />
            ) : (
              <Menu className="w-5 h-5 text-black" />
            )}
          </button>
          <button className="hover:bg-gray-100 p-2 rounded border border-dashed border-gray-400" aria-label="Search">
            <SearchIcon className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Center: Microsoft Logo */}
        <MicrosoftLogo />

        {/* Right: Profile/Notebook type */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="hover:bg-gray-100 p-2 rounded" 
            aria-label="Notebook type"
          >
            {notebookType === 'class' ? (
              <img src={classNotebookIcon} alt="Class Notebook" className="w-6 h-6" />
            ) : (
              <img src={staffNotebookIcon} alt="Staff Notebook" className="w-6 h-6" />
            )}
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 min-w-[240px]">
                <button
                  onClick={() => { onNotebookTypeChange?.('class'); setIsProfileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${notebookType === 'class' ? 'bg-gray-100' : ''}`}
                >
                  <img src={classNotebookIcon} alt="Class Notebook" className="w-8 h-8" />
                  <span className="font-['Segoe_UI',sans-serif] text-[15px] text-black">Class Notebook</span>
                </button>
                <button
                  onClick={() => { onNotebookTypeChange?.('staff'); setIsProfileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-200 ${notebookType === 'staff' ? 'bg-gray-100' : ''}`}
                >
                  <img src={staffNotebookIcon} alt="Staff Notebook" className="w-8 h-8" />
                  <span className="font-['Segoe_UI',sans-serif] text-[15px] text-black">Staff Notebook</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ═══ MOBILE SLIDE-DOWN MENU ═══ */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-30 lg:hidden" 
            style={{ top: '54px' }}
            onClick={() => { setIsMobileMenuOpen(false); setIsMobileM365Open(false); }}
          />
          <div 
            className="fixed left-0 right-0 bg-white z-40 lg:hidden shadow-lg overflow-y-auto"
            style={{ top: '54px', maxHeight: 'calc(100vh - 54px)' }}
          >
            {/* Microsoft 365 collapsible header */}
            <button 
              onClick={() => setIsMobileM365Open(!isMobileM365Open)}
              className="w-full flex items-center justify-between px-6 py-3 border-b border-gray-200 hover:bg-gray-50"
            >
              <span className="font-['Segoe_UI:Semibold',sans-serif] text-[14px] text-black">Microsoft 365</span>
              <ChevronDown className={`w-4 h-4 text-black transition-transform ${isMobileM365Open ? 'rotate-180' : ''}`} />
            </button>

            {/* Collapsible M365 sub-items */}
            {isMobileM365Open && (
              <div className="bg-gray-50 border-b border-gray-200">
                <a href="#" className="block px-8 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-100">For individuals</a>
                <a href="#" className="block px-8 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-100">For business</a>
                <a href="#" className="block px-8 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-100">For enterprise</a>
                <a href="#" className="block px-8 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-100">For education</a>
              </div>
            )}

            {/* Navigation links */}
            <div className="divide-y divide-gray-200">
              <a href="#" className="block px-6 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-50">Products</a>
              <a href="#" className="block px-6 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-50">Plans and pricing</a>
              <a href="#" className="block px-6 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-50">Resources</a>
              <a href="#" className="block px-6 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-50">Support</a>
              <a href="#" className="block px-6 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-50">Get in touch</a>
              <a href="#" className="block px-6 py-3 font-['Segoe_UI',sans-serif] text-[14px] text-[#262626] hover:bg-gray-50">All Microsoft</a>
            </div>
          </div>
        </>
      )}

      {/* ═══ DESKTOP LAYOUT (>= lg) ═══ */}
      {/* Left section - Logo and Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        {/* Microsoft Logo */}
        <div className="flex items-center gap-4">
          <MicrosoftLogo />
          <div className="h-[22px] w-[2px] bg-black" />
          <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[25px] text-[16px] text-black tracking-[-0.32px]">Microsoft 365</p>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-8">
          <button 
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="flex items-center gap-1 font-['Segoe_UI:Semibold',sans-serif] text-[16px] text-black tracking-[-0.32px] hover:underline"
          >
            Products
            <Chevron />
          </button>
          <button className="font-['Segoe_UI:Semibold',sans-serif] text-[16px] text-black tracking-[-0.32px] hover:underline">
            Plans and pricing
          </button>
          <button className="flex items-center gap-1 font-['Segoe_UI:Semibold',sans-serif] text-[16px] text-black tracking-[-0.32px] hover:underline">
            Resources
            <Chevron />
          </button>
          <button className="flex items-center gap-1 font-['Segoe_UI:Semibold',sans-serif] text-[16px] text-black tracking-[-0.32px] hover:underline">
            Support
            <Chevron />
          </button>
        </nav>
      </div>

      {/* Right section - Search and Profile (Desktop) */}
      <div className="hidden lg:flex items-center gap-6">
        <button className="font-['Segoe_UI:Semibold',sans-serif] text-[16px] text-black tracking-[-0.32px] hover:underline">
          Get in touch
        </button>
        <button className="flex items-center gap-1 font-['Segoe_UI:Semibold',sans-serif] text-[16px] text-black tracking-[-0.32px] hover:underline">
          All Microsoft
          <Chevron />
        </button>
        <button className="hover:bg-gray-100 p-2 rounded" aria-label="Search">
          <SearchIcon className="w-5 h-5 text-black" />
        </button>
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="hover:bg-gray-100 p-2 rounded" 
            aria-label="Notebook type"
          >
            {notebookType === 'class' ? (
              <img src={classNotebookIcon} alt="Class Notebook" className="w-6 h-6" />
            ) : (
              <img src={staffNotebookIcon} alt="Staff Notebook" className="w-6 h-6" />
            )}
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 min-w-[240px]">
                <button
                  onClick={() => { onNotebookTypeChange?.('class'); setIsProfileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${notebookType === 'class' ? 'bg-gray-100' : ''}`}
                >
                  <img src={classNotebookIcon} alt="Class Notebook" className="w-8 h-8" />
                  <span className="font-['Segoe_UI',sans-serif] text-[15px] text-black">Class Notebook</span>
                </button>
                <button
                  onClick={() => { onNotebookTypeChange?.('staff'); setIsProfileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-200 ${notebookType === 'staff' ? 'bg-gray-100' : ''}`}
                >
                  <img src={staffNotebookIcon} alt="Staff Notebook" className="w-8 h-8" />
                  <span className="font-['Segoe_UI',sans-serif] text-[15px] text-black">Staff Notebook</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Products Mega Menu (Desktop only) */}
      {isProductsOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsProductsOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full bg-white shadow-lg z-50 border-t border-gray-200 hidden lg:block">
            <div className="max-w-[1600px] mx-auto px-6 py-12">
              <div className="grid grid-cols-6 gap-8">
                {/* For individuals */}
                <div>
                  <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-black mb-4">For individuals</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Pricing for individuals</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For families</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For single users</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For premium users</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For students</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline mt-4 inline-block">Learn more</a></li>
                  </ul>
                </div>

                {/* For business */}
                <div>
                  <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-black mb-4">For business</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Pricing for business</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For small business</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For schools</a></li>
                  </ul>
                </div>

                {/* For enterprise */}
                <div>
                  <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-black mb-4">For enterprise</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Pricing for enterprise</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For enterprise</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For frontline workers</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">For nonprofits</a></li>
                  </ul>
                </div>

                {/* Microsoft 365 Copilot */}
                <div>
                  <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-black mb-4">Microsoft 365 Copilot</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Meet Copilot</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Copilot Chat</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">AI Agents</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Daily Prompt Guide</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Plans and pricing</a></li>
                  </ul>
                </div>

                {/* Apps and services */}
                <div>
                  <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-black mb-4">Apps and services</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Microsoft Teams</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Word</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Excel</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">PowerPoint</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Outlook</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">OneDrive</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">SharePoint</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Planner</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#0067b8] hover:underline mt-4 inline-block">See all apps and services</a></li>
                  </ul>
                </div>

                {/* Related products */}
                <div>
                  <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-black mb-4">Related products</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Microsoft Office</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Windows 365</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Microsoft Viva</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Microsoft Edge</a></li>
                    <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#262626] hover:underline">Microsoft Agent 365</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
