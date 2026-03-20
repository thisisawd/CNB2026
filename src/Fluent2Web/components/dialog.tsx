import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-yimfzy50li';

/**
 * A modal dialog component that displays centered on screen with a semi-transparent overlay backdrop.
 * Appears as a white rounded card floating above the page content. The dialog includes a configurable 
 * header, body area, and footer with action buttons. The component handles focus management, escape key 
 * dismissal, and click-outside-to-close behavior.
 * 
 * Use this component when you need to:
 * - Display important information that requires user acknowledgment
 * - Get user confirmation before a critical action
 * - Show a form or content that needs focused attention
 * - Present options that affect the current workflow
 * 
 * The dialog automatically manages accessibility features including focus trapping, ARIA roles, 
 * and keyboard navigation.
 */
export interface DialogProps {
  className?: string; // Custom CSS classes for the dialog container
  body?: boolean; // Whether to show the body section of the dialog (default: true)
  bodyText?: string; // Text content displayed in the body when layout is "Text" (default: "Here is more about the consequences of the main action, if details are needed.")
  checkbox?: boolean; // Whether to show a checkbox in the body section, only visible in "Text" layout (default: false)
  contentSwap?: React.ReactNode | null; // Custom content to replace the placeholder area in "Placeholder" layout. If null, shows default placeholder
  dismiss?: boolean; // Whether to show the close (X) button in the top-right corner (default: true)
  footer?: boolean; // Whether to show the footer section with action buttons (default: true)
  headerText?: string; // Text displayed in the dialog header (default: "Main question or action")
  layout?: "Text" | "Placeholder"; // Layout mode that significantly changes appearance: "Placeholder" shows a blue placeholder area with swap text, "Text" shows bodyText and optional checkbox (default: "Placeholder")
  secondaryButton?: boolean; // Whether to show the secondary action button labeled "Different action" (default: true)
  size?: "600px" | "320px"; // Dialog width. Changes button layout: "600px" has horizontal buttons, "320px" has stacked vertical full-width buttons (default: "600px")
  tertiaryButton?: boolean; // Whether to show the tertiary action button labeled "Tertiary action". Positioned on left side in 600px width, stacked at top in 320px width (default: false)
  open?: boolean; // Controls dialog visibility. When false, dialog returns null (default: true)
  onOpenChange?: (open: boolean) => void; // Callback fired when dialog should close (via dismiss button, escape key, or overlay click)
  onPrimaryClick?: () => void; // Click handler for the primary action button (blue button, labeled "Take action")
  onSecondaryClick?: () => void; // Click handler for the secondary action button
  onTertiaryClick?: () => void; // Click handler for the tertiary action button
  checkboxChecked?: boolean; // Controlled state for the checkbox when checkbox prop is true (default: false)
  onCheckboxChange?: (checked: boolean) => void; // Callback fired when checkbox state changes
}

// ---------------------- Main Component ----------------------

