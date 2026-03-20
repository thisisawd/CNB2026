import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-h0xpj70wd3';

/**
 * An interactive list item component designed for displaying app entries with an icon and text label.
 * Appears as a rectangular button-like element with a light gray background, rounded corners on hover/press, and smooth state transitions.
 * Fixed dimensions of 252px wide by 40px tall. Displays a 20px icon on the left followed by text, with appropriate padding and spacing.
 * 
 * Behavior:
 * - Automatically manages visual states: rest (light gray #f0f0f0), hover (very light gray #fafafa with rounded corners), pressed (slightly darker #f5f5f5 with rounded corners)
 * - Supports both mouse and keyboard interaction (Enter/Space keys trigger onClick)
 * - When disabled, shows reduced opacity (50%) and prevents all interactions
 * - If no icon is provided, displays a default placeholder icon
 */
export interface AppItemSmallProps {
  /** Custom className to override the entire default styling and layout. Use sparingly as it replaces all default styles including dimensions and interactive states. */
  className?: string;
  /** Icon element to display before the text. Should be a 20px-24px icon component. If not provided, a default placeholder icon is rendered. (default: null) */
  iconBefore?: React.ReactNode;
  /** Text label to display next to the icon. Rendered in Segoe UI Semibold, 16px font size. (default: "App item name") */
  text?: string;
  /** Callback function triggered when the item is clicked or activated via keyboard. */
  onClick?: () => void;
  /** When true, disables all interactions, applies 50% opacity, shows not-allowed cursor, and prevents onClick from firing. (default: false) */
  disabled?: boolean;
}

// ---------------------- Main Component ----------------------

export function AppItemSmall({ className, iconBefore = null, text = "App item name", onClick, disabled = false }: AppItemSmallProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHover(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setIsPressed(false);
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const isRestOrPressed = !isHover || isPressed;
  
  return (
    <div 
      className={className || `h-[40px] relative w-[252px] ${disabled ? "bg-[#f0f0f0] opacity-50 cursor-not-allowed" : isPressed ? "bg-[#f5f5f5] rounded-[4px] cursor-pointer" : isHover ? "bg-[#fafafa] rounded-[4px] cursor-pointer" : "bg-[#f0f0f0] cursor-pointer"}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center pl-[14px] pr-[6px] py-[8px] relative size-full">
          {iconBefore || (
            <div className="relative shrink-0" data-name="Placeholder">
              <Wrapper>
                <div className="relative shrink-0 size-[20px]" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d={svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
                  </svg>
                </div>
              </Wrapper>
            </div>
          )}
          <div className="content-stretch flex items-center justify-center pl-[4px] relative shrink-0" data-name="Content frame">
            {isRestOrPressed && <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[16px] w-[194px] whitespace-pre-wrap">{text}</p>}
            {isHover && !isPressed && <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#242424] text-[16px] w-[198px] whitespace-pre-wrap">{text}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
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
        <Wrapper>
          <div className={`relative shrink-0 ${is12AndRegular || is12AndFilled ? "size-[8px]" : is16AndRegular ? "size-[12px]" : is20AndRegular ? "size-[16px]" : "size-[20px]"}`} data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is12AndRegular || is12AndFilled ? "0 0 8 8" : is16AndRegular ? "0 0 12 12" : is20AndRegular ? "0 0 16 16" : "0 0 20 20"}>
              <path clipRule="evenodd" d={is12AndRegular || is12AndFilled ? svgPaths.p18da8d00 : is16AndRegular ? svgPaths.p31a9aa00 : is20AndRegular ? svgPaths.pa51a700 : svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </Wrapper>
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

interface AppItemSmallProps_Display {
  iconBefore?: React.ReactNode;
  text?: string;
  disabled?: boolean;
}

function AppItemSmall_Display({
  iconBefore,
  text,
  disabled,
}: AppItemSmallProps_Display) {
  return (
    <AppItemSmall
      iconBefore={iconBefore}
      text={text}
      disabled={disabled}
      onClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DocumentsAppItem
export function DocumentsAppItem() {
  return (
    <AppItemSmall_Display
      text="Documents"
    />
  );
}

// @figmaExample RecentFilesAppItem
export function RecentFilesAppItem() {
  return (
    <AppItemSmall_Display
      iconBefore={(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" fill="#0078D4"/>
          <path d="M10 6V10L13 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      text="Recent Files"
    />
  );
}

// @figmaExample SettingsAppItem
export function SettingsAppItem() {
  return (
    <AppItemSmall_Display
      iconBefore={(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="14" height="14" rx="2" fill="#107C10"/>
          <path d="M7 10L9 12L13 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      text="Settings"
    />
  );
}

// @figmaExample NotificationsAppItem
export function NotificationsAppItem() {
  return (
    <AppItemSmall_Display
      iconBefore={(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H16V16H4V4Z" fill="#E81123"/>
          <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )}
      text="Notifications"
    />
  );
}

// @figmaExample CalendarEventsAppItem
export function CalendarEventsAppItem() {
  return (
    <AppItemSmall_Display
      iconBefore={(
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7" fill="#FFB900"/>
          <path d="M10 7V10H13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )}
      text="Calendar Events"
    />
  );
}

// @figmaExample DisabledAppItem
export function DisabledAppItem() {
  return (
    <AppItemSmall_Display
      text="Disabled Application"
      disabled={true}
    />
  );
}
