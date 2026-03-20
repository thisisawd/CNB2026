import * as React from 'react';
import { useState, useRef } from 'react';
import svgPaths from './svg-xtecmu18fs';

/**
 * A flexible text input field component with comprehensive styling options and icon support.
 * Appears as a horizontally-oriented input field with customizable borders, backgrounds, and decorative icons.
 * Takes up 280px width by default with variable height based on size (28px for Small, 32px for Medium, 40px for Large).
 * 
 * Usage Notes:
 * - Component automatically manages internal state for hover, focus, and pressed interactions
 * - Can be used as controlled (pass value and onChange) or uncontrolled (omit value prop)
 * - State prop can be overridden by disabled/readOnly props and interactive states
 * - Icons are optional and can be customized or use defaults (Calendar icon before, Chevron/ErrorCircle after)
 * - Icon sizes must match the input size (16px for Small, 20px for Medium, 24px for Large)
 * - The component includes built-in visual states with automatic border color changes
 */
export interface InputProps {
  className?: string; // Optional custom className to override default styling
  
  size?: "Small" | "Medium (Default)" | "Large"; // Controls input height and font size (default: "Medium (Default)")
  style?: "Outline" | "Filled darker" | "Filled lighter" | "Underline"; // Visual appearance style (default: "Outline")
  state?: "Rest" | "Hover" | "Pressed" | "Focus" | "Error" | "Disabled" | "Read only"; // Visual state (default: "Rest")
  
  value?: string; // Controlled value for the input field
  onChange?: (value: string) => void; // Callback fired when input value changes
  onFocus?: () => void; // Callback fired when input receives focus
  onBlur?: () => void; // Callback fired when input loses focus
  
  placeholder?: string; // Placeholder text shown when input is empty (default: "Placeholder text")
  disabled?: boolean; // Disables the input and prevents interaction (default: false)
  readOnly?: boolean; // Makes input read-only, preventing edits (default: false)
  type?: string; // HTML input type attribute (default: "text")
  
  iconBefore?: boolean; // Shows an icon before the input text (default: false)
  iconBefore16PxRegular?: React.ReactNode; // Custom 16px icon for Small size (default: Calendar icon)
  iconBefore20PxRegular?: React.ReactNode; // Custom 20px icon for Medium size (default: Calendar icon)
  iconBefore24PxRegular?: React.ReactNode; // Custom 24px icon for Large size (default: Calendar icon)
  onIconBeforeClick?: () => void; // Callback when before icon is clicked (also focuses input)
  
  iconAfter1?: boolean; // Shows the first icon after the input text (default: false)
  iconAfter116PxRegular?: React.ReactNode; // Custom 16px icon 1 for Small size (default: Chevron down)
  iconAfter120PxRegular?: React.ReactNode; // Custom 20px icon 1 for Medium size (default: Chevron down)
  iconAfter124PxRegular?: React.ReactNode; // Custom 24px icon 1 for Large size (default: Chevron down)
  onIconAfter1Click?: () => void; // Callback when first after icon is clicked
  
  iconAfter2?: boolean; // Shows the second icon after the input text (default: false)
  iconAfter216PxRegular?: React.ReactNode; // Custom 16px icon 2 for Small size (default: Error circle)
  iconAfter220PxRegular?: React.ReactNode; // Custom 20px icon 2 for Medium size (default: Error circle)
  iconAfter224PxRegular?: React.ReactNode; // Custom 24px icon 2 for Large size (default: Error circle)
  onIconAfter2Click?: () => void; // Callback when second after icon is clicked
}

// ---------------------- Main Component ----------------------

