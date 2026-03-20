import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-m5pe1puksv';

// ---------------------- Type Definitions ----------------------

export type DropdownOption = {
  value: string; // The value returned in onSelect callback
  label: string; // The display text shown in the dropdown
};

/**
 * A fully-featured dropdown/select control with keyboard navigation and multiple visual styles.
 * 
 * Appears as a rounded rectangular input field with a downward-pointing chevron icon on the right side.
 * When clicked or activated, expands downward to show a list of selectable options in a floating menu with shadow.
 * The selected option's label is displayed in the field, or placeholder text if nothing is selected.
 * 
 * Supports full keyboard navigation:
 * - Arrow Down/Up: Navigate through options when expanded, or open dropdown when closed
 * - Enter/Space: Open dropdown when closed, select highlighted option when expanded
 * - Escape: Close dropdown
 * - Tab: Close dropdown and move focus
 * - Click outside: Auto-closes the dropdown
 * 
 * The dropdown manages its own selected state internally but can also be controlled via the value prop.
 * When expanded, options can be highlighted via keyboard or mouse hover, with highlighted items showing a light gray background.
 */
export interface DropdownProps {
  className?: string; // Optional custom className for the wrapper div. Defaults to "relative w-[312px]" if not provided
  appearance?: "Outline" | "Transparent" | "Fill lighter" | "Fill darker"; // Visual style variant (default: "Outline")
  size?: "Small" | "Medium" | "Large"; // Size of the dropdown control (default: "Medium")
  placeholder?: string; // Text displayed when no option is selected (default: "Placeholder text"). Shows in gray (#707070) color
  options?: DropdownOption[]; // Array of selectable options. Default is 5 "Action" items if not provided
  value?: string; // Controlled selected value. Should match the value property of one of the options
  onSelect?: (value: string) => void; // Callback fired when user selects an option. Receives the selected option's value as parameter
  onOpenChange?: (open: boolean) => void; // Callback fired when dropdown opens or closes. Receives boolean indicating new open state
}

// ---------------------- Main Component ----------------------

