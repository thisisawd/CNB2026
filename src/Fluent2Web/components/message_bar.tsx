import * as React from 'react';
import clsx from 'clsx';
import svgPaths from './svg-p4ke1bhi1p';

/**
 * An informational banner component for displaying status messages with optional actions and dismiss functionality.
 * Appears as a horizontal bar with light gray background (#f5f5f5), rounded corners, and a subtle border.
 * 
 * IMPORTANT: The message text is fixed and cannot be customized. Displays:
 * "Descriptive title   Message providing information to the user with actionable insights. Link"
 * 
 * Use this component when you need to:
 * - Display informational messages to users
 * - Provide actionable insights with button interactions
 * - Show non-intrusive notifications that can be dismissed
 * - Present messages in either compact single-line or expanded multi-line format
 */
export interface MessageBarProps {
  className?: string; // Custom className for the container (default: 800px wide container)
  actions?: boolean; // Whether to display action buttons (default: true)
  additionalAction?: boolean; // Whether to display a second action button, only appears if actions is also true (default: true)
  dismiss?: boolean; // Whether to display the dismiss (X) button in the top-right corner (default: true)
  layout?: 'Single line (Default)' | 'Multi line'; // Controls the visual layout: Single line (36px height, text truncates) or Multi line (expandable height, text wraps) (default: 'Single line (Default)')
  onDismiss?: () => void; // Callback fired when the dismiss button is clicked
  onActionClick?: () => void; // Callback fired when the primary action button is clicked
  onAdditionalActionClick?: () => void; // Callback fired when the additional (second) action button is clicked
  onLinkClick?: () => void; // Callback fired when the embedded "Link" text in the message is clicked
}

// ---------------------- Main Component ----------------------

