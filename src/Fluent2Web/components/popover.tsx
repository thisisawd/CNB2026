import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ReactNode } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-mrdjzdi680';

/**
 * A floating dialog container that displays content above other page elements.
 * Appears as a rounded rectangular card with shadow effects, positioned by the parent container.
 * 
 * This component supports both controlled and uncontrolled modes:
 * - Controlled: Pass both `open` and `onOpenChange` props to manage state externally
 * - Uncontrolled: Omit `open` prop to let the component manage its own open state
 * 
 * The popover automatically handles:
 * - Escape key press to close
 * - Click outside to close
 * - Focus management when opened
 * - Accessibility attributes (role="dialog")
 * 
 * IMPORTANT: This component only renders when open. It returns null when closed.
 */
export interface PopoverProps {
  className?: string; // Custom CSS classes to override default positioning and styling (default: relative positioning with rounded corners)
  contentSwap?: ReactNode | null; // Custom content to display inside the popover (default: placeholder text)
  style?: 'Default' | 'Inverted' | 'Brand'; // Visual style variant - "Default": white bg, "Inverted": dark bg, "Brand": blue bg (default: "Default")
  open?: boolean; // Controlled open state - when provided, component becomes controlled
  onOpenChange?: (open: boolean) => void; // Callback fired when popover should open or close - required when using controlled mode
}

// ---------------------- Main Component ----------------------

export function Popover({ 
  className, 
  contentSwap = null, 
  style = "Default",
  open: controlledOpen,
  onOpenChange 
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  // Use controlled open state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
  };
  
  // Handle escape key to close popover
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleOpenChange(false);
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);
  
  // Handle click outside to close popover
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        handleOpenChange(false);
      }
    };
    
    // Use setTimeout to avoid closing immediately on the same click that opened it
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  // Focus management - focus the popover when it opens
  useEffect(() => {
    if (isOpen && popoverRef.current) {
      popoverRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }
  
  const isBrand = style === "Brand";
  const isInverted = style === "Inverted";
  
  return (
    <div 
      ref={popoverRef}
      className={className || `relative rounded-[4px] ${isInverted ? "bg-[#292929]" : isBrand ? "bg-[#0f6cbd]" : "bg-white"}`}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
    >
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] ${isBrand ? "border-[#0f6cbd]" : "border-[rgba(255,255,255,0)]"}`} />
      <div className="content-stretch flex flex-col items-start p-[16px] relative">
        {contentSwap || (
          <div className="bg-[#ebf3fc] h-[44px] relative shrink-0 w-[250px]" data-name="Content placeholder">
            <Text text="SWAP AREA WITH YOUR COMPONENT" additionalClassNames="overflow-clip rounded-[inherit]" />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type TextProps = {
  text: string;
  additionalClassNames?: string;
};

export function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("flex flex-col items-center justify-center size-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-center justify-center relative size-full">
        <div className="content-stretch flex gap-[6px] h-[44px] items-center justify-center relative shrink-0 w-full" data-name="Container">
          <div className="relative shrink-0 size-[16px]" data-name="Arrow Swap">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-1/2 top-1/2 w-[10px]" data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 13">
                <path d={svgPaths.p3958af00} fill="var(--fill-0, #115EA3)" id="Shape" />
              </svg>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center pb-[2px] relative shrink-0" data-name="Text">
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#115ea3] text-[10px] text-center w-full whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentPlaceholder({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#ebf3fc] h-[44px] relative w-[250px]"} data-name="Content placeholder">
      <Text text="SWAP AREA WITH YOUR COMPONENT" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface PopoverProps_Display {
  contentSwap?: ReactNode | null;
  style?: 'Default' | 'Inverted' | 'Brand';
}

function Popover_Display({
  style,
  contentSwap,
}: PopoverProps_Display) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      style={style}
      contentSwap={contentSwap}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultPopoverWithContent
export function DefaultPopoverWithContent() {
  return (
    <Popover_Display
      style="Default"
      contentSwap={
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Default Popover</h3>
          <p className="text-sm text-gray-600">This is a default style popover with white background.</p>
        </div>
      }
    />
  );
}

// @figmaExample InvertedPopoverWithDarkTheme
export function InvertedPopoverWithDarkTheme() {
  return (
    <Popover_Display
      style="Inverted"
      contentSwap={
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-white">Inverted Popover</h3>
          <p className="text-sm text-gray-300">This is an inverted style popover with dark background.</p>
        </div>
      }
    />
  );
}

// @figmaExample BrandPopoverWithBlueTheme
export function BrandPopoverWithBlueTheme() {
  return (
    <Popover_Display
      style="Brand"
      contentSwap={
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-white">Brand Popover</h3>
          <p className="text-sm text-blue-100">This is a brand style popover with blue background.</p>
        </div>
      }
    />
  );
}

// @figmaExample DefaultPopoverWithActionComplete
export function DefaultPopoverWithActionComplete() {
  return (
    <Popover_Display
      style="Default"
      contentSwap={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <div>
            <h4 className="font-medium">Action Complete</h4>
            <p className="text-xs text-gray-500">Your changes have been saved</p>
          </div>
        </div>
      }
    />
  );
}

// @figmaExample DefaultPopoverWithPlaceholder
export function DefaultPopoverWithPlaceholder() {
  return (
    <Popover_Display
      style="Default"
    />
  );
}