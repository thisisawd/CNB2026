import * as React from 'react';
import { useState, useEffect, useRef, ReactNode } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-dlz7elh6mo';

/**
 * A side panel component that can be displayed as an overlay (sliding in from the right) or inline within the page layout.
 * 
 * The overlay variant appears as a 320px wide panel that slides in from the right edge of the screen with a semi-transparent dark backdrop.
 * The inline variant appears embedded within the page layout with a white background.
 * 
 * Both variants include a header with customizable title text and close button, a scrollable body area for custom content,
 * and a footer with primary button (blue), secondary button (outlined), and minimize button (icon only).
 * 
 * USAGE NOTES:
 * - Use "Overlay" type for temporary panels that need user attention (forms, details, settings)
 * - Use "Inline" type for persistent panels that are part of the page layout (navigation, filters)
 * - The drawer is controlled via the `open` prop - use `onOpenChange` to respond to close actions
 * - Provide custom content as children to replace the default placeholder
 */
export interface DrawerProps {
  className?: string; // Custom CSS classes to apply to the drawer container
  type?: 'Overlay' | 'Inline'; // Display mode of the drawer (default: "Overlay")
  open?: boolean; // Controls drawer visibility (default: true). When false and type is "Overlay", drawer is unmounted
  onOpenChange?: (open: boolean) => void; // Callback fired when drawer should close (via backdrop click, Escape key, or close button)
  onPrimaryClick?: () => void; // Click handler for the primary (blue) button in footer
  onSecondaryClick?: () => void; // Click handler for the secondary (outlined) button in footer
  onMinimizeClick?: () => void; // Click handler for the minimize button in footer
  title?: string; // Text displayed in the header (default: "Title")
  children?: ReactNode; // Custom content to display in the body section. If not provided, shows a placeholder message
}

// ---------------------- Main Component ----------------------

export function Drawer({ 
  className, 
  type = "Overlay",
  open = true,
  onOpenChange,
  onPrimaryClick,
  onSecondaryClick,
  onMinimizeClick,
  title = "Title",
  children
}: DrawerProps) {
  const isInline = type === "Inline";
  const isOverlay = type === "Overlay";
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close drawer
  useEffect(() => {
    if (!open || isInline) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onOpenChange) {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange, isInline]);

  // Focus management
  useEffect(() => {
    if (open && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [open]);

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (isOverlay && e.target === overlayRef.current && onOpenChange) {
      onOpenChange(false);
    }
  };

  if (!open && isOverlay) {
    return null;
  }

  const content = (
    <div ref={drawerRef} className={className || `h-[952px] relative ${isInline ? "" : "w-[320px]"}`}>
      <div className={`content-stretch flex flex-col items-start relative ${isInline ? "h-full" : "size-full"}`}>
        {isOverlay && (
          <Wrapper1 additionalClassNames="shadow-[0px_32px_64px_0px_rgba(0,0,0,0.24),0px_0px_8px_0px_rgba(0,0,0,0.2)]">
            <DrawerDrawerHeaderText text={title} additionalClassNames="w-full" onClose={handleClose} />
            <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Body">
              <div className="content-stretch flex items-start px-[24px] relative size-full">
                {children || <DrawerSlotText text="SWAP WITH CONTENT COMPONENT" />}
              </div>
            </div>
            <DrawerFooter 
              additionalClassNames="w-full" 
              onPrimaryClick={onPrimaryClick}
              onSecondaryClick={onSecondaryClick}
              onMinimizeClick={onMinimizeClick}
            />
          </Wrapper1>
        )}
        {isInline && (
          <Wrapper1 additionalClassNames="bg-white">
            <DrawerDrawerHeaderText text={title} additionalClassNames="w-[592px]" onClose={handleClose} />
            <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px px-[24px] relative w-[320px]" data-name="Body">
              {children || <DrawerSlotText text="SWAP WITH CONTENT COMPONENT" />}
            </div>
            <DrawerFooter 
              additionalClassNames="w-[592px]" 
              onPrimaryClick={onPrimaryClick}
              onSecondaryClick={onSecondaryClick}
              onMinimizeClick={onMinimizeClick}
            />
          </Wrapper1>
        )}
      </div>
    </div>
  );

  if (isOverlay) {
    return (
      <div 
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="fixed inset-0 bg-black/30 flex items-start justify-end z-50"
        style={{ display: open ? 'flex' : 'none' }}
      >
        {content}
      </div>
    );
  }

  return content;
}

// ---------------------- Helper Components & Utilities ----------------------

type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("flex-[1_0_0] max-w-[320px] min-h-px min-w-[82px] relative w-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start max-w-[inherit] min-w-[inherit] relative size-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">{children}</div>
    </div>
  );
}

type ButtonProps = {
  onClick?: () => void;
};

function Button({ children, onClick }: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer border-0 p-0"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[6px] relative">{children}</div>
      </div>
    </button>
  );
}

type DrawerFooterProps = {
  additionalClassNames?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onMinimizeClick?: () => void;
};

