import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import svgPaths from "./svg-ncuk24tl3t";

/**
 * A dropdown menu component with keyboard navigation, section headers, dividers, and split action items.
 * Appears as a floating white rounded card with shadow overlay, typically positioned absolutely near a trigger button.
 * 
 * The component automatically handles:
 * - Click outside to close
 * - Escape key to close
 * - Arrow key navigation (up/down)
 * - Enter/Space to activate focused items
 * - Keyboard focus management
 * 
 * In default mode (customMenu=false), displays:
 * - Two section headers
 * - Three standard menu items
 * - A divider
 * - Three split items (with main action and chevron dropdown button)
 * 
 * In custom mode (customMenu=true), displays the content passed to the instance prop or a placeholder.
 */
export interface MenuMenuProps {
  className?: string; // Custom CSS classes for the menu container. Default: "bg-white relative rounded-[4px] w-[260px]"
  customMenu?: boolean; // When true, displays custom content from instance prop instead of default menu items. Default: false
  instance?: React.ReactNode | null; // Custom content to display when customMenu is true. Shows a placeholder if not provided. Default: null
  open?: boolean; // Controls whether the menu is visible. When false, component returns null. Default: false
  onOpenChange?: (open: boolean) => void; // Callback when menu should open/close (triggered by click outside, Escape key, or item selection)
  onMenuItemClick?: (itemIndex: number) => void; // Callback when a standard menu item is clicked (indices 0-2 for the three default items). Menu closes automatically after calling this.
  onSplitItemClick?: (itemIndex: number, isSplitButton: boolean) => void; // Callback when a split item is clicked. First parameter is the item index (0-2), second indicates if the chevron button (true) or main area (false) was clicked. Menu closes only when main area is clicked.
}

// ---------------------- Main Component ----------------------

