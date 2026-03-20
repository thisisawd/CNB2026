import * as React from 'react';
import { useState, ChangeEvent, FocusEvent } from 'react';

/**
 * A multi-line text input component with support for multiple sizes, styles, and states.
 * Appears as a resizable text area within its container, with a border and optional underline.
 * The component displays visual feedback for different interaction states (hover, focus, press)
 * through border color changes and underline thickness. When showResizeHandler is true,
 * a small diagonal grip indicator appears in the bottom-right corner.
 *
 * The component can be used in controlled or uncontrolled mode. Pass a value prop to use it
 * as a controlled component, or omit it to let the component manage its own state internally.
 */
export interface TextareaProps {
  className?: string; // Custom CSS classes for the container. Default: "h-[52px] relative rounded-[4px] w-[280px]"
  showResizeHandler?: boolean; // Whether to show the visual resize grip indicator in the bottom-right corner. Default: false. Note: The textarea is always resizable when this is true (resize-both), otherwise resize-none
  size?: 'Small' | 'Medium (Default)' | 'Large'; // Controls the size of the textarea. Default: "Medium (Default)". "Small": 12px text, 16px line height, 6px horizontal padding; "Medium (Default)": 14px text, 20px line height, 10px horizontal padding; "Large": 16px text, 22px line height, 12px horizontal padding
  style?: 'Outline' | 'Filled darker' | 'Filled lighter'; // Visual style variant. Default: "Outline". "Outline": White background with border and underline; "Filled darker": Light gray background (#f5f5f5); "Filled lighter": White background
  value?: string; // Controlled value for the textarea. When provided, component operates in controlled mode
  placeholder?: string; // Placeholder text shown when empty. Default: "Placeholder text"
  disabled?: boolean; // Disables the textarea and applies disabled styling (lighter border). Default: false
  readOnly?: boolean; // Makes the textarea read-only with similar styling to disabled. Default: false
  error?: boolean; // Shows error state with red border (#c50f1f). Default: false
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void; // Callback fired when text changes, receives both the new value and the event
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void; // Callback fired when textarea receives focus
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void; // Callback fired when textarea loses focus
  rows?: number; // Number of visible text rows. Default: 2
}

// ---------------------- Main Component ----------------------

