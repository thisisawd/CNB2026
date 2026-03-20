import * as React from 'react';
import { useState, ReactNode } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-y9p54dthll';

/**
 * A menu item component with split button functionality, allowing two separate clickable areas:
 * a main action area and a secondary split button area with a chevron icon.
 *
 * Appears as a horizontal rectangular element (default 240px wide × 32px min height) with rounded corners.
 * The main content area takes up most of the width and includes optional icon, text, and end content (like shortcuts).
 * A vertical divider separates the main area from a 25px-wide split button area on the right containing a chevron icon.
 *
 * Use this component when you need a menu item that has both a primary action and a secondary dropdown/split action.
 * The main area triggers the default action while the split button (with chevron) typically opens a submenu or additional options.
 * Common in context menus, dropdown menus, and command bars where items need dual functionality.
 */
export interface MenuSplitItemProps {
  className?: string; // Optional custom class name for the root element
  checkmark?: boolean; // When true, displays a checkmark icon when selected is true. The checkmark appears before the icon/text. (default: false)
  endContent?: boolean; // When true, displays the end content area (typically used for keyboard shortcuts) (default: true)
  endContentString?: string; // Text displayed in the end content area, typically keyboard shortcuts like "Ctrl+S" (default: "Shortcut text")
  focus?: boolean; // When true, displays a focus ring around the main content area (not the split button) (default: false)
  icon?: boolean; // When true, displays an icon before the text content (default: true)
  primaryString?: string; // The main text label for the menu item (default: "Action")
  prop20PxFilled?: ReactNode | null; // Custom icon to use in filled state (when selected/hover/pressed). If null, uses default document icon (default: null)
  prop20PxRegular?: ReactNode | null; // Custom icon to use in regular state (rest/disabled). If null, uses default document icon (default: null)
  secondaryString?: string; // Secondary text displayed below primary text when secondaryText is true (default: "Secondary content")
  secondaryText?: boolean; // When true, displays secondary text below the primary text in smaller font (default: false)
  sectionHeader?: "False"; // Currently only supports "False" value, controls header behavior
  selected?: boolean; // When true and checkmark is enabled, shows the checkmark. Also affects visual styling. (default: true)
  state?: "Rest" | "Rest (Checked only)" | "Hover" | "Pressed" | "Selected" | "Disabled" | "Disabled (Checked only)"; // Controls the visual state. Component also responds to actual hover/press interactions. Disabled states prevent interaction. (default: "Rest")
  onClick?: () => void; // Callback fired when the main content area is clicked (not the split button)
  onSplitClick?: () => void; // Callback fired when the split button (chevron area) is clicked
}

// ---------------------- Main Component ----------------------

