import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-4845yrghrb';

/**
 * A teaching/tips popover component that displays educational content to help users understand or learn about features.
 * Appears as a fixed-width (288px) rounded card with a shadow, containing a "Tips" badge, title, body text, optional link, and action buttons.
 * 
 * IMPORTANT NOTES:
 * - This component contains hardcoded placeholder content (title, body text) and is intended as a template
 * - The HeaderContent area includes a placeholder that says "SWAP WITH CONTENT COMPONENT"
 * - Content customization beyond the callbacks is not currently supported via props
 * - Opens by default and can be controlled or uncontrolled
 * - Automatically closes when user presses Escape key or clicks the close button
 * - Returns null when closed, removing it from the DOM entirely
 */
export interface TeachingPopoverProps {
  className?: string; // Custom CSS class for the outer container. If not provided, defaults to "relative". Does not affect the popover's internal layout
  style?: "Default" | "Brand"; // "Default": White background with dark text (#242424), suitable for general UI contexts. "Brand": Blue background (#0f6cbd) with white text, suitable for prominent brand-focused moments (default: "Default")
  open?: boolean; // Controlled open state. When provided, component becomes controlled. If undefined, component manages its own internal state (starts as true). When false, component returns null and is not rendered
  onOpenChange?: (open: boolean) => void; // Callback fired when the open state changes. Called when user closes via close button or Escape key. Also called in controlled mode to notify parent of state change requests
  onPrimaryClick?: () => void; // Callback for the primary action button click
  onSecondaryClick?: () => void; // Callback for the secondary action button click
  onLinkClick?: () => void; // Callback when the "Always underline links" link is clicked. The link includes an external link icon
}

// ---------------------- Main Component ----------------------

