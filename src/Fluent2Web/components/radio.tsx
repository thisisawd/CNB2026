import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-fl88yj6bto';

/**
 * A radio button component for selecting a single option from a set of mutually exclusive choices.
 * Appears as a circular button that displays an empty circle when unchecked and a filled blue circle when checked.
 * Can be rendered in three layout variants: icon-only (32x32px), with label positioned after the icon, or with label positioned below the icon.
 * Automatically handles hover, pressed, focus, and disabled visual states with appropriate styling.
 *
 * Important Usage Notes:
 * - Radio buttons can only be selected, never unselected by clicking again (standard radio behavior)
 * - Once checked, only clicking another radio in the same group will uncheck it
 * - Use the same `name` prop for all radios in a group to ensure mutual exclusivity
 * - Keyboard accessible: use Space or Enter to select when focused
 * - Focus state shows a black border around the radio for visibility
 * - The component manages its own internal hover/pressed/focus states but defers to the `state` prop when provided
 */
export interface RadioProps {
  className?: string; // Custom CSS class name for the outer container
  checked?: boolean; // Whether the radio button is currently selected. In a radio group, only one should be checked at a time. (default: false)
  layout?: 'Icon only' | 'Icon+Label after' | 'Icon+Label below'; // Determines the visual layout of the radio button (default: 'Icon only')
  state?: 'Rest' | 'Hover' | 'Pressed' | 'Disabled' | 'Focus'; // Explicitly sets the visual state. When set to 'Rest', the component will automatically manage hover, pressed, and focus states based on user interaction. (default: 'Rest')
  onChange?: (checked: boolean) => void; // Callback function invoked when the user selects the radio. Called with `true` when the radio is selected. Not called when clicking an already-checked radio.
  name?: string; // The name attribute for the underlying radio input. Used to group radio buttons together so only one in the group can be selected at a time.
  value?: string; // The value attribute for the underlying radio input. Useful for form submissions.
  disabled?: boolean; // When true, prevents user interaction and displays the radio in a disabled visual state (lighter gray colors). Cursor changes to 'not-allowed'. (default: false)
  label?: string; // The accessible label for the radio button, used for the aria-label attribute. Also displayed visually when using 'Icon+Label after' or 'Icon+Label below' layouts. (default: 'Label')
}

// ---------------------- Main Component ----------------------

