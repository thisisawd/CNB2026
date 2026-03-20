import * as React from 'react';
import { useState, useCallback, KeyboardEvent, MouseEvent } from 'react';
import svgPaths from "./svg-5bnfbovezv";
import imgRectangle3469503 from "figma:asset/87508ace712c133af764a98a9a6ce42a16d6d3fc.png";

/**
 * A clickable navigation sub-item component designed for nested navigation menus, typically used within a sidebar or navigation panel.
 * 
 * Appears as a horizontally-oriented bar with 260px default width and 32px height. The component displays text content with a left indent (46px padding),
 * showing a vertical blue indicator bar on the left when selected. Background color transitions from light gray (#f0f0f0) to slightly lighter (#fafafa)
 * on hover and darker (#f5f5f5) when pressed. When selected, the text becomes semibold and displays in darker color.
 * 
 * On hover, a secondary action button appears on the right side with an icon. The component supports full keyboard navigation with Enter/Space key
 * handling and displays a black focus ring when focused.
 * 
 * Behavioral notes:
 * - Interactive states are managed internally (Hover, Pressed, Rest)
 * - Secondary action button only appears on hover and is hidden when item is selected
 * - Supports click propagation stopping for secondary action
 * - Fully accessible with ARIA attributes and keyboard navigation
 * - Text color changes from lighter (#424242) when unselected to darker (#242424) when hovered or selected
 */
export interface NavSubItemProps {
  className?: string; // Custom CSS classes to apply to the root container. When provided, overrides default width styling.
  selected?: boolean; // Whether this navigation item is currently selected. Changes appearance with blue left indicator, semibold text, and darker text color. (default: false)
  subItemContent?: string; // The text content to display in the navigation item. (default: "Nav sub item content")
  onClick?: () => void; // Callback function triggered when the main navigation item is clicked or activated via keyboard (Enter/Space).
  onSecondaryAction?: () => void; // Callback function triggered when the secondary action button (visible on hover) is clicked or activated via keyboard.
}

// ---------------------- Main Component ----------------------