export function MenuMenu({ 
  className, 
  customMenu = false, 
  instance = null,
  open = false,
  onOpenChange,
  onMenuItemClick,
  onSplitItemClick
}: MenuMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const isCustomMenu = customMenu;
  const isNotCustomMenu = !customMenu;

  // Handle click outside to close menu
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onOpenChange?.(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onOpenChange]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
      if (!menuItems) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex(prev => (prev + 1) % menuItems.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex(prev => (prev - 1 + menuItems.length) % menuItems.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Focus management
  useEffect(() => {
    if (focusedIndex >= 0) {
      const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
      const item = menuItems?.[focusedIndex] as HTMLElement;
      item?.focus();
    }
  }, [focusedIndex]);

  const handleMenuItemClick = (index: number) => {
    onMenuItemClick?.(index);
    onOpenChange?.(false);
  };

  const handleSplitClick = (index: number, isSplit: boolean) => {
    onSplitItemClick?.(index, isSplit);
    if (!isSplit) {
      onOpenChange?.(false);
    }
  };

  if (!open) return null;

  return (
    <div 
      ref={menuRef}
      className={className || "bg-white relative rounded-[4px] w-[260px]"}
      role="menu"
      aria-orientation="vertical"
    >
      <div className={`content-stretch flex flex-col items-start overflow-clip p-[4px] relative rounded-[inherit] w-full ${isCustomMenu ? "" : "gap-[2px]"}`}>
        {isNotCustomMenu && (
          <>
            <MenuSection className="bg-white min-h-[32px] min-w-[120px] relative rounded-[4px] shrink-0 w-full" />
            <MenuMenuMenuItem onClick={() => handleMenuItemClick(0)}>
              <p className="leading-[20px] whitespace-pre-wrap">Action</p>
            </MenuMenuMenuItem>
            <MenuMenuMenuItem onClick={() => handleMenuItemClick(1)}>
              <p className="leading-[20px] whitespace-pre-wrap">Action</p>
            </MenuMenuMenuItem>
            <MenuMenuMenuItem onClick={() => handleMenuItemClick(2)}>
              <p className="leading-[20px] whitespace-pre-wrap">Action</p>
            </MenuMenuMenuItem>
            <MenuSection className="h-[5px] max-h-[5px] min-w-[120px] relative shrink-0 w-full" divider state="Disabled" />
            <MenuSection className="bg-white min-h-[32px] min-w-[120px] relative rounded-[4px] shrink-0 w-full" />
            <div className="bg-white min-h-[32px] min-w-[120px] relative rounded-[4px] shrink-0 w-full" data-name="Menu split item" role="menuitem" tabIndex={0}>
              <Text 
                text="Shortcut text"
                onClick={() => handleSplitClick(0, false)}
                onSplitClick={() => handleSplitClick(0, true)}
              >
                Action
              </Text>
            </div>
            <div className="bg-white min-h-[32px] min-w-[120px] relative rounded-[4px] shrink-0 w-full" data-name="Menu split item" role="menuitem" tabIndex={0}>
              <Text 
                text="Shortcut text"
                onClick={() => handleSplitClick(1, false)}
                onSplitClick={() => handleSplitClick(1, true)}
              >
                Action
              </Text>
            </div>
            <div className="bg-white min-h-[32px] min-w-[120px] relative rounded-[4px] shrink-0 w-full" data-name="Menu split item" role="menuitem" tabIndex={0}>
              <Text 
                text="Shortcut text"
                onClick={() => handleSplitClick(2, false)}
                onSplitClick={() => handleSplitClick(2, true)}
              >
                Action
              </Text>
            </div>
          </>
        )}
        {isCustomMenu && (instance || <ContentPlaceholder className="bg-[#ebf3fc] h-[44px] relative shrink-0 w-full" />)}
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]" />
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function ItemContent({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[6px] pr-[2px] py-[6px] relative w-full">{children}</div>
    </div>
  );
}

function TextContainer({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[2px] relative w-full">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

type TextProps = {
  text: string;
  onClick?: () => void;
  onSplitClick?: () => void;
};

function Text({ text, children, onClick, onSplitClick }: React.PropsWithChildren<TextProps>) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSplitHovered, setIsSplitHovered] = useState(false);

  return (
    <div className="content-stretch flex gap-[4px] items-start min-h-[inherit] min-w-[inherit] relative w-full">
      <div 
        className="flex-[1_0_0] cursor-pointer transition-colors hover:bg-[#f5f5f5] rounded-l-[4px]"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ItemContent>
          <Size20ThemeRegular />
          <TextContainer>
            <p className="leading-[20px] whitespace-pre-wrap">{children}</p>
          </TextContainer>
          <div className="content-stretch flex items-center justify-end px-[2px] relative shrink-0" data-name="End content">
            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[14px] text-right whitespace-nowrap">
              <p className="leading-[20px]">{text}</p>
            </div>
          </div>
        </ItemContent>
      </div>
      <button
        type="button"
        className="bg-white max-w-[25px] min-w-[25px] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0 w-[25px] cursor-pointer transition-colors hover:bg-[#f5f5f5] border-0 p-0"
        data-name=".Item split button"
        onClick={onSplitClick}
        onMouseEnter={() => setIsSplitHovered(true)}
        onMouseLeave={() => setIsSplitHovered(false)}
        aria-label="More options"
      >
        <div className="flex flex-row items-center justify-end max-w-[inherit] min-w-[inherit] size-full">
          <div className="content-stretch flex items-center justify-end max-w-[inherit] min-w-[inherit] px-[2px] py-[6px] relative size-full">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Chevron">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12.001px] left-[calc(50%+0.75px)] top-1/2 w-[6.499px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.49919 12.0008">
                  <path d={svgPaths.p154164f0} fill="var(--fill-0, #424242)" id="Shape" />
                </svg>
              </div>
            </div>
            <div className="absolute bg-[#d1d1d1] bottom-[4px] left-0 top-[4px] w-px" data-name="Divider" />
          </div>
        </div>
      </button>
    </div>
  );
}

function Size20ThemeRegular() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p19631e80} fill="var(--fill-0, #424242)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

type MenuMenuItemProps = {
  onClick?: () => void;
};

function MenuMenuMenuItem({ children, onClick }: React.PropsWithChildren<MenuMenuItemProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white min-h-[32px] min-w-[120px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors hover:bg-[#f5f5f5]"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="menuitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="content-stretch flex gap-[4px] items-start min-h-[inherit] min-w-[inherit] relative w-full">
        <ItemContent>
          <Size20ThemeRegular />
          <TextContainer>{children}</TextContainer>
        </ItemContent>
      </div>
    </div>
  );
}

function ContentPlaceholder({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#ebf3fc] h-[44px] relative w-[250px]"} data-name="Content placeholder">
      <div className="flex flex-col items-center justify-center size-full">
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
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#115ea3] text-[10px] text-center w-full whitespace-pre-wrap">SWAP AREA WITH YOUR COMPONENT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MenuSectionProps = {
  className?: string;
  divider?: boolean;
  primaryString?: string;
  state?: "Rest" | "Disabled";
};

function MenuSection({ className, divider = false, primaryString = "Section header", state = "Rest" }: MenuSectionProps) {
  const isDividerAndDisabled = divider && state === "Disabled";
  const isNotDividerAndRest = !divider && state === "Rest";
  return (
    <div className={className || `min-w-[120px] relative w-[240px] ${isDividerAndDisabled ? "h-[5px] max-h-[5px]" : "bg-white min-h-[32px] rounded-[4px]"}`}>
      <div className={`content-stretch flex items-start min-w-[inherit] px-[6px] py-[8px] relative ${isDividerAndDisabled ? "max-h-[inherit] size-full" : "min-h-[inherit] w-full"}`}>
        {isNotDividerAndRest && (
          <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#424242] text-[12px]">
            <p className="leading-[16px] whitespace-pre-wrap">{primaryString}</p>
          </div>
        )}
        {isDividerAndDisabled && <div className="-translate-y-1/2 absolute bg-[#e0e0e0] h-px left-[-4px] right-[-4px] top-1/2" />}
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface MenuMenuProps_Display {
  className?: string;
  customMenu?: boolean;
  instance?: React.ReactNode | null;
}

function MenuMenu_Display({
  className,
  customMenu,
  instance,
}: MenuMenuProps_Display) {
  const [open, setOpen] = React.useState(true);

  const handleOpenChange = (newOpen: boolean) => {
    // Keep menu open for display purposes
    setOpen(true);
  };

  const handleMenuItemClick = (itemIndex: number) => {
    // Empty implementation for display
  };

  const handleSplitItemClick = (itemIndex: number, isSplitButton: boolean) => {
    // Empty implementation for display
  };

  return (
    <MenuMenu
      className={className}
      customMenu={customMenu}
      instance={instance}
      open={open}
      onOpenChange={handleOpenChange}
      onMenuItemClick={handleMenuItemClick}
      onSplitItemClick={handleSplitItemClick}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultMenu
export function DefaultMenuExample() {
  return (
    <MenuMenu_Display
      customMenu={false}
    />
  );
}

// @figmaExample CustomMenuWithContent
export function CustomMenuWithContentExample() {
  return (
    <MenuMenu_Display
      customMenu={true}
      instance={(
        <div className="p-4">
          <div className="font-semibold text-sm mb-2">Custom Menu Content</div>
          <div className="text-xs text-gray-600 mb-3">
            This is a custom menu with tailored content
          </div>
          <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded">
            Custom Action 1
          </button>
          <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded">
            Custom Action 2
          </button>
        </div>
      )}
    />
  );
}

// @figmaExample StyledDefaultMenu
export function StyledDefaultMenuExample() {
  return (
    <MenuMenu_Display
      className="bg-white relative rounded-[8px] w-[300px] shadow-lg"
      customMenu={false}
    />
  );
}