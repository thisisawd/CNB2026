import * as React from 'react';
import { useState, useCallback, useRef, ChangeEvent, FocusEvent, KeyboardEvent, ReactNode } from 'react';
import svgPaths from "./svg-ki4d1ghxzl";

/**
 * SearchBox
 * 
 * A search input component with integrated search icon, optional filter and clear actions, and multiple visual styles.
 * Appears as a rounded rectangular input field within its container, typically 468px wide with a search icon on the left.
 * Shows filter and clear (dismiss) buttons on the right when focused or when focusActions is enabled.
 * The component has a distinctive bottom border that becomes thicker and blue when focused.
 * 
 * This component can be used in both controlled and uncontrolled modes. If you provide the `value` prop,
 * you must also provide `onChange` to update it (controlled mode). If you don't provide `value`,
 * the component manages its own state (uncontrolled mode).
 * 
 * IMPORTANT: The clear button automatically appears when there is text in the input and the component is focused
 * (or focusActions is true). The filter and clear actions are only visible when the input is focused by default,
 * unless focusActions is set to true. Press Enter to trigger the onSearch callback with the current value.
 * The component automatically focuses the input after clearing.
 */
export interface SearchBoxProps {
  className?: string; // Custom CSS classes to override default styling
  value?: string; // Controlled value for the input. When provided, component operates in controlled mode
  onChange?: (value: string) => void; // Callback fired when input value changes. Required when using controlled mode
  onSearch?: (value: string) => void; // Callback fired when Enter key is pressed
  onFilterClick?: () => void; // Callback fired when the filter icon is clicked
  onClear?: () => void; // Callback fired when the clear (dismiss) button is clicked
  placeholder?: string; // Placeholder text shown when input is empty (default: "Search")
  size?: 'Small' | 'Medium (Default)' | 'Large'; // Controls the height and text size of the input (default: "Medium (Default)")
  style?: 'Filled darker (Default)' | 'Filled lighter' | 'Outline' | 'Transparent'; // Visual style variant (default: "Filled darker (Default)")
  state?: 'Rest' | 'Focus' | 'Hover'; // Controlled state (overrides internal state management)
  focusActions?: boolean; // When true, shows filter and clear actions even when not focused (default: false)
  secondaryAction?: boolean; // When true, shows the filter button (default: true)
  iconAfter16PxRegular?: ReactNode | null; // Custom icon to replace the default filter button
  iconAfter216PxRegular?: ReactNode | null; // Custom icon for secondary action
}

// ---------------------- Main Component ----------------------

