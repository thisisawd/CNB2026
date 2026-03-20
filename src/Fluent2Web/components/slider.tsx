import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * A horizontal range input control that allows users to select a numeric value by dragging a thumb along a rail.
 * Appears as a horizontal bar with a filled track indicating the current value and a circular draggable thumb. 
 * The slider takes up the full width of its container (default 120px) and has a height of 24px. 
 * Includes visual feedback for hover, pressed, focus, and disabled states.
 *
 * The component supports both controlled and uncontrolled modes. When the `value` prop is provided, 
 * it operates in controlled mode and requires an `onChange` handler to update the value. 
 * When `value` is not provided, it manages its own internal state (starting at 50).
 *
 * Keyboard navigation is fully supported:
 * - Arrow keys (Up/Right): Increase by step
 * - Arrow keys (Down/Left): Decrease by step  
 * - Home: Jump to minimum
 * - End: Jump to maximum
 * - PageUp: Increase by 10% of range
 * - PageDown: Decrease by 10% of range
 */
export interface SliderProps {
  className?: string; // Optional custom class name for the slider container. Defaults to "relative rounded-[2px] w-[120px]" if not provided.
  size?: "Medium (Default)" | "Small"; // Controls the size of the slider. Medium has a 4px rail/track and 18px thumb, while Small has a 2px rail/track and 14px thumb. Default is "Medium (Default)".
  ticks?: boolean; // Whether to show tick marks along the slider rail. When enabled, displays 5 evenly spaced tick marks. Default is false.
  value?: number; // Optional controlled value for the slider. When provided, the component operates in controlled mode and the value must be updated via the onChange callback. When omitted, the component manages its own state (starting at 50).
  min?: number; // Minimum value of the slider range. Default is 0.
  max?: number; // Maximum value of the slider range. Default is 100.
  step?: number; // The increment/decrement step size when using keyboard controls or dragging. The value will be rounded to the nearest step. Default is 1.
  disabled?: boolean; // When true, the slider is non-interactive and appears in a muted gray color scheme. The thumb becomes non-draggable and keyboard navigation is disabled. Default is false.
  onChange?: (value: number) => void; // Callback fired when the slider value changes, either through mouse drag or keyboard input. Receives the new value as an argument. The value will already be clamped to min/max and rounded to the nearest step.
}

// ---------------------- Main Component ----------------------

