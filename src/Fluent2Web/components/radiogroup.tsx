import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';

/**
 * RadioGroup - A collection of radio button inputs that allows users to select a single option from multiple choices.
 * 
 * Supports both controlled and uncontrolled usage patterns:
 * - Controlled: Pass both `value` and `onChange` props to manage state externally
 * - Uncontrolled: Omit `value` prop and the component manages its own internal state
 */
export interface RadioGroupProps {
  className?: string; // Optional CSS classes to apply to the root container
  direction?: "Horizontal stacked" | "Vertical" | "Horizontal"; // Layout direction (default: "Vertical")
  value?: string; // The currently selected radio value (for controlled mode)
  onChange?: (value: string) => void; // Callback fired when selection changes
  name?: string; // The name attribute for the radio group (default: "radio-group")
  options?: Array<{ value: string; label: string }>; // Array of radio options to render (default: 5 options, max 5 will be rendered)
}

// ---------------------- Main Component ----------------------

export function RadioGroup({ 
  className, 
  direction = "Vertical", 
  value: controlledValue,
  onChange: onChangeProp,
  name = "radio-group",
  options = [
    { value: "option1", label: "Label" },
    { value: "option2", label: "Label" },
    { value: "option3", label: "Label" },
    { value: "option4", label: "Label" },
    { value: "option5", label: "Label" },
  ]
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState<string>(options[0]?.value || "");
  
  // Support both controlled and uncontrolled usage
  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChange = (value: string) => {
    if (controlledValue === undefined) {
      setInternalValue(value);
    }
    if (onChangeProp) {
      onChangeProp(value);
    }
  };
  
  const isHorizontal = direction === "Horizontal";
  const isHorizontalOrHorizontalStacked = ["Horizontal", "Horizontal stacked"].includes(direction);
  const isHorizontalStacked = direction === "Horizontal stacked";
  const isVertical = direction === "Vertical";
  
  const radioLayout = isHorizontalStacked ? "Icon+Label below" : "Icon+Label after";
  
  return (
    <div className={className || "relative"}>
      <div className={`content-stretch flex items-start relative ${isHorizontalOrHorizontalStacked ? "" : "flex-col"}`}>
        {options.slice(0, isVertical ? 5 : 5).map((option, index) => (
          <Radio 
            key={option.value}
            className="relative shrink-0" 
            layout={radioLayout}
            checked={selectedValue === option.value}
            value={option.value}
            name={name}
            onChange={handleChange}
            label={option.label}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex gap-[4px] items-end relative", additionalClassNames)}>
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px]">{text}</p>
    </div>
  );
}

type LabelTextProps = {
  text: string;
};

function LabelText({ text }: LabelTextProps) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-end size-full">
        <Text text={text} additionalClassNames="w-full" />
      </div>
    </div>
  );
}

type OuterCircleProps = {
  checked?: boolean;
};

function OuterCircle({ checked = false }: OuterCircleProps) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <circle cx="8" cy="8" id="Outer Circle" r="7.5" stroke="var(--stroke-0, #616161)" />
        {checked && <circle cx="8" cy="8" r="4" fill="#0078D4" />}
      </svg>
    </div>
  );
}

type RadioBaseProps = {
  className?: string;
  layout?: "Icon only" | "Icon+Label after" | "Icon+Label below";
  state?: "Unchecked";
  subtext?: boolean;
  subtextString?: string;
  checked?: boolean;
  label?: string;
};

