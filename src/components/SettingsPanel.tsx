import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useDarkMode } from './DarkModeContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = memo(function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  // Theme preview colors/patterns
  const themes = useMemo(() => [
    { color: '#5a5a5a', selected: true },
    { color: '#0000ff' },
    { gradient: 'linear-gradient(135deg, #4a90e2 0%, #67b8e3 100%)' },
    { gradient: 'linear-gradient(135deg, #ffa07a 0%, #ff6b9d 100%)' },
    { gradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffd93d 100%)' },
    { color: '#1e5a8e' },
    { gradient: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' },
    { color: '#2c3e50' },
    { color: '#8b4789' },
    { gradient: 'linear-gradient(135deg, #2c5f2d 0%, #97bc62 100%)' },
  ], []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
          
          {/* Settings Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-80 bg-[#faf9f8] dark:bg-[#1f1f1f] shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#edebe9] dark:border-[#3d3d3d]">
              <h2 className="text-[#323130] dark:text-[#ffffff]">Settings</h2>
              <button 
                onClick={onClose}
                className="hover:bg-[#f3f2f1] dark:hover:bg-[#2b2b2b] p-2 rounded transition-colors"
              >
                <X className="text-[#605e5c] dark:text-[#d0d0d0]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Dark Mode Section */}
              <section className="mb-6">
                <h3 className="text-[#323130] dark:text-[#ffffff] mb-3">Appearance</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#323130] dark:text-[#ffffff]">Dark mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      isDarkMode ? 'bg-[#0078d4]' : 'bg-[#c8c6c4]'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        isDarkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </section>

              {/* Themes Section */}
              <section className="mb-6">
                <h3 className="text-[#323130] dark:text-[#ffffff] mb-3">Themes</h3>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {themes.map((theme, index) => (
                    <button
                      key={index}
                      className="relative w-12 h-12 rounded overflow-hidden border-2 transition-all hover:scale-105"
                      style={{
                        background: theme.gradient || theme.color,
                        borderColor: theme.selected ? '#0078d4' : '#edebe9',
                      }}
                    >
                      {theme.selected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#0078d4] rounded-full" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <a
                  href="#"
                  className="text-[#0078d4] hover:underline inline-block"
                  onClick={(e) => e.preventDefault()}
                >
                  View all
                </a>
              </section>

              {/* Language and time zone */}
              <section className="mb-6">
                <h3 className="text-[#323130] dark:text-[#ffffff] mb-2">Language and time zone</h3>
                <a
                  href="#"
                  className="text-[#0078d4] hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.preventDefault()}
                >
                  Change your language
                  <ChevronRight />
                </a>
              </section>

              {/* Password */}
              <section className="mb-6">
                <h3 className="text-[#323130] dark:text-[#ffffff] mb-2">Password</h3>
                <a
                  href="#"
                  className="text-[#0078d4] hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.preventDefault()}
                >
                  Change your password
                  <ChevronRight />
                </a>
              </section>

              {/* Contact preferences */}
              <section className="mb-6">
                <h3 className="text-[#323130] dark:text-[#ffffff] mb-2">Contact preferences</h3>
                <a
                  href="#"
                  className="text-[#0078d4] hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.preventDefault()}
                >
                  Update contact preferences
                  <ChevronRight />
                </a>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});