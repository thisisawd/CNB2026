import * as React from 'react';
import { useState, useCallback } from 'react';
import svgPaths from "./svg-7p1zruatl6";

/**
 * HorizontalTab
 *
 * A tab navigation component that supports multiple visual styles and interactive states.
 * Appears as a horizontal clickable element with optional icon and text, typically used within a tab bar or navigation container.
 * The component displays a selection indicator (underline or circular background) when selected and responds to mouse and keyboard interactions.
 *
 * Usage Notes:
 * - Use within tab navigation systems where users switch between different views or content sections
 * - Supports keyboard navigation with Enter and Space keys for accessibility
 * - Automatically manages hover, pressed, and focus visual states
 * - The component includes proper ARIA attributes for screen reader accessibility
 * - When disabled, pointer events still fire but click handlers are not invoked
 */
export interface HorizontalTabProps {
  className?: string; // Custom className to override default styling. When provided, replaces all default container styles.
  iconSelected?: boolean; // Whether to show the calendar icon when the tab is in selected state. (default: true)
  iconUnselected?: boolean; // Whether to show the calendar icon when the tab is in unselected state. (default: true)
  selected?: boolean; // Controls whether the tab appears in selected state with selection indicator. Significantly changes appearance - adds bottom underline or fills background depending on style variant. (default: false)
  size?: 'Medium (default)' | 'Small'; // Controls the overall height and padding of the tab. (default: 'Medium (default)')
  style?: 'Transparent (default)' | 'Subtle' | 'Filled circular' | 'Subtle circular'; // Visual style variant that significantly changes appearance. (default: 'Transparent (default)')
  text?: string; // The text label displayed in the tab. (default: 'Text')
  disabled?: boolean; // Disables the tab interaction and applies disabled styling (grayed out). Prevents onClick from firing and sets cursor to not-allowed. (default: false)
  onClick?: () => void; // Callback fired when the tab is clicked (not called when disabled).
  onFocus?: () => void; // Callback fired when the tab receives focus (not called when disabled).
  onBlur?: () => void; // Callback fired when the tab loses focus.
}

// ---------------------- Main Component ----------------------

