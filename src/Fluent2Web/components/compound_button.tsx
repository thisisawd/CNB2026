import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';

/**
 * A button component that displays both primary and secondary text strings, optionally with an accompanying image or icon.
 * Appears as a rectangular button within its container with rounded corners (4px radius). The button displays a semibold primary text (14px) with an optional secondary text below it (12px, regular weight). An optional 40x40px image area appears on the left side of the text content. The button responds to user interactions with visual state changes including hover, pressed, selected, and disabled states, and shows a focus ring when focused via keyboard.
 *
 * WHEN TO USE:
 * - Use when you need a button that displays both a primary action label and additional descriptive or contextual information
 * - Use when an action requires more explanation than a simple button label can provide
 * - Ideal for settings panels, configuration options, or complex actions that benefit from supplementary text
 * - Use with an image when you want to provide visual context alongside the text labels
 */
export interface CompoundButtonProps {
  className?: string; // Custom CSS class to override default styling
  image?: boolean; // Controls whether the 40x40px image area is displayed on the left side of the button (default: true)
  primaryString?: string; // The main text label displayed in semibold font at 14px (default: "Primary string")
  secondaryString?: string; // The descriptive text displayed below the primary string at 12px (only shown if secondaryText is true) (default: "Secondary string")
  secondaryText?: boolean; // Controls whether the secondary text string is displayed below the primary text (default: true)
  size?: "Medium (Default)" | "Small" | "Large"; // Controls the overall size of the button, affecting padding and spacing (default: "Medium (Default)")
  style?: "Primary" | "Secondary (Default)" | "Outline" | "Subtle" | "Transparent"; // Determines the visual appearance of the button (default: "Secondary (Default)")
  swap40X40Img?: React.ReactNode | null; // Custom React element to display in the 40x40px image area. If null and image is true, a placeholder will be shown (default: null)
  onClick?: () => void; // Callback function triggered when the button is clicked (via mouse or keyboard Enter/Space)
  disabled?: boolean; // When true, the button appears in a disabled state with reduced opacity, cannot be interacted with, and shows a not-allowed cursor (default: false)
  selected?: boolean; // When true, the button appears in a selected/active state with distinct background styling (default: false)
}

// ---------------------- Main Component ----------------------

