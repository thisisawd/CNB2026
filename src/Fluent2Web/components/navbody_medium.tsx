import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-lcseo5cvsi';
import imgNavNodeMedium from 'figma:asset/87508ace712c133af764a98a9a6ce42a16d6d3fc.png';

/**
 * NavBodyMedium
 * 
 * A complete navigation sidebar component with interactive navigation items, section headers, and dividers.
 * Appears as a vertical navigation panel with a default width of 260px. Items are displayed in a light gray
 * background (#f0f0f0) with hover effects, and active items are highlighted with a blue indicator bar on the
 * left and a darker background. Some navigation items include expandable chevrons that rotate 180 degrees when toggled.
 * 
 * IMPORTANT NOTES:
 * - This component renders hardcoded navigation items and is not dynamically configurable
 * - All items display the same "Nav content" text
 * - The component manages its own internal state for active and expanded items
 * - Both onItemClick and onNavigate callbacks are called when an item is clicked
 * - Chevron items can be toggled independently of selection
 */
export interface NavBodyMediumProps {
  className?: string; // Custom className for the container. Defaults to "relative w-[260px]" if not provided. Use this to override the width or positioning.
  activeItemId?: string; // The ID of the initially active navigation item (e.g., "nav-1", "nav-2", etc.). This sets the initial state but the component manages its own active state afterward.
  onItemClick?: (itemId: string) => void; // Callback function triggered when a navigation item is clicked. Receives the item ID as a parameter.
  onNavigate?: (itemId: string) => void; // Additional callback function triggered when a navigation item is clicked, called after onItemClick. Receives the item ID as a parameter. Use this for navigation logic.
}

// ---------------------- Main Component ----------------------

