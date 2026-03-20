import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-t4ypqwq0rs';

/**
 * A form field wrapper component that provides consistent labeling, info buttons, and status/helper text for form controls.
 * Appears as a vertical stack within its container, displaying a label with required indicator (*), an info button, the form control area, and optional status/helper text below. Default width is 250px unless overridden.
 * 
 * This component is a container meant to wrap actual form input components. You must provide the actual input/control element via the instance prop - without it, a blue placeholder will be shown.
 */
export interface FieldProps {
  /** The actual form control component (input, textarea, select, etc.) to display. If null, shows a placeholder with "SWAP WITH CONTENT COMPONENT". This is where you insert the actual interactive form element. */
  instance?: React.ReactNode | null;
  /** Controls the overall size and typography of the field. "Medium (Default)": 14px label text, 26px label height, 24px info button. "Small": 12px label text, 20px label height, 20px info button. "Large": 16px semibold label text, 24px label height, 24px info button. (default: "Medium (Default)") */
  size?: "Medium (Default)" | "Small" | "Large";
  /** Whether to show the label and info button area (default: true). When false, only the instance and text areas are shown. */
  label?: boolean;
  /** Whether to show error/status text below the instance (default: true). Displays "Error text" in red with a diamond dismiss icon. */
  statusText?: boolean;
  /** Whether to show helper text below the status text (default: false). Displays "Helper text" in gray. */
  helperText?: boolean;
  /** Optional callback when the info button is clicked. The component also maintains internal state to track info button clicks. */
  onInfoClick?: () => void;
  /** Optional className to override the default container styles. If not provided, defaults to "relative w-[250px]". */
  className?: string;
}

// ---------------------- Main Component ----------------------

