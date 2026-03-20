import * as React from 'react';
import { useState } from 'react';
import svgPaths from "./svg-whsfrorfek";

/**
 * A medium-sized, interactive app item component that displays an icon and text label.
 * Appears as a rectangular button-like element (252px wide by 48px tall) with rounded corners and a light gray background.
 * The component shows an icon on the left side and text label on the right, with visual feedback for hover, pressed, and disabled states.
 * 
 * Use this component to represent an application or item in a list or grid of apps. It's ideal for app launchers,
 * app selectors, or similar UI patterns where users need to choose from multiple applications.
 * 
 * The component is fully keyboard accessible and supports both mouse and keyboard interactions (Enter and Space keys).
 * Background color transitions from light gray (#f0f0f0) to slightly lighter on hover (#fafafa) to slightly darker when pressed (#f5f5f5).
 */
export interface AppItemMediumProps {
  className?: string; // Custom CSS classes to override default styling and dimensions
  iconBefore?: React.ReactNode | null; // Icon element to display before the text. If not provided, a default placeholder icon will be shown. Use icon components sized at 32px for best results. (default: null)
  text?: string; // The label text to display next to the icon (default: "App item name")
  onClick?: () => void; // Callback function triggered when the component is clicked or activated via keyboard
  disabled?: boolean; // When true, disables interaction and reduces opacity to 50%, showing the component in a non-interactive state (default: false)
}

// ---------------------- Main Component ----------------------

export function AppItemMedium({ className, iconBefore = null, text = "App item name", onClick, disabled = false }: AppItemMediumProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsPressed(false);
      if (onClick) {
        onClick();
      }
    }
  };

  const isHover = isHovered && !isPressed;
  const isHoverOrPressed = isHovered || isPressed;
  const isRestOrHover = !isPressed;

  return (
    <div 
      className={className || `h-[48px] relative rounded-[4px] w-[252px] ${isPressed ? "bg-[#f5f5f5]" : isHover ? "bg-[#fafafa]" : "bg-[#f0f0f0]"} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div className="flex flex-row items-center size-full">
        <div className={`content-stretch flex items-center px-[10px] relative size-full ${isHoverOrPressed ? "gap-[8px] py-[8px]" : "gap-[6px] py-[12px]"}`}>
          {iconBefore || (
            <div className="relative shrink-0 size-[32px]" data-name="Placeholder">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[26px] top-1/2" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
                  <path clipRule="evenodd" d={svgPaths.p14bd3300} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
                </svg>
              </div>
            </div>
          )}
          <div className="content-stretch flex items-center justify-center pl-[4px] relative shrink-0" data-name="Content frame">
            {isRestOrHover && <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[16px] w-[190px] whitespace-pre-wrap">{text}</p>}
            {isPressed && <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[16px] w-[192px] whitespace-pre-wrap">{text}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export interface PlaceholderProps {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
}

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
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[2px] relative">
            <div className={`relative shrink-0 ${is12AndRegular || is12AndFilled ? "size-[8px]" : is16AndRegular ? "size-[12px]" : is20AndRegular ? "size-[16px]" : "size-[20px]"}`} data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is12AndRegular || is12AndFilled ? "0 0 8 8" : is16AndRegular ? "0 0 12 12" : is20AndRegular ? "0 0 16 16" : "0 0 20 20"}>
                <path clipRule="evenodd" d={is12AndRegular || is12AndFilled ? svgPaths.p18da8d00 : is16AndRegular ? svgPaths.p31a9aa00 : is20AndRegular ? svgPaths.pa51a700 : svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
              </svg>
            </div>
          </div>
        </div>
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

interface AppItemMediumProps_Display {
  iconBefore?: React.ReactNode | null;
  text?: string;
  disabled?: boolean;
}

function AppItemMedium_Display({
  iconBefore,
  text,
  disabled,
}: AppItemMediumProps_Display) {
  return (
    <AppItemMedium
      iconBefore={iconBefore}
      text={text}
      disabled={disabled}
      onClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample MicrosoftWord
export function MicrosoftWordExample() {
  return (
    <AppItemMedium_Display
      text="Microsoft Word"
    />
  );
}

// @figmaExample VisualStudioCode
export function VisualStudioCodeExample() {
  return (
    <AppItemMedium_Display
      text="Visual Studio Code"
      iconBefore={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#007ACC"/>
          <path d="M22 9L12 15V17L22 23V9Z" fill="white"/>
          <path d="M12 15L16 19L12 23V15Z" fill="white" opacity="0.7"/>
        </svg>
      }
    />
  );
}

// @figmaExample Photoshop
export function PhotoshopExample() {
  return (
    <AppItemMedium_Display
      text="Photoshop"
      iconBefore={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#31A8FF"/>
          <text x="16" y="22" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">Ps</text>
        </svg>
      }
    />
  );
}

// @figmaExample Slack
export function SlackExample() {
  return (
    <AppItemMedium_Display
      text="Slack"
      iconBefore={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#4A154B"/>
          <circle cx="12" cy="12" r="3" fill="#E01E5A"/>
          <circle cx="20" cy="12" r="3" fill="#36C5F0"/>
          <circle cx="12" cy="20" r="3" fill="#2EB67D"/>
          <circle cx="20" cy="20" r="3" fill="#ECB22E"/>
        </svg>
      }
    />
  );
}

// @figmaExample FigmaApp
export function FigmaAppExample() {
  return (
    <AppItemMedium_Display
      text="Figma"
      iconBefore={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#F24E1E"/>
          <circle cx="20" cy="16" r="4" fill="white"/>
          <rect x="12" y="8" width="8" height="8" rx="4" fill="white" opacity="0.8"/>
        </svg>
      }
    />
  );
}

// @figmaExample ComingSoonDisabled
export function ComingSoonDisabledExample() {
  return (
    <AppItemMedium_Display
      text="Coming Soon"
      disabled={true}
    />
  );
}

// @figmaExample UnavailableAppDisabled
export function UnavailableAppDisabledExample() {
  return (
    <AppItemMedium_Display
      text="Unavailable App"
      disabled={true}
      iconBefore={
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#CCCCCC"/>
          <path d="M16 10V16M16 22V22.01" stroke="#666666" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      }
    />
  );
}