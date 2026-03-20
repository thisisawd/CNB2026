import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-pdatltp37q';

/**
 * A toggle switch component for binary on/off states with full accessibility support.
 * Appears as a horizontal pill-shaped track with a circular thumb that slides between left (unchecked) and right (checked) positions.
 * The track is gray when unchecked and blue when checked. Can optionally include labels positioned before, after, or above the switch.
 *
 * This component can be used in both controlled and uncontrolled modes. When the `checked` prop is provided, it operates as a controlled component
 * and requires an `onChange` handler. When `checked` is undefined, it manages its own internal state.
 *
 * The switch automatically handles visual states (hover, pressed, focus) and provides full keyboard accessibility (Space/Enter keys to toggle).
 */
export interface SwitchProps {
  className?: string; // Custom CSS class to apply to the root element
  checked?: boolean; // Controlled checked state. When provided, component operates in controlled mode. When undefined, component manages its own internal state
  layout?: 'Switch' | 'Switch+Label after' | 'Switch+Label before' | 'Switch+Label above'; // Layout variant (default: "Switch")
  state?: 'Rest' | 'Hover' | 'Pressed' | 'Focus' | 'Disabled'; // Initial visual state. Note: This is overridden by user interactions and the disabled prop (default: "Rest")
  onChange?: (checked: boolean) => void; // Callback function called when the switch is toggled. Receives the new checked state as an argument
  disabled?: boolean; // When true, disables the switch and prevents interaction. Changes visual appearance to a muted gray state (default: false)
}

// ---------------------- Main Component ----------------------

