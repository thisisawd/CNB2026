import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-zg290z61zi';
import imgNavNodeSmall from 'figma:asset/87508ace712c133af764a98a9a6ce42a16d6d3fc.png';

/**
 * NavBodySmall
 * 
 * A vertical navigation sidebar component with selectable items, expandable sections, and interactive elements.
 * Appears as a fixed-width (260px by default) vertical column with a light gray background (#f0f0f0). Contains multiple navigation items displayed as rounded buttons that change appearance on hover and selection. Selected items are highlighted with a blue background (#ebf3fc) and blue text (#0f6cbd), while unselected items have a gray background and dark text.
 * 
 * The component includes a mix of navigation items: some are simple clickable items with icons, while others have chevron buttons for expanding/collapsing nested content. A blue selection indicator (4px wide, rotated 90 degrees) appears on the left side of selected items. The component also includes section headers and dividers to organize navigation groups.
 * 
 * IMPORTANT: This component currently renders hardcoded navigation items and does not use the 'items' prop from its type definition. The items are fixed in the implementation.
 * The component manages its own selection and expansion state internally.
 * Each item has smooth transitions for hover and selection states.
 * Chevron buttons stop event propagation to allow toggling expansion without triggering item selection.
 */
export interface NavBodySmallProps {
  className?: string; // Custom CSS classes to apply to the root container. When not provided, defaults to "relative w-[260px]". Use this to override the default width or positioning.
  onItemClick?: (itemId: string, index: number) => void; // Callback function invoked when a navigation item is clicked. Receives the item's ID (e.g., 'nav-item-0') and its numeric index.
  defaultSelectedIndex?: number; // The index of the navigation item that should be selected on initial render. Valid values are 0-11 for the hardcoded items. (default: 0)
  items?: Array<{ id: string; text: string; hasChevron?: boolean; type?: 'item' | 'section' | 'divider' }>; // Defined in the type but NOT currently used by the implementation. The component renders fixed hardcoded items instead.
}

// ---------------------- Main Component ----------------------

export function NavBodySmall({ className, onItemClick, defaultSelectedIndex = 0 }: NavBodySmallProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const handleItemClick = (index: number, itemId: string) => {
    setSelectedIndex(index);
    onItemClick?.(itemId, index);
  };

  const handleToggleExpand = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className={className || "relative w-[260px]"} data-name="NavBody - Small">
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
        <NavBodySmallNavNodeSmallImageAndText 
          text="Nav content" 
          isSelected={selectedIndex === 0}
          onClick={() => handleItemClick(0, 'nav-item-0')}
        />
        <NavNodeWithChevron 
          text="Nav content" 
          isSelected={selectedIndex === 1}
          isExpanded={expandedItems.has(1)}
          onClick={() => handleItemClick(1, 'nav-item-1')}
          onToggleExpand={() => handleToggleExpand(1)}
        />
        <NavNodeWithChevron 
          text="Nav content" 
          isSelected={selectedIndex === 2}
          isExpanded={expandedItems.has(2)}
          onClick={() => handleItemClick(2, 'nav-item-2')}
          onToggleExpand={() => handleToggleExpand(2)}
        />
        <NavNodeWithChevron 
          text="Nav content" 
          isSelected={selectedIndex === 3}
          isExpanded={expandedItems.has(3)}
          onClick={() => handleItemClick(3, 'nav-item-3')}
          onToggleExpand={() => handleToggleExpand(3)}
        />
        <NavBodySmallNavNodeSmallImageAndText 
          text="Nav content" 
          isSelected={selectedIndex === 4}
          onClick={() => handleItemClick(4, 'nav-item-4')}
        />
        <NavBodySmallNavNodeSmallImageAndText 
          text="Nav content" 
          isSelected={selectedIndex === 5}
          onClick={() => handleItemClick(5, 'nav-item-5')}
        />
        <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name=".[DEPRECATED] .Section header">
          <div className="content-stretch flex flex-col items-start py-[8px] relative w-full">
            <div className="content-stretch flex h-[16px] items-center px-[6px] relative shrink-0" data-name="left lockup">
              <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#616161] text-[12px]">Section header</p>
            </div>
          </div>
        </div>
        <NavBodySmallNavNodeSmallImageAndText 
          text="Nav content" 
          isSelected={selectedIndex === 6}
          onClick={() => handleItemClick(6, 'nav-item-6')}
        />
        <NavBodySmallNavNodeSmallImageAndText 
          text="Nav content" 
          isSelected={selectedIndex === 7}
          onClick={() => handleItemClick(7, 'nav-item-7')}
        />
        <NavNodeWithChevron 
          text="Nav content" 
          isSelected={selectedIndex === 8}
          isExpanded={expandedItems.has(8)}
          onClick={() => handleItemClick(8, 'nav-item-8')}
          onToggleExpand={() => handleToggleExpand(8)}
        />
        <NavBodySmallNavNodeSmallImageAndText 
          text="Nav content" 
          isSelected={selectedIndex === 9}
          onClick={() => handleItemClick(9, 'nav-item-9')}
        />
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
        <NavNodeWithChevron 
          text="Nav content" 
          isSelected={selectedIndex === 10}
          isExpanded={expandedItems.has(10)}
          onClick={() => handleItemClick(10, 'nav-item-10')}
          onToggleExpand={() => handleToggleExpand(10)}
        />
        <NavBodySmallNavNodeSmallImageAndText 
          text="Nav content" 
          isSelected={selectedIndex === 11}
          onClick={() => handleItemClick(11, 'nav-item-11')}
        />
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 14" className="block size-full">
      <path d={svgPaths.p278f5d00} fill="var(--fill-0, #424242)" id="Shape" />
    </svg>
  );
}

