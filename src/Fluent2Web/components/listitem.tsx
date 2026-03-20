import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-zuslucy6fm';
import imgAvatarAvatar from 'figma:asset/1ca2b212726726ee9cfb52a97adb35738397e634.png';

/**
 * A flexible list item component for displaying selectable content with optional checkboxes, buttons, and metadata.
 * Appears as a horizontal row within its container (340px width by default) with rounded corners. Background color changes based on state (hover, pressed, active, disabled). Supports both compact one-line and expanded two-line layouts with avatar images.
 *
 * USAGE NOTES:
 * - One-line mode displays a compact row with icon, text, optional time, and action buttons
 * - Two-line mode displays an avatar, primary/secondary text, time, and action buttons in a taller layout
 * - The component manages its own hover/pressed/focus states when state prop is "Rest"
 * - Click events on checkboxes and buttons do not trigger the main onClick handler
 * - Disabled state prevents all interactions and changes visual appearance
 * - Active state gives a subtle background tint to indicate selection
 * - Focus state shows a double border ring (black outer, white inner)
 */
export interface ListItemProps {
  className?: string; // Optional custom className to override default styling and dimensions
  active?: boolean; // Whether the item is in an active/selected state, shows distinct background color (default: false)
  buttonSlot?: boolean; // Whether to show the two action buttons on the right side (default: true)
  listItemType?: "One line" | "Two line"; // "One line": Compact layout with 24px height, calendar icon, and inline text; "Two line": Expanded layout with 48px+ height, avatar image, primary and secondary text (default: "One line")
  selection?: boolean; // Whether to show the checkbox for item selection (default: true)
  showTertiaryText?: boolean; // Whether to display the tertiary time text ("00:00 AM") (default: true)
  size?: "Small" | "Medium (Default)"; // "Small": 16px icons, 12px text, 24px height for one-line; "Medium (Default)": 20px icons, 14px text, 32px height for one-line (default: "Small")
  state?: "Rest" | "Hover" | "Pressed" | "Disabled" | "Focus"; // "Rest": Normal state, manages internal hover/pressed/focus automatically; "Hover": Light gray background; "Pressed": Darker gray background; "Disabled": Gray background, no interactions, grayed out text; "Focus": Shows double border focus ring (default: "Rest")
  checked?: boolean; // Checkbox checked state (default: false)
  onCheckedChange?: (checked: boolean) => void; // Callback when checkbox state changes
  onClick?: () => void; // Callback when the list item itself is clicked (excludes checkbox/button clicks)
  onButton1Click?: () => void; // Callback for the first action button (trash/delete icon)
  onButton2Click?: () => void; // Callback for the second action button (minus/remove icon)
}

// ---------------------- Main Component ----------------------