export function Dialog({ 
  className, 
  body = true, 
  bodyText = "Here is more about the consequences of the main action, if details are needed.", 
  checkbox = false, 
  contentSwap = null, 
  dismiss = true, 
  footer = true, 
  headerText = "Main question or action", 
  layout = "Placeholder", 
  secondaryButton = true, 
  size = "600px", 
  tertiaryButton = false,
  open = true,
  onOpenChange,
  onPrimaryClick,
  onSecondaryClick,
  onTertiaryClick,
  checkboxChecked = false,
  onCheckboxChange
}: DialogProps) {
  const [internalChecked, setInternalChecked] = useState(checkboxChecked);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sync internal state with prop
  useEffect(() => {
    setInternalChecked(checkboxChecked);
  }, [checkboxChecked]);

  // Focus management - focus dialog when opened
  useEffect(() => {
    if (open && dialogRef.current) {
      // Focus the close button or first focusable element
      if (dismiss && closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }
  }, [open, dismiss]);

  // Handle escape key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  const handleClose = () => {
    onOpenChange?.(false);
  };

  const handleCheckboxChange = () => {
    const newChecked = !internalChecked;
    setInternalChecked(newChecked);
    onCheckboxChange?.(newChecked);
  };

  const handlePrimaryClick = () => {
    onPrimaryClick?.();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick?.();
  };

  const handleTertiaryClick = () => {
    onTertiaryClick?.();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!open) return null;

  const is320PxAndPlaceholder = size === "320px" && layout === "Placeholder";
  const is600PxAndPlaceholder = size === "600px" && layout === "Placeholder";
  const is600PxAndText = size === "600px" && layout === "Text";
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={dialogRef}
        className={className || `bg-white relative rounded-[8px] ${is320PxAndPlaceholder ? "max-w-[479px] min-w-[320px] w-[320px]" : "min-w-[480px] w-[600px]"}`}
      >
        <div className={`content-stretch flex flex-col gap-[8px] items-start min-w-[inherit] overflow-clip p-[24px] relative rounded-[inherit] w-full ${is320PxAndPlaceholder ? "max-w-[inherit]" : ""}`}>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
            <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#242424] text-[20px]">
              <p className="leading-[28px] whitespace-pre-wrap">{headerText}</p>
            </div>
            {dismiss && (
              <div className="content-stretch flex items-center justify-center pl-[4px] relative shrink-0 size-[28px]" data-name="Container for offset">
                <button 
                  ref={closeButtonRef}
                  onClick={handleClose}
                  className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 hover:bg-[#f5f5f5] active:bg-[#e0e0e0] transition-colors cursor-pointer" 
                  data-name="Button"
                  aria-label="Close dialog"
                >
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[6px] relative">
                      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
                        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                              <path d={svgPaths.p301c8b00} fill="var(--fill-0, #424242)" id="Shape" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
          {(is600PxAndPlaceholder || is320PxAndPlaceholder) &&
            body &&
            (contentSwap || (
              <div className="bg-[#ebf3fc] h-[44px] relative shrink-0 w-full" data-name="Content placeholder">
                <Text text="SWAP AREA WITH YOUR COMPONENT" additionalClassNames="overflow-clip rounded-[inherit]" />
              </div>
            ))}
          {is600PxAndPlaceholder && footer && (
            <Text1 
              text="Take action" 
              tertiaryButton={tertiaryButton} 
              secondaryButton={secondaryButton}
              onPrimaryClick={handlePrimaryClick}
              onSecondaryClick={handleSecondaryClick}
              onTertiaryClick={handleTertiaryClick}
            />
          )}
          {is600PxAndText && body && (
            <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Body">
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#242424] text-[14px] w-[min-content] whitespace-pre-wrap">{bodyText}</p>
              {checkbox && (
                <div className="relative shrink-0" data-name="Checkbox">
                  <label className="content-stretch flex gap-[4px] items-start relative cursor-pointer">
                    <div className="content-stretch flex items-start p-[8px] relative shrink-0" data-name="Checkbox elements">
                      <input
                        type="checkbox"
                        checked={internalChecked}
                        onChange={handleCheckboxChange}
                        className="sr-only"
                      />
                      <div className={clsx("relative rounded-[2px] shrink-0 size-[16px] transition-colors", internalChecked ? "bg-[#0f6cbd]" : "bg-white")} data-name="Background">
                        {internalChecked && (
                          <svg className="absolute inset-0 size-full text-white" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        <div aria-hidden="true" className={clsx("absolute border border-solid inset-0 pointer-events-none rounded-[2px]", internalChecked ? "border-[#0f6cbd]" : "border-[#616161]")} />
                      </div>
                    </div>
                    <div className="content-stretch flex items-start pr-[8px] py-[6px] relative shrink-0" data-name="Text wrapper for offset">
                      <div className="relative shrink-0" data-name="Label">
                        <div className="flex flex-row items-end size-full">
                          <div className="content-stretch flex gap-[4px] items-end relative">
                            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px]">Label</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              )}
            </div>
          )}
          {is600PxAndText && footer && (
            <Text1 
              text="Take action" 
              tertiaryButton={tertiaryButton} 
              secondaryButton={secondaryButton}
              onPrimaryClick={handlePrimaryClick}
              onSecondaryClick={handleSecondaryClick}
              onTertiaryClick={handleTertiaryClick}
            />
          )}
          {is320PxAndPlaceholder && footer && (
            <div className="content-stretch flex flex-col gap-[8px] items-start pt-[4px] relative shrink-0 w-full" data-name="Footer">
              {tertiaryButton && <Wrapper1 additionalClassNames="w-full" text="Tertiary action" additionalClassNames1="w-full" onClick={handleTertiaryClick} />}
              <button className="bg-[#0f6cbd] relative rounded-[4px] shrink-0 w-full hover:bg-[#115ea3] active:bg-[#0c4a86] transition-colors cursor-pointer" data-name="Button" onClick={handlePrimaryClick}>
                <div className="flex flex-row items-center justify-center size-full">
                  <Wrapper additionalClassNames="w-full">
                    <p className="leading-[20px]">Take action</p>
                  </Wrapper>
                </div>
              </button>
              {secondaryButton && <Wrapper1 additionalClassNames="w-full" text="Different action" additionalClassNames1="w-full" onClick={handleSecondaryClick} />}
            </div>
          )}
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_32px_64px_0px_rgba(0,0,0,0.24),0px_0px_8px_0px_rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type Wrapper1Props = {
  additionalClassNames?: string;
  text: string;
  additionalClassNames1?: string;
  onClick?: () => void;
};

export function Wrapper1({ children, additionalClassNames = "", text, additionalClassNames1 = "", onClick }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <button 
      onClick={onClick}
      className={clsx("bg-white relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] active:bg-[#e0e0e0] transition-colors", additionalClassNames)}
    >
      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className={clsx("content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative", additionalClassNames)}>
          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center relative shrink-0" data-name="Container">
            <div className="content-stretch flex items-start pb-[2px] relative shrink-0" data-name="Text wrapper for offset">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

type WrapperProps = {
  additionalClassNames?: string;
  onClick?: () => void;
};

export function Wrapper({ children, additionalClassNames = "", onClick }: React.PropsWithChildren<WrapperProps>) {
  return (
    <button
      onClick={onClick}
      className={clsx("content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative", additionalClassNames)}
    >
      <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
        <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
          <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">{children}</div>
        </div>
      </div>
    </button>
  );
}

type Text1Props = {
  text: string;
  tertiaryButton: boolean;
  secondaryButton: boolean;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onTertiaryClick?: () => void;
};

export function Text1({ text, tertiaryButton, secondaryButton, onPrimaryClick, onSecondaryClick, onTertiaryClick }: Text1Props) {
  return (
    <DialogFooter 
      tertiaryButton={tertiaryButton} 
      secondaryButton={secondaryButton}
      onPrimaryClick={onPrimaryClick}
      onSecondaryClick={onSecondaryClick}
      onTertiaryClick={onTertiaryClick}
    >
      <p className="leading-[20px]">{text}</p>
    </DialogFooter>
  );
}

type DialogFooterProps = {
  tertiaryButton: boolean;
  secondaryButton: boolean;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onTertiaryClick?: () => void;
};

export function DialogFooter({ tertiaryButton, secondaryButton, children, onPrimaryClick, onSecondaryClick, onTertiaryClick }: React.PropsWithChildren<DialogFooterProps>) {
  return (
    <div className="content-stretch flex items-start justify-between pt-[4px] relative shrink-0 w-full">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Left">
        {tertiaryButton && <Wrapper1 text="Tertiary action" onClick={onTertiaryClick} />}
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Right">
        <button className="bg-[#0f6cbd] relative rounded-[4px] shrink-0 hover:bg-[#115ea3] active:bg-[#0c4a86] transition-colors cursor-pointer" data-name="Button" onClick={onPrimaryClick}>
          <div className="flex flex-row items-center justify-center size-full">
            <Wrapper>{children}</Wrapper>
          </div>
        </button>
        {secondaryButton && <Wrapper1 text="Different action" onClick={onSecondaryClick} />}
      </div>
    </div>
  );
}

type TextProps = {
  text: string;
  additionalClassNames?: string;
};

export function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("flex flex-col items-center justify-center size-full", additionalClassNames)}>
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
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#115ea3] text-[10px] text-center w-full whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentPlaceholder({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#ebf3fc] h-[44px] relative w-[250px]"} data-name="Content placeholder">
      <Text text="SWAP AREA WITH YOUR COMPONENT" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface DialogProps_Display {
  body?: boolean;
  bodyText?: string;
  checkbox?: boolean;
  contentSwap?: React.ReactNode | null;
  dismiss?: boolean;
  footer?: boolean;
  headerText?: string;
  layout?: "Text" | "Placeholder";
  secondaryButton?: boolean;
  size?: "600px" | "320px";
  tertiaryButton?: boolean;
}

function Dialog_Display({
  className,
  body,
  bodyText,
  checkbox,
  contentSwap,
  dismiss,
  footer,
  headerText,
  layout,
  secondaryButton,
  size,
  tertiaryButton,
}: DialogProps_Display & { className?: string }) {
  const [open, setOpen] = React.useState(true);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);

  return (
    <Dialog
      className={className}
      body={body}
      bodyText={bodyText}
      checkbox={checkbox}
      contentSwap={contentSwap}
      dismiss={dismiss}
      footer={footer}
      headerText={headerText}
      layout={layout}
      secondaryButton={secondaryButton}
      size={size}
      tertiaryButton={tertiaryButton}
      open={open}
      onOpenChange={setOpen}
      onPrimaryClick={() => {}}
      onSecondaryClick={() => {}}
      onTertiaryClick={() => {}}
      checkboxChecked={checkboxChecked}
      onCheckboxChange={setCheckboxChecked}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DeleteFileConfirmation
export function DeleteFileConfirmation() {
  return (
    <Dialog_Display
      headerText="Delete this file?"
      layout="Text"
      bodyText="This action cannot be undone. The file will be permanently deleted."
      size="600px"
      secondaryButton={true}
    />
  );
}

// @figmaExample UploadFilesDialog
export function UploadFilesDialog() {
  return (
    <Dialog_Display
      headerText="Upload Files"
      layout="Placeholder"
      size="600px"
      contentSwap={
        <div className="w-full h-32 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-400">
          <span className="text-blue-600 font-medium">Drag & Drop Files Here</span>
        </div>
      }
    />
  );
}

// @figmaExample ConfirmActionMobile
export function ConfirmActionMobile() {
  return (
    <Dialog_Display
      headerText="Confirm Action"
      layout="Text"
      bodyText="Are you sure you want to proceed with this action?"
      size="320px"
      tertiaryButton={true}
      secondaryButton={true}
    />
  );
}

// @figmaExample FirstTimeSetupWithCheckbox
export function FirstTimeSetupWithCheckbox() {
  return (
    <Dialog_Display
      headerText="First Time Setup"
      layout="Text"
      bodyText="Welcome! Would you like a tour of the features?"
      checkbox={true}
      size="600px"
      secondaryButton={true}
    />
  );
}

// @figmaExample ImportantNotice
export function ImportantNotice() {
  return (
    <Dialog_Display
      headerText="Important Notice"
      layout="Text"
      bodyText="Please read the terms and conditions carefully before proceeding."
      size="600px"
      secondaryButton={false}
    />
  );
}

// @figmaExample CustomContentWithTertiary
export function CustomContentWithTertiary() {
  return (
    <Dialog_Display
      headerText="Custom Content Example"
      layout="Placeholder"
      size="600px"
      contentSwap={
        <div className="space-y-3">
          <div className="w-full h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Custom Component Area</span>
          </div>
          <p className="text-sm text-gray-600">This is custom content swapped into the placeholder.</p>
        </div>
      }
      tertiaryButton={true}
    />
  );
}

// @figmaExample MinimalDialogNoDismiss
export function MinimalDialogNoDismiss() {
  return (
    <Dialog_Display
      headerText="Minimal Dialog"
      layout="Text"
      bodyText="This is a minimal dialog with no dismiss button."
      size="320px"
      dismiss={false}
      secondaryButton={true}
    />
  );
}

// @figmaExample DialogWithoutFooter
export function DialogWithoutFooter() {
  return (
    <Dialog_Display
      headerText="Dialog Without Footer"
      layout="Text"
      bodyText="This dialog displays information without any action buttons in the footer."
      size="600px"
      footer={false}
    />
  );
}