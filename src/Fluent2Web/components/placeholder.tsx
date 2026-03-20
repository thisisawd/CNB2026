import * as React from 'react';
import { ReactNode } from 'react';

/**
 * A development placeholder component that displays temporary content during design and prototyping.
 * Appears as a light blue (#ebf3fc) background container with centered placeholder text or custom content. Has two distinct modes controlled by the slot prop.
 * 
 * - Slot "1": Renders as a centered container with "SWAP WITH CONTENT COMPONENT" text, positioned with a -50% Y-axis translation and light blue background
 * - Slot "2": Renders as a horizontal flex container with 16px gap, allowing for two placeholder areas (image and instance) without background styling or translation
 * 
 * Use this component during development to mark areas where final content components should be placed. The component is designed to be visually distinct to remind developers to replace it with actual content.
 */
export interface PlaceholderProps {
  className?: string; // Custom CSS classes to apply to the outer container. When provided, overrides the default styling including background and transform properties
  image?: ReactNode | null; // Content to display in the first position when slot is "2". Falls back to Placeholder1 component if not provided (default: null)
  instance?: ReactNode | null; // Content to display in the second position when slot is "2". Falls back to Placeholder1 component if not provided (default: null)
  slot?: '1' | '2'; // Controls the layout mode and appearance: "1": Simple centered placeholder with blue background and vertical translation, "2": Horizontal layout with two content areas (image and instance) (default: "1")
  slotBefore?: boolean; // When slot is "2", controls whether the image appears before the instance. If false, only the instance is rendered (default: true)
}

// ---------------------- Main Component ----------------------

export function Placeholder({ className, image = null, instance = null, slot = "1", slotBefore = true }: PlaceholderProps) {
  const is1 = slot === "1";
  const is2 = slot === "2";
  return (
    <div className={className || `relative ${is2 ? "" : "-translate-y-1/2 bg-[#ebf3fc]"}`}>
      <div className={`flex ${is2 ? "content-stretch gap-[16px] items-start relative" : "flex-row items-center justify-center size-full"}`}>
        {is1 && <PlaceholderText text="SWAP WITH CONTENT COMPONENT" />}
        {is2 && slotBefore && (image || <Placeholder1 />)}
        {is2 && (instance || <Placeholder1 />)}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export function Placeholder1() {
  return (
    <div className="bg-[#ebf3fc] relative shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <PlaceholderText text="SWAP WITH CONTENT COMPONENT" />
      </div>
    </div>
  );
}

type PlaceholderTextProps = {
  text: string;
};

export function PlaceholderText({ text }: PlaceholderTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center px-[43px] py-[15px] relative">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f6cbd] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface PlaceholderProps_Display {
  image?: ReactNode | null;
  instance?: ReactNode | null;
  slot?: '1' | '2';
  slotBefore?: boolean;
}

function Placeholder_Display({
  image,
  instance,
  slot,
  slotBefore,
}: PlaceholderProps_Display) {
  return (
    <Placeholder
      image={image}
      instance={instance}
      slot={slot}
      slotBefore={slotBefore}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultSlotOnePlaceholder
export function PlaceholderDisplay1() {
  return (
    <Placeholder_Display
      slot="1"
    />
  );
}

// @figmaExample ImageAndInstancePlaceholder
export function PlaceholderDisplay2() {
  return (
    <Placeholder_Display
      slot="2"
      image={
        <div className="w-32 h-32 bg-blue-200 rounded-md flex items-center justify-center text-sm font-medium text-blue-700">
          Image Slot
        </div>
      }
      instance={
        <div className="w-32 h-32 bg-purple-200 rounded-md flex items-center justify-center text-sm font-medium text-purple-700">
          Instance Slot
        </div>
      }
    />
  );
}

// @figmaExample ImageOnlyPlaceholder
export function PlaceholderDisplay3() {
  return (
    <Placeholder_Display
      slot="2"
      image={
        <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center text-sm font-medium text-green-700">
          Image
        </div>
      }
      instance={null}
    />
  );
}

// @figmaExample InstanceOnlyPlaceholder
export function PlaceholderDisplay4() {
  return (
    <Placeholder_Display
      slot="2"
      image={null}
      instance={
        <div className="w-40 h-24 bg-orange-200 rounded-md flex items-center justify-center text-sm font-medium text-orange-700">
          Instance Only
        </div>
      }
    />
  );
}

// @figmaExample NoImageBeforePlaceholder
export function PlaceholderDisplay5() {
  return (
    <Placeholder_Display
      slot="2"
      slotBefore={false}
      instance={
        <div className="w-32 h-32 bg-pink-200 rounded-md flex items-center justify-center text-sm font-medium text-pink-700">
          No Image Before
        </div>
      }
    />
  );
}