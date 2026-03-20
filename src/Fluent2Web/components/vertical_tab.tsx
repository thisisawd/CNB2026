import * as React from 'react';
import svgPaths from './svg-uvsqlexbnw';

/**
 * A vertical navigation tab component that displays an icon and text label, commonly used in sidebar navigation.
 * 
 * Appears as a horizontal bar within a vertical list, with a prominent vertical blue selector bar on the left edge when selected.
 * The component height varies by size (32px for Medium, 24px for Small) and styling changes based on interaction state and style variant.
 * 
 * When selected, displays a 3px wide blue vertical bar along the left edge, with the icon and text in blue.
 * When unselected, appears with gray icon and text without the selector bar.
 * The component automatically handles hover, pressed, focus, and disabled visual states.
 * 
 * USE WHEN: Building vertical navigation menus, sidebar tab interfaces, or any vertical tab-based navigation pattern.
 * USE FOR: Individual tab items in a vertical tab list where users need to switch between different views or sections.
 * 
 * Important Notes:
 * - Component is fully keyboard accessible (Enter/Space keys trigger onClick)
 * - Includes proper ARIA attributes (role="tab", aria-selected, aria-disabled)
 * - Disabled state prevents interaction and shows grayed-out appearance
 * - Focus state adds visible focus indicator border for accessibility
 * - The iconSelected/iconUnselected props control icon visibility but icons are always the same calendar icon
 */
export interface VerticalTabProps {
  /** Custom CSS class to override default styling. When provided, replaces all default layout classes. */
  className?: string;
  
  /** Whether to display the icon when the tab is in selected state. Set to false to show text-only tabs when selected. (default: true) */
  iconSelected?: boolean;
  
  /** Whether to display the icon when the tab is in unselected state. Set to false to show text-only tabs when unselected. (default: true) */
  iconUnselected?: boolean;
  
  /** Whether this tab is currently selected/active. Controls the presence of the left selector bar and visual styling. (default: true) */
  selected?: boolean;
  
  /** 
   * Size variant of the tab.
   * - "Medium (default)": 32px height, 10px horizontal padding, 6px vertical padding, standard spacing
   * - "Small": 24px height, 6px horizontal padding, 2px vertical padding, compact spacing for dense layouts
   */
  size?: "Medium (default)" | "Small";
  
  /**
   * Interaction state of the tab.
   * - "Rest" (default): Normal state with standard colors
   * - "Hover": Darker blue shades when hovering (#115EA3)
   * - "Pressed": Even darker blue when pressed/clicked (#0F548C)
   * - "Focus": Adds visible black 3px border for keyboard focus indicator
   * - "Disabled": Grayed out appearance (#BDBDBD), prevents interaction
   */
  state?: "Rest" | "Hover" | "Pressed" | "Focus" | "Disabled";
  
  /**
   * Visual style variant.
   * - "Transparent (default)": No background, selector bar on left when selected. Most common for sidebar navigation.
   * - "Subtle": Similar to transparent with subtle background treatment
   * - "Filled circular": Blue filled background (#0F6CBD), pill-shaped (9999px border radius), white text and icon. Eye-catching selected state.
   * - "Subtle circular": Light blue background (#EBF3FC), pill-shaped with blue border, darker blue text. Softer alternative to filled.
   */
  style?: "Transparent (default)" | "Subtle" | "Filled circular" | "Subtle circular";
  
  /** The label text displayed on the tab. Uses Segoe UI font family. (default: "Text") */
  text?: string;
  
  /** Callback function triggered when the tab is clicked or activated via keyboard (Enter/Space). Not called when state is "Disabled". */
  onClick?: () => void;
}

// ---------------------- Main Component ----------------------