function DrawerFooter({ children, additionalClassNames = "", onPrimaryClick, onSecondaryClick, onMinimizeClick }: React.PropsWithChildren<DrawerFooterProps>) {
  return (
    <div className={clsx("bg-white relative shrink-0", additionalClassNames)}>
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start justify-end pb-[24px] pt-[16px] px-[24px] relative w-full">
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Button container">
            <DrawerButtonText text="Primary" onClick={onPrimaryClick} />
            <DrawerButtonText1 text="Secondary" onClick={onSecondaryClick} />
            <Button onClick={onMinimizeClick}>
              <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                <div className="overflow-clip relative shrink-0 size-[20px]">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[2.5px] left-1/2 top-1/2 w-[12.5px]" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 2.5">
                      <path d={svgPaths.p1737d400} fill="var(--fill-0, #424242)" id="Shape" />
                    </svg>
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type DrawerButtonText1Props = {
  text: string;
  onClick?: () => void;
};

function DrawerButtonText1({ text, onClick }: DrawerButtonText1Props) {
  return (
    <button
      onClick={onClick}
      className="bg-white relative rounded-[4px] shrink-0 cursor-pointer border-0 p-0"
    >
      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Wrapper>
        <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center relative shrink-0" data-name="Container">
          <div className="content-stretch flex items-start pb-[2px] relative shrink-0" data-name="Text wrapper for offset">
            <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">{text}</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </button>
  );
}

type DrawerButtonTextProps = {
  text: string;
  onClick?: () => void;
};

function DrawerButtonText({ text, onClick }: DrawerButtonTextProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#0f6cbd] relative rounded-[4px] shrink-0 cursor-pointer border-0 p-0"
    >
      <Wrapper>
        <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
          <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
            <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
              <p className="leading-[20px]">{text}</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </button>
  );
}

type DrawerSlotTextProps = {
  text: string;
};

function DrawerSlotText({ text }: DrawerSlotTextProps) {
  return (
    <div className="bg-[#ebf3fc] flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[43px] py-[15px] relative size-full">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f6cbd] text-[10px] text-center whitespace-nowrap">
            <p className="leading-[14px]">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type DrawerDrawerHeaderTextProps = {
  text: string;
  additionalClassNames?: string;
  onClose?: () => void;
};

function DrawerDrawerHeaderText({ text, children, additionalClassNames = "", onClose }: React.PropsWithChildren<DrawerDrawerHeaderTextProps>) {
  return (
    <div className={clsx("bg-white relative shrink-0", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-start relative w-full">
        <div className="relative shrink-0 w-full" data-name="Navigation base">
          <div className="content-stretch flex items-start pb-[12px] pl-[24px] pr-[16px] pt-[24px] relative w-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Title base">
              <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Title container">
                <p className="flex-[1_0_0] font-['Segoe_UI:Semibold',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[#242424] text-[20px] whitespace-pre-wrap">{text}</p>
              </div>
              <Button onClick={onClose}>
                <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                        <path d={svgPaths.p301c8b00} fill="var(--fill-0, #424242)" id="Shape" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface DrawerProps_Display {
  type?: 'Overlay' | 'Inline';
  title?: string;
  children?: ReactNode;
}

function Drawer_Display({
  type,
  title,
  children,
}: DrawerProps_Display) {
  return (
    <Drawer
      type={type}
      title={title}
      children={children}
      open={true}
      onOpenChange={() => {}}
      onPrimaryClick={() => {}}
      onSecondaryClick={() => {}}
      onMinimizeClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample OverlayEditSettingsDrawer
export function OverlayEditSettingsDrawer() {
  return (
    <Drawer_Display
      type="Overlay"
      title="Edit Settings"
      children={
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Setting Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter value" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={4} placeholder="Enter description" />
          </div>
        </div>
      }
    />
  );
}

// @figmaExample InlineNavigationDrawer
export function InlineNavigationDrawer() {
  return (
    <Drawer_Display
      type="Inline"
      title="Navigation"
      children={
        <div className="p-4 space-y-2">
          <div className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Dashboard</div>
          <div className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Projects</div>
          <div className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Settings</div>
          <div className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Profile</div>
        </div>
      }
    />
  );
}

// @figmaExample OverlayDetailsPanelDrawer
export function OverlayDetailsPanelDrawer() {
  return (
    <Drawer_Display
      type="Overlay"
      title="Details Panel"
      children={
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-600">Status</span>
            <span className="text-sm font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-600">Created</span>
            <span className="text-sm font-medium">Jan 15, 2024</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-600">Last Modified</span>
            <span className="text-sm font-medium">Jan 20, 2024</span>
          </div>
        </div>
      }
    />
  );
}

// @figmaExample InlineFiltersDrawer
export function InlineFiltersDrawer() {
  return (
    <Drawer_Display
      type="Inline"
      title="Filters"
      children={
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>All Categories</option>
              <option>Design</option>
              <option>Development</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
      }
    />
  );
}