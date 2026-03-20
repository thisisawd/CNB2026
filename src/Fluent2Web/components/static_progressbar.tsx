import * as React from 'react';
import { useEffect } from 'react';
import { imgTrack } from './svg-wp6aq';

/**
 * A horizontal progress indicator that displays task completion status or loading state.
 * Appears as a thin horizontal bar (2px or 4px height) with rounded ends, featuring a colored track
 * that fills from left to right against a light gray background.
 * 
 * Use this component to:
 * - Show determinate progress (0-100%) for tasks with known duration
 * - Display indeterminate loading states for tasks with unknown duration
 * - Provide visual feedback during file uploads, downloads, or multi-step processes
 * - Communicate status through color-coded states (success, error, warning)
 * 
 * Important notes:
 * - The value is automatically clamped between 0 and 100
 * - The onComplete callback fires when progress reaches 100% in determinate mode
 * - Includes proper ARIA attributes for accessibility
 */
export interface StaticProgressBarProps {
  className?: string; // Custom CSS classes to override default styling, including width
  size?: 'Medium (Default)' | 'Large'; // "Medium (Default)": 2px height bar for compact spaces, "Large": 4px height bar for more prominent display (default: 'Medium (Default)')
  state?: 'Default' | 'Success' | 'Error' | 'Warning'; // "Default": Blue progress track for standard operations, "Success": Green for completed successful operations, "Error": Red for failed operations, "Warning": Orange for operations requiring attention (default: 'Default')
  style?: 'Indeterminate' | 'Determinate'; // "Determinate": Shows specific progress percentage from 0-100%, "Indeterminate": Shows animated loading state for unknown duration tasks (default: 'Determinate')
  value?: number; // Progress percentage from 0-100, only applies to determinate style. Values outside this range are automatically clamped. (default: 80)
  onComplete?: () => void; // Callback function invoked when progress reaches 100% in determinate mode
}

// ---------------------- Main Component ----------------------

export function StaticProgressBar({ 
  className, 
  size = "Medium (Default)", 
  state = "Default", 
  style = "Determinate",
  value = 80,
  onComplete
}: StaticProgressBarProps) {
  const isDeterminateAndDefaultAndLarge = style === "Determinate" && state === "Default" && size === "Large";
  const isDeterminateAndErrorAndMediumDefault = style === "Determinate" && state === "Error" && size === "Medium (Default)";
  const isDeterminateAndSuccessAndMediumDefault = style === "Determinate" && state === "Success" && size === "Medium (Default)";
  const isDeterminateAndWarningAndMediumDefault = style === "Determinate" && state === "Warning" && size === "Medium (Default)";
  const isIndeterminateAndDefaultAndMediumDefault = style === "Indeterminate" && state === "Default" && size === "Medium (Default)";
  
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  
  // Calculate the padding-right based on progress value (for determinate style)
  const progressPaddingRight = style === "Determinate" ? `${100 - clampedValue}%` : undefined;
  
  // Fire onComplete callback when value reaches 100
  useEffect(() => {
    if (style === "Determinate" && clampedValue >= 100 && onComplete) {
      onComplete();
    }
  }, [clampedValue, style, onComplete]);
  
  return (
    <div 
      className={className || `bg-[#e6e6e6] relative rounded-[9999px] w-[492px] ${isDeterminateAndDefaultAndLarge ? "h-[4px]" : "h-[2px]"}`}
      role="progressbar"
      aria-valuenow={style === "Determinate" ? clampedValue : undefined}
      aria-valuemin={style === "Determinate" ? 0 : undefined}
      aria-valuemax={style === "Determinate" ? 100 : undefined}
      aria-label={style === "Indeterminate" ? "Loading" : `Progress: ${clampedValue}%`}
    >
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div 
        className={`content-stretch flex items-start relative size-full ${isIndeterminateAndDefaultAndMediumDefault ? "pr-[492px]" : isDeterminateAndSuccessAndMediumDefault ? "" : ""}`}
        style={style === "Determinate" && !isDeterminateAndSuccessAndMediumDefault ? { paddingRight: progressPaddingRight } : undefined}
      >
        <div className={`h-full rounded-[9999px] ${isIndeterminateAndDefaultAndMediumDefault ? "overflow-clip relative shrink-0 w-[164px]" : isDeterminateAndWarningAndMediumDefault ? "bg-[#da3b01] flex-[1_0_0] min-h-px min-w-px" : isDeterminateAndErrorAndMediumDefault ? "bg-[#c50f1f] flex-[1_0_0] min-h-px min-w-px relative" : isDeterminateAndSuccessAndMediumDefault ? "bg-[#107c10] flex-[1_0_0] min-h-px min-w-px" : "bg-[#0f6cbd] flex-[1_0_0] min-h-px min-w-px"}`} data-name="Track">
          {isDeterminateAndErrorAndMediumDefault && <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />}
          {isIndeterminateAndDefaultAndMediumDefault && <div className="absolute bg-[#0f6cbd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0%] mask-size-[100%_100%]" data-name="Track" style={{ maskImage: `url('${imgTrack}')` }} />}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface StaticProgressBarProps_Display {
  size?: 'Medium (Default)' | 'Large';
  state?: 'Default' | 'Success' | 'Error' | 'Warning';
  style?: 'Indeterminate' | 'Determinate';
  value?: number;
}

function StaticProgressBar_Display({
  size,
  state,
  style,
  value,
}: StaticProgressBarProps_Display) {
  return (
    <StaticProgressBar
      size={size}
      state={state}
      style={style}
      value={value}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample LowProgressDefaultMedium
export function ProgressBar30PercentDefault() {
  return (
    <StaticProgressBar_Display
      style="Determinate"
      value={30}
      state="Default"
      size="Medium (Default)"
    />
  );
}

// @figmaExample HighProgressDefaultMedium
export function ProgressBar75PercentDefault() {
  return (
    <StaticProgressBar_Display
      style="Determinate"
      value={75}
      state="Default"
      size="Medium (Default)"
    />
  );
}

// @figmaExample CompletedSuccessProgress
export function ProgressBarCompleteSuccess() {
  return (
    <StaticProgressBar_Display
      style="Determinate"
      value={100}
      state="Success"
      size="Medium (Default)"
    />
  );
}

// @figmaExample MidProgressError
export function ProgressBar45PercentError() {
  return (
    <StaticProgressBar_Display
      style="Determinate"
      value={45}
      state="Error"
      size="Medium (Default)"
    />
  );
}

// @figmaExample PartialProgressWarning
export function ProgressBar60PercentWarning() {
  return (
    <StaticProgressBar_Display
      style="Determinate"
      value={60}
      state="Warning"
      size="Medium (Default)"
    />
  );
}

// @figmaExample IndeterminateLoadingProgress
export function ProgressBarIndeterminate() {
  return (
    <StaticProgressBar_Display
      style="Indeterminate"
      state="Default"
      size="Medium (Default)"
    />
  );
}

// @figmaExample LargeProgressBar
export function ProgressBar80PercentLarge() {
  return (
    <StaticProgressBar_Display
      style="Determinate"
      value={80}
      state="Default"
      size="Large"
    />
  );
}

// @figmaExample LargeErrorProgress
export function ProgressBar50PercentErrorLarge() {
  return (
    <StaticProgressBar_Display
      style="Determinate"
      value={50}
      state="Error"
      size="Large"
    />
  );
}