import * as React from 'react';
import { useEffect } from 'react';
import svgPaths from "./svg-7lqoyfmkog";

/**
 * A notification component that displays temporary messages with optional actions and progress tracking.
 * Appears as a white rounded card (292px wide by default) with a subtle shadow, typically positioned in a corner of the screen.
 * 
 * The component automatically handles:
 * - Auto-dismissal after a specified timeout
 * - Keyboard accessibility (Escape key to dismiss, Enter/Space for actions)
 * - ARIA attributes for screen readers (role="alert", aria-live="polite")
 * 
 * USAGE NOTES:
 * - Returns null when open is false, so no need to conditionally render
 * - If autoDismissTimeout is set, onDismiss must also be provided for auto-dismiss to work
 * - The dismiss button appears by default; set endContent={false} to hide it
 * - Additional content (body section) only appears when additionalContent={true}
 * - Quick actions only appear when both additionalContent={true} and quickActions={true}
 */
export interface ToastProps {
  className?: string // Custom CSS classes to override default styling. Default provides white background, rounded corners, shadow, and 292px width
  titleString?: string // The primary text displayed prominently in the toast header. Default: "Primary information"
  secondaryString?: string // Secondary information text shown in the body when additionalContent is true. Default: "Secondary information"
  tertiaryString?: string // Tertiary information text shown below secondary text when both additionalContent and tertiaryInformation are true. Default: "Tertiary information"
  progressString?: string // Text label for the progress bar when progressBar is true. Default: "00% complete"
  open?: boolean // Controls visibility of the toast. When false, component returns null. Default: true
  additionalContent?: boolean // Shows the toast body section containing secondary text, tertiary text, progress bar, and quick actions. Default: false
  tertiaryInformation?: boolean // Shows tertiary text below secondary text. Only visible when additionalContent is true. Default: false
  progressBar?: boolean // Shows a progress bar in the body section. Only visible when additionalContent is true. Default: false
  quickActions?: boolean // Shows action link buttons in the body section. Only visible when additionalContent is true. Default: false
  additionalAction?: boolean // Shows a second action link button. Only visible when both additionalContent and quickActions are true. Default: false
  endContent?: boolean // Shows the dismiss (X) button in the header. Default: true
  onDismiss?: () => void // Callback fired when toast is dismissed via close button, Escape key, or auto-dismiss timeout
  onActionClick?: () => void // Callback fired when the primary action link is clicked. Only relevant when quickActions is true
  onSecondaryActionClick?: () => void // Callback fired when the secondary action link is clicked. Only relevant when additionalAction is true
  autoDismissTimeout?: number // Milliseconds before auto-dismissing the toast. Requires onDismiss to be provided. No auto-dismiss if not specified
}

// ---------------------- Main Component ----------------------

