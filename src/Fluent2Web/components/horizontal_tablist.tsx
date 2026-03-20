import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-mm1h8izvx8';

/**
 * A horizontal tab navigation component that displays exactly 5 tabs with optional icons and a "more" button.
 * Appears as a horizontal row of clickable tab elements within its container. Tabs display with calendar icons and "Text" labels by default. 
 * The active tab is visually distinguished with semibold text, different colors, and either an underline indicator or circular background depending on the variant.
 *
 * This component can work in controlled or uncontrolled mode. When activeTab prop is provided, the component is controlled and you must handle tab changes via onTabChange. 
 * When activeTab is not provided, the component manages its own state internally.
 *
 * IMPORTANT: This component always renders exactly 5 tabs (indices 0-4). The tab content (icons and "Text" labels) is currently hardcoded and cannot be customized through props.
 */
export interface HorizontalTabListProps {
  className?: string; // Custom CSS class for the root container. If not provided, component may apply default width based on variant.
  circular?: boolean; // When true with layout="Icon before" and size="Medium (default)", applies circular styling to tabs. Active tab gets a rounded pill background (#ebf3fc) with a blue border. Significantly changes the visual appearance. (default: false)
  layout?: 'Icon before' | 'Text only' | 'Icon only'; // Controls what elements appear in each tab. Affects the visual layout: "Icon before": Shows calendar icon followed by text label, "Text only": Shows only text label, "Icon only": Shows only calendar icon (default: "Icon before")
  size?: 'Medium (default)' | 'Small'; // Controls tab dimensions: "Medium (default)": 44px tall tabs with larger padding, "Small": 32px tall tabs with compact padding (default: "Medium (default)")
  activeTab?: number; // Zero-based index of the currently active tab (0-4). When provided, component operates in controlled mode. Must be used with onTabChange handler.
  onTabChange?: (tabIndex: number) => void; // Callback fired when a tab is clicked. Receives the zero-based index of the clicked tab. Required when using controlled mode with activeTab prop.
  onMoreClick?: () => void; // Callback fired when the "more" button (three dots icon at the end) is clicked. Use this to show additional tabs or options.
}

// ---------------------- Main Component ----------------------

