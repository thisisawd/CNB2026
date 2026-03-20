import { useState, memo, useCallback } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { WaffleMenu } from './WaffleMenu';
import { SettingsPanel } from './SettingsPanel';
import { HelpPanel } from './HelpPanel';
import { FeatureFlagsPanel } from './FeatureFlagsPanel';
import { ChevronDown } from 'lucide-react';
import classNotebookIcon from 'figma:asset/2f173971636b421ff0273180a4600c3546b454b0.png';
import staffNotebookIcon from 'figma:asset/3a975afe9c0dd16c1341fb550f63e4838acc47a0.png';
import waffleIcon from 'figma:asset/21f8e9858d4b093e8eb8605fd894074baf7ddbba.png';
import profileIcon from 'figma:asset/1fccae1a9f64af9240f71c3e987e8891da190b73.png';
import settingsIcon from 'figma:asset/8125922ffd8cd53e9008e32e3ceceee12ba7db27.png';
import flagIcon from 'figma:asset/825e02a89d103cbe89e74d8412cb1b0ecdb3f9e7.png';
import helpIcon from 'figma:asset/f1d49b5523ee55010344aa6e652c1d9a702dca51.png';

interface HeaderProps {
  featureFlags?: Record<string, boolean>;
  onFeatureFlagChange?: (flagKey: string, value: boolean) => void;
  onLogoClick?: () => void;
  onSignOut?: () => void;
  notebookType?: 'class' | 'staff';
  onFluentComparison?: () => void;
}

export const Header = memo(function Header({ featureFlags = {}, onFeatureFlagChange = () => {}, onLogoClick = () => {}, onSignOut, notebookType = 'class', onFluentComparison }: HeaderProps) {
  const [isWaffleMenuOpen, setIsWaffleMenuOpen] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isHelpPanelOpen, setIsHelpPanelOpen] = useState(false);
  const [isFeatureFlagsPanelOpen, setIsFeatureFlagsPanelOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleWaffleMenu = useCallback(() => setIsWaffleMenuOpen(prev => !prev), []);
  const closeWaffleMenu = useCallback(() => setIsWaffleMenuOpen(false), []);
  const openSettingsPanel = useCallback(() => setIsSettingsPanelOpen(true), []);
  const closeSettingsPanel = useCallback(() => setIsSettingsPanelOpen(false), []);
  const openHelpPanel = useCallback(() => setIsHelpPanelOpen(true), []);
  const closeHelpPanel = useCallback(() => setIsHelpPanelOpen(false), []);
  const openFeatureFlagsPanel = useCallback(() => setIsFeatureFlagsPanelOpen(true), []);
  const closeFeatureFlagsPanel = useCallback(() => setIsFeatureFlagsPanelOpen(false), []);
  const toggleProfileMenu = useCallback(() => setIsProfileMenuOpen(prev => !prev), []);
  const closeProfileMenu = useCallback(() => setIsProfileMenuOpen(false), []);

  const handleSignOut = useCallback(() => {
    closeProfileMenu();
    onSignOut?.();
  }, [closeProfileMenu, onSignOut]);

  return (
    <header className="flex items-center justify-between px-4 h-12 bg-[#f5f5f5] dark:bg-[#2b2b2b] border-b border-[#edebe9] dark:border-[#3d3d3d] relative z-50">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleWaffleMenu}
          className="hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] p-2 rounded transition-colors"
        >
          <img src={waffleIcon} alt="Apps" className="w-5 h-5 dark:invert dark:brightness-0 dark:contrast-100" />
        </button>
        
        <WaffleMenu isOpen={isWaffleMenuOpen} onClose={closeWaffleMenu} />
        
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] px-2 py-1 rounded transition-colors"
        >
          <img src={notebookType === 'class' ? classNotebookIcon : staffNotebookIcon} alt="OneNote" className="w-6 h-6" />
          <span className="text-[#323130] dark:text-[#ffffff]">{notebookType === 'class' ? 'Class Notebook' : 'Staff Notebook'}</span>
        </button>
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          onClick={openSettingsPanel}
          className="hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] p-2 rounded transition-colors"
        >
          <img src={settingsIcon} alt="Settings" className="w-[18px] h-[18px] dark:invert dark:brightness-0 dark:contrast-100" />
        </button>
        <button 
          onClick={openFeatureFlagsPanel}
          className="hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] p-2 rounded transition-colors"
        >
          <img src={flagIcon} alt="Flags" className="w-5 h-5 dark:invert dark:brightness-0 dark:contrast-100" />
        </button>
        <button 
          onClick={openHelpPanel}
          className="hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] p-2 rounded transition-colors"
        >
          <img src={helpIcon} alt="Help" className="w-5 h-5 dark:invert dark:brightness-0 dark:contrast-100" />
        </button>
        <button 
          onClick={toggleProfileMenu}
          className="hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] p-2 rounded transition-colors relative"
        >
          <div className="flex items-center gap-1">
            <ImageWithFallback
              src={profileIcon}
              alt="Profile"
              className="w-6 h-6"
            />
            <ChevronDown className="w-3 h-3 text-[#323130] dark:text-[#ffffff]" />
          </div>
        </button>
        
        {/* Profile dropdown menu */}
        {isProfileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={closeProfileMenu}
            />
            
            {/* Dropdown */}
            <div className="absolute top-full right-4 mt-1 bg-white dark:bg-[#2b2b2b] border border-[#edebe9] dark:border-[#3d3d3d] rounded shadow-lg z-50 min-w-[200px]">
              <div className="p-3 border-b border-[#edebe9] dark:border-[#3d3d3d]">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={profileIcon}
                    alt="Profile"
                    className="w-10 h-10"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#323130] dark:text-[#ffffff]">Agnes Gustve</div>
                    <div className="text-xs text-[#605e5c] dark:text-[#a19f9d]">agnes@contoso.com</div>
                  </div>
                </div>
              </div>
              
              {onSignOut && (
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-[#323130] dark:text-[#ffffff] hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] transition-colors"
                >
                  Sign out
                </button>
              )}
            </div>
          </>
        )}
      </div>
      
      <SettingsPanel isOpen={isSettingsPanelOpen} onClose={closeSettingsPanel} />
      <HelpPanel isOpen={isHelpPanelOpen} onClose={closeHelpPanel} />
      <FeatureFlagsPanel 
        isOpen={isFeatureFlagsPanelOpen} 
        onClose={closeFeatureFlagsPanel} 
        featureFlags={featureFlags} 
        onFeatureFlagChange={onFeatureFlagChange}
        onFluentComparison={onFluentComparison}
      />
    </header>
  );
});