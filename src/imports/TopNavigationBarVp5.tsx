import svgPaths from "./svg-pc5x2o8hcp";
import { Search as SearchIcon, Menu, X, ChevronDown, Paintbrush, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIconSet } from '../components/IconSetContext';
import { LtiPreviewModal } from '../components/LtiPreviewModal';
import ltiEduLightImage from '../assets/LTI_EDU_Light.png';
import ltiOneNoteLightImage from '../assets/OneNote_Light.png';
import ltiOneNoteDarkImage from '../assets/OneNote_Dark.png';

// Map from icon-set key to the LTI preview image shown when the LTI pill
// button on that row is clicked. Rows whose key is not in this map do not
// render an LTI button.
const LTI_PREVIEWS: Record<string, string> = {
  'onenote-dark-modifier': ltiOneNoteDarkImage,
  'onenote-light-modifier': ltiOneNoteLightImage,
  'edu-light-modifier': ltiEduLightImage,
};

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

function IconSetIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.9184 18C17.3326 18 17.6684 18.3358 17.6684 18.75C17.6684 19.1297 17.3862 19.4435 17.0202 19.4932L16.9184 19.5L15.8819 19.5004C16.4382 20.1218 17.2432 20.5 18.1184 20.5C19.114 20.5 20.0261 20.0123 20.5841 19.2095C20.8204 18.8694 21.2878 18.7853 21.628 19.0217C21.9681 19.2581 22.0522 19.7254 21.8158 20.0656C20.9804 21.2676 19.6105 22 18.1184 22C17.0049 22 15.9672 21.5918 15.1686 20.8989L15.1684 21.25C15.1684 21.6642 14.8326 22 14.4184 22C14.0387 22 13.7249 21.7178 13.6752 21.3518L13.6684 21.25V18.75C13.6684 18.3703 13.9506 18.0565 14.3166 18.0068L14.4184 18H16.9184ZM6.39823 13.0068L6.5 13C6.8797 13 7.19349 13.2822 7.24315 13.6482L7.25 13.75V16.75H10.25C10.6297 16.75 10.9435 17.0322 10.9932 17.3982L11 17.5C11 17.8797 10.7178 18.1935 10.3518 18.2432L10.25 18.25H7.25V21.25C7.25 21.6297 6.96785 21.9435 6.60177 21.9932L6.5 22C6.1203 22 5.80651 21.7178 5.75685 21.3518L5.75 21.25V18.25H2.75C2.3703 18.25 2.05651 17.9678 2.00685 17.6018L2 17.5C2 17.1203 2.28215 16.8065 2.64823 16.7568L2.75 16.75H5.75V13.75C5.75 13.3703 6.03215 13.0565 6.39823 13.0068L6.5 13L6.39823 13.0068ZM17.5 13C18.6135 13 19.6512 13.4082 20.4498 14.1011L20.45 13.75C20.45 13.3358 20.7858 13 21.2 13C21.5797 13 21.8935 13.2822 21.9432 13.6482L21.95 13.75V16.25C21.95 16.6297 21.6678 16.9435 21.3018 16.9932L21.2 17H18.7C18.2858 17 17.95 16.6642 17.95 16.25C17.95 15.8703 18.2322 15.5565 18.5982 15.5068L18.7 15.5L19.7365 15.4996C19.1802 14.8782 18.3752 14.5 17.5 14.5C16.5044 14.5 15.5923 14.9877 15.0343 15.7905C14.798 16.1306 14.3306 16.2147 13.9904 15.9783C13.6503 15.7419 13.5662 15.2746 13.8026 14.9344C14.638 13.7324 16.0079 13 17.5 13ZM6.5 2C8.98528 2 11 4.01472 11 6.5C11 8.98528 8.98528 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2ZM19.2143 2C20.7657 2 22 3.39005 22 5.07903C22 5.94137 21.6773 6.75017 21.1484 7.29305L18.6464 10.4344C18.1272 11.0864 17.183 11.1899 16.5375 10.6656C16.4509 10.5953 16.3724 10.5155 16.3033 10.4277L13.6268 7.02591C13.2233 6.47963 13 5.79699 13 5.07903C13 3.39005 14.2343 2 15.7857 2C16.3504 2 16.8861 2.18641 17.3359 2.51959L17.5004 2.65133L17.6647 2.51961C18.1138 2.18648 18.6496 2 19.2143 2ZM3.91471 4.97713C3.6512 5.42352 3.5 5.9441 3.5 6.5C3.5 8.15685 4.84315 9.5 6.5 9.5C7.0559 9.5 7.57648 9.3488 8.02287 9.08529L3.91471 4.97713ZM19.2143 3.51495C18.8646 3.51495 18.5314 3.68829 18.2869 4.00219L17.5028 5.00858L16.7165 4.004C16.4696 3.68856 16.1356 3.51495 15.7857 3.51495C15.1014 3.51495 14.5 4.19218 14.5 5.07903C14.5 5.47127 14.6193 5.83608 14.8152 6.10176L17.4775 9.485L20.0438 6.27042C20.3292 5.97565 20.5 5.54762 20.5 5.07903C20.5 4.19218 19.8986 3.51495 19.2143 3.51495ZM6.5 3.5C5.9441 3.5 5.42352 3.6512 4.97713 3.91471L9.08529 8.02287C9.3488 7.57648 9.5 7.0559 9.5 6.5C9.5 4.84315 8.15685 3.5 6.5 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Icon set options are provided by the IconSetContext, which also holds the selection state
// so it can be shared with the wizard header, welcome page, and favicon.

