import * as React from 'react';
import { ReactNode } from 'react';

/**
 * A flexible container component that displays either its children or a placeholder prompt.
 * Appears as a rectangular container with a default gray background (#f0f0f0) and 252px width.
 * When empty, displays a light blue (#ebf3fc) placeholder panel with centered text
 * "SWAP WITH CONTENT COMPONENT" that becomes slightly darker on hover.
 * 
 * Used as a content area that prompts users to add content when empty. The placeholder is
 * interactive and visually guides users to replace it with actual content components.
 */
export interface FlexSpaceProps {
  className?: string; // Custom CSS classes to override the default styling (default: "bg-[#f0f0f0] relative w-[252px]")
  children?: ReactNode; // Content to display in the flex space. When provided, replaces the placeholder.
  onClick?: () => void; // Click handler that fires when the component is clicked (when children are present) or when the placeholder is clicked (when no children)
  onPlaceholderClick?: () => void; // Additional click handler that fires only when the placeholder is clicked (before onClick). Has no effect when children are present.
}

// ---------------------- Main Component ----------------------

export function FlexSpace({ 
  className,
  children,
  onClick,
  onPlaceholderClick
}: FlexSpaceProps) {
  const handlePlaceholderClick = () => {
    if (onPlaceholderClick) {
      onPlaceholderClick();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={className || "bg-[#f0f0f0] relative w-[252px]"} 
      data-name="Flex space"
      onClick={children ? onClick : undefined}
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          {children ? (
            children
          ) : (
            <div 
              className="bg-[#ebf3fc] flex-[1_0_0] h-[44px] min-h-px min-w-px relative cursor-pointer hover:bg-[#d9ebf9] transition-colors" 
              data-name="Placeholder"
              onClick={handlePlaceholderClick}
            >
              <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] left-[calc(50%-1px)] not-italic text-[#0f6cbd] text-[10px] text-center top-1/2 whitespace-nowrap">
                <p className="leading-[14px]">SWAP WITH CONTENT COMPONENT</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface FlexSpaceProps_Display {
  className?: string;
  children?: ReactNode;
}

function FlexSpace_Display({
  className,
  children,
}: FlexSpaceProps_Display) {
  return (
    <FlexSpace
      className={className}
      children={children}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample EmptyFlexSpaceDefault
export function EmptyFlexSpaceDefault() {
  return (
    <FlexSpace_Display />
  );
}

// @figmaExample EmptyFlexSpaceCustomStyling
export function EmptyFlexSpaceCustomStyling() {
  return (
    <FlexSpace_Display
      className="bg-white w-full h-48"
    />
  );
}

// @figmaExample FlexSpaceWithGradientContent
export function FlexSpaceWithGradientContent() {
  return (
    <FlexSpace_Display
      children={
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
          Content Component
        </div>
      }
    />
  );
}

// @figmaExample FlexSpaceCardWithColorBlocks
export function FlexSpaceCardWithColorBlocks() {
  return (
    <FlexSpace_Display
      className="bg-gray-100 w-64 h-64 rounded-xl shadow-lg"
      children={
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Card Title</h3>
          <p className="text-gray-600">This is example content inside a custom styled FlexSpace container.</p>
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-green-400 rounded-md"></div>
            <div className="w-12 h-12 bg-yellow-400 rounded-md"></div>
            <div className="w-12 h-12 bg-red-400 rounded-md"></div>
          </div>
        </div>
      }
    />
  );
}

// @figmaExample FlexSpaceCompactBox
export function FlexSpaceCompactBox() {
  return (
    <FlexSpace_Display
      className="bg-[#f0f0f0] w-[180px] h-[180px]"
      children={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-sm text-gray-600">Compact Box</div>
          </div>
        </div>
      }
    />
  );
}