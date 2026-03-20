import * as React from 'react';
import { useState } from 'react';

/**
 * ImageSwapPlaceholder
 * 
 * A visual placeholder component for images, typically used in design systems or component libraries
 * to indicate where an image can be swapped or replaced.
 * 
 * Appears as a light blue (#ebf3fc) square box (default 40x40 pixels) displaying size text and the
 * instruction "Use component swap to change". When clickable, shows hover effects with reduced
 * opacity (0.8) and a pointer cursor. Fully accessible with keyboard navigation support.
 * 
 * Use this component when:
 * - You need a placeholder during design/development to indicate an image swap point
 * - Building a component variant system where images can be swapped
 * - Creating mockups or wireframes that need visual indicators for replaceable images
 */
export interface ImageSwapPlaceholderProps {
  /** Custom CSS classes to override the default styling. If not provided, defaults to "bg-[#ebf3fc] relative size-[40px]" which creates a 40x40px light blue square. Provide this to change size, colors, or positioning. */
  className?: string;
  /** Click handler for when the placeholder is clicked. When provided, the component becomes interactive with hover effects, pointer cursor, keyboard support (Enter/Space keys), and proper ARIA button role. */
  onClick?: () => void;
}

// ---------------------- Main Component ----------------------

export function ImageSwapPlaceholder({ 
  className,
  onClick 
}: ImageSwapPlaceholderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={className || "bg-[#ebf3fc] relative size-[40px]"} 
      data-name="Image swap placeholder"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        opacity: isHovered && onClick ? 0.8 : 1,
        transition: 'opacity 0.2s ease-in-out'
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="Image swap placeholder, click to change image"
    >
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center relative size-full">
          <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic pt-[4px] relative shrink-0 text-[#115ea3] text-center" data-name="Text">
            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] relative shrink-0 text-[10px] tracking-[0.3px] whitespace-nowrap">
              <p className="leading-[14px]">40x40</p>
            </div>
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-none relative shrink-0 text-[4px] w-[32px] whitespace-pre-wrap">Use component swap to change</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface ImageSwapPlaceholderProps_Display {
  size?: '40' | '60' | '80' | '100' | '120';
}

function ImageSwapPlaceholder_Display({
  size = '40',
}: ImageSwapPlaceholderProps_Display) {
  const sizeMap = {
    '40': 'size-[40px]',
    '60': 'size-[60px]',
    '80': 'size-[80px]',
    '100': 'size-[100px]',
    '120': 'size-[120px]',
  };

  const className = `bg-[#ebf3fc] relative ${sizeMap[size]}`;

  return <ImageSwapPlaceholder className={className} />;
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SmallPlaceholder40px
export function ImageSwapPlaceholderExample1() {
  return <ImageSwapPlaceholder_Display size="40" />;
}

// @figmaExample MediumPlaceholder60px
export function ImageSwapPlaceholderExample2() {
  return <ImageSwapPlaceholder_Display size="60" />;
}

// @figmaExample LargePlaceholder80px
export function ImageSwapPlaceholderExample3() {
  return <ImageSwapPlaceholder_Display size="80" />;
}

// @figmaExample ExtraLargePlaceholder100px
export function ImageSwapPlaceholderExample4() {
  return <ImageSwapPlaceholder_Display size="100" />;
}

// @figmaExample ExtraExtraLargePlaceholder120px
export function ImageSwapPlaceholderExample5() {
  return <ImageSwapPlaceholder_Display size="120" />;
}