export function Toast({ 
  className, 
  additionalAction = false, 
  additionalContent = false, 
  endContent = true, 
  progressBar = false, 
  progressString = "00% complete", 
  quickActions = false, 
  secondaryString = "Secondary information", 
  tertiaryInformation = false, 
  tertiaryString = "Tertiary information", 
  titleString = "Primary information",
  open = true,
  onDismiss,
  onActionClick,
  onSecondaryActionClick,
  autoDismissTimeout
}: ToastProps) {
  // Auto-dismiss functionality
  useEffect(() => {
    if (open && autoDismissTimeout && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoDismissTimeout);
      
      return () => clearTimeout(timer);
    }
  }, [open, autoDismissTimeout, onDismiss]);

  // Handle escape key to dismiss
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && onDismiss) {
        onDismiss();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, onDismiss]);

  if (!open) {
    return null;
  }

  return (
    <div className={className || "bg-white min-w-[292px] relative rounded-[4px] w-[292px]"} data-name="Toast" role="alert" aria-live="polite">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]" />
      <div className="content-stretch flex flex-col items-start min-w-[inherit] p-[12px] relative w-full">
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Toast header">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Status content">
            <div className="content-stretch flex items-center relative shrink-0" data-name="Status icon container">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Info">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path d={svgPaths.p6374a00} fill="var(--fill-0, #616161)" id="Shape" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="flex-[1_0_0] font-['Segoe_UI:Semibold',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#242424] text-[14px] whitespace-pre-wrap">{titleString}</p>
          </div>
          {endContent && (
            <div className="content-stretch flex h-[20px] items-center relative shrink-0" data-name="End container">
              <div 
                className="overflow-clip relative shrink-0 size-[20px] cursor-pointer hover:opacity-70" 
                data-name="Dismiss"
                onClick={onDismiss}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onDismiss?.();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Dismiss notification"
              >
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                    <path d={svgPaths.p301c8b00} fill="var(--fill-0, #242424)" id="Shape" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        {additionalContent && (
          <div className="relative shrink-0 w-full" data-name="Toast body">
            <div className="content-stretch flex flex-col items-start pl-[28px] relative w-full">
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px] w-full whitespace-pre-wrap">{secondaryString}</p>
              {tertiaryInformation && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#424242] text-[12px] w-full whitespace-pre-wrap">{tertiaryString}</p>}
              {progressBar && (
                <div className="content-stretch flex flex-col gap-[8px] items-start py-[8px] relative shrink-0 w-full" data-name="Progress bar container">
                  <div className="bg-[#e6e6e6] h-[2px] relative rounded-[9999px] shrink-0 w-full" data-name="Static_ProgressBar">
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                    <div className="content-stretch flex items-start pr-[100px] relative size-full">
                      <div className="bg-[#0f6cbd] flex-[1_0_0] h-full min-h-px min-w-px rounded-[9999px]" data-name="Track" />
                    </div>
                  </div>
                  <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#242424] text-[12px] w-full whitespace-pre-wrap">{progressString}</p>
                </div>
              )}
              {quickActions && (
                <div className="content-stretch flex gap-[16px] items-start pt-[7px] relative shrink-0 w-full" data-name="Quick actions container">
                  <ToastLinkText text="Action" onClick={onActionClick} />
                  {additionalAction && <ToastLinkText text="Action" onClick={onSecondaryActionClick} />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type ToastLinkTextProps = {
  text: string;
  onClick?: () => void;
};

function ToastLinkText({ text, onClick }: ToastLinkTextProps) {
  return (
    <div 
      className="h-[21px] relative shrink-0 cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="content-stretch flex gap-[4px] h-full items-start relative">
        <div className="content-stretch flex flex-col items-start pb-[2px] relative shrink-0" data-name="Text">
          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#115ea3] text-[14px]">{text}</p>
        </div>
      </div>
    </div>
  );
}

type CalendarProps = {
  className?: string;
  direction?: "LTR" | "RTL";
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled" | "Light";
};

function Calendar({ className, direction = "LTR", size = "12", theme = "Regular" }: CalendarProps) {
  const isLtrAnd12AndFilled = direction === "LTR" && size === "12" && theme === "Filled";
  const isLtrAnd12AndRegular = direction === "LTR" && size === "12" && theme === "Regular";
  const isLtrAnd16AndRegular = direction === "LTR" && size === "16" && theme === "Regular";
  const isLtrAnd20AndRegular = direction === "LTR" && size === "20" && theme === "Regular";
  const isLtrAnd24AndRegular = direction === "LTR" && size === "24" && theme === "Regular";
  const isLtrAnd32AndLight = direction === "LTR" && size === "32" && theme === "Light";
  const isLtrAnd32AndRegular = direction === "LTR" && size === "32" && theme === "Regular";
  const isLtrAnd48AndRegular = direction === "LTR" && size === "48" && theme === "Regular";
  const isRtlAnd12AndRegular = direction === "RTL" && size === "12" && theme === "Regular";
  return (
    <div className={className || `relative ${isLtrAnd32AndLight ? "size-[32px]" : isLtrAnd48AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[48px]" : isLtrAnd12AndFilled || isLtrAnd12AndRegular || isRtlAnd12AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[12px]" : isLtrAnd32AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[32px]" : isLtrAnd16AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[16px]" : isLtrAnd20AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[20px]" : isLtrAnd24AndRegular ? "-translate-x-1/2 -translate-y-1/2 size-[24px]" : "-translate-x-1/2 -translate-y-1/2 size-[28px]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${isLtrAnd48AndRegular ? "size-[36px]" : isLtrAnd12AndFilled || isLtrAnd12AndRegular || isRtlAnd12AndRegular ? "size-[10px]" : isLtrAnd32AndRegular || isLtrAnd32AndLight ? "size-[26px]" : isLtrAnd16AndRegular ? "size-[12px]" : isLtrAnd20AndRegular ? "size-[14px]" : isLtrAnd24AndRegular ? "size-[18px]" : "size-[22px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isLtrAnd48AndRegular ? "0 0 36 36" : isLtrAnd12AndFilled || isLtrAnd12AndRegular || isRtlAnd12AndRegular ? "0 0 10 10" : isLtrAnd32AndRegular || isLtrAnd32AndLight ? "0 0 26 26" : isLtrAnd16AndRegular ? "0 0 12 12" : isLtrAnd20AndRegular ? "0 0 14 14" : isLtrAnd24AndRegular ? "0 0 18 18" : "0 0 22 22"}>
          <path d={isLtrAnd32AndLight ? svgPaths.p7c1b300 : isLtrAnd48AndRegular ? svgPaths.p260f3500 : isLtrAnd12AndRegular || isRtlAnd12AndRegular ? svgPaths.p1851ef80 : isLtrAnd12AndFilled ? svgPaths.p34b11d00 : isLtrAnd32AndRegular ? svgPaths.p241b2d80 : isLtrAnd16AndRegular ? svgPaths.p17a8ef00 : isLtrAnd20AndRegular ? svgPaths.p37618c00 : isLtrAnd24AndRegular ? svgPaths.p18a70500 : svgPaths.p352d2380} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface ToastProps_Display {
  className?: string
  titleString?: string
  secondaryString?: string
  tertiaryString?: string
  progressString?: string
  additionalContent?: boolean
  tertiaryInformation?: boolean
  progressBar?: boolean
  quickActions?: boolean
  additionalAction?: boolean
  endContent?: boolean
}

function Toast_Display({
  className,
  titleString,
  secondaryString,
  tertiaryString,
  progressString,
  additionalContent,
  tertiaryInformation,
  progressBar,
  quickActions,
  additionalAction,
  endContent,
}: ToastProps_Display) {
  const [open, setOpen] = React.useState(true)

  return (
    <Toast
      className={className}
      titleString={titleString}
      secondaryString={secondaryString}
      tertiaryString={tertiaryString}
      progressString={progressString}
      open={open}
      additionalContent={additionalContent}
      tertiaryInformation={tertiaryInformation}
      progressBar={progressBar}
      quickActions={quickActions}
      additionalAction={additionalAction}
      endContent={endContent}
      onDismiss={() => {}}
      onActionClick={() => {}}
      onSecondaryActionClick={() => {}}
    />
  )
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SimpleSuccessToast
export function SimpleSuccessToast() {
  return (
    <Toast_Display
      titleString="File uploaded successfully"
    />
  );
}

// @figmaExample UploadCompleteToast
export function UploadCompleteToast() {
  return (
    <Toast_Display
      titleString="Upload complete"
      additionalContent={true}
      secondaryString="Your file has been saved to the cloud"
    />
  );
}

// @figmaExample ProcessingWithProgressToast
export function ProcessingWithProgressToast() {
  return (
    <Toast_Display
      titleString="Processing document"
      additionalContent={true}
      secondaryString="Analyzing your document for errors"
      progressBar={true}
      progressString="45% complete"
    />
  );
}

// @figmaExample MessageWithActionsToast
export function MessageWithActionsToast() {
  return (
    <Toast_Display
      titleString="New message received"
      additionalContent={true}
      secondaryString="John Smith sent you a file"
      quickActions={true}
      additionalAction={true}
    />
  );
}

// @figmaExample SyncWithFullDetailsToast
export function SyncWithFullDetailsToast() {
  return (
    <Toast_Display
      titleString="Sync in progress"
      additionalContent={true}
      secondaryString="Syncing your files with the cloud"
      tertiaryInformation={true}
      tertiaryString="This may take a few minutes"
      progressBar={true}
      progressString="67% complete"
    />
  );
}

// @figmaExample UpdateWithActionsToast
export function UpdateWithActionsToast() {
  return (
    <Toast_Display
      titleString="Update available"
      additionalContent={true}
      secondaryString="A new version is ready to install"
      tertiaryInformation={true}
      tertiaryString="Version 2.5.0 - Released today"
      quickActions={true}
      additionalAction={true}
    />
  );
}