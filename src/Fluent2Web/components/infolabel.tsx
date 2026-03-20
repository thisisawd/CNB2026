import * as React from 'react';
import svgPaths from "./svg-dg16dfj3l8";

/**
 * A labeled component with an adjacent information icon button, used to display field labels with optional contextual help.
 * Appears as a horizontal layout with a text label ("Label") followed by a circular info icon button.
 * The entire component scales based on the size prop, with the label and icon maintaining proportional sizing.
 *
 * This component is ideal for form fields or settings where users might need additional context or help information.
 * The info button is fully keyboard accessible and stops event propagation to prevent unwanted parent interactions.
 */
export interface InfoLabelProps {
  className?: string; // Custom CSS classes for the container element
  size?: 'Small' | 'Medium' | 'Large'; // Controls the overall scale of both the label and info button (default: "Small")
    // "Small": 12px text, 20px info button
    // "Medium": 14px regular text, 24px info button
    // "Large": 16px semibold text, 24px info button (uses semibold font weight)
  onInfoClick?: () => void; // Callback function triggered when the info button is clicked or activated via keyboard (Enter/Space)
}

// ---------------------- Main Component ----------------------

export function InfoLabel({ className, size = "Small", onInfoClick }: InfoLabelProps) {
  const isLarge = size === "Large";
  const isSmall = size === "Small";
  return (
    <div className={className || "relative"}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center relative">
          <Label className="relative shrink-0" size={isSmall ? "Small" : isLarge ? "Large" : undefined} type={isLarge ? "Semibold" : undefined} />
          <InfoButton
            className={`bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 ${isSmall ? "size-[20px]" : "size-[24px]"}`}
            size={isSmall ? "Small" : isLarge ? "Large" : undefined}
            onClick={onInfoClick}
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components ----------------------

type InfoButtonProps = {
  className?: string;
  size?: "Small" | "Medium" | "Large";
  state?: "Rest";
  onClick?: () => void;
};

export function InfoButton({ className, size = "Medium", state = "Rest", onClick }: InfoButtonProps) {
  const isLargeAndRest = size === "Large" && state === "Rest";
  const isMediumAndRest = size === "Medium" && state === "Rest";
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };
  
  return (
    <button
      className={className || `bg-[rgba(255,255,255,0)] relative rounded-[4px] ${isMediumAndRest || isLargeAndRest ? "size-[24px]" : "size-[20px]"}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      aria-label="Information"
      tabIndex={0}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className={`content-stretch flex items-center justify-center overflow-clip relative size-full ${isLargeAndRest ? "p-[2px]" : "p-[4px]"}`}>
          <div className={`overflow-clip relative shrink-0 ${isLargeAndRest ? "size-[20px]" : isMediumAndRest ? "size-[16px]" : "size-[12px]"}`} data-name="Info">
            <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${isLargeAndRest ? "size-[16px]" : isMediumAndRest ? "size-[14px]" : "size-[10px]"}`} data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isLargeAndRest ? "0 0 16 16" : isMediumAndRest ? "0 0 14 14" : "0 0 10 10"}>
                <path d={isLargeAndRest ? svgPaths.p28b43400 : isMediumAndRest ? svgPaths.p21507e00 : svgPaths.p9775f80} fill="var(--fill-0, #424242)" id="Shape" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

type LabelProps = {
  className?: string;
  disabled?: "Off";
  required?: boolean;
  size?: "Small" | "Medium" | "Large";
  text?: string;
  type?: "Regular (Default)" | "Semibold";
};

export function Label({ className, disabled = "Off", required = false, size = "Medium", text = "Label", type = "Regular (Default)" }: LabelProps) {
  const isRegularDefaultAndMediumAndOff = type === "Regular (Default)" && size === "Medium" && disabled === "Off";
  const isSemiboldAndLargeAndOff = type === "Semibold" && size === "Large" && disabled === "Off";
  return (
    <div className={className || "relative"}>
      <div className="flex flex-row items-end size-full">
        <div className={`content-stretch flex gap-[4px] items-end not-italic relative ${isSemiboldAndLargeAndOff ? "font-['Segoe_UI:Semibold',sans-serif] leading-[22px] text-[16px]" : isRegularDefaultAndMediumAndOff ? "font-['Segoe_UI:Regular',sans-serif] leading-[20px] text-[14px]" : "font-['Segoe_UI:Regular',sans-serif] leading-[16px] text-[12px]"}`}>
          <p className="relative shrink-0 text-[#242424]">{text}</p>
          {required && <p className="relative shrink-0 text-[#c50f1f]">*</p>}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface InfoLabelProps_Display {
  size?: 'Small' | 'Medium' | 'Large';
}

function InfoLabel_Display({ size }: InfoLabelProps_Display) {
  return <InfoLabel size={size} onInfoClick={() => {}} />;
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SmallInfoLabel
export function SmallInfoLabelExample() {
  return <InfoLabel_Display size="Small" />;
}

// @figmaExample MediumInfoLabel
export function MediumInfoLabelExample() {
  return <InfoLabel_Display size="Medium" />;
}

// @figmaExample LargeInfoLabel
export function LargeInfoLabelExample() {
  return <InfoLabel_Display size="Large" />;
}