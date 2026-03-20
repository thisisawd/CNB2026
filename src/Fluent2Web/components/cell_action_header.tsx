import * as React from 'react';
import svgPaths from './svg-j2jqevzu5i';

/**
 * A header component that displays three action buttons in a horizontal row, typically used at the top of a cell or data container.
 * 
 * Appears as a horizontal row of three icon buttons with hover states, positioned within a container with a subtle bottom border.
 * The component has a fixed height of 33px (default) and includes padding and spacing to center the buttons vertically.
 * Each button displays an SVG icon and has gray hover/active background effects.
 * 
 * The focus state adds a distinctive double-border ring overlay (black outer border with white inner border) that wraps around all three buttons together.
 */
export interface CellActionHeaderProps {
  className?: string; // Custom className to override the default container styling. If not provided, defaults to a transparent background with 33px height
  focus?: boolean; // When true, displays a prominent focus ring overlay with a black outer border and white inner border around the entire button group (default: false)
  size?: 'Small/Smaller' | 'Medium/large'; // Controls the padding around button icons. "Small/Smaller" uses 2px padding, "Medium/large" uses 6px padding, making buttons appear larger (default: "Small/Smaller")
  onButton1Click?: () => void; // Click handler for the first (leftmost) action button
  onButton2Click?: () => void; // Click handler for the second (middle) action button
  onButton3Click?: () => void; // Click handler for the third (rightmost) action button
}

// ---------------------- Main Component ----------------------

export function CellActionHeader({ 
  className, 
  focus = false, 
  size = "Small/Smaller",
  onButton1Click,
  onButton2Click,
  onButton3Click
}: CellActionHeaderProps) {
  const isMediumLarge = size === "Medium/large";
  return (
    <div className={className || "bg-[rgba(255,255,255,0)] h-[33px] relative"}>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] h-full items-center justify-center pb-[5px] pt-[4px] relative">
          <div className="content-stretch flex items-start relative shrink-0" data-name="Buttons">
            <Helper onClick={onButton1Click} isMediumLarge={isMediumLarge} />
            <Helper onClick={onButton2Click} isMediumLarge={isMediumLarge} />
            <Helper onClick={onButton3Click} isMediumLarge={isMediumLarge} />
          </div>
          {focus && (
            <div className="absolute inset-0" data-name="Focus ring">
              <div className="absolute border-2 border-black border-solid inset-0 rounded-[4px]" data-name="Border-outer" />
              <div className="absolute border border-solid border-white inset-[2px] rounded-[2px]" data-name="Border-inner" />
            </div>
          )}
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

// ---------------------- Helper Components ----------------------

export function Helper({ onClick, isMediumLarge }: { onClick?: () => void; isMediumLarge: boolean }) {
  return (
    <CellActionHeaderButton onClick={onClick} isMediumLarge={isMediumLarge}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
      </svg>
    </CellActionHeaderButton>
  );
}

export function CellActionHeaderButton({ children, onClick, isMediumLarge }: React.PropsWithChildren<{ onClick?: () => void; isMediumLarge: boolean }>) {
  return (
    <button 
      className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer border-0 hover:bg-gray-100 active:bg-gray-200 transition-colors"
      onClick={onClick}
      type="button"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className={`content-stretch flex items-center justify-center relative ${isMediumLarge ? "p-[6px]" : "p-[2px]"}`}>
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
            <div className="relative shrink-0" data-name="Size=20, Theme=Regular">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[2px] relative">
                  <div className="relative shrink-0 size-[16px]" data-name="Shape">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

// ---------------------- Display Component ----------------------

interface CellActionHeaderProps_Display {
  focus?: boolean;
  size?: 'Small/Smaller' | 'Medium/large';
}

function CellActionHeader_Display({
  focus,
  size,
}: CellActionHeaderProps_Display) {
  return (
    <CellActionHeader
      focus={focus}
      size={size}
      onButton1Click={() => {}}
      onButton2Click={() => {}}
      onButton3Click={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SmallCellActionHeader
export function SmallCellActionHeader() {
  return (
    <CellActionHeader_Display
      size="Small/Smaller"
      focus={false}
    />
  );
}

// @figmaExample SmallFocusedCellActionHeader
export function SmallFocusedCellActionHeader() {
  return (
    <CellActionHeader_Display
      size="Small/Smaller"
      focus={true}
    />
  );
}

// @figmaExample MediumCellActionHeader
export function MediumCellActionHeader() {
  return (
    <CellActionHeader_Display
      size="Medium/large"
      focus={false}
    />
  );
}

// @figmaExample MediumFocusedCellActionHeader
export function MediumFocusedCellActionHeader() {
  return (
    <CellActionHeader_Display
      size="Medium/large"
      focus={true}
    />
  );
}