export function TeachingPopover({ 
  className, 
  style = "Default",
  open: controlledOpen,
  onOpenChange,
  onPrimaryClick,
  onSecondaryClick,
  onLinkClick
}: TeachingPopoverProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  
  // Use controlled open state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };
  
  const handleClose = () => {
    handleOpenChange(false);
  };
  
  const handlePrimaryClick = () => {
    onPrimaryClick?.();
  };
  
  const handleSecondaryClick = () => {
    onSecondaryClick?.();
  };
  
  const handleLinkClick = () => {
    onLinkClick?.();
  };
  
  // Handle escape key to close popover
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  
  if (!isOpen) {
    return null;
  }
  
  const isBrand = style === "Brand";
  const isDefault = style === "Default";
  
  return (
    <div className={className || "relative"} onKeyDown={handleKeyDown}>
      <div className="content-stretch flex flex-col items-start relative">
        <div className={`relative rounded-[4px] shrink-0 ${isBrand ? "bg-[#0f6cbd]" : "bg-white"}`} data-name="Popover">
          <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] ${isBrand ? "border-[#0f6cbd]" : "border-[rgba(255,255,255,0)]"}`} />
          <div className="content-stretch flex flex-col items-start p-[16px] relative">
            {isDefault && (
              <Wrapper3>
                <HeaderContent>
                  <Badge>
                    <TeachingPopoverIcon>
                      <path d={svgPaths.p2abfc700} fill="var(--fill-0, #616161)" id="Shape" />
                    </TeachingPopoverIcon>
                    <div className="content-stretch flex flex-col h-[16px] items-center justify-end pb-px px-[2px] relative shrink-0" data-name="Text offset">
                      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[12px] text-center whitespace-nowrap">
                        <p className="leading-[16px]">Tips</p>
                      </div>
                    </div>
                  </Badge>
                  <TeachingPopoverButton onClick={handleClose}>
                    <path d={svgPaths.pd515600} fill="var(--fill-0, #424242)" id="Shape" />
                  </TeachingPopoverButton>
                </HeaderContent>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Main">
                  <div className="content-stretch flex items-start relative shrink-0 w-[288px]" data-name="Title">
                    <p className="flex-[1_0_0] font-['Segoe_UI:Semibold',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[#242424] text-[16px] whitespace-pre-wrap">Title</p>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Body">
                    <div className="content-stretch flex items-start relative shrink-0 w-[288px]" data-name="Body + Optional dismiss">
                      <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#242424] text-[14px] whitespace-pre-wrap">A detailed description of the content that helps the user understand or learn.</p>
                    </div>
                    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-[288px]" data-name="Last line + Link">
                      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px]">Additional body text</p>
                      <Link onClick={handleLinkClick}>
                        <div className="content-stretch flex flex-col items-start pb-[2px] relative shrink-0" data-name="Text">
                          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#115ea3] text-[14px]">Always underline links</p>
                          <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
                            <div aria-hidden="true" className="absolute border-[#115ea3] border-solid border-t inset-0 pointer-events-none" />
                          </div>
                        </div>
                        <TeachingPopoverOpen>
                          <path d={svgPaths.p20d37200} fill="var(--fill-0, #115EA3)" id="Shape" />
                        </TeachingPopoverOpen>
                      </Link>
                    </div>
                  </div>
                </div>
                <Text text="Secondary" onClick={handleSecondaryClick} />
              </Wrapper3>
            )}
            {isBrand && (
              <Wrapper3>
                <HeaderContent>
                  <Badge>
                    <TeachingPopoverIcon>
                      <path d={svgPaths.p2abfc700} fill="var(--fill-0, white)" id="Shape" />
                    </TeachingPopoverIcon>
                    <div className="content-stretch flex flex-col h-[16px] items-center justify-end pb-px px-[2px] relative shrink-0" data-name="Text offset">
                      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
                        <p className="leading-[16px]">Tips</p>
                      </div>
                    </div>
                  </Badge>
                  <TeachingPopoverButton onClick={handleClose}>
                    <path d={svgPaths.pd515600} fill="var(--fill-0, white)" id="Shape" />
                  </TeachingPopoverButton>
                </HeaderContent>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Main">
                  <div className="content-stretch flex items-start relative shrink-0 w-[288px]" data-name="Title">
                    <p className="flex-[1_0_0] font-['Segoe_UI:Semibold',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[16px] text-white whitespace-pre-wrap">Title</p>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Body">
                    <div className="content-stretch flex items-start relative shrink-0 w-[288px]" data-name="Body + Optional dismiss">
                      <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-white whitespace-pre-wrap">A detailed description of the content that helps the user understand or learn</p>
                    </div>
                    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-[288px]" data-name="Last line + Link">
                      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white">Additional body text</p>
                      <Link onClick={handleLinkClick}>
                        <div className="content-stretch flex flex-col items-start pb-[2px] relative shrink-0" data-name="Text">
                          <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white">Always underline links</p>
                          <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
                            <div aria-hidden="true" className="absolute border-solid border-t border-white inset-0 pointer-events-none" />
                          </div>
                        </div>
                        <TeachingPopoverOpen>
                          <path d={svgPaths.p20d37200} fill="var(--fill-0, white)" id="Shape" />
                        </TeachingPopoverOpen>
                      </Link>
                    </div>
                  </div>
                </div>
                <Text text="Secondary" onClick={handleSecondaryClick} />
              </Wrapper3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Link({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div className="h-[21px] relative shrink-0">
      <div 
        className="content-stretch flex gap-[4px] h-full items-start relative cursor-pointer" 
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}

function HeaderContent({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[116px] items-start relative shrink-0">
      <div className="content-stretch flex items-start justify-end relative shrink-0 w-[288px]" data-name="Header">
        {children}
      </div>
      <TeachingPopoverPlaceholderText text="SWAP WITH CONTENT COMPONENT" />
    </div>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-[288px]">
      <div className="content-stretch flex flex-col gap-[12px] items-start relative w-full">{children}</div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">{children}</div>
    </div>
  );
}

type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("content-stretch flex items-center relative shrink-0", additionalClassNames)}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Size=16, Theme=Regular">
        {children}
      </div>
    </div>
  );
}

function TeachingPopoverOpen({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[14px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          {children}
        </svg>
      </div>
    </div>
  );
}

function Badge({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[24px] left-[-7px] min-w-[24px] rounded-[9999px] top-0">
      <div className="flex flex-row items-center justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[2px] h-full items-center justify-center min-w-[inherit] px-[4px] relative">{children}</div>
      </div>
    </div>
  );
}

function TeachingPopoverIcon({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12px] left-1/2 top-1/2 w-[9px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 12">
          {children}
        </svg>
      </div>
    </Wrapper1>
  );
}

function TeachingPopoverButton({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div 
      className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)] transition-colors"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Close"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[2px] relative">
          <Wrapper1 additionalClassNames="gap-[4px] justify-center">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[11px] top-1/2" data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                {children}
              </svg>
            </div>
          </Wrapper1>
        </div>
      </div>
    </div>
  );
}

type TextProps = {
  text: string;
  onClick?: () => void;
};

function Text({ text, onClick }: TextProps) {
  return (
    <Wrapper>
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{text}</p>
      </div>
    </Wrapper>
  );
}

function Wrapper({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div className="relative shrink-0 w-[288px]">
      <div className="flex flex-row items-end justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-end justify-end pt-[12px] relative w-full">
          <TeachingPopoverButtonText text="Primary" onClick={onClick} />
          <div 
            className="bg-white relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] active:bg-[#e0e0e0] transition-colors" 
            data-name="Button"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }}
          >
            <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <Wrapper2>
              <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center relative shrink-0" data-name="Container">
                <div className="content-stretch flex items-start pb-[2px] relative shrink-0" data-name="Text wrapper for offset">
                  {children}
                </div>
              </div>
            </Wrapper2>
          </div>
        </div>
      </div>
    </div>
  );
}

type TeachingPopoverButtonTextProps = {
  text: string;
  onClick?: () => void;
};

function TeachingPopoverButtonText({ text, onClick }: TeachingPopoverButtonTextProps) {
  return (
    <div 
      className="bg-[#0f6cbd] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#115ea3] active:bg-[#0c5299] transition-colors"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Wrapper2>
        <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
          <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
            <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
              <p className="leading-[20px]">{text}</p>
            </div>
          </div>
        </div>
      </Wrapper2>
    </div>
  );
}

type TeachingPopoverPlaceholderTextProps = {
  text: string;
};

function TeachingPopoverPlaceholderText({ text }: TeachingPopoverPlaceholderTextProps) {
  return (
    <div className="bg-[#ebf3fc] flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-full items-center justify-center px-[43px] py-[15px] relative">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f6cbd] text-[10px] text-center whitespace-nowrap">
            <p className="leading-[14px]">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface TeachingPopoverProps_Display {
  className?: string;
  style?: "Default" | "Brand";
}

function TeachingPopover_Display({
  className,
  style,
}: TeachingPopoverProps_Display) {
  return (
    <TeachingPopover
      className={className}
      style={style}
      open={true}
      onOpenChange={() => {}}
      onPrimaryClick={() => {}}
      onSecondaryClick={() => {}}
      onLinkClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultTipsPopover
export function DefaultTipsPopover() {
  return (
    <TeachingPopover_Display
      style="Default"
    />
  );
}

// @figmaExample BrandTipsPopover
export function BrandTipsPopover() {
  return (
    <TeachingPopover_Display
      style="Brand"
    />
  );
}