export function Radio({ 
  className, 
  checked = false, 
  layout = "Icon only", 
  state = "Rest",
  onChange,
  name,
  value,
  disabled = false,
  label = "Label"
}: RadioProps) {
  const [internalHover, setInternalHover] = useState(false);
  const [internalPressed, setInternalPressed] = useState(false);
  const [internalFocus, setInternalFocus] = useState(false);
  
  // Determine effective state based on props and internal state
  const effectiveState = disabled ? "Disabled" : 
                         state !== "Rest" ? state :
                         internalPressed ? "Pressed" :
                         internalFocus ? "Focus" :
                         internalHover ? "Hover" : "Rest";
  
  const isDisabled = disabled || effectiveState === "Disabled";
  
  const handleClick = () => {
    if (isDisabled || checked) return;
    onChange?.(true);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!checked) {
        onChange?.(true);
      }
    }
  };
  
  const handleMouseDown = () => {
    if (!isDisabled) {
      setInternalPressed(true);
    }
  };
  
  const handleMouseUp = () => {
    setInternalPressed(false);
  };
  
  const handleMouseEnter = () => {
    if (!isDisabled) {
      setInternalHover(true);
    }
  };
  
  const handleMouseLeave = () => {
    setInternalHover(false);
    setInternalPressed(false);
  };
  
  const handleFocus = () => {
    if (!isDisabled) {
      setInternalFocus(true);
    }
  };
  
  const handleBlur = () => {
    setInternalFocus(false);
    setInternalPressed(false);
  };
  
  const isIconLabelAfterAndNotCheckedAndRest = layout === "Icon+Label after" && !checked && effectiveState === "Rest";
  const isIconLabelBelowAndNotCheckedAndRest = layout === "Icon+Label below" && !checked && effectiveState === "Rest";
  const isIconOnlyAndCheckedAndRest = layout === "Icon only" && checked && effectiveState === "Rest";
  const isIconOnlyAndNotCheckedAndDisabled = layout === "Icon only" && !checked && effectiveState === "Disabled";
  const isIconOnlyAndNotCheckedAndFocus = layout === "Icon only" && !checked && effectiveState === "Focus";
  const isIconOnlyAndNotCheckedAndHover = layout === "Icon only" && !checked && effectiveState === "Hover";
  const isIconOnlyAndNotCheckedAndPressed = layout === "Icon only" && !checked && effectiveState === "Pressed";
  const isIconOnlyAndNotCheckedAndRest = layout === "Icon only" && !checked && effectiveState === "Rest";
  
  return (
    <div 
      className={className || `relative ${isIconLabelAfterAndNotCheckedAndRest || isIconLabelBelowAndNotCheckedAndRest ? "" : isIconOnlyAndNotCheckedAndFocus ? "rounded-[4px] size-[32px]" : "size-[32px]"}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={isDisabled ? -1 : 0}
      role="radio"
      aria-checked={checked}
      aria-disabled={isDisabled}
      aria-label={label}
      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => {}}
        disabled={isDisabled}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
      {(isIconOnlyAndNotCheckedAndHover || isIconOnlyAndNotCheckedAndPressed || isIconOnlyAndNotCheckedAndDisabled) && (
        <div className="-translate-y-1/2 absolute left-0 right-0 top-1/2" data-name=".RadioBase">
          <div className="content-stretch flex items-start p-[8px] relative">
            <Wrapper>
              <circle cx="8" cy="8" id="Outer Circle" r="7.5" stroke={isIconOnlyAndNotCheckedAndDisabled ? "var(--stroke-0, #BDBDBD)" : isIconOnlyAndNotCheckedAndPressed ? "var(--stroke-0, #4D4D4D)" : "var(--stroke-0, #575757)"} />
            </Wrapper>
          </div>
        </div>
      )}
      {(isIconOnlyAndNotCheckedAndFocus || isIconLabelAfterAndNotCheckedAndRest || isIconLabelBelowAndNotCheckedAndRest) && (
        <div className={`relative ${isIconLabelBelowAndNotCheckedAndRest ? "content-stretch flex flex-col items-start" : isIconLabelAfterAndNotCheckedAndRest ? "content-stretch flex items-start" : "overflow-clip rounded-[inherit] size-full"}`}>
          {(isIconLabelAfterAndNotCheckedAndRest || isIconLabelBelowAndNotCheckedAndRest) && <RadioBase className="relative shrink-0" layout={isIconLabelBelowAndNotCheckedAndRest ? "Icon+Label below" : "Icon+Label after"} state="Unchecked" />}
          {isIconOnlyAndNotCheckedAndFocus && (
            <div className="-translate-y-1/2 absolute left-0 right-0 top-1/2" data-name=".RadioBase">
              <div className="content-stretch flex items-start p-[8px] relative">
                <OuterCircle />
              </div>
            </div>
          )}
        </div>
      )}
      {(isIconOnlyAndNotCheckedAndRest || isIconOnlyAndCheckedAndRest) && <RadioBase className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2" state={isIconOnlyAndNotCheckedAndRest ? "Unchecked" : undefined} />}
      {isIconOnlyAndNotCheckedAndFocus && <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />}
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

type RadioBaseTextProps = {
  text: string;
  additionalClassNames?: string;
};

function RadioBaseText({ text, additionalClassNames = "" }: RadioBaseTextProps) {
  return (
    <div className={clsx("content-stretch flex gap-[4px] items-end relative", additionalClassNames)}>
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px]">{text}</p>
    </div>
  );
}

function OuterCircle() {
  return (
    <Wrapper>
      <circle cx="8" cy="8" id="Outer Circle" r="7.5" stroke="var(--stroke-0, #616161)" />
    </Wrapper>
  );
}

function Icon() {
  return (
    <Wrapper>
      <g id="Icon">
        <path d={svgPaths.p102d7900} id="Outer Circle" stroke="var(--stroke-0, #0F6CBD)" />
        <circle cx="8" cy="8" fill="var(--fill-0, #0F6CBD)" id="Inside Circle" r="4.5" stroke="var(--stroke-0, #0F6CBD)" />
      </g>
    </Wrapper>
  );
}

function RadioBaseHelper() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative">
      <Icon />
    </div>
  );
}

type RadioBaseProps = {
  className?: string;
  layout?: "Icon only" | "Icon+Label after" | "Icon+Label below";
  state?: "Default" | "Checked" | "Unchecked";
  subtext?: boolean;
  subtextString?: string;
};

function RadioBase({ className, layout = "Icon only", state = "Checked", subtext = false, subtextString = "Subtext" }: RadioBaseProps) {
  const isIconLabelAfterAndChecked = layout === "Icon+Label after" && state === "Checked";
  const isIconLabelAfterAndUnchecked = layout === "Icon+Label after" && state === "Unchecked";
  const isIconLabelBelowAndDefault = layout === "Icon+Label below" && state === "Default";
  const isIconLabelBelowAndUnchecked = layout === "Icon+Label below" && state === "Unchecked";
  const isIconOnlyAndChecked = layout === "Icon only" && state === "Checked";
  const isIconOnlyAndUnchecked = layout === "Icon only" && state === "Unchecked";
  return (
    <div className={className || "relative"}>
      <div className={`flex ${isIconOnlyAndUnchecked ? "content-stretch items-start p-[8px] relative" : isIconLabelBelowAndDefault || isIconLabelBelowAndUnchecked ? "flex-col items-center size-full" : isIconLabelAfterAndChecked || isIconLabelAfterAndUnchecked ? "content-stretch gap-[4px] items-start pr-[8px] relative" : "flex-row items-center justify-center size-full"}`}>
        {(isIconOnlyAndChecked || isIconLabelBelowAndDefault || isIconLabelBelowAndUnchecked) && (
          <div className={`content-stretch flex items-center relative ${isIconLabelBelowAndDefault || isIconLabelBelowAndUnchecked ? "flex-col gap-[4px] pb-[8px] px-[6px]" : "justify-center p-[8px]"}`}>
            {(isIconLabelBelowAndDefault || isIconLabelBelowAndUnchecked) && (
              <>
                <div className="relative shrink-0" data-name=".RadioBase">
                  <div className={`flex ${isIconLabelBelowAndUnchecked ? "content-stretch items-start p-[8px] relative" : "flex-row items-center justify-center size-full"}`}>
                    {isIconLabelBelowAndDefault && <RadioBaseHelper />}
                    {isIconLabelBelowAndUnchecked && <OuterCircle />}
                  </div>
                </div>
                <div className="relative shrink-0" data-name="Label">
                  <div className="flex flex-row items-end size-full">
                    <RadioBaseText text="Label" />
                  </div>
                </div>
              </>
            )}
            {isIconOnlyAndChecked && <Icon />}
          </div>
        )}
        {(isIconLabelAfterAndChecked || isIconLabelAfterAndUnchecked) && (
          <>
            <div className="relative shrink-0" data-name=".RadioBase">
              <div className={`flex ${isIconLabelAfterAndUnchecked ? "content-stretch items-start p-[8px] relative" : "flex-row items-center justify-center size-full"}`}>
                {isIconLabelAfterAndChecked && <RadioBaseHelper />}
                {isIconLabelAfterAndUnchecked && <OuterCircle />}
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0" data-name="Text container">
              <div className="relative shrink-0 w-full" data-name="Label">
                <div className="flex flex-row items-end size-full">
                  <RadioBaseText text="Label" additionalClassNames="w-full" />
                </div>
              </div>
              {subtext && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#616161] text-[12px] w-full whitespace-pre-wrap">{subtextString}</p>}
            </div>
          </>
        )}
        {isIconOnlyAndUnchecked && <OuterCircle />}
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface RadioProps_Display {
  layout?: 'Icon only' | 'Icon+Label after' | 'Icon+Label below';
  disabled?: boolean;
  label?: string;
}

function Radio_Display({
  layout,
  disabled,
  label,
}: RadioProps_Display) {
  const [checked, setChecked] = React.useState(false);

  return (
    <Radio
      layout={layout}
      disabled={disabled}
      label={label}
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked)}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample IconOnlyRadio
export function IconOnlyRadio() {
  return (
    <Radio_Display
      layout="Icon only"
      label="Icon Only Radio"
    />
  );
}

// @figmaExample OptionARadio
export function OptionARadio() {
  return (
    <Radio_Display
      layout="Icon+Label after"
      label="Option A"
    />
  );
}

// @figmaExample LongLabelRadio
export function LongLabelRadio() {
  return (
    <Radio_Display
      layout="Icon+Label after"
      label="Option with a longer descriptive label"
    />
  );
}

// @figmaExample CenteredBelowRadio
export function CenteredBelowRadio() {
  return (
    <Radio_Display
      layout="Icon+Label below"
      label="Centered"
    />
  );
}

// @figmaExample DisabledOptionRadio
export function DisabledOptionRadio() {
  return (
    <Radio_Display
      layout="Icon+Label after"
      label="Disabled Option"
      disabled={true}
    />
  );
}

// @figmaExample DisabledIconOnlyRadio
export function DisabledIconOnlyRadio() {
  return (
    <Radio_Display
      layout="Icon only"
      label="Disabled Icon Only"
      disabled={true}
    />
  );
}