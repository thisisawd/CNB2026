import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-tkkza449yr';

/**
 * SpinButton - A numeric input control with increment/decrement stepper buttons for adjusting values.
 * 
 * Appears as a rectangular input field with two small chevron buttons stacked vertically on the right side.
 * The up chevron increments the value, the down chevron decrements it. The component typically has a 280px
 * default width and displays as an inline-block element within its container.
 * 
 * Use this component when you need users to input or adjust numeric values within a defined range.
 * Ideal for settings, quantities, or any scenario where precise numeric input with small adjustments is needed.
 * 
 * The component supports both controlled and uncontrolled modes:
 * - Controlled: Pass both `value` and `onChange` props to manage state externally
 * - Uncontrolled: Omit `value` prop and the component manages its own internal state
 * 
 * Keyboard interactions:
 * - Arrow Up/Down: Increment/decrement by step value
 * - Enter/Space on stepper buttons: Activate increment/decrement
 * - Direct text input: Type numeric values directly (clamped to min/max on blur)
 * 
 * Values are automatically clamped between min and max bounds.
 */
export interface SpinButtonProps {
  className?: string; // Optional CSS class names to apply custom styling or override default width
  size?: "Medium (Default)" | "Small"; // Visual size of the component (default: "Medium (Default)")
  state?: "Rest" | "Hover" | "Pressed" | "Selected" | "Error" | "Disabled" | "Read only"; // Visual state (default: "Rest")
  style?: "Outline (Default)" | "Filled darker" | "Filled lighter" | "Underline"; // Visual style variant (default: "Outline (Default)")
  value?: number; // Controlled value (if provided, component becomes controlled)
  onChange?: (value: number) => void; // Callback fired when value changes, receives the clamped numeric value
  min?: number; // Minimum allowed value (default: -Infinity)
  max?: number; // Maximum allowed value (default: Infinity)
  step?: number; // Increment/decrement step size (default: 1)
  placeholder?: string; // Placeholder text when no value is entered (default: "Placeholder text")
  disabled?: boolean; // When true, disables all interactions and grays out the component
  readOnly?: boolean; // When true, prevents editing but keeps value visible
}

// ---------------------- Main Component ----------------------

