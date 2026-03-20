import * as React from 'react';
import { useState, useCallback, KeyboardEvent, MouseEvent } from "react";
import clsx from "clsx";
import svgPaths from "./svg-ou0n3ff1ei";
import imgStateRestSizeMediumDefaultStyleImage from "figma:asset/5179c625c37061a3d1907d3c7a49fe0323dc590a.png";

/**
 * An interactive color/image/icon selector component commonly used in color pickers, theme selectors, or design tools.
 * Appears as a square button element with dimensions that vary by size (20px to 32px). The component renders with a colored background (default: magenta #e3008c), border decorations for selected/focused states, and optional icon or image content.
 * 
 * The component manages its own hover, pressed, and focus states internally unless you provide a controlled state prop. When selected, it displays a blue ring around the swatch. When focused (via keyboard navigation), it shows a black and white focus ring. The component is fully keyboard accessible, responding to Enter and Space keys.
 * 
 * IMPORTANT: The state prop, if provided, overrides internal state management. Use this when you need full control over the visual state.
 */
export interface SwatchProps {
  className?: string; // Optional custom className to override default sizing and positioning
  selected?: boolean; // Whether the swatch is currently selected. When true, displays a blue selection ring around the swatch. (default: false)
  size?: "ExtraSmall" | "Small" | "Medium (Default)" | "Large"; // Size of the swatch: ExtraSmall (20×20px), Small (24×24px), Medium (28×28px), Large (32×32px) (default: "Medium (Default)")
  state?: "Rest" | "Hover" | "Pressed" | "Disabled" | "Empty" | "Transparent"; // Controlled state prop. When provided, overrides internal hover/pressed state management.
  style?: "Color" | "Icon" | "Image"; // Visual style: Color (solid color fill), Icon (color fill with chevron icon overlay), Image (displays an image instead of solid color) (default: "Color")
  onClick?: () => void; // Called when swatch is clicked (mouse) or activated (keyboard Enter/Space)
  onFocus?: () => void; // Called when swatch receives focus
  onBlur?: () => void; // Called when swatch loses focus
  disabled?: boolean; // Disables all interactions, sets cursor to not-allowed, and prevents onClick from firing (default: false)
  tabIndex?: number; // Tab index for keyboard navigation. Set to -1 automatically when disabled. (default: 0)
}

// ---------------------- Main Component ----------------------