export function ListItem({ 
  className, 
  active = false, 
  buttonSlot = true, 
  listItemType = "One line", 
  selection = true, 
  showTertiaryText = true, 
  size = "Small", 
  state: propState = "Rest",
  checked = false,
  onCheckedChange,
  onClick,
  onButton1Click,
  onButton2Click
}: ListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Use internal state if prop state is "Rest", otherwise use prop state
  const state = propState !== "Rest" ? propState : 
    isPressed ? "Pressed" : 
    isHovered ? "Hover" : 
    isFocused ? "Focus" : "Rest";

  const disabled = propState === "Disabled";

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    // Don't trigger list item click if clicking on checkbox or buttons
    if ((e.target as HTMLElement).closest('[role="checkbox"]') || (e.target as HTMLElement).closest('[role="button"]')) {
      return;
    }
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  const isMediumDefaultAndOneLineAndRestAndNotActive = size === "Medium (Default)" && listItemType === "One line" && state === "Rest" && !active;
  const isSmallAndOneLineAndDisabledAndNotActive = size === "Small" && listItemType === "One line" && state === "Disabled" && !active;
  const isSmallAndOneLineAndFocusAndNotActive = size === "Small" && listItemType === "One line" && state === "Focus" && !active;
  const isSmallAndOneLineAndHoverAndNotActive = size === "Small" && listItemType === "One line" && state === "Hover" && !active;
  const isSmallAndOneLineAndPressedAndNotActive = size === "Small" && listItemType === "One line" && state === "Pressed" && !active;
  const isSmallAndOneLineAndRestAndActive = size === "Small" && listItemType === "One line" && state === "Rest" && active;
  const isSmallAndOneLineAndRestAndNotActive = size === "Small" && listItemType === "One line" && state === "Rest" && !active;
  const isSmallAndTwoLineAndRestAndNotActive = size === "Small" && listItemType === "Two line" && state === "Rest" && !active;
  
  return (
    <div 
      className={className || `relative rounded-[4px] w-[340px] ${isSmallAndOneLineAndDisabledAndNotActive ? "bg-[#f0f0f0]" : isSmallAndOneLineAndPressedAndNotActive ? "bg-[#e0e0e0]" : isSmallAndOneLineAndHoverAndNotActive ? "bg-[#f5f5f5]" : isSmallAndOneLineAndRestAndActive ? "bg-[#ebebeb]" : "bg-[rgba(255,255,255,0)]"}`}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="listitem"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <div className="content-stretch flex items-start overflow-clip pr-[8px] relative rounded-[inherit] w-full">
        {(isSmallAndOneLineAndRestAndNotActive || isSmallAndOneLineAndRestAndActive || isSmallAndOneLineAndHoverAndNotActive || isSmallAndOneLineAndPressedAndNotActive || isSmallAndOneLineAndFocusAndNotActive) && selection && (
          <div className="content-stretch flex items-start relative shrink-0" data-name="Selection Container (24px)">
            <Selection className="relative rounded-[2px] shrink-0 size-[24px]" checked={checked} onChange={onCheckedChange} disabled={disabled} />
          </div>
        )}
        {(isSmallAndOneLineAndRestAndNotActive || isSmallAndOneLineAndRestAndActive || isSmallAndOneLineAndHoverAndNotActive || isSmallAndOneLineAndPressedAndNotActive || isSmallAndOneLineAndFocusAndNotActive) && (
          <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name=".Content Left (Small)">
            <div className="content-stretch flex gap-[4px] items-start relative w-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Left Icon Slot">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Calendar">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                      <path d={svgPaths.p5290700} fill="var(--fill-0, #242424)" id="Shape" />
                    </svg>
                  </div>
                </div>
              </div>
              <ListItemTextWrapperText text="Primary text slot" />
            </div>
          </div>
        )}
        {(isSmallAndOneLineAndRestAndNotActive || isSmallAndOneLineAndFocusAndNotActive) && showTertiaryText && <ListItemTertiaryTextText text="00:00 AM" additionalClassNames="h-[24px] items-center p-[2px]" />}
        {(isSmallAndOneLineAndRestAndNotActive || isSmallAndOneLineAndFocusAndNotActive) && buttonSlot && <ButtonSlot onButton1Click={onButton1Click} onButton2Click={onButton2Click} />}
        {(isSmallAndOneLineAndRestAndActive || isSmallAndOneLineAndPressedAndNotActive) && (
          <div className="content-stretch flex h-[24px] items-center justify-end p-[2px] relative shrink-0" data-name="Tertiary text">
            <p className={`leading-[16px] not-italic relative shrink-0 text-[12px] text-right w-[54px] whitespace-pre-wrap ${isSmallAndOneLineAndPressedAndNotActive ? "font-['Segoe_UI:Regular',sans-serif] text-[#424242]" : "font-['Segoe_UI:Semibold',sans-serif] text-[#616161]"}`}>00:00 AM</p>
          </div>
        )}
        {(isSmallAndOneLineAndRestAndActive || isSmallAndOneLineAndPressedAndNotActive) && buttonSlot && <ButtonSlot onButton1Click={onButton1Click} onButton2Click={onButton2Click} />}
        {isSmallAndTwoLineAndRestAndNotActive && selection && (
          <div className="content-stretch flex items-start py-[12px] relative shrink-0" data-name="Selection Container (24px)">
            <Selection className="relative rounded-[2px] shrink-0 size-[24px]" checked={checked} onChange={onCheckedChange} disabled={disabled} />
          </div>
        )}
        {isSmallAndTwoLineAndRestAndNotActive && (
          <>
            <div className="content-stretch flex items-start pl-[2px] py-[8px] relative shrink-0" data-name="Avatar Image Slot">
              <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name="Avatar/Avatar">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center relative size-full">
                    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[32px]" data-name="Fill">
                      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgAvatarAvatar} />
                      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name=".Persona Text Ramp/Default">
              <div className="flex flex-col justify-center size-full">
                <div className="content-stretch flex flex-col items-start justify-center pl-[8px] pr-[4px] py-[6px] relative w-full">
                  <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="1st line">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Primary text wrapper">
                      <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#424242] text-[14px] whitespace-pre-wrap">Primary text slot</p>
                    </div>
                    <ListItemTertiaryTextText text="00:00 AM" additionalClassNames="items-start py-[2px]" />
                  </div>
                  <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="2nd line">
                    <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#424242] text-[12px] whitespace-pre-wrap">Secondary text slot</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {isSmallAndTwoLineAndRestAndNotActive && buttonSlot && (
          <div className="relative self-stretch shrink-0" data-name=".Button Slot">
            <div className="flex flex-row items-center justify-end size-full">
              <div className="content-stretch flex h-full items-center justify-end relative">
                <ListItemButton onClick={onButton1Click} />
                <div 
                  className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)]" 
                  data-name="Button"
                  onClick={onButton2Click}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onButton2Click?.();
                    }
                  }}
                >
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[2px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                          <Shape />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isMediumDefaultAndOneLineAndRestAndNotActive && selection && (
          <div className="content-stretch flex items-start py-[4px] relative shrink-0" data-name="Selection Container (24px)">
            <Selection className="relative rounded-[2px] shrink-0 size-[24px]" checked={checked} onChange={onCheckedChange} disabled={disabled} />
          </div>
        )}
        {isMediumDefaultAndOneLineAndRestAndNotActive && (
          <>
            <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name=".Content Left (Medium)">
              <div className="content-stretch flex gap-[4px] items-start relative w-full">
                <div className="content-stretch flex items-start relative shrink-0" data-name="Left Icon Slot">
                  <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Calendar">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                        <path d={svgPaths.p37618c00} fill="var(--fill-0, #242424)" id="Shape" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center px-[2px] relative shrink-0" data-name="Text wrapper">
                  <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#424242] text-[14px]">Primary text slot</p>
                </div>
              </div>
            </div>
            <ListItemTertiaryTextText text="00:00 AM" additionalClassNames="h-[32px] items-center p-[2px]" />
          </>
        )}
        {isMediumDefaultAndOneLineAndRestAndNotActive && buttonSlot && <ButtonSlot onButton1Click={onButton1Click} onButton2Click={onButton2Click} />}
        {isSmallAndOneLineAndHoverAndNotActive && showTertiaryText && (
          <div className="content-stretch flex h-[24px] items-center justify-end p-[2px] relative shrink-0" data-name="Tertiary text">
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#424242] text-[12px] text-right w-[54px] whitespace-pre-wrap">00:00 AM</p>
          </div>
        )}
        {isSmallAndOneLineAndHoverAndNotActive && buttonSlot && <ButtonSlot onButton1Click={onButton1Click} onButton2Click={onButton2Click} />}
        {isSmallAndOneLineAndDisabledAndNotActive && selection && (
          <div className="content-stretch flex items-start relative shrink-0" data-name="Selection Container (24px)">
            <Helper additionalClassNames="shrink-0" checked={checked} onChange={onCheckedChange} disabled={true} />
          </div>
        )}
        {isSmallAndOneLineAndDisabledAndNotActive && (
          <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name=".Content Left (Small)">
            <div className="content-stretch flex gap-[4px] items-start relative w-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Left Icon Slot">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Calendar">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                      <path d={svgPaths.p5290700} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                    </svg>
                  </div>
                </div>
              </div>
              <ListItemTextWrapperText text="Primary text slot" />
            </div>
          </div>
        )}
        {isSmallAndOneLineAndDisabledAndNotActive && showTertiaryText && (
          <div className="content-stretch flex h-[24px] items-center justify-end p-[2px] relative shrink-0" data-name="Tertiary text">
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#bdbdbd] text-[12px] text-right w-[54px] whitespace-pre-wrap">00:00 AM</p>
          </div>
        )}
        {isSmallAndOneLineAndDisabledAndNotActive && buttonSlot && <ButtonSlot onButton1Click={onButton1Click} onButton2Click={onButton2Click} />}
        {isSmallAndOneLineAndFocusAndNotActive && (
          <div className="absolute h-[96px] left-0 right-0 top-0" data-name="Focus ring">
            <div className="absolute border-2 border-black border-solid inset-0 rounded-[4px]" data-name="Border-outer" />
            <div className="absolute border border-solid border-white inset-[2px] rounded-[2px]" data-name="Border-inner" />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Shape() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[2.5px] left-1/2 top-1/2 w-[12.5px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 2.5">
        <path d={svgPaths.p1737d400} fill="var(--fill-0, #424242)" id="Shape" />
      </svg>
    </div>
  );
}

type ButtonSlotProps = {
  onButton1Click?: () => void;
  onButton2Click?: () => void;
};

function ButtonSlot({ onButton1Click, onButton2Click }: ButtonSlotProps) {
  return (
    <div className="relative shrink-0">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end relative">
          <ListItemButton onClick={onButton1Click} />
          <div 
            className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)]" 
            data-name="Button"
            onClick={onButton2Click}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onButton2Click?.();
              }
            }}
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                  <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[2.5px] left-1/2 top-1/2 w-[12.5px]">
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