export function SearchBox({ 
  className, 
  focusActions = false, 
  iconAfter16PxRegular = null, 
  iconAfter216PxRegular = null, 
  secondaryAction = true, 
  size = "Medium (Default)", 
  state: controlledState, 
  style = "Outline",
  value: controlledValue,
  onChange,
  onSearch,
  onFilterClick,
  onClear,
  placeholder = "Search"
}: SearchBoxProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const state = controlledState || (isFocused ? "Focus" : isHovered ? "Hover" : "Rest");
  
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  }, [controlledValue, onChange]);
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  }, [onSearch, value]);
  
  const handleClear = useCallback(() => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    if (onChange) {
      onChange('');
    }
    if (onClear) {
      onClear();
    }
    // Focus input after clearing
    inputRef.current?.focus();
  }, [controlledValue, onChange, onClear]);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  
  const isFilledDarkerDefaultAndMediumDefaultAndRest = style === "Filled darker (Default)" && size === "Medium (Default)" && state === "Rest";
  const isFilledLighterAndMediumDefaultAndRest = style === "Filled lighter" && size === "Medium (Default)" && state === "Rest";
  const isOutlineAndLargeAndRest = style === "Outline" && size === "Large" && state === "Rest";
  const isOutlineAndMediumDefaultAndFocus = style === "Outline" && size === "Medium (Default)" && state === "Focus";
  const isOutlineAndMediumDefaultAndHover = style === "Outline" && size === "Medium (Default)" && state === "Hover";
  const isOutlineAndMediumDefaultAndRest = style === "Outline" && size === "Medium (Default)" && state === "Rest";
  const isOutlineAndSmallAndRest = style === "Outline" && size === "Small" && state === "Rest";
  const isTransparentAndMediumDefaultAndRest = style === "Transparent" && size === "Medium (Default)" && state === "Rest";
  
  const showActions = isFocused || focusActions;
  
  return (
    <div 
      className={className || "relative rounded-[4px] w-[468px]"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`content-stretch flex flex-col items-start relative w-full ${isTransparentAndMediumDefaultAndRest ? "" : "overflow-clip rounded-[inherit]"}`}>
        <div className={`relative rounded-[4px] shrink-0 w-full ${isTransparentAndMediumDefaultAndRest ? "" : isFilledDarkerDefaultAndMediumDefaultAndRest ? "bg-[#f5f5f5]" : "bg-white"}`} data-name="Contents">
          <div className={`flex flex-row items-center size-full ${isTransparentAndMediumDefaultAndRest ? "" : "overflow-clip rounded-[inherit]"}`}>
            <div className={`content-stretch flex gap-[10px] items-center relative w-full ${isOutlineAndLargeAndRest ? "px-[10px]" : isOutlineAndSmallAndRest ? "px-[6px]" : isOutlineAndMediumDefaultAndFocus ? "pl-[8px] pr-[10px]" : "px-[8px]"}`}>
              <div className={`content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative ${isOutlineAndLargeAndRest ? "h-[40px]" : ""}`} data-name="Icon-Text-stack">
                <div className={`overflow-clip relative shrink-0 ${isOutlineAndLargeAndRest ? "size-[24px]" : isOutlineAndSmallAndRest ? "size-[16px]" : "size-[20px]"}`} data-name="Search">
                  <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] ${isOutlineAndLargeAndRest ? "size-[19px]" : isOutlineAndSmallAndRest ? "size-[13px]" : "size-[15px]"}`} data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isOutlineAndLargeAndRest ? "0 0 19 19" : isOutlineAndSmallAndRest ? "0 0 13 13" : "0 0 14.9999 15"}>
                      <path d={isOutlineAndLargeAndRest ? svgPaths.p24b27b00 : isOutlineAndSmallAndRest ? svgPaths.p202e9300 : svgPaths.p3d34600} fill="var(--fill-0, #616161)" id="Shape" />
                    </svg>
                  </div>
                </div>
                <div className={`flex-[1_0_0] min-h-px min-w-px relative ${isOutlineAndLargeAndRest ? "h-[34px]" : isOutlineAndSmallAndRest ? "h-[28px]" : "h-[32px]"}`}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={isOutlineAndMediumDefaultAndFocus ? "Search for messages, files, and more" : placeholder}
                    className={`w-full h-full px-[2px] py-[6px] bg-transparent border-0 outline-none font-["Segoe_UI:Regular",sans-serif] not-italic ${isOutlineAndSmallAndRest ? "text-[12px] leading-[16px]" : isOutlineAndLargeAndRest ? "text-[16px] leading-[22px]" : "text-[14px] leading-[20px]"} ${value ? "text-[#242424]" : "text-[#707070]"}`}
                    aria-label="Search"
                  />
                </div>
              </div>
              {showActions && isOutlineAndMediumDefaultAndFocus && (
                <div className="content-stretch flex gap-[4px] items-center justify-end pl-[2px] py-[6px] relative shrink-0" data-name="Icon after container">
                  {secondaryAction && (
                    iconAfter216PxRegular || (
                      <Filter
                        className="overflow-clip relative shrink-0 size-[16px]"
                        size="16"
                        theme="Regular"
                        onClick={onFilterClick}
                      />
                    )
                  )}
                  {value && (
                    iconAfter16PxRegular || (
                      <Dismiss
                        className="overflow-clip relative shrink-0 size-[20px]"
                        size="20"
                        theme="Regular"
                        onClick={handleClear}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          {(isOutlineAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndFocus || isOutlineAndMediumDefaultAndHover || isOutlineAndSmallAndRest || isOutlineAndLargeAndRest) && <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${isOutlineAndMediumDefaultAndHover ? "border-[#c7c7c7]" : "border-[#d1d1d1]"}`} />}
        </div>
        {(isOutlineAndMediumDefaultAndRest || isTransparentAndMediumDefaultAndRest || isOutlineAndMediumDefaultAndHover || isOutlineAndSmallAndRest || isOutlineAndLargeAndRest) && <div className={`absolute bottom-0 h-px left-0 right-0 rounded-[4px] ${isOutlineAndMediumDefaultAndHover ? "bg-[#575757]" : "bg-[#616161]"}`} data-name="Thin underline" />}
        {isOutlineAndMediumDefaultAndFocus && <div className="absolute bg-[#0f6cbd] bottom-0 h-[2px] left-0 right-0 rounded-bl-[4px] rounded-br-[4px]" data-name="InFocus" />}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type TextProps = {
  className?: string;
  enteredText?: string;
  placeholderText?: string;
  showCursorAfterText?: boolean;
  showCursorBeforeText?: boolean;
  showEnteredText?: boolean;
  showPlaceholder?: boolean;
  size?: "Medium" | "Small" | "Large";
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
};