export function HorizontalTabList({ 
  className, 
  circular = false, 
  layout = "Icon before", 
  size = "Medium (default)",
  activeTab: controlledActiveTab,
  onTabChange,
  onMoreClick
}: HorizontalTabListProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  
  const handleTabClick = (tabIndex: number) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabIndex);
    }
    onTabChange?.(tabIndex);
  };
  
  const handleMoreClick = () => {
    onMoreClick?.();
  };
  
  const isIconBeforeAndMediumDefaultAndCircular = layout === "Icon before" && size === "Medium (default)" && circular;
  const isIconBeforeAndMediumDefaultAndNotCircular = layout === "Icon before" && size === "Medium (default)" && !circular;
  const isIconBeforeAndSmallAndNotCircular = layout === "Icon before" && size === "Small" && !circular;
  const isIconOnlyAndMediumDefaultAndNotCircular = layout === "Icon only" && size === "Medium (default)" && !circular;
  const isTextOnlyAndMediumDefaultAndNotCircular = layout === "Text only" && size === "Medium (default)" && !circular;
  
  const renderTab = (tabIndex: number) => {
    const isActive = activeTab === tabIndex;
    
    return (
      <div 
        key={tabIndex}
        className={`relative shrink-0 cursor-pointer transition-colors ${isIconBeforeAndSmallAndNotCircular ? `${isActive ? "bg-[rgba(255,255,255,0)]" : "bg-[rgba(255,255,255,0)]"} h-[32px] rounded-[4px]` : isIconBeforeAndMediumDefaultAndCircular ? `${isActive ? "bg-[#ebf3fc]" : "bg-[rgba(255,255,255,0)]"} h-[32px] rounded-[9999px]` : `${isActive ? "bg-[rgba(255,255,255,0)]" : "bg-[rgba(255,255,255,0)]"} h-[44px] rounded-[4px]`}`} 
        data-name="Horizontal Tab"
        onClick={() => handleTabClick(tabIndex)}
      >
        {isActive && isIconBeforeAndMediumDefaultAndCircular ? (
          <>
            <div aria-hidden="true" className="absolute border border-[#0f6cbd] border-solid inset-0 pointer-events-none rounded-[9999px]" />
            <div className="content-stretch flex gap-[6px] h-full items-start px-[10px] py-[6px] relative">
              <HorizontalTabListIcon />
              <div className="content-stretch flex items-start px-[2px] relative shrink-0" data-name="Tab title">
                <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#115ea3] text-[14px] whitespace-nowrap">
                  <p className="leading-[20px]">Text</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={isIconBeforeAndSmallAndNotCircular ? "content-stretch flex gap-[2px] h-full items-start p-[6px] relative" : isIconBeforeAndMediumDefaultAndCircular ? "content-stretch flex gap-[6px] h-full items-start px-[10px] py-[6px] relative" : "content-stretch flex gap-[6px] h-full items-start px-[10px] py-[12px] relative"}>
            {(isIconBeforeAndMediumDefaultAndNotCircular || isIconOnlyAndMediumDefaultAndNotCircular || isIconBeforeAndMediumDefaultAndCircular || isIconBeforeAndSmallAndNotCircular) && (
              isActive ? <HorizontalTabListIcon /> : <HorizontalTabListRegularIcon />
            )}
            {(isIconBeforeAndMediumDefaultAndNotCircular || isTextOnlyAndMediumDefaultAndNotCircular || isIconOnlyAndMediumDefaultAndNotCircular || isIconBeforeAndMediumDefaultAndCircular || isIconBeforeAndSmallAndNotCircular) && (
              <>
                <div className="content-stretch flex items-start px-[2px] relative shrink-0" data-name="Tab title">
                  <div className={`flex flex-col font-['Segoe_UI:${isActive ? 'Semibold' : 'Regular'}',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[${isActive ? '#242424' : '#424242'}] text-[14px] whitespace-nowrap`}>
                    <p className="leading-[20px]">Text</p>
                  </div>
                </div>
                {isActive && (isIconBeforeAndMediumDefaultAndNotCircular || isTextOnlyAndMediumDefaultAndNotCircular || isIconOnlyAndMediumDefaultAndNotCircular || isIconBeforeAndSmallAndNotCircular) && (
                  <div className={`absolute left-0 right-0 ${isIconBeforeAndSmallAndNotCircular ? "h-[2px] top-[30px]" : "h-[3px] top-[41px]"}`} data-name="Selection indicator">
                    <div className={`absolute bg-[#0f6cbd] bottom-0 rounded-[9999px] ${isIconBeforeAndSmallAndNotCircular ? "h-[2px] left-[8px] right-[8px]" : "h-[3px] left-[12px] right-[12px]"}`} data-name="Selector" />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={className || `relative ${isIconBeforeAndMediumDefaultAndCircular ? "w-[617px]" : ""}`}>
      <div className="flex flex-row items-center size-full">
        <div className={`content-stretch flex items-center relative ${isIconBeforeAndMediumDefaultAndCircular ? "gap-[8px] w-full" : ""}`}>
          {renderTab(0)}
          {renderTab(1)}
          {renderTab(2)}
          {renderTab(3)}
          {renderTab(4)}
          <div 
            className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors" 
            data-name="Button"
            onClick={handleMoreClick}
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center p-[6px] relative">
                <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                  <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[2.5px] left-1/2 top-1/2 w-[12.5px]" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 2.5">
                        <path d={svgPaths.p1737d400} fill="var(--fill-0, #424242)" id="Shape" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

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

type HorizontalTabListTabTitleTextProps = {
  text: string;
  isActive?: boolean;
};

function HorizontalTabListTabTitleText({ text, isActive = false }: HorizontalTabListTabTitleTextProps) {
  return (
    <div className="content-stretch flex items-start px-[2px] relative shrink-0">
      <div className={`flex flex-col font-['Segoe_UI:${isActive ? 'Semibold' : 'Regular'}',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[${isActive ? '#242424' : '#424242'}] text-[14px] whitespace-nowrap`}>
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

function HorizontalTabListRegularIcon() {
  return (
    <Wrapper>
      <path d={svgPaths.p37618c00} fill="var(--fill-0, #424242)" id="Shape" />
    </Wrapper>
  );
}

function HorizontalTabListIcon() {
  return (
    <Wrapper>
      <path d={svgPaths.p31e92600} fill="var(--fill-0, #0F6CBD)" id="Shape" />
    </Wrapper>
  );
}

// ---------------------- Display Component ----------------------

interface HorizontalTabListProps_Display {
  circular?: boolean;
  layout?: 'Icon before' | 'Text only' | 'Icon only';
  size?: 'Medium (default)' | 'Small';
}

function HorizontalTabList_Display({
  circular,
  layout,
  size,
}: HorizontalTabListProps_Display) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <HorizontalTabList
      circular={circular}
      layout={layout}
      size={size}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onMoreClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample IconBeforeMediumTabList
export function IconBeforeMediumTabList() {
  return (
    <HorizontalTabList_Display
      layout="Icon before"
      size="Medium (default)"
    />
  );
}

// @figmaExample TextOnlyMediumTabList
export function TextOnlyMediumTabList() {
  return (
    <HorizontalTabList_Display
      layout="Text only"
      size="Medium (default)"
    />
  );
}

// @figmaExample IconOnlyMediumTabList
export function IconOnlyMediumTabList() {
  return (
    <HorizontalTabList_Display
      layout="Icon only"
      size="Medium (default)"
    />
  );
}

// @figmaExample IconBeforeSmallTabList
export function IconBeforeSmallTabList() {
  return (
    <HorizontalTabList_Display
      layout="Icon before"
      size="Small"
    />
  );
}

// @figmaExample CircularIconBeforeMediumTabList
export function CircularIconBeforeMediumTabList() {
  return (
    <HorizontalTabList_Display
      circular={true}
      layout="Icon before"
      size="Medium (default)"
    />
  );
}

// @figmaExample TextOnlySmallTabList
export function TextOnlySmallTabList() {
  return (
    <HorizontalTabList_Display
      layout="Text only"
      size="Small"
    />
  );
}