type ListItemButtonProps = {
  onClick?: () => void;
};

function ListItemButton({ onClick }: ListItemButtonProps) {
  return (
    <div 
      className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[2px] relative">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
            <div className="relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15px] left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] w-[13.001px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0008 15">
                  <path d={svgPaths.ped46f40} fill="var(--fill-0, #424242)" id="Shape" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ListItemTertiaryTextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ListItemTertiaryTextText({ text, additionalClassNames = "" }: ListItemTertiaryTextTextProps) {
  return (
    <div className={clsx("content-stretch flex justify-end relative shrink-0", additionalClassNames)}>
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#616161] text-[12px] text-right w-[54px] whitespace-pre-wrap">{text}</p>
    </div>
  );
}

type ListItemTextWrapperTextProps = {
  text: string;
};

function ListItemTextWrapperText({ text }: ListItemTextWrapperTextProps) {
  return (
    <div className="content-stretch flex items-center px-[2px] relative shrink-0">
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#424242] text-[12px]">{text}</p>
    </div>
  );
}

type HelperProps = {
  additionalClassNames?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

function Helper({ additionalClassNames = "", checked = false, onChange, disabled = false }: HelperProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={clsx("relative rounded-[2px] size-[24px]", additionalClassNames, !disabled && "cursor-pointer")}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative size-full">
          <div className="relative shrink-0" data-name="Checkbox">
            <div className="content-stretch flex gap-[4px] items-start relative">
              <div className="content-stretch flex items-start p-[8px] relative shrink-0" data-name="Checkbox elements">
                <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="Background" style={{ backgroundColor: checked ? '#0078d4' : 'transparent' }}>
                  <div aria-hidden="true" className="absolute border border-[#616161] border-solid inset-0 pointer-events-none rounded-[2px]" />
                  {checked && (
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SelectionProps = {
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

function Selection({ className, checked = false, onChange, disabled = false }: SelectionProps) {
  return (
    <div className={className || ""} data-name=".Selection">
      <Helper checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface ListItemProps_Display {
  active?: boolean;
  buttonSlot?: boolean;
  listItemType?: "One line" | "Two line";
  selection?: boolean;
  showTertiaryText?: boolean;
  size?: "Small" | "Medium (Default)";
}

function ListItem_Display({
  active,
  buttonSlot,
  listItemType,
  selection,
  showTertiaryText,
  size,
}: ListItemProps_Display) {
  const [checked, setChecked] = React.useState(false);

  return (
    <ListItem
      active={active}
      buttonSlot={buttonSlot}
      listItemType={listItemType}
      selection={selection}
      showTertiaryText={showTertiaryText}
      size={size}
      checked={checked}
      onCheckedChange={setChecked}
      onClick={() => {}}
      onButton1Click={() => {}}
      onButton2Click={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SmallOneLineListItemWithAllFeatures
export function SmallOneLineListItemWithAllFeatures() {
  return (
    <ListItem_Display
      listItemType="One line"
      size="Small"
      selection={true}
      buttonSlot={true}
      showTertiaryText={true}
      active={false}
    />
  );
}

// @figmaExample MediumActiveOneLineListItem
export function MediumActiveOneLineListItem() {
  return (
    <ListItem_Display
      listItemType="One line"
      size="Medium (Default)"
      selection={true}
      buttonSlot={true}
      showTertiaryText={true}
      active={true}
    />
  );
}

// @figmaExample SmallTwoLineListItemWithAvatar
export function SmallTwoLineListItemWithAvatar() {
  return (
    <ListItem_Display
      listItemType="Two line"
      size="Small"
      selection={true}
      buttonSlot={true}
      showTertiaryText={true}
      active={false}
    />
  );
}

// @figmaExample MediumActiveTwoLineListItem
export function MediumActiveTwoLineListItem() {
  return (
    <ListItem_Display
      listItemType="Two line"
      size="Medium (Default)"
      selection={true}
      buttonSlot={true}
      showTertiaryText={true}
      active={true}
    />
  );
}

// @figmaExample MinimalOneLineListItem
export function MinimalOneLineListItem() {
  return (
    <ListItem_Display
      listItemType="One line"
      size="Small"
      selection={false}
      buttonSlot={false}
      showTertiaryText={true}
      active={false}
    />
  );
}

// @figmaExample TwoLineListItemWithButtonsOnly
export function TwoLineListItemWithButtonsOnly() {
  return (
    <ListItem_Display
      listItemType="Two line"
      size="Small"
      selection={false}
      buttonSlot={true}
      showTertiaryText={false}
      active={false}
    />
  );
}

// @figmaExample MediumOneLineWithCheckboxOnly
export function MediumOneLineWithCheckboxOnly() {
  return (
    <ListItem_Display
      listItemType="One line"
      size="Medium (Default)"
      selection={true}
      buttonSlot={false}
      showTertiaryText={false}
      active={false}
    />
  );
}

// @figmaExample SimpleTwoLineListItem
export function SimpleTwoLineListItem() {
  return (
    <ListItem_Display
      listItemType="Two line"
      size="Medium (Default)"
      selection={false}
      buttonSlot={false}
      showTertiaryText={true}
      active={false}
    />
  );
}