export function Switch({ 
  className, 
  checked: controlledChecked, 
  layout = "Switch", 
  state: initialState = "Rest",
  onChange,
  disabled = false
}: SwitchProps) {
  // Internal state management
  const [internalChecked, setInternalChecked] = useState(false);
  const [currentState, setCurrentState] = useState(initialState);
  
  // Use controlled value if provided, otherwise use internal state
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  const state = disabled ? "Disabled" : currentState;
  
  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !checked;
    
    // Update internal state if uncontrolled
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }
    
    // Call onChange callback
    if (onChange) {
      onChange(newChecked);
    }
  };
  
  // Handle click
  const handleClick = () => {
    handleToggle();
  };
  
  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };
  
  // Handle mouse events for state visual feedback
  const handleMouseEnter = () => {
    if (!disabled) {
      setCurrentState("Hover");
    }
  };
  
  const handleMouseLeave = () => {
    if (!disabled) {
      setCurrentState("Rest");
    }
  };
  
  const handleMouseDown = () => {
    if (!disabled) {
      setCurrentState("Pressed");
    }
  };
  
  const handleMouseUp = () => {
    if (!disabled) {
      setCurrentState("Hover");
    }
  };
  
  const handleFocus = () => {
    if (!disabled) {
      setCurrentState("Focus");
    }
  };
  
  const handleBlur = () => {
    if (!disabled) {
      setCurrentState("Rest");
    }
  };
  
  const isSwitchAndCheckedAndRest = layout === "Switch" && checked && state === "Rest";
  const isSwitchAndNotCheckedAndDisabled = layout === "Switch" && !checked && state === "Disabled";
  const isSwitchAndNotCheckedAndFocus = layout === "Switch" && !checked && state === "Focus";
  const isSwitchAndNotCheckedAndHover = layout === "Switch" && !checked && state === "Hover";
  const isSwitchAndNotCheckedAndPressed = layout === "Switch" && !checked && state === "Pressed";
  const isSwitchAndNotCheckedAndRest = layout === "Switch" && !checked && state === "Rest";
  const isSwitchLabelAboveAndNotCheckedAndRest = layout === "Switch+Label above" && !checked && state === "Rest";
  const isSwitchLabelAfterAndNotCheckedAndRest = layout === "Switch+Label after" && !checked && state === "Rest";
  const isSwitchLabelBeforeAndNotCheckedAndRest = layout === "Switch+Label before" && !checked && state === "Rest";
  
  return (
    <div 
      className={className || `relative ${isSwitchAndNotCheckedAndFocus ? "rounded-[4px]" : isSwitchAndNotCheckedAndHover ? "cursor-pointer" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      <div aria-hidden={isSwitchAndNotCheckedAndFocus ? "true" : undefined} className={isSwitchAndNotCheckedAndFocus ? "absolute border-3 border-solid border-white inset-0 pointer-events-none rounded-[4px]" : "content-stretch flex flex-col items-start relative"}>
        {(isSwitchAndNotCheckedAndRest || isSwitchAndNotCheckedAndHover || isSwitchAndNotCheckedAndPressed || isSwitchAndNotCheckedAndDisabled || isSwitchLabelAfterAndNotCheckedAndRest || isSwitchLabelBeforeAndNotCheckedAndRest || isSwitchLabelAboveAndNotCheckedAndRest || isSwitchAndCheckedAndRest) && (
          <div className="relative shrink-0" data-name=".SwitchBase">
            <div className={`content-stretch flex flex-col items-start relative ${isSwitchLabelAfterAndNotCheckedAndRest || isSwitchLabelBeforeAndNotCheckedAndRest || isSwitchLabelAboveAndNotCheckedAndRest ? "" : "p-[8px]"}`}>
              {(isSwitchAndNotCheckedAndRest || isSwitchAndNotCheckedAndHover || isSwitchAndNotCheckedAndPressed || isSwitchAndNotCheckedAndDisabled || isSwitchAndCheckedAndRest) && (
                <TrackThumb>
                  {(isSwitchAndNotCheckedAndRest || isSwitchAndNotCheckedAndHover || isSwitchAndNotCheckedAndPressed || isSwitchAndNotCheckedAndDisabled) && (
                    <>
                      <g id="Track">
                        <mask fill="white" id={isSwitchAndNotCheckedAndDisabled ? "path-1-inside-1_0_841" : isSwitchAndNotCheckedAndPressed ? "path-1-inside-1_0_832" : isSwitchAndNotCheckedAndHover ? "path-1-inside-1_0_838" : "path-1-inside-1_0_829"}>
                          <path d={svgPaths.p1a71ba80} />
                        </mask>
                        <path d={svgPaths.p21bc3880} fill={isSwitchAndNotCheckedAndDisabled ? "var(--stroke-0, #E0E0E0)" : isSwitchAndNotCheckedAndPressed ? "var(--stroke-0, #4D4D4D)" : isSwitchAndNotCheckedAndHover ? "var(--stroke-0, #575757)" : "var(--stroke-0, #616161)"} mask={isSwitchAndNotCheckedAndDisabled ? "url(#path-1-inside-1_0_841)" : isSwitchAndNotCheckedAndPressed ? "url(#path-1-inside-1_0_832)" : isSwitchAndNotCheckedAndHover ? "url(#path-1-inside-1_0_838)" : "url(#path-1-inside-1_0_829)"} />
                      </g>
                      <circle cx="10" cy="10" fill={isSwitchAndNotCheckedAndDisabled ? "var(--fill-0, #BDBDBD)" : isSwitchAndNotCheckedAndPressed ? "var(--fill-0, #4D4D4D)" : isSwitchAndNotCheckedAndHover ? "var(--fill-0, #575757)" : "var(--fill-0, #616161)"} id="Thumb" r="7" />
                    </>
                  )}
                  {isSwitchAndCheckedAndRest && (
                    <>
                      <path d={svgPaths.p1a71ba80} fill="var(--fill-0, #0F6CBD)" id="Track" />
                      <circle cx="30" cy="10" fill="var(--fill-0, white)" id="Thumb" r="7" />
                    </>
                  )}
                </TrackThumb>
              )}
              {(isSwitchLabelAfterAndNotCheckedAndRest || isSwitchLabelBeforeAndNotCheckedAndRest) && (
                <div className="content-stretch flex items-center relative shrink-0" data-name="Vertical labels">
                  <SwitchText text="Label" additionalClassNames="pl-[8px] pr-[4px]" />
                  <SwitchSwitchBase />
                  <SwitchText text="Label" additionalClassNames="pl-[4px] pr-[8px]" />
                </div>
              )}
              {isSwitchLabelAboveAndNotCheckedAndRest && (
                <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Horizontal labels">
                  <SwitchText text="Label" additionalClassNames="px-[8px]" />
                  <SwitchSwitchBase />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isSwitchAndNotCheckedAndFocus && (
        <div className="content-stretch flex flex-col items-start relative">
          <SwitchSwitchBase />
        </div>
      )}
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function TrackThumb({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[20px] relative shrink-0 w-[40px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 20">
        <g id="Track+Thumb">{children}</g>
      </svg>
    </div>
  );
}

function SwitchSwitchBase() {
  return (
    <div className="relative shrink-0">
      <div className="content-stretch flex flex-col items-start p-[8px] relative">
        <TrackThumb>
          <g id="Track">
            <mask fill="white" id="path-1-inside-1_0_829">
              <path d={svgPaths.p1a71ba80} />
            </mask>
            <path d={svgPaths.p21bc3880} fill="var(--stroke-0, #616161)" mask="url(#path-1-inside-1_0_829)" />
          </g>
          <circle cx="10" cy="10" fill="var(--fill-0, #616161)" id="Thumb" r="7" />
        </TrackThumb>
      </div>
    </div>
  );
}

type SwitchTextProps = {
  text: string;
  additionalClassNames?: string;
};

function SwitchText({ text, additionalClassNames = "" }: SwitchTextProps) {
  return (
    <div className={clsx("content-stretch flex items-start relative shrink-0", additionalClassNames)}>
      <div className="relative shrink-0" data-name="Label">
        <div className="flex flex-row items-end size-full">
          <div className="content-stretch flex gap-[4px] items-end relative">
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px]">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface SwitchProps_Display {
  layout?: 'Switch' | 'Switch+Label after' | 'Switch+Label before' | 'Switch+Label above';
  disabled?: boolean;
}

function Switch_Display({
  layout,
  disabled,
}: SwitchProps_Display) {
  const [checked, setChecked] = React.useState(false);

  return (
    <Switch
      layout={layout}
      disabled={disabled}
      checked={checked}
      onChange={setChecked}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample BasicSwitch
export function SwitchExample1() {
  return (
    <Switch_Display
      layout="Switch"
    />
  );
}

// @figmaExample SwitchWithLabelAfter
export function SwitchExample2() {
  return (
    <Switch_Display
      layout="Switch+Label after"
    />
  );
}

// @figmaExample SwitchWithLabelBefore
export function SwitchExample3() {
  return (
    <Switch_Display
      layout="Switch+Label before"
    />
  );
}

// @figmaExample SwitchWithLabelAbove
export function SwitchExample4() {
  return (
    <Switch_Display
      layout="Switch+Label above"
    />
  );
}

// @figmaExample DisabledSwitch
export function SwitchExample5() {
  return (
    <Switch_Display
      layout="Switch"
      disabled={true}
    />
  );
}

// @figmaExample DisabledSwitchWithLabelAfter
export function SwitchExample6() {
  return (
    <Switch_Display
      layout="Switch+Label after"
      disabled={true}
    />
  );
}