import * as React from 'react';
import { useState, useCallback, KeyboardEvent } from 'react';
import svgPaths from "./svg-f1kjmv1h4s";

/**
 * A fully accessible checkbox input component with support for checked, unchecked, and indeterminate states.
 * Appears as a square box (or circular for the "Circular" style) with optional label text positioned to the right.
 * The checkbox provides visual feedback for hover, focus, pressed, and disabled states.
 * When checked, displays a white checkmark on a blue background. When indeterminate, displays a blue square dash.
 * 
 * This component follows Microsoft Fluent UI design patterns with sophisticated interaction states including
 * keyboard navigation (Space/Enter to toggle), proper focus indicators, and ARIA accessibility attributes.
 * 
 * IMPORTANT: This is a controlled component - you must provide both `checked` and `onChange` props to make it interactive.
 * The component handles visual states internally but relies on parent to manage the checked state.
 */
export interface CheckboxProps {
  className?: string; // Custom CSS class to apply to the root element. Overrides default styling when provided.
  label?: boolean; // Whether to display the label text next to the checkbox (default: true)
  labelText?: string; // The text content to display in the label (default: "Label")
  checked?: boolean | 'indeterminate'; // The current checked state: false (unchecked), true (checked), or 'indeterminate' (default: false)
  onChange?: (checked: boolean | 'indeterminate') => void; // Callback fired when user toggles the checkbox. Receives the new checked state. Toggle behavior: unchecked -> checked -> unchecked (indeterminate state is skipped during user clicks)
  disabled?: boolean; // Whether the checkbox is disabled. Disables all interactions and applies disabled visual styling (default: false)
  style?: 'Standard' | 'Circular'; // Visual style variant: "Standard" (square with rounded corners) or "Circular" (circular border, only visible in unchecked rest state) (default: "Standard")
}

// ---------------------- Main Component ----------------------