interface TopNavigationBarVpProps {
  onSignIn?: () => void;
  notebookType?: 'class' | 'staff';
  onNotebookTypeChange?: (type: 'class' | 'staff') => void;
  themes?: { key: string; label: string }[];
  selectedTheme?: string;
  onThemeChange?: (theme: string) => void;
  blades?: { key: string; label: string }[];
  selectedBlade?: string;
  onBladeChange?: (blade: string) => void;
  useAnimatedAssets?: boolean;
  onAnimatedAssetsChange?: (value: boolean) => void;
  useAnimatedAssetsAlt?: boolean;
  onAnimatedAssetsAltChange?: (value: boolean) => void;
  enableBlade0?: boolean;
  onEnableBlade0Change?: (value: boolean) => void;
}

export default function TopNavigationBarVp({ onSignIn, notebookType = 'class', onNotebookTypeChange, themes = [], selectedTheme, onThemeChange, blades = [], selectedBlade, onBladeChange, useAnimatedAssets = false, onAnimatedAssetsChange, useAnimatedAssetsAlt = false, onAnimatedAssetsAltChange, enableBlade0 = false, onEnableBlade0Change }: TopNavigationBarVpProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileM365Open, setIsMobileM365Open] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isIconSetOpen, setIsIconSetOpen] = useState(false);
  const [ltiPreviewImage, setLtiPreviewImage] = useState<string | null>(null);

  // Icon set selection is shared globally via IconSetContext so that the wizard header,
  // welcome page, and favicon all update in sync when the user picks a different set.
  const {
    iconSets,
    selectedIconSet,
    setSelectedIconSet,
    classNotebookIcon: classIcon,
    staffNotebookIcon: staffIcon,
  } = useIconSet();

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

        {/* Right: Theme selector + Profile/Notebook type */}
        <div className="flex items-center gap-1">
          {themes.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="hover:bg-gray-100 p-2 rounded"
                aria-label="Theme selector"
              >
                <Paintbrush className="w-5 h-5 text-black" />
              </button>
              {isThemeOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsThemeOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 min-w-[210px]">
                    {themes.map((theme) => (
                      <button
                        key={theme.key}
                        onClick={() => { onThemeChange?.(theme.key); setIsThemeOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${selectedTheme === theme.key ? 'bg-gray-100' : ''}`}
                      >
                        <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">{theme.label}</span>
                        {selectedTheme === theme.key && (
                          <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                        )}
                      </button>
                    ))}
                    {blades.length > 0 && (
                      <>
                        <div className="border-t-2 border-gray-300 my-1" />
                        {blades.map((blade) => (
                          <button
                            key={blade.key}
                            onClick={() => { onBladeChange?.(blade.key); setIsThemeOpen(false); }}
                            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${selectedBlade === blade.key ? 'bg-gray-100' : ''}`}
                          >
                            <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">{blade.label}</span>
                            {selectedBlade === blade.key && (
                              <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                            )}
                          </button>
                        ))}
                      </>
                    )}
                    {onAnimatedAssetsChange && (
                      <>
                        <div className="border-t-2 border-gray-300 my-1" />
                        <button
                          onClick={() => { onAnimatedAssetsChange(!useAnimatedAssets); setIsThemeOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${useAnimatedAssets ? 'bg-gray-100' : ''}`}
                        >
                          <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">Animated Assets</span>
                          {useAnimatedAssets && (
                            <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                          )}
                        </button>
                      </>
                    )}
                    {onAnimatedAssetsAltChange && (
                      <button
                        onClick={() => { onAnimatedAssetsAltChange(!useAnimatedAssetsAlt); setIsThemeOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${useAnimatedAssetsAlt ? 'bg-gray-100' : ''}`}
                      >
                        <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">Animated Assets Alt</span>
                        {useAnimatedAssetsAlt && (
                          <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                        )}
                      </button>
                    )}
                    {onEnableBlade0Change && (
                      <>
                        <div className="border-t-2 border-gray-300 my-1" />
                        <div className="px-4 py-2 font-['Segoe_UI',sans-serif] text-[12px] uppercase tracking-wide text-gray-500">
                          AI Enhancements and Updates
                        </div>
                        <button
                          onClick={() => { onEnableBlade0Change(!enableBlade0); setIsThemeOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${enableBlade0 ? 'bg-gray-100' : ''}`}
                        >
                          <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">Enable Blade 0</span>
                          {enableBlade0 && (
                            <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          {/* Icon set selector (mobile) */}
          <div className="relative">
            <button
              onClick={() => setIsIconSetOpen(!isIconSetOpen)}
              className="hover:bg-gray-100 p-2 rounded"
              aria-label="Icon set selector"
            >
              <IconSetIcon className="w-5 h-5 text-black" />
            </button>
            {isIconSetOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsIconSetOpen(false)} />
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 min-w-[340px]">
                  {iconSets.map((set) => (
                    <div
                      key={set.key}
                      className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${selectedIconSet === set.key ? 'bg-gray-100' : ''}`}
                    >
                      <div className="w-5 shrink-0 flex items-center justify-center mr-2">
                        {selectedIconSet === set.key && (
                          <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                        )}
                      </div>
                      <button
                        onClick={() => { setSelectedIconSet(set.key); setIsIconSetOpen(false); }}
                        className="flex-1 text-left font-['Segoe_UI',sans-serif] text-[14px] text-black whitespace-nowrap"
                      >
                        {set.label}
                      </button>
                      <div className="flex items-center ml-2 shrink-0">
                        {LTI_PREVIEWS[set.key] && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setIsIconSetOpen(false); setLtiPreviewImage(LTI_PREVIEWS[set.key]); }}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#7719AA] text-white hover:bg-[#5f0d8a] transition-colors font-['Segoe_UI',sans-serif]"
                            aria-label={`Preview LTI for ${set.label}`}
                          >
                            LTI
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="hover:bg-gray-100 p-2 rounded"
            aria-label="Notebook type"
          >
            {notebookType === 'class' ? (
              <img src={classIcon} alt="Class Notebook" className="w-6 h-6" />
            ) : (
              <img src={staffIcon} alt="Staff Notebook" className="w-6 h-6" />
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
                  <img src={classIcon} alt="Class Notebook" className="w-8 h-8" />
                  <span className="font-['Segoe_UI',sans-serif] text-[15px] text-black">Class Notebook</span>
                </button>
                <button
                  onClick={() => { onNotebookTypeChange?.('staff'); setIsProfileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-200 ${notebookType === 'staff' ? 'bg-gray-100' : ''}`}
                >
                  <img src={staffIcon} alt="Staff Notebook" className="w-8 h-8" />
                  <span className="font-['Segoe_UI',sans-serif] text-[15px] text-black">Staff Notebook</span>
                </button>
              </div>
            </>
          )}
        </div>
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
        {themes.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="hover:bg-gray-100 p-2 rounded"
              aria-label="Theme selector"
            >
              <Paintbrush className="w-5 h-5 text-black" />
            </button>
            {isThemeOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsThemeOpen(false)} />
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 min-w-[210px]">
                  {themes.map((theme) => (
                    <button
                      key={theme.key}
                      onClick={() => { onThemeChange?.(theme.key); setIsThemeOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${selectedTheme === theme.key ? 'bg-gray-100' : ''}`}
                    >
                      <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">{theme.label}</span>
                      {selectedTheme === theme.key && (
                        <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                      )}
                    </button>
                  ))}
                  {blades.length > 0 && (
                    <>
                      <div className="border-t-2 border-gray-300 my-1" />
                      {blades.map((blade) => (
                        <button
                          key={blade.key}
                          onClick={() => { onBladeChange?.(blade.key); setIsThemeOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${selectedBlade === blade.key ? 'bg-gray-100' : ''}`}
                        >
                          <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">{blade.label}</span>
                          {selectedBlade === blade.key && (
                            <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                          )}
                        </button>
                      ))}
                    </>
                  )}
                  {onAnimatedAssetsChange && (
                    <>
                      <div className="border-t-2 border-gray-300 my-1" />
                      <button
                        onClick={() => { onAnimatedAssetsChange(!useAnimatedAssets); setIsThemeOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${useAnimatedAssets ? 'bg-gray-100' : ''}`}
                      >
                        <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">Animated Assets</span>
                        {useAnimatedAssets && (
                          <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                        )}
                      </button>
                    </>
                  )}
                  {onAnimatedAssetsAltChange && (
                    <button
                      onClick={() => { onAnimatedAssetsAltChange(!useAnimatedAssetsAlt); setIsThemeOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${useAnimatedAssetsAlt ? 'bg-gray-100' : ''}`}
                    >
                      <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">Animated Assets Alt</span>
                      {useAnimatedAssetsAlt && (
                        <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                      )}
                    </button>
                  )}
                  {onEnableBlade0Change && (
                    <>
                      <div className="border-t-2 border-gray-300 my-1" />
                      <div className="px-4 py-2 font-['Segoe_UI',sans-serif] text-[12px] uppercase tracking-wide text-gray-500">
                        AI Enhancements and Updates
                      </div>
                      <button
                        onClick={() => { onEnableBlade0Change(!enableBlade0); setIsThemeOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${enableBlade0 ? 'bg-gray-100' : ''}`}
                      >
                        <span className="font-['Segoe_UI',sans-serif] text-[14px] text-black">Enable Blade 0</span>
                        {enableBlade0 && (
                          <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}
        {/* Icon set selector (desktop) */}
        <div className="relative">
          <button
            onClick={() => setIsIconSetOpen(!isIconSetOpen)}
            className="hover:bg-gray-100 p-2 rounded"
            aria-label="Icon set selector"
          >
            <IconSetIcon className="w-5 h-5 text-black" />
          </button>
          {isIconSetOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsIconSetOpen(false)} />
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 min-w-[340px]">
                {iconSets.map((set) => (
                  <div
                    key={set.key}
                    className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${selectedIconSet === set.key ? 'bg-gray-100' : ''}`}
                  >
                    <div className="w-5 shrink-0 flex items-center justify-center mr-2">
                      {selectedIconSet === set.key && (
                        <Check className="w-4 h-4 text-[#7719AA]" strokeWidth={3} />
                      )}
                    </div>
                    <button
                      onClick={() => { setSelectedIconSet(set.key); setIsIconSetOpen(false); }}
                      className="flex-1 text-left font-['Segoe_UI',sans-serif] text-[14px] text-black whitespace-nowrap"
                    >
                      {set.label}
                    </button>
                    <div className="flex items-center ml-2 shrink-0">
                      {LTI_PREVIEWS[set.key] && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsIconSetOpen(false); setLtiPreviewImage(LTI_PREVIEWS[set.key]); }}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#7719AA] text-white hover:bg-[#5f0d8a] transition-colors font-['Segoe_UI',sans-serif]"
                          aria-label={`Preview LTI for ${set.label}`}
                        >
                          LTI
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="hover:bg-gray-100 p-2 rounded" 
            aria-label="Notebook type"
          >
            {notebookType === 'class' ? (
              <img src={classIcon} alt="Class Notebook" className="w-6 h-6" />
            ) : (
              <img src={staffIcon} alt="Staff Notebook" className="w-6 h-6" />
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
                  <img src={classIcon} alt="Class Notebook" className="w-8 h-8" />
                  <span className="font-['Segoe_UI',sans-serif] text-[15px] text-black">Class Notebook</span>
                </button>
                <button
                  onClick={() => { onNotebookTypeChange?.('staff'); setIsProfileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-200 ${notebookType === 'staff' ? 'bg-gray-100' : ''}`}
                >
                  <img src={staffIcon} alt="Staff Notebook" className="w-8 h-8" />
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
      <LtiPreviewModal imageSrc={ltiPreviewImage} onClose={() => setLtiPreviewImage(null)} />
    </div>
  );
}