export function CompoundButton({ 
  className, 
  image = true, 
  primaryString = "Primary string", 
  secondaryString = "Secondary string", 
  secondaryText = true, 
  size = "Medium (Default)", 
  style = "Secondary (Default)", 
  swap40X40Img = null,
  onClick,
  disabled = false,
  selected = false
}: CompoundButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Determine current state based on interactions
  const state = disabled ? "Disabled" : selected ? "Selected" : isPressed ? "Pressed" : isHovered ? "Hover" : "Rest";
  const focus = isFocused && !disabled;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsPressed(true);
      onClick?.();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(false);
    }
  };

  const isOutlineAndRestAndMediumDefault = style === "Outline" && state === "Rest" && size === "Medium (Default)";
  const isPrimaryAndRestAndMediumDefault = style === "Primary" && state === "Rest" && size === "Medium (Default)";
  const isSecondaryDefaultAndDisabledAndMediumDefault = style === "Secondary (Default)" && state === "Disabled" && size === "Medium (Default)";
  const isSecondaryDefaultAndHoverAndMediumDefault = style === "Secondary (Default)" && state === "Hover" && size === "Medium (Default)";
  const isSecondaryDefaultAndPressedAndMediumDefault = style === "Secondary (Default)" && state === "Pressed" && size === "Medium (Default)";
  const isSecondaryDefaultAndRestAndLarge = style === "Secondary (Default)" && state === "Rest" && size === "Large";
  const isSecondaryDefaultAndRestAndMediumDefault = style === "Secondary (Default)" && state === "Rest" && size === "Medium (Default)";
  const isSecondaryDefaultAndRestAndSmall = style === "Secondary (Default)" && state === "Rest" && size === "Small";
  const isSecondaryDefaultAndSelectedAndMediumDefault = style === "Secondary (Default)" && state === "Selected" && size === "Medium (Default)";
  const isSubtleAndRestAndMediumDefault = style === "Subtle" && state === "Rest" && size === "Medium (Default)";
  const isTransparentAndRestAndMediumDefault = style === "Transparent" && state === "Rest" && size === "Medium (Default)";
  
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className={className || `relative rounded-[4px] border-0 p-0 text-left ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${isSecondaryDefaultAndHoverAndMediumDefault ? "bg-[#f5f5f5]" : isSecondaryDefaultAndPressedAndMediumDefault ? "bg-[#e0e0e0]" : isSecondaryDefaultAndSelectedAndMediumDefault ? "bg-[#ebebeb]" : isSecondaryDefaultAndDisabledAndMediumDefault ? "bg-[#f0f0f0]" : isPrimaryAndRestAndMediumDefault ? "bg-[#0f6cbd]" : isOutlineAndRestAndMediumDefault ? "" : isTransparentAndRestAndMediumDefault || isSubtleAndRestAndMediumDefault ? "bg-[rgba(255,255,255,0)]" : "bg-white"}`}
    >
      <div aria-hidden={isSecondaryDefaultAndRestAndLarge || isSecondaryDefaultAndRestAndSmall || isOutlineAndRestAndMediumDefault || isSecondaryDefaultAndDisabledAndMediumDefault || isSecondaryDefaultAndSelectedAndMediumDefault || isSecondaryDefaultAndPressedAndMediumDefault || isSecondaryDefaultAndHoverAndMediumDefault || isSecondaryDefaultAndRestAndMediumDefault ? "true" : undefined} className={isSecondaryDefaultAndHoverAndMediumDefault ? "absolute border border-[#c7c7c7] border-solid inset-0 pointer-events-none rounded-[4px]" : isSecondaryDefaultAndPressedAndMediumDefault ? "absolute border border-[#b3b3b3] border-solid inset-0 pointer-events-none rounded-[4px]" : isSecondaryDefaultAndSelectedAndMediumDefault ? "absolute border border-[#bdbdbd] border-solid inset-0 pointer-events-none rounded-[4px]" : isSecondaryDefaultAndDisabledAndMediumDefault ? "absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[4px]" : isTransparentAndRestAndMediumDefault || isSubtleAndRestAndMediumDefault || isPrimaryAndRestAndMediumDefault ? "flex flex-row items-center size-full" : "absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]"}>
        {(isTransparentAndRestAndMediumDefault || isSubtleAndRestAndMediumDefault || isPrimaryAndRestAndMediumDefault) && (
          <div className="content-stretch flex gap-[12px] items-center p-[12px] relative">
            {focus && <CompoundButtonFocusRing />}
            {image && (swap40X40Img || <ImageSwapPlaceholder1 />)}
            <div className={`content-stretch flex flex-col items-start justify-center leading-[0] not-italic relative shrink-0 ${isPrimaryAndRestAndMediumDefault ? "text-white" : ""}`} data-name="Content">
              {(isTransparentAndRestAndMediumDefault || isSubtleAndRestAndMediumDefault) && (
                <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center relative shrink-0 text-[#242424] text-[14px] w-full">
                  <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                </div>
              )}
              {(isTransparentAndRestAndMediumDefault || isSubtleAndRestAndMediumDefault) && secondaryText && (
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center relative shrink-0 text-[#424242] text-[12px] w-full">
                  <p className="leading-[16px] whitespace-pre-wrap">{secondaryString}</p>
                </div>
              )}
              {isPrimaryAndRestAndMediumDefault && (
                <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center relative shrink-0 text-[14px] w-full">
                  <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                </div>
              )}
              {isPrimaryAndRestAndMediumDefault && secondaryText && (
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center relative shrink-0 text-[12px] w-full">
                  <p className="leading-[16px] whitespace-pre-wrap">{secondaryString}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {(isSecondaryDefaultAndRestAndLarge || isSecondaryDefaultAndRestAndSmall || isOutlineAndRestAndMediumDefault || isSecondaryDefaultAndDisabledAndMediumDefault || isSecondaryDefaultAndSelectedAndMediumDefault || isSecondaryDefaultAndPressedAndMediumDefault || isSecondaryDefaultAndHoverAndMediumDefault || isSecondaryDefaultAndRestAndMediumDefault) && (
        <div className="flex flex-row items-center size-full">
          <div className={`content-stretch flex items-center relative ${isOutlineAndRestAndMediumDefault || isSecondaryDefaultAndDisabledAndMediumDefault || isSecondaryDefaultAndSelectedAndMediumDefault || isSecondaryDefaultAndPressedAndMediumDefault || isSecondaryDefaultAndHoverAndMediumDefault || isSecondaryDefaultAndRestAndMediumDefault ? "gap-[12px] p-[12px]" : isSecondaryDefaultAndRestAndSmall ? "gap-[8px] p-[8px]" : "gap-[16px] p-[16px]"}`}>
            {(isSecondaryDefaultAndDisabledAndMediumDefault || isSecondaryDefaultAndSelectedAndMediumDefault || isSecondaryDefaultAndPressedAndMediumDefault || isSecondaryDefaultAndHoverAndMediumDefault) && image && (swap40X40Img || <ImageSwapPlaceholder1 />)}
            {(isSecondaryDefaultAndDisabledAndMediumDefault || isSecondaryDefaultAndSelectedAndMediumDefault || isSecondaryDefaultAndPressedAndMediumDefault || isSecondaryDefaultAndHoverAndMediumDefault) && (
              <div className={`content-stretch flex flex-col items-start justify-center leading-[0] not-italic relative shrink-0 ${isSecondaryDefaultAndSelectedAndMediumDefault || isSecondaryDefaultAndPressedAndMediumDefault || isSecondaryDefaultAndHoverAndMediumDefault ? "text-[#242424]" : "text-[#bdbdbd]"}`} data-name="Content">
                <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center relative shrink-0 text-[14px] w-full">
                  <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                </div>
                {secondaryText && (
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center relative shrink-0 text-[12px] w-full">
                    <p className="leading-[16px] whitespace-pre-wrap">{secondaryString}</p>
                  </div>
                )}
              </div>
            )}
            {(isSecondaryDefaultAndRestAndLarge || isSecondaryDefaultAndRestAndSmall || isOutlineAndRestAndMediumDefault) && focus && <CompoundButtonFocusRing />}
            {(isSecondaryDefaultAndRestAndLarge || isSecondaryDefaultAndRestAndSmall || isOutlineAndRestAndMediumDefault) && image && (swap40X40Img || <ImageSwapPlaceholder1 />)}
            {(isSecondaryDefaultAndRestAndLarge || isSecondaryDefaultAndRestAndSmall || isOutlineAndRestAndMediumDefault) && <CompoundButtonContent primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />}
            {isSecondaryDefaultAndRestAndMediumDefault && focus && (
              <div className="absolute inset-0 rounded-[4px]" data-name="Focus ring">
                <div className="overflow-clip rounded-[inherit] size-full" />
                <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
              </div>
            )}
            {isSecondaryDefaultAndRestAndMediumDefault && image && (swap40X40Img || <ImageSwapPlaceholder1 />)}
            {isSecondaryDefaultAndRestAndMediumDefault && <CompoundButtonContent primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />}
          </div>
        </div>
      )}
    </button>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type CompoundButtonContentProps = {
  primaryString: string;
  secondaryText: boolean;
  secondaryString: string;
};

function CompoundButtonContent({ primaryString, secondaryText, secondaryString }: CompoundButtonContentProps) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] not-italic relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center relative shrink-0 text-[#242424] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
      </div>
      {secondaryText && (
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center relative shrink-0 text-[#424242] text-[12px] w-full">
          <p className="leading-[16px] whitespace-pre-wrap">{secondaryString}</p>
        </div>
      )}
    </div>
  );
}

type ImageSwapPlaceholder1Props = {
  additionalClassNames?: string;
};

function ImageSwapPlaceholder1({ additionalClassNames = "" }: ImageSwapPlaceholder1Props) {
  return (
    <div className="bg-[#ebf3fc] relative shrink-0 size-[40px]">
      <Helper text="40x40" text1="Use component swap to change" additionalClassNames="overflow-clip rounded-[inherit]" />
    </div>
  );
}

function CompoundButtonFocusRing() {
  return (
    <div className="absolute inset-0 rounded-[4px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute border border-solid border-white inset-0 rounded-[4px]" data-name="Inner stroke" />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
    </div>
  );
}

type HelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Helper({ text, text1, additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("flex flex-col items-center justify-center size-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-center justify-center relative size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic pt-[4px] relative shrink-0 text-[#115ea3] text-center" data-name="Text">
          <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] relative shrink-0 text-[10px] tracking-[0.3px] whitespace-nowrap">
            <p className="leading-[14px]">{text}</p>
          </div>
          <p className="font-['Segoe_UI:Regular',sans-serif] leading-none relative shrink-0 text-[4px] w-[32px] whitespace-pre-wrap">{text1}</p>
        </div>
      </div>
    </div>
  );
}

function ImageSwapPlaceholder({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#ebf3fc] relative size-[40px]"} data-name="Image swap placeholder">
      <Helper text="40x40" text1="Use component swap to change" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface CompoundButtonProps_Display {
  image?: boolean;
  primaryString?: string;
  secondaryString?: string;
  secondaryText?: boolean;
  size?: "Medium (Default)" | "Small" | "Large";
  style?: "Primary" | "Secondary (Default)" | "Outline" | "Subtle" | "Transparent";
  swap40X40Img?: React.ReactNode | null;
  disabled?: boolean;
}

function CompoundButton_Display({
  image,
  primaryString,
  secondaryString,
  secondaryText,
  size,
  style,
  swap40X40Img,
  disabled,
}: CompoundButtonProps_Display) {
  return (
    <CompoundButton
      image={image}
      primaryString={primaryString}
      secondaryString={secondaryString}
      secondaryText={secondaryText}
      size={size}
      style={style}
      swap40X40Img={swap40X40Img}
      disabled={disabled}
      onClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample EnableNotificationsButton
export function EnableNotificationsButton() {
  return (
    <CompoundButton_Display
      style="Primary"
      size="Medium (Default)"
      primaryString="Enable notifications"
      secondaryString="Get alerts when tasks are completed"
      secondaryText={true}
      image={true}
    />
  );
}

// @figmaExample ConfigureSettingsButton
export function ConfigureSettingsButton() {
  return (
    <CompoundButton_Display
      style="Secondary (Default)"
      size="Medium (Default)"
      primaryString="Configure settings"
      secondaryString="Customize your preferences"
      secondaryText={true}
      image={true}
    />
  );
}

// @figmaExample AdvancedOptionsButton
export function AdvancedOptionsButton() {
  return (
    <CompoundButton_Display
      style="Outline"
      size="Small"
      primaryString="Advanced options"
      secondaryString="View detailed configuration"
      secondaryText={true}
      image={false}
    />
  );
}

// @figmaExample LearnMoreButton
export function LearnMoreButton() {
  return (
    <CompoundButton_Display
      style="Subtle"
      size="Large"
      primaryString="Learn more"
      secondaryString="Discover additional features"
      secondaryText={true}
      image={false}
    />
  );
}

// @figmaExample CreateNewProjectButton
export function CreateNewProjectButton() {
  return (
    <CompoundButton_Display
      style="Primary"
      size="Large"
      primaryString="Create new project"
      secondaryString="Start with a blank template"
      secondaryText={true}
      image={true}
      swap40X40Img={(
        <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white text-xl font-bold">
          +
        </div>
      )}
    />
  );
}

// @figmaExample SimpleActionButton
export function SimpleActionButton() {
  return (
    <CompoundButton_Display
      style="Secondary (Default)"
      size="Medium (Default)"
      primaryString="Simple action"
      secondaryText={false}
      image={false}
    />
  );
}

// @figmaExample PremiumFeatureDisabledButton
export function PremiumFeatureDisabledButton() {
  return (
    <CompoundButton_Display
      style="Primary"
      size="Medium (Default)"
      primaryString="Premium feature"
      secondaryString="Upgrade to access this feature"
      secondaryText={true}
      image={true}
      disabled={true}
    />
  );
}

// @figmaExample TransparentButtonWithText
export function TransparentButtonWithText() {
  return (
    <CompoundButton_Display
      style="Transparent"
      size="Small"
      primaryString="Transparent button"
      secondaryString="With secondary text"
      secondaryText={true}
      image={true}
    />
  );
}