import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-nd6kprmux';

/**
 * A visual placeholder component that indicates where content can be swapped or added.
 * Appears as a light blue rectangular box (44px height × 250px width by default) with centered text "SWAP AREA WITH YOUR COMPONENT" and a swap arrow icon.
 * 
 * When onClick is provided, the component becomes interactive:
 * - Shows pointer cursor on hover
 * - Reduces opacity to 0.8 on hover for visual feedback
 * - Supports keyboard interaction (Enter and Space keys)
 * - Acts as an accessible button with role="button"
 * 
 * Useful for:
 * - Design prototypes where components need to be swapped
 * - Placeholder areas in development
 * - Interactive layouts where users can trigger content replacement
 */
export interface ContentPlaceholderProps {
  className?: string; // Custom CSS classes to override default styling (default: "bg-[#ebf3fc] h-[44px] relative w-[250px]")
  onClick?: () => void; // Callback function triggered when placeholder is clicked or activated via keyboard
}

// ---------------------- Main Component ----------------------

export function ContentPlaceholder({ 
  className,
  onClick 
}: ContentPlaceholderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={className || "bg-[#ebf3fc] h-[44px] relative w-[250px]"} 
      data-name="Content placeholder"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        opacity: isHovered && onClick ? 0.8 : 1,
        transition: 'opacity 0.2s ease'
      }}
    >
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center relative size-full">
          <div className="content-stretch flex gap-[6px] h-[44px] items-center justify-center relative shrink-0 w-full" data-name="Container">
            <div className="relative shrink-0 size-[16px]" data-name="Arrow Swap">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-1/2 top-1/2 w-[10px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 13">
                  <path d={svgPaths.p3958af00} fill="var(--fill-0, #115EA3)" id="Shape" />
                </svg>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-center justify-center pb-[2px] relative shrink-0" data-name="Text">
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#115ea3] text-[10px] text-center w-full whitespace-pre-wrap">SWAP AREA WITH YOUR COMPONENT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface ContentPlaceholderProps_Display {
  className?: string;
}

function ContentPlaceholder_Display({
  className,
}: ContentPlaceholderProps_Display) {
  return (
    <ContentPlaceholder
      className={className}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultContentPlaceholder
export function DefaultContentPlaceholder() {
  return (
    <ContentPlaceholder_Display />
  );
}

// @figmaExample LargerContentPlaceholder
export function LargerContentPlaceholder() {
  return (
    <ContentPlaceholder_Display
      className="bg-[#ebf3fc] h-[60px] w-[300px]"
    />
  );
}

// @figmaExample GrayContentPlaceholder
export function GrayContentPlaceholder() {
  return (
    <ContentPlaceholder_Display
      className="bg-gray-100 h-[80px] w-[350px]"
    />
  );
}

// @figmaExample PurpleCompactPlaceholder
export function PurpleCompactPlaceholder() {
  return (
    <ContentPlaceholder_Display
      className="bg-purple-100 h-[44px] w-[200px]"
    />
  );
}

// @figmaExample GreenLargeContentPlaceholder
export function GreenLargeContentPlaceholder() {
  return (
    <ContentPlaceholder_Display
      className="bg-green-50 h-[100px] w-[400px]"
    />
  );
}