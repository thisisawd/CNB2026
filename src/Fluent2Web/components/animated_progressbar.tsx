import * as React from 'react';
import { useState, useEffect } from 'react';
import { imgTrack } from './svg-g8ct1';

/**
 * AnimatedProgressBar
 * 
 * A progress indicator component that displays task completion or loading state.
 * Appears as a horizontal rounded pill (9999px border radius) with a light gray background (#e6e6e6) and blue fill (#0f6cbd) that grows from left to right. The bar is typically 492px wide and either 2px or 4px tall depending on size.
 * 
 * Supports two main modes:
 * - Determinate: Shows specific progress percentage (0-100%) with a growing blue fill
 * - Indeterminate: Shows animated loading state with gradient animation effects
 * 
 * Can be used in controlled mode (with value prop) or uncontrolled mode (manages its own state).
 * 
 * IMPORTANT: When using determinate mode with a controlled value, the component automatically calculates the status based on the value ("Not started" at 0, "Complete" at 100, "99% complete" at 99, "In progress" otherwise). The status prop is ignored in this case.
 */
export interface AnimatedProgressBarProps {
  className?: string; // Optional custom className to override default styles and dimensions
  size?: 'Medium (Default)' | 'Large'; // "Medium (Default)": 2px height, "Large": 4px height
  state?: 'Default' | 'Success' | 'Error' | 'Warning'; // Affects the visual state/color scheme of the progress bar
  status?: 'Not started' | 'In progress' | 'Complete' | 'After' | 'Before' | 'Gradient after' | 'Gradient before' | '99% complete'; // The current status of the progress (ignored in determinate mode with controlled value). Primarily used for indeterminate animations ("Before", "After", "Gradient before", "Gradient after")
  style?: 'Indeterminate' | 'Determinate'; // "Determinate" (default): Shows specific progress percentage, "Indeterminate": Shows animated loading state
  value?: number; // Progress value from 0-100 for determinate mode. When provided, makes the component controlled.
  onChange?: (value: number) => void; // Callback fired when the progress value changes
  onComplete?: () => void; // Callback fired when progress reaches 100%
}

// ---------------------- Main Component ----------------------