export function Checkbox({ 
  className, 
  label = true, 
  labelText = "Label",
  checked = false,
  onChange,
  disabled = false,
  style = "Standard" 
}: CheckboxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Determine current state based on interactions
  const state = disabled ? "Disabled" : 
                isFocused ? "Focus" :
                isPressed ? "Pressed" :
                isHovered ? "Hover" : "Rest";
  
  // Determine status based on checked prop
  const status = checked === 'indeterminate' ? "Indeterminate" :
                 checked ? "Checked" : "Unchecked";

  const handleClick = useCallback(() => {
    if (disabled || !onChange) return;
    
    // Toggle logic: unchecked -> checked -> unchecked (skip indeterminate on user click)
    if (checked === 'indeterminate' || checked === false) {
      onChange(true);
    } else {
      onChange(false);
    }
  }, [checked, disabled, onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  }, [disabled, handleClick]);

  const isCircularAndUncheckedAndRest = style === "Circular" && status === "Unchecked" && state === "Rest";
  const isStandardAndCheckedAndRest = style === "Standard" && status === "Checked" && state === "Rest";
  const isStandardAndIndeterminateAndRest = style === "Standard" && status === "Indeterminate" && state === "Rest";
  const isStandardAndUncheckedAndDisabled = style === "Standard" && status === "Unchecked" && state === "Disabled";
  const isStandardAndUncheckedAndFocus = style === "Standard" && status === "Unchecked" && state === "Focus";
  const isStandardAndUncheckedAndHover = style === "Standard" && status === "Unchecked" && state === "Hover";
  const isStandardAndUncheckedAndPressed = style === "Standard" && status === "Unchecked" && state === "Pressed";
  const isStandardAndUncheckedAndRest = style === "Standard" && status === "Unchecked" && state === "Rest";
  
  return (
    <div 
      className={className || `relative ${isStandardAndUncheckedAndFocus ? "rounded-[4px]" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false);
        setIsPressed(false);
      }}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="checkbox"
      aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
      aria-disabled={disabled}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div aria-hidden={isStandardAndUncheckedAndFocus ? "true" : undefined} className={isStandardAndUncheckedAndFocus ? "absolute border-3 border-solid border-white inset-0 pointer-events-none rounded-[4px]" : "content-stretch flex gap-[4px] items-start relative"}>
        {(isCircularAndUncheckedAndRest || isStandardAndIndeterminateAndRest || isStandardAndCheckedAndRest || isStandardAndUncheckedAndDisabled || isStandardAndUncheckedAndPressed || isStandardAndUncheckedAndHover || isStandardAndUncheckedAndRest) && (
          <div className="content-stretch flex items-start p-[8px] relative shrink-0" data-name="Checkbox elements">
            {(isCircularAndUncheckedAndRest || isStandardAndUncheckedAndDisabled || isStandardAndUncheckedAndPressed || isStandardAndUncheckedAndHover || isStandardAndUncheckedAndRest) && (
              <div className={`relative shrink-0 size-[16px] ${isStandardAndUncheckedAndDisabled || isStandardAndUncheckedAndPressed || isStandardAndUncheckedAndHover || isStandardAndUncheckedAndRest ? "rounded-[2px]" : "rounded-[9999px]"}`} data-name="Background">
                <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none ${isStandardAndUncheckedAndRest ? "border-[#616161] rounded-[2px]" : isStandardAndUncheckedAndHover ? "border-[#575757] rounded-[2px]" : isStandardAndUncheckedAndPressed ? "border-[#4d4d4d] rounded-[2px]" : isStandardAndUncheckedAndDisabled ? "border-[#e0e0e0] rounded-[2px]" : "border-[#616161] rounded-[9999px]"}`} />
              </div>
            )}
            {isStandardAndIndeterminateAndRest && (
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Square">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                    <path d={svgPaths.p351f1600} fill="var(--fill-0, #0F6CBD)" id="Shape" />
                  </svg>
                </div>
              </div>
            )}
            {isStandardAndCheckedAndRest && (
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Checkmark">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[6px] left-1/2 top-1/2 w-[8px]" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 6">
                    <path d={svgPaths.p340332c0} fill="var(--fill-0, white)" id="Shape" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
        {(isCircularAndUncheckedAndRest || isStandardAndIndeterminateAndRest || isStandardAndCheckedAndRest || isStandardAndUncheckedAndPressed || isStandardAndUncheckedAndHover || isStandardAndUncheckedAndRest) && label && <CheckboxTextWrapperForOffsetText text={labelText} />}
        {isStandardAndUncheckedAndDisabled && label && (
          <Wrapper>
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#bdbdbd] text-[14px]">{labelText}</p>
          </Wrapper>
        )}
      </div>
      {isStandardAndUncheckedAndFocus && (
        <div className="content-stretch flex items-start relative">
          <div className="content-stretch flex gap-[4px] items-start relative rounded-[4px] shrink-0" data-name="Checkbox + text">
            <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="content-stretch flex items-start p-[8px] relative shrink-0" data-name="Checkbox elements">
              <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="Background">
                <div aria-hidden="true" className="absolute border border-[#616161] border-solid inset-0 pointer-events-none rounded-[2px]" />
              </div>
            </div>
            {label && <CheckboxTextWrapperForOffsetText text={labelText} />}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex items-start pr-[8px] py-[6px] relative shrink-0">
      <div className="relative shrink-0" data-name="Label">
        <div className="flex flex-row items-end size-full">
          <div className="content-stretch flex gap-[4px] items-end relative">{children}</div>
        </div>
      </div>
    </div>
  );
}

type CheckboxTextWrapperForOffsetTextProps = {
  text: string;
};

export function CheckboxTextWrapperForOffsetText({ text }: CheckboxTextWrapperForOffsetTextProps) {
  return (
    <Wrapper>
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px]">{text}</p>
    </Wrapper>
  );
}

// ---------------------- Display Component ----------------------

interface CheckboxProps_Display {
  label?: boolean;
  labelText?: string;
  disabled?: boolean;
  style?: 'Standard' | 'Circular';
}

function Checkbox_Display({
  label,
  labelText,
  disabled,
  style,
}: CheckboxProps_Display) {
  const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false);

  return (
    <Checkbox
      label={label}
      labelText={labelText}
      checked={checked}
      onChange={setChecked}
      disabled={disabled}
      style={style}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample AcceptTermsCheckbox
export function CheckboxExample1() {
  return (
    <Checkbox_Display
      labelText="Accept terms and conditions"
    />
  );
}

// @figmaExample SubscribeToNewsletterCheckbox
export function CheckboxExample2() {
  return (
    <Checkbox_Display
      labelText="Subscribe to newsletter"
      style="Standard"
    />
  );
}

// @figmaExample CircularStyleCheckbox
export function CheckboxExample3() {
  return (
    <Checkbox_Display
      labelText="Circular checkbox"
      style="Circular"
    />
  );
}

// @figmaExample CheckboxWithoutLabel
export function CheckboxExample4() {
  return (
    <Checkbox_Display
      label={false}
    />
  );
}

// @figmaExample DisabledCheckbox
export function CheckboxExample5() {
  return (
    <Checkbox_Display
      labelText="Disabled checkbox"
      disabled={true}
    />
  );
}

// @figmaExample EnableNotificationsCheckbox
export function CheckboxExample6() {
  return (
    <Checkbox_Display
      labelText="Enable notifications"
      style="Standard"
    />
  );
}