function Text({ className, enteredText = "Entered text", placeholderText = "Placeholder text", showCursorAfterText = false, showCursorBeforeText = false, showEnteredText = false, showPlaceholder = true, size = "Medium", value, onChange, onFocus, onBlur, isFocused = false }: TextProps) {
  const isLarge = size === "Large";
  const isMedium = size === "Medium";
  const isSmall = size === "Small";
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  const displayValue = value !== undefined ? value : (showEnteredText ? enteredText : '');
  const shouldShowPlaceholder = !displayValue && showPlaceholder;
  const shouldShowCursor = isFocused && (showCursorBeforeText || showCursorAfterText);
  
  return (
    <div className={className || `relative w-[140px] ${isLarge ? "h-[34px]" : isSmall ? "h-[28px]" : "h-[32px]"}`}>
      <div className="content-stretch flex items-start px-[2px] py-[6px] relative size-full">
        {isMedium && shouldShowCursor && showCursorBeforeText && <div className="bg-[#242424] h-[20px] shrink-0 w-px" data-name="Type Cursor" />}
        {isMedium && shouldShowPlaceholder && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#707070] text-[14px] text-ellipsis whitespace-nowrap">{placeholderText}</p>}
        {isMedium && displayValue && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[14px] text-ellipsis whitespace-nowrap">{displayValue}</p>}
        {isMedium && shouldShowCursor && showCursorAfterText && <div className="bg-[#242424] h-[20px] shrink-0 w-px" data-name="Type Cursor" />}
        {isSmall && shouldShowCursor && showCursorBeforeText && <div className="bg-[#242424] h-[16px] shrink-0 w-px" data-name="Type Cursor" />}
        {isSmall && shouldShowPlaceholder && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[#707070] text-[12px] text-ellipsis whitespace-nowrap">{placeholderText}</p>}
        {isSmall && displayValue && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[12px] text-ellipsis whitespace-nowrap">{displayValue}</p>}
        {isSmall && shouldShowCursor && showCursorAfterText && <div className="bg-[#242424] h-[16px] shrink-0 w-px" data-name="Type Cursor" />}
        {isLarge && shouldShowCursor && showCursorBeforeText && <div className="bg-[#242424] h-[24px] shrink-0 w-px" data-name="Type Cursor" />}
        {isLarge && shouldShowPlaceholder && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[#707070] text-[16px] text-ellipsis whitespace-nowrap">{placeholderText}</p>}
        {isLarge && displayValue && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[16px] text-ellipsis whitespace-nowrap">{displayValue}</p>}
        {isLarge && shouldShowCursor && showCursorAfterText && <div className="bg-[#242424] h-[24px] shrink-0 w-px" data-name="Type Cursor" />}
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholderText}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text"
          aria-label={placeholderText}
        />
      </div>
    </div>
  );
}

type FilterProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32";
  theme?: "Regular" | "Filled" | "Light";
  onClick?: () => void;
};

function Filter({ className, size = "28", theme = "Regular", onClick }: FilterProps) {
  const is12AndRegular = size === "12" && theme === "Regular";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndRegular = size === "24" && theme === "Regular";
  const is28AndFilled = size === "28" && theme === "Filled";
  const is32AndLight = size === "32" && theme === "Light";
  const is32AndRegular = size === "32" && theme === "Regular";
  return (
    <button
      type="button"
      onClick={onClick}
      className={className || `relative ${is32AndLight ? "size-[32px]" : is32AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[32px]" : is12AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[12px]" : is16AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[16px]" : is20AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[20px]" : is24AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[24px]" : "-translate-x-1/2 -translate-y-1/2 size-[28px]"} cursor-pointer bg-transparent border-0 p-0`}
      aria-label="Filter"
    >
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${is32AndLight ? "h-[15px] top-[calc(50%-0.5px)] w-[26px]" : is32AndRegular ? "h-[16px] top-1/2 w-[26px]" : is12AndRegular ? "h-[7px] top-[calc(50%-0.5px)] w-[10px]" : is16AndRegular ? "h-[9px] top-[calc(50%-0.5px)] w-[12px]" : is20AndRegular ? "h-[9px] top-[calc(50%-0.5px)] w-[14px]" : is24AndRegular ? "h-[11.5px] top-[calc(50%-0.25px)] w-[16.5px]" : is28AndFilled ? "h-[14px] top-1/2 w-[22px]" : "h-[13.5px] top-[calc(50%-0.25px)] w-[22px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is32AndLight ? "0 0 26 15" : is32AndRegular ? "0 0 26 16" : is12AndRegular ? "0 0 10 7" : is16AndRegular ? "0 0 12 9" : is20AndRegular ? "0 0 14 9" : is24AndRegular ? "0 0 16.5 11.5" : is28AndFilled ? "0 0 22 14" : "0 0 22 13.5"}>
          <path d={is32AndLight ? svgPaths.p72b4900 : is32AndRegular ? svgPaths.p37a8fc80 : is12AndRegular ? svgPaths.p15366980 : is16AndRegular ? svgPaths.p3dc3e680 : is20AndRegular ? svgPaths.p3fce24e0 : is24AndRegular ? svgPaths.p2e37d300 : is28AndFilled ? svgPaths.p2b27d280 : svgPaths.p3fbbbb00} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </button>
  );
}

type DismissProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled" | "Light";
  onClick?: () => void;
};

function Dismiss({ className, size = "28", theme = "Regular", onClick }: DismissProps) {
  const is12AndRegular = size === "12" && theme === "Regular";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndRegular = size === "24" && theme === "Regular";
  const is28AndFilled = size === "28" && theme === "Filled";
  const is32AndLight = size === "32" && theme === "Light";
  const is32AndRegular = size === "32" && theme === "Regular";
  const is48AndRegular = size === "48" && theme === "Regular";
  return (
    <button
      type="button"
      onClick={onClick}
      className={className || `relative ${is32AndLight ? "size-[32px]" : is48AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[48px]" : is32AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[32px]" : is12AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[12px]" : is16AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[16px]" : is20AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[20px]" : is24AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[24px]" : "-translate-x-1/2 -translate-y-1/2 size-[28px]"} cursor-pointer bg-transparent border-0 p-0`}
      aria-label="Dismiss"
    >
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${is32AndLight ? "size-[24px]" : is48AndRegular ? "size-[35.5px]" : is32AndRegular ? "size-[23.997px]" : is12AndRegular ? "size-[8px]" : is16AndRegular ? "size-[11px]" : is20AndRegular ? "size-[12px]" : is24AndRegular ? "size-[15.5px]" : is28AndFilled ? "size-[20px]" : "size-[19.5px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is32AndLight ? "0 0 24 24" : is48AndRegular ? "0 0 35.4995 35.4997" : is32AndRegular ? "0 0 23.9973 23.9972" : is12AndRegular ? "0 0 8 8" : is16AndRegular ? "0 0 11 11" : is20AndRegular ? "0 0 12 12" : is24AndRegular ? "0 0 15.5 15.5" : is28AndFilled ? "0 0 20 20" : "0 0 19.5 19.5"}>
          <path d={is32AndLight ? svgPaths.p18eb2000 : is48AndRegular ? svgPaths.p20572740 : is32AndRegular ? svgPaths.p2f917800 : is12AndRegular ? svgPaths.p3cfa52f0 : is16AndRegular ? svgPaths.pd515600 : is20AndRegular ? svgPaths.p301c8b00 : is24AndRegular ? svgPaths.p7a03a80 : is28AndFilled ? svgPaths.p1a35ec80 : svgPaths.p1ebd8b80} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </button>
  );
}

// ---------------------- Display Component ----------------------

interface SearchBoxProps_Display {
  placeholder?: string;
  size?: 'Small' | 'Medium (Default)' | 'Large';
  style?: 'Filled darker (Default)' | 'Filled lighter' | 'Outline' | 'Transparent';
  focusActions?: boolean;
  secondaryAction?: boolean;
  iconAfter16PxRegular?: ReactNode | null;
  iconAfter216PxRegular?: ReactNode | null;
}

function SearchBox_Display({
  placeholder,
  size,
  style,
  focusActions,
  secondaryAction,
  iconAfter16PxRegular,
  iconAfter216PxRegular,
}: SearchBoxProps_Display) {
  const [value, setValue] = React.useState('');

  return (
    <SearchBox
      value={value}
      onChange={setValue}
      onSearch={(value) => console.log('Search:', value)}
      onFilterClick={() => console.log('Filter clicked')}
      onClear={() => console.log('Cleared')}
      placeholder={placeholder}
      size={size}
      style={style}
      focusActions={focusActions}
      secondaryAction={secondaryAction}
      iconAfter16PxRegular={iconAfter16PxRegular}
      iconAfter216PxRegular={iconAfter216PxRegular}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultMediumSearch
export function DefaultMediumSearch() {
  return (
    <SearchBox_Display
      placeholder="Search"
      size="Medium (Default)"
      style="Filled darker (Default)"
    />
  );
}

// @figmaExample SmallSearchMessages
export function SmallSearchMessages() {
  return (
    <SearchBox_Display
      placeholder="Search messages"
      size="Small"
      style="Filled darker (Default)"
    />
  );
}

// @figmaExample LargeSearchFilesAndFolders
export function LargeSearchFilesAndFolders() {
  return (
    <SearchBox_Display
      placeholder="Search files and folders"
      size="Large"
      style="Filled darker (Default)"
    />
  );
}

// @figmaExample LighterFilledSearch
export function LighterFilledSearch() {
  return (
    <SearchBox_Display
      placeholder="Search"
      size="Medium (Default)"
      style="Filled lighter"
    />
  );
}

// @figmaExample OutlineStyleSearch
export function OutlineStyleSearch() {
  return (
    <SearchBox_Display
      placeholder="Search"
      size="Medium (Default)"
      style="Outline"
    />
  );
}

// @figmaExample TransparentStyleSearch
export function TransparentStyleSearch() {
  return (
    <SearchBox_Display
      placeholder="Search"
      size="Medium (Default)"
      style="Transparent"
    />
  );
}

// @figmaExample SearchWithVisibleActions
export function SearchWithVisibleActions() {
  return (
    <SearchBox_Display
      placeholder="Search with visible actions"
      size="Medium (Default)"
      style="Filled darker (Default)"
      focusActions={true}
    />
  );
}

// @figmaExample SearchWithoutFilter
export function SearchWithoutFilter() {
  return (
    <SearchBox_Display
      placeholder="Search without filter"
      size="Medium (Default)"
      style="Outline"
      secondaryAction={false}
    />
  );
}