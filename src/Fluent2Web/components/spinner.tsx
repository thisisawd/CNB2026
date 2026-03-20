import * as React from 'react';
import svgPaths from "./svg-2cpa9f0tmb";

/**
 * A loading indicator component that displays an animated circular spinner with an optional label.
 * Appears as a rotating circular indicator with customizable size and positioning relative to its label text.
 * The spinner is rendered as an SVG animation with a track and tail that creates a spinning effect.
 * Returns null and renders nothing when not in loading state.
 *
 * Useful for indicating background processes, data loading, form submissions, or any asynchronous operation
 * where users need visual feedback that work is in progress.
 */
export interface SpinnerProps {
  /** Custom CSS class for the container. Defaults to "relative" if not provided. */
  className?: string;

  /**
   * Controls the position of the label relative to the spinner.
   * - "Label after" (default): Spinner on left, label on right in horizontal layout
   * - "Label before": Label on left, spinner on right in horizontal layout
   * - "Label above": Label above spinner in vertical layout
   * - "Label below": Label below spinner in vertical layout
   */
  layout?: 'Label after' | 'Label before' | 'Label above' | 'Label below';

  /**
   * Controls the size of the spinner and associated text.
   * - "Extra-tiny" (default): 16px spinner with 14px regular text
   * - "Tiny": 20px spinner with 14px regular text
   * - "Extra-small": 24px spinner with 14px regular text
   * - "Small": 28px spinner with 14px regular text
   * - "Medium": 32px spinner with 16px semibold text
   * - "Large": 36px spinner with 16px semibold text
   * - "Extra-large": 40px spinner with 16px semibold text
   * - "Huge": 44px spinner with 20px semibold text
   */
  size?: 'Extra-tiny' | 'Tiny' | 'Extra-small' | 'Small' | 'Medium' | 'Large' | 'Extra-large' | 'Huge';

  /**
   * Visual style of the spinner.
   * - "Primary (Default)" (default): Blue spinner (#0F6CBD tail, #B4D6FA track) with dark text (#242424)
   * - "Subtle": White spinner with semi-transparent track and white text for use on colored backgrounds
   */
  style?: 'Primary (Default)' | 'Subtle';

  /**
   * Controls visibility of the entire spinner component.
   * When false, component returns null and nothing is rendered.
   * Default: true
   */
  isLoading?: boolean;

  /**
   * Text displayed alongside the spinner.
   * Position relative to spinner determined by layout prop.
   * Default: "Saving ..."
   */
  label?: string;
}

// ---------------------- Main Component ----------------------