export function Slider({ 
  className, 
  size = "Medium (Default)", 
  ticks = false,
  value: controlledValue,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? 50);
  const value = controlledValue ?? internalValue;
  
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Determine visual state
  const state = disabled ? "Disabled" : isFocused ? "Focus" : isPressed ? "Pressed" : isHovered ? "Hover" : "Rest";

  const isMediumDefaultAndDisabled = size === "Medium (Default)" && state === "Disabled";
  const isMediumDefaultAndFocus = size === "Medium (Default)" && state === "Focus";
  const isMediumDefaultAndHover = size === "Medium (Default)" && state === "Hover";
  const isMediumDefaultAndPressed = size === "Medium (Default)" && state === "Pressed";
  const isMediumDefaultAndRest = size === "Medium (Default)" && state === "Rest";
  const isSmallAndRest = size === "Small" && state === "Rest";

  // Calculate percentage for positioning
  const percentage = ((value - min) / (max - min)) * 100;

  const updateValue = useCallback((newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    const finalValue = Math.max(min, Math.min(max, steppedValue));
    
    if (finalValue !== value) {
      if (controlledValue === undefined) {
        setInternalValue(finalValue);
      }
      onChange?.(finalValue);
    }
  }, [min, max, step, value, controlledValue, onChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !railRef.current || disabled) return;
    
    const rect = railRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
    const newValue = min + percentage * (max - min);
    updateValue(newValue);
  }, [min, max, updateValue, disabled]);

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsPressed(false);
    }
  }, []);

  useEffect(() => {
    if (isDragging.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    isDragging.current = true;
    setIsPressed(true);
    
    if (railRef.current) {
      const rect = railRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
      const newValue = min + percentage * (max - min);
      updateValue(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    let handled = false;
    const largeStep = (max - min) / 10;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        updateValue(value + step);
        handled = true;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        updateValue(value - step);
        handled = true;
        break;
      case 'Home':
        updateValue(min);
        handled = true;
        break;
      case 'End':
        updateValue(max);
        handled = true;
        break;
      case 'PageUp':
        updateValue(value + largeStep);
        handled = true;
        break;
      case 'PageDown':
        updateValue(value - largeStep);
        handled = true;
        break;
    }
    
    if (handled) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className={className || "relative rounded-[2px] w-[120px]"}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => !disabled && setIsFocused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-disabled={disabled}
    >
      <div aria-hidden={isMediumDefaultAndFocus ? "true" : undefined} className={isMediumDefaultAndFocus ? "absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[4px]" : "content-stretch flex flex-col items-start relative w-full"}>
        {(isMediumDefaultAndRest || isMediumDefaultAndHover || isMediumDefaultAndPressed || isMediumDefaultAndDisabled || isSmallAndRest) && (
          <div className="content-stretch flex flex-col h-[24px] items-start justify-center relative rounded-[2px] shrink-0 w-full" data-name="Slider-container">
            <div 
              ref={railRef}
              className={`relative shrink-0 w-full ${isSmallAndRest ? "h-[2px]" : "h-[4px]"} cursor-pointer`} 
              data-name="Rail"
              onMouseDown={handleMouseDown}
            >
              <SliderHelper3>
                <div className={`flex-[1_0_0] min-h-px min-w-px relative rounded-[2px] ${isSmallAndRest ? "bg-[#616161] h-[2px]" : isMediumDefaultAndDisabled ? "bg-[rgba(255,255,255,0)] h-[4px]" : "bg-[#616161] h-[4px]"}`} data-name="Rail-fill">
                  <div className="flex flex-row items-center size-full">
                    <div className="size-full" />
                  </div>
                </div>
              </SliderHelper3>
            </div>
            <div className={`-translate-y-1/2 absolute content-stretch flex items-center left-0 right-0 top-1/2`} data-name="✏️ Thumb-position" style={{ paddingRight: `${100 - percentage}%` }}>
              <div className={`flex-[1_0_0] min-h-px min-w-px relative ${isSmallAndRest ? "h-[2px]" : "h-[4px]"}`} data-name="Track">
                <SliderHelper2>
                  <div className={`relative w-full ${isSmallAndRest ? "bg-[#0f6cbd] h-[2px] rounded-[2px]" : isMediumDefaultAndDisabled ? "bg-[#bdbdbd] h-[4px] rounded-bl-[2px] rounded-tl-[2px]" : isMediumDefaultAndPressed ? "bg-[#0f548c] h-[4px] rounded-bl-[2px] rounded-tl-[2px]" : isMediumDefaultAndHover ? "bg-[#115ea3] h-[4px] rounded-bl-[2px] rounded-tl-[2px]" : "bg-[#0f6cbd] h-[4px] rounded-bl-[2px] rounded-tl-[2px]"}`} data-name="Track-fill">
                    <div className="flex flex-row items-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                </SliderHelper2>
              </div>
              {(isMediumDefaultAndRest || isMediumDefaultAndHover || isMediumDefaultAndPressed || isMediumDefaultAndDisabled) && ticks && <SliderTicks />}
              {(isMediumDefaultAndRest || isMediumDefaultAndHover || isMediumDefaultAndPressed || isMediumDefaultAndDisabled) && (
                <div className={`bg-white content-stretch flex items-center justify-center p-[3px] relative rounded-[15px] shrink-0 size-[18px] ${!disabled ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed'}`} data-name="Thumb">
                  <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[16px] ${isMediumDefaultAndDisabled ? "border-[#e0e0e0]" : "border-[#d1d1d1]"}`} />
                  <div className={`relative rounded-[15px] shrink-0 size-[12px] ${isMediumDefaultAndDisabled ? "bg-[#bdbdbd]" : isMediumDefaultAndPressed ? "bg-[#0f548c]" : isMediumDefaultAndHover ? "bg-[#115ea3]" : "bg-[#0f6cbd]"}`} data-name="Thumb-inner">
                    <div className="size-full" />
                  </div>
                </div>
              )}
              {isSmallAndRest && ticks && (
                <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-between left-px right-[-1px] top-1/2" data-name="Ticks">
                  <SliderHelper />
                  <SliderHelper1 />
                  <SliderHelper1 />
                  <SliderHelper1 />
                  <SliderHelper />
                </div>
              )}
              {isSmallAndRest && (
                <div className={`bg-white content-stretch flex items-center justify-center p-[3px] relative rounded-[15px] shrink-0 size-[14px] ${!disabled ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed'}`} data-name="Thumb">
                  <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
                  <div className="bg-[#0f6cbd] relative rounded-[15px] shrink-0 size-[10px]" data-name="Thumb-inner">
                    <div className="flex flex-col items-center justify-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isMediumDefaultAndFocus && (
        <div className="content-stretch flex flex-col items-start relative w-full">
          <div className="content-stretch flex flex-col h-[24px] items-start justify-center relative rounded-[2px] shrink-0 w-full" data-name="Slider-container">
            <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[2px]" />
            <div 
              ref={railRef}
              className="h-[4px] relative shrink-0 w-full cursor-pointer" 
              data-name="Rail"
              onMouseDown={handleMouseDown}
            >
              <SliderHelper3>
                <div className="bg-[#616161] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[2px]" data-name="Rail-fill">
                  <div className="flex flex-row items-center size-full">
                    <div className="size-full" />
                  </div>
                </div>
              </SliderHelper3>
            </div>
            <div className="-translate-y-1/2 absolute content-stretch flex items-center left-0 right-0 top-1/2" data-name="✏️ Thumb-position" style={{ paddingRight: `${100 - percentage}%` }}>
              <div className="flex-[1_0_0] h-[4px] min-h-px min-w-px relative" data-name="Track">
                <SliderHelper2>
                  <div className="bg-[#0f6cbd] h-[4px] relative rounded-bl-[2px] rounded-tl-[2px] w-full" data-name="Track-fill">
                    <div className="flex flex-row items-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                </SliderHelper2>
              </div>
              {ticks && <SliderTicks />}
              <div className="bg-white content-stretch flex items-center justify-center p-[3px] relative rounded-[15px] shrink-0 size-[18px] cursor-grab active:cursor-grabbing" data-name="Thumb">
                <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
                <div className="bg-[#0f6cbd] relative rounded-[15px] shrink-0 size-[12px]" data-name="Thumb-inner">
                  <div className="size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function SliderHelper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center size-full">
      <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">{children}</div>
    </div>
  );
}

function SliderHelper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col justify-center size-full">
      <div className="content-stretch flex flex-col items-start justify-center pl-[8px] relative size-full">
        <div className="flex items-center justify-center relative shrink-0 w-full">
          <div className="-scale-y-100 flex-none w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SliderHelper1() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="bg-white h-[2px] w-px" data-name="Tick" />
      </div>
    </div>
  );
}

function SliderHelper() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="h-[2px] w-[0.01px]" data-name="Tick" />
      </div>
    </div>
  );
}

function Helper1() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="bg-white h-[4px] w-px" data-name="Tick" />
      </div>
    </div>
  );
}

function Helper() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="h-[4px] w-[0.01px]" data-name="Tick" />
      </div>
    </div>
  );
}