export function Swatch({ 
  className, 
  selected = false, 
  size = "Medium (Default)", 
  state: controlledState, 
  style = "Color",
  onClick,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  disabled = false,
  tabIndex = 0
}: SwatchProps) {
  const [internalFocus, setInternalFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Determine the actual state to use
  const state = controlledState || 
    (disabled ? "Disabled" : 
     isPressed ? "Pressed" : 
     isHovered ? "Hover" : 
     "Rest");
  
  const focus = internalFocus;
  
  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (disabled || state === "Disabled") return;
    e.preventDefault();
    onClick?.();
  }, [disabled, state, onClick]);
  
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || state === "Disabled") return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  }, [disabled, state, onClick]);
  
  const handleFocus = useCallback(() => {
    if (disabled || state === "Disabled") return;
    setInternalFocus(true);
    onFocusProp?.();
  }, [disabled, state, onFocusProp]);
  
  const handleBlur = useCallback(() => {
    setInternalFocus(false);
    onBlurProp?.();
  }, [onBlurProp]);
  
  const handleMouseEnter = useCallback(() => {
    if (disabled || state === "Disabled" || controlledState) return;
    setIsHovered(true);
  }, [disabled, state, controlledState]);
  
  const handleMouseLeave = useCallback(() => {
    if (controlledState) return;
    setIsHovered(false);
    setIsPressed(false);
  }, [controlledState]);
  
  const handleMouseDown = useCallback(() => {
    if (disabled || state === "Disabled" || controlledState) return;
    setIsPressed(true);
  }, [disabled, state, controlledState]);
  
  const handleMouseUp = useCallback(() => {
    if (controlledState) return;
    setIsPressed(false);
  }, [controlledState]);
  
  const isDisabledAndMediumDefaultAndColor = state === "Disabled" && size === "Medium (Default)" && style === "Color";
  const isEmptyAndMediumDefaultAndColor = state === "Empty" && size === "Medium (Default)" && style === "Color";
  const isHoverAndMediumDefaultAndColor = state === "Hover" && size === "Medium (Default)" && style === "Color";
  const isPressedAndMediumDefaultAndColor = state === "Pressed" && size === "Medium (Default)" && style === "Color";
  const isRestAndExtraSmallAndColor = state === "Rest" && size === "ExtraSmall" && style === "Color";
  const isRestAndLargeAndColor = state === "Rest" && size === "Large" && style === "Color";
  const isRestAndMediumDefaultAndColor = state === "Rest" && size === "Medium (Default)" && style === "Color";
  const isRestAndMediumDefaultAndIcon = state === "Rest" && size === "Medium (Default)" && style === "Icon";
  const isRestAndMediumDefaultAndImage = state === "Rest" && size === "Medium (Default)" && style === "Image";
  const isRestAndSmallAndColor = state === "Rest" && size === "Small" && style === "Color";
  const isTransparentAndMediumDefaultAndColor = state === "Transparent" && size === "Medium (Default)" && style === "Color";
  
  const isDisabled = disabled || state === "Disabled";
  
  return (
    <div 
      className={className || `relative ${isRestAndLargeAndColor ? "size-[32px]" : isRestAndSmallAndColor ? "size-[24px]" : isRestAndExtraSmallAndColor ? "size-[20px]" : "size-[28px]"}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      role="button"
      aria-pressed={selected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : tabIndex}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
    >
      {(isPressedAndMediumDefaultAndColor || isHoverAndMediumDefaultAndColor || isRestAndExtraSmallAndColor || isRestAndSmallAndColor || isRestAndMediumDefaultAndColor || isRestAndLargeAndColor) && (
        <div className={`absolute bg-[#e3008c] inset-0 ${isRestAndExtraSmallAndColor || isRestAndSmallAndColor || isRestAndMediumDefaultAndColor || isRestAndLargeAndColor ? "" : isHoverAndMediumDefaultAndColor ? "border-2 border-[#0f6cbd] border-solid" : "border-3 border-[#0f548c] border-solid"}`} data-name="ColorSwatch">
          {(isPressedAndMediumDefaultAndColor || isHoverAndMediumDefaultAndColor) && <div className={`absolute inset-0 pointer-events-none rounded-[inherit] ${isHoverAndMediumDefaultAndColor ? "shadow-[inset_0px_0px_0px_3px_white]" : "shadow-[inset_0px_0px_0px_4px_white]"}`} />}
        </div>
      )}
      {isDisabledAndMediumDefaultAndColor && (
        <>
          <div className="absolute bg-[#e3008c] inset-0" data-name="DisabledSwatch" />
          <div className="absolute left-[4px] overflow-clip size-[20px] top-[4px]" data-name="Prohibited">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Shape">
              <div className="absolute inset-[0_-6.25%_-12.5%_-6.25%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <g filter="url(#filter0_d_0_54)" id="Shape">
                    <path d={svgPaths.p37f2e180} fill="var(--fill-0, white)" />
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="18" id="filter0_d_0_54" width="18" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="0.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_0_54" />
                      <feBlend in="SourceGraphic" in2="effect1_dropShadow_0_54" mode="normal" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
      {isEmptyAndMediumDefaultAndColor && <div className="absolute border border-[#707070] border-dashed inset-0" data-name="EmptySwatch" />}
      {isPressedAndMediumDefaultAndColor && selected && (
        <div className="absolute border-4 border-[#0f548c] border-solid inset-[0.2%_0_-0.2%_0] overflow-clip" data-name="Selected ring">
          <div className="absolute border-7 border-solid border-white inset-[-4px]" data-name="Inner stroke" />
        </div>
      )}
      {isHoverAndMediumDefaultAndColor && selected && (
        <div className="absolute border-4 border-[#115ea3] border-solid inset-[0.2%_0_-0.2%_0] overflow-clip" data-name="Selected ring">
          <div className="absolute border-6 border-solid border-white inset-[-4px]" data-name="Inner stroke" />
        </div>
      )}
      {isRestAndExtraSmallAndColor && focus && <SwatchFocusRing additionalClassNames="inset-[0.28%_0_-0.28%_0]" />}
      {isRestAndExtraSmallAndColor && selected && <SwatchSelectedRing additionalClassNames="inset-[0.28%_0_-0.28%_0]" />}
      {isRestAndSmallAndColor && focus && <SwatchFocusRing additionalClassNames="inset-[0.23%_0_-0.23%_0]" />}
      {isRestAndSmallAndColor && selected && <SwatchSelectedRing additionalClassNames="inset-[0.23%_0_-0.23%_0]" />}
      {isRestAndMediumDefaultAndColor && focus && <SwatchFocusRing additionalClassNames="inset-[0.2%_0_-0.2%_0]" />}
      {isRestAndMediumDefaultAndColor && selected && <SwatchSelectedRing additionalClassNames="inset-[0.2%_0_-0.2%_0]" />}
      {isRestAndMediumDefaultAndImage && <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgStateRestSizeMediumDefaultStyleImage} />}
      {isRestAndMediumDefaultAndImage && focus && <SwatchFocusRing additionalClassNames="inset-[0.2%_0_-0.2%_0]" />}
      {isRestAndMediumDefaultAndImage && selected && <SwatchSelectedRing additionalClassNames="inset-[0.2%_0_-0.2%_0]" />}
      {isRestAndMediumDefaultAndIcon && (
        <div className="absolute bg-[#e3008c] content-stretch flex items-center justify-center left-0 overflow-clip p-[4px] top-0" data-name="ColorSwatchIcon">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Chevron">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[6.501px] left-1/2 top-[calc(50%+0.75px)] w-[12.001px]" data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0009 6.50134">
                <path d={svgPaths.p149dd000} fill="var(--fill-0, white)" id="Shape" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {isRestAndMediumDefaultAndIcon && focus && <SwatchFocusRing additionalClassNames="inset-[0.2%_0_-0.2%_0]" />}
      {isRestAndMediumDefaultAndIcon && selected && <SwatchSelectedRing additionalClassNames="inset-[0.2%_0_-0.2%_0]" />}
      {isRestAndLargeAndColor && focus && <SwatchFocusRing additionalClassNames="inset-[0.18%_0_-0.18%_0]" />}
      {isRestAndLargeAndColor && selected && <SwatchSelectedRing additionalClassNames="inset-[0.18%_0_-0.18%_0]" />}
      {isTransparentAndMediumDefaultAndColor && (
        <>
          <div className="absolute flex inset-[0_3.42%_4.3%_0] items-center justify-center">
            <div className="flex-none h-px rotate-[135.26deg] w-[38.07px]">
              <div className="relative size-full" data-name="TransparentSwatch-line">
                <div className="absolute inset-[-2px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.07 2">
                    <line id="TransparentSwatch-line" stroke="var(--stroke-0, #DB0000)" strokeWidth="2" x2="38.07" y1="1" y2="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute border border-[#808080] border-solid inset-0" data-name="TransparentSwatch" />
        </>
      )}
    </div>
  );
}

// ---------------------- Helper Components ----------------------

type SwatchSelectedRingProps = {
  additionalClassNames?: string;
};

function SwatchSelectedRing({ additionalClassNames = "" }: SwatchSelectedRingProps) {
  return (
    <div className={clsx("absolute border-3 border-[#0f6cbd] border-solid overflow-clip", additionalClassNames)}>
      <div className="absolute border-5 border-solid border-white inset-[-3px]" data-name="Inner stroke" />
    </div>
  );
}

type SwatchFocusRingProps = {
  additionalClassNames?: string;
};

function SwatchFocusRing({ additionalClassNames = "" }: SwatchFocusRingProps) {
  return (
    <div className={clsx("absolute border-2 border-black border-solid overflow-clip", additionalClassNames)}>
      <div className="absolute border-3 border-solid border-white inset-[-2px]" data-name="Inner stroke" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface SwatchProps_Display {
  selected?: boolean;
  size?: "ExtraSmall" | "Small" | "Medium (Default)" | "Large";
  state?: "Rest" | "Hover" | "Pressed" | "Disabled" | "Empty" | "Transparent";
  style?: "Color" | "Icon" | "Image";
  disabled?: boolean;
}

function Swatch_Display({
  selected,
  size,
  state,
  style,
  disabled,
}: SwatchProps_Display) {
  return (
    <Swatch
      selected={selected}
      size={size}
      state={state}
      style={style}
      disabled={disabled}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultMediumColorSwatch
export function SwatchDisplay1() {
  return <Swatch_Display />;
}

// @figmaExample LargeSelectedColorSwatch
export function SwatchDisplay2() {
  return <Swatch_Display size="Large" selected={true} />;
}

// @figmaExample SmallIconSwatch
export function SwatchDisplay3() {
  return <Swatch_Display size="Small" style="Icon" />;
}

// @figmaExample ExtraSmallColorSwatch
export function SwatchDisplay4() {
  return <Swatch_Display size="ExtraSmall" />;
}

// @figmaExample EmptyStateSwatch
export function SwatchDisplay5() {
  return <Swatch_Display state="Empty" />;
}

// @figmaExample TransparentStateSwatch
export function SwatchDisplay6() {
  return <Swatch_Display state="Transparent" />;
}

// @figmaExample LargeSelectedIconSwatch
export function SwatchDisplay7() {
  return <Swatch_Display style="Icon" selected={true} size="Large" />;
}

// @figmaExample DisabledColorSwatch
export function SwatchDisplay8() {
  return <Swatch_Display disabled={true} />;
}