export function MessageBar({ 
  className, 
  actions = true, 
  additionalAction = true, 
  dismiss = true, 
  layout = "Single line (Default)",
  onDismiss,
  onActionClick,
  onAdditionalActionClick,
  onLinkClick
}: MessageBarProps) {
  const isMultiLine = layout === "Multi line";
  const isSingleLineDefault = layout === "Single line (Default)";
  
  const handleLinkClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    onLinkClick?.();
  };
  
  const renderMessageContent = () => (
    <p className={isMultiLine ? "font-['Segoe_UI:Semibold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#242424] text-[0px] text-[12px] w-[520px] whitespace-pre-wrap" : "flex-[1_0_0] font-['Segoe_UI:Semibold',sans-serif] leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[12px] text-ellipsis whitespace-nowrap"}>
      <span className="leading-[16px]">Descriptive title</span>
      <span className="font-['Segoe_UI:Regular',sans-serif] leading-[16px]">{`   Message providing information to the user with actionable insights.`}</span>
      <span className="font-['Segoe_UI:Regular',sans-serif] leading-[16px]">{` `}</span>
      <span 
        className="decoration-solid font-['Segoe_UI:Regular',sans-serif] leading-[16px] text-[#115ea3] underline cursor-pointer hover:opacity-80"
        onClick={handleLinkClick}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onLinkClick?.();
          }
        }}
      >
        Link
      </span>
    </p>
  );
  
  return (
    <div className={className || `bg-[#f5f5f5] relative rounded-[4px] w-[800px] ${isMultiLine ? "" : "h-[36px]"}`}>
      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className={`flex ${isMultiLine ? "content-stretch flex-col gap-[10px] items-start px-[12px] py-[6px] relative w-full" : "flex-row items-center size-full"}`}>
        {isSingleLineDefault && (
          <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative size-full">
            <MessageBarStatusIconContainer />
            {renderMessageContent()}
            {actions && (
              <MessageBarActionsContainer 
                additionalAction={additionalAction}
                onActionClick={onActionClick}
                onAdditionalActionClick={onAdditionalActionClick}
              >
                Action
              </MessageBarActionsContainer>
            )}
            {dismiss && <MessageBarButton onClick={onDismiss} />}
          </div>
        )}
        {isMultiLine && (
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Content container">
            <MessageBarStatusIconContainer additionalClassNames="pt-[2px]" />
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px pt-[4px] relative" data-name="Text container">
              {renderMessageContent()}
            </div>
            {dismiss && <MessageBarButton onClick={onDismiss} />}
          </div>
        )}
        {isMultiLine && actions && (
          <MessageBarActionsContainer 
            additionalClassNames="w-full" 
            additionalAction={additionalAction}
            onActionClick={onActionClick}
            onAdditionalActionClick={onAdditionalActionClick}
          >
            Action
          </MessageBarActionsContainer>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type ButtonProps = {
  onClick?: () => void;
};

export function Button({ children, onClick }: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="bg-white relative rounded-[4px] shrink-0 cursor-pointer"
      type="button"
    >
      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
          <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center relative shrink-0" data-name="Container">
            <div className="content-stretch flex items-start pb-[2px] relative shrink-0" data-name="Text wrapper for offset">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{children}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

type MessageBarButtonProps = {
  onClick?: () => void;
};

export function MessageBarButton({ onClick }: MessageBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer"
      type="button"
      aria-label="Dismiss"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[2px] relative">
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
  );
}

type MessageBarActionsContainerProps = {
  additionalAction: boolean;
  additionalClassNames?: string;
  onActionClick?: () => void;
  onAdditionalActionClick?: () => void;
};

export function MessageBarActionsContainer({ additionalAction, children, additionalClassNames = "", onActionClick, onAdditionalActionClick }: React.PropsWithChildren<MessageBarActionsContainerProps>) {
  return (
    <div className={clsx("content-stretch flex gap-[8px] items-start justify-end relative shrink-0", additionalClassNames)}>
      <Button onClick={onActionClick}>{children}</Button>
      {additionalAction && <Button onClick={onAdditionalActionClick}>Action</Button>}
    </div>
  );
}

type MessageBarStatusIconContainerProps = {
  additionalClassNames?: string;
};

export function MessageBarStatusIconContainer({ additionalClassNames = "" }: MessageBarStatusIconContainerProps) {
  return (
    <div className={clsx("content-stretch flex items-start relative shrink-0", additionalClassNames)}>
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Info">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Shape">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p6374a00} fill="var(--fill-0, #616161)" id="Shape" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface MessageBarProps_Display {
  actions?: boolean;
  additionalAction?: boolean;
  dismiss?: boolean;
  layout?: 'Single line (Default)' | 'Multi line';
}

function MessageBar_Display({
  actions,
  additionalAction,
  dismiss,
  layout,
}: MessageBarProps_Display) {
  return (
    <MessageBar
      actions={actions}
      additionalAction={additionalAction}
      dismiss={dismiss}
      layout={layout}
      onDismiss={() => console.log('Dismissed')}
      onActionClick={() => console.log('Action clicked')}
      onAdditionalActionClick={() => console.log('Additional action clicked')}
      onLinkClick={() => console.log('Link clicked')}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultFullFeatured
export function SingleLineFullFeaturedMessageBar() {
  return (
    <MessageBar_Display
      actions={true}
      additionalAction={true}
      dismiss={true}
      layout="Single line (Default)"
    />
  );
}

// @figmaExample MultiLineFullFeatured
export function MultiLineFullFeaturedMessageBar() {
  return (
    <MessageBar_Display
      actions={true}
      additionalAction={true}
      dismiss={true}
      layout="Multi line"
    />
  );
}

// @figmaExample SingleLineNoDismiss
export function SingleLineNoDismissMessageBar() {
  return (
    <MessageBar_Display
      actions={true}
      additionalAction={true}
      dismiss={false}
      layout="Single line (Default)"
    />
  );
}

// @figmaExample MultiLineOneAction
export function MultiLineOneActionMessageBar() {
  return (
    <MessageBar_Display
      actions={true}
      additionalAction={false}
      dismiss={true}
      layout="Multi line"
    />
  );
}

// @figmaExample SingleLineNoActions
export function SingleLineNoActionsMessageBar() {
  return (
    <MessageBar_Display
      actions={false}
      dismiss={true}
      layout="Single line (Default)"
    />
  );
}

// @figmaExample MinimalMessageBar
export function MinimalMessageBar() {
  return (
    <MessageBar_Display
      actions={false}
      dismiss={false}
      layout="Single line (Default)"
    />
  );
}