export function NavSubItem({ 
  className, 
  selected = false, 
  subItemContent = "Nav sub item content",
  onClick,
  onSecondaryAction
}: NavSubItemProps) {
  const [state, setState] = useState<"Hover" | "Pressed" | "Rest">("Rest");
  const [focus, setFocus] = useState(false);
  const [secondaryActions, setSecondaryActions] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setState("Hover");
    setSecondaryActions(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState("Rest");
    setSecondaryActions(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setState("Pressed");
  }, []);

  const handleMouseUp = useCallback(() => {
    setState("Hover");
  }, []);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const handleSecondaryClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    if (onSecondaryAction) {
      onSecondaryAction();
    }
  }, [onSecondaryAction]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setState("Pressed");
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setState(focus ? "Hover" : "Rest");
      if (onClick) {
        onClick();
      }
    }
  }, [focus, onClick]);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
    setState("Rest");
  }, []);

  const isHoverAndNotSelectedAndSecondaryActions = state === "Hover" && !selected && secondaryActions;
  const isPressedAndNotSelectedAndSecondaryActions = state === "Pressed" && !selected && secondaryActions;
  const isRestAndNotSelectedAndNotSecondaryActions = state === "Rest" && !selected && !secondaryActions;
  const isRestAndSelectedAndNotSecondaryActions = state === "Rest" && selected && !secondaryActions;
  
  return (
    <div className={className || `relative w-[260px] ${isHoverAndNotSelectedAndSecondaryActions || isRestAndSelectedAndNotSecondaryActions ? "" : "h-[32px]"}`}>
      <div className="flex flex-row items-center size-full">
        <div className={`content-stretch flex gap-[2px] items-center px-[4px] relative ${isHoverAndNotSelectedAndSecondaryActions || isRestAndSelectedAndNotSecondaryActions ? "w-full" : "size-full"}`}>
          <div className={`flex items-center justify-center relative shrink-0 w-[4px] ${isRestAndSelectedAndNotSecondaryActions ? "h-[20px]" : "h-[24px]"}`}>
            <div className="flex-none rotate-90">
              <div className={`h-[4px] rounded-[2px] ${isRestAndSelectedAndNotSecondaryActions ? "bg-[#0f6cbd] w-[20px]" : "opacity-0 relative w-[24px]"}`}>{(isRestAndNotSelectedAndNotSecondaryActions || isHoverAndNotSelectedAndSecondaryActions || isPressedAndNotSelectedAndSecondaryActions) && <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgRectangle3469503} />}</div>
            </div>
          </div>
          <div 
            className={`flex-[1_0_0] h-[32px] min-h-px min-w-px relative cursor-pointer ${isPressedAndNotSelectedAndSecondaryActions ? "bg-[#f5f5f5] rounded-[4px]" : isHoverAndNotSelectedAndSecondaryActions ? "bg-[#fafafa] rounded-[4px]" : "bg-[#f0f0f0]"}`} 
            data-name="Button"
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-selected={selected}
          >
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[16px] items-center pl-[46px] pr-[6px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px pb-[6px] pt-[4px] relative" data-name="Content slot">
                  {(isHoverAndNotSelectedAndSecondaryActions || isPressedAndNotSelectedAndSecondaryActions) && (
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                      <p className="leading-[20px]">{subItemContent}</p>
                    </div>
                  )}
                  {isRestAndNotSelectedAndNotSecondaryActions && (
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                      <p className="leading-[20px]">{subItemContent}</p>
                    </div>
                  )}
                  {isRestAndSelectedAndNotSecondaryActions && (
                    <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                      <p className="leading-[20px]">{subItemContent}</p>
                    </div>
                  )}
                </div>
                {(isHoverAndNotSelectedAndSecondaryActions || isPressedAndNotSelectedAndSecondaryActions) && (
                  <div className="content-stretch flex items-center justify-end py-[4px] relative shrink-0" data-name="Secondary actions">
                    <div 
                      className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)]" 
                      data-name="Button"
                      role="button"
                      tabIndex={0}
                      onClick={handleSecondaryClick}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          if (onSecondaryAction) {
                            onSecondaryAction();
                          }
                        }
                      }}
                    >
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.48px)] size-[14.968px] top-[calc(50%-0.48px)]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9681 14.9681">
                                  <path d={svgPaths.p25a2db00} fill="var(--fill-0, #242424)" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {isRestAndSelectedAndNotSecondaryActions && focus && (
                  <div className="absolute h-[28px] left-[2px] rounded-[4px] top-[2px] w-[212px]" data-name="Focus ring">
                    <NavSubItemHelper />
                    <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {isRestAndNotSelectedAndNotSecondaryActions && focus && (
            <div className="absolute inset-[2px_2px_2px_12px] rounded-[4px]" data-name="Focus ring">
              <NavSubItemHelper />
              <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components ----------------------

export function NavSubItemHelper() {
  return (
    <div className="overflow-clip relative rounded-[inherit] size-full">
      <div className="absolute border border-solid border-white inset-0 rounded-[4px]" data-name="Inner stroke" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface NavSubItemProps_Display {
  selected?: boolean;
  subItemContent?: string;
}

function NavSubItem_Display({
  selected,
  subItemContent,
}: NavSubItemProps_Display) {
  return (
    <NavSubItem
      selected={selected}
      subItemContent={subItemContent}
      onClick={() => {}}
      onSecondaryAction={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DashboardNavItem
export function DashboardNavItem() {
  return (
    <NavSubItem_Display
      subItemContent="Dashboard"
    />
  );
}

// @figmaExample SelectedSettingsNavItem
export function SelectedSettingsNavItem() {
  return (
    <NavSubItem_Display
      selected={true}
      subItemContent="Settings"
    />
  );
}

// @figmaExample ReportsNavItem
export function ReportsNavItem() {
  return (
    <NavSubItem_Display
      subItemContent="Reports"
    />
  );
}

// @figmaExample SelectedUserManagementNavItem
export function SelectedUserManagementNavItem() {
  return (
    <NavSubItem_Display
      selected={true}
      subItemContent="User Management"
    />
  );
}

// @figmaExample AnalyticsNavItem
export function AnalyticsNavItem() {
  return (
    <NavSubItem_Display
      subItemContent="Analytics"
    />
  );
}

// @figmaExample NotificationsNavItem
export function NotificationsNavItem() {
  return (
    <NavSubItem_Display
      subItemContent="Notifications"
    />
  );
}