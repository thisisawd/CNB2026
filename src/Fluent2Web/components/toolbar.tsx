import * as React from 'react';
import { useState } from 'react';
import svgPaths from "./svg-8wwuqp3oy0";

/**
 * A comprehensive horizontal toolbar component for document or application editing interfaces, inspired by Microsoft design patterns.
 * Appears as a white rounded rectangular bar spanning its container width, with a height that varies by size (32px for Small, 40px for Medium, 48px for Large).
 * Contains two main sections: start-content with dropdowns and action buttons, and optional end-content with additional buttons and a search field.
 * 
 * The toolbar adapts its layout based on size and type combinations:
 * - Small/Medium + Static: Compact horizontal layout with icon-only buttons and dropdowns
 * - Large + Static: Spacious layout with text labels on buttons, includes a prominent menu button
 * - Medium + Contextual (floating): Floating toolbar with shadow, optimized for contextual actions
 * 
 * IMPORTANT NOTES:
 * - The toolbar includes multiple placeholder buttons (9+ buttons in some configurations) that all use the same icon
 * - Button clicks are identified by buttonId strings like 'button-1', 'large-button-1', 'end-button-1', etc.
 * - Dropdown functionality is partially implemented - clicking toggles state but actual dropdown menus are not rendered
 * - The component has a fixed width of 1176px by default unless overridden with className
 */
export interface ToolbarProps {
  className?: string; // Custom CSS classes to override default styling and dimensions
  endContent?: boolean; // Controls visibility of the end-content section with additional buttons and search (default: true)
  endSearch?: boolean; // Controls visibility of the search input in the end-content section, only applicable when endContent is true (default: true)
  size?: "Medium" | "Large" | "Small"; // "Small": 32px height, compact spacing, icon-only buttons; "Medium": 40px height, balanced layout, icon-only buttons; "Large": 48px height, spacious layout, buttons with text labels and a prominent blue menu button (default: "Medium")
  type?: "Static" | "Contextual (floating)"; // "Static": Regular toolbar without shadow for fixed header positions; "Contextual (floating)": Adds drop shadow for floating/overlay appearance, only works with Medium size (default: "Static")
  onDropdown1Select?: (value: string) => void; // Callback when first dropdown selection changes
  onDropdown2Select?: (value: string) => void; // Callback when second dropdown selection changes
  onButtonClick?: (buttonId: string) => void; // Callback when any toolbar button is clicked, buttonId identifies which button was clicked (e.g., 'button-1', 'large-button-4', 'end-button-2')
  onMenuButtonClick?: () => void; // Callback for the blue menu button, only visible in Large + Static configuration
  onSearchChange?: (value: string) => void; // Callback fired on every keystroke in the search input
  onSearch?: (value: string) => void; // Callback fired when user presses Enter in the search input
}

// ---------------------- Main Component ----------------------

