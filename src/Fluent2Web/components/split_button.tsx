import * as React from 'react';
import svgPaths from "./svg-8rolys85d4";

/**
 * A dual-action button component that combines a primary action with a secondary menu trigger.
 * Appears as a horizontally divided button with rounded corners - the left side contains an icon and/or label for the main action,
 * and the right side shows a chevron icon for additional options. The two sections are visually separated by a vertical border.
 * 
 * Use this when you want to provide a default action with quick access to related alternatives or additional options.
 * The primary button executes the main action immediately, while the secondary button (chevron) typically opens a menu or dropdown.
 */
export interface SplitButtonProps {
  className?: string; // Optional custom CSS classes for the container
  focus?: boolean; // Whether to show focus ring around the primary button (default: false)
  icon?: boolean; // Whether to display an icon in the primary button (default: true)
  label?: string; // Text label displayed in the button (default: "Text")
  layout?: "Icon and label (Default)" | "Icon only"; // "Icon and label (Default)": Shows both icon and text label, "Icon only": Shows only the icon (label becomes aria-label) (default: "Icon and label (Default)")
  onClick?: () => void; // Handler for primary button click
  onSecondaryClick?: () => void; // Handler for secondary button (chevron) click
  prop20PxFilled?: React.ReactNode | null; // Custom 20px filled icon for Selected state (default: null, uses placeholder)
  prop20PxRegular?: React.ReactNode | null; // Custom 20px regular icon for most states (default: null, uses placeholder)
  prop24PxRegular?: React.ReactNode | null; // Custom 24px regular icon for Large size (default: null, uses placeholder)
  size?: "Large" | "Medium (Default)" | "Small"; // "Small": 24px height, compact spacing, "Medium (Default)": 32px height, standard spacing, "Large": 40px height, larger text and icon (default: "Medium (Default)")
  state?: "Rest" | "Hover" | "Pressed" | "Selected" | "Disabled"; // "Rest": Default appearance, "Hover": Lighter background on hover, "Pressed": Darker background when pressed, "Selected": Slightly darker background for selected state (uses filled icon variant), "Disabled": Grayed out, non-interactive (blocks click handlers) (default: "Rest")
  style?: "Primary" | "Secondary (Default)" | "Outline" | "Subtle" | "Transparent"; // "Primary": Blue background (#0f6cbd) with white text/icons, "Secondary (Default)": White background with dark text, border, "Outline": Transparent background with border, "Subtle": Light background, subtle appearance, "Transparent": Fully transparent background (default: "Secondary (Default)")
}

// ---------------------- Main Component ----------------------

