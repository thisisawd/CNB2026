import * as React from 'react';
import { useState, useCallback, KeyboardEvent } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-3pb5t104g1';

/**
 * An interactive chip/tag component for filtering, categorization, or selection. 
 * Used to represent selectable items, filter options, or removable tags in a UI.
 * 
 * Appears as a rounded rectangular pill-shaped element with customizable background colors, 
 * borders, and content. Can display an avatar, icon, text labels, and an optional dismiss button. 
 * The tag responds to user interactions with visual state changes (hover, pressed, focus, disabled) 
 * and supports both mouse and keyboard navigation.
 * 
 * Supports three visual styles: Filled (default gray background), Outline (transparent with border), 
 * and Brand (blue accent). The component is fully accessible with ARIA attributes and keyboard 
 * support for Enter and Space keys.
 */
export interface InteractionTagProps {
  className?: string; // Optional custom className to override default styling and layout
  avatar?: boolean; // Whether to display an avatar circle on the left side of the tag. Default: false. Shows initials in a circular container.
  dismiss?: boolean; // Whether to show the dismiss/close button on the right side. Default: true. Allows users to remove the tag.
  filled20Px?: React.ReactNode | null; // Custom filled icon (20px) to display when selected state is true. Default: null (uses default checkmark icon)
  focus?: boolean; // Force the focus ring to be visible. Default: false. Useful for programmatic focus indication.
  icon?: boolean; // Whether to display an icon on the left side (after avatar if present). Default: false
  layout?: "1 line (Default)" | "2 line (Medium only)"; // Text layout mode. Default: "1 line (Default)". Two-line layout shows primary and secondary text stacked.
  primaryString?: string; // Main text content displayed in the tag. Default: "Primary text"
  regular12Px?: React.ReactNode | null; // Custom regular icon (12px) for Extra small size. Default: null (uses default placeholder icon)
  regular16Px?: React.ReactNode | null; // Custom regular icon (16px) for Small size. Default: null (uses default placeholder icon)
  regular20Px?: React.ReactNode | null; // Custom regular icon (20px) for Medium size. Default: null (uses default placeholder icon)
  secondaryString?: string; // Secondary text shown below primary text when layout is "2 line (Medium only)". Default: "Secondary"
  selected?: boolean; // Whether the tag is in a selected state. Default: false. Changes background to blue and text to white.
  size?: "Extra small" | "Small" | "Medium (Default)"; // Size variant affecting height and padding. Default: "Medium (Default)". Extra small: 20px, Small: 24px, Medium: 32px.
  state?: "Rest" | "Hover" | "Pressed" | "Disabled"; // Visual state of the component. Default: "Rest". When set to "Rest", component manages its own hover/pressed states internally.
  style?: "Filled (Default)" | "Outline" | "Brand"; // Visual style variant. Default: "Filled (Default)". Filled: gray background, Outline: transparent with border, Brand: light blue background with blue accents.
  onClick?: () => void; // Callback fired when the tag itself is clicked
  onDismiss?: () => void; // Callback fired when the dismiss button is clicked. Only relevant when dismiss is true.
}

// ---------------------- Main Component ----------------------

