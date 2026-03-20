import { X, Layers } from 'lucide-react';
import { memo, useCallback, useMemo } from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'motion/react';

interface FeatureFlagsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  featureFlags: Record<string, boolean>;
  onFeatureFlagChange: (flagKey: string, value: boolean) => void;
  onFluentComparison?: () => void;
}

const FLAG_DESCRIPTIONS: Record<string, string> = {
  teacher_student_icon_alt1: 'Use alternate icon style for teacher/student cards on the Welcome page.',
  fluent2_components: 'Replace current UI components with Microsoft Fluent 2 Web components across the entire app.',
};

export const FeatureFlagsPanel = memo(function FeatureFlagsPanel({ isOpen, onClose, featureFlags, onFeatureFlagChange, onFluentComparison }: FeatureFlagsPanelProps) {
  const flagEntries = useMemo(() => Object.entries(featureFlags), [featureFlags]);

  const formatFlagName = useCallback((key: string) => {
    if (key === 'fluent2_components') return 'Fluent 2 Components';
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }, []);

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
          
          {/* Feature Flags Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#edebe9]">
              <h2 className="text-[#323130]">Feature flags</h2>
              <button
                onClick={onClose}
                className="hover:bg-[#f3f2f1] p-1.5 rounded transition-colors"
              >
                <X className="text-[#605e5c]" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-5">
                {flagEntries.length === 0 ? (
                  <p className="text-[#605e5c] text-sm">No feature flags defined yet.</p>
                ) : (
                  flagEntries.map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={key} className="text-[#323130] cursor-pointer">
                          {formatFlagName(key)}
                        </Label>
                        <Switch
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) => onFeatureFlagChange(key, checked)}
                        />
                      </div>
                      {FLAG_DESCRIPTIONS[key] && (
                        <p className="text-[11px] text-[#605e5c] leading-tight pr-12">
                          {FLAG_DESCRIPTIONS[key]}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Fluent 2 Comparison Link */}
              {onFluentComparison && (
                <div className="mt-6 pt-4 border-t border-[#edebe9]">
                  <button
                    onClick={() => {
                      onFluentComparison();
                      onClose();
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2.5 text-[13px] text-[#0078d4] bg-[#f0f6ff] border border-[#d0e4ff] rounded-md hover:bg-[#e1efff] transition-colors"
                  >
                    <Layers className="w-4 h-4 flex-shrink-0" />
                    <div className="text-left">
                      <div>View Fluent 2 Comparison</div>
                      <div className="text-[10px] text-[#605e5c] mt-0.5">Side-by-side current vs. Fluent 2 components</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
