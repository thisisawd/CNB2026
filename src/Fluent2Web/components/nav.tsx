import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-hkwn4s5ojj';

/**
 * A collapsible side navigation panel with a hamburger menu toggle button.
 * Appears as a vertical panel with a light gray background (#f0f0f0) and default width of 260px.
 * The hamburger button is positioned at the top, and when expanded, displays the navigation content below it.
 * 
 * The component supports both controlled and uncontrolled state patterns. When used in uncontrolled mode,
 * it manages its own open/closed state (defaults to open). When used in controlled mode with isOpen and
 * onToggle props, the parent component manages the state.
 * 
 * Usage Notes:
 * - The navigation defaults to open state when used in uncontrolled mode
 * - Use controlled mode (isOpen + onToggle) when you need to manage nav state from parent component
 * - Use uncontrolled mode for simple cases where the nav can manage its own state
 * - The hamburger button includes proper ARIA label for accessibility
 */
export interface NavProps {
  className?: string; // Custom CSS classes to override default styling. If not provided, defaults to "bg-[#f0f0f0] relative w-[260px]" (default: "bg-[#f0f0f0] relative w-[260px]")
  navBody?: React.ReactNode | null; // The content to display in the navigation panel when expanded. If not provided, a placeholder with "SWAP WITH CONTENT COMPONENT" text is shown
  isOpen?: boolean; // Controlled state to determine if the navigation is expanded or collapsed. When provided, the component operates in controlled mode
  onToggle?: (isOpen: boolean) => void; // Callback function invoked when the hamburger button is clicked. Receives the new open/closed state as an argument
}

// ---------------------- Main Component ----------------------

export function Nav({ className, navBody = null, isOpen: controlledIsOpen, onToggle }: NavProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleHamburgerClick = () => {
    const newIsOpen = !isOpen;
    
    // Update internal state if not controlled
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }
    
    // Call callback if provided
    if (onToggle) {
      onToggle(newIsOpen);
    }
  };
  
  return (
    <div className={className || "bg-[#f0f0f0] relative w-[260px]"} data-name="Nav">
      <div className="content-stretch flex flex-col gap-[2px] items-start pb-[4px] relative w-full">
        <Hamburger className="relative shrink-0 w-[50px]" onClick={handleHamburgerClick} />
        {isOpen && (navBody || (
          <div className="bg-[#ebf3fc] relative shrink-0 w-full" data-name="Placeholder">
            <div className="flex flex-row items-center justify-center size-full">
              <Text text="SWAP WITH CONTENT COMPONENT" additionalClassNames="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export function Placeholder1() {
  return (
    <div className="bg-[#ebf3fc] relative shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <Text text="SWAP WITH CONTENT COMPONENT" />
      </div>
    </div>
  );
}

type TextProps = {
  text: string;
  additionalClassNames?: string;
};

export function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center px-[43px] py-[15px] relative", additionalClassNames)}>
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f6cbd] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}

type HamburgerProps = {
  className?: string;
  onClick?: () => void;
};

export function Hamburger({ className, onClick }: HamburgerProps) {
  return (
    <div className={className || "relative w-[50px]"} data-name=".Hamburger">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[10px] relative w-full">
          <button
            type="button"
            onClick={onClick}
            className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] border-0 bg-transparent cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors"
            data-name="Button"
            aria-label="Toggle navigation menu"
          >
            <div className="content-stretch flex items-start p-[10px] relative w-full">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Navigation">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[11px] left-1/2 top-[calc(50%-0.5px)] w-[16px]" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11">
                    <path d={svgPaths.p2b73f200} fill="var(--fill-0, #424242)" id="Shape" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

type PlaceholderProps = {
  className?: string;
  image?: React.ReactNode | null;
  instance?: React.ReactNode | null;
  slot?: "1" | "2";
  slotBefore?: boolean;
};

export function Placeholder({ className, image = null, instance = null, slot = "1", slotBefore = true }: PlaceholderProps) {
  const is1 = slot === "1";
  const is2 = slot === "2";
  return (
    <div className={className || `relative ${is2 ? "" : "-translate-y-1/2 bg-[#ebf3fc]"}`}>
      <div className={`flex ${is2 ? "content-stretch gap-[16px] items-start relative" : "flex-row items-center justify-center size-full"}`}>
        {is1 && <Text text="SWAP WITH CONTENT COMPONENT" />}
        {is2 && slotBefore && (image || <Placeholder1 />)}
        {is2 && (instance || <Placeholder1 />)}
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface NavProps_Display {
  className?: string;
  navBody?: React.ReactNode | null;
}

function Nav_Display({ className, navBody }: NavProps_Display) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Nav
      className={className}
      navBody={navBody}
      isOpen={isOpen}
      onToggle={setIsOpen}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample BasicMenuNav
export function NavWithBasicMenu() {
  return (
    <Nav_Display
      navBody={
        <div className="p-4 space-y-2">
          <div className="font-semibold text-lg mb-4">Menu</div>
          <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">Dashboard</div>
          <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">Projects</div>
          <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">Team</div>
          <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">Settings</div>
        </div>
      }
    />
  );
}

// @figmaExample GroupedNavigationNav
export function NavWithGroupedSections() {
  return (
    <Nav_Display
      navBody={
        <div className="p-4 space-y-3">
          <div className="font-bold text-xl mb-4">Navigation</div>
          <div className="space-y-1">
            <div className="text-xs text-gray-500 uppercase tracking-wide px-2">Main</div>
            <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">🏠 Home</div>
            <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">📊 Analytics</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-gray-500 uppercase tracking-wide px-2">Tools</div>
            <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">⚙️ Settings</div>
            <div className="hover:bg-gray-200 p-2 rounded cursor-pointer">👤 Profile</div>
          </div>
        </div>
      }
    />
  );
}

// @figmaExample DarkThemeNav
export function NavWithDarkTheme() {
  return (
    <Nav_Display
      className="bg-slate-800 text-white relative w-[280px]"
      navBody={
        <div className="p-4 space-y-2">
          <div className="font-bold text-xl mb-4 text-white">Dark Nav</div>
          <div className="hover:bg-slate-700 p-2 rounded cursor-pointer text-white">Overview</div>
          <div className="hover:bg-slate-700 p-2 rounded cursor-pointer text-white">Reports</div>
          <div className="hover:bg-slate-700 p-2 rounded cursor-pointer text-white">Users</div>
          <div className="hover:bg-slate-700 p-2 rounded cursor-pointer text-white">Admin</div>
        </div>
      }
    />
  );
}

// @figmaExample CompactQuickLinksNav
export function NavWithQuickLinks() {
  return (
    <Nav_Display
      className="bg-blue-50 relative w-[220px]"
      navBody={
        <div className="p-3 space-y-2">
          <div className="font-semibold text-blue-900 mb-3">Quick Links</div>
          <div className="hover:bg-blue-100 p-2 rounded cursor-pointer text-sm">Documentation</div>
          <div className="hover:bg-blue-100 p-2 rounded cursor-pointer text-sm">API Reference</div>
          <div className="hover:bg-blue-100 p-2 rounded cursor-pointer text-sm">Support</div>
        </div>
      }
    />
  );
}