export function SpinButton({ 
  className, 
  size = "Medium (Default)", 
  state = "Rest", 
  style = "Outline (Default)",
  value: controlledValue,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  placeholder = "Placeholder text",
  disabled = false,
  readOnly = false
}: SpinButtonProps) {
  const [internalValue, setInternalValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  
  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const isDisabled = disabled || state === "Disabled";
  const isReadOnly = readOnly || state === "Read only";
  
  const handleValueChange = (newValue: number) => {
    // Clamp value to min/max
    const clampedValue = Math.min(Math.max(newValue, min), max);
    
    if (controlledValue === undefined) {
      setInternalValue(clampedValue);
    }
    onChange?.(clampedValue);
  };
  
  const handleIncrement = () => {
    if (isDisabled || isReadOnly) return;
    handleValueChange(value + step);
  };
  
  const handleDecrement = () => {
    if (isDisabled || isReadOnly) return;
    handleValueChange(value - step);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled || isReadOnly) return;
    
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      handleValueChange(numValue);
    }
  };
  
  const handleInputBlur = () => {
    setIsFocused(false);
    setInputValue("");
  };
  
  const handleInputFocus = () => {
    setIsFocused(true);
    setInputValue(value.toString());
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled || isReadOnly) return;
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };
  
  const isFilledDarkerAndRestAndMediumDefault = style === "Filled darker" && state === "Rest" && size === "Medium (Default)";
  const isFilledLighterAndRestAndMediumDefault = style === "Filled lighter" && state === "Rest" && size === "Medium (Default)";
  const isOutlineDefaultAndDisabledAndMediumDefault = style === "Outline (Default)" && state === "Disabled" && size === "Medium (Default)";
  const isOutlineDefaultAndErrorAndMediumDefault = style === "Outline (Default)" && state === "Error" && size === "Medium (Default)";
  const isOutlineDefaultAndHoverAndMediumDefault = style === "Outline (Default)" && state === "Hover" && size === "Medium (Default)";
  const isOutlineDefaultAndPressedAndMediumDefault = style === "Outline (Default)" && state === "Pressed" && size === "Medium (Default)";
  const isOutlineDefaultAndReadOnlyAndMediumDefault = style === "Outline (Default)" && state === "Read only" && size === "Medium (Default)";
  const isOutlineDefaultAndRestAndMediumDefault = style === "Outline (Default)" && state === "Rest" && size === "Medium (Default)";
  const isOutlineDefaultAndRestAndSmall = style === "Outline (Default)" && state === "Rest" && size === "Small";
  const isOutlineDefaultAndSelectedAndMediumDefault = style === "Outline (Default)" && state === "Selected" && size === "Medium (Default)";
  const isUnderlineAndRestAndMediumDefault = style === "Underline" && state === "Rest" && size === "Medium (Default)";
  
  const displayValue = isFocused ? inputValue : (value !== 0 ? value.toString() : "");
  
  return (
    <div className={className || `relative w-[280px] ${isUnderlineAndRestAndMediumDefault ? "" : "rounded-[4px]"}`}>
      <div className={`content-stretch flex flex-col items-start relative w-full ${isUnderlineAndRestAndMediumDefault ? "gap-[10px]" : isOutlineDefaultAndErrorAndMediumDefault || isOutlineDefaultAndDisabledAndMediumDefault || isOutlineDefaultAndReadOnlyAndMediumDefault || isFilledDarkerAndRestAndMediumDefault || isFilledLighterAndRestAndMediumDefault ? "overflow-clip rounded-[inherit]" : "gap-[10px] overflow-clip rounded-[inherit]"}`}>
        <div className={`relative shrink-0 w-full ${isUnderlineAndRestAndMediumDefault ? "" : isFilledDarkerAndRestAndMediumDefault ? "bg-[#f5f5f5] rounded-[4px]" : isOutlineDefaultAndDisabledAndMediumDefault || isOutlineDefaultAndReadOnlyAndMediumDefault ? "rounded-[4px]" : "bg-white rounded-[4px]"}`} data-name="Contents">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className={`content-stretch flex items-start relative w-full ${isOutlineDefaultAndRestAndSmall ? "pl-[6px]" : "pl-[10px]"}`}>
              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
                <div className="overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-start px-[2px] py-[6px] relative w-full">
                    <input
                      type="text"
                      value={displayValue}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onKeyDown={handleKeyDown}
                      placeholder={placeholder}
                      disabled={isDisabled}
                      readOnly={isReadOnly}
                      className={`flex-[1_0_0] font-["Segoe_UI:Regular",sans-serif] min-h-px min-w-px not-italic overflow-hidden relative self-stretch text-ellipsis whitespace-nowrap bg-transparent border-none outline-none ${displayValue ? 'text-[#242424]' : 'text-[#707070]'} ${isOutlineDefaultAndRestAndSmall ? "leading-[16px] text-[12px]" : "leading-[20px] text-[14px]"} ${isDisabled ? 'cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start justify-center relative self-stretch shrink-0 w-[24px]" data-name="Stepper container">
                <SpinButtonSpinButtonStepper onClick={handleIncrement}>
                  <path d={svgPaths.p27b10280} fill={isDisabled || isReadOnly ? "var(--fill-0, #BDBDBD)" : "var(--fill-0, #242424)"} id="Shape" />
                </SpinButtonSpinButtonStepper>
                <SpinButtonSpinButtonStepper onClick={handleDecrement}>
                  <path d={svgPaths.p2e2fea80} fill={isOutlineDefaultAndDisabledAndMediumDefault || isOutlineDefaultAndReadOnlyAndMediumDefault ? "var(--fill-0, #BDBDBD)" : "var(--fill-0, #616161)"} id="Shape" />
                </SpinButtonSpinButtonStepper>
              </div>
            </div>
          </div>
          {(isOutlineDefaultAndRestAndMediumDefault || isOutlineDefaultAndHoverAndMediumDefault || isOutlineDefaultAndPressedAndMediumDefault || isOutlineDefaultAndSelectedAndMediumDefault || isOutlineDefaultAndErrorAndMediumDefault || isOutlineDefaultAndDisabledAndMediumDefault || isOutlineDefaultAndReadOnlyAndMediumDefault || isOutlineDefaultAndRestAndSmall) && <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${isOutlineDefaultAndDisabledAndMediumDefault || isOutlineDefaultAndReadOnlyAndMediumDefault ? "border-[#e0e0e0]" : isOutlineDefaultAndErrorAndMediumDefault ? "border-[#c50f1f]" : isOutlineDefaultAndPressedAndMediumDefault ? "border-[#b3b3b3]" : isOutlineDefaultAndHoverAndMediumDefault ? "border-[#c7c7c7]" : "border-[#d1d1d1]"}`} />}
        </div>
        {(isOutlineDefaultAndRestAndMediumDefault || isOutlineDefaultAndHoverAndMediumDefault || isOutlineDefaultAndPressedAndMediumDefault || isOutlineDefaultAndSelectedAndMediumDefault || isUnderlineAndRestAndMediumDefault || isOutlineDefaultAndRestAndSmall) && <div className={`absolute bottom-0 left-0 right-0 rounded-[4px] ${isOutlineDefaultAndSelectedAndMediumDefault ? "bg-[#0f6cbd] h-[2px]" : isOutlineDefaultAndPressedAndMediumDefault ? "bg-[#4d4d4d] h-px" : isOutlineDefaultAndHoverAndMediumDefault ? "bg-[#575757] h-px" : "bg-[#616161] h-px"}`} data-name="Thin underline" />}
        {isOutlineDefaultAndPressedAndMediumDefault && <div className="absolute bg-[#0f6cbd] bottom-0 h-[2px] left-[70px] right-[70px] rounded-[4px]" data-name="Thin underline" />}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function SpinButtonSpinButtonStepper({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div 
      className="flex-[1_0_0] min-h-px min-w-px relative w-full cursor-pointer hover:bg-gray-100"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[6px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chevron">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.5px] left-1/2 top-[calc(50%+0.75px)] w-[8px]" data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4.5">
                {children}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface SpinButtonProps_Display {
  size?: "Medium (Default)" | "Small";
  state?: "Rest" | "Hover" | "Pressed" | "Selected" | "Error" | "Disabled" | "Read only";
  style?: "Outline (Default)" | "Filled darker" | "Filled lighter" | "Underline";
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

function SpinButton_Display({
  size,
  state,
  style,
  min,
  max,
  step,
  placeholder,
  disabled,
  readOnly,
}: SpinButtonProps_Display) {
  const [value, setValue] = React.useState<number | undefined>(undefined);

  return (
    <SpinButton
      size={size}
      state={state}
      style={style}
      value={value}
      onChange={setValue}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample MediumOutlineDefault
export function SpinButtonExample1() {
  return (
    <SpinButton_Display
      size="Medium (Default)"
      style="Outline (Default)"
      min={0}
      max={100}
      step={1}
      placeholder="Enter value"
    />
  );
}

// @figmaExample SmallOutlineQuantity
export function SpinButtonExample2() {
  return (
    <SpinButton_Display
      size="Small"
      style="Outline (Default)"
      min={0}
      max={50}
      step={5}
      placeholder="Quantity"
    />
  );
}

// @figmaExample MediumFilledDarkerAmount
export function SpinButtonExample3() {
  return (
    <SpinButton_Display
      size="Medium (Default)"
      style="Filled darker"
      min={1}
      max={999}
      step={1}
      placeholder="Enter amount"
    />
  );
}

// @figmaExample MediumFilledLighterPercentage
export function SpinButtonExample4() {
  return (
    <SpinButton_Display
      size="Medium (Default)"
      style="Filled lighter"
      min={0}
      max={100}
      step={10}
      placeholder="Percentage"
    />
  );
}

// @figmaExample MediumUnderlineValue
export function SpinButtonExample5() {
  return (
    <SpinButton_Display
      size="Medium (Default)"
      style="Underline"
      min={-100}
      max={100}
      step={1}
      placeholder="Value"
    />
  );
}

// @figmaExample MediumOutlineError
export function SpinButtonExample6() {
  return (
    <SpinButton_Display
      size="Medium (Default)"
      state="Error"
      style="Outline (Default)"
      min={0}
      max={10}
      step={1}
      placeholder="Invalid value"
    />
  );
}

// @figmaExample MediumOutlineDisabled
export function SpinButtonExample7() {
  return (
    <SpinButton_Display
      size="Medium (Default)"
      style="Outline (Default)"
      min={0}
      max={100}
      step={1}
      placeholder="Disabled"
      disabled={true}
    />
  );
}

// @figmaExample SmallFilledDarkerReadOnly
export function SpinButtonExample8() {
  return (
    <SpinButton_Display
      size="Small"
      style="Filled darker"
      min={1}
      max={10}
      step={1}
      placeholder="Read only"
      readOnly={true}
    />
  );
}