import * as React from 'react';

/**
 * A visual focus indicator that displays a double-bordered ring overlay.
 * Appears as a rectangular container with a black outer border (2px) and a white inner border (1px),
 * creating a high-contrast focus indication. When not visible, renders nothing (null).
 * Default size is 154px wide by 96px tall with rounded corners.
 * 
 * Used to provide a prominent, accessible visual indicator when an element has keyboard focus.
 * Particularly useful for overlaying on interactive elements like cards, thumbnails, or custom controls
 * that need clear focus states for keyboard navigation.
 */
export interface FocusRingProps {
  className?: string; // Custom CSS classes to override the default dimensions and styling. If not provided, defaults to "h-[96px] relative w-[154px]"
  visible?: boolean; // Controls whether the focus ring is rendered. When false, component returns null and nothing is displayed (default: false)
  onFocus?: () => void; // Callback function triggered when the focus ring receives focus
  onBlur?: () => void; // Callback function triggered when the focus ring loses focus
}

// ---------------------- Main Component ----------------------

export function FocusRing({ 
  className,
  visible = false,
  onFocus,
  onBlur
}: FocusRingProps) {
  if (!visible) {
    return null;
  }

  return (
    <div 
      className={className || "h-[96px] relative w-[154px]"} 
      data-name="Focus ring"
      onFocus={onFocus}
      onBlur={onBlur}
      role="presentation"
    >
      <div className="absolute border-2 border-black border-solid inset-0 rounded-[4px]" data-name="Border-outer" />
      <div className="absolute border border-solid border-white inset-[2px] rounded-[2px]" data-name="Border-inner" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface FocusRingProps_Display {
  // No props - the display component shows the focus ring in its default visible state
}

function FocusRing_Display({}: FocusRingProps_Display) {
  return (
    <div className="relative inline-flex items-center justify-center p-8">
      <div className="h-[96px] w-[154px] bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
        Focused Element
      </div>
      <FocusRing visible={true} className="absolute inset-0" />
    </div>
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultFocusRing
export function FocusRingDefault() {
  return <FocusRing_Display />;
}