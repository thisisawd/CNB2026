import * as React from 'react';
import { useState } from 'react';
import svgPaths from "./svg-jw5ur1i1la";

/**
 * A versatile, interactive button component following Fluent UI design patterns. 
 * Supports multiple visual styles, sizes, states, and layouts with optional icons and dropdown menu functionality.
 * 
 * This button can function as either a simple action button OR as a toggle button when used with selected state. 
 * The menuButton prop adds a chevron icon that triggers a separate onMenuClick handler (useful for split buttons or dropdown menus).
 * 
 * The component supports both controlled and uncontrolled state management. When state prop is provided, 
 * the component is fully controlled. Otherwise, it manages hover, pressed, and focus states internally.
 */
export interface ButtonProps {
  className?: string; // Optional custom className to override default styling
  focus?: boolean; // Controls focus ring visibility (default: false)
  icon?: boolean; // Whether to display the icon (default: true)
  label?: string; // The text content displayed on the button (default: "Button")
  layout?: 'Icon and label (Default)' | 'Icon only'; // Controls whether to show both icon and label, or just the icon (default: "Icon and label (Default)")
  menuButton?: boolean; // When true, adds a chevron icon that triggers onMenuClick (default: false)
  prop20XFilled?: React.ReactNode | null; // Custom 20x20 filled icon to display when state is "Selected" (default: null)
  prop20XOutline?: React.ReactNode | null; // Custom 20x20 outline icon to display in Medium/Small sizes (default: null)
  prop24XOutline?: React.ReactNode | null; // Custom 24x24 outline icon to display in Large size (default: null)
  size?: 'Large' | 'Medium (Default)' | 'Small'; // Button size (default: "Medium (Default)")
  state?: 'Rest' | 'Hover' | 'Pressed' | 'Selected' | 'Disabled'; // Explicitly controls the button state
  style?: 'Primary' | 'Secondary (Default)' | 'Outline' | 'Subtle' | 'Transparent'; // Visual style variant (default: "Secondary (Default)")
  onClick?: () => void; // Click handler called when button is clicked
  onMenuClick?: () => void; // Separate click handler for the menu chevron button
  selected?: boolean; // Controlled selected state for toggle button behavior
  onSelectedChange?: (selected: boolean) => void; // Callback fired when selected state changes
  disabled?: boolean; // When true, disables the button
}

// ---------------------- Main Component ----------------------