export function Field({ className, helperText = false, instance = null, label = true, size = "Medium (Default)", statusText = true, onInfoClick }: FieldProps) {
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  
  const handleInfoClick = () => {
    setShowInfoTooltip(!showInfoTooltip);
    if (onInfoClick) {
      onInfoClick();
    }
  };
  
  const isLarge = size === "Large";
  const isMediumDefault = size === "Medium (Default)";
  const isSmall = size === "Small";
  return (
    <div className={className || "relative w-[250px]"}>
      <div className="content-stretch flex flex-col items-start relative w-full">
        {isMediumDefault && label && (
          <div className="content-stretch flex h-[26px] items-center pb-[2px] relative shrink-0 w-full" data-name="Label + Icon">
            <div className="relative shrink-0" data-name="Label">
              <div className="flex flex-row items-end size-full">
                <FieldHelper text="Label" text1="*" additionalClassNames="font-['Segoe_UI:Regular',sans-serif] leading-[20px] text-[14px]" />
              </div>
            </div>
            <FieldInfoButton onClick={handleInfoClick} additionalClassNames="size-[24px]">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Info">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <path d={svgPaths.p21507e00} fill="var(--fill-0, #424242)" id="Shape" />
                  </svg>
                </div>
              </div>
            </FieldInfoButton>
          </div>
        )}
        {isMediumDefault && <FormText instance={instance} statusText={statusText} helperText={helperText} />}
        {isSmall && label && (
          <div className="content-stretch flex h-[20px] items-center pb-[2px] relative shrink-0 w-full" data-name="Label + Icon">
            <div className="relative shrink-0" data-name="Label">
              <div className="flex flex-row items-end size-full">
                <FieldHelper text="Label" text1="*" additionalClassNames="font-['Segoe_UI:Regular',sans-serif] leading-[16px] text-[12px]" />
              </div>
            </div>
            <FieldInfoButton onClick={handleInfoClick} additionalClassNames="size-[20px]">
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Info">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10px] top-1/2" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                    <path d={svgPaths.p9775f80} fill="var(--fill-0, #424242)" id="Shape" />
                  </svg>
                </div>
              </div>
            </FieldInfoButton>
          </div>
        )}
        {isSmall && <FormText instance={instance} statusText={statusText} helperText={helperText} />}
        {isLarge && label && (
          <div className="content-stretch flex h-[24px] items-center pb-[4px] relative shrink-0 w-full" data-name="Label + Icon">
            <div className="relative shrink-0" data-name="Label">
              <div className="flex flex-row items-end size-full">
                <FieldHelper text="Label" text1="*" additionalClassNames="font-['Segoe_UI:Semibold',sans-serif] leading-[22px] text-[16px]" />
              </div>
            </div>
            <button
              type="button"
              onClick={handleInfoClick}
              className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 size-[24px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors"
              data-name=".Info button"
              aria-label="Field information"
            >
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center p-[2px] relative size-full">
                  <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Info">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p28b43400} fill="var(--fill-0, #424242)" id="Shape" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}
        {isLarge && <FormText instance={instance} statusText={statusText} helperText={helperText} />}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type FieldInfoButtonProps = {
  additionalClassNames?: string;
  onClick?: () => void;
};

function FieldInfoButton({ children, additionalClassNames = "", onClick }: React.PropsWithChildren<FieldInfoButtonProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors", additionalClassNames)}
      aria-label="Field information"
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative size-full">{children}</div>
      </div>
    </button>
  );
}

type FormTextProps = {
  instance: any;
  statusText: boolean;
  helperText: boolean;
};

function FormText({ instance, statusText, helperText }: FormTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      {instance || <Placeholder2 />}
      {statusText && <FieldText text="Error text" />}
      {helperText && (
        <div className="content-stretch flex items-start pt-[2px] relative shrink-0 w-full" data-name="Helper text">
          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#616161] text-[12px]">Helper text</p>
        </div>
      )}
    </div>
  );
}

type FieldTextProps = {
  text: string;
};

function FieldText({ text }: FieldTextProps) {
  return (
    <div className="content-stretch flex gap-[4px] items-start pt-[2px] relative shrink-0 w-full">
      <div className="content-stretch flex items-start pt-[2px] relative shrink-0" data-name="Icon">
        <div className="relative shrink-0 size-[12px]" data-name="Diamond Dismiss">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-1/2 top-1/2 w-[9.998px]" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99769 9.99971">
              <path d={svgPaths.pf036000} fill="var(--fill-0, #B10E1C)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#b10e1c] text-[12px]">{text}</p>
    </div>
  );
}

type Placeholder2Props = {
  additionalClassNames?: string;
};

function Placeholder2({ additionalClassNames = "" }: Placeholder2Props) {
  return (
    <div className="bg-[#ebf3fc] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <Text text="SWAP WITH CONTENT COMPONENT" additionalClassNames="w-full" />
      </div>
    </div>
  );
}

type FieldHelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function FieldHelper({ text, text1, additionalClassNames = "" }: FieldHelperProps) {
  return (
    <div className={clsx("content-stretch flex gap-[4px] items-end not-italic relative", additionalClassNames)}>
      <p className="relative shrink-0 text-[#242424]">{text}</p>
      <p className="relative shrink-0 text-[#c50f1f]">{text1}</p>
    </div>
  );
}

function Placeholder1() {
  return (
    <div className="bg-[#ebf3fc] relative shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <Text text="SWAP WITH CONTENT COMPONENT" />
      </div>
    </div>
  );
}

type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center px-[43px] py-[15px] relative", additionalClassNames)}>
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f6cbd] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}

type PlaceholderProps = {
  className?: string;
  image?: React.ReactNode | null;
  instance?: React.ReactNode | null;
  slot?: "1" | "2";
  slotBefore?: boolean;
};

function Placeholder({ className, image = null, instance = null, slot = "1", slotBefore = true }: PlaceholderProps) {
  const is1 = slot === "1";
  const is2 = slot === "2";
  return (
    <div className={className || `relative ${is2 ? "" : "-translate-y-1/2 bg-[#ebf3fc]"}`}>
      <div className={`flex ${is2 ? "content-stretch gap-[16px] items-start relative" : "flex-row items-center justify-center size-full"}`}>
        {is1 && <Text text="SWAP WITH CONTENT COMPONENT" />}
        {is2 && slotBefore && (image || <Placeholder1 />)}
        {is2 && (instance || <Placeholder1 />)}
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface FieldProps_Display {
  instance?: React.ReactNode | null;
  size?: "Medium (Default)" | "Small" | "Large";
  label?: boolean;
  statusText?: boolean;
  helperText?: boolean;
}

function Field_Display({
  instance,
  size,
  label,
  statusText,
  helperText,
}: FieldProps_Display) {
  return (
    <Field
      instance={instance}
      size={size}
      label={label}
      statusText={statusText}
      helperText={helperText}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample MediumFieldWithStatusText
export function MediumFieldWithStatusText() {
  return (
    <Field_Display
      instance={<input type="text" placeholder="Enter text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />}
      size="Medium (Default)"
      label={true}
      statusText={true}
      helperText={false}
    />
  );
}

// @figmaExample SmallFieldWithHelperText
export function SmallFieldWithHelperText() {
  return (
    <Field_Display
      instance={<input type="text" placeholder="Enter text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />}
      size="Small"
      label={true}
      statusText={false}
      helperText={true}
    />
  );
}

// @figmaExample LargeFieldWithAllText
export function LargeFieldWithAllText() {
  return (
    <Field_Display
      instance={<input type="text" placeholder="Enter text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />}
      size="Large"
      label={true}
      statusText={true}
      helperText={true}
    />
  );
}

// @figmaExample MediumTextareaField
export function MediumTextareaField() {
  return (
    <Field_Display
      instance={<textarea placeholder="Enter description" className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} />}
      size="Medium (Default)"
      label={true}
      statusText={true}
      helperText={false}
    />
  );
}

// @figmaExample MediumSelectField
export function MediumSelectField() {
  return (
    <Field_Display
      instance={
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      }
      size="Medium (Default)"
      label={true}
      statusText={false}
      helperText={true}
    />
  );
}

// @figmaExample FieldWithoutLabel
export function FieldWithoutLabel() {
  return (
    <Field_Display
      instance={<input type="text" placeholder="No label" className="w-full px-3 py-2 border border-gray-300 rounded-md" />}
      size="Medium (Default)"
      label={false}
      statusText={true}
      helperText={false}
    />
  );
}