export function Textarea({ 
  className, 
  showResizeHandler = false, 
  size = "Medium (Default)", 
  style = "Outline",
  value: controlledValue,
  placeholder = "Placeholder text",
  disabled = false,
  readOnly = false,
  error = false,
  onChange,
  onFocus,
  onBlur,
  rows = 2
}: TextareaProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Determine current state based on actual interaction
  let state: "Rest" | "Hover" | "Pressed" | "Focus" | "Error" | "Disabled" | "Read only";
  if (disabled) {
    state = "Disabled";
  } else if (readOnly) {
    state = "Read only";
  } else if (error) {
    state = "Error";
  } else if (isFocused) {
    state = "Focus";
  } else if (isPressed) {
    state = "Pressed";
  } else if (isHovered) {
    state = "Hover";
  } else {
    state = "Rest";
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue, e);
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    setIsPressed(false);
    onBlur?.(e);
  };

  const handleMouseEnter = () => {
    if (!disabled && !readOnly) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (!disabled && !readOnly) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const isFilledDarkerAndMediumDefaultAndRest = style === "Filled darker" && size === "Medium (Default)" && state === "Rest";
  const isFilledLighterAndMediumDefaultAndRest = style === "Filled lighter" && size === "Medium (Default)" && state === "Rest";
  const isOutlineAndLargeAndRest = style === "Outline" && size === "Large" && state === "Rest";
  const isOutlineAndMediumDefaultAndDisabled = style === "Outline" && size === "Medium (Default)" && state === "Disabled";
  const isOutlineAndMediumDefaultAndError = style === "Outline" && size === "Medium (Default)" && state === "Error";
  const isOutlineAndMediumDefaultAndFocus = style === "Outline" && size === "Medium (Default)" && state === "Focus";
  const isOutlineAndMediumDefaultAndHover = style === "Outline" && size === "Medium (Default)" && state === "Hover";
  const isOutlineAndMediumDefaultAndPressed = style === "Outline" && size === "Medium (Default)" && state === "Pressed";
  const isOutlineAndMediumDefaultAndReadOnly = style === "Outline" && size === "Medium (Default)" && state === "Read only";
  const isOutlineAndMediumDefaultAndRest = style === "Outline" && size === "Medium (Default)" && state === "Rest";
  const isOutlineAndSmallAndRest = style === "Outline" && size === "Small" && state === "Rest";

  // Calculate padding and font size based on size
  const paddingClass = size === "Large" ? "px-[12px]" : size === "Small" ? "px-[6px]" : "px-[10px]";
  const fontSize = size === "Large" ? "text-[16px]" : size === "Small" ? "text-[12px]" : "text-[14px]";
  const lineHeight = size === "Large" ? "leading-[22px]" : size === "Small" ? "leading-[16px]" : "leading-[20px]";
  const verticalPadding = "py-[6px]";

  return (
    <div 
      className={className || "h-[52px] relative rounded-[4px] w-[280px]"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className={`flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-full ${isOutlineAndMediumDefaultAndDisabled || isOutlineAndMediumDefaultAndReadOnly ? "bg-[rgba(255,255,255,0)]" : isFilledDarkerAndMediumDefaultAndRest ? "bg-[#f5f5f5]" : "bg-white"}`} data-name="Contents">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className={`content-stretch flex items-center relative size-full ${paddingClass}`}>
              <textarea
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                rows={rows}
                className={`flex-1 w-full h-full resize-${showResizeHandler ? 'both' : 'none'} bg-transparent border-none outline-none font-['Segoe_UI:Regular',sans-serif] ${fontSize} ${lineHeight} ${disabled || readOnly || !value ? 'text-[#707070]' : 'text-[#242424]'} placeholder:text-[#707070]`}
                style={{
                  minHeight: '100%',
                  padding: '6px 2px'
                }}
              />
            </div>
          </div>
          {(isOutlineAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndPressed || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndError || isOutlineAndMediumDefaultAndDisabled || isOutlineAndMediumDefaultAndReadOnly || isOutlineAndSmallAndRest || isOutlineAndLargeAndRest) && <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${isOutlineAndMediumDefaultAndDisabled || isOutlineAndMediumDefaultAndReadOnly ? "border-[#e0e0e0]" : isOutlineAndMediumDefaultAndError ? "border-[#c50f1f]" : isOutlineAndMediumDefaultAndPressed ? "border-[#b3b3b3]" : isOutlineAndMediumDefaultAndHover ? "border-[#c7c7c7]" : "border-[#d1d1d1]"}`} />}
        </div>
        {(isOutlineAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndSmallAndRest || isOutlineAndLargeAndRest) && <div className={`absolute bottom-0 h-px left-0 right-0 rounded-[4px] ${isOutlineAndMediumDefaultAndHover ? "bg-[#575757]" : "bg-[#616161]"}`} data-name="Thin underline" />}
        {(isOutlineAndMediumDefaultAndRest || isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndError || isOutlineAndMediumDefaultAndReadOnly || isOutlineAndSmallAndRest || isOutlineAndLargeAndRest) && showResizeHandler && <TextareaResizeHandler />}
        {isOutlineAndMediumDefaultAndPressed && (
          <>
            <div className="absolute bg-[#4d4d4d] bottom-0 h-[2px] left-0 right-0 rounded-[4px]" data-name="Thick underline" />
            <div className="absolute bottom-0 h-[2px] left-0 right-0 pointer-events-none" data-name="Pressed">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 2">
                <path d={svgPaths.p2c9d7c00} fill="var(--fill-0, #0F548C)" id="Pressed" />
              </svg>
            </div>
          </>
        )}
        {isOutlineAndMediumDefaultAndPressed && showResizeHandler && <TextareaResizeHandler />}
        {isOutlineAndMediumDefaultAndFocus && <div className="absolute bg-[#0f6cbd] bottom-0 h-[2px] left-0 right-0 rounded-bl-[4px] rounded-br-[4px] pointer-events-none" data-name="InFocus" />}
        {isOutlineAndMediumDefaultAndFocus && showResizeHandler && <TextareaResizeHandler />}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function TextareaResizeHandler() {
  return (
    <div className="absolute bottom-0 overflow-clip right-0 size-[12px] pointer-events-none">
      <div className="absolute flex items-center justify-center left-[2px] size-[7.778px] top-[2px]">
        <div className="-rotate-45 flex-none">
          <div className="h-px relative w-[10px]" data-name="Vector 1 (Stroke)">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
              <path clipRule="evenodd" d="M10 1H0V0H10V1Z" fill="url(#paint0_linear_0_727)" fillRule="evenodd" id="Vector 1 (Stroke)" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_727" x1="5" x2="5" y1="0" y2="1">
                  <stop offset="0.369792" stopColor="#303030" />
                  <stop offset="1" stopColor="#BCBCBC" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[5.28px] size-[4.95px] top-[5.21px]">
        <div className="-rotate-45 flex-none">
          <div className="h-px relative w-[6px]" data-name="Vector 2 (Stroke)">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
              <path clipRule="evenodd" d="M6 1H0V0L6 4.37114e-08V1Z" fill="url(#paint0_linear_0_725)" fillRule="evenodd" id="Vector 2 (Stroke)" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_725" x1="4" x2="4" y1="0" y2="1">
                  <stop offset="0.369792" stopColor="#303030" />
                  <stop offset="1" stopColor="#BCBCBC" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const svgPaths = {
  p2c9d7c00: "M0 2L280 0V2H0Z"
};

// ---------------------- Display Component ----------------------

interface TextareaProps_Display {
  className?: string;
  showResizeHandler?: boolean;
  size?: 'Small' | 'Medium (Default)' | 'Large';
  style?: 'Outline' | 'Filled darker' | 'Filled lighter';
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  rows?: number;
}

function Textarea_Display({
  className,
  showResizeHandler,
  size,
  style,
  placeholder,
  disabled,
  readOnly,
  error,
  rows,
}: TextareaProps_Display) {
  return (
    <Textarea
      className={className}
      showResizeHandler={showResizeHandler}
      size={size}
      style={style}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      rows={rows}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SmallTextarea
export function SmallTextarea() {
  return (
    <Textarea_Display
      size="Small"
      style="Outline"
      placeholder="Small textarea"
      rows={2}
    />
  );
}

// @figmaExample MediumDefaultTextarea
export function MediumDefaultTextarea() {
  return (
    <Textarea_Display
      size="Medium (Default)"
      style="Outline"
      placeholder="Medium textarea (default)"
      rows={3}
    />
  );
}

// @figmaExample LargeTextarea
export function LargeTextarea() {
  return (
    <Textarea_Display
      size="Large"
      style="Outline"
      placeholder="Large textarea"
      rows={3}
    />
  );
}

// @figmaExample FilledDarkerTextarea
export function FilledDarkerTextarea() {
  return (
    <Textarea_Display
      size="Medium (Default)"
      style="Filled darker"
      placeholder="Filled darker style"
      rows={2}
    />
  );
}

// @figmaExample FilledLighterTextarea
export function FilledLighterTextarea() {
  return (
    <Textarea_Display
      size="Medium (Default)"
      style="Filled lighter"
      placeholder="Filled lighter style"
      rows={2}
    />
  );
}

// @figmaExample TextareaWithResizeHandler
export function TextareaWithResizeHandler() {
  return (
    <Textarea_Display
      size="Medium (Default)"
      style="Outline"
      showResizeHandler={true}
      placeholder="With resize handler"
      rows={3}
    />
  );
}

// @figmaExample ErrorStateTextarea
export function ErrorStateTextarea() {
  return (
    <Textarea_Display
      size="Medium (Default)"
      style="Outline"
      placeholder="Error state"
      error={true}
      rows={2}
    />
  );
}

// @figmaExample DisabledTextarea
export function DisabledTextarea() {
  return (
    <Textarea_Display
      size="Medium (Default)"
      style="Outline"
      placeholder="Disabled state"
      disabled={true}
      rows={2}
    />
  );
}