export function Button({ 
  className, 
  focus: focusProp = false, 
  icon = true, 
  label = "Button", 
  layout = "Icon and label (Default)", 
  menuButton = false, 
  prop20XFilled = null, 
  prop20XOutline = null, 
  prop24XOutline = null, 
  size = "Medium (Default)", 
  state: stateProp, 
  style = "Secondary (Default)",
  onClick,
  onMenuClick,
  selected: selectedProp,
  onSelectedChange,
  disabled: disabledProp
}: ButtonProps) {
  // Internal state management for interactive behavior
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [internalSelected, setInternalSelected] = useState(false);

  // Determine actual state based on props or internal state
  const isControlled = stateProp !== undefined;
  const isSelectedControlled = selectedProp !== undefined;
  const isDisabledControlled = disabledProp !== undefined;
  
  const selected = isSelectedControlled ? selectedProp : internalSelected;
  const disabled = isDisabledControlled ? disabledProp : stateProp === "Disabled";
  const focus = focusProp || isFocused;
  
  const state = isControlled 
    ? stateProp 
    : disabled 
    ? "Disabled" 
    : selected
    ? "Selected"
    : isPressed 
    ? "Pressed" 
    : isHovered 
    ? "Hover" 
    : "Rest";

  // Event handlers
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    if (onClick) {
      onClick();
    }
    
    // Toggle selected state if it's being used
    if (!isSelectedControlled && (stateProp === "Selected" || selected)) {
      const newSelected = !selected;
      setInternalSelected(newSelected);
      if (onSelectedChange) {
        onSelectedChange(newSelected);
      }
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    if (onMenuClick) {
      onMenuClick();
    }
  };

  const handleMouseEnter = () => {
    if (disabled || isControlled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (disabled || isControlled) return;
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (disabled || isControlled) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (disabled || isControlled) return;
    setIsPressed(false);
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (disabled) return;
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
      if (!isSelectedControlled && (stateProp === "Selected" || selected)) {
        const newSelected = !selected;
        setInternalSelected(newSelected);
        if (onSelectedChange) {
          onSelectedChange(newSelected);
        }
      }
    }
  };

  const isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Outline" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Primary" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel = style === "Secondary (Default)" && state === "Disabled" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault = style === "Secondary (Default)" && state === "Hover" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel = style === "Secondary (Default)" && state === "Pressed" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault = style === "Secondary (Default)" && state === "Rest" && size === "Large" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Secondary (Default)" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly = style === "Secondary (Default)" && state === "Rest" && size === "Medium (Default)" && layout === "Icon only";
  const isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault = style === "Secondary (Default)" && state === "Rest" && size === "Small" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel = style === "Secondary (Default)" && state === "Selected" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Subtle" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Transparent" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  
  return (
    <div 
      className={className || `relative rounded-[4px] ${isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault ? "bg-[#f5f5f5]" : isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel ? "bg-[#e0e0e0]" : isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel ? "bg-[#ebebeb]" : isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel ? "bg-[#f0f0f0]" : isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault ? "bg-[#0f6cbd]" : isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault ? "bg-[rgba(255,255,255,0)]" : "bg-white"}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-pressed={selected}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none' }}
    >
      <div aria-hidden={isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault ? "true" : undefined} className={isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault ? "absolute border border-[#c7c7c7] border-solid inset-0 pointer-events-none rounded-[4px]" : isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel ? "absolute border border-[#b3b3b3] border-solid inset-0 pointer-events-none rounded-[4px]" : isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel ? "absolute border border-[#bdbdbd] border-solid inset-0 pointer-events-none rounded-[4px]" : isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel ? "absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" : isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault || isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault ? "flex flex-row items-center justify-center size-full" : "absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]"}>
        {(isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault || isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault) && (
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
            {(isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault) &&
              icon &&
              (prop20XOutline || (
                <Wrapper>
                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                </Wrapper>
              ))}
            {(isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault) && (
              <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                    <p className="leading-[20px]">{label}</p>
                  </div>
                </div>
                {menuButton && (
                  <div onClick={handleMenuClick}>
                    <Wrapper2>
                      <path d={svgPaths.p2e2fea80} fill="var(--fill-0, #424242)" id="Shape" />
                    </Wrapper2>
                  </div>
                )}
              </div>
            )}
            {(isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault) && focus && <ButtonFocusRing />}
            {isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault &&
              icon &&
              (prop20XOutline || (
                <Wrapper>
                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
                </Wrapper>
              ))}
            {isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault && (
              <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                    <p className="leading-[20px]">{label}</p>
                  </div>
                </div>
                {menuButton && (
                  <div onClick={handleMenuClick}>
                    <Wrapper2>
                      <path d={svgPaths.p2e2fea80} fill="var(--fill-0, white)" id="Shape" />
                    </Wrapper2>
                  </div>
                )}
              </div>
            )}
            {isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault && focus && <ButtonFocusRing />}
          </div>
        )}
      </div>
      {(isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault) && (
        <div className="flex flex-row items-center justify-center size-full">
          <div className={`content-stretch flex items-center justify-center relative ${isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly ? "p-[6px]" : isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault ? "gap-[6px] px-[12px] py-[6px]" : isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault ? "gap-[4px] px-[8px] py-[2px]" : "gap-[6px] px-[16px] py-[8px]"}`}>
            {(isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault) && icon && (prop20XOutline || <ButtonPlaceholder />)}
            {(isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault) && (
              <div className={`content-stretch flex gap-[4px] items-center justify-center relative shrink-0 ${isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly ? "" : isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault ? "h-[20px] pb-[2px]" : "h-[20px]"}`} data-name="Container">
                {(isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault) && (
                  <div className={`content-stretch flex items-start relative shrink-0 ${isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault ? "" : "pb-[2px]"}`} data-name="Text wrapper for offset">
                    {(isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault) && (
                      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                        <p className="leading-[20px]">{label}</p>
                      </div>
                    )}
                    {isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault && (
                      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] whitespace-nowrap">
                        <p className="leading-[16px]">{label}</p>
                      </div>
                    )}
                  </div>
                )}
                {(isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault) && menuButton && (
                  <div onClick={handleMenuClick}>
                    <ButtonChevron />
                  </div>
                )}
                {isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly && (prop20XOutline || <ButtonPlaceholder />)}
                {isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly && menuButton && (
                  <div onClick={handleMenuClick}>
                    <ButtonChevron />
                  </div>
                )}
              </div>
            )}
            {(isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault) && focus && <ButtonFocusRing />}
            {isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault &&
              icon &&
              (prop24XOutline || (
                <Wrapper1>
                  <div className="relative shrink-0 size-[20px]" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d={svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
                    </svg>
                  </div>
                </Wrapper1>
              ))}
            {isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault && (
              <div className="content-stretch flex gap-[4px] h-[24px] items-center justify-center relative shrink-0" data-name="Container">
                <div className="content-stretch flex items-start pb-[2px] relative shrink-0" data-name="Text wrapper for offset">
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[16px] whitespace-nowrap">
                    <p className="leading-[22px]">{label}</p>
                  </div>
                </div>
                {menuButton && (
                  <div onClick={handleMenuClick}>
                    <ButtonChevron />
                  </div>
                )}
              </div>
            )}
            {isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault && focus && <ButtonFocusRing />}
            {isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel &&
              icon &&
              (prop20XOutline || (
                <Wrapper>
                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #BDBDBD)" fillRule="evenodd" id="Shape" />
                </Wrapper>
              ))}
            {isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel && (
              <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bdbdbd] text-[14px] whitespace-nowrap">
                    <p className="leading-[20px]">{label}</p>
                  </div>
                </div>
                {menuButton && (
                  <div onClick={handleMenuClick}>
                    <Wrapper2>
                      <path d={svgPaths.p2e2fea80} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                    </Wrapper2>
                  </div>
                )}
              </div>
            )}
            {isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel &&
              icon &&
              (prop20XFilled || (
                <Wrapper>
                  <path clipRule="evenodd" d={svgPaths.p30769300} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
                </Wrapper>
              ))}
            {isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel && (
              <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                    <p className="leading-[20px]">{label}</p>
                  </div>
                </div>
                {menuButton && (
                  <div onClick={handleMenuClick}>
                    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chevron">
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.75px] left-1/2 top-[calc(50%+0.63px)] w-[8px]" data-name="Shape">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4.75">
                          <path d={svgPaths.pe230480} fill="var(--fill-0, #242424)" id="Shape" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
    </div>
  );
}

export function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.5px] left-1/2 top-[calc(50%+0.75px)] w-[8px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4.5">
          {children}
        </svg>
      </div>
    </div>
  );
}

export function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <Wrapper3>{children}</Wrapper3>
    </div>
  );
}

export function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1>
      <div className="relative shrink-0 size-[16px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          {children}
        </svg>
      </div>
    </Wrapper1>
  );
}

export function ButtonChevron() {
  return (
    <Wrapper2>
      <path d={svgPaths.p2e2fea80} fill="var(--fill-0, #242424)" id="Shape" />
    </Wrapper2>
  );
}

export function ButtonPlaceholder() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

export function ButtonFocusRing() {
  return (
    <div className="absolute inset-0 rounded-[4px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute border border-solid border-white inset-0 rounded-[4px]" data-name="Inner stroke" />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
    </div>
  );
}

type PlaceholderProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

export function Placeholder({ className, size = "12", theme = "Regular" }: PlaceholderProps) {
  const is12AndFilled = size === "12" && theme === "Filled";
  const is12AndRegular = size === "12" && theme === "Regular";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndRegular = size === "24" && theme === "Regular";
  const is28AndRegular = size === "28" && theme === "Regular";
  const is32AndRegular = size === "32" && theme === "Regular";
  const is48AndRegular = size === "48" && theme === "Regular";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is48AndRegular ? "size-[48px]" : is24AndRegular || is20AndRegular || is16AndRegular || is12AndRegular || is12AndFilled ? "" : is32AndRegular ? "size-[32px]" : "size-[28px]"}`}>
      {(is24AndRegular || is20AndRegular || is16AndRegular || is12AndRegular || is12AndFilled) && (
        <Wrapper3>
          <div className={`relative shrink-0 ${is12AndRegular || is12AndFilled ? "size-[8px]" : is16AndRegular ? "size-[12px]" : is20AndRegular ? "size-[16px]" : "size-[20px]"}`} data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is12AndRegular || is12AndFilled ? "0 0 8 8" : is16AndRegular ? "0 0 12 12" : is20AndRegular ? "0 0 16 16" : "0 0 20 20"}>
              <path clipRule="evenodd" d={is12AndRegular || is12AndFilled ? svgPaths.p18da8d00 : is16AndRegular ? svgPaths.p31a9aa00 : is20AndRegular ? svgPaths.pa51a700 : svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </Wrapper3>
      )}
      {(is28AndRegular || is32AndRegular || is48AndRegular) && (
        <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${is48AndRegular ? "size-[40px]" : is32AndRegular ? "size-[26px]" : "size-[22px]"}`} data-name="Shape">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is48AndRegular ? "0 0 40 40" : is32AndRegular ? "0 0 26 26" : "0 0 22 22"}>
            <path clipRule="evenodd" d={is48AndRegular ? svgPaths.p20a13b40 : is32AndRegular ? svgPaths.p14bd3300 : svgPaths.p3a7e7880} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      )}
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface ButtonProps_Display {
  className?: string;
  icon?: boolean;
  label?: string;
  layout?: 'Icon and label (Default)' | 'Icon only';
  menuButton?: boolean;
  prop20XFilled?: React.ReactNode | null;
  prop20XOutline?: React.ReactNode | null;
  prop24XOutline?: React.ReactNode | null;
  size?: 'Large' | 'Medium (Default)' | 'Small';
  style?: 'Primary' | 'Secondary (Default)' | 'Outline' | 'Subtle' | 'Transparent';
  disabled?: boolean;
}

function Button_Display({
  className,
  icon,
  label,
  layout,
  menuButton,
  prop20XFilled,
  prop20XOutline,
  prop24XOutline,
  size,
  style,
  disabled,
}: ButtonProps_Display) {
  return (
    <Button
      className={className}
      icon={icon}
      label={label}
      layout={layout}
      menuButton={menuButton}
      prop20XFilled={prop20XFilled}
      prop20XOutline={prop20XOutline}
      prop24XOutline={prop24XOutline}
      size={size}
      style={style}
      disabled={disabled}
      onClick={() => {}}
      onMenuClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample PrimaryButton
export function PrimaryButton() {
  return (
    <Button_Display
      style="Primary"
      size="Medium (Default)"
      label="Primary Button"
      layout="Icon and label (Default)"
      icon={true}
    />
  );
}

// @figmaExample SecondaryButton
export function SecondaryButton() {
  return (
    <Button_Display
      style="Secondary (Default)"
      size="Medium (Default)"
      label="Secondary Button"
      layout="Icon and label (Default)"
      icon={true}
    />
  );
}

// @figmaExample LargeOutlineButton
export function LargeOutlineButton() {
  return (
    <Button_Display
      style="Outline"
      size="Large"
      label="Large Outline"
      layout="Icon and label (Default)"
      icon={true}
    />
  );
}

// @figmaExample SmallSubtleButton
export function SmallSubtleButton() {
  return (
    <Button_Display
      style="Subtle"
      size="Small"
      label="Small Subtle"
      layout="Icon and label (Default)"
      icon={true}
    />
  );
}

// @figmaExample PrimaryMenuButton
export function PrimaryMenuButton() {
  return (
    <Button_Display
      style="Primary"
      size="Medium (Default)"
      label="Menu Button"
      menuButton={true}
      icon={true}
      layout="Icon and label (Default)"
    />
  );
}

// @figmaExample IconOnlyButton
export function IconOnlyButton() {
  return (
    <Button_Display
      style="Secondary (Default)"
      size="Medium (Default)"
      layout="Icon only"
      icon={true}
    />
  );
}

// @figmaExample TransparentButton
export function TransparentButton() {
  return (
    <Button_Display
      style="Transparent"
      size="Medium (Default)"
      label="Transparent"
      layout="Icon and label (Default)"
      icon={false}
    />
  );
}

// @figmaExample DisabledPrimaryButton
export function DisabledPrimaryButton() {
  return (
    <Button_Display
      style="Primary"
      size="Medium (Default)"
      label="Disabled"
      disabled={true}
      layout="Icon and label (Default)"
      icon={true}
    />
  );
}