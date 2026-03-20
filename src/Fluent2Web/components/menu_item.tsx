import * as React from 'react';
import { useState, ReactNode } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-db6c67qs8f';

/**
 * A versatile menu item component that displays an interactive option within a menu or dropdown.
 * Appears as a rectangular item (default 240px wide, minimum 32px height) with rounded corners, displaying text content with optional icons, checkmarks, chevrons, and switches.
 * Background color changes based on interaction state (white at rest, light gray on hover, darker gray when pressed, lighter gray when selected).
 * Supports keyboard navigation with Enter/Space keys.
 * 
 * This component is designed for use in context menus, dropdowns, and navigation menus.
 * It handles its own hover, pressed, and checked states internally but can also be controlled externally via props.
 */
export interface MenuItemProps {
  className?: string; // Optional custom className to override default styling
  checkmark?: boolean; // Shows a checkmark container on the left side when true. The checkmark appears when the item is selected/checked. Changes layout by adding space for the checkmark. (default: false)
  checked?: boolean; // Controlled checked state for checkmark items. When undefined, uses internal state. Toggles on click when checkmark is true.
  chevron?: boolean; // Shows a right-pointing chevron on the right side, typically indicating a submenu or navigation. Changes layout by adding the chevron element. (default: true)
  endContent?: boolean; // Shows end content area on the right side (shortcut text and/or chevron). Changes layout by adding right-side content area. (default: true)
  endContentString?: string; // Text displayed in the end content area, typically used for keyboard shortcuts (default: "Shortcut text")
  focus?: boolean; // Shows a focus ring around the item. Adds visual border indicator. (default: false)
  icon?: boolean; // Shows an icon on the left side after the optional checkmark. Changes layout by adding icon space. (default: true)
  primaryString?: string; // Main text content displayed in the item (default: "Action")
  prop20PxFilled?: ReactNode | null; // Custom 20px filled icon to display instead of the default icon (default: null)
  prop20PxRegular?: ReactNode | null; // Custom 20px regular icon to display instead of the default icon (default: null)
  propSwitch?: boolean; // Shows a toggle switch on the right side instead of standard end content. Significantly changes layout and behavior. (default: false)
  secondaryString?: string; // Secondary text displayed below the primary text when secondaryText is true (default: "Secondary content")
  secondaryText?: boolean; // Shows secondary text below the primary text. Changes layout by adding a second line of smaller text. (default: false)
  selected?: boolean; // Controlled selected state. When undefined, mirrors the checked state
  state?: "Rest" | "Rest (Checked only)" | "Hover" | "Pressed" | "Selected" | "Disabled" | "Disabled (Checked only)"; // Explicit state override. When provided, disables internal state management and uses this value instead.
  onClick?: () => void; // Callback fired when the item is clicked (not fired in disabled states)
  onCheckedChange?: (checked: boolean) => void; // Callback fired when the checked state changes (only relevant when checkmark is true)
  onSwitchChange?: (checked: boolean) => void; // Callback fired when the switch is toggled (only relevant when propSwitch is true)
  onSubMenuOpen?: () => void; // Callback fired when the item is clicked and has a chevron, indicating a submenu should open
}

