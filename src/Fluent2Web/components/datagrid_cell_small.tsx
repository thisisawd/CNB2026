import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-lavdb36bzh';
import imgRectangleCopy from 'figma:asset/80a3950c68c5fde7a5efd28ebc883243b313c51f.png';
import imgAvatarAvatar from 'figma:asset/1ca2b212726726ee9cfb52a97adb35738397e634.png';

/**
 * DataGridCellSmall
 * 
 * A versatile data grid cell component that supports multiple layouts including text display, links, 
 * checkboxes, radio buttons, and swappable content areas.
 * Appears as a rectangular cell with a light border at the bottom, typically 33px in height (or auto-height 
 * for multi-select). Width defaults to 200px for most layouts. Displays content with optional icons, avatars, 
 * or interactive elements based on the layout type. Shows a blue and white focus ring when focused.
 * 
 * IMPORTANT: This component manages its own internal state for checked/focus states, but also supports 
 * controlled state via props. The layout prop fundamentally changes the cell's behavior and appearance.
 */
export interface DataGridCellSmallProps {
  className?: string; // Custom CSS class for the container
  avatar24Px?: boolean; // Whether to show the 24px avatar in Text layouts. Only visible when layout is "Text" (default: true)
  content?: string; // The text content to display in Text layouts (default: "Content")
  focus?: boolean; // Controls the focus ring visibility (can be externally controlled) (default: false)
  icon20PxReg?: React.ReactNode | null; // Custom 20px icon to display. Pass a custom icon component or null to use default placeholder. Only visible in Text layouts when systemIcon is true (default: null)
  layout?: "Text" | "Link" | "Single select" | "Multi-select" | "Cell actions" | "Swappable"; // Layout type - "Text": Displays text content with optional icons/avatars (Primary or Secondary style), "Link": Displays an underlined blue link, "Single select": Shows a radio button, "Multi-select": Shows a checkbox, "Cell actions": Empty container, "Swappable": Shows a blue placeholder area (default: "Text")
  productIcon?: boolean; // Whether to show the product icon (folder) in Text layouts (default: true)
  productIcon24Px?: React.ReactNode | null; // Custom 24px product icon component. Pass null to use default folder icon (default: null)
  style?: "None" | "Primary" | "Secondary"; // "Primary": 14px text, darker color, more padding; "Secondary": 12px text, lighter color, less padding; "None": Used with Cell actions, Single select, and Multi-select layouts (default: "Primary")
  systemIcon?: boolean; // Whether to show the system icon in Text layouts (default: true)
  onClick?: () => void; // Click handler for the entire cell
  onLinkClick?: () => void; // Click handler specifically for Link layout
  onCheckedChange?: (checked: boolean) => void; // Callback when checkbox/radio state changes
  onFocus?: () => void; // Focus event handler
  onBlur?: () => void; // Blur event handler
  name?: string; // Name attribute for radio button groups (required for Single select layout)
  value?: string; // Value attribute for radio buttons
  checked?: boolean; // Controlled checked state for checkbox/radio (optional, component manages its own state if not provided)
}

type FolderProps = {
  className?: string;
  itemCount?: boolean;
  preview?: "None" | "Filled" | "Thumbnail";
  size?: "16" | "20" | "24" | "32" | "36" | "40" | "48" | "96" | "256";
  onClick?: () => void;
};

type PlaceholderProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

// ---------------------- Main Component ----------------------