export function AnimatedProgressBar({ 
  className, 
  size = "Medium (Default)", 
  state = "Default", 
  status = "Not started", 
  style = "Determinate",
  value: controlledValue,
  onChange,
  onComplete
}: AnimatedProgressBarProps) {
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState(0);
  
  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  // Determine status based on value for determinate mode
  const computedStatus = style === "Determinate" && controlledValue !== undefined
    ? value === 0 
      ? "Not started" 
      : value >= 100 
      ? "Complete" 
      : value >= 99 
      ? "99% complete" 
      : "In progress"
    : status;
  
  // Update internal value (for demo/uncontrolled usage)
  const updateValue = (newValue: number) => {
    const clampedValue = Math.max(0, Math.min(100, newValue));
    
    if (controlledValue === undefined) {
      setInternalValue(clampedValue);
    }
    
    onChange?.(clampedValue);
    
    // Trigger onComplete callback when reaching 100%
    if (clampedValue >= 100 && value < 100) {
      onComplete?.();
    }
  };
  
  // Expose updateValue method through component (for demo purposes)
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue >= 100 && value < 100) {
      onComplete?.();
    }
  }, [controlledValue]);
  
  const isDeterminateAndLargeAndDefaultAndNotStarted = style === "Determinate" && size === "Large" && state === "Default" && computedStatus === "Not started";
  const isDeterminateAndMediumDefaultAndDefaultAndComplete = style === "Determinate" && size === "Medium (Default)" && state === "Default" && computedStatus === "Complete";
  const isDeterminateAndMediumDefaultAndDefaultAndInProgress = style === "Determinate" && size === "Medium (Default)" && state === "Default" && computedStatus === "In progress";
  const isDeterminateAndMediumDefaultAndDefaultAndNotStarted = style === "Determinate" && size === "Medium (Default)" && state === "Default" && computedStatus === "Not started";
  const isDeterminateAndMediumDefaultAndErrorAndNotStarted = style === "Determinate" && size === "Medium (Default)" && state === "Error" && computedStatus === "Not started";
  const isDeterminateAndMediumDefaultAndSuccessAnd99Complete = style === "Determinate" && size === "Medium (Default)" && state === "Success" && computedStatus === "99% complete";
  const isDeterminateAndMediumDefaultAndSuccessAndNotStarted = style === "Determinate" && size === "Medium (Default)" && state === "Success" && computedStatus === "Not started";
  const isDeterminateAndMediumDefaultAndWarningAndNotStarted = style === "Determinate" && size === "Medium (Default)" && state === "Warning" && computedStatus === "Not started";
  const isIndeterminateAndMediumDefaultAndDefaultAndAfter = style === "Indeterminate" && size === "Medium (Default)" && state === "Default" && computedStatus === "After";
  const isIndeterminateAndMediumDefaultAndDefaultAndBefore = style === "Indeterminate" && size === "Medium (Default)" && state === "Default" && computedStatus === "Before";
  const isIndeterminateAndMediumDefaultAndDefaultAndGradientAfter = style === "Indeterminate" && size === "Medium (Default)" && state === "Default" && computedStatus === "Gradient after";
  const isIndeterminateAndMediumDefaultAndDefaultAndGradientBefore = style === "Indeterminate" && size === "Medium (Default)" && state === "Default" && computedStatus === "Gradient before";
  
  // Calculate width based on value for determinate progress
  const progressWidth = style === "Determinate" ? `${value}%` : '100%';
  
  return (
    <div 
      className={className || `bg-[#e6e6e6] relative rounded-[9999px] ${isDeterminateAndLargeAndDefaultAndNotStarted ? "h-[4px] w-[492px]" : isDeterminateAndMediumDefaultAndSuccessAnd99Complete ? "h-[2px] w-[491px]" : "h-[2px] w-[492px]"}`}
      role="progressbar"
      aria-valuenow={style === "Determinate" ? value : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div aria-hidden={isDeterminateAndMediumDefaultAndDefaultAndInProgress || isDeterminateAndMediumDefaultAndDefaultAndComplete || isDeterminateAndMediumDefaultAndSuccessAnd99Complete ? "true" : undefined} className={isIndeterminateAndMediumDefaultAndDefaultAndGradientBefore || isIndeterminateAndMediumDefaultAndDefaultAndBefore || isIndeterminateAndMediumDefaultAndDefaultAndGradientAfter || isIndeterminateAndMediumDefaultAndDefaultAndAfter ? "content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full" : isDeterminateAndMediumDefaultAndDefaultAndInProgress || isDeterminateAndMediumDefaultAndDefaultAndComplete || isDeterminateAndMediumDefaultAndSuccessAnd99Complete ? "absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" : "content-stretch flex items-start overflow-clip pr-[492px] relative rounded-[inherit] size-full"}>
        {(isDeterminateAndMediumDefaultAndDefaultAndNotStarted || isDeterminateAndMediumDefaultAndSuccessAndNotStarted || isDeterminateAndMediumDefaultAndErrorAndNotStarted || isDeterminateAndMediumDefaultAndWarningAndNotStarted || isDeterminateAndLargeAndDefaultAndNotStarted || isIndeterminateAndMediumDefaultAndDefaultAndGradientBefore || isIndeterminateAndMediumDefaultAndDefaultAndBefore || isIndeterminateAndMediumDefaultAndDefaultAndGradientAfter || isIndeterminateAndMediumDefaultAndDefaultAndAfter) && (
          <div className={`absolute rounded-[9999px] top-0 ${isIndeterminateAndMediumDefaultAndDefaultAndAfter ? "bottom-0 opacity-0 overflow-clip right-[-164px] w-[164px]" : isIndeterminateAndMediumDefaultAndDefaultAndGradientAfter ? "bottom-0 overflow-clip right-0 w-[164px]" : isIndeterminateAndMediumDefaultAndDefaultAndBefore ? "bottom-0 left-[-164px] opacity-0 overflow-clip w-[164px]" : isIndeterminateAndMediumDefaultAndDefaultAndGradientBefore ? "bottom-0 left-0 overflow-clip w-[164px]" : isDeterminateAndLargeAndDefaultAndNotStarted ? "bg-[#0f6cbd] h-[4px] left-[-1px] w-px" : "bg-[#0f6cbd] h-[2px] left-[-1px] w-px"}`} data-name="Track">
            {(isIndeterminateAndMediumDefaultAndDefaultAndGradientBefore || isIndeterminateAndMediumDefaultAndDefaultAndBefore || isIndeterminateAndMediumDefaultAndDefaultAndGradientAfter || isIndeterminateAndMediumDefaultAndDefaultAndAfter) && <div className="absolute bg-[#0f6cbd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0%] mask-size-[100%_100%]" data-name="Track" style={{ maskImage: `url('${imgTrack}')` }} />}
          </div>
        )}
      </div>
      <div aria-hidden={isDeterminateAndMediumDefaultAndDefaultAndNotStarted || isDeterminateAndMediumDefaultAndSuccessAndNotStarted || isDeterminateAndMediumDefaultAndErrorAndNotStarted || isDeterminateAndMediumDefaultAndWarningAndNotStarted || isDeterminateAndLargeAndDefaultAndNotStarted || isIndeterminateAndMediumDefaultAndDefaultAndGradientBefore || isIndeterminateAndMediumDefaultAndDefaultAndBefore || isIndeterminateAndMediumDefaultAndDefaultAndGradientAfter || isIndeterminateAndMediumDefaultAndDefaultAndAfter ? "true" : undefined} className={isDeterminateAndMediumDefaultAndDefaultAndComplete || isDeterminateAndMediumDefaultAndSuccessAnd99Complete ? "content-stretch flex items-start relative size-full" : isDeterminateAndMediumDefaultAndDefaultAndInProgress ? "content-stretch flex items-start pr-[100px] relative size-full" : "absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]"} style={{ width: style === "Determinate" && (isDeterminateAndMediumDefaultAndDefaultAndInProgress || isDeterminateAndMediumDefaultAndDefaultAndComplete || isDeterminateAndMediumDefaultAndSuccessAnd99Complete) ? progressWidth : undefined }}>
        {(isDeterminateAndMediumDefaultAndDefaultAndInProgress || isDeterminateAndMediumDefaultAndDefaultAndComplete || isDeterminateAndMediumDefaultAndSuccessAnd99Complete) && <div className="bg-[#0f6cbd] flex-[1_0_0] h-full min-h-px min-w-px rounded-[9999px]" data-name="Track" />}
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface AnimatedProgressBarProps_Display {
  className?: string;
  size?: 'Medium (Default)' | 'Large';
  state?: 'Default' | 'Success' | 'Error' | 'Warning';
  status?: 'Not started' | 'In progress' | 'Complete' | 'After' | 'Before' | 'Gradient after' | 'Gradient before' | '99% complete';
  style?: 'Indeterminate' | 'Determinate';
  value?: number;
}

function AnimatedProgressBar_Display({
  className,
  size,
  state,
  status,
  style,
  value,
}: AnimatedProgressBarProps_Display) {
  return (
    <AnimatedProgressBar
      className={className}
      size={size}
      state={state}
      status={status}
      style={style}
      value={value}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DeterminateMediumDefaultNotStarted
export function AnimatedProgressBarExample1() {
  return (
    <AnimatedProgressBar_Display
      style="Determinate"
      size="Medium (Default)"
      state="Default"
      value={0}
    />
  );
}

// @figmaExample DeterminateMediumDefaultInProgress
export function AnimatedProgressBarExample2() {
  return (
    <AnimatedProgressBar_Display
      style="Determinate"
      size="Medium (Default)"
      state="Default"
      value={45}
    />
  );
}

// @figmaExample DeterminateMediumDefault99Percent
export function AnimatedProgressBarExample3() {
  return (
    <AnimatedProgressBar_Display
      style="Determinate"
      size="Medium (Default)"
      state="Default"
      value={99}
    />
  );
}

// @figmaExample DeterminateLargeDefaultComplete
export function AnimatedProgressBarExample4() {
  return (
    <AnimatedProgressBar_Display
      style="Determinate"
      size="Large"
      state="Default"
      value={100}
    />
  );
}

// @figmaExample DeterminateLargeSuccessComplete
export function AnimatedProgressBarExample5() {
  return (
    <AnimatedProgressBar_Display
      style="Determinate"
      size="Large"
      state="Success"
      value={100}
    />
  );
}

// @figmaExample DeterminateMediumErrorPartialProgress
export function AnimatedProgressBarExample6() {
  return (
    <AnimatedProgressBar_Display
      style="Determinate"
      size="Medium (Default)"
      state="Error"
      value={65}
    />
  );
}

// @figmaExample DeterminateMediumWarningPartialProgress
export function AnimatedProgressBarExample7() {
  return (
    <AnimatedProgressBar_Display
      style="Determinate"
      size="Medium (Default)"
      state="Warning"
      value={75}
    />
  );
}

// @figmaExample IndeterminateLargeGradientAfter
export function AnimatedProgressBarExample8() {
  return (
    <AnimatedProgressBar_Display
      style="Indeterminate"
      size="Large"
      status="Gradient after"
    />
  );
}