export function Spinner({ 
  className, 
  layout = "Label after", 
  size = "Extra-tiny", 
  style = "Primary (Default)",
  isLoading = true,
  label = "Saving ..."
}: SpinnerProps) {
  // Don't render if not loading
  if (!isLoading) {
    return null;
  }

  const isLabelAboveAndPrimaryDefaultAndExtraTiny = layout === "Label above" && style === "Primary (Default)" && size === "Extra-tiny";
  const isLabelAfterAndPrimaryDefaultAndExtraLarge = layout === "Label after" && style === "Primary (Default)" && size === "Extra-large";
  const isLabelAfterAndPrimaryDefaultAndExtraSmall = layout === "Label after" && style === "Primary (Default)" && size === "Extra-small";
  const isLabelAfterAndPrimaryDefaultAndExtraTiny = layout === "Label after" && style === "Primary (Default)" && size === "Extra-tiny";
  const isLabelAfterAndPrimaryDefaultAndHuge = layout === "Label after" && style === "Primary (Default)" && size === "Huge";
  const isLabelAfterAndPrimaryDefaultAndLarge = layout === "Label after" && style === "Primary (Default)" && size === "Large";
  const isLabelAfterAndPrimaryDefaultAndMedium = layout === "Label after" && style === "Primary (Default)" && size === "Medium";
  const isLabelAfterAndPrimaryDefaultAndSmall = layout === "Label after" && style === "Primary (Default)" && size === "Small";
  const isLabelAfterAndPrimaryDefaultAndTiny = layout === "Label after" && style === "Primary (Default)" && size === "Tiny";
  const isLabelAfterAndSubtleAndExtraTiny = layout === "Label after" && style === "Subtle" && size === "Extra-tiny";
  const isLabelBeforeAndPrimaryDefaultAndExtraTiny = layout === "Label before" && style === "Primary (Default)" && size === "Extra-tiny";
  const isLabelBelowAndPrimaryDefaultAndExtraTiny = layout === "Label below" && style === "Primary (Default)" && size === "Extra-tiny";
  return (
    <div className={className || "relative"} role="status" aria-live="polite" aria-busy="true">
      <div className={`flex items-center size-full ${isLabelAboveAndPrimaryDefaultAndExtraTiny || isLabelBelowAndPrimaryDefaultAndExtraTiny ? "flex-col" : "flex-row"}`}>
        <div className={`content-stretch flex items-center relative ${isLabelAboveAndPrimaryDefaultAndExtraTiny || isLabelBelowAndPrimaryDefaultAndExtraTiny ? "flex-col" : ""}`}>
          {(isLabelAfterAndPrimaryDefaultAndTiny || isLabelAfterAndPrimaryDefaultAndExtraTiny || isLabelAfterAndSubtleAndExtraTiny || isLabelAfterAndPrimaryDefaultAndExtraSmall || isLabelAfterAndPrimaryDefaultAndSmall || isLabelAfterAndPrimaryDefaultAndMedium || isLabelAfterAndPrimaryDefaultAndLarge || isLabelAfterAndPrimaryDefaultAndExtraLarge || isLabelAfterAndPrimaryDefaultAndHuge || isLabelBelowAndPrimaryDefaultAndExtraTiny) && (
            <div className={`overflow-clip relative shrink-0 ${isLabelAfterAndPrimaryDefaultAndHuge ? "size-[44px]" : isLabelAfterAndPrimaryDefaultAndExtraLarge ? "size-[40px]" : isLabelAfterAndPrimaryDefaultAndLarge ? "size-[36px]" : isLabelAfterAndPrimaryDefaultAndMedium ? "rounded-[9999px] size-[32px]" : isLabelAfterAndPrimaryDefaultAndSmall ? "size-[28px]" : isLabelAfterAndPrimaryDefaultAndExtraSmall ? "size-[24px]" : isLabelAfterAndPrimaryDefaultAndExtraTiny || isLabelAfterAndSubtleAndExtraTiny || isLabelBelowAndPrimaryDefaultAndExtraTiny ? "size-[16px]" : "size-[20px]"}`} data-name=".SpinnerBase">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isLabelAfterAndPrimaryDefaultAndHuge ? "0 0 44 44" : isLabelAfterAndPrimaryDefaultAndExtraLarge ? "0 0 40 40" : isLabelAfterAndPrimaryDefaultAndLarge ? "0 0 36 36" : isLabelAfterAndPrimaryDefaultAndMedium ? "0 0 32 32" : isLabelAfterAndPrimaryDefaultAndSmall ? "0 0 28 28" : isLabelAfterAndPrimaryDefaultAndExtraSmall ? "0 0 24 24" : isLabelAfterAndPrimaryDefaultAndExtraTiny || isLabelAfterAndSubtleAndExtraTiny || isLabelBelowAndPrimaryDefaultAndExtraTiny ? "0 0 16 16" : "0 0 20 20"}>
                <path d={isLabelAfterAndPrimaryDefaultAndHuge ? svgPaths.p1339c200 : isLabelAfterAndPrimaryDefaultAndExtraLarge ? svgPaths.p13849b00 : isLabelAfterAndPrimaryDefaultAndLarge ? svgPaths.p108b0580 : isLabelAfterAndPrimaryDefaultAndMedium ? svgPaths.p2572de90 : isLabelAfterAndPrimaryDefaultAndSmall ? svgPaths.p3cb4340 : isLabelAfterAndPrimaryDefaultAndExtraSmall ? svgPaths.p3c234900 : isLabelAfterAndPrimaryDefaultAndExtraTiny || isLabelAfterAndSubtleAndExtraTiny || isLabelBelowAndPrimaryDefaultAndExtraTiny ? svgPaths.p26d11700 : svgPaths.p220bef80} fill={isLabelAfterAndSubtleAndExtraTiny ? "var(--fill-0, white)" : "var(--fill-0, #B4D6FA)"} fillOpacity={isLabelAfterAndSubtleAndExtraTiny ? "0.2" : undefined} id="Track" />
              </svg>
              <div className={`absolute left-1/2 top-1/2 ${isLabelAfterAndPrimaryDefaultAndHuge ? "bottom-[0.19%] right-[0.19%]" : isLabelAfterAndPrimaryDefaultAndExtraLarge ? "bottom-[0.13%] right-[0.13%]" : isLabelAfterAndPrimaryDefaultAndMedium ? "bottom-[0.21%] right-[0.21%]" : isLabelAfterAndPrimaryDefaultAndSmall ? "bottom-[0.11%] right-[0.11%]" : isLabelAfterAndPrimaryDefaultAndExtraSmall || isLabelAfterAndPrimaryDefaultAndLarge ? "bottom-[0.17%] right-[0.17%]" : "bottom-[0.23%] right-[0.23%]"}`}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isLabelAfterAndPrimaryDefaultAndHuge ? "0 0 21.9183 21.9183" : isLabelAfterAndPrimaryDefaultAndExtraLarge ? "0 0 19.9477 19.9477" : isLabelAfterAndPrimaryDefaultAndLarge ? "0 0 17.9401 17.9401" : isLabelAfterAndPrimaryDefaultAndMedium ? "0 0 15.9341 15.9341" : isLabelAfterAndPrimaryDefaultAndSmall ? "0 0 13.968 13.968" : isLabelAfterAndPrimaryDefaultAndExtraSmall ? "0 0 11.9601 11.9601" : isLabelAfterAndPrimaryDefaultAndExtraTiny || isLabelAfterAndSubtleAndExtraTiny || isLabelBelowAndPrimaryDefaultAndExtraTiny ? "0 0 7.96368 7.96368" : "0 0 9.9546 9.9546"}>
                  <path d={isLabelAfterAndPrimaryDefaultAndHuge ? svgPaths.p28d74500 : isLabelAfterAndPrimaryDefaultAndExtraLarge ? svgPaths.p17c7b700 : isLabelAfterAndPrimaryDefaultAndLarge ? svgPaths.p3958d3f0 : isLabelAfterAndPrimaryDefaultAndMedium ? svgPaths.p21162b00 : isLabelAfterAndPrimaryDefaultAndSmall ? svgPaths.p58c2230 : isLabelAfterAndPrimaryDefaultAndExtraSmall ? svgPaths.p369c8b00 : isLabelAfterAndPrimaryDefaultAndExtraTiny || isLabelAfterAndSubtleAndExtraTiny || isLabelBelowAndPrimaryDefaultAndExtraTiny ? svgPaths.p1d65d6c0 : svgPaths.p32ddd400} fill={isLabelAfterAndSubtleAndExtraTiny ? "var(--fill-0, white)" : "var(--fill-0, #0F6CBD)"} id="Tail" />
                </svg>
              </div>
            </div>
          )}
          <div className={`content-stretch flex items-start relative shrink-0 ${isLabelBelowAndPrimaryDefaultAndExtraTiny ? "justify-center pt-[8px]" : isLabelAboveAndPrimaryDefaultAndExtraTiny ? "justify-center pb-[8px]" : isLabelBeforeAndPrimaryDefaultAndExtraTiny ? "pr-[8px]" : "pl-[8px]"}`} data-name="Label">
            <p className={`not-italic relative shrink-0 ${isLabelAfterAndPrimaryDefaultAndHuge ? "font-['Segoe_UI:Semibold',sans-serif] leading-[28px] text-[#242424] text-[20px]" : isLabelAfterAndPrimaryDefaultAndMedium || isLabelAfterAndPrimaryDefaultAndLarge || isLabelAfterAndPrimaryDefaultAndExtraLarge ? "font-['Segoe_UI:Semibold',sans-serif] leading-[22px] text-[#242424] text-[16px]" : isLabelAfterAndSubtleAndExtraTiny ? "font-['Segoe_UI:Regular',sans-serif] leading-[20px] text-[14px] text-white" : "font-['Segoe_UI:Regular',sans-serif] leading-[20px] text-[#242424] text-[14px]"}`}>{label}</p>
          </div>
          {(isLabelBeforeAndPrimaryDefaultAndExtraTiny || isLabelAboveAndPrimaryDefaultAndExtraTiny) && (
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name=".SpinnerBase">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path d={svgPaths.p26d11700} fill="var(--fill-0, #B4D6FA)" id="Track" />
              </svg>
              <div className="absolute bottom-[0.23%] left-1/2 right-[0.23%] top-1/2">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.96368 7.96368">
                  <path d={svgPaths.p1d65d6c0} fill="var(--fill-0, #0F6CBD)" id="Tail" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface SpinnerProps_Display {
  layout?: 'Label after' | 'Label before' | 'Label above' | 'Label below';
  size?: 'Extra-tiny' | 'Tiny' | 'Extra-small' | 'Small' | 'Medium' | 'Large' | 'Extra-large' | 'Huge';
  style?: 'Primary (Default)' | 'Subtle';
  label?: string;
}

function Spinner_Display({
  layout,
  size,
  style,
  label,
}: SpinnerProps_Display) {
  return (
    <Spinner
      isLoading={true}
      layout={layout}
      size={size}
      style={style}
      label={label}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample ExtraTinyLoadingSpinner
export function ExtraTinyLoadingSpinner() {
  return (
    <Spinner_Display
      size="Extra-tiny"
      label="Loading..."
    />
  );
}

// @figmaExample SmallSavingChangesSpinner
export function SmallSavingChangesSpinner() {
  return (
    <Spinner_Display
      size="Small"
      layout="Label after"
      label="Saving changes..."
    />
  );
}

// @figmaExample MediumLabelBeforeSpinner
export function MediumLabelBeforeSpinner() {
  return (
    <Spinner_Display
      size="Medium"
      layout="Label before"
      label="Processing"
    />
  );
}

// @figmaExample LargeUploadingFilesSpinner
export function LargeUploadingFilesSpinner() {
  return (
    <Spinner_Display
      size="Large"
      layout="Label above"
      label="Uploading files"
    />
  );
}

// @figmaExample ExtraLargePleaseWaitSpinner
export function ExtraLargePleaseWaitSpinner() {
  return (
    <Spinner_Display
      size="Extra-large"
      layout="Label below"
      label="Please wait..."
    />
  );
}

// @figmaExample HugeLoadingDataSpinner
export function HugeLoadingDataSpinner() {
  return (
    <Spinner_Display
      size="Huge"
      layout="Label below"
      label="Loading data"
    />
  );
}

// @figmaExample MediumSubtleSyncingSpinner
export function MediumSubtleSyncingSpinner() {
  return (
    <Spinner_Display
      size="Medium"
      style="Subtle"
      layout="Label after"
      label="Syncing..."
    />
  );
}

// @figmaExample LargeSubtleUploadingSpinner
export function LargeSubtleUploadingSpinner() {
  return (
    <Spinner_Display
      size="Large"
      style="Subtle"
      layout="Label below"
      label="Uploading"
    />
  );
}