export function NavBodyMedium({ className, activeItemId, onItemClick, onNavigate }: NavBodyMediumProps) {
  const [activeId, setActiveId] = useState<string>(activeItemId || '');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleItemClick = (id: string) => {
    setActiveId(id);
    onItemClick?.(id);
    onNavigate?.(id);
  };

  const handleToggle = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={className || "relative w-[260px]"} data-name="NavBody - Medium">
      <div className="content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <div className="bg-[#f0f0f0] relative shrink-0 w-full" data-name="Flex space">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center px-[4px] relative w-full">
              <div className="bg-[#ebf3fc] flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Placeholder">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] left-[calc(50%-1px)] not-italic text-[#0f6cbd] text-[10px] text-center top-1/2 whitespace-nowrap">
                  <p className="leading-[14px]">SWAP WITH CONTENT COMPONENT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavNodeMedium id="nav-1" isActive={activeId === 'nav-1'} onClick={handleItemClick} />
        <NavNodeMedium1 
          id="nav-2" 
          isActive={activeId === 'nav-2'} 
          isExpanded={expandedIds.has('nav-2')}
          onClick={handleItemClick}
          onToggle={handleToggle}
        />
        <NavNodeMedium1 
          id="nav-3" 
          isActive={activeId === 'nav-3'} 
          isExpanded={expandedIds.has('nav-3')}
          onClick={handleItemClick}
          onToggle={handleToggle}
        />
        <NavNodeMedium1 
          id="nav-4" 
          isActive={activeId === 'nav-4'} 
          isExpanded={expandedIds.has('nav-4')}
          onClick={handleItemClick}
          onToggle={handleToggle}
        />
        <NavNodeMedium id="nav-5" isActive={activeId === 'nav-5'} onClick={handleItemClick} />
        <NavNodeMedium id="nav-6" isActive={activeId === 'nav-6'} onClick={handleItemClick} />
        <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name=".[DEPRECATED] .Section header">
          <div className="content-stretch flex flex-col items-start py-[8px] relative w-full">
            <div className="content-stretch flex h-[16px] items-center px-[6px] relative shrink-0" data-name="left lockup">
              <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#616161] text-[12px]">Section header</p>
            </div>
          </div>
        </div>
        <NavNodeMedium id="nav-7" isActive={activeId === 'nav-7'} onClick={handleItemClick} />
        <NavNodeMedium1 
          id="nav-8" 
          isActive={activeId === 'nav-8'} 
          isExpanded={expandedIds.has('nav-8')}
          onClick={handleItemClick}
          onToggle={handleToggle}
        />
        <NavNodeMedium id="nav-9" isActive={activeId === 'nav-9'} onClick={handleItemClick} />
        <div className="relative shrink-0 w-full" data-name=".[DEPRECATED] Divider">
          <div className="content-stretch flex flex-col items-start pb-[4px] pt-[5px] px-[12px] relative w-full">
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 246 1">
                  <line id="Line 1" stroke="var(--stroke-0, #D1D1D1)" x2="246" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <NavNodeMedium1 
          id="nav-10" 
          isActive={activeId === 'nav-10'} 
          isExpanded={expandedIds.has('nav-10')}
          onClick={handleItemClick}
          onToggle={handleToggle}
        />
        <NavNodeMedium id="nav-11" isActive={activeId === 'nav-11'} onClick={handleItemClick} />
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Size20ThemeRegular({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14px] left-1/2 top-1/2 w-[16px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
          {children}
        </svg>
      </div>
    </div>
  );
}

type NavNodeMedium1Props = {
  id: string;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: (id: string) => void;
  onToggle?: (id: string) => void;
};

function NavNodeMedium1({ id, isActive = false, isExpanded = false, onClick, onToggle }: NavNodeMedium1Props) {
  const handleClick = () => {
    onClick?.(id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.(id);
  };

  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <NavBodyMediumText 
          text="Nav content" 
          isActive={isActive}
          isExpanded={isExpanded}
          onClick={handleClick}
          onToggle={handleToggle}
        >
          <path d={svgPaths.p101e4700} fill="var(--fill-0, #242424)" id="Shape" />
        </NavBodyMediumText>
      </div>
    </div>
  );
}

type NavBodyMediumTextProps = {
  text: string;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  onToggle?: (e: React.MouseEvent) => void;
};

function NavBodyMediumText({ text, children, isActive = false, isExpanded = false, onClick, onToggle }: React.PropsWithChildren<NavBodyMediumTextProps>) {
  return (
    <div className="content-stretch flex gap-[2px] items-center px-[4px] relative w-full">
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-[4px]">
        <div className="flex-none rotate-90">
          <div 
            className="h-[4px] rounded-[2px] w-[24px]" 
            data-name="Selection indicator"
            style={{ backgroundColor: isActive ? '#0f6cbd' : 'transparent' }}
          />
        </div>
      </div>
      <div 
        className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] cursor-pointer transition-colors hover:bg-[#e8e8e8]" 
        data-name="Button"
        style={{ backgroundColor: isActive ? '#e8e8e8' : '#f0f0f0' }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center pl-[10px] pr-[8px] py-[10px] relative w-full">
            <Size20ThemeRegular>
              <path d={svgPaths.p278f5d00} fill="var(--fill-0, #424242)" id="Shape" />
            </Size20ThemeRegular>
            <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Content">
              <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] h-[20px] justify-center leading-[0] left-0 not-italic text-[#424242] text-[14px] top-[10px] w-[154px]">
                <p className="leading-[20px] whitespace-pre-wrap">{text}</p>
              </div>
            </div>
            <div 
              className="relative shrink-0 size-[20px] cursor-pointer" 
              data-name="Chevron"
              onClick={onToggle}
              role="button"
              aria-label="Toggle submenu"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggle?.(e as any);
                }
              }}
            >
              <div className="absolute left-0 overflow-clip size-[20px] top-0" data-name="Chevron">
                <div 
                  className="-translate-x-1/2 -translate-y-1/2 absolute h-[6.499px] left-1/2 top-[calc(50%+0.75px)] w-[12.001px] transition-transform"
                  data-name="Shape"
                  style={{ transform: `translate(-50%, -50%) rotate(${isExpanded ? '180deg' : '0deg'})` }}
                >
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0008 6.49919">
                    {children}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type NavNodeMediumProps = {
  id: string;
  isActive?: boolean;
  onClick?: (id: string) => void;
};

function NavNodeMedium({ id, isActive = false, onClick }: NavNodeMediumProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <NavBodyMediumImageAndText 
          text="Nav content" 
          isActive={isActive}
          onClick={handleClick}
        >
          <path d={svgPaths.p278f5d00} fill="var(--fill-0, #242424)" id="Shape" />
        </NavBodyMediumImageAndText>
      </div>
    </div>
  );
}

type NavBodyMediumImageAndTextProps = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

function NavBodyMediumImageAndText({ text, children, isActive = false, onClick }: React.PropsWithChildren<NavBodyMediumImageAndTextProps>) {
  return (
    <div className="content-stretch flex gap-[2px] items-center px-[4px] relative w-full">
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-[4px]">
        <div className="flex-none rotate-90">
          <div className="h-[4px] relative rounded-[2px] w-[24px]" style={{ opacity: isActive ? 1 : 0, backgroundColor: isActive ? '#0f6cbd' : 'transparent' }}>
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgNavNodeMedium} />
          </div>
        </div>
      </div>
      <div 
        className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] cursor-pointer transition-colors hover:bg-[#e8e8e8]" 
        data-name="Button"
        style={{ backgroundColor: isActive ? '#e8e8e8' : '#f0f0f0' }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center pl-[10px] pr-[6px] relative w-full">
            <div className="content-stretch flex items-center py-[10px] relative shrink-0" data-name="Icon container">
              <Size20ThemeRegular>{children}</Size20ThemeRegular>
            </div>
            <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[10px] relative" data-name="Content container">
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface NavBodyMediumProps_Display {
  activeItemId?: string;
}

function NavBodyMedium_Display({
  activeItemId,
}: NavBodyMediumProps_Display) {
  return (
    <NavBodyMedium
      activeItemId={activeItemId}
      onItemClick={(id) => {}}
      onNavigate={(id) => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample FirstItemActive
export function FirstItemActiveNavigation() {
  return (
    <NavBodyMedium_Display
      activeItemId="nav-1"
    />
  );
}

// @figmaExample MiddleItemActive
export function MiddleItemActiveNavigation() {
  return (
    <NavBodyMedium_Display
      activeItemId="nav-5"
    />
  );
}

// @figmaExample LastSectionItemActive
export function LastSectionItemActiveNavigation() {
  return (
    <NavBodyMedium_Display
      activeItemId="nav-10"
    />
  );
}