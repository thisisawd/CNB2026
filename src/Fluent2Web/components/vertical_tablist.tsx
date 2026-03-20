import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-dh5hfbo8ce';

// ---------------------- Helper Types ----------------------

type TabItem = {
  text: string;
  id?: string;
};

// ---------------------- Main Props Interface ----------------------

/**
 * VerticalTabList
 * 
 * A vertical tab navigation component that displays a list of selectable tabs stacked vertically.
 * Appears as a column of tab items within its container, with visual indicators for the active tab 
 * (either a left border accent or circular background highlight). Each tab can display an icon, text, 
 * or both, and provides hover feedback.
 * 
 * Supports both controlled and uncontrolled modes:
 * - Uncontrolled: Component manages its own active state (starts at index 0)
 * - Controlled: Pass activeTab prop to control which tab is active externally
 * 
 * Use this component when you need vertical navigation with multiple options, such as in sidebars or 
 * settings panels. The circular variant provides a more prominent visual style suitable for primary navigation.
 */
export interface VerticalTabListProps {
  className?: string; // Optional CSS class for the root container (defaults to "relative")
  circular?: boolean; // When true with "Icon before" layout and "Medium (default)" size, uses circular background highlighting instead of left border accent for active state (default: false)
  layout?: "Icon before" | "Text only" | "Icon only"; // Controls what content is displayed in each tab (default: "Icon before")
  size?: "Medium (default)" | "Small"; // Controls the height and spacing of tabs (default: "Medium (default)")
  tabs?: TabItem[]; // Array of tab items to display, where TabItem is { text: string; id?: string } (default: 5 items with "Text" label)
  activeTab?: number; // Index of the currently active tab for controlled mode (0-based). Leave undefined for uncontrolled mode
  onTabChange?: (tabIndex: number) => void; // Callback fired when a tab is clicked, receives the index of the clicked tab
}

// ---------------------- Main Component ----------------------