export function SplitButton({ className, focus = false, icon = true, label = "Text", layout = "Icon and label (Default)", onClick, onSecondaryClick, prop20PxFilled = null, prop20PxRegular = null, prop24PxRegular = null, size = "Medium (Default)", state = "Rest", style = "Secondary (Default)" }: SplitButtonProps) {
  const isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Outline" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Primary" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel = style === "Secondary (Default)" && state === "Disabled" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault = style === "Secondary (Default)" && state === "Hover" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel = style === "Secondary (Default)" && state === "Pressed" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault = style === "Secondary (Default)" && state === "Rest" && size === "Large" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Secondary (Default)" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly = style === "Secondary (Default)" && state === "Rest" && size === "Medium (Default)" && layout === "Icon only";
  const isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault = style === "Secondary (Default)" && state === "Rest" && size === "Small" && layout === "Icon and label (Default)";
  const isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel = style === "Secondary (Default)" && state === "Selected" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Subtle" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  const isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault = style === "Transparent" && state === "Rest" && size === "Medium (Default)" && layout === "Icon and label (Default)";
  
  const isDisabled = state === "Disabled";

  const handlePrimaryClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const handleSecondaryClick = () => {
    if (!isDisabled && onSecondaryClick) {
      onSecondaryClick();
    }
  };

  return (
    <div className={className || `relative ${isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault ? "max-h-[24px]" : isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault ? "max-h-[32px]" : "max-h-[40px]"}`} role="group">
      <div className="content-stretch flex items-start max-h-[inherit] relative">
        <button
          type="button"
          onClick={handlePrimaryClick}
          disabled={isDisabled}
          aria-label={layout === "Icon only" ? label : undefined}
          className={`content-stretch flex items-center justify-center relative rounded-bl-[4px] rounded-tl-[4px] shrink-0 border-0 cursor-pointer transition-colors ${isDisabled ? "cursor-not-allowed" : ""} ${isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault ? "bg-white gap-[4px] max-h-[24px] min-h-[24px] px-[8px] py-[2px] self-stretch" : isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault ? "bg-white gap-[6px] h-[32px] max-h-[32px] min-h-[32px] px-[12px] py-[6px]" : isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly ? "bg-white max-h-[32px] min-h-[32px] p-[6px] self-stretch" : isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault ? "bg-[#f5f5f5] gap-[6px] max-h-[32px] min-h-[32px] px-[12px] py-[6px] self-stretch" : isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel ? "bg-[#e0e0e0] gap-[6px] max-h-[32px] min-h-[32px] px-[12px] py-[6px] self-stretch" : isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel ? "bg-[#ebebeb] gap-[6px] max-h-[32px] min-h-[32px] px-[12px] py-[6px] self-stretch" : isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel ? "bg-[#f0f0f0] gap-[6px] max-h-[32px] min-h-[32px] px-[12px] py-[6px] self-stretch" : isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault ? "bg-[#0f6cbd] gap-[6px] h-[32px] max-h-[32px] min-h-[32px] px-[12px] py-[6px]" : isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault ? "bg-[rgba(255,255,255,0)] gap-[6px] h-[32px] max-h-[32px] min-h-[32px] px-[12px] py-[6px]" : "bg-white gap-[6px] max-h-[40px] min-h-[32px] px-[16px] py-[8px] self-stretch"}`}
          data-name="Primary action"
        >
          {(isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault) && <div aria-hidden="true" className={`absolute border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px] ${isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault ? "border border-[#c7c7c7]" : isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel ? "border border-[#b3b3b3]" : isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel ? "border border-[#bdbdbd]" : isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel ? "border border-[#e0e0e0]" : isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault ? "border-r border-white" : "border border-[#d1d1d1]"}`} />}
          {(isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault) && icon && (prop20PxRegular || <SplitButtonPlaceholder />)}
          {(isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault) && (
            <div className={`content-stretch flex relative shrink-0 ${isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly ? "items-start" : "items-center justify-center"}`} data-name="Container">
              {(isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault) && (
                <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                  {(isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault) && (
                    <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                      <p className="leading-[20px]">{label}</p>
                    </div>
                  )}
                  {isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault && (
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] whitespace-nowrap">
                      <p className="leading-[16px]">{label}</p>
                    </div>
                  )}
                </div>
              )}
              {isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly && (prop20PxRegular || <SplitButtonPlaceholder />)}
            </div>
          )}
          {(isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault) && focus && <SplitButtonFocusRing />}
          {(isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault) &&
            icon &&
            (prop20PxRegular || (
              <Wrapper>
                <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
              </Wrapper>
            ))}
          {(isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault) && (
            <SplitButtonContainer>
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{label}</p>
              </div>
            </SplitButtonContainer>
          )}
          {(isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault) && focus && <SplitButtonFocusRing />}
          {isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault &&
            icon &&
            (prop24PxRegular || (
              <Wrapper1>
                <div className="relative shrink-0 size-[20px]" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d={svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
                  </svg>
                </div>
              </Wrapper1>
            ))}
          {isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault && (
            <SplitButtonContainer>
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[16px] whitespace-nowrap">
                <p className="leading-[22px]">{label}</p>
              </div>
            </SplitButtonContainer>
          )}
          {isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault && focus && <SplitButtonFocusRing />}
          {isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault &&
            icon &&
            (prop20PxRegular || (
              <Wrapper>
                <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
              </Wrapper>
            ))}
          {isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault && (
            <SplitButtonContainer>
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                <p className="leading-[20px]">{label}</p>
              </div>
            </SplitButtonContainer>
          )}
          {isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault && focus && <SplitButtonFocusRing />}
          {isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel &&
            icon &&
            (prop20PxRegular || (
              <Wrapper>
                <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #BDBDBD)" fillRule="evenodd" id="Shape" />
              </Wrapper>
            ))}
          {isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel && (
            <SplitButtonContainer>
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bdbdbd] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{label}</p>
              </div>
            </SplitButtonContainer>
          )}
          {isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel &&
            icon &&
            (prop20PxFilled || (
              <Wrapper>
                <path clipRule="evenodd" d={svgPaths.p30769300} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
              </Wrapper>
            ))}
          {isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel && (
            <SplitButtonContainer>
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{label}</p>
              </div>
            </SplitButtonContainer>
          )}
        </button>
        <button
          type="button"
          onClick={handleSecondaryClick}
          disabled={isDisabled}
          aria-label="More options"
          className={`max-h-[32px] max-w-[24px] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0 border-0 cursor-pointer transition-colors ${isDisabled ? "cursor-not-allowed" : ""} ${isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel ? "bg-[#f0f0f0]" : isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault ? "bg-[#0f6cbd]" : isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault ? "bg-[rgba(255,255,255,0)]" : "bg-white"}`}
          data-name=".Secondary action"
        >
          <div aria-hidden={isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault ? "true" : undefined} className={isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel ? "absolute border-[#e0e0e0] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" : isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault ? "absolute border-0 border-solid border-white inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" : isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault ? "flex flex-row items-center justify-center max-h-[inherit] max-w-[inherit] size-full" : "absolute border-[#d1d1d1] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]"}>
            {(isTransparentAndRestAndMediumDefaultAndIconAndLabelDefault || isSubtleAndRestAndMediumDefaultAndIconAndLabelDefault) && (
              <div className="content-stretch flex h-full items-center justify-center max-h-[inherit] max-w-[inherit] px-[6px] relative">
                <SplitButtonChevron>
                  <path d={svgPaths.p2e2fea80} fill="var(--fill-0, #424242)" id="Shape" />
                </SplitButtonChevron>
              </div>
            )}
          </div>
          {(isSecondaryDefaultAndRestAndLargeAndIconAndLabelDefault || isOutlineAndRestAndMediumDefaultAndIconAndLabelDefault || isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndSelectedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndPressedAndMediumDefaultAndIconAndLabel || isSecondaryDefaultAndHoverAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndMediumDefaultAndIconOnly || isSecondaryDefaultAndRestAndMediumDefaultAndIconAndLabelDefault || isSecondaryDefaultAndRestAndSmallAndIconAndLabelDefault) && (
            <div className="flex flex-row items-center justify-center max-h-[inherit] max-w-[inherit] size-full">
              <div className="content-stretch flex h-full items-center justify-center max-h-[inherit] max-w-[inherit] px-[6px] relative">
                <div className="content-stretch flex items-center justify-center pr-px relative shrink-0 w-[12px]" data-name="Container for offset">
                  <SplitButtonChevron>
                    <path d={svgPaths.p2e2fea80} fill={isSecondaryDefaultAndDisabledAndMediumDefaultAndIconAndLabel ? "var(--fill-0, #BDBDBD)" : isPrimaryAndRestAndMediumDefaultAndIconAndLabelDefault ? "var(--fill-0, white)" : "var(--fill-0, #242424)"} id="Shape" />
                  </SplitButtonChevron>
                </div>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function SplitButtonContainer({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
        {children}
      </div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
    </div>
  );
}

function SplitButtonChevron({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.5px] left-1/2 top-[calc(50%+0.75px)] w-[8px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4.5">
          {children}
        </svg>
      </div>
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

function SplitButtonFocusRing() {
  return (
    <div className="absolute inset-[0_2px_0_0] rounded-bl-[4px] rounded-tl-[4px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute border border-solid border-white inset-0 rounded-bl-[4px] rounded-tl-[4px]" data-name="Inner stroke" />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-bl-[6px] rounded-tl-[6px]" />
    </div>
  );
}

function SplitButtonPlaceholder() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
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

interface SplitButtonProps_Display {
  icon?: boolean;
  label?: string;
  layout?: "Icon and label (Default)" | "Icon only";
  prop20PxFilled?: React.ReactNode | null;
  prop20PxRegular?: React.ReactNode | null;
  prop24PxRegular?: React.ReactNode | null;
  size?: "Large" | "Medium (Default)" | "Small";
  state?: "Rest" | "Hover" | "Pressed" | "Selected" | "Disabled";
  style?: "Primary" | "Secondary (Default)" | "Outline" | "Subtle" | "Transparent";
}

function SplitButton_Display({
  icon,
  label,
  layout,
  prop20PxFilled,
  prop20PxRegular,
  prop24PxRegular,
  size,
  state,
  style,
}: SplitButtonProps_Display) {
  return (
    <SplitButton
      icon={icon}
      label={label}
      layout={layout}
      prop20PxFilled={prop20PxFilled}
      prop20PxRegular={prop20PxRegular}
      prop24PxRegular={prop24PxRegular}
      size={size}
      state={state}
      style={style}
      onClick={() => {}}
      onSecondaryClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SaveSecondaryButton
export function SaveSecondaryButton() {
  return (
    <SplitButton_Display
      label="Save"
      style="Secondary (Default)"
      size="Medium (Default)"
      state="Rest"
      layout="Icon and label (Default)"
    />
  );
}

// @figmaExample SendPrimaryLargeButton
export function SendPrimaryLargeButton() {
  return (
    <SplitButton_Display
      label="Send"
      style="Primary"
      size="Large"
      state="Rest"
      layout="Icon and label (Default)"
    />
  );
}

// @figmaExample ActionOutlineSmallButton
export function ActionOutlineSmallButton() {
  return (
    <SplitButton_Display
      label="Action"
      style="Outline"
      size="Small"
      state="Rest"
      layout="Icon and label (Default)"
    />
  );
}

// @figmaExample ExportSubtleHoverButton
export function ExportSubtleHoverButton() {
  return (
    <SplitButton_Display
      label="Export"
      style="Subtle"
      size="Medium (Default)"
      state="Hover"
      layout="Icon and label (Default)"
    />
  );
}

// @figmaExample SelectedItemSecondaryButton
export function SelectedItemSecondaryButton() {
  return (
    <SplitButton_Display
      label="Selected Item"
      style="Secondary (Default)"
      size="Medium (Default)"
      state="Selected"
      layout="Icon and label (Default)"
    />
  );
}

// @figmaExample MoreTransparentIconOnlyButton
export function MoreTransparentIconOnlyButton() {
  return (
    <SplitButton_Display
      label="More"
      style="Transparent"
      size="Medium (Default)"
      state="Rest"
      layout="Icon only"
    />
  );
}

// @figmaExample DisabledPrimaryButton
export function DisabledPrimaryButton() {
  return (
    <SplitButton_Display
      label="Disabled"
      style="Primary"
      size="Medium (Default)"
      state="Disabled"
      layout="Icon and label (Default)"
    />
  );
}