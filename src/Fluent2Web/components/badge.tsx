import * as React from 'react';
import { ReactNode } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-ilmmgdee9l';

/**
 * A compact label component for displaying status, categories, or metadata. Appears as a rounded pill-shaped element with optional icons and text.
 * 
 * The badge automatically adjusts its size, color scheme, and icon placement based on the configured props. When an onClick handler is provided, the badge becomes interactive with keyboard support (Enter/Space) and visual cursor changes. The component uses Segoe UI Semibold font and maintains consistent spacing and alignment across all size variants.
 * 
 * Appears as a horizontally-centered pill/capsule shape with rounded ends that grows to fit its content. The badge has a minimum width equal to its height to maintain circular shape when no text is shown.
 */
export interface BadgeProps {
  className?: string; // Custom CSS classes to override default styling
  appearance?: "Filled" | "Tint" | "Outline" | "Subtle"; // Visual style variant (default: "Filled")
  color?: "Brand" | "Danger" | "Warning" | "Success" | "Important" | "Informative" | "Subtle"; // Color theme (default: "Brand")
  leftIcon?: boolean; // Show icon on the left side of text (default: true)
  onClick?: () => void; // Click handler that makes the badge interactive with button role and keyboard support
  prop12PxIconAfterRegular?: ReactNode | null; // Custom 12px icon to display after text (for Small/Medium sizes)
  prop12PxIconRegular?: ReactNode | null; // Custom 12px icon to display before text (for Small/Medium sizes)
  prop16PxIconAfterRegular?: ReactNode | null; // Custom 16px icon to display after text (for Large size)
  prop16PxIconRegular?: ReactNode | null; // Custom 16px icon to display before text (for Large size)
  prop20PxIconAfterRegular?: ReactNode | null; // Custom 20px icon to display after text (for Extra large size)
  prop20PxIconRegular?: ReactNode | null; // Custom 20px icon to display before text (for Extra large size)
  rightIcon?: boolean; // Show icon on the right side of text (default: false)
  showText?: boolean; // Display the text content (default: true)
  size?: "Extra large" | "Large" | "Medium" | "Small"; // Badge size variant, affects height and icon size (default: "Extra large")
  text?: string; // Text content to display in the badge (default: "Badge")
}

// ---------------------- Main Component ----------------------

