import { motion, AnimatePresence } from 'motion/react';
import { X, Search } from 'lucide-react';
import { memo, useMemo } from 'react';
import { Input } from './ui/input';

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpPanel = memo(function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
  const helpTopics = useMemo(() => [
    'Convert text to numbers',
    'TEXT function',
    'VLOOKUP function',
    'SUMIF function',
    'All functions',
    'Drop-down lists and data validation',
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
          
          {/* Help Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-[#2b2b2b] shadow-2xl dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)] z-50 overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#edebe9] dark:border-[#3d3d3d]">
              <h2 className="text-[#323130] dark:text-[#ffffff]">Help</h2>
              <button 
                onClick={onClose}
                className="hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] p-2 rounded transition-colors"
              >
                <X className="text-[#605e5c] dark:text-[#d0d0d0]" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-[#edebe9] dark:border-[#3d3d3d]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#605e5c] dark:text-[#a0a0a0]" />
                <Input
                  type="text"
                  placeholder="search help"
                  className="pl-10 bg-white dark:bg-[#1e1e1e] border-[#8a8886] dark:border-[#5d5d5d] dark:text-[#ffffff] dark:placeholder:text-[#a0a0a0] focus:border-[#0078d4] focus:ring-[#0078d4]"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
              {/* Top help topics */}
              <section className="mb-6">
                <h3 className="text-[#323130] dark:text-[#ffffff] mb-3">Top help topics</h3>
                <div className="space-y-2">
                  {helpTopics.map((topic, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-[#0078d4] dark:text-[#4fa3e3] hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      {topic}
                    </a>
                  ))}
                </div>
              </section>

              {/* Need more help */}
              <section className="mb-6">
                <h3 className="text-[#323130] dark:text-[#ffffff] mb-2">Need more help?</h3>
                <p className="text-[#323130] dark:text-[#d0d0d0] text-sm mb-2">
                  You can always ask an expert in the{' '}
                  <a
                    href="#"
                    className="text-[#0078d4] dark:text-[#4fa3e3] hover:underline inline-flex items-center gap-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    Excel Tech Community
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline">
                      <path d="M10 1H2C1.44772 1 1 1.44772 1 2V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V2C11 1.44772 10.5523 1 10 1Z" stroke="currentColor" strokeWidth="1"/>
                      <path d="M8 4L4 8M8 4H5M8 4V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </a>
                  {' '}or get support in{' '}
                  <a
                    href="#"
                    className="text-[#0078d4] dark:text-[#4fa3e3] hover:underline inline-flex items-center gap-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    Communities
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline">
                      <path d="M10 1H2C1.44772 1 1 1.44772 1 2V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V2C11 1.44772 10.5523 1 10 1Z" stroke="currentColor" strokeWidth="1"/>
                      <path d="M8 4L4 8M8 4H5M8 4V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </a>
                  .
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#edebe9] dark:border-[#3d3d3d] text-center text-sm text-[#605e5c] dark:text-[#a0a0a0]">
              <div className="space-x-2">
                <a href="#" className="hover:underline" onClick={(e) => e.preventDefault()}>
                  Legal
                </a>
                <span>|</span>
                <a href="#" className="hover:underline" onClick={(e) => e.preventDefault()}>
                  Privacy & cookies
                </a>
              </div>
              <div className="mt-1">
                <a href="#" className="hover:underline" onClick={(e) => e.preventDefault()}>
                  Consumer Health Privacy
                </a>
              </div>
              <div className="mt-1">
                <a href="#" className="hover:underline text-[#0078d4] dark:text-[#4fa3e3]" onClick={(e) => e.preventDefault()}>
                  Your Privacy Choices
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});