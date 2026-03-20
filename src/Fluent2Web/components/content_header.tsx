import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-vkldn1mjzw';

/**
 * A table or list column header component that supports text display, sorting, and row selection.
 * Appears as a rectangular header cell within its container with a bottom border separator.
 * In Content layout, displays header text with optional sorting controls.
 * In Selection layout, displays a checkbox for selecting all items.
 * 
 * Behavior Notes:
 * - Fully keyboard accessible with focus indicators and Space/Enter key support
 * - Shows a distinctive black/white double-border focus ring when the interactive element receives focus
 * - In Selection layout, the entire checkbox area is clickable and keyboard navigable
 * - In Content layout with sorting enabled, displays a small sort icon (12x12px) that acts as a button
 * - Maintains consistent 33px height for most configurations
 * - Header text uses Segoe UI font at 14px with 20px line height
 */
export interface ContentHeaderProps {
  className?: string; // Custom CSS classes to apply to the root element. If not provided, defaults to automatic width based on layout configuration.
  headerContent?: string; // The text label displayed in the header cell (default: "Header")
  layout?: "Selection" | "Content"; // Determines the header appearance and functionality: "Content" displays header text, "Selection" displays a checkbox for selecting all rows (default: "Content")
  sorting?: boolean; // When true and layout is "Content", displays a sort icon button next to the header text. Enables interactive sorting functionality (default: false)
  style?: "Regular" | "Semibold"; // Font weight of the header text: "Regular" for normal weight, "Semibold" for bold weight (default: "Regular")
  checked?: boolean; // Checkbox state when layout is "Selection". Controls whether the checkbox appears checked (default: false)
  onCheckedChange?: (checked: boolean) => void; // Callback fired when the checkbox is clicked or activated via keyboard in Selection layout. Receives the new checked state
  onSort?: () => void; // Callback fired when the sort button is clicked or activated via keyboard. Only applicable when sorting is enabled
  sortDirection?: "asc" | "desc" | "none"; // Current sort direction, used for accessibility labels. Communicates the current sort state to screen readers (default: "none")
}

// ---------------------- Main Component ----------------------