export function Badge({ className, appearance = "Filled", color = "Brand", leftIcon = true, onClick, prop12PxIconAfterRegular = null, prop12PxIconRegular = null, prop16PxIconAfterRegular = null, prop16PxIconRegular = null, prop20PxIconAfterRegular = null, prop20PxIconRegular = null, rightIcon = false, showText = true, size = "Extra large", text = "Badge" }: BadgeProps) {
  const isBrandAndExtraLargeAndFilled = color === "Brand" && size === "Extra large" && appearance === "Filled";
  const isBrandAndExtraLargeAndOutline = color === "Brand" && size === "Extra large" && appearance === "Outline";
  const isBrandAndExtraLargeAndSubtle = color === "Brand" && size === "Extra large" && appearance === "Subtle";
  const isBrandAndExtraLargeAndTint = color === "Brand" && size === "Extra large" && appearance === "Tint";
  const isBrandAndLargeAndFilled = color === "Brand" && size === "Large" && appearance === "Filled";
  const isBrandAndMediumAndFilled = color === "Brand" && size === "Medium" && appearance === "Filled";
  const isBrandAndSmallAndFilled = color === "Brand" && size === "Small" && appearance === "Filled";
  const isDangerAndExtraLargeAndFilled = color === "Danger" && size === "Extra large" && appearance === "Filled";
  const isImportantAndExtraLargeAndFilled = color === "Important" && size === "Extra large" && appearance === "Filled";
  const isInformativeAndExtraLargeAndFilled = color === "Informative" && size === "Extra large" && appearance === "Filled";
  const isSubtleAndExtraLargeAndFilled = color === "Subtle" && size === "Extra large" && appearance === "Filled";
  const isSuccessAndExtraLargeAndFilled = color === "Success" && size === "Extra large" && appearance === "Filled";
  const isWarningAndExtraLargeAndFilled = color === "Warning" && size === "Extra large" && appearance === "Filled";
  
  const isInteractive = !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={className || `relative rounded-[9999px] ${isInteractive ? 'cursor-pointer' : ''} ${isBrandAndExtraLargeAndOutline || isBrandAndExtraLargeAndSubtle ? "h-[32px] min-w-[32px]" : isBrandAndExtraLargeAndTint ? "bg-[#ebf3fc] h-[32px] min-w-[32px]" : isBrandAndSmallAndFilled ? "bg-[#0f6cbd] h-[16px] min-w-[16px]" : isBrandAndMediumAndFilled ? "bg-[#0f6cbd] h-[20px] min-w-[20px]" : isBrandAndLargeAndFilled ? "bg-[#0f6cbd] h-[24px] min-w-[24px]" : isWarningAndExtraLargeAndFilled ? "bg-[#f7630c] h-[32px] min-w-[32px]" : isInformativeAndExtraLargeAndFilled || isSubtleAndExtraLargeAndFilled ? "bg-[#ebebeb] h-[32px] min-w-[32px]" : isImportantAndExtraLargeAndFilled ? "bg-[#242424] h-[32px] min-w-[32px]" : isSuccessAndExtraLargeAndFilled ? "bg-[#107c10] h-[32px] min-w-[32px]" : isDangerAndExtraLargeAndFilled ? "bg-[#c50f1f] h-[32px] min-w-[32px]" : "bg-[#0f6cbd] h-[32px] min-w-[32px]"}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? text : undefined}
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className={`content-stretch flex h-full items-center justify-center min-w-[inherit] overflow-clip relative ${isBrandAndSmallAndFilled ? "px-[2px]" : isBrandAndMediumAndFilled ? "px-[4px]" : isBrandAndLargeAndFilled ? "gap-[2px] px-[4px]" : "gap-[2px] px-[6px]"}`}>
          {(isBrandAndExtraLargeAndFilled || isDangerAndExtraLargeAndFilled || isSuccessAndExtraLargeAndFilled || isImportantAndExtraLargeAndFilled) && leftIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconRegular || <BadgePlaceholder />}
            </div>
          )}
          {(isBrandAndExtraLargeAndFilled || isDangerAndExtraLargeAndFilled || isSuccessAndExtraLargeAndFilled || isImportantAndExtraLargeAndFilled) && showText && <BadgeTextOffsetText text={text} additionalClassNames="h-[16px] pb-px" />}
          {(isBrandAndExtraLargeAndFilled || isDangerAndExtraLargeAndFilled || isSuccessAndExtraLargeAndFilled || isImportantAndExtraLargeAndFilled) && rightIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconAfterRegular || <BadgePlaceholder />}
            </div>
          )}
          {(isSubtleAndExtraLargeAndFilled || isWarningAndExtraLargeAndFilled) && leftIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconRegular || <BadgePlaceholder1 />}
            </div>
          )}
          {(isSubtleAndExtraLargeAndFilled || isWarningAndExtraLargeAndFilled) && showText && (
            <div className="content-stretch flex flex-col h-[16px] items-center justify-end pb-px px-[2px] relative shrink-0" data-name="Text offset">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] text-center whitespace-nowrap">
                <p className="leading-[16px]">{text}</p>
              </div>
            </div>
          )}
          {(isSubtleAndExtraLargeAndFilled || isWarningAndExtraLargeAndFilled) && rightIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconAfterRegular || <BadgePlaceholder1 />}
            </div>
          )}
          {(isBrandAndMediumAndFilled || isBrandAndSmallAndFilled) && leftIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop12PxIconRegular || <BadgePlaceholder2 />}
            </div>
          )}
          {(isBrandAndExtraLargeAndOutline || isBrandAndExtraLargeAndSubtle) && leftIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconRegular || <BadgePlaceholder3 />}
            </div>
          )}
          {(isBrandAndExtraLargeAndOutline || isBrandAndExtraLargeAndSubtle) && showText && (
            <div className="content-stretch flex flex-col h-[16px] items-center justify-end pb-px px-[2px] relative shrink-0" data-name="Text offset">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f6cbd] text-[12px] text-center whitespace-nowrap">
                <p className="leading-[16px]">{text}</p>
              </div>
            </div>
          )}
          {(isBrandAndExtraLargeAndOutline || isBrandAndExtraLargeAndSubtle) && rightIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconAfterRegular || <BadgePlaceholder3 />}
            </div>
          )}
          {isInformativeAndExtraLargeAndFilled && leftIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconRegular || <BadgePlaceholder4 />}
            </div>
          )}
          {isInformativeAndExtraLargeAndFilled && showText && (
            <div className="content-stretch flex flex-col h-[16px] items-center justify-end pb-px px-[2px] relative shrink-0" data-name="Text offset">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[12px] text-center whitespace-nowrap">
                <p className="leading-[16px]">{text}</p>
              </div>
            </div>
          )}
          {isInformativeAndExtraLargeAndFilled && rightIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconAfterRegular || <BadgePlaceholder4 />}
            </div>
          )}
          {isBrandAndLargeAndFilled && leftIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop16PxIconRegular || <BadgePlaceholder5 />}
            </div>
          )}
          {isBrandAndLargeAndFilled && showText && <BadgeTextOffsetText text={text} additionalClassNames="h-[16px] pb-px" />}
          {isBrandAndLargeAndFilled && rightIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop16PxIconAfterRegular || <BadgePlaceholder5 />}
            </div>
          )}
          {isBrandAndMediumAndFilled && showText && <BadgeTextOffsetText text={text} additionalClassNames="h-[14px]" />}
          {isBrandAndMediumAndFilled && rightIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop12PxIconAfterRegular || <BadgePlaceholder2 />}
            </div>
          )}
          {isBrandAndSmallAndFilled && showText && (
            <div className="content-stretch flex flex-col h-[14px] items-center justify-end pb-[0.5px] px-[2px] relative shrink-0" data-name="Text offset">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
                <p className="leading-[14px]">{text}</p>
              </div>
            </div>
          )}
          {isBrandAndSmallAndFilled && rightIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop12PxIconAfterRegular || <BadgePlaceholder2 />}
            </div>
          )}
          {isBrandAndExtraLargeAndTint && leftIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconRegular || <BadgePlaceholder6 />}
            </div>
          )}
          {isBrandAndExtraLargeAndTint && showText && (
            <div className="content-stretch flex flex-col h-[16px] items-center justify-end pb-px px-[2px] relative shrink-0" data-name="Text offset">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#115ea3] text-[12px] text-center whitespace-nowrap">
                <p className="leading-[16px]">{text}</p>
              </div>
            </div>
          )}
          {isBrandAndExtraLargeAndTint && rightIcon && (
            <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
              {prop20PxIconAfterRegular || <BadgePlaceholder6 />}
            </div>
          )}
        </div>
      </div>
      {(isBrandAndExtraLargeAndFilled || isBrandAndLargeAndFilled || isBrandAndMediumAndFilled || isBrandAndSmallAndFilled || isBrandAndExtraLargeAndTint || isBrandAndExtraLargeAndOutline) && <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[9999px] ${isBrandAndExtraLargeAndTint ? "border-[#b4d6fa]" : "border-[#0f6cbd]"}`} />}
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <Wrapper2>{children}</Wrapper2>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1>
      <div className="relative shrink-0 size-[16px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          {children}
        </svg>
      </div>
    </Wrapper1>
  );
}