export function Toolbar({ 
  className, 
  endContent = true, 
  endSearch = true, 
  size = "Medium", 
  type = "Static",
  onDropdown1Select,
  onDropdown2Select,
  onButtonClick,
  onMenuButtonClick,
  onSearchChange,
  onSearch
}: ToolbarProps) {
  const [dropdown1Value, setDropdown1Value] = useState("Placeholder text");
  const [dropdown2Value, setDropdown2Value] = useState("Placeholder text");
  const [searchValue, setSearchValue] = useState("");
  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);

  const handleDropdown1Click = () => {
    setIsDropdown1Open(!isDropdown1Open);
  };

  const handleDropdown2Click = () => {
    setIsDropdown2Open(!isDropdown2Open);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(searchValue);
    }
  };

  const isLargeAndStatic = size === "Large" && type === "Static";
  const isMediumAndContextualFloating = size === "Medium" && type === "Contextual (floating)";
  const isMediumAndStatic = size === "Medium" && type === "Static";
  const isSmallAndStatic = size === "Small" && type === "Static";
  
  return (
    <div className={className || `bg-white relative rounded-[4px] w-[1176px] ${isSmallAndStatic ? "h-[32px]" : isLargeAndStatic ? "h-[48px]" : "h-[40px]"}`}>
      <div aria-hidden={isMediumAndStatic ? "true" : undefined} className={isMediumAndContextualFloating ? "content-stretch flex gap-[170px] items-start overflow-clip relative rounded-[inherit] size-full" : isSmallAndStatic ? "content-stretch flex gap-[206px] items-start overflow-clip relative rounded-[inherit] size-full" : isLargeAndStatic ? "content-stretch flex gap-[54px] items-start overflow-clip relative rounded-[inherit] size-full" : "absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px]"}>
        {(isLargeAndStatic || isSmallAndStatic || isMediumAndContextualFloating) && (
          <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="Start-content">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className={`content-stretch flex items-start relative w-full ${isMediumAndContextualFloating ? "pl-[8px] py-[4px]" : isSmallAndStatic ? "pl-[4px]" : "pl-[20px] py-[8px]"}`}>
                {(isSmallAndStatic || isMediumAndContextualFloating) && (
                  <>
                    <div className={`content-stretch flex flex-col items-start px-[6px] py-[4px] relative shrink-0 ${isMediumAndContextualFloating ? "" : "w-[112px]"}`} data-name="Dropdown">
                      <div className={`relative shrink-0 ${isMediumAndContextualFloating ? "w-[312px]" : "w-full"}`} data-name=".DEPRECATED_Dropdown">
                        <Text text={dropdown1Value} onClick={handleDropdown1Click} />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start px-[6px] py-[4px] relative shrink-0" data-name="Dropdown">
                      <div className="relative shrink-0 w-[312px]" data-name=".DEPRECATED_Dropdown">
                        <Text text={dropdown2Value} onClick={handleDropdown2Click} />
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-1')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-2')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-3')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0" data-name="Divider">
                      <div className="flex h-[600px] items-center justify-center relative shrink-0 w-[9px]">
                        <div className="-rotate-90 flex-none">
                          <div className="relative w-[600px]" data-name=".[DEPRECATED] Divider">
                            <div className="content-stretch flex flex-col items-start pb-[4px] pt-[5px] relative w-full">
                              <div className="h-0 relative shrink-0 w-full">
                                <div className="absolute inset-[-1px_0_0_0]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 1">
                                    <line id="Line 1" stroke="var(--stroke-0, #E0E0E0)" x2="20" y1="0.5" y2="0.5" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-4')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-5')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-6')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0" data-name="Divider">
                      <div className="flex h-[600px] items-center justify-center relative shrink-0 w-[9px]">
                        <div className="-rotate-90 flex-none">
                          <div className="relative w-[600px]" data-name=".[DEPRECATED] Divider">
                            <div className="content-stretch flex flex-col items-start pb-[4px] pt-[5px] relative w-full">
                              <div className="h-0 relative shrink-0 w-full">
                                <div className="absolute inset-[-1px_0_0_0]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 1">
                                    <line id="Line 1" stroke="var(--stroke-0, #E0E0E0)" x2="20" y1="0.5" y2="0.5" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-7')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-8')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('button-9')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[6px] relative">
                          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {isLargeAndStatic && (
                  <>
                    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Menu Button">
                      <div className="bg-[#0f6cbd] relative rounded-[4px] shrink-0" data-name="Button" onClick={onMenuButtonClick} role="button" tabIndex={0}>
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                              <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                                <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                                  <p className="leading-[20px]">Text</p>
                                </div>
                              </div>
                              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chevron">
                                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.5px] left-1/2 top-[calc(50%+0.75px)] w-[8px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4.5">
                                    <path d={svgPaths.p2e2fea80} fill="var(--fill-0, white)" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('large-button-1')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                          <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                                <p className="leading-[20px]">Text</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('large-button-2')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                          <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                                <p className="leading-[20px]">Text</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('large-button-3')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                          <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                                <p className="leading-[20px]">Text</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0" data-name="Divider">
                      <div className="flex h-[600px] items-center justify-center relative shrink-0 w-[9px]">
                        <div className="-rotate-90 flex-none">
                          <div className="relative w-[600px]" data-name=".[DEPRECATED] Divider">
                            <div className="content-stretch flex flex-col items-start pb-[4px] pt-[5px] relative w-full">
                              <div className="h-0 relative shrink-0 w-full">
                                <div className="absolute inset-[-1px_0_0_0]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 1">
                                    <line id="Line 1" stroke="var(--stroke-0, #E0E0E0)" x2="20" y1="0.5" y2="0.5" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('large-button-4')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                          <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                                <p className="leading-[20px]">Text</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('large-button-5')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                          <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                                <p className="leading-[20px]">Text</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0" data-name="Divider">
                      <div className="flex h-[600px] items-center justify-center relative shrink-0 w-[9px]">
                        <div className="-rotate-90 flex-none">
                          <div className="relative w-[600px]" data-name=".[DEPRECATED] Divider">
                            <div className="content-stretch flex flex-col items-start pb-[4px] pt-[5px] relative w-full">
                              <div className="h-0 relative shrink-0 w-full">
                                <div className="absolute inset-[-1px_0_0_0]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 1">
                                    <line id="Line 1" stroke="var(--stroke-0, #E0E0E0)" x2="20" y1="0.5" y2="0.5" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('large-button-6')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                          <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                                <p className="leading-[20px]">Text</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('large-button-7')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                          <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                                <p className="leading-[20px]">Text</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('large-button-8')} role="button" tabIndex={0}>
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                          <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                            <div className="flex flex-row items-center justify-center size-full">
                              <div className="content-stretch flex items-center justify-center p-[2px] relative">
                                <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                            <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                                <p className="leading-[20px]">Text</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {isLargeAndStatic && endContent && (
          <div className="content-stretch flex items-start justify-end pr-[20px] py-[8px] relative shrink-0" data-name="End-content">
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-button-1')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                  <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[2px] relative">
                        <div className="relative shrink-0 size-[16px]" data-name="Shape">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                    <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                        <p className="leading-[20px]">Text</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-button-2')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                  <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[2px] relative">
                        <div className="relative shrink-0 size-[16px]" data-name="Shape">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                    <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                        <p className="leading-[20px]">Text</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-button-3')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                  <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[2px] relative">
                        <div className="relative shrink-0 size-[16px]" data-name="Shape">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                    <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                        <p className="leading-[20px]">Text</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-end justify-center pl-[8px] relative shrink-0" data-name="Search">
              <div className="relative rounded-[4px] shrink-0 w-[280px]" data-name=".DEPRECATED_Input">
                <div className="overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex flex-col items-start relative w-full">
                    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Contents">
                      <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[inherit] w-full">
                        <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Icon-Text-stack">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex items-center px-[10px] relative w-full">
                              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[15px] top-[calc(50%+0.5px)]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9999 15">
                                    <path d={svgPaths.p3d34600} fill="var(--fill-0, #616161)" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name=".Text">
                                <div className="overflow-clip rounded-[inherit] size-full">
                                  <div className="content-stretch flex items-start px-[2px] py-[6px] relative size-full">
                                    <input 
                                      type="text" 
                                      value={searchValue} 
                                      onChange={handleSearchChange}
                                      onKeyDown={handleSearchKeyDown}
                                      placeholder="Placeholder text"
                                      className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] h-full leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#707070] text-[14px] text-ellipsis whitespace-nowrap bg-transparent border-none outline-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    </div>
                    <div className="absolute bg-[#616161] bottom-0 h-px left-0 right-0 rounded-[4px]" data-name="Thin underline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isSmallAndStatic && endContent && (
          <div className="content-stretch flex items-start justify-end pr-[4px] relative shrink-0" data-name="End-content">
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-small-button-1')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-small-button-2')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-small-button-3')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {endSearch && (
              <div className="content-stretch flex flex-col items-end justify-center px-[6px] py-[4px] relative shrink-0" data-name="Search">
                <div className="relative rounded-[4px] shrink-0" data-name=".DEPRECATED_Input">
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex flex-col items-start relative">
                      <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Contents">
                        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[inherit] w-full">
                          <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Icon-Text-stack">
                            <div className="flex flex-row items-center size-full">
                              <div className="content-stretch flex items-center px-[6px] relative w-full">
                                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Size=16, Theme=Regular">
                                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[13px] top-[calc(50%+0.5px)]" data-name="Shape">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                                      <path d={svgPaths.p202e9300} fill="var(--fill-0, #616161)" id="Shape" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
                                  <div className="overflow-clip rounded-[inherit] size-full">
                                    <div className="content-stretch flex items-start px-[2px] py-[4px] relative w-full">
                                      <input 
                                        type="text" 
                                        value={searchValue} 
                                        onChange={handleSearchChange}
                                        onKeyDown={handleSearchKeyDown}
                                        placeholder="Placeholder text"
                                        className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#707070] text-[12px] bg-transparent border-none outline-none w-full"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                      <div className="absolute bg-[#616161] bottom-0 h-px left-0 right-0 rounded-[4px]" data-name="Thin underline" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {isMediumAndContextualFloating && endContent && (
          <div className="content-stretch flex items-start justify-end pr-[8px] py-[4px] relative shrink-0" data-name="End-content">
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-medium-button-1')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-medium-button-2')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-medium-button-3')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-end justify-center px-[6px] py-[4px] relative shrink-0 w-[188px]" data-name="Search">
              <div className="relative rounded-[4px] shrink-0 w-full" data-name=".DEPRECATED_Input">
                <div className="overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex flex-col items-start relative w-full">
                    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Contents">
                      <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[inherit] w-full">
                        <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Icon-Text-stack">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex items-center px-[6px] relative w-full">
                              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
                                <div className="overflow-clip rounded-[inherit] size-full">
                                  <div className="content-stretch flex items-start px-[2px] py-[4px] relative w-full">
                                    <input 
                                      type="text" 
                                      value={searchValue} 
                                      onChange={handleSearchChange}
                                      onKeyDown={handleSearchKeyDown}
                                      placeholder="Placeholder text"
                                      className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#707070] text-[12px] bg-transparent border-none outline-none w-full"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    </div>
                    <div className="absolute bg-[#616161] bottom-0 h-px left-0 right-0 rounded-[4px]" data-name="Thin underline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div aria-hidden={isLargeAndStatic || isSmallAndStatic || isMediumAndContextualFloating ? "true" : undefined} className={isMediumAndContextualFloating ? "absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]" : isLargeAndStatic || isSmallAndStatic ? "absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px]" : "content-stretch flex gap-[170px] items-start relative size-full"}>
        {isMediumAndStatic && (
          <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="Start-content">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-start pl-[8px] py-[4px] relative w-full">
                <div className="content-stretch flex flex-col items-start px-[6px] py-[4px] relative shrink-0 w-[112px]" data-name="Dropdown">
                  <div className="relative shrink-0 w-full" data-name=".DEPRECATED_Dropdown">
                    <Text text={dropdown1Value} onClick={handleDropdown1Click} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start px-[6px] py-[4px] relative shrink-0" data-name="Dropdown">
                  <div className="relative shrink-0 w-[312px]" data-name=".DEPRECATED_Dropdown">
                    <Text text={dropdown2Value} onClick={handleDropdown2Click} />
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-1')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-2')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-3')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0" data-name="Divider">
                  <div className="flex h-[600px] items-center justify-center relative shrink-0 w-[9px]">
                    <div className="-rotate-90 flex-none">
                      <div className="relative w-[600px]" data-name=".[DEPRECATED] Divider">
                        <div className="content-stretch flex flex-col items-start pb-[4px] pt-[5px] relative w-full">
                          <div className="h-0 relative shrink-0 w-full">
                            <div className="absolute inset-[-1px_0_0_0]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 1">
                                <line id="Line 1" stroke="var(--stroke-0, #E0E0E0)" x2="20" y1="0.5" y2="0.5" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-4')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-5')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-6')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start py-[6px] relative shrink-0" data-name="Divider">
                  <div className="flex h-[600px] items-center justify-center relative shrink-0 w-[9px]">
                    <div className="-rotate-90 flex-none">
                      <div className="relative w-[600px]" data-name=".[DEPRECATED] Divider">
                        <div className="content-stretch flex flex-col items-start pb-[4px] pt-[5px] relative w-full">
                          <div className="h-0 relative shrink-0 w-full">
                            <div className="absolute inset-[-1px_0_0_0]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 1">
                                <line id="Line 1" stroke="var(--stroke-0, #E0E0E0)" x2="20" y1="0.5" y2="0.5" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-7')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-8')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('medium-button-9')} role="button" tabIndex={0}>
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[2px] relative">
                              <div className="relative shrink-0 size-[16px]" data-name="Shape">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isMediumAndStatic && endContent && (
          <div className="content-stretch flex items-start justify-end pr-[8px] py-[4px] relative shrink-0" data-name="End-content">
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-medium-static-button-1')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-medium-static-button-2')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name="Button" onClick={() => onButtonClick?.('end-medium-static-button-3')} role="button" tabIndex={0}>
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
                  <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                    <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[2px] relative">
                          <div className="relative shrink-0 size-[16px]" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-end justify-center px-[6px] py-[4px] relative shrink-0" data-name="Search">
              <div className="relative rounded-[4px] shrink-0" data-name=".DEPRECATED_Input">
                <div className="overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex flex-col items-start relative">
                    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Contents">
                      <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[inherit] w-full">
                        <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Icon-Text-stack">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex items-center px-[6px] relative w-full">
                              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Size=16, Theme=Regular">
                                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[13px] top-[calc(50%+0.5px)]" data-name="Shape">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                                    <path d={svgPaths.p202e9300} fill="var(--fill-0, #616161)" id="Shape" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
                                <div className="overflow-clip rounded-[inherit] size-full">
                                  <div className="content-stretch flex items-start px-[2px] py-[4px] relative w-full">
                                    <input 
                                      type="text" 
                                      value={searchValue} 
                                      onChange={handleSearchChange}
                                      onKeyDown={handleSearchKeyDown}
                                      placeholder="Placeholder text"
                                      className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#707070] text-[12px] bg-transparent border-none outline-none w-full"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    </div>
                    <div className="absolute bg-[#616161] bottom-0 h-px left-0 right-0 rounded-[4px]" data-name="Thin underline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type Text1Props = {
  text: string;
};

