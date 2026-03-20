import * as React from 'react';

/**
 * A text label component typically used to identify form inputs and other UI elements.
 * Appears as inline text that adjusts its font size, weight, and color based on the size, type, and disabled state.
 * When required is true, displays a red asterisk (*) after the text. The component uses Segoe UI font family.
 * 
 * IMPORTANT: When htmlFor is provided, the component renders as a <label> element (for associating with form inputs).
 * Otherwise, it renders as a <div>. This makes it semantically correct for accessibility.
 */
export interface LabelProps {
  text?: string; // The label text to display (default: "Label")
  size?: "Small" | "Medium" | "Large"; // Controls font size and line height: "Small": 12px text, 16px line height; "Medium" (default): 14px text, 20px line height; "Large": 16px text, 22px line height
  type?: "Regular (Default)" | "Semibold"; // Font weight style: "Regular (Default)": Normal font weight; "Semibold": Bold/semibold font weight
  required?: boolean; // Shows a red asterisk (*) after the text when true (default: false)
  disabled?: boolean; // When true, text appears grayed out (#bdbdbd) instead of dark (#242424) (default: false)
  htmlFor?: string; // ID of the associated form element. When provided, renders as <label> element with htmlFor attribute
  onClick?: () => void; // Click handler, sets cursor to pointer when provided
  className?: string; // Custom CSS classes (default: "relative")
}

// ---------------------- Main Component ----------------------

export function Label({ className, disabled = false, required = false, size = "Medium", text = "Label", type = "Regular (Default)", htmlFor, onClick }: LabelProps) {
  const isRegularDefaultAndMediumAndDisabled = type === "Regular (Default)" && size === "Medium" && disabled;
  const isRegularDefaultAndMediumAndNotDisabled = type === "Regular (Default)" && size === "Medium" && !disabled;
  const isRegularDefaultAndSmallAndNotDisabled = type === "Regular (Default)" && size === "Small" && !disabled;
  const isSemiboldAndLargeAndNotDisabled = type === "Semibold" && size === "Large" && !disabled;
  const isSemiboldAndMediumAndNotDisabled = type === "Semibold" && size === "Medium" && !disabled;
  
  const WrapperComponent = htmlFor ? 'label' : 'div';
  const wrapperProps = htmlFor ? { htmlFor } : {};
  
  return (
    <WrapperComponent 
      className={className || "relative"} 
      {...wrapperProps}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      <div className="flex flex-row items-end size-full">
        <div className={`content-stretch flex gap-[4px] items-end not-italic relative ${isRegularDefaultAndMediumAndDisabled ? "font-['Segoe_UI:Regular',sans-serif] leading-[20px] text-[#bdbdbd] text-[14px]" : isSemiboldAndLargeAndNotDisabled ? "font-['Segoe_UI:Semibold',sans-serif] leading-[22px] text-[16px]" : isSemiboldAndMediumAndNotDisabled ? "leading-[20px] text-[14px]" : isRegularDefaultAndMediumAndNotDisabled ? "font-['Segoe_UI:Regular',sans-serif] leading-[20px] text-[14px]" : "font-['Segoe_UI:Regular',sans-serif] leading-[16px] text-[12px]"}`}>
          {(isRegularDefaultAndSmallAndNotDisabled || isRegularDefaultAndMediumAndNotDisabled || isSemiboldAndLargeAndNotDisabled) && <p className="relative shrink-0 text-[#242424]">{text}</p>}
          {(isRegularDefaultAndSmallAndNotDisabled || isRegularDefaultAndMediumAndNotDisabled || isSemiboldAndLargeAndNotDisabled) && required && <p className="relative shrink-0 text-[#c50f1f]">*</p>}
          {isSemiboldAndMediumAndNotDisabled && <p className="font-['Segoe_UI:Semibold',sans-serif] relative shrink-0 text-[#242424]">{text}</p>}
          {isSemiboldAndMediumAndNotDisabled && required && <p className="font-['Segoe_UI:Regular',sans-serif] relative shrink-0 text-[#c50f1f]">*</p>}
          {isRegularDefaultAndMediumAndDisabled && <p className="relative shrink-0">{text}</p>}
          {isRegularDefaultAndMediumAndDisabled && required && <p className="relative shrink-0">*</p>}
        </div>
      </div>
    </WrapperComponent>
  );
}

// ---------------------- Display Component ----------------------

interface LabelProps_Display {
  text?: string;
  size?: "Small" | "Medium" | "Large";
  type?: "Regular (Default)" | "Semibold";
  required?: boolean;
  disabled?: boolean;
  htmlFor?: string;
}

function Label_Display({
  text,
  size,
  type,
  required,
  disabled,
  htmlFor,
}: LabelProps_Display) {
  return (
    <Label
      text={text}
      size={size}
      type={type}
      required={required}
      disabled={disabled}
      htmlFor={htmlFor}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SmallLabel
export function SmallLabel() {
  return (
    <Label_Display
      text="Small Label"
      size="Small"
      type="Regular (Default)"
    />
  );
}

// @figmaExample MediumDefaultLabel
export function MediumDefaultLabel() {
  return (
    <Label_Display
      text="Medium Label (Default)"
      size="Medium"
      type="Regular (Default)"
    />
  );
}

// @figmaExample LargeLabel
export function LargeLabel() {
  return (
    <Label_Display
      text="Large Label"
      size="Large"
      type="Regular (Default)"
    />
  );
}

// @figmaExample SemiboldMediumLabel
export function SemiboldMediumLabel() {
  return (
    <Label_Display
      text="Semibold Label"
      size="Medium"
      type="Semibold"
    />
  );
}

// @figmaExample RequiredFieldLabel
export function RequiredFieldLabel() {
  return (
    <Label_Display
      text="Required Field"
      size="Medium"
      type="Regular (Default)"
      required={true}
    />
  );
}

// @figmaExample DisabledLabel
export function DisabledLabel() {
  return (
    <Label_Display
      text="Disabled Label"
      size="Medium"
      type="Regular (Default)"
      disabled={true}
    />
  );
}

// @figmaExample LargeSemiboldRequiredLabel
export function LargeSemiboldRequiredLabel() {
  return (
    <Label_Display
      text="Large Semibold Required"
      size="Large"
      type="Semibold"
      required={true}
    />
  );
}

// @figmaExample EmailAddressLabel
export function EmailAddressLabel() {
  return (
    <Label_Display
      text="Email Address"
      size="Medium"
      type="Regular (Default)"
      htmlFor="email-input"
      required={true}
    />
  );
}