function BadgePlaceholder6() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #115EA3)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

function BadgePlaceholder5() {
  return (
    <Wrapper1>
      <div className="relative shrink-0 size-[12px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path clipRule="evenodd" d={svgPaths.p31a9aa00} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
        </svg>
      </div>
    </Wrapper1>
  );
}

function BadgePlaceholder4() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #616161)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

function BadgePlaceholder3() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #0F6CBD)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

function BadgePlaceholder2() {
  return (
    <Wrapper1>
      <div className="relative shrink-0 size-[8px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path clipRule="evenodd" d={svgPaths.p18da8d00} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
        </svg>
      </div>
    </Wrapper1>
  );
}

function BadgePlaceholder1() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

type BadgeTextOffsetTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BadgeTextOffsetText({ text, additionalClassNames = "" }: BadgeTextOffsetTextProps) {
  return (
    <div className={clsx("content-stretch flex flex-col items-center justify-end px-[2px] relative shrink-0", additionalClassNames)}>
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

function BadgePlaceholder() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
    </Wrapper>
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
        <Wrapper2>
          <div className={`relative shrink-0 ${is12AndRegular || is12AndFilled ? "size-[8px]" : is16AndRegular ? "size-[12px]" : is20AndRegular ? "size-[16px]" : "size-[20px]"}`} data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is12AndRegular || is12AndFilled ? "0 0 8 8" : is16AndRegular ? "0 0 12 12" : is20AndRegular ? "0 0 16 16" : "0 0 20 20"}>
              <path clipRule="evenodd" d={is12AndRegular || is12AndFilled ? svgPaths.p18da8d00 : is16AndRegular ? svgPaths.p31a9aa00 : is20AndRegular ? svgPaths.pa51a700 : svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </Wrapper2>
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

interface BadgeProps_Display {
  appearance?: "Filled" | "Tint" | "Outline" | "Subtle";
  color?: "Brand" | "Danger" | "Warning" | "Success" | "Important" | "Informative" | "Subtle";
  leftIcon?: boolean;
  prop12PxIconAfterRegular?: ReactNode | null;
  prop12PxIconRegular?: ReactNode | null;
  prop16PxIconAfterRegular?: ReactNode | null;
  prop16PxIconRegular?: ReactNode | null;
  prop20PxIconAfterRegular?: ReactNode | null;
  prop20PxIconRegular?: ReactNode | null;
  rightIcon?: boolean;
  showText?: boolean;
  size?: "Extra large" | "Large" | "Medium" | "Small";
  text?: string;
}

function Badge_Display({
  appearance,
  color,
  leftIcon,
  prop12PxIconAfterRegular,
  prop12PxIconRegular,
  prop16PxIconAfterRegular,
  prop16PxIconRegular,
  prop20PxIconAfterRegular,
  prop20PxIconRegular,
  rightIcon,
  showText,
  size,
  text,
}: BadgeProps_Display) {
  return (
    <Badge
      appearance={appearance}
      color={color}
      leftIcon={leftIcon}
      prop12PxIconAfterRegular={prop12PxIconAfterRegular}
      prop12PxIconRegular={prop12PxIconRegular}
      prop16PxIconAfterRegular={prop16PxIconAfterRegular}
      prop16PxIconRegular={prop16PxIconRegular}
      prop20PxIconAfterRegular={prop20PxIconAfterRegular}
      prop20PxIconRegular={prop20PxIconRegular}
      rightIcon={rightIcon}
      showText={showText}
      size={size}
      text={text}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample BrandExtraLargeFilled
export function BrandExtraLargeFilled() {
  return (
    <Badge_Display
      appearance="Filled"
      color="Brand"
      text="Brand"
      size="Extra large"
    />
  );
}

// @figmaExample DangerLargeError
export function DangerLargeError() {
  return (
    <Badge_Display
      appearance="Filled"
      color="Danger"
      text="Error"
      size="Large"
      leftIcon={false}
    />
  );
}

// @figmaExample SuccessMediumCompleted
export function SuccessMediumCompleted() {
  return (
    <Badge_Display
      appearance="Filled"
      color="Success"
      text="Completed"
      size="Medium"
      leftIcon={true}
      prop12PxIconRegular={(
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M10.354 3.146a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 1 1 .708-.708L5 8.293l4.646-4.647a.5.5 0 0 1 .708 0z" />
        </svg>
      )}
    />
  );
}

// @figmaExample WarningSmallFilled
export function WarningSmallFilled() {
  return (
    <Badge_Display
      appearance="Filled"
      color="Warning"
      text="Warning"
      size="Small"
    />
  );
}

// @figmaExample BrandTintBeta
export function BrandTintBeta() {
  return (
    <Badge_Display
      appearance="Tint"
      color="Brand"
      text="Beta"
      size="Medium"
    />
  );
}

// @figmaExample InformativeOutlineInfo
export function InformativeOutlineInfo() {
  return (
    <Badge_Display
      appearance="Outline"
      color="Informative"
      text="Info"
      size="Medium"
      leftIcon={false}
    />
  );
}

// @figmaExample SubtleSmallDraft
export function SubtleSmallDraft() {
  return (
    <Badge_Display
      appearance="Subtle"
      color="Subtle"
      text="Draft"
      size="Small"
    />
  );
}

// @figmaExample ImportantSmallWithDropdown
export function ImportantSmallWithDropdown() {
  return (
    <Badge_Display
      appearance="Filled"
      color="Important"
      text="3"
      size="Small"
      leftIcon={false}
      rightIcon={true}
      prop12PxIconAfterRegular={(
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M3.147 5.146a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 0 0 .707 0l2.5-2.5a.5.5 0 0 0-.708-.708L6 7.293 3.854 5.146a.5.5 0 0 0-.707 0z" />
        </svg>
      )}
    />
  );
}