export function DataGridCellSmall({ 
  className, 
  avatar24Px = true, 
  content = "Content", 
  focus = false, 
  icon20PxReg = null, 
  layout = "Text", 
  productIcon = true, 
  productIcon24Px = null, 
  style = "Primary", 
  systemIcon = true,
  onClick,
  onLinkClick,
  onCheckedChange,
  onFocus,
  onBlur,
  name,
  value,
  checked: controlledChecked
}: DataGridCellSmallProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const [internalFocus, setInternalFocus] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  const isFocused = focus || internalFocus;
  
  const isCellActionsAndNone = layout === "Cell actions" && style === "None";
  const isLinkAndPrimary = layout === "Link" && style === "Primary";
  const isMultiSelectAndNone = layout === "Multi-select" && style === "None";
  const isSingleSelectAndNone = layout === "Single select" && style === "None";
  const isSwappableAndPrimary = layout === "Swappable" && style === "Primary";
  const isTextAndPrimary = layout === "Text" && style === "Primary";
  const isTextAndSecondary = layout === "Text" && style === "Secondary";
  
  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setInternalChecked(newChecked);
    onCheckedChange?.(newChecked);
  };
  
  const handleRadioChange = () => {
    if (!isChecked) {
      setInternalChecked(true);
      onCheckedChange?.(true);
    }
  };
  
  const handleClick = () => {
    onClick?.();
  };
  
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLinkClick?.();
  };
  
  const handleFocus = () => {
    setInternalFocus(true);
    onFocus?.();
  };
  
  const handleBlur = () => {
    setInternalFocus(false);
    onBlur?.();
  };
  
  return (
    <div 
      className={className || `bg-[rgba(255,255,255,0)] relative ${isMultiSelectAndNone ? "" : isSingleSelectAndNone || isCellActionsAndNone ? "h-[33px]" : "w-[200px]"}`}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={onClick || isLinkAndPrimary || isMultiSelectAndNone || isSingleSelectAndNone ? 0 : undefined}
    >
      <div aria-hidden={isSingleSelectAndNone || isMultiSelectAndNone ? "true" : undefined} className={isCellActionsAndNone ? "content-stretch flex flex-col gap-[10px] h-full items-start pb-[5px] pt-[4px] relative" : isSingleSelectAndNone || isMultiSelectAndNone ? "absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" : isTextAndSecondary || isTextAndPrimary ? "content-stretch flex gap-[8px] items-start pl-[8px] pr-[16px] relative w-full" : isSwappableAndPrimary ? "content-stretch flex flex-col gap-[10px] items-start relative w-full" : "content-stretch flex flex-col gap-[10px] items-start pl-[8px] pr-[16px] relative w-full"}>
        {(isTextAndSecondary || isTextAndPrimary) && productIcon && (
          <div className="content-stretch flex items-center overflow-clip pb-[5px] pt-[4px] relative shrink-0" data-name="Product icon container">
            {productIcon24Px || <Folder className="relative shrink-0 size-[24px]" size="24" />}
          </div>
        )}
        {(isTextAndSecondary || isTextAndPrimary) && avatar24Px && (
          <div className="content-stretch flex items-center pb-[5px] pt-[4px] relative shrink-0" data-name="Avatar container">
            <div className="relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar/Avatar">
              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center relative size-full">
                  <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[24px]" data-name="Fill">
                    <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgAvatarAvatar} />
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {(isTextAndSecondary || isTextAndPrimary) && systemIcon && (
          <div className="content-stretch flex h-[33px] items-center overflow-clip pb-[6px] pt-[5px] relative shrink-0" data-name="Icon container">
            {icon20PxReg || (
              <div className="relative shrink-0" data-name="Placeholder">
                <Wrapper>
                  <DataGridCellSmallHelper>
                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                  </DataGridCellSmallHelper>
                </Wrapper>
              </div>
            )}
          </div>
        )}
        {(isTextAndSecondary || isTextAndPrimary) && (
          <div className={`content-stretch flex flex-[1_0_0] h-[33px] items-start min-h-px min-w-px overflow-clip relative ${isTextAndPrimary ? "pb-[8px] pt-[5px]" : "pb-[9px] pt-[8px]"}`} data-name="Content container">
            {isTextAndSecondary && (
              <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#424242] text-[12px] text-ellipsis whitespace-nowrap">
                <p className="leading-[16px] overflow-hidden">{content}</p>
              </div>
            )}
            {isTextAndPrimary && (
              <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[20px] overflow-hidden">{content}</p>
              </div>
            )}
          </div>
        )}
        {(isTextAndSecondary || isTextAndPrimary || isCellActionsAndNone) && isFocused && <DataGridCellSmallFocusRing />}
        {isLinkAndPrimary && (
          <div className="content-stretch flex h-[33px] items-start overflow-clip pb-[7px] pt-[5px] relative shrink-0 w-full" data-name="Link container">
            <a 
              href="#" 
              onClick={handleLinkClick}
              className="h-[21px] relative shrink-0" 
              data-name="Link"
            >
              <div className="content-stretch flex gap-[4px] h-full items-start relative">
                <div className="content-stretch flex flex-col items-start pb-[2px] relative shrink-0" data-name="Text">
                  <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#115ea3] text-[14px]">Link</p>
                  <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
                    <div aria-hidden="true" className="absolute border-[#115ea3] border-solid border-t inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}
        {isLinkAndPrimary && isFocused && <DataGridCellSmallFocusRing />}
        {isSwappableAndPrimary && <ContentPlaceholder className="bg-[#ebf3fc] h-[44px] relative shrink-0 w-full" />}
        {isSwappableAndPrimary && isFocused && <DataGridCellSmallFocusRing />}
      </div>
      <div aria-hidden={isLinkAndPrimary || isSwappableAndPrimary || isTextAndSecondary || isTextAndPrimary || isCellActionsAndNone ? "true" : undefined} className={isMultiSelectAndNone ? "content-stretch flex items-start pb-[9px] pl-[16px] pr-[8px] pt-[8px] relative" : isSingleSelectAndNone ? "content-stretch flex h-full items-start pb-[9px] pl-[16px] pr-[8px] pt-[8px] relative" : "absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none"}>
        {isSingleSelectAndNone && (
          <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="Radio container">
            <div className="relative shrink-0 size-[32px]" data-name="Radio">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2" data-name=".RadioBase">
                <label className="content-stretch flex items-start p-[8px] relative cursor-pointer">
                  <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={isChecked}
                    onChange={handleRadioChange}
                    className="sr-only"
                  />
                  <DataGridCellSmallHelper>
                    <circle cx="8" cy="8" id="Outer Circle" r="7.5" stroke="var(--stroke-0, #616161)" />
                    {isChecked && (
                      <circle cx="8" cy="8" r="4" fill="var(--fill-0, #0078D4)" />
                    )}
                  </DataGridCellSmallHelper>
                </label>
              </div>
            </div>
          </div>
        )}
        {isSingleSelectAndNone && isFocused && <DataGridCellSmallFocusRing />}
        {isMultiSelectAndNone && (
          <div className="relative shrink-0 size-[16px]" data-name="Checkbox container">
            <div className="absolute left-[-8px] top-[-8px]" data-name="Checkbox">
              <div className="content-stretch flex gap-[4px] items-start relative">
                <label className="content-stretch flex items-start p-[8px] relative shrink-0 cursor-pointer" data-name="Checkbox elements">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                  />
                  <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="Background" style={{ backgroundColor: isChecked ? '#0078D4' : 'transparent' }}>
                    <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[2px]" style={{ borderColor: isChecked ? '#0078D4' : '#616161' }} />
                    {isChecked && (
                      <svg className="absolute inset-0 size-full" viewBox="0 0 16 16" fill="none">
                        <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
        {isMultiSelectAndNone && isFocused && <DataGridCellSmallFocusRing />}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function FolderHelper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 84 54" className="block size-full">
      {children}
    </svg>
  );
}

function DataGridCellSmallHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
    </div>
  );
}

function FolderPath2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[53.13%_6.25%_18.75%_6.25%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 27">
        {children}
      </svg>
    </div>
  );
}

function FolderPath1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-[18.75%] left-[6.25%] right-[6.25%] top-1/4">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 224 144">
        {children}
      </svg>
    </div>
  );
}

function DataGridCellSmallFocusRing() {
  return (
    <div className="absolute inset-0">
      <div className="absolute border-2 border-black border-solid inset-0 rounded-[4px]" data-name="Border-outer" />
      <div className="absolute border border-solid border-white inset-[2px] rounded-[2px]" data-name="Border-inner" />
    </div>
  );
}

function FolderHelper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 40.5 7" className="block size-full">
      <path d={svgPaths.p157c8d00} fill="var(--fill-0, white)" id="Path" opacity="0.4" />
    </svg>
  );
}