export function InteractionTag({ className, avatar = false, dismiss = true, filled20Px = null, focus = false, icon = false, layout = "1 line (Default)", primaryString = "Primary text", regular12Px = null, regular16Px = null, regular20Px = null, secondaryString = "Secondary", selected = false, size = "Medium (Default)", state = "Rest", style = "Filled (Default)", onClick, onDismiss }: InteractionTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Use internal state for hover/pressed if state prop is "Rest", otherwise use the prop
  const effectiveState = state !== "Rest" ? state : isPressed ? "Pressed" : isHovered ? "Hover" : "Rest";
  const effectiveFocus = focus || isFocused;
  const isDisabled = state === "Disabled";

  const handleClick = useCallback(() => {
    if (!isDisabled && onClick) {
      onClick();
    }
  }, [isDisabled, onClick]);

  const handleDismissClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled && onDismiss) {
      onDismiss();
    }
  }, [isDisabled, onDismiss]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
    }
  }, [isDisabled, onClick]);

  const handleDismissKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (onDismiss) {
        onDismiss();
      }
    }
  }, [isDisabled, onDismiss]);

  const isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd = style === "Brand" && size === "Medium (Default)" && layout === "1 line (Default)" && effectiveState === "Rest" && !selected && dismiss;
  const isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected = style === "Filled (Default)" && size === "Extra small" && layout === "1 line (Default)" && effectiveState === "Rest" && !selected && dismiss;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && effectiveState === "Disabled" && !selected && dismiss;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && effectiveState === "Hover" && !selected && dismiss;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && effectiveState === "Pressed" && !selected && dismiss;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && effectiveState === "Rest" && !selected && dismiss;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot1 = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && effectiveState === "Rest" && !selected && !dismiss;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && effectiveState === "Rest" && selected && dismiss;
  const isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "2 line (Medium only)" && effectiveState === "Rest" && !selected && dismiss;
  const isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelectedAnd = style === "Filled (Default)" && size === "Small" && layout === "1 line (Default)" && effectiveState === "Rest" && !selected && dismiss;
  const isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd = style === "Outline" && size === "Medium (Default)" && layout === "1 line (Default)" && effectiveState === "Rest" && !selected && dismiss;
  return (
    <div 
      className={className || `relative rounded-[4px] ${isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot1 ? "bg-[#f5f5f5] max-h-[32px]" : isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot ? "max-h-[32px]" : isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelectedAnd ? "h-[24px] max-h-[24px]" : "max-h-[20px]"}`}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-pressed={selected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !isDisabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="flex flex-row items-center max-h-[inherit] size-full">
        <div className={`content-stretch flex items-center max-h-[inherit] relative ${isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelectedAnd ? "h-full" : ""}`}>
          {(isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot1) && (
            <div className="flex flex-row items-center self-stretch">
              {(isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && (
                <div className={`content-stretch flex h-full items-start relative rounded-bl-[4px] rounded-tl-[4px] shrink-0 ${isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot ? "bg-[#ebebeb]" : isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot ? "bg-[#d6d6d6]" : isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected ? "bg-[#0f6cbd]" : isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot ? "bg-[#f0f0f0]" : isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd ? "bg-[rgba(255,255,255,0)]" : isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd ? "bg-[#ebf3fc]" : "bg-[#f5f5f5]"}`} data-name="Primary action">
                  <div aria-hidden="true" className={`absolute border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px] ${isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected ? "border-r border-white" : isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd ? "border border-[#d1d1d1]" : isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd ? "border-[#b4d6fa] border-r" : "border-[#e0e0e0] border-r"}`} />
                  {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && avatar && <InteractionTagAvatarContainer avatar={avatar} />}
                  {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && (
                    <div className="content-stretch flex gap-[4px] h-full items-center max-h-[32px] px-[8px] relative shrink-0" data-name="Content">
                      {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && icon && (regular20Px || <InteractionTagPlaceholder />)}
                      {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && (
                        <div className={`content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0 ${isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot ? "" : "font-['Segoe_UI:Regular',sans-serif] leading-[0] not-italic text-[#424242] whitespace-nowrap"}`} data-name="Text slot">
                          {(isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && (
                            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                              <p className="leading-[20px]">{primaryString}</p>
                            </div>
                          )}
                          {isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot && (
                            <>
                              <div className="flex flex-col justify-center relative shrink-0 text-[12px]">
                                <p className="leading-[16px]">{primaryString}</p>
                              </div>
                              <div className="flex flex-col justify-center relative shrink-0 text-[10px]">
                                <p className="leading-[14px]">{secondaryString}</p>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {(isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot) &&
                        icon &&
                        (regular20Px || (
                          <Wrapper2>
                            <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                          </Wrapper2>
                        ))}
                      {(isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot) && (
                        <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0" data-name="Text slot">
                          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                            <p className="leading-[20px]">{primaryString}</p>
                          </div>
                        </div>
                      )}
                      {isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd &&
                        icon &&
                        (regular20Px || (
                          <Wrapper2>
                            <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #115EA3)" fillRule="evenodd" id="Shape" />
                          </Wrapper2>
                        ))}
                      {isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd && (
                        <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0" data-name="Text slot">
                          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#115ea3] text-[14px] whitespace-nowrap">
                            <p className="leading-[20px]">{primaryString}</p>
                          </div>
                        </div>
                      )}
                      {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot &&
                        icon &&
                        (regular20Px || (
                          <Wrapper2>
                            <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #BDBDBD)" fillRule="evenodd" id="Shape" />
                          </Wrapper2>
                        ))}
                      {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot && (
                        <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0" data-name="Text slot">
                          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bdbdbd] text-[14px] whitespace-nowrap">
                            <p className="leading-[20px]">{primaryString}</p>
                          </div>
                        </div>
                      )}
                      {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected &&
                        icon &&
                        (filled20Px || (
                          <Wrapper2>
                            <path clipRule="evenodd" d={svgPaths.p30769300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
                          </Wrapper2>
                        ))}
                      {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected && (
                        <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0" data-name="Text slot">
                          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                            <p className="leading-[20px]">{primaryString}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && effectiveFocus && <InteractionTagFocusRing />}
                  {isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected && avatar && (
                    <div className="content-stretch flex h-full items-center pl-[2px] relative shrink-0" data-name="Avatar container">
                      {avatar && (
                        <AvatarAvatar additionalClassNames="size-[16px]">
                          <InteractionTagFill additionalClassNames="size-[16px]" />
                          <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] leading-[14px] left-1/2 not-italic overflow-hidden text-[#616161] text-[10px] text-center text-ellipsis top-[calc(50%-7px)] w-[16px] whitespace-nowrap">M</p>
                        </AvatarAvatar>
                      )}
                    </div>
                  )}
                  {isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected && (
                    <div className="content-stretch flex gap-[2px] h-full items-center max-h-[32px] px-[6px] relative shrink-0" data-name="Content">
                      {icon &&
                        (regular12Px || (
                          <Wrapper3>
                            <div className="relative shrink-0 size-[8px]" data-name="Shape">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                                <path clipRule="evenodd" d={svgPaths.p18da8d00} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                              </svg>
                            </div>
                          </Wrapper3>
                        ))}
                      <InteractionTagTextSlot primaryString={primaryString} />
                    </div>
                  )}
                  {isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected && effectiveFocus && <InteractionTagFocusRing />}
                </div>
              )}
              {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot1 && avatar && <InteractionTagAvatarContainer additionalClassNames="rounded-[4px]" avatar={avatar} />}
            </div>
          )}
          {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && dismiss && (
            <div 
              className={`h-[32px] max-w-[32px] relative rounded-br-[4px] rounded-tr-[4px] shrink-0 ${isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected ? "bg-[#0f6cbd]" : isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot ? "bg-[#f0f0f0]" : "bg-[#f5f5f5]"} ${!isDisabled ? "cursor-pointer" : ""}`} 
              data-name=".Secondary action (Interaction tag - Filled)"
              role="button"
              tabIndex={isDisabled ? -1 : 0}
              aria-label="Dismiss"
              onClick={handleDismissClick}
              onKeyDown={handleDismissKeyDown}
            >
              <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
              <Wrapper1>
                <path d={svgPaths.p301c8b00} fill={isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected ? "var(--fill-0, white)" : isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot ? "var(--fill-0, #BDBDBD)" : "var(--fill-0, #424242)"} id="Shape" />
              </Wrapper1>
            </div>
          )}
          {(isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot1) && (
            <div className="flex flex-row items-center self-stretch">
              {isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected && dismiss && (
                <div
                  onClick={handleDismissClick}
                  onKeyDown={handleDismissKeyDown}
                  role="button"
                  tabIndex={isDisabled ? -1 : 0}
                  aria-label="Dismiss"
                  className={!isDisabled ? "cursor-pointer" : ""}
                >
                  <InteractionTagSecondaryActionInteractionTagFilled />
                </div>
              )}
              {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot1 && (
                <div className="content-stretch flex gap-[4px] h-full items-center max-h-[32px] px-[8px] relative shrink-0" data-name="Content">
                  {icon && (regular20Px || <InteractionTagPlaceholder />)}
                  <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0" data-name="Text slot">
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                      <p className="leading-[20px]">{primaryString}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelectedAnd && (
            <>
              <div className="bg-[#f5f5f5] content-stretch flex h-full items-start relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" data-name="Primary action">
                <div aria-hidden="true" className="absolute border-[#e0e0e0] border-r border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
                {avatar && (
                  <div className="content-stretch flex h-full items-center pl-[2px] relative shrink-0" data-name="Avatar container">
                    {avatar && (
                      <AvatarAvatar additionalClassNames="size-[20px]">
                        <InteractionTagFill additionalClassNames="size-[20px]" />
                        <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] h-[14px] leading-[14px] left-1/2 not-italic overflow-hidden text-[#616161] text-[10px] text-center text-ellipsis top-[calc(50%-7px)] w-[20px] whitespace-nowrap">MB</p>
                      </AvatarAvatar>
                    )}
                  </div>
                )}
                <div className="content-stretch flex gap-[2px] h-full items-center max-h-[32px] px-[6px] relative shrink-0" data-name="Content">
                  {icon &&
                    (regular16Px || (
                      <Wrapper3>
                        <div className="relative shrink-0 size-[12px]" data-name="Shape">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                            <path clipRule="evenodd" d={svgPaths.p31a9aa00} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                          </svg>
                        </div>
                      </Wrapper3>
                    ))}
                  <InteractionTagTextSlot primaryString={primaryString} />
                </div>
                {effectiveFocus && <InteractionTagFocusRing />}
              </div>
              {dismiss && (
                <div
                  onClick={handleDismissClick}
                  onKeyDown={handleDismissKeyDown}
                  role="button"
                  tabIndex={isDisabled ? -1 : 0}
                  aria-label="Dismiss"
                  className={!isDisabled ? "cursor-pointer" : ""}
                >
                  <InteractionTagSecondaryActionInteractionTagFilled />
                </div>
              )}
            </>
          )}
          {isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd && dismiss && (
            <div
              onClick={handleDismissClick}
              onKeyDown={handleDismissKeyDown}
              role="button"
              tabIndex={isDisabled ? -1 : 0}
              aria-label="Dismiss"
              className={!isDisabled ? "cursor-pointer" : ""}
            >
              <Wrapper additionalClassNames="bg-[#ebf3fc] h-[32px]">
                <path d={svgPaths.p301c8b00} fill="var(--fill-0, #115EA3)" id="Shape" />
              </Wrapper>
            </div>
          )}
          {isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelectedAnd && dismiss && (
            <div 
              className={`bg-[rgba(255,255,255,0)] h-[32px] max-w-[32px] relative rounded-br-[4px] rounded-tr-[4px] shrink-0 ${!isDisabled ? "cursor-pointer" : ""}`}
              data-name=".Secondary action (Interaction tag - Outline)"
              role="button"
              tabIndex={isDisabled ? -1 : 0}
              aria-label="Dismiss"
              onClick={handleDismissClick}
              onKeyDown={handleDismissKeyDown}
            >
              <div aria-hidden="true" className="absolute border-[#d1d1d1] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
              <Wrapper5>
                <div className="content-stretch flex items-center justify-center pr-px relative shrink-0 w-[20px]" data-name="Container for offset">
                  <Dismiss>
                    <path d={svgPaths.p301c8b00} fill="var(--fill-0, #424242)" id="Shape" />
                  </Dismiss>
                </div>
              </Wrapper5>
            </div>
          )}
          {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot1 && effectiveFocus && (
            <div className="absolute inset-0 rounded-[4px]" data-name="Focus ring">
              <div className="overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute border border-solid border-white inset-0 rounded-[4px]" data-name="Inner stroke" />
              </div>
              <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Wrapper5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center max-w-[inherit] size-full">
      <div className="content-stretch flex h-full items-center max-w-[inherit] px-[6px] relative">{children}</div>
    </div>
  );
}

function Wrapper4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
    </div>
  );
}

type AvatarAvatarProps = {
  additionalClassNames?: string;
};

function AvatarAvatar({ children, additionalClassNames = "" }: React.PropsWithChildren<AvatarAvatarProps>) {
  return (
    <div className={clsx("relative rounded-[9999px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Dismiss({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          {children}
        </svg>
      </div>
    </div>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <Wrapper4>{children}</Wrapper4>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper3>
      <div className="relative shrink-0 size-[16px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          {children}
        </svg>
      </div>
    </Wrapper3>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper5>
      <Dismiss>{children}</Dismiss>
    </Wrapper5>
  );
}

type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("max-w-[32px] relative rounded-br-[4px] rounded-tr-[4px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
      <Wrapper1>{children}</Wrapper1>
    </div>
  );
}

function InteractionTagSecondaryActionInteractionTagFilled() {
  return (
    <Wrapper additionalClassNames="bg-[#f5f5f5] h-full">
      <path d={svgPaths.p5290700} fill="var(--fill-0, #242424)" id="Shape" />
    </Wrapper>
  );
}

type InteractionTagTextSlotProps = {
  primaryString: string;
};

function InteractionTagTextSlot({ primaryString }: InteractionTagTextSlotProps) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">{primaryString}</p>
      </div>
    </div>
  );
}

function InteractionTagFocusRing() {
  return (
    <div className="absolute inset-[0_2px_0_0] rounded-bl-[4px] rounded-tl-[4px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute border border-solid border-white inset-0 rounded-bl-[4px] rounded-tl-[4px]" data-name="Inner stroke" />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-bl-[6px] rounded-tl-[6px]" />
    </div>
  );
}

function InteractionTagPlaceholder() {
  return (
    <Wrapper2>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
    </Wrapper2>
  );
}

type InteractionTagFillProps = {
  additionalClassNames?: string;
};

function InteractionTagFill({ additionalClassNames = "" }: InteractionTagFillProps) {
  return (
    <div className={clsx("bg-[#e6e6e6] relative rounded-[9999px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

type InteractionTagAvatarContainerProps = {
  avatar: boolean;
  additionalClassNames?: string;
};

function InteractionTagAvatarContainer({ avatar, additionalClassNames = "" }: InteractionTagAvatarContainerProps) {
  return (
    <div className={clsx("content-stretch flex h-full items-center pl-[2px] relative shrink-0", additionalClassNames)}>
      {avatar && (
        <AvatarAvatar additionalClassNames="size-[28px]">
          <InteractionTagFill additionalClassNames="size-[28px]" />
          <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] leading-[16px] left-1/2 not-italic overflow-hidden text-[#616161] text-[12px] text-center text-ellipsis top-[calc(50%-8px)] w-[28px] whitespace-nowrap">MB</p>
        </AvatarAvatar>
      )}
    </div>
  );
}

type PlaceholderProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Placeholder({ className, size = "12", theme = "Regular" }: PlaceholderProps) {
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
        <Wrapper4>
          <div className={`relative shrink-0 ${is12AndRegular || is12AndFilled ? "size-[8px]" : is16AndRegular ? "size-[12px]" : is20AndRegular ? "size-[16px]" : "size-[20px]"}`} data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is12AndRegular || is12AndFilled ? "0 0 8 8" : is16AndRegular ? "0 0 12 12" : is20AndRegular ? "0 0 16 16" : "0 0 20 20"}>
              <path clipRule="evenodd" d={is12AndRegular || is12AndFilled ? svgPaths.p18da8d00 : is16AndRegular ? svgPaths.p31a9aa00 : is20AndRegular ? svgPaths.pa51a700 : svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </Wrapper4>
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

interface InteractionTagProps_Display {
  avatar?: boolean;
  dismiss?: boolean;
  filled20Px?: React.ReactNode | null;
  icon?: boolean;
  layout?: "1 line (Default)" | "2 line (Medium only)";
  primaryString?: string;
  regular12Px?: React.ReactNode | null;
  regular16Px?: React.ReactNode | null;
  regular20Px?: React.ReactNode | null;
  secondaryString?: string;
  size?: "Extra small" | "Small" | "Medium (Default)";
  state?: "Rest" | "Hover" | "Pressed" | "Disabled";
  style?: "Filled (Default)" | "Outline" | "Brand";
}

function InteractionTag_Display({
  avatar,
  dismiss,
  filled20Px,
  icon,
  layout,
  primaryString,
  regular12Px,
  regular16Px,
  regular20Px,
  secondaryString,
  size,
  state,
  style,
}: InteractionTagProps_Display) {
  const [selected, setSelected] = React.useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  const handleDismiss = () => {
    // In display mode, we just toggle selected state instead of removing
    setSelected(false);
  };

  return (
    <InteractionTag
      avatar={avatar}
      dismiss={dismiss}
      filled20Px={filled20Px}
      icon={icon}
      layout={layout}
      primaryString={primaryString}
      regular12Px={regular12Px}
      regular16Px={regular16Px}
      regular20Px={regular20Px}
      secondaryString={secondaryString}
      selected={selected}
      size={size}
      state={state}
      style={style}
      onClick={handleClick}
      onDismiss={handleDismiss}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample FilledMediumWithDismiss
export function FilledDesignTag() {
  return (
    <InteractionTag_Display
      style="Filled (Default)"
      size="Medium (Default)"
      primaryString="Design"
      dismiss={true}
    />
  );
}

// @figmaExample OutlineWithCustomIcon
export function OutlineDevelopmentTagWithIcon() {
  return (
    <InteractionTag_Display
      style="Outline"
      size="Medium (Default)"
      primaryString="Development"
      icon={true}
      regular20Px={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 9.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
        </svg>
      }
    />
  );
}

// @figmaExample BrandActiveFilter
export function BrandActiveFilterTag() {
  return (
    <InteractionTag_Display
      style="Brand"
      size="Medium (Default)"
      primaryString="Active Filter"
      dismiss={true}
    />
  );
}

// @figmaExample SmallAvatarTag
export function SmallAvatarTagNoDismiss() {
  return (
    <InteractionTag_Display
      style="Filled (Default)"
      size="Small"
      avatar={true}
      primaryString="MB"
      dismiss={false}
    />
  );
}

// @figmaExample TwoLineProjectTag
export function TwoLineProjectTagWithIcon() {
  return (
    <InteractionTag_Display
      style="Filled (Default)"
      size="Medium (Default)"
      layout="2 line (Medium only)"
      primaryString="Project Name"
      secondaryString="Active"
      icon={true}
      regular20Px={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
        </svg>
      }
    />
  );
}

// @figmaExample ExtraSmallOutlineTag
export function ExtraSmallOutlineTag() {
  return (
    <InteractionTag_Display
      style="Outline"
      size="Extra small"
      primaryString="Tag"
      dismiss={true}
    />
  );
}

// @figmaExample BrandSmallAvatarWithDismiss
export function BrandSmallAvatarTag() {
  return (
    <InteractionTag_Display
      style="Brand"
      size="Small"
      avatar={true}
      primaryString="JD"
      dismiss={true}
    />
  );
}

// @figmaExample DisabledFilledTag
export function DisabledFilledTag() {
  return (
    <InteractionTag_Display
      style="Filled (Default)"
      size="Medium (Default)"
      primaryString="Disabled Tag"
      state="Disabled"
      dismiss={true}
    />
  );
}