export function Input({ className, iconAfter1 = false, iconAfter116PxRegular = null, iconAfter120PxRegular = null, iconAfter124PxRegular = null, iconAfter2 = false, iconAfter216PxRegular = null, iconAfter220PxRegular = null, iconAfter224PxRegular = null, iconBefore = false, iconBefore16PxRegular = null, iconBefore20PxRegular = null, iconBefore24PxRegular = null, size = "Medium (Default)", state: stateProp = "Rest", style = "Outline", value: valueProp, onChange, onFocus: onFocusProp, onBlur: onBlurProp, placeholder = "Placeholder text", disabled = false, readOnly = false, type = "text", onIconBeforeClick, onIconAfter1Click, onIconAfter2Click }: InputProps) {
  // Internal state management
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use controlled or uncontrolled value
  const value = valueProp !== undefined ? valueProp : internalValue;
  const hasValue = value.length > 0;
  
  // Determine actual state based on props and internal state
  let state = stateProp;
  if (stateProp === "Rest" || stateProp === "Hover" || stateProp === "Pressed" || stateProp === "Focus") {
    if (disabled) {
      state = "Disabled";
    } else if (readOnly) {
      state = "Read only";
    } else if (isFocused) {
      state = "Focus";
    } else if (isPressed) {
      state = "Pressed";
    } else if (isHovered) {
      state = "Hover";
    } else {
      state = "Rest";
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    onFocusProp?.();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    setIsPressed(false);
    onBlurProp?.();
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
  
  const handleIconBeforeClick = () => {
    onIconBeforeClick?.();
    inputRef.current?.focus();
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
  const isUnderlineAndMediumDefaultAndRest = style === "Underline" && size === "Medium (Default)" && state === "Rest";
  
  // Determine font size and padding based on size
  const getFontSize = () => {
    if (size === "Large") return "text-[16px] leading-[22px]";
    if (size === "Small") return "text-[12px] leading-[16px]";
    return "text-[14px] leading-[20px]";
  };
  
  const getInputHeight = () => {
    if (size === "Large") return "h-[40px]";
    if (size === "Small") return "h-[28px]";
    return "h-[32px]";
  };
  
  const getInputPadding = () => {
    if (size === "Large") return "px-[12px] py-[8px]";
    if (size === "Small") return "px-[6px] py-[4px]";
    return "px-[10px] py-[6px]";
  };
  
  return (
    <div 
      className={className || `relative rounded-[4px] ${isOutlineAndMediumDefaultAndRest || isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndPressed || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndError || isOutlineAndMediumDefaultAndDisabled || isOutlineAndMediumDefaultAndReadOnly || isOutlineAndLargeAndRest || isUnderlineAndMediumDefaultAndRest ? "w-[280px]" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={`content-stretch flex flex-col items-start relative ${isUnderlineAndMediumDefaultAndRest ? "w-full" : isOutlineAndMediumDefaultAndRest || isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndPressed || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndError || isOutlineAndMediumDefaultAndDisabled || isOutlineAndMediumDefaultAndReadOnly || isOutlineAndLargeAndRest ? "overflow-clip rounded-[inherit] w-full" : "overflow-clip rounded-[inherit]"}`}>
        <div className={`relative rounded-[4px] shrink-0 w-full ${isUnderlineAndMediumDefaultAndRest ? "bg-[rgba(255,255,255,0)] content-stretch flex gap-[10px] items-center" : isOutlineAndMediumDefaultAndReadOnly ? "" : isOutlineAndMediumDefaultAndDisabled ? "bg-[rgba(255,255,255,0)]" : isFilledDarkerAndMediumDefaultAndRest ? "bg-[#f5f5f5]" : "bg-white"}`} data-name="Contents">
          {(isOutlineAndSmallAndRest || isOutlineAndMediumDefaultAndRest || isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndPressed || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndError || isOutlineAndMediumDefaultAndDisabled || isOutlineAndMediumDefaultAndReadOnly || isOutlineAndLargeAndRest) && (
            <>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[inherit] w-full">
                <div className={`flex-[1_0_0] min-h-px min-w-px relative ${isOutlineAndLargeAndRest ? "h-[40px]" : ""}`} data-name="Icon-Text-stack">
                  <div className="flex flex-row items-center size-full">
                    <div className={`content-stretch flex items-center relative ${isOutlineAndLargeAndRest ? "px-[12px] size-full" : isOutlineAndMediumDefaultAndRest || isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndPressed || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndError || isOutlineAndMediumDefaultAndDisabled || isOutlineAndMediumDefaultAndReadOnly ? "px-[10px] w-full" : "px-[6px] w-full"}`}>
                      {(isOutlineAndMediumDefaultAndRest || isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndPressed || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndError || isOutlineAndMediumDefaultAndReadOnly) && iconBefore && (
                        <div onClick={handleIconBeforeClick} className={onIconBeforeClick ? "cursor-pointer" : ""}>
                          {iconBefore20PxRegular || <InputCalendar onClick={handleIconBeforeClick} />}
                        </div>
                      )}
                      {(isOutlineAndMediumDefaultAndRest || isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndPressed || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndError) && (
                        <input
                          ref={inputRef}
                          type={type}
                          value={value}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder={placeholder}
                          disabled={disabled}
                          readOnly={readOnly}
                          className={`flex-1 bg-transparent border-none outline-none font-['Segoe_UI:Regular',sans-serif] ${getFontSize()} ${hasValue ? 'text-[#242424]' : 'text-[#707070]'} w-full`}
                        />
                      )}
                      {isOutlineAndSmallAndRest &&
                        iconBefore &&
                        (
                          <div onClick={handleIconBeforeClick} className={onIconBeforeClick ? "cursor-pointer" : ""}>
                            {iconBefore16PxRegular || (
                              <InputHelper>
                                <path d={svgPaths.p5290700} fill="var(--fill-0, #616161)" id="Shape" />
                              </InputHelper>
                            )}
                          </div>
                        )}
                      {(isOutlineAndSmallAndRest || isOutlineAndMediumDefaultAndReadOnly) && (
                        <input
                          ref={inputRef}
                          type={type}
                          value={value}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder={placeholder}
                          disabled={disabled}
                          readOnly={readOnly}
                          className={`flex-1 bg-transparent border-none outline-none font-['Segoe_UI:Regular',sans-serif] ${getFontSize()} ${hasValue ? 'text-[#242424]' : 'text-[#707070]'} w-full`}
                        />
                      )}
                      {isOutlineAndMediumDefaultAndDisabled &&
                        iconBefore &&
                        (
                          <div onClick={handleIconBeforeClick} className={onIconBeforeClick && !disabled ? "cursor-pointer" : "cursor-not-allowed"}>
                            {iconBefore20PxRegular || (
                              <Wrapper>
                                <path d={svgPaths.p37618c00} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                              </Wrapper>
                            )}
                          </div>
                        )}
                      {isOutlineAndMediumDefaultAndDisabled && (
                        <input
                          ref={inputRef}
                          type={type}
                          value={value}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder={placeholder}
                          disabled={disabled}
                          readOnly={readOnly}
                          className={`flex-1 bg-transparent border-none outline-none font-['Segoe_UI:Regular',sans-serif] ${getFontSize()} ${hasValue ? 'text-[#242424]' : 'text-[#707070]'} w-full cursor-not-allowed`}
                        />
                      )}
                      {isOutlineAndLargeAndRest &&
                        iconBefore &&
                        (
                          <div onClick={handleIconBeforeClick} className={onIconBeforeClick ? "cursor-pointer" : ""}>
                            {iconBefore24PxRegular || (
                              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Calendar">
                                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                                    <path d={svgPaths.p18a70500} fill="var(--fill-0, #616161)" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      {isOutlineAndLargeAndRest && (
                        <input
                          ref={inputRef}
                          type={type}
                          value={value}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder={placeholder}
                          disabled={disabled}
                          readOnly={readOnly}
                          className={`flex-1 bg-transparent border-none outline-none font-['Segoe_UI:Regular',sans-serif] ${getFontSize()} ${hasValue ? 'text-[#242424]' : 'text-[#707070]'} w-full`}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {(isOutlineAndMediumDefaultAndRest || isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndMediumDefaultAndPressed || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndError || isOutlineAndMediumDefaultAndReadOnly) && iconAfter1 && <InputIconEnd iconAfter2={iconAfter2} iconAfter220PxRegular={iconAfter220PxRegular} iconAfter1={iconAfter1} iconAfter120PxRegular={iconAfter120PxRegular} onIconAfter1Click={onIconAfter1Click} onIconAfter2Click={onIconAfter2Click} />}
                {isOutlineAndSmallAndRest && iconAfter1 && (
                  <div className="content-stretch flex gap-[4px] items-center justify-end pl-[2px] pr-[6px] py-[4px] relative shrink-0" data-name="Icon End">
                    {iconAfter2 &&
                      <div onClick={onIconAfter2Click} className={onIconAfter2Click ? "cursor-pointer" : ""}>
                        {iconAfter216PxRegular || (
                          <InputHelper>
                            <path d={svgPaths.p33687f00} fill="var(--fill-0, #C50F1F)" id="Shape" />
                          </InputHelper>
                        )}
                      </div>
                    }
                    {iconAfter1 &&
                      <div onClick={onIconAfter1Click} className={onIconAfter1Click ? "cursor-pointer" : ""}>
                        {iconAfter116PxRegular || (
                          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Chevron">
                            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[5.5px] left-1/2 top-[calc(50%+0.25px)] w-[10px]" data-name="Shape">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.5">
                                <path d={svgPaths.p22f5b00} fill="var(--fill-0, #616161)" id="Shape" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    }
                  </div>
                )}
                {isOutlineAndMediumDefaultAndDisabled && iconAfter1 && (
                  <div className="content-stretch flex gap-[4px] items-center justify-end pl-[2px] pr-[10px] py-[6px] relative shrink-0" data-name="Icon End">
                    {iconAfter2 && <div onClick={onIconAfter2Click} className={onIconAfter2Click && !disabled ? "cursor-pointer" : "cursor-not-allowed"}>{iconAfter220PxRegular || <InputErrorCircle />}</div>}
                    {iconAfter1 &&
                      <div onClick={onIconAfter1Click} className={onIconAfter1Click && !disabled ? "cursor-pointer" : "cursor-not-allowed"}>
                        {iconAfter120PxRegular || (
                          <InputChevron>
                            <path d={svgPaths.p101e4700} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                          </InputChevron>
                        )}
                      </div>
                    }
                  </div>
                )}
                {isOutlineAndLargeAndRest && iconAfter1 && (
                  <div className="content-stretch flex gap-[4px] items-center justify-end pl-[2px] pr-[12px] py-[8px] relative shrink-0" data-name="Icon End">
                    {iconAfter2 &&
                      <div onClick={onIconAfter2Click} className={onIconAfter2Click ? "cursor-pointer" : ""}>
                        {iconAfter224PxRegular || (
                          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Error Circle">
                            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="Shape">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                <path d={svgPaths.p35510b80} fill="var(--fill-0, #C50F1F)" id="Shape" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    }
                    {iconAfter1 &&
                      <div onClick={onIconAfter1Click} className={onIconAfter1Click ? "cursor-pointer" : ""}>
                        {iconAfter124PxRegular || (
                          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Chevron">
                            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[8.75px] left-1/2 top-[calc(50%+0.62px)] w-[16px]" data-name="Shape">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8.75">
                                <path d={svgPaths.p23c83400} fill="var(--fill-0, #616161)" id="Shape" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    }
                  </div>
                )}
              </div>
              <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${isOutlineAndMediumDefaultAndDisabled || isOutlineAndMediumDefaultAndReadOnly ? "border-[#e0e0e0]" : isOutlineAndMediumDefaultAndError ? "border-[#c50f1f]" : isOutlineAndMediumDefaultAndPressed ? "border-[#b3b3b3]" : isOutlineAndMediumDefaultAndHover ? "border-[#c7c7c7]" : isFilledDarkerAndMediumDefaultAndRest || isFilledLighterAndMediumDefaultAndRest ? "border-[rgba(255,255,255,0)]" : "border-[#d1d1d1]"}`} />
            </>
          )}
          {isUnderlineAndMediumDefaultAndRest && (
            <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Icon-Text-stack">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center px-[10px] relative w-full">
                  {iconBefore && (
                    <div onClick={handleIconBeforeClick} className={onIconBeforeClick ? "cursor-pointer" : ""}>
                      {iconBefore20PxRegular || <InputCalendar onClick={handleIconBeforeClick} />}
                    </div>
                  )}
                  <input
                    ref={inputRef}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={`flex-1 bg-transparent border-none outline-none font-['Segoe_UI:Regular',sans-serif] ${getFontSize()} ${hasValue ? 'text-[#242424]' : 'text-[#707070]'} w-full`}
                  />
                </div>
              </div>
            </div>
          )}
          {isUnderlineAndMediumDefaultAndRest && iconAfter1 && <InputIconEnd iconAfter2={iconAfter2} iconAfter220PxRegular={iconAfter220PxRegular} iconAfter1={iconAfter1} iconAfter120PxRegular={iconAfter120PxRegular} onIconAfter1Click={onIconAfter1Click} onIconAfter2Click={onIconAfter2Click} />}
        </div>
        {(isOutlineAndSmallAndRest || isOutlineAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndLargeAndRest || isUnderlineAndMediumDefaultAndRest) && <div className={`absolute bottom-0 h-px left-0 right-0 rounded-[4px] ${isOutlineAndMediumDefaultAndHover ? "bg-[#575757]" : "bg-[#616161]"}`} data-name="Thin underline" />}
        {isOutlineAndMediumDefaultAndPressed && (
          <>
            <div className="absolute bg-[#4d4d4d] bottom-0 h-[2px] left-0 right-0 rounded-[4px]" data-name="Thick underline" />
            <div className="absolute bottom-0 h-[2px] left-[36.43%] right-[36.07%]" data-name="Pressed">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 2">
                <path d={svgPaths.p6fb8400} fill="var(--fill-0, #0F548C)" id="Pressed" />
              </svg>
            </div>
          </>
        )}
        {isOutlineAndMediumDefaultAndFocus && <div className="absolute bg-[#0f6cbd] bottom-0 h-[2px] left-0 right-0 rounded-bl-[4px] rounded-br-[4px]" data-name="InFocus" />}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function InputHelper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex items-start px-[2px] py-[6px] relative size-full">{children}</div>
    </div>
  );
}

function InputHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          {children}
        </svg>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          {children}
        </svg>
      </div>
    </div>
  );
}

