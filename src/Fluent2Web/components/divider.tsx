import * as React from 'react';
import clsx from 'clsx';
import svgPaths from './svg-2ram43c98q';

/**
 * A visual separator component that renders a horizontal or vertical line to divide content sections.
 * Appears as a thin gray line (#e0e0e0) that spans across its container. Can optionally include text and/or icon content positioned along the divider line.
 * 
 * Use this component to:
 * - Visually separate different sections of content in a layout
 * - Add labeled dividers with text or icons to provide context
 * - Create vertical separators between horizontal elements
 * - Organize form sections or list groups
 */
export interface DividerProps {
  /** Custom className to override default styling and dimensions. By default, horizontal dividers are 280px wide and vertical dividers are 84px tall. */
  className?: string;
  
  /** Controls whether content (text/icon) is displayed within the divider. Set to false for a simple line without any content. (default: true) */
  contentSlot?: boolean;
  
  /** Shows an icon in the divider content area when true. (default: false) */
  icon?: boolean;
  
  /** Controls the position of the content along the divider line. Only applies to horizontal dividers. (default: "Center (Default)") */
  layout?: 'Center (Default)' | 'Start' | 'End';
  
  /** Custom icon element to display. When null and icon is true, shows a default placeholder icon. (default: null) */
  prop20PxIcon?: React.ReactNode | null;
  
  /** Shows text in the divider content area when true. (default: true) */
  text?: boolean;
  
  /** The text content to display in the divider. (default: "Text") */
  textString?: string;
  
  /** Changes orientation to vertical when true. Vertical dividers ignore the layout property and always center content. (default: false) */
  vertical?: boolean;
}

// ---------------------- Main Component ----------------------

export function Divider({ className, contentSlot = true, icon = false, layout = "Center (Default)", prop20PxIcon = null, text = true, textString = "Text", vertical = false }: DividerProps) {
  const isCenterDefaultAndNotVertical = layout === "Center (Default)" && !vertical;
  const isCenterDefaultAndVertical = layout === "Center (Default)" && vertical;
  const isEndAndNotVertical = layout === "End" && !vertical;
  const isStartAndNotVertical = layout === "Start" && !vertical;
  return (
    <div className={className || `relative ${isCenterDefaultAndVertical ? "h-[84px]" : "w-[280px]"}`}>
      <div className={`flex items-center size-full ${isCenterDefaultAndVertical ? "flex-col justify-center" : "flex-row"}`}>
        <div className={`content-stretch flex items-center relative ${isCenterDefaultAndVertical ? "flex-col h-full justify-center" : "w-full"}`}>
          <div className={`bg-[#e0e0e0] ${isCenterDefaultAndVertical ? "flex-[1_0_0] min-h-px min-w-px w-px" : isStartAndNotVertical ? "h-px shrink-0 w-[8px]" : "flex-[1_0_0] h-px min-h-px min-w-px"}`} data-name="Divider line" />
          {(isCenterDefaultAndNotVertical || isStartAndNotVertical || isEndAndNotVertical) && contentSlot && <DividerContent additionalClassNames="h-[20px] px-[12px]" icon={icon} prop20PxIcon={prop20PxIcon} text={text} textString={textString} />}
          {(isCenterDefaultAndNotVertical || isStartAndNotVertical || isEndAndNotVertical) && <div className={`bg-[#e0e0e0] h-px ${isEndAndNotVertical ? "shrink-0 w-[8px]" : "flex-[1_0_0] min-h-px min-w-px"}`} data-name="Divider line" />}
          {isCenterDefaultAndVertical && contentSlot && <DividerContent additionalClassNames="py-[12px]" icon={icon} prop20PxIcon={prop20PxIcon} text={text} textString={textString} />}
          {isCenterDefaultAndVertical && <div className="bg-[#e0e0e0] flex-[1_0_0] min-h-px min-w-px w-px" data-name="Divider line" />}
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

type DividerContentProps = {
  icon: boolean;
  prop20PxIcon: any;
  text: boolean;
  textString: string;
  additionalClassNames?: string;
};

function DividerContent({ icon, prop20PxIcon, text, textString, additionalClassNames = "" }: DividerContentProps) {
  return (
    <div className={clsx("content-stretch flex gap-[6px] items-center justify-center relative shrink-0", additionalClassNames)}>
      {icon &&
        (prop20PxIcon || (
          <div className="relative shrink-0" data-name="Placeholder">
            <Wrapper>
              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                </svg>
              </div>
            </Wrapper>
          </div>
        ))}
      {text && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#424242] text-[12px]">{textString}</p>}
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

interface DividerProps_Display {
  contentSlot?: boolean;
  icon?: boolean;
  layout?: 'Center (Default)' | 'Start' | 'End';
  prop20PxIcon?: React.ReactNode | null;
  text?: boolean;
  textString?: string;
  vertical?: boolean;
}

function Divider_Display({
  contentSlot,
  icon,
  layout,
  prop20PxIcon,
  text,
  textString,
  vertical,
}: DividerProps_Display) {
  return (
    <Divider
      contentSlot={contentSlot}
      icon={icon}
      layout={layout}
      prop20PxIcon={prop20PxIcon}
      text={text}
      textString={textString}
      vertical={vertical}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SimpleDivider
export function SimpleDivider() {
  return (
    <Divider_Display
      contentSlot={false}
      textString="Simple Divider"
    />
  );
}

// @figmaExample CenteredTextDivider
export function CenteredTextDivider() {
  return (
    <Divider_Display
      contentSlot={true}
      text={true}
      textString="OR"
      layout="Center (Default)"
    />
  );
}

// @figmaExample StartAlignedDivider
export function StartAlignedDivider() {
  return (
    <Divider_Display
      contentSlot={true}
      text={true}
      textString="Section Start"
      layout="Start"
    />
  );
}

// @figmaExample EndAlignedDivider
export function EndAlignedDivider() {
  return (
    <Divider_Display
      contentSlot={true}
      text={true}
      textString="Section End"
      layout="End"
    />
  );
}

// @figmaExample DividerWithIcon
export function DividerWithIcon() {
  return (
    <Divider_Display
      contentSlot={true}
      text={true}
      icon={true}
      textString="With Icon"
      layout="Center (Default)"
    />
  );
}

// @figmaExample DividerWithCustomIcon
export function DividerWithCustomIcon() {
  return (
    <Divider_Display
      contentSlot={true}
      text={true}
      icon={true}
      textString="Custom Icon"
      layout="Center (Default)"
      prop20PxIcon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" fill="#4CAF50" />
          <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      }
    />
  );
}

// @figmaExample VerticalDivider
export function VerticalDivider() {
  return (
    <Divider_Display
      vertical={true}
      contentSlot={false}
    />
  );
}

// @figmaExample VerticalDividerWithText
export function VerticalDividerWithText() {
  return (
    <Divider_Display
      vertical={true}
      contentSlot={true}
      text={true}
      textString="V"
    />
  );
}