export function MenuSplitItem({ className, checkmark = false, endContent = true, endContentString = "Shortcut text", focus = false, icon = true, primaryString = "Action", prop20PxFilled = null, prop20PxRegular = null, secondaryString = "Secondary content", secondaryText = false, sectionHeader = "False", selected = true, state = "Rest", onClick, onSplitClick }: MenuSplitItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isSplitHovering, setIsSplitHovering] = useState(false);
  const [isSplitPressed, setIsSplitPressed] = useState(false);

  // Determine the effective state based on props and internal state
  const isDisabled = state === "Disabled" || state === "Disabled (Checked only)";
  const effectiveState = isDisabled 
    ? state 
    : isPressed 
    ? "Pressed" 
    : isHovering 
    ? "Hover" 
    : state;

  const isFalseAndDisabled = sectionHeader === "False" && effectiveState === "Disabled";
  const isFalseAndDisabledCheckedOnly = sectionHeader === "False" && effectiveState === "Disabled (Checked only)";
  const isFalseAndHover = sectionHeader === "False" && effectiveState === "Hover";
  const isFalseAndPressed = sectionHeader === "False" && effectiveState === "Pressed";
  const isFalseAndRest = sectionHeader === "False" && effectiveState === "Rest";
  const isFalseAndRestCheckedOnly = sectionHeader === "False" && effectiveState === "Rest (Checked only)";
  const isFalseAndSelected = sectionHeader === "False" && effectiveState === "Selected";

  const handleMainClick = (e: React.MouseEvent) => {
    if (isDisabled) return;
    e.stopPropagation();
    onClick?.();
  };

  const handleSplitClick = (e: React.MouseEvent) => {
    if (isDisabled) return;
    e.stopPropagation();
    onSplitClick?.();
  };

  const handleMainMouseEnter = () => {
    if (!isDisabled) setIsHovering(true);
  };

  const handleMainMouseLeave = () => {
    setIsHovering(false);
    setIsPressed(false);
  };

  const handleMainMouseDown = () => {
    if (!isDisabled) setIsPressed(true);
  };

  const handleMainMouseUp = () => {
    setIsPressed(false);
  };

  const handleSplitMouseEnter = () => {
    if (!isDisabled) setIsSplitHovering(true);
  };

  const handleSplitMouseLeave = () => {
    setIsSplitHovering(false);
    setIsSplitPressed(false);
  };

  const handleSplitMouseDown = () => {
    if (!isDisabled) setIsSplitPressed(true);
  };

  const handleSplitMouseUp = () => {
    setIsSplitPressed(false);
  };

  return (
    <div className={className || `min-h-[32px] min-w-[120px] relative rounded-[4px] w-[240px] ${isFalseAndSelected ? "bg-[#ebebeb]" : isFalseAndPressed ? "bg-[#e0e0e0]" : isFalseAndHover ? "bg-[#f5f5f5]" : "bg-white"}`}>
      <div className="content-stretch flex gap-[4px] items-start min-h-[inherit] min-w-[inherit] relative w-full">
        <div 
          className="flex-[1_0_0] min-h-px min-w-px relative" 
          data-name="Item content"
          onClick={handleMainClick}
          onMouseEnter={handleMainMouseEnter}
          onMouseLeave={handleMainMouseLeave}
          onMouseDown={handleMainMouseDown}
          onMouseUp={handleMainMouseUp}
          style={{ cursor: isDisabled ? 'default' : 'pointer' }}
        >
          <div className="content-stretch flex gap-[4px] items-start pl-[6px] pr-[2px] py-[6px] relative w-full">
            {(isFalseAndHover || isFalseAndPressed || isFalseAndSelected) && checkmark && (
              <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Checkmark container">
                {selected && (
                  <MenuSplitItemCheckmark>
                    <path d={svgPaths.p35118f00} fill="var(--fill-0, #242424)" id="Shape" />
                  </MenuSplitItemCheckmark>
                )}
              </div>
            )}
            {(isFalseAndRest || isFalseAndRestCheckedOnly) && checkmark && (
              <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Checkmark container">
                {selected && (
                  <MenuSplitItemCheckmark>
                    <path d={svgPaths.p35118f00} fill="var(--fill-0, #424242)" id="Shape" />
                  </MenuSplitItemCheckmark>
                )}
              </div>
            )}
            {(isFalseAndRestCheckedOnly || isFalseAndSelected) &&
              icon &&
              (prop20PxFilled || (
                <MenuSplitItemImage>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #0F6CBD)" id="Shape" />
                </MenuSplitItemImage>
              ))}
            {(isFalseAndRestCheckedOnly || isFalseAndSelected) && (
              <Wrapper>
                {isFalseAndRestCheckedOnly && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#424242] text-[14px] w-full">
                    <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                  </div>
                )}
                {isFalseAndRestCheckedOnly && secondaryText && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#616161] text-[10px] w-full">
                    <p className="leading-[14px] whitespace-pre-wrap">{secondaryString}</p>
                  </div>
                )}
                {isFalseAndSelected && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#242424] text-[14px] w-full">
                    <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
                  </div>
                )}
                {isFalseAndSelected && secondaryText && (
                  <div className="flex flex-col justify-center relative shrink-0 text-[#424242] text-[10px] w-full">
                    <p className="leading-[14px] whitespace-pre-wrap">{secondaryString}</p>
                  </div>
                )}
              </Wrapper>
            )}
            {(isFalseAndDisabled || isFalseAndDisabledCheckedOnly) && checkmark && (
              <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Checkmark container">
                {selected && (
                  <MenuSplitItemCheckmark>
                    <path d={svgPaths.p35118f00} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                  </MenuSplitItemCheckmark>
                )}
              </div>
            )}
            {isFalseAndRest &&
              icon &&
              (prop20PxRegular || (
                <MenuSplitItemImage>
                  <path d={svgPaths.p19631e80} fill="var(--fill-0, #424242)" id="Shape" />
                </MenuSplitItemImage>
              ))}
            {isFalseAndRest && (
              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text container">
                <div className="flex flex-col justify-center size-full">
                  <MenuSplitItemHelper additionalClassNames="text-[#424242]" primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />
                </div>
              </div>
            )}
            {(isFalseAndRest || isFalseAndRestCheckedOnly) && endContent && (
              <div className="content-stretch flex items-center justify-end px-[2px] relative shrink-0" data-name="End content">
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[14px] text-right whitespace-nowrap">
                  <p className="leading-[20px]">{endContentString}</p>
                </div>
              </div>
            )}
            {isFalseAndHover &&
              icon &&
              (prop20PxFilled || (
                <MenuSplitItemImage>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #115EA3)" id="Shape" />
                </MenuSplitItemImage>
              ))}
            {isFalseAndHover && <MenuSplitItemTextContainer primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />}
            {(isFalseAndHover || isFalseAndSelected) && endContent && <MenuSplitItemEndContent endContentString={endContentString} />}
            {isFalseAndPressed &&
              icon &&
              (prop20PxFilled || (
                <MenuSplitItemImage>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #0F548C)" id="Shape" />
                </MenuSplitItemImage>
              ))}
            {isFalseAndPressed && <MenuSplitItemTextContainer primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />}
            {isFalseAndPressed && endContent && <MenuSplitItemEndContent endContentString={endContentString} />}
            {isFalseAndDisabled &&
              icon &&
              (prop20PxRegular || (
                <MenuSplitItemImage>
                  <path d={svgPaths.p19631e80} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                </MenuSplitItemImage>
              ))}
            {isFalseAndDisabled && <TextContainer primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />}
            {isFalseAndDisabled && endContent && <MenuSplitItemEndContent1 endContentString={endContentString} />}
            {isFalseAndDisabledCheckedOnly &&
              icon &&
              (prop20PxFilled || (
                <MenuSplitItemImage>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                </MenuSplitItemImage>
              ))}
            {isFalseAndDisabledCheckedOnly && <TextContainer primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />}
            {isFalseAndDisabledCheckedOnly && endContent && <MenuSplitItemEndContent1 endContentString={endContentString} />}
          </div>
        </div>
        <div 
          className={`max-w-[25px] min-w-[25px] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0 w-[25px] ${isSplitPressed ? "bg-[#e0e0e0]" : isSplitHovering ? "bg-[#f5f5f5]" : "bg-white"}`}
          data-name=".Item split button"
          onClick={handleSplitClick}
          onMouseEnter={handleSplitMouseEnter}
          onMouseLeave={handleSplitMouseLeave}
          onMouseDown={handleSplitMouseDown}
          onMouseUp={handleSplitMouseUp}
          style={{ cursor: isDisabled ? 'default' : 'pointer' }}
        >
          <div className="flex flex-row items-center justify-end max-w-[inherit] min-w-[inherit] size-full">
            <div className="content-stretch flex items-center justify-end max-w-[inherit] min-w-[inherit] px-[2px] py-[6px] relative size-full">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Chevron">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12.001px] left-[calc(50%+0.75px)] top-1/2 w-[6.499px]" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.49919 12.0008">
                    <path d={svgPaths.p154164f0} fill={isFalseAndDisabled || isFalseAndDisabledCheckedOnly ? "var(--fill-0, #BDBDBD)" : "var(--fill-0, #424242)"} id="Shape" />
                  </svg>
                </div>
              </div>
              <div className={`absolute bottom-[4px] left-0 top-[4px] w-px ${isFalseAndDisabled || isFalseAndDisabledCheckedOnly ? "bg-[#e0e0e0]" : "bg-[#d1d1d1]"}`} data-name="Divider" />
            </div>
          </div>
        </div>
        {(isFalseAndRest || isFalseAndRestCheckedOnly) && focus && (
          <div className="absolute inset-[0_26px_0_0] rounded-bl-[4px] rounded-tl-[4px]" data-name="Focus ring">
            <div className="overflow-clip relative rounded-[inherit] size-full">
              <div className="absolute border border-solid border-white inset-0 rounded-bl-[4px] rounded-tl-[4px]" data-name="Inner stroke" />
            </div>
            <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-bl-[6px] rounded-tl-[6px]" />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export function MenuSplitItemImage({ children }: React.PropsWithChildren<{}>) {
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

export function MenuSplitItemCheckmark({ children }: React.PropsWithChildren<{}>) {
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

export function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col font-['Segoe_UI:Regular',sans-serif] items-start justify-center leading-[0] not-italic px-[2px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

interface MenuSplitItemEndContent1Props {
  endContentString: string;
}

export function MenuSplitItemEndContent1({ endContentString }: MenuSplitItemEndContent1Props) {
  return (
    <div className="content-stretch flex items-center justify-end px-[2px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bdbdbd] text-[14px] text-right whitespace-nowrap">
        <p className="leading-[20px]">{endContentString}</p>
      </div>
    </div>
  );
}

interface TextContainerProps {
  primaryString: string;
  secondaryText: boolean;
  secondaryString: string;
  additionalClassNames?: string;
}

export function TextContainer({ primaryString, secondaryText, secondaryString, additionalClassNames = "" }: TextContainerProps) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <MenuSplitItemHelper additionalClassNames="text-[#bdbdbd]" primaryString={primaryString} secondaryText={secondaryText} secondaryString={secondaryString} />
      </div>
    </div>
  );
}

interface MenuSplitItemEndContentProps {
  endContentString: string;
}

export function MenuSplitItemEndContent({ endContentString }: MenuSplitItemEndContentProps) {
  return (
    <div className="content-stretch flex items-center justify-end px-[2px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] text-right whitespace-nowrap">
        <p className="leading-[20px]">{endContentString}</p>
      </div>
    </div>
  );
}

interface MenuSplitItemTextContainerProps {
  primaryString: string;
  secondaryText: boolean;
  secondaryString: string;
}

export function MenuSplitItemTextContainer({ primaryString, secondaryText, secondaryString }: MenuSplitItemTextContainerProps) {
  return (
    <Wrapper>
      <div className="flex flex-col justify-center relative shrink-0 text-[#242424] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">{primaryString}</p>
      </div>
      {secondaryText && (
        <div className="flex flex-col justify-center relative shrink-0 text-[#424242] text-[10px] w-full">
          <p className="leading-[14px] whitespace-pre-wrap">{secondaryString}</p>
        </div>
      )}
    </Wrapper>
  );
}

interface MenuSplitItemHelperProps {
  primaryString: string;
  secondaryText: boolean;
  secondaryString: string;
  additionalClassNames?: string;
}

export function MenuSplitItemHelper({ primaryString, secondaryText, secondaryString, additionalClassNames = "" }: MenuSplitItemHelperProps) {
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

interface ImageProps {
  className?: string;
  size?: "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
}

export function Image({ className, size = "48", theme = "Regular" }: ImageProps) {
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

interface MenuSplitItemProps_Display {
  checkmark?: boolean;
  endContent?: boolean;
  endContentString?: string;
  icon?: boolean;
  primaryString?: string;
  prop20PxFilled?: ReactNode | null;
  prop20PxRegular?: ReactNode | null;
  secondaryString?: string;
  secondaryText?: boolean;
  sectionHeader?: "False";
  selected?: boolean;
  state?: "Rest" | "Rest (Checked only)" | "Hover" | "Pressed" | "Selected" | "Disabled" | "Disabled (Checked only)";
}

function MenuSplitItem_Display({
  checkmark,
  endContent,
  endContentString,
  icon,
  primaryString,
  prop20PxFilled,
  prop20PxRegular,
  secondaryString,
  secondaryText,
  sectionHeader,
  selected,
  state,
}: MenuSplitItemProps_Display) {
  return (
    <MenuSplitItem
      checkmark={checkmark}
      endContent={endContent}
      endContentString={endContentString}
      icon={icon}
      primaryString={primaryString}
      prop20PxFilled={prop20PxFilled}
      prop20PxRegular={prop20PxRegular}
      secondaryString={secondaryString}
      secondaryText={secondaryText}
      sectionHeader={sectionHeader}
      selected={selected}
      state={state}
      onClick={() => {}}
      onSplitClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SaveDocumentMenuItem
export function SaveDocumentMenuItem() {
  return (
    <MenuSplitItem_Display
      primaryString="Save Document"
      endContentString="Ctrl+S"
      state="Rest"
      selected={false}
      checkmark={false}
      icon={true}
      endContent={true}
      secondaryText={false}
      sectionHeader="False"
    />
  );
}

// @figmaExample BoldMenuItemWithCheckmark
export function BoldMenuItemWithCheckmark() {
  return (
    <MenuSplitItem_Display
      primaryString="Bold"
      endContentString="Ctrl+B"
      state="Selected"
      selected={true}
      checkmark={true}
      icon={true}
      endContent={true}
      secondaryText={false}
      sectionHeader="False"
    />
  );
}

// @figmaExample ExportDocumentWithSecondaryText
export function ExportDocumentWithSecondaryText() {
  return (
    <MenuSplitItem_Display
      primaryString="Export Document"
      secondaryString="Save to external format"
      endContentString="Ctrl+E"
      state="Hover"
      selected={false}
      checkmark={false}
      icon={true}
      endContent={true}
      secondaryText={true}
      sectionHeader="False"
    />
  );
}

// @figmaExample DisabledPrintMenuItem
export function DisabledPrintMenuItem() {
  return (
    <MenuSplitItem_Display
      primaryString="Print"
      endContentString="Ctrl+P"
      state="Disabled"
      selected={false}
      checkmark={false}
      icon={true}
      endContent={true}
      secondaryText={false}
      sectionHeader="False"
    />
  );
}

// @figmaExample PressedFormatOptionsMenuItem
export function PressedFormatOptionsMenuItem() {
  return (
    <MenuSplitItem_Display
      primaryString="Format Options"
      state="Pressed"
      selected={false}
      checkmark={false}
      icon={true}
      endContent={false}
      secondaryText={false}
      sectionHeader="False"
    />
  );
}

// @figmaExample SimpleActionMenuItem
export function SimpleActionMenuItem() {
  return (
    <MenuSplitItem_Display
      primaryString="Simple Action"
      state="Rest"
      selected={false}
      checkmark={false}
      icon={false}
      endContent={false}
      secondaryText={false}
      sectionHeader="False"
    />
  );
}