export function HorizontalTab({ 
  className, 
  iconSelected = true, 
  iconUnselected = true, 
  selected = false, 
  size = "Medium (default)", 
  style = "Transparent (default)",
  text = "Text",
  disabled = false,
  onClick,
  onFocus,
  onBlur
}: HorizontalTabProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Determine the actual state based on internal state and disabled prop
  const state = disabled ? "Disabled" : 
                isPressed ? "Pressed" : 
                isFocused ? "Focus" : 
                isHovered ? "Hover" : 
                "Rest";

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsHovered(true);
    }
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (!disabled) {
      setIsPressed(true);
    }
  }, [disabled]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (!disabled) {
      setIsFocused(true);
      onFocus?.();
    }
  }, [disabled, onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  }, [disabled, handleClick]);

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
  
  return (
    <div 
      className={className || `relative ${isSelectedAndFilledCircularAndMediumDefaultAndRest ? "bg-[#0f6cbd] h-[32px] rounded-[9999px]" : isSelectedAndSubtleCircularAndMediumDefaultAndRest ? "bg-[#ebf3fc] h-[32px] rounded-[9999px]" : isSelectedAndTransparentDefaultAndSmallAndRest ? "bg-[rgba(255,255,255,0)] h-[32px] rounded-[4px]" : isSelectedAndTransparentDefaultAndMediumDefaultAndDisabled ? "h-[44px] rounded-[4px]" : isSelectedAndTransparentDefaultAndMediumDefaultAndFocus ? "bg-[rgba(255,255,255,0)] rounded-[2px] w-[76px]" : "bg-[rgba(255,255,255,0)] h-[44px] rounded-[4px]"}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      role="tab"
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div aria-hidden={isSelectedAndTransparentDefaultAndMediumDefaultAndFocus || isSelectedAndSubtleCircularAndMediumDefaultAndRest ? "true" : undefined} className={isSelectedAndFilledCircularAndMediumDefaultAndRest ? "content-stretch flex gap-[6px] h-full items-start px-[10px] py-[6px] relative" : isSelectedAndSubtleCircularAndMediumDefaultAndRest ? "absolute border border-[#0f6cbd] border-solid inset-0 pointer-events-none rounded-[9999px]" : isSelectedAndTransparentDefaultAndSmallAndRest ? "content-stretch flex gap-[2px] h-full items-start p-[6px] relative" : isSelectedAndTransparentDefaultAndMediumDefaultAndFocus ? "absolute border-3 border-black border-solid inset-[-3px] pointer-events-none rounded-[5px]" : "content-stretch flex gap-[6px] h-full items-start px-[10px] py-[12px] relative"}>
        {(isSelectedAndTransparentDefaultAndMediumDefaultAndRest || isSelectedAndSubtleAndMediumDefaultAndRest || isSelectedAndTransparentDefaultAndSmallAndRest) && iconSelected && <HorizontalTabIcon />}
        {(isSelectedAndTransparentDefaultAndMediumDefaultAndRest || isSelectedAndSubtleAndMediumDefaultAndRest || isSelectedAndTransparentDefaultAndSmallAndRest) && (
          <>
            <HorizontalTabTabTitleText text={text} />
            <div className={`absolute left-0 right-0 ${isSelectedAndTransparentDefaultAndSmallAndRest ? "h-[2px] top-[30px]" : "h-[3px] top-[41px]"}`} data-name="Selection indicator">
              <div className={`absolute bg-[#0f6cbd] bottom-0 rounded-[9999px] ${isSelectedAndTransparentDefaultAndSmallAndRest ? "h-[2px] left-[8px] right-[8px]" : "h-[3px] left-[12px] right-[12px]"}`} data-name="Selector" />
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
            <HorizontalTabTabTitleText text={text} />
            <div className="absolute h-[3px] left-0 right-0 top-[41px]" data-name="Selection indicator">
              <div className="absolute bg-[#115ea3] bottom-0 h-[3px] left-[12px] right-[12px] rounded-[9999px]" data-name="Selector" />
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
            <HorizontalTabTabTitleText text={text} />
            <div className="absolute h-[3px] left-0 right-0 top-[41px]" data-name="Selection indicator">
              <div className="absolute bg-[#0f548c] bottom-0 h-[3px] left-[12px] right-[12px] rounded-[9999px]" data-name="Selector" />
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
            <div className="absolute h-[3px] left-0 right-0 top-[41px]" data-name="Selection indicator">
              <div className="absolute bg-[#bdbdbd] bottom-0 h-[3px] left-[12px] right-[12px] rounded-[9999px]" data-name="Selector" />
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
            <div className="absolute h-[3px] left-0 right-0 top-[41px]" data-name="Selection indicator" />
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
        <div className={`flex ${isSelectedAndSubtleCircularAndMediumDefaultAndRest ? "content-stretch gap-[6px] h-full items-start px-[10px] py-[6px] relative" : "flex-col items-center size-full"}`}>
          {isSelectedAndTransparentDefaultAndMediumDefaultAndFocus && (
            <div className="content-stretch flex flex-col items-center relative w-full">
              <div className="content-stretch flex flex-col items-start relative rounded-[2px] shrink-0" data-name="Horizontal Tab">
                <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[3px]" />
                <div className="content-stretch flex gap-[6px] items-start pb-[8px] pt-[12px] px-[10px] relative shrink-0" data-name="Content">
                  {iconSelected && <HorizontalTabIcon />}
                  <HorizontalTabTabTitleText text={text} />
                </div>
                <div className="h-[3px] relative shrink-0 w-full" data-name="Selection indicator">
                  <div className="absolute bg-[#0f6cbd] bottom-0 h-[3px] left-[12px] right-[12px] rounded-[9999px]" data-name="Selector" />
                </div>
              </div>
            </div>
          )}
          {isSelectedAndSubtleCircularAndMediumDefaultAndRest && iconSelected && <HorizontalTabIcon />}
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

type HorizontalTabTabTitleTextProps = {
  text: string;
};

function HorizontalTabTabTitleText({ text }: HorizontalTabTabTitleTextProps) {
  return (
    <div className="content-stretch flex items-start px-[2px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

function HorizontalTabIcon() {
  return (
    <Wrapper>
      <path d={svgPaths.p31e92600} fill="var(--fill-0, #0F6CBD)" id="Shape" />
    </Wrapper>
  );
}

// ---------------------- Display Component ----------------------

interface HorizontalTabProps_Display {
  iconSelected?: boolean;
  iconUnselected?: boolean;
  size?: 'Medium (default)' | 'Small';
  style?: 'Transparent (default)' | 'Subtle' | 'Filled circular' | 'Subtle circular';
  text?: string;
  disabled?: boolean;
}

function HorizontalTab_Display({
  iconSelected,
  iconUnselected,
  size,
  style,
  text,
  disabled,
}: HorizontalTabProps_Display) {
  const [selected, setSelected] = React.useState(false);

  return (
    <HorizontalTab
      iconSelected={iconSelected}
      iconUnselected={iconUnselected}
      selected={selected}
      size={size}
      style={style}
      text={text}
      disabled={disabled}
      onClick={() => !disabled && setSelected(!selected)}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample TransparentDefaultTab
export function TransparentDefaultTab() {
  return (
    <HorizontalTab_Display
      text="Transparent Tab"
      style="Transparent (default)"
      size="Medium (default)"
    />
  );
}

// @figmaExample SubtleTab
export function SubtleTab() {
  return (
    <HorizontalTab_Display
      text="Subtle Tab"
      style="Subtle"
      size="Medium (default)"
    />
  );
}

// @figmaExample FilledCircularTab
export function FilledCircularTab() {
  return (
    <HorizontalTab_Display
      text="Filled Circular"
      style="Filled circular"
      size="Medium (default)"
    />
  );
}

// @figmaExample SubtleCircularTab
export function SubtleCircularTab() {
  return (
    <HorizontalTab_Display
      text="Subtle Circular"
      style="Subtle circular"
      size="Medium (default)"
    />
  );
}

// @figmaExample SmallTransparentTab
export function SmallTransparentTab() {
  return (
    <HorizontalTab_Display
      text="Small Tab"
      style="Transparent (default)"
      size="Small"
    />
  );
}

// @figmaExample SmallFilledCircularTab
export function SmallFilledCircularTab() {
  return (
    <HorizontalTab_Display
      text="Small Filled"
      style="Filled circular"
      size="Small"
    />
  );
}

// @figmaExample NoIconsTab
export function NoIconsTab() {
  return (
    <HorizontalTab_Display
      text="No Icons"
      style="Subtle"
      iconSelected={false}
      iconUnselected={false}
    />
  );
}

// @figmaExample DisabledTab
export function DisabledTab() {
  return (
    <HorizontalTab_Display
      text="Disabled Tab"
      disabled={true}
    />
  );
}