function Image({ isSelected }: { isSelected?: boolean }) {
  return (
    <div className="flex h-[24px] items-center justify-center relative shrink-0 w-[4px]">
      <div className="flex-none rotate-90">
        <div className={`h-[4px] relative rounded-[2px] w-[24px] ${isSelected ? 'opacity-100' : 'opacity-0'}`} data-name="Selection indicator">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgNavNodeSmall} />
        </div>
      </div>
    </div>
  );
}

type NavBodySmallNavNodeSmallImageAndTextProps = {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
};

function NavBodySmallNavNodeSmallImageAndText({ text, isSelected, onClick, children }: React.PropsWithChildren<NavBodySmallNavNodeSmallImageAndTextProps>) {
  return (
    <div className="h-[32px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center px-[4px] relative size-full">
          <Image isSelected={isSelected} />
          <button 
            onClick={onClick}
            className={`${isSelected ? 'bg-[#ebf3fc]' : 'bg-[#f0f0f0] hover:bg-[#e6e6e6]'} flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px] transition-colors cursor-pointer border-none w-full`} 
            data-name="Button"
          >
            <div className="content-stretch flex gap-[16px] items-start pl-[10px] pr-[6px] relative size-full">
              <div className="content-stretch flex items-center py-[6px] relative shrink-0" data-name="Icon container">
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14px] left-1/2 top-1/2 w-[16px]" data-name="Shape">
                    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 14" className="block size-full">
                      <path d={svgPaths.p278f5d00} fill={isSelected ? "var(--fill-0, #0f6cbd)" : "var(--fill-0, #424242)"} id="Shape" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[6px] relative" data-name="Content container">
                <p className={`font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] ${isSelected ? 'text-[#0f6cbd] font-["Segoe_UI:Semibold",sans-serif]' : 'text-[#424242]'}`}>{text}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

type NavNodeWithChevronProps = {
  text: string;
  isSelected?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  onToggleExpand?: () => void;
};

function NavNodeWithChevron({ text, isSelected, isExpanded, onClick, onToggleExpand }: NavNodeWithChevronProps) {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="NavNode - small">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center px-[4px] relative size-full">
          <Image isSelected={isSelected} />
          <button
            onClick={onClick}
            className={`${isSelected ? 'bg-[#ebf3fc]' : 'bg-[#f0f0f0] hover:bg-[#e6e6e6]'} flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px] transition-colors cursor-pointer border-none w-full`}
            data-name="Button"
          >
            <div className="content-stretch flex gap-[16px] items-start pl-[10px] pr-[8px] py-[6px] relative size-full">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14px] left-1/2 top-1/2 w-[16px]" data-name="Shape">
                  <Helper />
                </div>
              </div>
              <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Content">
                <p className={`absolute font-['Segoe_UI:Regular',sans-serif] leading-[20px] left-0 not-italic text-[14px] top-0 ${isSelected ? 'text-[#0f6cbd] font-["Segoe_UI:Semibold",sans-serif]' : 'text-[#424242]'}`}>{text}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand?.();
                }}
                className="relative shrink-0 size-[20px] cursor-pointer bg-transparent border-none p-0 transition-transform"
                data-name="Chevron"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <div className="absolute left-0 overflow-clip size-[20px] top-0" data-name="Chevron">
                  <div 
                    className={`-translate-x-1/2 -translate-y-1/2 absolute h-[6.499px] left-1/2 top-[calc(50%+0.75px)] w-[12.001px] transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    data-name="Shape"
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0008 6.49919">
                      <path d={svgPaths.p101e4700} fill="var(--fill-0, #242424)" id="Shape" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface NavBodySmallProps_Display {
  defaultSelectedIndex?: number;
}

function NavBodySmall_Display({
  defaultSelectedIndex,
}: NavBodySmallProps_Display) {
  return (
    <NavBodySmall
      defaultSelectedIndex={defaultSelectedIndex}
      onItemClick={(itemId, index) => {
        console.log(`Navigation item clicked: ${itemId} at index ${index}`);
      }}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample FirstItemSelected
export function NavBodySmallFirstItem() {
  return (
    <NavBodySmall_Display
      defaultSelectedIndex={0}
    />
  );
}

// @figmaExample FourthItemSelected
export function NavBodySmallFourthItem() {
  return (
    <NavBodySmall_Display
      defaultSelectedIndex={3}
    />
  );
}

// @figmaExample EighthItemSelected
export function NavBodySmallEighthItem() {
  return (
    <NavBodySmall_Display
      defaultSelectedIndex={7}
    />
  );
}

// @figmaExample LastItemSelected
export function NavBodySmallLastItem() {
  return (
    <NavBodySmall_Display
      defaultSelectedIndex={11}
    />
  );
}