import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-yrfcqslvpl';

/**
 * A selectable list component that displays a header followed by clickable items,
 * commonly used for dropdown menus, filters, or single-select lists.
 *
 * Appears as a white, rounded rectangular container (312px wide by default) with a subtle shadow.
 * Contains a gray header label followed by a vertical list of selectable items.
 * Selected items display a checkmark on the left. Items have hover (light gray) and
 * active (darker gray) states for visual feedback.
 *
 * The component maintains its own internal selection state and can notify parent components
 * when selection changes. Fully keyboard accessible with Enter and Space key support.
 */
export interface ListContentProps {
  className?: string; // Custom CSS classes to override default styling. By default, the component is 312px wide with rounded corners and white background
  swappableContent?: boolean; // When true, hides the list and shows a blue placeholder area with "SWAP AREA WITH YOUR COMPONENT" message. Useful for design/prototyping workflows (default: false)
  onSelect?: (index: number, text: string) => void; // Callback fired when a list item is clicked. Receives the item's index and text value
  defaultSelectedIndex?: number; // Zero-based index of the initially selected item. The component tracks selection state internally after mount (default: 0)
  items?: string[]; // Array of text strings to display as selectable list items. Each item appears as a 32px tall row with 14px text (default: ["Action", "Action", "Action", "Action", "Action"])
}

// ---------------------- Main Component ----------------------

export function ListContent({ 
  className, 
  swappableContent = false, 
  onSelect,
  defaultSelectedIndex = 0,
  items = ["Action", "Action", "Action", "Action", "Action"]
}: ListContentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultSelectedIndex);
  const isNotSwappableContent = !swappableContent;
  const isSwappableContent = swappableContent;
  
  const handleItemClick = (index: number, text: string) => {
    setSelectedIndex(index);
    if (onSelect) {
      onSelect(index, text);
    }
  };
  
  return (
    <div className={className || `relative rounded-[4px] w-[312px] ${isNotSwappableContent ? "bg-white" : "h-[210px]"}`}>
      <div aria-hidden={isSwappableContent ? "true" : undefined} className={isNotSwappableContent ? "content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full" : "absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px]"}>
        {isNotSwappableContent && (
          <div className="relative rounded-[4px] shrink-0 w-full" data-name="Top section" role="listbox">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex flex-col gap-[2px] items-start p-[4px] relative w-full">
                <ListItem className="h-[32px] relative rounded-[4px] shrink-0 w-full" />
                {items.map((itemText, index) => (
                  <ListItem 
                    key={index}
                    className="h-[32px] relative rounded-[4px] shrink-0 w-full" 
                    type="Single select"
                    text={itemText}
                    isSelected={selectedIndex === index}
                    onClick={() => handleItemClick(index, itemText)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div aria-hidden={isNotSwappableContent ? "true" : undefined} className={isNotSwappableContent ? "absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]" : "content-stretch flex flex-col items-start relative size-full"}>
        {isSwappableContent && (
          <div className="bg-[#ebf3fc] flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Content placeholder">
            <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
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
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type ListItemProps = {
  className?: string;
  checkmark?: boolean;
  icon?: boolean;
  state?: "Rest";
  text?: string;
  type?: "Single select" | "Header";
  onClick?: () => void;
  isSelected?: boolean;
};

function ListItem({ className, checkmark = true, icon = false, state = "Rest", text = "Action", type = "Header", onClick, isSelected = false }: ListItemProps) {
  const isRestAndHeader = state === "Rest" && type === "Header";
  const isRestAndSingleSelect = state === "Rest" && type === "Single select";
  const isClickable = isRestAndSingleSelect && onClick;
  
  return (
    <div 
      className={`${className || "h-[32px] relative rounded-[4px] w-[272px]"} ${isClickable ? "cursor-pointer hover:bg-[#f3f3f3] active:bg-[#e0e0e0] transition-colors" : ""}`}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? "option" : undefined}
      aria-selected={isClickable ? isSelected : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div className="flex flex-row items-center size-full">
        <div className={`content-stretch flex items-center relative size-full ${isRestAndSingleSelect ? "" : "py-[8px]"}`}>
          <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="List-container">
            <div className="flex flex-row items-center size-full">
              <div className={`content-stretch flex items-center relative w-full ${isRestAndSingleSelect ? "gap-[4px] pl-[6px] py-[6px]" : "px-[6px]"}`}>
                {isRestAndHeader && (
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[12px] whitespace-nowrap">
                    <p className="leading-[16px]">{text}</p>
                  </div>
                )}
                {isRestAndSingleSelect && (
                  <div className="content-stretch flex items-start relative shrink-0" data-name="Checkmark-control">
                    {isSelected && (
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Checkmark">
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[9.001px] left-[calc(50%+0.13px)] top-[calc(50%-0.25px)] w-[12.25px]" data-name="Shape">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 9.00113">
                            <path d={svgPaths.p35118f00} fill="var(--fill-0, #424242)" id="Shape" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {isRestAndSingleSelect && icon && (
                  <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Image">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                        <path d={svgPaths.p19631e80} fill="var(--fill-0, #424242)" id="Shape" />
                      </svg>
                    </div>
                  </div>
                )}
                {isRestAndSingleSelect && (
                  <div className="content-stretch flex items-start pb-[2px] px-[2px] relative shrink-0" data-name="Text">
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                      <p className="leading-[20px]">{text}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface ListContentProps_Display {
  swappableContent?: boolean;
  items?: string[];
}

function ListContent_Display({
  swappableContent,
  items,
}: ListContentProps_Display) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleSelect = (index: number, text: string) => {
    setSelectedIndex(index);
  };

  return (
    <ListContent
      swappableContent={swappableContent}
      items={items}
      defaultSelectedIndex={selectedIndex}
      onSelect={handleSelect}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample StatusFilterList
export function StatusFilterList() {
  return (
    <ListContent_Display
      items={["All Items", "Active", "Archived", "Draft", "Pending"]}
    />
  );
}

// @figmaExample BasicOptionsList
export function BasicOptionsList() {
  return (
    <ListContent_Display
      items={["Option 1", "Option 2", "Option 3"]}
    />
  );
}

// @figmaExample SizeSelectorList
export function SizeSelectorList() {
  return (
    <ListContent_Display
      items={["Small", "Medium", "Large", "X-Large"]}
    />
  );
}

// @figmaExample DateRangeFilterList
export function DateRangeFilterList() {
  return (
    <ListContent_Display
      items={["Today", "This Week", "This Month", "This Year", "All Time", "Custom Range"]}
    />
  );
}

// @figmaExample ComponentPlaceholder
export function ComponentPlaceholder() {
  return (
    <ListContent_Display
      swappableContent={true}
    />
  );
}