function FolderPath() {
  return (
    <div className="absolute inset-[79.58%_7.08%_18.75%_7.08%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.401 1.602">
        <path d={svgPaths.p38cc5c80} fill="var(--fill-0, #BF5712)" id="Path" />
      </svg>
    </div>
  );
}

function Folder({ className, itemCount = false, preview = "None", size = "16", onClick }: FolderProps) {
  const is16AndNotItemCountAndNone = size === "16" && !itemCount && preview === "None";
  const is20AndNotItemCountAndNone = size === "20" && !itemCount && preview === "None";
  const is24AndNotItemCountAndNone = size === "24" && !itemCount && preview === "None";
  const is256AndNotItemCountAndFilled = size === "256" && !itemCount && preview === "Filled";
  const is256AndNotItemCountAndNone = size === "256" && !itemCount && preview === "None";
  const is32AndNotItemCountAndNone = size === "32" && !itemCount && preview === "None";
  const is36AndNotItemCountAndNone = size === "36" && !itemCount && preview === "None";
  const is40AndNotItemCountAndNone = size === "40" && !itemCount && preview === "None";
  const is48AndNotItemCountAndNone = size === "48" && !itemCount && preview === "None";
  const is96AndItemCountAndNone = size === "96" && itemCount && preview === "None";
  const is96AndNotItemCountAndNone = size === "96" && !itemCount && preview === "None";
  const is96AndNotItemCountAndThumbnail = size === "96" && !itemCount && preview === "Thumbnail";
  return (
    <div className={className || "relative"} onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined}>
      {(is96AndItemCountAndNone || is96AndNotItemCountAndNone || is48AndNotItemCountAndNone || is40AndNotItemCountAndNone || is32AndNotItemCountAndNone || is24AndNotItemCountAndNone || is20AndNotItemCountAndNone || is16AndNotItemCountAndNone || is256AndNotItemCountAndNone || is256AndNotItemCountAndFilled || is96AndNotItemCountAndThumbnail) && (
        <div className={`absolute ${is16AndNotItemCountAndNone ? "inset-[12.5%_0]" : is20AndNotItemCountAndNone ? "inset-[15%_5%]" : is24AndNotItemCountAndNone ? "inset-[16.67%_4.17%]" : is40AndNotItemCountAndNone ? "inset-[17.5%_5%]" : "inset-[18.75%_6.25%]"}`} data-name="Path">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is256AndNotItemCountAndNone || is256AndNotItemCountAndFilled ? "0 0 224 160" : is16AndNotItemCountAndNone ? "0 0 16 12" : is20AndNotItemCountAndNone ? "0 0 18 14" : is24AndNotItemCountAndNone ? "0 0 22 16" : is32AndNotItemCountAndNone ? "0 0 28 20" : is40AndNotItemCountAndNone ? "0 0 36 26" : is48AndNotItemCountAndNone ? "0 0 42 30" : "0 0 84 60"}>
            <path d={is256AndNotItemCountAndNone || is256AndNotItemCountAndFilled ? svgPaths.p3392efa0 : is16AndNotItemCountAndNone ? svgPaths.p11951a00 : is20AndNotItemCountAndNone ? svgPaths.p8983c10 : is24AndNotItemCountAndNone ? svgPaths.p2297f500 : is32AndNotItemCountAndNone ? svgPaths.p1d31000 : is40AndNotItemCountAndNone ? svgPaths.p2df67340 : is48AndNotItemCountAndNone ? svgPaths.p95f5780 : svgPaths.p21e0b00} fill="var(--fill-0, #FFB900)" id="Path" />
          </svg>
        </div>
      )}
      {(is96AndItemCountAndNone || is96AndNotItemCountAndNone || is48AndNotItemCountAndNone || is40AndNotItemCountAndNone || is32AndNotItemCountAndNone || is24AndNotItemCountAndNone || is20AndNotItemCountAndNone || is16AndNotItemCountAndNone || is256AndNotItemCountAndNone) && (
        <>
          <div className={`absolute top-1/4 ${is16AndNotItemCountAndNone ? "bottom-[12.5%] left-0 right-0" : is20AndNotItemCountAndNone ? "bottom-[15%] left-[5%] right-[5%]" : is24AndNotItemCountAndNone ? "bottom-[16.67%] left-[4.17%] right-[4.17%]" : is40AndNotItemCountAndNone ? "bottom-[17.5%] left-[5%] right-[5%]" : "bottom-[18.75%] left-[6.25%] right-[6.25%]"}`} data-name="Path">
            <FolderHelper1>
              <path d={is256AndNotItemCountAndNone ? svgPaths.p3787a700 : is16AndNotItemCountAndNone ? svgPaths.p2ec72b00 : is20AndNotItemCountAndNone ? svgPaths.p29b79000 : is24AndNotItemCountAndNone ? svgPaths.p143535c0 : is32AndNotItemCountAndNone ? svgPaths.p1355f710 : is40AndNotItemCountAndNone ? svgPaths.p1b75b200 : is48AndNotItemCountAndNone ? svgPaths.p299d2900 : svgPaths.p2035980} fill="var(--fill-0, #FFD75E)" id="Path" />
            </FolderHelper1>
          </div>
          <div className={`absolute top-1/4 ${is16AndNotItemCountAndNone ? "bottom-[12.5%] left-0 right-0" : is20AndNotItemCountAndNone ? "bottom-[15%] left-[5%] right-[5%]" : is24AndNotItemCountAndNone ? "bottom-[16.67%] left-[4.17%] right-[4.17%]" : is40AndNotItemCountAndNone ? "bottom-[17.5%] left-[5%] mix-blend-multiply right-[5%]" : "bottom-[18.75%] left-[6.25%] right-[6.25%]"}`} data-name="Path">
            <FolderHelper1>
              {(is96AndItemCountAndNone || is96AndNotItemCountAndNone || is48AndNotItemCountAndNone || is32AndNotItemCountAndNone || is24AndNotItemCountAndNone || is20AndNotItemCountAndNone || is16AndNotItemCountAndNone || is256AndNotItemCountAndNone) && (
                <>
                  <path d={is256AndNotItemCountAndNone ? svgPaths.p3787a700 : is16AndNotItemCountAndNone ? svgPaths.p2ec72b00 : is20AndNotItemCountAndNone ? svgPaths.p29b79000 : is24AndNotItemCountAndNone ? svgPaths.p143535c0 : is32AndNotItemCountAndNone ? svgPaths.p1355f710 : is48AndNotItemCountAndNone ? svgPaths.p17dd3800 : svgPaths.p2035980} fill={is256AndNotItemCountAndNone ? "url(#paint0_linear_0_265)" : is16AndNotItemCountAndNone ? "url(#paint0_linear_0_235)" : is20AndNotItemCountAndNone ? "url(#paint0_linear_0_298)" : is24AndNotItemCountAndNone ? "url(#paint0_linear_0_240)" : is32AndNotItemCountAndNone ? "url(#paint0_linear_0_293)" : is48AndNotItemCountAndNone ? "url(#paint0_linear_0_257)" : "url(#paint0_linear_0_287)"} id="Path" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id={is256AndNotItemCountAndNone ? "paint0_linear_0_265" : is16AndNotItemCountAndNone ? "paint0_linear_0_235" : is20AndNotItemCountAndNone ? "paint0_linear_0_298" : is24AndNotItemCountAndNone ? "paint0_linear_0_240" : is32AndNotItemCountAndNone ? "paint0_linear_0_293" : is48AndNotItemCountAndNone ? "paint0_linear_0_257" : "paint0_linear_0_287"} x1="0" x2="0" y1="0" y2={is256AndNotItemCountAndNone ? "144" : is16AndNotItemCountAndNone ? "10" : is20AndNotItemCountAndNone ? "12" : is24AndNotItemCountAndNone ? "14" : is32AndNotItemCountAndNone ? "18" : is48AndNotItemCountAndNone ? "27" : "54"}>
                      <stop stopColor="white" stopOpacity="0.01" />
                      <stop offset="0.999" stopColor="#FFD75E" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </>
              )}
              {is40AndNotItemCountAndNone && (
                <>
                  <g id="Path" style={{ mixBlendMode: "multiply" }}>
                    <path d={svgPaths.p1b75b200} fill="url(#paint0_linear_0_248)" />
                  </g>
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_248" x1="0" x2="0" y1="0" y2="23">
                      <stop stopColor="white" stopOpacity="0.01" />
                      <stop offset="1" stopColor="#FFD75E" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </>
              )}
            </FolderHelper1>
          </div>
        </>
      )}
      {(is96AndNotItemCountAndNone || is48AndNotItemCountAndNone || is40AndNotItemCountAndNone || is32AndNotItemCountAndNone || is24AndNotItemCountAndNone || is20AndNotItemCountAndNone || is16AndNotItemCountAndNone || is256AndNotItemCountAndNone) && (
        <>
          <div className={`absolute ${is256AndNotItemCountAndNone ? "inset-[79.68%_7.03%_18.75%_7.03%]" : is16AndNotItemCountAndNone ? "inset-[81.67%_0.17%_12.08%_0.17%]" : is20AndNotItemCountAndNone ? "inset-[80.33%_5.14%_14.67%_5.13%]" : is24AndNotItemCountAndNone ? "inset-[79.74%_5.1%_16.09%_5.1%]" : is32AndNotItemCountAndNone ? "inset-[78.56%_6.95%_18.32%_6.95%]" : is40AndNotItemCountAndNone ? "bottom-[65%] left-[5%] right-[48.67%] top-1/4" : is48AndNotItemCountAndNone ? "bottom-[66.67%] left-[6.25%] right-[51.04%] top-1/4" : "inset-[79.58%_7.08%_18.75%_7.08%]"}`} data-name="Path">
            {(is96AndNotItemCountAndNone || is48AndNotItemCountAndNone || is40AndNotItemCountAndNone || is256AndNotItemCountAndNone) && (
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is256AndNotItemCountAndNone ? "0 0 219.984 4.008" : is40AndNotItemCountAndNone ? "0 0 18.53 4.00013" : is48AndNotItemCountAndNone ? "0 0 20.5 4" : "0 0 82.401 1.602"}>
                <path d={is256AndNotItemCountAndNone ? svgPaths.p14bcaf40 : is40AndNotItemCountAndNone ? svgPaths.p33d33280 : is48AndNotItemCountAndNone ? svgPaths.p380b5800 : svgPaths.p38cc5c80} fill={is48AndNotItemCountAndNone || is40AndNotItemCountAndNone ? "var(--fill-0, white)" : "var(--fill-0, #BF5712)"} id="Path" opacity={is48AndNotItemCountAndNone || is40AndNotItemCountAndNone ? "0.4" : undefined} />
              </svg>
            )}
            {(is32AndNotItemCountAndNone || is24AndNotItemCountAndNone || is20AndNotItemCountAndNone || is16AndNotItemCountAndNone) && (
              <div className={`absolute ${is20AndNotItemCountAndNone || is16AndNotItemCountAndNone ? "inset-[6.65%_0]" : "inset-[13.85%_0]"}`}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is16AndNotItemCountAndNone ? "0 0 15.946 0.867" : is20AndNotItemCountAndNone ? "0 0 17.946 0.867" : is24AndNotItemCountAndNone ? "0 0 21.554 0.723" : "0 0 27.554 0.723"}>
                  <path d={is16AndNotItemCountAndNone ? svgPaths.p253ef970 : is20AndNotItemCountAndNone ? svgPaths.p2e1d5d80 : is24AndNotItemCountAndNone ? svgPaths.p9178c00 : svgPaths.pd6f9400} fill="var(--fill-0, #BF5712)" id="Path" />
                </svg>
              </div>
            )}
          </div>
          <div className={`absolute ${is256AndNotItemCountAndNone ? "bottom-[67.97%] left-[6.25%] right-[51.95%] top-1/4" : is16AndNotItemCountAndNone ? "bottom-[59.38%] left-0 right-[45.31%] top-1/4" : is20AndNotItemCountAndNone ? "bottom-[62.5%] left-[5%] right-[46.25%] top-1/4" : is24AndNotItemCountAndNone ? "bottom-[64.58%] left-[4.17%] right-[46.88%] top-1/4" : is32AndNotItemCountAndNone ? "bottom-[67.19%] left-[6.25%] right-[50.78%] top-1/4" : is40AndNotItemCountAndNone ? "inset-[78.92%_5.2%_17.5%_5.2%]" : is48AndNotItemCountAndNone ? "inset-[77.82%_6.58%_18.75%_6.58%]" : "bottom-[67.71%] left-[6.25%] right-[51.56%] top-1/4"}`} data-name="Path">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is256AndNotItemCountAndNone ? "0 0 107 18" : is16AndNotItemCountAndNone ? "0 0 8.75 2.5" : is20AndNotItemCountAndNone ? "0 0 9.75 2.5" : is24AndNotItemCountAndNone ? "0 0 11.75 2.5" : is32AndNotItemCountAndNone ? "0 0 13.75 2.5" : is40AndNotItemCountAndNone ? "0 0 35.84 1.43" : is48AndNotItemCountAndNone ? "0 0 41.68 1.647" : "0 0 40.5 7"}>
              <path d={is256AndNotItemCountAndNone ? svgPaths.p7b61500 : is16AndNotItemCountAndNone ? svgPaths.p174b1600 : is20AndNotItemCountAndNone ? svgPaths.p28fe2c0 : is24AndNotItemCountAndNone ? svgPaths.p3f0dbf40 : is32AndNotItemCountAndNone ? svgPaths.p1621a180 : is40AndNotItemCountAndNone ? svgPaths.p1cdcb700 : is48AndNotItemCountAndNone ? svgPaths.p3fe89c80 : svgPaths.p157c8d00} fill={is48AndNotItemCountAndNone || is40AndNotItemCountAndNone ? "var(--fill-0, #BF5712)" : "var(--fill-0, white)"} id="Path" opacity={is96AndNotItemCountAndNone || is32AndNotItemCountAndNone || is24AndNotItemCountAndNone || is20AndNotItemCountAndNone || is16AndNotItemCountAndNone || is256AndNotItemCountAndNone ? "0.4" : undefined} />
            </svg>
          </div>
        </>
      )}
      {(is256AndNotItemCountAndFilled || is96AndNotItemCountAndThumbnail) && <div className={`absolute bg-white ${is96AndNotItemCountAndThumbnail ? "inset-[28.13%_9.38%_20.83%_9.38%] rounded-[1px]" : "inset-[28.13%_9.38%_21.88%_9.38%] rounded-[2px]"}`} data-name="Rectangle" />}
      {is96AndItemCountAndNone && (
        <>
          <p className="absolute bottom-[38px] font-['Segoe_UI:Regular',sans-serif] h-[14px] leading-[normal] left-[12px] not-italic text-[#bf5712] text-[12px] translate-y-full w-[50px] whitespace-pre-wrap">0</p>
          <FolderPath />
          <div className="absolute bottom-[67.71%] left-[6.25%] right-[51.56%] top-1/4" data-name="Path">
            <FolderHelper />
          </div>
        </>
      )}
      {is256AndNotItemCountAndFilled && (
        <>
          <FolderPath1>
            <path d={svgPaths.p3787a700} fill="var(--fill-0, #FFD75E)" id="Path" />
          </FolderPath1>
          <FolderPath1>
            <path d={svgPaths.p3787a700} fill="url(#paint0_linear_0_265)" id="Path" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_265" x1="0" x2="0" y1="0" y2="144">
                <stop stopColor="white" stopOpacity="0.01" />
                <stop offset="0.999" stopColor="#FFD75E" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </FolderPath1>
          <div className="absolute inset-[79.68%_7.03%_18.75%_7.03%]" data-name="Path">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 219.984 4.008">
              <path d={svgPaths.p14bcaf40} fill="var(--fill-0, #BF5712)" id="Path" />
            </svg>
          </div>
          <div className="absolute bottom-[67.97%] left-[6.25%] right-[51.95%] top-1/4" data-name="Path">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 107 18">
              <path d={svgPaths.p7b61500} fill="var(--fill-0, white)" id="Path" opacity="0.4" />
            </svg>
          </div>
        </>
      )}
      {is96AndNotItemCountAndThumbnail && (
        <>
          <div className="absolute inset-[30.21%_11.46%_20.83%_11.46%]" data-name="Rectangle Copy">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangleCopy} />
          </div>
          <FolderPath2>
            <path d={svgPaths.p89a3af2} fill="var(--fill-0, #FFD75E)" id="Path" />
          </FolderPath2>
          <FolderPath2>
            <path d={svgPaths.p89a3af2} fill="url(#paint0_linear_0_246)" id="Path" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_246" x1="0" x2="0" y1="0" y2="27">
                <stop stopColor="white" stopOpacity="0.01" />
                <stop offset="0.999" stopColor="#FFD75E" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </FolderPath2>
          <FolderPath />
          <div className="absolute inset-[53.13%_51.56%_39.58%_6.25%]" data-name="Path">
            <FolderHelper />
          </div>
        </>
      )}
      {is36AndNotItemCountAndNone && (
        <div className="absolute inset-[16.67%_5.56%]" data-name="folder">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 24">
            <g id="folder">
              <path d={svgPaths.p20d20600} fill="var(--fill-0, #FFB900)" id="Path" />
              <path d={svgPaths.p29fa1280} fill="var(--fill-0, #FFD75E)" id="Path_2" />
              <path d={svgPaths.p29fa1280} fill="url(#paint0_linear_0_214)" id="Path_3" />
              <path d={svgPaths.p465c00} fill="var(--fill-0, white)" id="Path_4" opacity="0.4" />
              <path d={svgPaths.p36d5f000} fill="var(--fill-0, #BF5712)" id="Path_5" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_214" x1="0" x2="0" y1="3" y2="24">
                <stop stopColor="white" stopOpacity="0.01" />
                <stop offset="0.999" stopColor="#FFD75E" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
}

function ContentPlaceholder({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#ebf3fc] h-[44px] relative w-[250px]"} data-name="Content placeholder">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center relative size-full">
          <div className="content-stretch flex gap-[6px] h-[44px] items-center justify-center relative shrink-0 w-full" data-name="Container">
            <div className="relative shrink-0 size-[16px]" data-name="Arrow Swap">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-1/2 top-1/2 w-[10px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 13">
                  <path d={svgPaths.p3958af00} fill="var(--fill-0, #115EA3)" id="Shape" />
                </svg>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center pb-[2px] relative shrink-0" data-name="Text">
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#115ea3] text-[10px] text-center w-full whitespace-pre-wrap">SWAP AREA WITH YOUR COMPONENT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

interface DataGridCellSmallProps_Display {
  avatar24Px?: boolean;
  content?: string;
  icon20PxReg?: React.ReactNode | null;
  layout?: "Text" | "Link" | "Single select" | "Multi-select" | "Cell actions" | "Swappable";
  productIcon?: boolean;
  productIcon24Px?: React.ReactNode | null;
  style?: "None" | "Primary" | "Secondary";
  systemIcon?: boolean;
  name?: string;
  value?: string;
}

function DataGridCellSmall_Display({
  avatar24Px,
  content,
  icon20PxReg,
  layout,
  productIcon,
  productIcon24Px,
  style,
  systemIcon,
  name,
  value,
}: DataGridCellSmallProps_Display) {
  const [checked, setChecked] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  return (
    <DataGridCellSmall
      avatar24Px={avatar24Px}
      content={content}
      icon20PxReg={icon20PxReg}
      layout={layout}
      productIcon={productIcon}
      productIcon24Px={productIcon24Px}
      style={style}
      systemIcon={systemIcon}
      name={name}
      value={value}
      checked={checked}
      focus={focus}
      onCheckedChange={setChecked}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onClick={() => {}}
      onLinkClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DocumentCellWithAllIcons
export function DataGridCellSmallExample1() {
  return (
    <DataGridCellSmall_Display
      layout="Text"
      style="Primary"
      content="Document.pdf"
      productIcon={true}
      systemIcon={true}
      avatar24Px={true}
    />
  );
}

// @figmaExample ReportCellWithProductIcon
export function DataGridCellSmallExample2() {
  return (
    <DataGridCellSmall_Display
      layout="Text"
      style="Primary"
      content="Report 2024.xlsx"
      productIcon={true}
      systemIcon={false}
      avatar24Px={false}
    />
  );
}

// @figmaExample MetadataSecondaryCell
export function DataGridCellSmallExample3() {
  return (
    <DataGridCellSmall_Display
      layout="Text"
      style="Secondary"
      content="Metadata information"
      productIcon={false}
      systemIcon={false}
      avatar24Px={false}
    />
  );
}

// @figmaExample LinkCell
export function DataGridCellSmallExample4() {
  return (
    <DataGridCellSmall_Display
      layout="Link"
    />
  );
}

// @figmaExample RadioButtonCell
export function DataGridCellSmallExample5() {
  return (
    <DataGridCellSmall_Display
      layout="Single select"
      name="rowSelection"
      value="row1"
    />
  );
}

// @figmaExample CheckboxCell
export function DataGridCellSmallExample6() {
  return (
    <DataGridCellSmall_Display
      layout="Multi-select"
    />
  );
}

// @figmaExample EmptyCellActions
export function DataGridCellSmallExample7() {
  return (
    <DataGridCellSmall_Display
      layout="Cell actions"
    />
  );
}

// @figmaExample SwappableCell
export function DataGridCellSmallExample8() {
  return (
    <DataGridCellSmall_Display
      layout="Swappable"
    />
  );
}
