import * as React from 'react';
import { useState } from 'react';

/**
 * A hover-triggered popup that displays helpful text or information to users.
 * Appears as a small rounded popup positioned below and centered on the trigger element.
 * The tooltip has a maximum width of 240px and automatically wraps text.
 * 
 * The tooltip can be used in either controlled or uncontrolled mode. In uncontrolled mode,
 * it automatically shows on mouse enter and hides on mouse leave. In controlled mode,
 * you manage the open state via the open and onOpenChange props.
 * 
 * Use this component to provide additional context or explanations for UI elements
 * without cluttering the interface.
 */
export interface TooltipProps {
  className?: string; // Custom className to override the default tooltip container styling (default: max-width and positioning classes)
  label?: string; // The text content to display inside the tooltip (default: "Tooltip will wrap text to next line when max width is reached at 240px.")
  style?: 'Default' | 'Brand' | 'Inverted'; // Visual style variant: "Default" (white bg), "Brand" (blue bg), or "Inverted" (dark bg) (default: "Default")
  open?: boolean; // Controlled state for tooltip visibility. When provided, the component operates in controlled mode
  onOpenChange?: (open: boolean) => void; // Callback fired when the tooltip's open state changes (on mouse enter/leave)
  children?: React.ReactNode; // The trigger element that users hover over to show the tooltip (default: "Hover me" text span)
}

// ---------------------- Main Component ----------------------

export function Tooltip({ 
  className, 
  label = "Tooltip will wrap text to next line when max width is reached at 240px.", 
  style = "Default",
  open: controlledOpen,
  onOpenChange,
  children
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use controlled open if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleMouseEnter = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
  };
  
  const handleMouseLeave = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  };
  
  const isBrand = style === "Brand";
  const isBrandOrInverted = ["Brand", "Inverted"].includes(style);
  const isDefault = style === "Default";
  const isInverted = style === "Inverted";
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children || <span className="cursor-help">Hover me</span>}
      {isOpen && (
        <div className={className || `max-w-[240px] absolute top-full left-1/2 transform -translate-x-1/2 mt-2 rounded-[4px] z-50 ${isInverted ? "bg-[#292929]" : isBrand ? "bg-[#0f6cbd]" : "bg-white"}`}>
          <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] ${isBrand ? "border-[#0f6cbd]" : "border-[rgba(255,255,255,0)]"}`} />
          <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[12px] py-[6px] relative">
            <div className="content-stretch flex items-center justify-center max-w-[216px] relative shrink-0" data-name="Label">
              {isBrandOrInverted && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[12px] text-white whitespace-pre-wrap">{label}</p>}
              {isDefault && <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#242424] text-[12px] whitespace-pre-wrap">{label}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface TooltipProps_Display {
  label?: string;
  style?: 'Default' | 'Brand' | 'Inverted';
  children?: React.ReactNode;
}

function Tooltip_Display({
  label,
  style,
  children,
}: TooltipProps_Display) {
  const [open, setOpen] = React.useState(true);

  return (
    <Tooltip
      label={label}
      style={style}
      children={children}
      open={open}
      onOpenChange={setOpen}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultTooltipWithHelpfulInfo
export function DefaultTooltipWithHelpfulInfo() {
  return (
    <Tooltip_Display
      label="This is helpful information"
      style="Default"
    />
  );
}

// @figmaExample BrandTooltipWithSaveButton
export function BrandTooltipWithSaveButton() {
  return (
    <Tooltip_Display
      label="Click this button to save your work"
      style="Brand"
      children={
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save
        </button>
      }
    />
  );
}

// @figmaExample InvertedTooltipWithInfoIcon
export function InvertedTooltipWithInfoIcon() {
  return (
    <Tooltip_Display
      label="Important notice about this action"
      style="Inverted"
      children={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      }
    />
  );
}

// @figmaExample DefaultTooltipWithLongWrappingText
export function DefaultTooltipWithLongWrappingText() {
  return (
    <Tooltip_Display
      label="Tooltip will wrap text to next line when max width is reached at 240px. This is a longer description that demonstrates the wrapping behavior."
      style="Default"
      children={
        <span className="cursor-help text-blue-600 underline decoration-dotted">
          Hover for more info
        </span>
      }
    />
  );
}

// @figmaExample BrandTooltipWithCustomElement
export function BrandTooltipWithCustomElement() {
  return (
    <Tooltip_Display
      label="Brand styled tooltip with custom trigger"
      style="Brand"
      children={
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md">
          <span>Custom Element</span>
        </div>
      }
    />
  );
}

// @figmaExample InvertedTooltipDarkTheme
export function InvertedTooltipDarkTheme() {
  return (
    <Tooltip_Display
      label="Dark theme tooltip for better contrast"
      style="Inverted"
    />
  );
}