function InputChevron({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px] cursor-pointer" onClick={onClick}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[6.499px] left-1/2 top-[calc(50%+0.75px)] w-[12.001px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0008 6.49919">
          {children}
        </svg>
      </div>
    </div>
  );
}

function InputErrorCircle() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.p16b4cd00} fill="var(--fill-0, #C50F1F)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

type InputIconEndProps = {
  iconAfter2: boolean;
  iconAfter220PxRegular: any;
  iconAfter1: boolean;
  iconAfter120PxRegular: any;
  onIconAfter1Click?: () => void;
  onIconAfter2Click?: () => void;
};

function InputIconEnd({ iconAfter2, iconAfter220PxRegular, iconAfter1, iconAfter120PxRegular, onIconAfter1Click, onIconAfter2Click }: InputIconEndProps) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end pl-[2px] pr-[10px] py-[6px] relative shrink-0">
      {iconAfter2 && <div onClick={onIconAfter2Click} className={onIconAfter2Click ? "cursor-pointer" : ""}>{iconAfter220PxRegular || <InputErrorCircle />}</div>}
      {iconAfter1 &&
        <div onClick={onIconAfter1Click} className={onIconAfter1Click ? "cursor-pointer" : ""}>
          {iconAfter120PxRegular || (
            <InputChevron>
              <path d={svgPaths.p101e4700} fill="var(--fill-0, #616161)" id="Shape" />
            </InputChevron>
          )}
        </div>
      }
    </div>
  );
}