function SliderTicks() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex h-[4px] items-center justify-between left-px right-[-1px] top-1/2">
      <Helper />
      <Helper1 />
      <Helper1 />
      <Helper1 />
      <Helper />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface SliderProps_Display {
  size?: "Medium (Default)" | "Small";
  ticks?: boolean;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

function Slider_Display({
  size,
  ticks,
  min,
  max,
  step,
  disabled,
}: SliderProps_Display) {
  const [value, setValue] = React.useState(50);

  return (
    <Slider
      size={size}
      ticks={ticks}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample MediumSlider
export function MediumSlider() {
  return (
    <Slider_Display
      size="Medium (Default)"
      ticks={false}
    />
  );
}

// @figmaExample SmallSlider
export function SmallSlider() {
  return (
    <Slider_Display
      size="Small"
      ticks={false}
    />
  );
}

// @figmaExample MediumSliderWithTicks
export function MediumSliderWithTicks() {
  return (
    <Slider_Display
      size="Medium (Default)"
      ticks={true}
    />
  );
}

// @figmaExample SmallSliderWithTicks
export function SmallSliderWithTicks() {
  return (
    <Slider_Display
      size="Small"
      ticks={true}
    />
  );
}

// @figmaExample DecimalStepSlider
export function DecimalStepSlider() {
  return (
    <Slider_Display
      size="Medium (Default)"
      min={0}
      max={10}
      step={0.5}
    />
  );
}

// @figmaExample LimitedRangeSliderWithTicks
export function LimitedRangeSliderWithTicks() {
  return (
    <Slider_Display
      size="Medium (Default)"
      min={1}
      max={5}
      step={1}
      ticks={true}
    />
  );
}

// @figmaExample DisabledSlider
export function DisabledSlider() {
  return (
    <Slider_Display
      size="Medium (Default)"
      disabled={true}
    />
  );
}