export function Dropdown({ 
  className, 
  appearance = "Outline", 
  size = "Medium",
  placeholder = "Placeholder text",
  options = [
    { value: "action1", label: "Action" },
    { value: "action2", label: "Action" },
    { value: "action3", label: "Action" },
    { value: "action4", label: "Action" },
    { value: "action5", label: "Action" },
  ],
  value,
  onSelect,
  onOpenChange
}: DropdownProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExpanded(false);
        if (onOpenChange) onOpenChange(false);
      }
    }

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [expanded, onOpenChange]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!expanded) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
          event.preventDefault();
          setExpanded(true);
          if (onOpenChange) onOpenChange(true);
          setHighlightedIndex(0);
        }
        return;
      }

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          setExpanded(false);
          if (onOpenChange) onOpenChange(false);
          setHighlightedIndex(-1);
          inputRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < options.length) {
            const selected = options[highlightedIndex];
            setSelectedValue(selected.value);
            if (onSelect) onSelect(selected.value);
            setExpanded(false);
            if (onOpenChange) onOpenChange(false);
            setHighlightedIndex(-1);
          }
          break;
        case 'Tab':
          setExpanded(false);
          if (onOpenChange) onOpenChange(false);
          setHighlightedIndex(-1);
          break;
      }
    }

    if (dropdownRef.current) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [expanded, highlightedIndex, options, onSelect, onOpenChange]);

  const toggleDropdown = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (onOpenChange) onOpenChange(newExpanded);
    if (!newExpanded) {
      setHighlightedIndex(-1);
    } else {
      setHighlightedIndex(0);
    }
  };

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value);
    if (onSelect) onSelect(option.value);
    setExpanded(false);
    if (onOpenChange) onOpenChange(false);
    setHighlightedIndex(-1);
  };

  const isFillDarkerAndMediumAndNotExpanded = appearance === "Fill darker" && size === "Medium" && !expanded;
  const isFillLighterAndMediumAndNotExpanded = appearance === "Fill lighter" && size === "Medium" && !expanded;
  const isOutlineAndLargeAndNotExpanded = appearance === "Outline" && size === "Large" && !expanded;
  const isOutlineAndMediumAndExpanded = appearance === "Outline" && size === "Medium" && expanded;
  const isOutlineAndMediumAndNotExpanded = appearance === "Outline" && size === "Medium" && !expanded;
  const isOutlineAndSmallAndNotExpanded = appearance === "Outline" && size === "Small" && !expanded;
  const isTransparentAndMediumAndNotExpanded = appearance === "Transparent" && size === "Medium" && !expanded;
  
  return (
    <div ref={dropdownRef} className={className || "relative w-[312px]"}>
      <div className="content-stretch flex flex-col items-start relative w-full">
        <div 
          ref={inputRef}
          className="relative rounded-[4px] shrink-0 w-full cursor-pointer" 
          data-name="Input"
          onClick={toggleDropdown}
          tabIndex={0}
          role="combobox"
          aria-expanded={expanded}
          aria-haspopup="listbox"
        >
          <div className={isTransparentAndMediumAndNotExpanded ? "content-stretch flex flex-col items-start relative w-full" : "overflow-clip rounded-[inherit] size-full"}>
            {(isOutlineAndMediumAndExpanded || isOutlineAndMediumAndNotExpanded || isOutlineAndLargeAndNotExpanded || isOutlineAndSmallAndNotExpanded || isFillLighterAndMediumAndNotExpanded || isFillDarkerAndMediumAndNotExpanded) && (
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className={`relative rounded-[4px] shrink-0 w-full ${isFillDarkerAndMediumAndNotExpanded ? "bg-[#f5f5f5]" : "bg-white"}`} data-name="Contents">
                  <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[inherit] w-full">
                    <div className={`flex-[1_0_0] min-h-px min-w-px relative ${isOutlineAndLargeAndNotExpanded ? "h-[40px]" : ""}`} data-name="Icon-Text-stack">
                      <div className="flex flex-row items-center size-full">
                        <div className={`content-stretch flex items-center relative ${isOutlineAndSmallAndNotExpanded ? "px-[6px] w-full" : isOutlineAndLargeAndNotExpanded ? "px-[12px] size-full" : "px-[10px] w-full"}`}>
                          <div className={`flex-[1_0_0] min-h-px min-w-px relative ${isOutlineAndSmallAndNotExpanded ? "h-[28px]" : isOutlineAndLargeAndNotExpanded ? "h-[34px]" : "h-[32px]"}`} data-name=".Text">
                            <DropdownHelper>
                              <p className={`flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full min-h-px min-w-px not-italic overflow-hidden relative ${selectedValue ? 'text-[#242424]' : 'text-[#707070]'} text-ellipsis whitespace-nowrap ${isOutlineAndSmallAndNotExpanded ? "leading-[16px] text-[12px]" : isOutlineAndLargeAndNotExpanded ? "leading-[22px] text-[16px]" : "leading-[20px] text-[14px]"}`}>{displayText}</p>
                            </DropdownHelper>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`content-stretch flex gap-[4px] items-center justify-end pl-[2px] relative shrink-0 ${isOutlineAndSmallAndNotExpanded ? "pr-[6px] py-[4px]" : isOutlineAndLargeAndNotExpanded ? "pr-[12px] py-[8px]" : "pr-[10px] py-[6px]"}`} data-name="Icon End">
                      {(isOutlineAndMediumAndExpanded || isOutlineAndMediumAndNotExpanded || isFillLighterAndMediumAndNotExpanded || isFillDarkerAndMediumAndNotExpanded) && <DropdownDirectionDownSize20ThemeRegular />}
                      {isOutlineAndLargeAndNotExpanded && (
                        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Direction=Down, Size=24, Theme=Regular">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[8.75px] left-1/2 top-[calc(50%+0.62px)] w-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8.75">
                              <path d={svgPaths.p23c83400} fill="var(--fill-0, #616161)" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      )}
                      {isOutlineAndSmallAndNotExpanded && (
                        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Direction=Down, Size=16, Theme=Regular">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[5.5px] left-1/2 top-[calc(50%+0.25px)] w-[10px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.5">
                              <path d={svgPaths.p22f5b00} fill="var(--fill-0, #616161)" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${isFillLighterAndMediumAndNotExpanded || isFillDarkerAndMediumAndNotExpanded ? "border-[rgba(255,255,255,0)]" : "border-[#d1d1d1]"}`} />
                </div>
                {(isOutlineAndMediumAndNotExpanded || isOutlineAndLargeAndNotExpanded || isOutlineAndSmallAndNotExpanded) && <div className="absolute bg-[#616161] bottom-0 h-px left-0 right-0 rounded-[4px]" data-name="Thin underline" />}
                {isOutlineAndMediumAndExpanded && <div className="absolute bg-[#0f6cbd] bottom-0 h-[2px] left-0 right-0 rounded-bl-[4px] rounded-br-[4px]" data-name="InFocus" />}
              </div>
            )}
            {isTransparentAndMediumAndNotExpanded && (
              <>
                <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[10px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Contents">
                  <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Icon-Text-stack">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center px-[10px] relative w-full">
                        <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name=".Text">
                          <DropdownHelper>
                            <p className={`flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative ${selectedValue ? 'text-[#242424]' : 'text-[#707070]'} text-[14px] text-ellipsis whitespace-nowrap`}>{displayText}</p>
                          </DropdownHelper>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center justify-end pl-[2px] pr-[10px] py-[6px] relative shrink-0" data-name="Icon End">
                    <DropdownDirectionDownSize20ThemeRegular />
                  </div>
                </div>
                <div className="absolute bg-[#616161] bottom-0 h-px left-0 right-0 rounded-[4px]" data-name="Thin underline" />
              </>
            )}
          </div>
        </div>
        {isOutlineAndMediumAndExpanded && (
          <div className="absolute bg-white top-full mt-1 rounded-[4px] w-full z-10" data-name="List content" role="listbox">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="relative rounded-[4px] shrink-0 w-full" data-name="Top section">
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex flex-col gap-[2px] items-start p-[4px] relative w-full">
                      <div className="h-[32px] relative rounded-[4px] shrink-0 w-full" data-name=".ListItem">
                        <div className="flex flex-row items-center size-full">
                          <Wrapper additionalClassNames="py-[8px]">
                            <div className="content-stretch flex items-center px-[6px] relative w-full">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[12px] whitespace-nowrap">
                                <p className="leading-[16px]">Action</p>
                              </div>
                            </div>
                          </Wrapper>
                        </div>
                      </div>
                      {options.map((option, index) => (
                        <DropdownListItem 
                          key={option.value}
                          onClick={() => handleSelect(option)}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          isHighlighted={highlightedIndex === index}
                        >
                          <p className="leading-[20px]">{option.label}</p>
                        </DropdownListItem>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]" />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export function DropdownHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex items-start px-[2px] py-[6px] relative size-full">{children}</div>
    </div>
  );
}

type WrapperProps = {
  additionalClassNames?: string;
};

export function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("content-stretch flex items-center relative size-full", additionalClassNames)}>
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="List-container">
        <div className="flex flex-row items-center size-full">{children}</div>
      </div>
    </div>
  );
}

type DropdownListItemProps = {
  onClick?: () => void;
  onMouseEnter?: () => void;
  isHighlighted?: boolean;
};

export function DropdownListItem({ children, onClick, onMouseEnter, isHighlighted }: React.PropsWithChildren<DropdownListItemProps>) {
  return (
    <div 
      className={`h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer ${isHighlighted ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="flex flex-row items-center size-full">
        <Wrapper>
          <div className="content-stretch flex gap-[4px] items-center pl-[6px] py-[6px] relative w-full">
            <div className="content-stretch flex items-start shrink-0" data-name="Checkmark-control" />
            <div className="content-stretch flex items-start pb-[2px] px-[2px] relative shrink-0" data-name="Text">
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">{children}</div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

export function DropdownDirectionDownSize20ThemeRegular() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[6.499px] left-1/2 top-[calc(50%+0.75px)] w-[12.001px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0008 6.49919">
          <path d={svgPaths.p101e4700} fill="var(--fill-0, #616161)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface DropdownProps_Display {
  appearance?: "Outline" | "Transparent" | "Fill lighter" | "Fill darker";
  size?: "Small" | "Medium" | "Large";
  placeholder?: string;
  options?: DropdownOption[];
}

function Dropdown_Display({
  appearance,
  size,
  placeholder,
  options,
}: DropdownProps_Display) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

  return (
    <Dropdown
      appearance={appearance}
      size={size}
      placeholder={placeholder}
      options={options}
      value={selectedValue}
      onSelect={(value) => setSelectedValue(value)}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample FruitSelectionDropdown
export function FruitSelectionDropdown() {
  return (
    <Dropdown_Display
      appearance="Outline"
      size="Medium"
      placeholder="Select a fruit"
      options={[
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "grape", label: "Grape" },
        { value: "mango", label: "Mango" }
      ]}
    />
  );
}

// @figmaExample ColorPickerTransparentDropdown
export function ColorPickerTransparentDropdown() {
  return (
    <Dropdown_Display
      appearance="Transparent"
      size="Medium"
      placeholder="Choose a color"
      options={[
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" }
      ]}
    />
  );
}

// @figmaExample StatusSelectionLighterDropdown
export function StatusSelectionLighterDropdown() {
  return (
    <Dropdown_Display
      appearance="Fill lighter"
      size="Medium"
      placeholder="Select status"
      options={[
        { value: "active", label: "Active" },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" }
      ]}
    />
  );
}

// @figmaExample CountryPickerDarkerDropdown
export function CountryPickerDarkerDropdown() {
  return (
    <Dropdown_Display
      appearance="Fill darker"
      size="Medium"
      placeholder="Pick a country"
      options={[
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
        { value: "au", label: "Australia" }
      ]}
    />
  );
}

// @figmaExample SmallGenericDropdown
export function SmallGenericDropdown() {
  return (
    <Dropdown_Display
      appearance="Outline"
      size="Small"
      placeholder="Small dropdown"
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" }
      ]}
    />
  );
}

// @figmaExample LargePriorityDropdown
export function LargePriorityDropdown() {
  return (
    <Dropdown_Display
      appearance="Outline"
      size="Large"
      placeholder="Large dropdown"
      options={[
        { value: "priority-low", label: "Low Priority" },
        { value: "priority-medium", label: "Medium Priority" },
        { value: "priority-high", label: "High Priority" },
        { value: "priority-urgent", label: "Urgent Priority" }
      ]}
    />
  );
}