function InputCalendar({ onClick }: { onClick?: () => void }) {
  return (
    <Wrapper>
      <path d={svgPaths.p37618c00} fill="var(--fill-0, #616161)" id="Shape" />
    </Wrapper>
  );
}

type TextProps = {
  className?: string;
  enteredText?: string;
  placeholderText?: string;
  showCursorAfterText?: boolean;
  showCursorBeforeText?: boolean;
  showEnteredText?: boolean;
  showPlaceholder?: boolean;
  size?: "Medium" | "Small" | "Large";
};

function Text({ className, enteredText = "Entered text", placeholderText = "Placeholder text", showCursorAfterText = false, showCursorBeforeText = false, showEnteredText = false, showPlaceholder = true, size = "Medium" }: TextProps) {
  const isLarge = size === "Large";
  const isMedium = size === "Medium";
  const isSmall = size === "Small";
  return (
    <div className={className || `relative w-[140px] ${isLarge ? "h-[34px]" : isSmall ? "h-[28px]" : "h-[32px]"}`}>
      <div className="content-stretch flex items-start px-[2px] py-[6px] relative size-full">
        {isMedium && showCursorBeforeText && <div className="bg-[#242424] h-[20px] shrink-0 w-px" data-name="Type Cursor" />}
        {isMedium && showPlaceholder && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#707070] text-[14px] text-ellipsis whitespace-nowrap">{placeholderText}</p>}
        {isMedium && showEnteredText && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[14px] text-ellipsis whitespace-nowrap">{enteredText}</p>}
        {isMedium && showCursorAfterText && <div className="bg-[#242424] h-[20px] shrink-0 w-px" data-name="Type Cursor" />}
        {isSmall && showCursorBeforeText && <div className="bg-[#242424] h-[16px] shrink-0 w-px" data-name="Type Cursor" />}
        {isSmall && showPlaceholder && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[#707070] text-[12px] text-ellipsis whitespace-nowrap">{placeholderText}</p>}
        {isSmall && showEnteredText && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[12px] text-ellipsis whitespace-nowrap">{enteredText}</p>}
        {isSmall && showCursorAfterText && <div className="bg-[#242424] h-[16px] shrink-0 w-px" data-name="Type Cursor" />}
        {isLarge && showCursorBeforeText && <div className="bg-[#242424] h-[24px] shrink-0 w-px" data-name="Type Cursor" />}
        {isLarge && showPlaceholder && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[#707070] text-[16px] text-ellipsis whitespace-nowrap">{placeholderText}</p>}
        {isLarge && showEnteredText && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[16px] text-ellipsis whitespace-nowrap">{enteredText}</p>}
        {isLarge && showCursorAfterText && <div className="bg-[#242424] h-[24px] shrink-0 w-px" data-name="Type Cursor" />}
      </div>
    </div>
  );
}

type CalendarProps = {
  className?: string;
  direction?: "LTR" | "RTL";
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled" | "Light";
};

function Calendar({ className, direction = "LTR", size = "12", theme = "Regular" }: CalendarProps) {
  const isLtrAnd12AndFilled = direction === "LTR" && size === "12" && theme === "Filled";
  const isLtrAnd12AndRegular = direction === "LTR" && size === "12" && theme === "Regular";
  const isLtrAnd16AndRegular = direction === "LTR" && size === "16" && theme === "Regular";
  const isLtrAnd20AndRegular = direction === "LTR" && size === "20" && theme === "Regular";
  const isLtrAnd24AndRegular = direction === "LTR" && size === "24" && theme === "Regular";
  const isLtrAnd32AndLight = direction === "LTR" && size === "32" && theme === "Light";
  const isLtrAnd32AndRegular = direction === "LTR" && size === "32" && theme === "Regular";
  const isLtrAnd48AndRegular = direction === "LTR" && size === "48" && theme === "Regular";
  const isRtlAnd12AndRegular = direction === "RTL" && size === "12" && theme === "Regular";
  return (
    <div className={className || `relative ${isLtrAnd32AndLight ? "size-[32px]" : isLtrAnd48AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[48px]" : isLtrAnd12AndFilled || isLtrAnd12AndRegular || isRtlAnd12AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[12px]" : isLtrAnd32AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[32px]" : isLtrAnd16AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[16px]" : isLtrAnd20AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[20px]" : isLtrAnd24AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[24px]" : "-translate-x-1/2 -translate-y-1/2 size-[28px]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${isLtrAnd48AndRegular ? "size-[36px]" : isLtrAnd12AndFilled || isLtrAnd12AndRegular || isRtlAnd12AndRegular ? "size-[10px]" : isLtrAnd32AndRegular || isLtrAnd32AndLight ? "size-[26px]" : isLtrAnd16AndRegular ? "size-[12px]" : isLtrAnd20AndRegular ? "size-[14px]" : isLtrAnd24AndRegular ? "size-[18px]" : "size-[22px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isLtrAnd48AndRegular ? "0 0 36 36" : isLtrAnd12AndFilled || isLtrAnd12AndRegular || isRtlAnd12AndRegular ? "0 0 10 10" : isLtrAnd32AndRegular || isLtrAnd32AndLight ? "0 0 26 26" : isLtrAnd16AndRegular ? "0 0 12 12" : isLtrAnd20AndRegular ? "0 0 14 14" : isLtrAnd24AndRegular ? "0 0 18 18" : "0 0 22 22"}>
          <path d={isLtrAnd32AndLight ? svgPaths.p7c1b300 : isLtrAnd48AndRegular ? svgPaths.p260f3500 : isLtrAnd12AndRegular || isRtlAnd12AndRegular ? svgPaths.p1851ef80 : isLtrAnd12AndFilled ? svgPaths.p34b11d00 : isLtrAnd32AndRegular ? svgPaths.p241b2d80 : isLtrAnd16AndRegular ? svgPaths.p17a8ef00 : isLtrAnd20AndRegular ? svgPaths.p37618c00 : isLtrAnd24AndRegular ? svgPaths.p18a70500 : svgPaths.p352d2380} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

type ChevronProps = {
  className?: string;
  direction?: "Down" | "Up" | "Left" | "Right";
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Chevron({ className, direction = "Up", size = "48", theme = "Regular" }: ChevronProps) {
  const isDownAnd48AndRegular = direction === "Down" && size === "48" && theme === "Regular";
  const isLeftAnd48AndRegular = direction === "Left" && size === "48" && theme === "Regular";
  const isRightAnd48AndRegular = direction === "Right" && size === "48" && theme === "Regular";
  const isUpAnd12AndRegular = direction === "Up" && size === "12" && theme === "Regular";
  const isUpAnd16AndRegular = direction === "Up" && size === "16" && theme === "Regular";
  const isUpAnd20AndRegular = direction === "Up" && size === "20" && theme === "Regular";
  const isUpAnd24AndRegular = direction === "Up" && size === "24" && theme === "Regular";
  const isUpAnd28AndRegular = direction === "Up" && size === "28" && theme === "Regular";
  const isUpAnd32AndRegular = direction === "Up" && size === "32" && theme === "Regular";
  const isUpAnd48AndFilled = direction === "Up" && size === "48" && theme === "Filled";
  const isUpAnd48AndRegular = direction === "Up" && size === "48" && theme === "Regular";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${isUpAnd32AndRegular ? "size-[32px]" : isUpAnd12AndRegular ? "size-[12px]" : isUpAnd16AndRegular ? "size-[16px]" : isUpAnd20AndRegular ? "size-[20px]" : isUpAnd24AndRegular ? "size-[24px]" : isUpAnd28AndRegular ? "size-[28px]" : "size-[48px]"}`}>
      {(isUpAnd24AndRegular || isUpAnd20AndRegular || isUpAnd16AndRegular || isUpAnd12AndRegular || isDownAnd48AndRegular || isUpAnd32AndRegular) && (
        <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isUpAnd32AndRegular ? "h-[12px] top-[calc(50%-1px)] w-[22px]" : isDownAnd48AndRegular ? "h-[17.25px] top-[calc(50%+0.38px)] w-[32px]" : isUpAnd12AndRegular ? "h-[4.5px] top-[calc(50%-0.75px)] w-[8px]" : isUpAnd16AndRegular ? "h-[5.5px] top-[calc(50%-0.25px)] w-[10px]" : isUpAnd20AndRegular ? "h-[6.499px] top-[calc(50%-0.75px)] w-[12.001px]" : "h-[8.75px] top-[calc(50%-0.63px)] w-[16px]"}`} data-name="Shape">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isUpAnd32AndRegular ? "0 0 22 12" : isDownAnd48AndRegular ? "0 0 32 17.25" : isUpAnd12AndRegular ? "0 0 8 4.5" : isUpAnd16AndRegular ? "0 0 10 5.5" : isUpAnd20AndRegular ? "0 0 12.0008 6.49919" : "0 0 16 8.75"}>
            <path d={isUpAnd32AndRegular ? svgPaths.p24264500 : isDownAnd48AndRegular ? svgPaths.p2dc21f00 : isUpAnd12AndRegular ? svgPaths.p27b10280 : isUpAnd16AndRegular ? svgPaths.p4fc3100 : isUpAnd20AndRegular ? svgPaths.p11c10670 : svgPaths.pcb09c80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      )}
      {(isUpAnd48AndRegular || isUpAnd48AndFilled || isUpAnd28AndRegular || isRightAnd48AndRegular || isLeftAnd48AndRegular) && (
        <div className={`-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center ${isLeftAnd48AndRegular ? "h-[32px] left-[calc(50%-0.37px)] top-1/2 w-[17.25px]" : isRightAnd48AndRegular ? "h-[32px] left-[calc(50%+0.38px)] top-1/2 w-[17.25px]" : isUpAnd28AndRegular ? "h-[10.75px] left-1/2 top-[calc(50%-0.63px)] w-[20px]" : isUpAnd48AndFilled ? "h-[17.5px] left-1/2 top-[calc(50%-0.25px)] w-[32px]" : "h-[17.25px] left-1/2 top-[calc(50%-0.38px)] w-[32px]"}`}>
          <div className={`flex-none ${isLeftAnd48AndRegular ? "rotate-90" : isRightAnd48AndRegular ? "-rotate-90" : "rotate-180"}`}>
            <div className={`relative ${isUpAnd28AndRegular ? "h-[10.75px] w-[20px]" : isUpAnd48AndFilled ? "h-[17.5px] w-[32px]" : "h-[17.25px] w-[32px]"}`} data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isUpAnd28AndRegular ? "0 0 20 10.75" : isUpAnd48AndFilled ? "0 0 32 17.5" : "0 0 32 17.25"}>
                <path d={isUpAnd28AndRegular ? svgPaths.p311e8800 : isUpAnd48AndFilled ? svgPaths.p3a016680 : svgPaths.p31da0c00} fill="var(--fill-0, #242424)" id="Shape" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type ErrorCircleProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "48";
  theme?: "Regular" | "Filled";
};

function ErrorCircle({ className, size = "24", theme = "Regular" }: ErrorCircleProps) {
  const is12AndRegular = size === "12" && theme === "Regular";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndFilled = size === "24" && theme === "Filled";
  const is48AndRegular = size === "48" && theme === "Regular";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is48AndRegular ? "size-[48px]" : is12AndRegular ? "size-[12px]" : is16AndRegular ? "size-[16px]" : is20AndRegular ? "size-[20px]" : "size-[24px]"}`}>
      <div className={`absolute ${is48AndRegular ? "left-[4px] size-[40px] top-[4px]" : is12AndRegular ? "-translate-x-1/2 -translate-y-1/2 left-1/2 size-[10px] top-1/2" : is16AndRegular ? "-translate-x-1/2 -translate-y-1/2 left-1/2 size-[12px] top-1/2" : is20AndRegular ? "-translate-x-1/2 -translate-y-1/2 left-1/2 size-[16px] top-1/2" : "-translate-x-1/2 -translate-y-1/2 left-1/2 size-[20px] top-1/2"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is48AndRegular ? "0 0 40 40" : is12AndRegular ? "0 0 10 10" : is16AndRegular ? "0 0 12 12" : is20AndRegular ? "0 0 16 16" : "0 0 20 20"}>
          <path d={is48AndRegular ? svgPaths.p1c854200 : is12AndRegular ? svgPaths.p1851ef80 : is16AndRegular ? svgPaths.p17a8ef00 : is20AndRegular ? svgPaths.p16b4cd00 : svgPaths.p35510b80} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface InputProps_Display {
  size?: "Small" | "Medium (Default)" | "Large";
  style?: "Outline" | "Filled darker" | "Filled lighter" | "Underline";
  state?: "Error" | "Disabled" | "Read only";
  
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  
  iconBefore?: boolean;
  iconBefore16PxRegular?: React.ReactNode;
  iconBefore20PxRegular?: React.ReactNode;
  iconBefore24PxRegular?: React.ReactNode;
  
  iconAfter1?: boolean;
  iconAfter116PxRegular?: React.ReactNode;
  iconAfter120PxRegular?: React.ReactNode;
  iconAfter124PxRegular?: React.ReactNode;
  
  iconAfter2?: boolean;
  iconAfter216PxRegular?: React.ReactNode;
  iconAfter220PxRegular?: React.ReactNode;
  iconAfter224PxRegular?: React.ReactNode;
}

function Input_Display({
  size,
  style,
  state,
  placeholder,
  disabled,
  readOnly,
  type,
  iconBefore,
  iconBefore16PxRegular,
  iconBefore20PxRegular,
  iconBefore24PxRegular,
  iconAfter1,
  iconAfter116PxRegular,
  iconAfter120PxRegular,
  iconAfter124PxRegular,
  iconAfter2,
  iconAfter216PxRegular,
  iconAfter220PxRegular,
  iconAfter224PxRegular,
}: InputProps_Display) {
  const [value, setValue] = React.useState('');

  return (
    <Input
      size={size}
      style={style}
      state={state}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      type={type}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      iconBefore={iconBefore}
      iconBefore16PxRegular={iconBefore16PxRegular}
      iconBefore20PxRegular={iconBefore20PxRegular}
      iconBefore24PxRegular={iconBefore24PxRegular}
      iconAfter1={iconAfter1}
      iconAfter116PxRegular={iconAfter116PxRegular}
      iconAfter120PxRegular={iconAfter120PxRegular}
      iconAfter124PxRegular={iconAfter124PxRegular}
      iconAfter2={iconAfter2}
      iconAfter216PxRegular={iconAfter216PxRegular}
      iconAfter220PxRegular={iconAfter220PxRegular}
      iconAfter224PxRegular={iconAfter224PxRegular}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample MediumOutlineTextInput
export function MediumOutlineTextInput() {
  return (
    <Input_Display
      size="Medium (Default)"
      style="Outline"
      placeholder="Enter your name"
    />
  );
}

// @figmaExample SmallUnderlineSearchInput
export function SmallUnderlineSearchInput() {
  return (
    <Input_Display
      size="Small"
      style="Underline"
      placeholder="Search..."
    />
  );
}

// @figmaExample LargeFilledDarkerInput
export function LargeFilledDarkerInput() {
  return (
    <Input_Display
      size="Large"
      style="Filled darker"
      placeholder="Large filled input"
    />
  );
}

// @figmaExample DateInputWithCalendarIcon
export function DateInputWithCalendarIcon() {
  return (
    <Input_Display
      size="Medium (Default)"
      style="Outline"
      placeholder="Select date"
      iconBefore={true}
    />
  );
}

// @figmaExample FilledDropdownInput
export function FilledDropdownInput() {
  return (
    <Input_Display
      size="Medium (Default)"
      style="Filled darker"
      placeholder="Dropdown style"
      iconAfter1={true}
      readOnly={true}
    />
  );
}

// @figmaExample ErrorStateEmailInput
export function ErrorStateEmailInput() {
  return (
    <Input_Display
      size="Medium (Default)"
      style="Outline"
      state="Error"
      placeholder="Email address"
      iconAfter2={true}
    />
  );
}

// @figmaExample LargeInputWithBothIcons
export function LargeInputWithBothIcons() {
  return (
    <Input_Display
      size="Large"
      style="Outline"
      placeholder="With both icons"
      iconBefore={true}
      iconAfter1={true}
    />
  );
}

// @figmaExample DisabledInput
export function DisabledInput() {
  return (
    <Input_Display
      size="Medium (Default)"
      style="Outline"
      placeholder="Disabled input"
      disabled={true}
    />
  );
}