import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ltiImage from '../assets/LTI_EDU_Light.png';

interface LtiPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LtiPreviewModal({ isOpen, onClose }: LtiPreviewModalProps) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setShowHint(true);
    const hideTimer = window.setTimeout(() => setShowHint(false), 2500);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(hideTimer);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Render into document.body so the modal always covers the viewport,
  // regardless of any ancestor with transforms / filters / etc that would
  // otherwise become the containing block for `position: fixed`.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="LTI preview"
    >
      <div
        className={`pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 text-white text-sm font-['Segoe_UI',sans-serif] transition-opacity duration-700 ${
          showHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Press ESC to return
      </div>
      <img
        src={ltiImage}
        alt="LTI EDU Light preview"
        className="max-w-[95vw] max-h-[95vh] object-contain cursor-default"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
}