export function VerticalTab({ className, iconSelected = true, iconUnselected = true, selected = true, size = "Medium (default)", state = "Rest", style = "Transparent (default)", text = "Text", onClick }: VerticalTabProps) {
  const isNotSelectedAndTransparentDefaultAndMediumDefaultAndRest = !selected && style === "Transparent (default)" && size === "Medium (default)" && state === "Rest";
  const isSelectedAndFilledCircularAndMediumDefaultAndRest = selected && style === "Filled circular" && size === "Medium (default)" && state === "Rest";
  const isSelectedAndSubtleAndMediumDefaultAndRest = selected && style === "Subtle" && size === "Medium (default)" && state === "Rest";
  const isSelectedAndSubtleCircularAndMediumDefaultAndRest = selected && style === "Subtle circular" && size === "Medium (default)" && state === "Rest";
  const isSelectedAndTransparentDefaultAndMediumDefaultAndDisabled = selected && style === "Transparent (default)" && size === "Medium (default)" && state === "Disabled";
  const isSelectedAndTransparentDefaultAndMediumDefaultAndFocus = selected && style === "Transparent (default)" && size === "Medium (default)" && state === "Focus";
  const isSelectedAndTransparentDefaultAndMediumDefaultAndHover = selected && style === "Transparent (default)" && size === "Medium (default)" && state === "Hover";
  const isSelectedAndTransparentDefaultAndMediumDefaultAndPressed = selected && style === "Transparent (default)" && size === "Medium (default)" && state === "Pressed";
  const isSelectedAndTransparentDefaultAndMediumDefaultAndRest = selected && style === "Transparent (default)" && size === "Medium (default)" && state === "Rest";
  const isSelectedAndTransparentDefaultAndSmallAndRest = selected && style === "Transparent (default)" && size === "Small" && state === "Rest";
  
  const isDisabled = state === "Disabled";
  
  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDisabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <div 
      className={className || `relative ${isSelectedAndFilledCircularAndMediumDefaultAndRest ? "bg-[#0f6cbd] h-[32px] rounded-[9999px]" : isSelectedAndSubtleCircularAndMediumDefaultAndRest ? "bg-[#ebf3fc] h-[32px] rounded-[9999px]" : isSelectedAndTransparentDefaultAndSmallAndRest ? "bg-[rgba(255,255,255,0)] h-[24px] rounded-[4px]" : isSelectedAndTransparentDefaultAndMediumDefaultAndDisabled ? "h-[32px] rounded-[4px]" : isSelectedAndTransparentDefaultAndMediumDefaultAndFocus ? "bg-[rgba(255,255,255,0)] h-[32px] rounded-[2px]" : "bg-[rgba(255,255,255,0)] h-[32px] rounded-[4px]"}`}
      role="tab"
      aria-selected={selected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ cursor: isDisabled ? 'default' : 'pointer' }}
    >
      <div aria-hidden={isSelectedAndTransparentDefaultAndMediumDefaultAndFocus || isSelectedAndSubtleCircularAndMediumDefaultAndRest ? "true" : undefined} className={isSelectedAndSubtleCircularAndMediumDefaultAndRest ? "absolute border border-[#0f6cbd] border-solid inset-0 pointer-events-none rounded-[9999px]" : isSelectedAndTransparentDefaultAndSmallAndRest ? "content-stretch flex gap-[2px] h-full items-start px-[6px] py-[2px] relative" : isSelectedAndTransparentDefaultAndMediumDefaultAndFocus ? "absolute border-3 border-black border-solid inset-[-3px] pointer-events-none rounded-[5px]" : "content-stretch flex gap-[6px] h-full items-start px-[10px] py-[6px] relative"}>
        {(isSelectedAndTransparentDefaultAndMediumDefaultAndRest || isSelectedAndSubtleAndMediumDefaultAndRest || isSelectedAndTransparentDefaultAndSmallAndRest) && iconSelected && <VerticalTabIcon />}
        {(isSelectedAndTransparentDefaultAndMediumDefaultAndRest || isSelectedAndSubtleAndMediumDefaultAndRest || isSelectedAndTransparentDefaultAndSmallAndRest) && (
          <>
            <VerticalTabTabTitleText text={text} />
            <div className="absolute bottom-0 left-0 top-0 w-[3px]" data-name="active">
              <div className={`absolute bg-[#0f6cbd] left-0 rounded-[9999px] w-[3px] ${isSelectedAndTransparentDefaultAndSmallAndRest ? "bottom-[4px] top-[4px]" : "bottom-[8px] top-[8px]"}`} data-name="Selector" />
            </div>
          </>
        )}
        {isSelectedAndTransparentDefaultAndMediumDefaultAndHover && iconSelected && (
          <Wrapper>
            <path d={svgPaths.p31e92600} fill="var(--fill-0, #115EA3)" id="Shape" />
          </Wrapper>
        )}
        {isSelectedAndTransparentDefaultAndMediumDefaultAndHover && (
          <>
            <VerticalTabTabTitleText text={text} />
            <div className="absolute bottom-0 left-0 top-0 w-[3px]" data-name="active">
              <div className="absolute bg-[#115ea3] bottom-[8px] left-0 rounded-[9999px] top-[8px] w-[3px]" data-name="Selector" />
            </div>
          </>
        )}
        {isSelectedAndTransparentDefaultAndMediumDefaultAndPressed && iconSelected && (
          <Wrapper>
            <path d={svgPaths.p31e92600} fill="var(--fill-0, #0F548C)" id="Shape" />
          </Wrapper>
        )}
        {isSelectedAndTransparentDefaultAndMediumDefaultAndPressed && (
          <>
            <VerticalTabTabTitleText text={text} />
            <div className="absolute bottom-0 left-0 top-0 w-[3px]" data-name="active">
              <div className="absolute bg-[#0f548c] bottom-[8px] left-0 rounded-[9999px] top-[8px] w-[3px]" data-name="Selector" />
            </div>
          </>
        )}
        {isSelectedAndTransparentDefaultAndMediumDefaultAndDisabled && iconSelected && (
          <Wrapper>
            <path d={svgPaths.p31e92600} fill="var(--fill-0, #BDBDBD)" id="Shape" />
          </Wrapper>
        )}
        {isSelectedAndTransparentDefaultAndMediumDefaultAndDisabled && (
          <>
            <div className="content-stretch flex items-start px-[2px] relative shrink-0" data-name="Tab title">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#bdbdbd] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{text}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 top-0 w-[3px]" data-name="active">
              <div className="absolute bg-[#bdbdbd] bottom-[8px] left-0 rounded-[9999px] top-[8px] w-[3px]" data-name="Selector" />
            </div>
          </>
        )}
        {isNotSelectedAndTransparentDefaultAndMediumDefaultAndRest && iconUnselected && (
          <Wrapper>
            <path d={svgPaths.p37618c00} fill="var(--fill-0, #424242)" id="Shape" />
          </Wrapper>
        )}
        {isNotSelectedAndTransparentDefaultAndMediumDefaultAndRest && (
          <>
            <div className="content-stretch flex items-start px-[2px] relative shrink-0" data-name="Tab title">
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{text}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 top-0 w-[3px]" data-name="active" />
          </>
        )}
        {isSelectedAndFilledCircularAndMediumDefaultAndRest && iconSelected && (
          <Wrapper>
            <path d={svgPaths.p31e92600} fill="var(--fill-0, white)" id="Shape" />
          </Wrapper>
        )}
        {isSelectedAndFilledCircularAndMediumDefaultAndRest && (
          <div className="content-stretch flex items-start px-[2px] relative shrink-0" data-name="Tab title">
            <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
              <p className="leading-[20px]">{text}</p>
            </div>
          </div>
        )}
      </div>
      {(isSelectedAndTransparentDefaultAndMediumDefaultAndFocus || isSelectedAndSubtleCircularAndMediumDefaultAndRest) && (
        <div className={`content-stretch flex h-full items-start relative ${isSelectedAndSubtleCircularAndMediumDefaultAndRest ? "gap-[6px] px-[10px] py-[6px]" : ""}`}>
          {isSelectedAndTransparentDefaultAndMediumDefaultAndFocus && (
            <div className="content-stretch flex gap-[6px] items-start px-[10px] py-[6px] relative rounded-[2px] shrink-0" data-name="Icon + Selector">
              <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[3px]" />
              {iconSelected && <VerticalTabIcon />}
              <VerticalTabTabTitleText text={text} />
              <div className="absolute bottom-0 left-0 top-0 w-[3px]" data-name="active">
                <div className="absolute bg-[#0f6cbd] bottom-[8px] left-0 rounded-[9999px] top-[8px] w-[3px]" data-name="Selector" />
              </div>
            </div>
          )}
          {isSelectedAndSubtleCircularAndMediumDefaultAndRest && iconSelected && <VerticalTabIcon />}
          {isSelectedAndSubtleCircularAndMediumDefaultAndRest && (
            <div className="content-stretch flex items-start px-[2px] relative shrink-0" data-name="Tab title">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#115ea3] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{text}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------- Helper Components ----------------------

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Calendar">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2" data-name="Shape">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            {children}
          </svg>
        </div>
      </div>
    </div>
  );
}

type VerticalTabTabTitleTextProps = {
  text: string;
};

function VerticalTabTabTitleText({ text }: VerticalTabTabTitleTextProps) {
  return (
    <div className="content-stretch flex items-start px-[2px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

function VerticalTabIcon() {
  return (
    <Wrapper>
      <path d={svgPaths.p31e92600} fill="var(--fill-0, #0F6CBD)" id="Shape" />
    </Wrapper>
  );
}

// ---------------------- Display Component ----------------------

interface VerticalTabProps_Display {
  iconSelected?: boolean;
  iconUnselected?: boolean;
  size?: "Medium (default)" | "Small";
  style?: "Transparent (default)" | "Subtle" | "Filled circular" | "Subtle circular";
  text?: string;
}

function VerticalTab_Display({
  iconSelected,
  iconUnselected,
  size,
  style,
  text,
}: VerticalTabProps_Display) {
  const [selected, setSelected] = React.useState(true);

  return (
    <VerticalTab
      iconSelected={iconSelected}
      iconUnselected={iconUnselected}
      selected={selected}
      size={size}
      style={style}
      text={text}
      onClick={() => setSelected(!selected)}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample CalendarMediumTransparent
export function CalendarTabExample() {
  return (
    <VerticalTab_Display
      text="Calendar"
      size="Medium (default)"
      style="Transparent (default)"
    />
  );
}

// @figmaExample FilesSmallTransparent
export function FilesTabExample() {
  return (
    <VerticalTab_Display
      text="Files"
      size="Small"
      style="Transparent (default)"
    />
  );
}

// @figmaExample DashboardMediumFilledCircular
export function DashboardTabExample() {
  return (
    <VerticalTab_Display
      text="Dashboard"
      size="Medium (default)"
      style="Filled circular"
    />
  );
}

// @figmaExample SettingsSmallFilledCircular
export function SettingsTabExample() {
  return (
    <VerticalTab_Display
      text="Settings"
      size="Small"
      style="Filled circular"
    />
  );
}

// @figmaExample TasksMediumSubtleCircular
export function TasksTabExample() {
  return (
    <VerticalTab_Display
      text="Tasks"
      size="Medium (default)"
      style="Subtle circular"
    />
  );
}

// @figmaExample OverviewTextOnlyMedium
export function OverviewTextOnlyTabExample() {
  return (
    <VerticalTab_Display
      text="Overview"
      size="Medium (default)"
      style="Transparent (default)"
      iconSelected={false}
      iconUnselected={false}
    />
  );
}

// @figmaExample ReportsSmallSubtle
export function ReportsTabExample() {
  return (
    <VerticalTab_Display
      text="Reports"
      size="Small"
      style="Subtle"
    />
  );
}

// @figmaExample AnalyticsMediumSubtleCircular
export function AnalyticsTabExample() {
  return (
    <VerticalTab_Display
      text="Analytics"
      size="Medium (default)"
      style="Subtle circular"
    />
  );
}