export function ContentHeader({ 
  className, 
  headerContent = "Header", 
  layout = "Content", 
  sorting = false, 
  style = "Regular",
  checked = false,
  onCheckedChange,
  onSort,
  sortDirection = "none"
}: ContentHeaderProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const isContentAndRegularAndNotSorting = layout === "Content" && style === "Regular" && !sorting;
  const isContentAndSemiboldAndNotSorting = layout === "Content" && style === "Semibold" && !sorting;
  const isContentAndSemiboldAndSorting = layout === "Content" && style === "Semibold" && sorting;
  const isSelectionAndRegularAndNotSorting = layout === "Selection" && style === "Regular" && !sorting;
  
  const handleCheckboxChange = () => {
    if (onCheckedChange) {
      onCheckedChange(!checked);
    }
  };
  
  const handleSortClick = () => {
    if (onSort) {
      onSort();
    }
  };
  
  const handleCheckboxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleCheckboxChange();
    }
  };
  
  const handleSortKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleSortClick();
    }
  };
  
  return (
    <div className={className || `bg-[rgba(255,255,255,0)] relative ${isSelectionAndRegularAndNotSorting ? "" : isContentAndSemiboldAndSorting ? "h-[33px] w-[200px]" : "w-[200px]"}`}>
      <div aria-hidden={isSelectionAndRegularAndNotSorting ? "true" : undefined} className={isSelectionAndRegularAndNotSorting ? "absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" : isContentAndSemiboldAndSorting ? "content-stretch flex gap-[8px] items-start relative size-full" : "content-stretch flex items-start relative w-full"}>
        {(isContentAndRegularAndNotSorting || isContentAndSemiboldAndSorting || isContentAndSemiboldAndNotSorting) && (
          <div className={`content-stretch flex items-start overflow-clip pb-[6px] pt-[5px] px-[8px] relative shrink-0 ${isContentAndSemiboldAndSorting ? "gap-[2px] h-[32px] w-[250px]" : "h-[33px]"}`} data-name="Content container">
            {(isContentAndSemiboldAndSorting || isContentAndSemiboldAndNotSorting) && (
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{headerContent}</p>
              </div>
            )}
            {isContentAndRegularAndNotSorting && (
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{headerContent}</p>
              </div>
            )}
            {isContentAndSemiboldAndSorting && (
              <button 
                className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer border-0 p-0" 
                data-name="Button"
                onClick={handleSortClick}
                onKeyDown={handleSortKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label={`Sort by ${headerContent} ${sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : ""}`}
                type="button"
              >
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center p-[2px] relative">
                    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Size=12, Theme=Regular">
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[9px] left-1/2 top-1/2 w-[8px]" data-name="Shape">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
                            <path d={svgPaths.p29e4b240} fill="var(--fill-0, #424242)" id="Shape" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        )}
        {(isContentAndRegularAndNotSorting || isContentAndSemiboldAndSorting || isContentAndSemiboldAndNotSorting) && isFocused && <ContentHeaderFocusRing />}
      </div>
      <div aria-hidden={isContentAndRegularAndNotSorting || isContentAndSemiboldAndSorting || isContentAndSemiboldAndNotSorting ? "true" : undefined} className={isSelectionAndRegularAndNotSorting ? "content-stretch flex items-start pb-[9px] pl-[16px] pr-[8px] pt-[8px] relative" : "absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none"}>
        {isSelectionAndRegularAndNotSorting && (
          <div 
            className="relative shrink-0 size-[16px] cursor-pointer" 
            data-name="Checkbox container"
            onClick={handleCheckboxChange}
            onKeyDown={handleCheckboxKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            role="checkbox"
            aria-checked={checked}
            tabIndex={0}
            aria-label={`Select all ${headerContent}`}
          >
            <div className="absolute left-[-8px] top-[-8px]" data-name="Checkbox">
              <div className="content-stretch flex gap-[4px] items-start relative">
                <div className="content-stretch flex items-start p-[8px] relative shrink-0" data-name="Checkbox elements">
                  <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="Background">
                    <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[2px] ${checked ? "bg-[#0078d4] border-[#0078d4]" : "border-[#616161]"}`} />
                    {checked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isSelectionAndRegularAndNotSorting && isFocused && <ContentHeaderFocusRing />}
      </div>
    </div>
  );
}

// ---------------------- Helper Components ----------------------

function ContentHeaderFocusRing() {
  return (
    <div className="absolute inset-0">
      <div className="absolute border-2 border-black border-solid inset-0 rounded-[4px]" data-name="Border-outer" />
      <div className="absolute border border-solid border-white inset-[2px] rounded-[2px]" data-name="Border-inner" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface ContentHeaderProps_Display {
  className?: string;
  headerContent?: string;
  layout?: "Selection" | "Content";
  sorting?: boolean;
  style?: "Regular" | "Semibold";
  sortDirection?: "asc" | "desc" | "none";
}

function ContentHeader_Display({
  className,
  headerContent,
  layout,
  sorting,
  style,
  sortDirection,
}: ContentHeaderProps_Display) {
  const [checked, setChecked] = React.useState(false);
  const [currentSortDirection, setCurrentSortDirection] = React.useState<"asc" | "desc" | "none">(sortDirection || "none");

  const handleCheckedChange = (newChecked: boolean) => {
    setChecked(newChecked);
  };

  const handleSort = () => {
    if (currentSortDirection === "none") {
      setCurrentSortDirection("asc");
    } else if (currentSortDirection === "asc") {
      setCurrentSortDirection("desc");
    } else {
      setCurrentSortDirection("none");
    }
  };

  return (
    <ContentHeader
      className={className}
      headerContent={headerContent}
      layout={layout}
      sorting={sorting}
      style={style}
      checked={checked}
      onCheckedChange={handleCheckedChange}
      onSort={handleSort}
      sortDirection={currentSortDirection}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SemiboldFileNameHeader
export function ContentHeaderFileNameSemibold() {
  return (
    <ContentHeader_Display
      headerContent="File Name"
      layout="Content"
      style="Semibold"
      sorting={false}
    />
  );
}

// @figmaExample RegularDateModifiedHeader
export function ContentHeaderDateModifiedRegular() {
  return (
    <ContentHeader_Display
      headerContent="Date Modified"
      layout="Content"
      style="Regular"
      sorting={false}
    />
  );
}

// @figmaExample SortableSizeHeaderUnsorted
export function ContentHeaderSizeSortable() {
  return (
    <ContentHeader_Display
      headerContent="Size"
      layout="Content"
      style="Semibold"
      sorting={true}
      sortDirection="none"
    />
  );
}

// @figmaExample SortableTypeHeaderAscending
export function ContentHeaderTypeSortedAscending() {
  return (
    <ContentHeader_Display
      headerContent="Type"
      layout="Content"
      style="Regular"
      sorting={true}
      sortDirection="asc"
    />
  );
}

// @figmaExample SortableStatusHeaderDescending
export function ContentHeaderStatusSortedDescending() {
  return (
    <ContentHeader_Display
      headerContent="Status"
      layout="Content"
      style="Regular"
      sorting={true}
      sortDirection="desc"
    />
  );
}

// @figmaExample SelectionCheckboxHeader
export function ContentHeaderSelection() {
  return (
    <ContentHeader_Display
      layout="Selection"
    />
  );
}