export function Text1({ text }: Text1Props) {
  return (
    <div className="content-stretch flex items-start px-[2px] py-[4px] relative w-full">
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#707070] text-[12px]">{text}</p>
    </div>
  );
}

type TextProps = {
  text: string;
  onClick?: () => void;
};

export function Text({ text, onClick }: TextProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative w-full">
      <div className="relative rounded-[4px] shrink-0 w-full" data-name=".DEPRECATED_Input">
        <div className="overflow-clip rounded-[inherit] size-full">
          <ToolbarHelper text={text} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

type ToolbarHelperProps = {
  text: string;
  onClick?: () => void;
};

export function ToolbarHelper({ children, text, onClick }: React.PropsWithChildren<ToolbarHelperProps>) {
  return (
    <div className="content-stretch flex flex-col items-start relative w-full" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick?.()}>
      <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Contents">
        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative rounded-[inherit] w-full">
          <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Icon-Text-stack">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[6px] relative w-full">
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text">
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-start px-[2px] py-[4px] relative w-full">
                      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#707070] text-[12px]">{text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center justify-end pl-[2px] pr-[6px] py-[4px] relative shrink-0" data-name="Icon End">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Direction=Down, Size=16, Theme=Regular">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[5.5px] left-1/2 top-[calc(50%+0.25px)] w-[10px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.5">
                  <path d={svgPaths.p22f5b00} fill="var(--fill-0, #616161)" id="Shape" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="absolute bg-[#616161] bottom-0 h-px left-0 right-0 rounded-[4px]" data-name="Thin underline" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface ToolbarProps_Display {
  endContent?: boolean;
  endSearch?: boolean;
  size?: "Medium" | "Large" | "Small";
  type?: "Static" | "Contextual (floating)";
}

function Toolbar_Display({
  endContent,
  endSearch,
  size,
  type,
}: ToolbarProps_Display) {
  const handleDropdown1Select = (value: string) => {
    console.log('Dropdown 1 selected:', value);
  };

  const handleDropdown2Select = (value: string) => {
    console.log('Dropdown 2 selected:', value);
  };

  const handleButtonClick = (buttonId: string) => {
    console.log('Button clicked:', buttonId);
  };

  const handleMenuButtonClick = () => {
    console.log('Menu button clicked');
  };

  const handleSearchChange = (value: string) => {
    console.log('Search changed:', value);
  };

  const handleSearch = (value: string) => {
    console.log('Search submitted:', value);
  };

  return (
    <Toolbar
      endContent={endContent}
      endSearch={endSearch}
      size={size}
      type={type}
      onDropdown1Select={handleDropdown1Select}
      onDropdown2Select={handleDropdown2Select}
      onButtonClick={handleButtonClick}
      onMenuButtonClick={handleMenuButtonClick}
      onSearchChange={handleSearchChange}
      onSearch={handleSearch}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample MediumStaticToolbarWithSearch
export function MediumStaticToolbarWithSearch() {
  return (
    <Toolbar_Display
      size="Medium"
      type="Static"
      endContent={true}
      endSearch={true}
    />
  );
}

// @figmaExample LargeStaticToolbarWithSearch
export function LargeStaticToolbarWithSearch() {
  return (
    <Toolbar_Display
      size="Large"
      type="Static"
      endContent={true}
      endSearch={true}
    />
  );
}

// @figmaExample SmallStaticToolbarWithSearch
export function SmallStaticToolbarWithSearch() {
  return (
    <Toolbar_Display
      size="Small"
      type="Static"
      endContent={true}
      endSearch={true}
    />
  );
}

// @figmaExample MediumContextualFloatingToolbar
export function MediumContextualFloatingToolbar() {
  return (
    <Toolbar_Display
      size="Medium"
      type="Contextual (floating)"
      endContent={true}
      endSearch={true}
    />
  );
}

// @figmaExample MediumStaticToolbarMinimal
export function MediumStaticToolbarMinimal() {
  return (
    <Toolbar_Display
      size="Medium"
      type="Static"
      endContent={false}
    />
  );
}

// @figmaExample LargeStaticToolbarWithoutSearch
export function LargeStaticToolbarWithoutSearch() {
  return (
    <Toolbar_Display
      size="Large"
      type="Static"
      endContent={true}
      endSearch={false}
    />
  );
}

// @figmaExample SmallStaticToolbarMinimal
export function SmallStaticToolbarMinimal() {
  return (
    <Toolbar_Display
      size="Small"
      type="Static"
      endContent={false}
    />
  );
}