export function VerticalTabList({ 
  className, 
  circular = false, 
  layout = "Icon before", 
  size = "Medium (default)",
  tabs = [
    { text: "Text" },
    { text: "Text" },
    { text: "Text" },
    { text: "Text" },
    { text: "Text" }
  ],
  activeTab: controlledActiveTab,
  onTabChange
}: VerticalTabListProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  
  // Support both controlled and uncontrolled modes
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  
  const handleTabClick = (index: number) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(index);
    }
    onTabChange?.(index);
  };
  
  const isIconBeforeAndMediumDefaultAndCircular = layout === "Icon before" && size === "Medium (default)" && circular;
  const isIconBeforeAndMediumDefaultAndNotCircular = layout === "Icon before" && size === "Medium (default)" && !circular;
  const isIconBeforeAndSmallAndNotCircular = layout === "Icon before" && size === "Small" && !circular;
  const isIconOnlyAndMediumDefaultAndNotCircular = layout === "Icon only" && size === "Medium (default)" && !circular;
  const isTextOnlyAndMediumDefaultAndNotCircular = layout === "Text only" && size === "Medium (default)" && !circular;
  
  const showIcon = layout === "Icon before" || layout === "Icon only";
  const showText = layout === "Icon before" || layout === "Text only";
  
  return (
    <div className={className || "relative"}>
      <div className={`content-stretch flex flex-col items-start relative ${isIconBeforeAndMediumDefaultAndCircular ? "gap-[8px]" : ""}`}>
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          const isCircularActive = isIconBeforeAndMediumDefaultAndCircular && isActive;
          
          return (
            <div 
              key={index}
              className={`relative shrink-0 cursor-pointer transition-colors ${isIconBeforeAndSmallAndNotCircular ? "h-[24px] rounded-[4px]" : isIconBeforeAndMediumDefaultAndCircular ? "h-[32px] rounded-[9999px]" : "h-[32px] rounded-[4px]"} ${isActive ? (isIconBeforeAndMediumDefaultAndCircular ? "bg-[#ebf3fc]" : "bg-[rgba(255,255,255,0)]") : "bg-[rgba(255,255,255,0)] hover:bg-[rgba(0,0,0,0.03)]"}`}
              data-name="Vertical Tab"
              onClick={() => handleTabClick(index)}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleTabClick(index);
                }
              }}
            >
              {isCircularActive && (
                <div 
                  aria-hidden="true" 
                  className="absolute border border-[#0f6cbd] border-solid inset-0 pointer-events-none rounded-[9999px]"
                />
              )}
              <div className={`content-stretch flex h-full items-start relative ${isIconBeforeAndSmallAndNotCircular ? "gap-[2px] px-[6px] py-[2px]" : "gap-[6px] px-[10px] py-[6px]"}`}>
                {showIcon && (
                  isActive ? <VerticalTabListIcon /> : <VerticalTabListRegularIcon />
                )}
                {showText && (
                  <div className="content-stretch flex items-start px-[2px] relative shrink-0" data-name="Tab title">
                    <div className={`flex flex-col font-['Segoe_UI:${isActive ? "Semibold" : "Regular"}',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[${isActive ? (isCircularActive ? "#115ea3" : "#242424") : "#424242"}] text-[14px] whitespace-nowrap`}>
                      <p className="leading-[20px]">{tab.text}</p>
                    </div>
                  </div>
                )}
                {isActive && !isCircularActive && (
                  <div className="absolute bottom-0 left-0 top-0 w-[3px]" data-name="active">
                    <div className={`absolute bg-[#0f6cbd] left-0 rounded-[9999px] w-[3px] ${isIconBeforeAndSmallAndNotCircular ? "bottom-[4px] top-[4px]" : "bottom-[8px] top-[8px]"}`} data-name="Selector" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
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

type VerticalTabListTabTitleTextProps = {
  text: string;
  isActive?: boolean;
};

function VerticalTabListTabTitleText({ text, isActive = false }: VerticalTabListTabTitleTextProps) {
  return (
    <div className="content-stretch flex items-start px-[2px] relative shrink-0">
      <div className={`flex flex-col font-['Segoe_UI:${isActive ? "Semibold" : "Regular"}',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[${isActive ? "#242424" : "#424242"}] text-[14px] whitespace-nowrap`}>
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

function VerticalTabListRegularIcon() {
  return (
    <Wrapper>
      <path d={svgPaths.p37618c00} fill="var(--fill-0, #424242)" id="Shape" />
    </Wrapper>
  );
}

function VerticalTabListIcon() {
  return (
    <Wrapper>
      <path d={svgPaths.p31e92600} fill="var(--fill-0, #0F6CBD)" id="Shape" />
    </Wrapper>
  );
}

// ---------------------- Display Component ----------------------

interface VerticalTabListProps_Display {
  className?: string;
  circular?: boolean;
  layout?: "Icon before" | "Text only" | "Icon only";
  size?: "Medium (default)" | "Small";
  tabs?: TabItem[];
}

function VerticalTabList_Display({
  className,
  circular,
  layout,
  size,
  tabs,
}: VerticalTabListProps_Display) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <VerticalTabList
      className={className}
      circular={circular}
      layout={layout}
      size={size}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DashboardNavigation
export function VerticalTabListExample1() {
  return (
    <VerticalTabList_Display
      tabs={[
        { text: "Dashboard", id: "dashboard" },
        { text: "Analytics", id: "analytics" },
        { text: "Projects", id: "projects" },
        { text: "Settings", id: "settings" },
      ]}
    />
  );
}

// @figmaExample CircularHomeNavigation
export function VerticalTabListExample2() {
  return (
    <VerticalTabList_Display
      circular={true}
      tabs={[
        { text: "Home", id: "home" },
        { text: "Messages", id: "messages" },
        { text: "Notifications", id: "notifications" },
        { text: "Profile", id: "profile" },
      ]}
    />
  );
}

// @figmaExample TextOnlyOverview
export function VerticalTabListExample3() {
  return (
    <VerticalTabList_Display
      layout="Text only"
      tabs={[
        { text: "Overview", id: "overview" },
        { text: "Reports", id: "reports" },
        { text: "Team", id: "team" },
      ]}
    />
  );
}

// @figmaExample IconOnlyNavigation
export function VerticalTabListExample4() {
  return (
    <VerticalTabList_Display
      layout="Icon only"
      tabs={[
        { text: "Calendar", id: "calendar" },
        { text: "Tasks", id: "tasks" },
        { text: "Files", id: "files" },
        { text: "Chat", id: "chat" },
      ]}
    />
  );
}

// @figmaExample SmallSettingsTabs
export function VerticalTabListExample5() {
  return (
    <VerticalTabList_Display
      size="Small"
      tabs={[
        { text: "General", id: "general" },
        { text: "Privacy", id: "privacy" },
        { text: "Security", id: "security" },
      ]}
    />
  );
}

// @figmaExample SmallTextOnlyAccountTabs
export function VerticalTabListExample6() {
  return (
    <VerticalTabList_Display
      layout="Text only"
      size="Small"
      tabs={[
        { text: "Account", id: "account" },
        { text: "Preferences", id: "preferences" },
        { text: "Billing", id: "billing" },
      ]}
    />
  );
}