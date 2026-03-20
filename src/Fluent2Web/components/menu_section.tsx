import * as React from 'react';

/**
 * MenuSection
 * 
 * A section header or divider element for organizing menu content into logical groups.
 * 
 * Appears as either a labeled section header with semibold text or a horizontal divider line 
 * within a menu container. When used as a header, it renders text in a 12px Segoe UI font with 
 * appropriate padding (8px vertical, 6px horizontal). When used as a divider, it renders as a 
 * 1px horizontal line extending beyond the container edges.
 * 
 * Use this component to:
 * - Create labeled sections within dropdown menus or navigation panels
 * - Separate menu items into logical groups with visual dividers
 * - Provide context and organization in complex menu structures
 */
export interface MenuSectionProps {
  className?: string; // Custom CSS classes to override default styling. When provided, replaces all default container styling.
  divider?: boolean; // When true, renders as a horizontal divider line instead of a text header. Must be used with state="Disabled" to display the divider. (default: false)
  primaryString?: string; // The text to display in the section header. Only visible when divider is false. (default: "Section header")
  state?: "Rest" | "Disabled"; // "Rest": Normal state with dark gray text (#424242), "Disabled": Disabled state with light gray text (#bdbdbd) for headers, or triggers divider display when combined with divider=true (default: "Rest")
}

// ---------------------- Main Component ----------------------

export function MenuSection({ className, divider = false, primaryString = "Section header", state = "Rest" }: MenuSectionProps) {
  const isDividerAndDisabled = divider && state === "Disabled";
  const isNotDividerAndDisabled = !divider && state === "Disabled";
  const isNotDividerAndRest = !divider && state === "Rest";
  return (
    <div className={className || `min-w-[120px] relative w-[240px] ${isDividerAndDisabled ? "h-[5px] max-h-[5px]" : "bg-white min-h-[32px] rounded-[4px]"}`}>
      <div className={`content-stretch flex items-start min-w-[inherit] px-[6px] py-[8px] relative ${isDividerAndDisabled ? "max-h-[inherit] size-full" : "min-h-[inherit] w-full"}`}>
        {isNotDividerAndRest && (
          <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#424242] text-[12px]">
            <p className="leading-[16px] whitespace-pre-wrap">{primaryString}</p>
          </div>
        )}
        {isNotDividerAndDisabled && (
          <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[#bdbdbd] text-[12px]">
            <p className="leading-[16px] whitespace-pre-wrap">{primaryString}</p>
          </div>
        )}
        {isDividerAndDisabled && <div className="-translate-y-1/2 absolute bg-[#e0e0e0] h-px left-[-4px] right-[-4px] top-1/2" />}
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface MenuSectionProps_Display {
  divider?: boolean;
  primaryString?: string;
  state?: "Rest" | "Disabled";
}

function MenuSection_Display({
  divider,
  primaryString,
  state,
}: MenuSectionProps_Display) {
  return (
    <MenuSection
      divider={divider}
      primaryString={primaryString}
      state={state}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample FileActionsSection
export function FileActionsSection() {
  return (
    <MenuSection_Display
      primaryString="File Actions"
    />
  );
}

// @figmaExample RecentItemsSection
export function RecentItemsSection() {
  return (
    <MenuSection_Display
      primaryString="Recent Items"
      state="Rest"
    />
  );
}

// @figmaExample UnavailableOptionsSection
export function UnavailableOptionsSection() {
  return (
    <MenuSection_Display
      primaryString="Unavailable Options"
      state="Disabled"
    />
  );
}

// @figmaExample MenuDivider
export function MenuDivider() {
  return (
    <MenuSection_Display
      divider={true}
      state="Disabled"
    />
  );
}