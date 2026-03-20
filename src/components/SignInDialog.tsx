import { memo, useState, useCallback } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import profileIcon from 'figma:asset/1fccae1a9f64af9240f71c3e987e8891da190b73.png';

interface SignInDialogProps {
  isOpen: boolean;
  onSignIn: () => void;
  onCancel: () => void;
}

export const SignInDialog = memo(function SignInDialog({ isOpen, onSignIn, onCancel }: SignInDialogProps) {
  const [step, setStep] = useState<'pick' | 'signing-in'>('pick');

  const handleAccountClick = useCallback(() => {
    setStep('signing-in');
    setTimeout(() => {
      onSignIn();
      setStep('pick');
    }, 1200);
  }, [onSignIn]);

  const handleCancel = useCallback(() => {
    setStep('pick');
    onCancel();
  }, [onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleCancel} />
      
      {/* Dialog */}
      <div className="relative bg-white rounded shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] w-[440px] max-w-[90vw]">
        {/* Microsoft logo header */}
        <div className="px-11 pt-10 pb-4">
          <div className="flex items-center gap-[4px] mb-6">
            <div className="relative shrink-0 size-[24px]">
              <div className="absolute bg-[#f25022] size-[10px] top-[1px] left-[1px]" />
              <div className="absolute bg-[#80ba01] size-[10px] top-[1px] left-[13px]" />
              <div className="absolute bg-[#ffb902] size-[10px] top-[13px] left-[13px]" />
              <div className="absolute bg-[#02a4ef] size-[10px] top-[13px] left-[1px]" />
            </div>
            <span className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-[#242424] tracking-[-0.2px]">Microsoft</span>
          </div>

          {step === 'pick' ? (
            <>
              <h2 className="font-['Segoe_UI',sans-serif] text-[24px] text-[#1b1b1b] mb-3">
                Pick an account
              </h2>
              <p className="font-['Segoe_UI',sans-serif] text-[13px] text-[#616161] mb-6">
                to continue to OneNote Class Notebook
              </p>

              {/* Account option */}
              <button
                onClick={handleAccountClick}
                className="w-full flex items-center gap-3 px-3 py-3 hover:bg-[#f5f5f5] transition-colors rounded text-left -mx-3"
              >
                <ImageWithFallback
                  src={profileIcon}
                  alt="Agnes Gustve"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-['Segoe_UI:Semibold',sans-serif] text-[14px] text-[#242424] truncate">Agnes Gustve</div>
                  <div className="font-['Segoe_UI',sans-serif] text-[12px] text-[#616161] truncate">agnes@contoso.com</div>
                </div>
              </button>

              {/* Use another account */}
              <button
                className="w-full flex items-center gap-3 px-3 py-3 hover:bg-[#f5f5f5] transition-colors rounded text-left -mx-3 mt-1"
                onClick={handleAccountClick}
              >
                <div className="w-10 h-10 rounded-full bg-[#e0e0e0] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 16c0-2.21 2.69-4 6-4s6 1.79 6 4v1H4v-1z" fill="#616161"/>
                  </svg>
                </div>
                <div className="font-['Segoe_UI',sans-serif] text-[14px] text-[#242424]">
                  Use another account
                </div>
              </button>
            </>
          ) : (
            <>
              <h2 className="font-['Segoe_UI',sans-serif] text-[24px] text-[#1b1b1b] mb-6">
                Signing in...
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <ImageWithFallback
                  src={profileIcon}
                  alt="Agnes Gustve"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-['Segoe_UI:Semibold',sans-serif] text-[14px] text-[#242424]">Agnes Gustve</div>
                  <div className="font-['Segoe_UI',sans-serif] text-[12px] text-[#616161]">agnes@contoso.com</div>
                </div>
              </div>
              {/* Loading bar */}
              <div className="w-full h-[2px] bg-[#e0e0e0] rounded overflow-hidden mb-4">
                <div className="h-full bg-[#0078d4] animate-[loading_1.2s_ease-in-out]" 
                  style={{ width: '100%' }}
                />
              </div>
              <style>{`
                @keyframes loading {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
              `}</style>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-11 py-4 border-t border-[#e0e0e0] flex justify-end">
          <button
            onClick={handleCancel}
            className="font-['Segoe_UI',sans-serif] text-[13px] text-[#616161] hover:text-[#242424] transition-colors px-3 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});