function RadioBase({ className, layout = "Icon only", state = "Unchecked", subtext = false, subtextString = "Subtext", checked = false, label = "Label" }: RadioBaseProps) {
  const isIconLabelAfterAndUnchecked = layout === "Icon+Label after";
  const isIconLabelBelowAndUnchecked = layout === "Icon+Label below";
  const isIconOnlyAndUnchecked = layout === "Icon only";
  return (
    <div className={className || "relative"}>
      <div className={`flex ${isIconLabelBelowAndUnchecked ? "flex-col items-center size-full" : isIconLabelAfterAndUnchecked ? "content-stretch gap-[4px] items-start pr-[8px] relative" : "content-stretch items-start p-[8px] relative"}`}>
        {isIconOnlyAndUnchecked && <OuterCircle checked={checked} />}
        {isIconLabelAfterAndUnchecked && (
          <>
            <div className="relative shrink-0" data-name=".RadioBase">
              <div className="content-stretch flex items-start p-[8px] relative">
                <OuterCircle checked={checked} />
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0" data-name="Text container">
              <LabelText text={label} />
              {subtext && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#616161] text-[12px] w-full whitespace-pre-wrap">{subtextString}</p>}
            </div>
          </>
        )}
        {isIconLabelBelowAndUnchecked && (
          <div className="content-stretch flex flex-col gap-[4px] items-center pb-[8px] px-[6px] relative">
            <div className="relative shrink-0" data-name=".RadioBase">
              <div className="content-stretch flex items-start p-[8px] relative">
                <OuterCircle checked={checked} />
              </div>
            </div>
            <div className="relative shrink-0" data-name="Label">
              <div className="flex flex-row items-end size-full">
                <Text text={label} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type RadioProps = {
  className?: string;
  checked?: boolean;
  layout?: "Icon+Label after" | "Icon+Label below";
  state?: "Rest";
  value: string;
  name: string;
  onChange: (value: string) => void;
  label?: string;
};

function Radio({ className, checked = false, layout = "Icon+Label after", state = "Rest", value, name, onChange, label = "Label" }: RadioProps) {
  const isIconLabelBelowAndOffAndRest = layout === "Icon+Label below";
  
  const handleClick = () => {
    onChange(value);
  };
  
  return (
    <div className={className || "relative"} onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className={`content-stretch flex items-start relative ${isIconLabelBelowAndOffAndRest ? "flex-col" : ""}`}>
        <RadioBase 
          className="relative shrink-0" 
          layout={isIconLabelBelowAndOffAndRest ? "Icon+Label below" : "Icon+Label after"} 
          checked={checked}
          label={label}
        />
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface RadioGroupProps_Display {
  direction?: "Horizontal stacked" | "Vertical" | "Horizontal";
  options?: Array<{ value: string; label: string }>;
  name?: string;
}

function RadioGroup_Display({
  direction,
  options,
  name,
}: RadioGroupProps_Display) {
  const [selectedValue, setSelectedValue] = React.useState<string>(
    options?.[0]?.value || "option1"
  );

  return (
    <RadioGroup
      value={selectedValue}
      onChange={setSelectedValue}
      direction={direction}
      options={options}
      name={name}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample VerticalSizeSelector
export function VerticalSizeSelector() {
  return (
    <RadioGroup_Display
      direction="Vertical"
      options={[
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
      ]}
      name="size-vertical"
    />
  );
}

// @figmaExample HorizontalChoiceSelector
export function HorizontalChoiceSelector() {
  return (
    <RadioGroup_Display
      direction="Horizontal"
      options={[
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "maybe", label: "Maybe" },
      ]}
      name="choice-horizontal"
    />
  );
}

// @figmaExample HorizontalStackedOptions
export function HorizontalStackedOptions() {
  return (
    <RadioGroup_Display
      direction="Horizontal stacked"
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
      ]}
      name="stacked-horizontal"
    />
  );
}

// @figmaExample VerticalSkillLevelSelector
export function VerticalSkillLevelSelector() {
  return (
    <RadioGroup_Display
      direction="Vertical"
      options={[
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "expert", label: "Expert" },
      ]}
      name="level-vertical"
    />
  );
}

// @figmaExample HorizontalFrequencySelector
export function HorizontalFrequencySelector() {
  return (
    <RadioGroup_Display
      direction="Horizontal"
      options={[
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
      ]}
      name="frequency-horizontal"
    />
  );
}