export function MenuItem({ 
  className, 
  checkmark = false, 
  checked: checkedProp, 
  chevron = true, 
  endContent = true, 
  endContentString = "Shortcut text", 
  focus = false, 
  icon = true, 
  primaryString = "Action", 
  prop20PxFilled = null, 
  prop20PxRegular = null, 
  propSwitch = false, 
  secondaryString = "Secondary content", 
  secondaryText = false, 
  selected: selectedProp, 
  state: stateProp,
  onClick,
  onCheckedChange,
  onSwitchChange,
  onSubMenuOpen
}: MenuItemProps) {
  // Internal state management
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [internalChecked, setInternalChecked] = useState(checkedProp ?? false);
  const [internalSwitchChecked, setInternalSwitchChecked] = useState(false);
  
  // Use controlled or uncontrolled state
  const checked = checkedProp !== undefined ? checkedProp : internalChecked;
  const selected = selectedProp !== undefined ? selectedProp : checked;
  
  // Determine state based on props or internal state
  const state = stateProp || (
    isPressed ? "Pressed" :
    isHovering ? "Hover" :
    selected ? "Selected" :
    checked ? "Rest (Checked only)" :
    "Rest"
  );
  
  const isDisabled = state === "Disabled";
  const isDisabledCheckedOnly = state === "Disabled (Checked only)";
  const isDisabledOrDisabledCheckedOnly = ["Disabled", "Disabled (Checked only)"].includes(state);
  const isHover = state === "Hover";
  const isPressed_ = state === "Pressed";
  const isRest = state === "Rest";
  const isRestCheckedOnly = state === "Rest (Checked only)";
  const isRestCheckedOnlyOrSelected = ["Rest (Checked only)", "Selected"].includes(state);
  const isRestOrRestCheckedOnly = ["Rest", "Rest (Checked only)"].includes(state);
  const isRestOrRestCheckedOnlyOrHoverOrPressedOrSelected = ["Rest", "Rest (Checked only)", "Hover", "Pressed", "Selected"].includes(state);
  const isSelected = state === "Selected";
  
  // Event handlers
  const handleMouseEnter = () => {
    if (!isDisabledOrDisabledCheckedOnly && !stateProp) {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!stateProp) {
      setIsHovering(false);
      setIsPressed(false);
    }
  };
  
  const handleMouseDown = () => {
    if (!isDisabledOrDisabledCheckedOnly && !stateProp) {
      setIsPressed(true);
    }
  };
  
  const handleMouseUp = () => {
    if (!stateProp) {
      setIsPressed(false);
    }
  };
  
  const handleClick = (e: React.MouseEvent) => {
    if (isDisabledOrDisabledCheckedOnly) {
      e.preventDefault();
      return;
    }
    
    // If it has a chevron and onSubMenuOpen, open submenu
    if (chevron && onSubMenuOpen) {
      onSubMenuOpen();
      return;
    }
    
    // If it's a checkmark item, toggle checked state
    if (checkmark && !propSwitch) {
      const newChecked = !checked;
      if (checkedProp === undefined) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    }
    
    // Call onClick handler
    onClick?.();
  };
  
  const handleSwitchClick = (e: React.MouseEvent) => {
    if (isDisabledOrDisabledCheckedOnly) {
      e.preventDefault();
      return;
    }
    
    e.stopPropagation();
    const newValue = !internalSwitchChecked;
    setInternalSwitchChecked(newValue);
    onSwitchChange?.(newValue);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabledOrDisabledCheckedOnly) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  };
  
  return (
    <div 
      className={className || `min-h-[32px] min-w-[120px] relative rounded-[4px] w-[240px] ${isSelected ? "bg-[#ebebeb]" : isPressed_ ? "bg-[#e0e0e0]" : isHover ? "bg-[#f5f5f5]" : "bg-white"}`}
      role="menuitem"
      aria-disabled={isDisabledOrDisabledCheckedOnly}
      tabIndex={isDisabledOrDisabledCheckedOnly ? -1 : 0}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      style={{ cursor: isDisabledOrDisabledCheckedOnly ? 'not-allowed' : 'pointer' }}
    >
      <div className="content-stretch flex gap-[4px] items-start min-h-[inherit] min-w-[inherit] relative w-full">
        <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Item content">
          <div className="content-stretch flex gap-[4px] items-start pl-[6px] pr-[2px] py-[6px] relative w-full">
            {isRestOrRestCheckedOnlyOrHoverOrPressedOrSelected && checkmark && (
              <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Checkmark container">
                {selected && (
                  <MenuItemCheckmark>
                    <path d={svgPaths.p35118f00} fill="var(--fill-0, #242424)" id="Shape" />
                  </MenuItemCheckmark>
                )}
              </div>
            )}
            {isRestCheckedOnlyOrSelected &&
              icon &&
              (prop20PxFilled || (
                <MenuItemImage>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #0F6CBD)" id="Shape" />
                </MenuItemImage>
              ))}
            {isRestCheckedOnlyOrSelected && (
              <MenuItemTextContainer>
                {isRestCheckedOnly && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#424242] text-[14px] w-full">
                    <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                  </div>
                )}
                {isRestCheckedOnly && secondaryText && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#616161] text-[10px] w-full">
                    <p className="leading-[14px] whitespace-pre-wrap">{secondaryString}</p>
                  </div>
                )}
                {isSelected && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#242424] text-[14px] w-full">
                    <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                  </div>
                )}
                {isSelected && secondaryText && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#424242] text-[10px] w-full">
                    <p className="leading-[14px] whitespace-pre-wrap">{secondaryString}</p>
                  </div>
                )}
              </MenuItemTextContainer>
            )}
            {isDisabledOrDisabledCheckedOnly && checkmark && (
              <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Checkmark container">
                {selected && (
                  <MenuItemCheckmark>
                    <path d={svgPaths.p35118f00} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                  </MenuItemCheckmark>
                )}
              </div>
            )}
            {isRest &&
              icon &&
              (prop20PxRegular || (
                <MenuItemImage>
                  <path d={svgPaths.p19631e80} fill="var(--fill-0, #424242)" id="Shape" />
                </MenuItemImage>
              ))}
            {isRest && (
              <MenuItemTextContainer>
                <div className="flex flex-col justify-center relative shrink-0 text-[#424242] text-[14px] w-full">
                  <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                </div>
                {secondaryText && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#616161] text-[10px] w-full">
                    <p className="leading-[14px] whitespace-pre-wrap">{secondaryString}</p>
                  </div>
                )}
              </MenuItemTextContainer>
            )}
            {isRestOrRestCheckedOnly && endContent && (
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="End content">
                <div className="content-stretch flex items-center justify-end pl-[2px] pr-[6px] relative shrink-0" data-name="Text container">
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[14px] text-right whitespace-nowrap">
                    <p className="leading-[20px]">{endContentString}</p>
                  </div>
                </div>
                {chevron && (
                  <MenuItemChevron>
                    <path d={svgPaths.p154164f0} fill="var(--fill-0, #424242)" id="Shape" />
                  </MenuItemChevron>
                )}
              </div>
            )}
            {isHover &&
              icon &&
              (prop20PxFilled || (
                <MenuItemImage>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #115EA3)" id="Shape" />
                </MenuItemImage>
              ))}
            {isHover && (
              <MenuItemTextContainer>
                <div className="flex flex-col justify-center relative shrink-0 text-[#242424] text-[14px] w-full">
                  <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                </div>
                {secondaryText && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#424242] text-[10px] w-full">
                    <p className="leading-[14px] whitespace-pre-wrap">{secondaryString}</p>
                  </div>
                )}
              </MenuItemTextContainer>
            )}
            {isHover && endContent && <MenuItemEndContent endContentString={endContentString} chevron={chevron} />}
            {isPressed_ &&
              icon &&
              (prop20PxFilled || (
                <MenuItemImage>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #0F548C)" id="Shape" />
                </MenuItemImage>
              ))}
            {isPressed_ && (
              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text container">
                <div className="flex flex-col justify-center size-full">
                  <MenuItemHelper additionalClassNames="text-[#242424]" primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />
                </div>
              </div>
            )}
            {isPressed_ && endContent && <MenuItemEndContent endContentString={endContentString} chevron={chevron} />}
            {isSelected && endContent && (
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="End content">
                <TextContainer endContentString={endContentString} />
                {chevron && (
                  <MenuItemChevron>
                    <path d={svgPaths.p154164f0} fill="var(--fill-0, #242424)" id="Shape" />
                  </MenuItemChevron>
                )}
              </div>
            )}
            {isDisabled &&
              icon &&
              (prop20PxRegular || (
                <MenuItemImage>
                  <path d={svgPaths.p19631e80} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                </MenuItemImage>
              ))}
            {isDisabled && <TextContainer1 primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />}
            {isDisabled && endContent && <MenuItemEndContent1 endContentString={endContentString} chevron={chevron} />}
            {isDisabledCheckedOnly &&
              icon &&
              (prop20PxFilled || (
                <MenuItemImage>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                </MenuItemImage>
              ))}
            {isDisabledCheckedOnly && <TextContainer1 primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />}
            {isDisabledCheckedOnly && endContent && <MenuItemEndContent1 endContentString={endContentString} chevron={chevron} />}
          </div>
        </div>
        {isRestOrRestCheckedOnlyOrHoverOrPressedOrSelected && propSwitch && (
          <div onClick={handleSwitchClick}>
            <MenuItemSwitch>
              <g id="Track">
                <mask fill="white" id="path-1-inside-1_0_160">
                  <path d={svgPaths.p1a71ba80} />
                </mask>
                <path d={svgPaths.p21bc3880} fill="var(--stroke-0, #616161)" mask="url(#path-1-inside-1_0_160)" />
              </g>
              <circle cx="10" cy="10" fill="var(--fill-0, #616161)" id="Thumb" r="7" />
            </MenuItemSwitch>
          </div>
        )}
        {isRestOrRestCheckedOnly && focus && (
          <div className="absolute inset-0 rounded-[4px]" data-name="Focus ring">
            <div className="overflow-clip relative rounded-[inherit] size-full">
              <div className="absolute border border-solid border-white inset-0 rounded-[4px]" data-name="Inner stroke" />
            </div>
            <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
          </div>
        )}
        {isDisabledOrDisabledCheckedOnly && propSwitch && (
          <MenuItemSwitch>
            <g id="Track">
              <mask fill="white" id="path-1-inside-1_0_151">
                <path d={svgPaths.p1a71ba80} />
              </mask>
              <path d={svgPaths.p21bc3880} fill="var(--stroke-0, #E0E0E0)" mask="url(#path-1-inside-1_0_151)" />
            </g>
            <circle cx="10" cy="10" fill="var(--fill-0, #BDBDBD)" id="Thumb" r="7" />
          </MenuItemSwitch>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components ----------------------

function MenuItemTextContainer({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col font-['Segoe_UI:Regular',sans-serif] items-start justify-center leading-[0] not-italic px-[2px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function MenuItemImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          {children}
        </svg>
      </div>
    </div>
  );
}

function MenuItemCheckmark({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[9.001px] left-[calc(50%+0.13px)] top-[calc(50%-0.25px)] w-[12.25px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 9.00113">
          {children}
        </svg>
      </div>
    </div>
  );
}

function MenuItemChevron({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12.001px] left-[calc(50%+0.75px)] top-1/2 w-[6.499px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.49919 12.0008">
          {children}
        </svg>
      </div>
    </div>
  );
}

function MenuItemSwitch({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex flex-col h-full items-start relative">
        <div className="relative shrink-0" data-name=".SwitchBase">
          <div className="content-stretch flex flex-col items-start p-[8px] relative">
            <div className="h-[20px] relative shrink-0 w-[40px]" data-name="Track+Thumb">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 20">
                <g id="Track+Thumb">{children}</g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MenuItemEndContent1Props = {
  endContentString: string;
  chevron: boolean;
};

function MenuItemEndContent1({ endContentString, chevron }: MenuItemEndContent1Props) {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="content-stretch flex items-center justify-end pl-[2px] pr-[6px] relative shrink-0" data-name="Text container">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bdbdbd] text-[14px] text-right whitespace-nowrap">
          <p className="leading-[20px]">{endContentString}</p>
        </div>
      </div>
      {chevron && (
        <MenuItemChevron>
          <path d={svgPaths.p154164f0} fill="var(--fill-0, #BDBDBD)" id="Shape" />
        </MenuItemChevron>
      )}
    </div>
  );
}

type TextContainer1Props = {
  primaryString: string;
  secondaryText: boolean;
  secondaryString: string;
  additionalClassNames?: string;
};

function TextContainer1({ primaryString, secondaryText, secondaryString, additionalClassNames = "" }: TextContainer1Props) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <MenuItemHelper additionalClassNames="text-[#bdbdbd]" primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />
      </div>
    </div>
  );
}

type MenuItemHelperProps = {
  primaryString: string;
  secondaryText: boolean;
  secondaryString: string;
  additionalClassNames?: string;
};

function MenuItemHelper({ primaryString, secondaryText, secondaryString, additionalClassNames = "" }: MenuItemHelperProps) {
  return (
    <div className={clsx("content-stretch flex flex-col font-['Segoe_UI:Regular',sans-serif] items-start justify-center leading-[0] not-italic px-[2px] relative w-full", additionalClassNames)}>
      <div className="flex flex-col justify-center relative shrink-0 text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
      </div>
      {secondaryText && (
        <div className="flex flex-col justify-center relative shrink-0 text-[10px] w-full">
          <p className="leading-[14px] whitespace-pre-wrap">{secondaryString}</p>
        </div>
      )}
    </div>
  );
}

type TextContainerProps = {
  endContentString: string;
};

function TextContainer({ endContentString }: TextContainerProps) {
  return (
    <div className="content-stretch flex items-center justify-end pl-[2px] pr-[6px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] text-right whitespace-nowrap">
        <p className="leading-[20px]">{endContentString}</p>
      </div>
    </div>
  );
}

type MenuItemEndContentProps = {
  endContentString: string;
  chevron: boolean;
};

function MenuItemEndContent({ endContentString, chevron }: MenuItemEndContentProps) {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <TextContainer endContentString={endContentString} />
      {chevron && (
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Chevron">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12.001px] left-[calc(50%+0.75px)] top-1/2 w-[6.501px]" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.50134 12.0009">
              <path d={svgPaths.p20cb9e70} fill="var(--fill-0, #242424)" id="Shape" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

type ImageProps = {
  className?: string;
  size?: "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Image({ className, size = "48", theme = "Regular" }: ImageProps) {
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndRegular = size === "24" && theme === "Regular";
  const is28AndRegular = size === "28" && theme === "Regular";
  const is32AndRegular = size === "32" && theme === "Regular";
  const is48AndFilled = size === "48" && theme === "Filled";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is32AndRegular ? "size-[32px]" : is16AndRegular ? "size-[16px]" : is20AndRegular ? "size-[20px]" : is24AndRegular ? "size-[24px]" : is28AndRegular ? "size-[28px]" : "size-[48px]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${is32AndRegular ? "size-[26px]" : is16AndRegular ? "size-[12px]" : is20AndRegular ? "size-[14px]" : is24AndRegular ? "size-[18px]" : is28AndRegular ? "size-[22px]" : "size-[36px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is32AndRegular ? "0 0 26 26" : is16AndRegular ? "0 0 12 12" : is20AndRegular ? "0 0 14 14" : is24AndRegular ? "0 0 18 18" : is28AndRegular ? "0 0 22 22" : "0 0 36 36"}>
          <path d={is32AndRegular ? svgPaths.pe5fb800 : is16AndRegular ? svgPaths.pe2f400 : is20AndRegular ? svgPaths.p19631e80 : is24AndRegular ? svgPaths.p2567d200 : is28AndRegular ? svgPaths.p39f14800 : is48AndFilled ? svgPaths.p37b83500 : svgPaths.pc430400} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface MenuItemProps_Display {
  checkmark?: boolean;
  chevron?: boolean;
  endContent?: boolean;
  endContentString?: string;
  focus?: boolean;
  icon?: boolean;
  primaryString?: string;
  prop20PxFilled?: ReactNode | null;
  prop20PxRegular?: ReactNode | null;
  propSwitch?: boolean;
  secondaryString?: string;
  secondaryText?: boolean;
}

function MenuItem_Display({
  checkmark,
  chevron,
  endContent,
  endContentString,
  focus,
  icon,
  primaryString,
  prop20PxFilled,
  prop20PxRegular,
  propSwitch,
  secondaryString,
  secondaryText,
}: MenuItemProps_Display) {
  const [checked, setChecked] = React.useState(false);
  const [switchState, setSwitchState] = React.useState(false);

  return (
    <MenuItem
      checkmark={checkmark}
      checked={checked}
      chevron={chevron}
      endContent={endContent}
      endContentString={endContentString}
      focus={focus}
      icon={icon}
      primaryString={primaryString}
      prop20PxFilled={prop20PxFilled}
      prop20PxRegular={prop20PxRegular}
      propSwitch={propSwitch}
      secondaryString={secondaryString}
      secondaryText={secondaryText}
      onCheckedChange={(newChecked) => setChecked(newChecked)}
      onSwitchChange={(newSwitchState) => setSwitchState(newSwitchState)}
      onClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SaveFileMenuItem
export function SaveFileMenuItem() {
  return (
    <MenuItem_Display
      primaryString="Save File"
      endContent={true}
      endContentString="Ctrl+S"
      icon={true}
      chevron={false}
    />
  );
}

// @figmaExample WordWrapToggleMenuItem
export function WordWrapToggleMenuItem() {
  return (
    <MenuItem_Display
      checkmark={true}
      primaryString="Word Wrap"
      icon={false}
      chevron={false}
      endContent={false}
    />
  );
}

// @figmaExample OpenRecentSubmenuItem
export function OpenRecentSubmenuItem() {
  return (
    <MenuItem_Display
      primaryString="Open Recent"
      icon={true}
      chevron={true}
      endContent={true}
    />
  );
}

// @figmaExample NotificationsSwitchMenuItem
export function NotificationsSwitchMenuItem() {
  return (
    <MenuItem_Display
      primaryString="Enable Notifications"
      secondaryText={true}
      secondaryString="Get alerts for updates"
      propSwitch={true}
      icon={true}
    />
  );
}

// @figmaExample CopyWithFocusMenuItem
export function CopyWithFocusMenuItem() {
  return (
    <MenuItem_Display
      primaryString="Copy"
      endContent={true}
      endContentString="Ctrl+C"
      icon={true}
      chevron={false}
      focus={true}
    />
  );
}

// @figmaExample LineNumbersToggleMenuItem
export function LineNumbersToggleMenuItem() {
  return (
    <MenuItem_Display
      checkmark={true}
      primaryString="Show Line Numbers"
      secondaryText={true}
      secondaryString="Display line numbers in editor"
      icon={false}
      chevron={false}
      endContent={false}
    />
  );
}

// @figmaExample BasicSettingsMenuItem
export function BasicSettingsMenuItem() {
  return (
    <MenuItem_Display
      primaryString="Settings"
      icon={false}
      chevron={false}
      endContent={false}
    />
  );
}

// @figmaExample ExportSubmenuMenuItem
export function ExportSubmenuMenuItem() {
  return (
    <MenuItem_Display
      primaryString="Export"
      secondaryText={true}
      secondaryString="Export to various formats"
      icon={true}
      chevron={true}
      endContent={false}
    />
  );
}