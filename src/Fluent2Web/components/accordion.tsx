import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-jxa04n25fu';

/**
 * An interactive collapsible panel component that expands and collapses content when clicked.
 * Appears as a rounded rectangular button with a chevron icon, optional leading icon, and text label.
 * When expanded, reveals a content panel below the header. The component is 340px wide by default and has a 44px tall header.
 *
 * The accordion can be used in both controlled and uncontrolled modes. In uncontrolled mode, it manages its own open state (defaulting to open).
 * In controlled mode, use the `open` and `onOpenChange` props to manage state externally.
 *
 * Supports keyboard navigation with Enter and Space keys for accessibility.
 */
export interface AccordionProps {
  className?: string; // Custom CSS classes. Default renders as a 340px wide container with 4px border radius
  chevron?: 'Before' | 'After'; // Position of the chevron icon relative to the text. "Before" (default) places it on the left, "After" on the right
  contentSwap?: React.ReactNode | null; // Custom content to display in the expanded panel. If null, shows a blue placeholder with "SWAP WITH CONTENT COMPONENT" text
  open?: boolean; // Controlled open/expanded state. When undefined, component manages its own state (defaults to true/open)
  onOpenChange?: (open: boolean) => void; // Callback fired when the accordion's open state changes, receives the new open state as argument
  focused?: boolean; // When true, displays a focus ring (black outer border with white inner border) around the header. Default is false
  icon?: boolean; // Whether to show the leading icon. Default is true. Has no effect when chevron is "After"
  iconBefore20PxRegular?: React.ReactNode | null; // Custom 20px icon to display before the text (when chevron is "Before"). If null and icon is true, shows a default placeholder icon
  size?: 'Medium' | 'Large' | 'Small' | 'Extra large'; // Controls text size and font weight. "Medium" (default) uses 14px text, "Large" uses 16px semibold, "Extra large" uses 20px semibold, "Small" uses 12px
  state?: 'Rest' | 'Disabled'; // Interactive state. "Rest" (default) allows normal interaction. "Disabled" prevents interaction, changes cursor to not-allowed, disables keyboard navigation, and dims the text and chevron to #BDBDBD
  text?: string; // The label text displayed in the accordion header. Default is "Text"
}

// ---------------------- Main Component ----------------------

export function Accordion({
  className,
  chevron = 'Before',
  contentSwap = null,
  open: controlledOpen,
  onOpenChange,
  focused = false,
  icon = true,
  iconBefore20PxRegular = null,
  size = 'Medium',
  state = 'Rest',
  text = 'Text',
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const expanded = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const isDisabled = state === 'Disabled';

  const handleToggle = () => {
    if (isDisabled) return;

    const newOpen = !expanded;

    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }

    onOpenChange?.(newOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const isExtraLargeAndRestAndExpandedAndBefore =
    size === 'Extra large' && state === 'Rest' && expanded && chevron === 'Before';
  const isLargeAndRestAndExpandedAndBefore = size === 'Large' && state === 'Rest' && expanded && chevron === 'Before';
  const isMediumAndDisabledAndNotExpandedAndBefore =
    size === 'Medium' && state === 'Disabled' && !expanded && chevron === 'Before';
  const isMediumAndRestAndExpandedAndAfter = size === 'Medium' && state === 'Rest' && expanded && chevron === 'After';
  const isMediumAndRestAndExpandedAndBefore = size === 'Medium' && state === 'Rest' && expanded && chevron === 'Before';
  const isMediumAndRestAndNotExpandedAndBefore =
    size === 'Medium' && state === 'Rest' && !expanded && chevron === 'Before';
  const isSmallAndRestAndExpandedAndBefore = size === 'Small' && state === 'Rest' && expanded && chevron === 'Before';
  return (
    <div className={className || 'relative rounded-[4px] w-[340px]'}>
      <div className="content-stretch flex flex-col items-start relative w-full">
        <div
          className={`h-[44px] relative rounded-[4px] shrink-0 w-full ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          data-name="Content"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          role="button"
          aria-expanded={expanded}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
        >
          <div className="flex flex-row items-center size-full">
            <div
              className={`content-stretch flex items-center px-[10px] relative size-full ${isMediumAndRestAndExpandedAndAfter ? 'gap-[8px]' : 'justify-between'}`}
            >
              {(isMediumAndRestAndExpandedAndBefore ||
                isMediumAndRestAndExpandedAndAfter ||
                isMediumAndRestAndNotExpandedAndBefore ||
                isSmallAndRestAndExpandedAndBefore ||
                isMediumAndDisabledAndNotExpandedAndBefore) && (
                <>
                  <div
                    className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative"
                    data-name="Left+text"
                  >
                    {(isMediumAndRestAndExpandedAndBefore ||
                      isMediumAndRestAndNotExpandedAndBefore ||
                      isSmallAndRestAndExpandedAndBefore ||
                      isMediumAndDisabledAndNotExpandedAndBefore) && (
                      <>
                        <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Left">
                          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Chevron">
                            <div
                              className={`-translate-x-1/2 -translate-y-1/2 absolute ${isMediumAndRestAndNotExpandedAndBefore || isMediumAndDisabledAndNotExpandedAndBefore ? 'h-[12.001px] left-[calc(50%+0.75px)] top-1/2 w-[6.499px]' : 'h-[6.499px] left-1/2 top-[calc(50%+0.75px)] w-[12.001px]'}`}
                              data-name="Shape"
                            >
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox={
                                  isMediumAndRestAndNotExpandedAndBefore || isMediumAndDisabledAndNotExpandedAndBefore
                                    ? '0 0 6.49919 12.0008'
                                    : '0 0 12.0008 6.49919'
                                }
                              >
                                <path
                                  d={
                                    isMediumAndRestAndNotExpandedAndBefore || isMediumAndDisabledAndNotExpandedAndBefore
                                      ? svgPaths.p154164f0
                                      : svgPaths.p101e4700
                                  }
                                  fill={
                                    isMediumAndDisabledAndNotExpandedAndBefore
                                      ? 'var(--fill-0, #BDBDBD)'
                                      : 'var(--fill-0, #242424)'
                                  }
                                  id="Shape"
                                />
                              </svg>
                            </div>
                          </div>
                          {(isMediumAndRestAndExpandedAndBefore || isSmallAndRestAndExpandedAndBefore) &&
                            (iconBefore20PxRegular || <AccordionPlaceholder />)}
                          {isMediumAndRestAndNotExpandedAndBefore &&
                            icon &&
                            (iconBefore20PxRegular || <AccordionPlaceholder />)}
                          {isMediumAndDisabledAndNotExpandedAndBefore &&
                            icon &&
                            (iconBefore20PxRegular || (
                              <Wrapper>
                                <path
                                  clipRule="evenodd"
                                  d={svgPaths.pa51a700}
                                  fill="var(--fill-0, #BDBDBD)"
                                  fillRule="evenodd"
                                  id="Shape"
                                />
                              </Wrapper>
                            ))}
                        </div>
                        <div
                          className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px pb-[2px] relative"
                          data-name="Text-offset"
                        >
                          {(isMediumAndRestAndExpandedAndBefore || isMediumAndRestAndNotExpandedAndBefore) && (
                            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                              <p className="leading-[20px]">{text}</p>
                            </div>
                          )}
                          {isSmallAndRestAndExpandedAndBefore && (
                            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] whitespace-nowrap">
                              <p className="leading-[16px]">{text}</p>
                            </div>
                          )}
                          {isMediumAndDisabledAndNotExpandedAndBefore && (
                            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bdbdbd] text-[14px] whitespace-nowrap">
                              <p className="leading-[20px]">{text}</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {isMediumAndRestAndExpandedAndAfter && icon && (iconBefore20PxRegular || <AccordionPlaceholder />)}
                    {isMediumAndRestAndExpandedAndAfter && (
                      <div
                        className="content-stretch flex items-center pb-[2px] relative shrink-0 w-[272px]"
                        data-name="Text-offset"
                      >
                        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">{text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`shrink-0 ${isMediumAndRestAndExpandedAndAfter ? 'content-stretch flex items-start relative' : 'size-[20px]'}`}
                    data-name="Right"
                  >
                    {isMediumAndRestAndExpandedAndAfter && (
                      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Chevron">
                        <AccordionShape additionalClassNames="top-[calc(50%-0.75px)]">
                          <path d={svgPaths.p11c10670} fill="var(--fill-0, #242424)" id="Shape" />
                        </AccordionShape>
                      </div>
                    )}
                  </div>
                </>
              )}
              {focused && (
                <div className="absolute inset-0 pointer-events-none" data-name="Focus ring">
                  <div
                    className="absolute border-2 border-black border-solid inset-0 rounded-[4px]"
                    data-name="Border-outer"
                  />
                  <div
                    className="absolute border border-solid border-white inset-[2px] rounded-[2px]"
                    data-name="Border-inner"
                  />
                </div>
              )}
              {(isLargeAndRestAndExpandedAndBefore || isExtraLargeAndRestAndExpandedAndBefore) && (
                <>
                  <div
                    className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative"
                    data-name="Left+text"
                  >
                    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Left">
                      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Chevron">
                        <AccordionShape additionalClassNames="top-[calc(50%+0.75px)]">
                          <path d={svgPaths.p101e4700} fill="var(--fill-0, #242424)" id="Shape" />
                        </AccordionShape>
                      </div>
                      {isLargeAndRestAndExpandedAndBefore && (iconBefore20PxRegular || <AccordionPlaceholder />)}
                      {isExtraLargeAndRestAndExpandedAndBefore &&
                        icon &&
                        (iconBefore20PxRegular || <AccordionPlaceholder />)}
                    </div>
                    <div
                      className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px pb-[2px] relative"
                      data-name="Text-offset"
                    >
                      {isLargeAndRestAndExpandedAndBefore && (
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[16px] whitespace-nowrap">
                          <p className="leading-[22px]">{text}</p>
                        </div>
                      )}
                      {isExtraLargeAndRestAndExpandedAndBefore && (
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[20px] whitespace-nowrap">
                          <p className="leading-[28px]">{text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 size-[20px]" data-name="Right" />
                </>
              )}
            </div>
          </div>
        </div>
        {(isMediumAndRestAndExpandedAndBefore ||
          isMediumAndRestAndExpandedAndAfter ||
          isLargeAndRestAndExpandedAndBefore ||
          isExtraLargeAndRestAndExpandedAndBefore ||
          isSmallAndRestAndExpandedAndBefore) && (
          <div className="relative shrink-0 w-full" data-name="Panel">
            <div className="content-stretch flex flex-col items-start pb-[12px] px-[12px] relative w-full">
              {(isMediumAndRestAndExpandedAndBefore ||
                isMediumAndRestAndExpandedAndAfter ||
                isLargeAndRestAndExpandedAndBefore ||
                isSmallAndRestAndExpandedAndBefore) &&
                (contentSwap || (
                  <div className="bg-[#ebf3fc] relative shrink-0 w-full" data-name="Placeholder">
                    <div className="flex flex-row items-center justify-center size-full">
                      <Text text="SWAP WITH CONTENT COMPONENT" additionalClassNames="w-full" />
                    </div>
                  </div>
                ))}
              {isExtraLargeAndRestAndExpandedAndBefore && (contentSwap || <Placeholder2 />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type AccordionShapeProps = {
  additionalClassNames?: string;
};

function AccordionShape({
  children,
  additionalClassNames = '',
}: React.PropsWithChildren<AccordionShapeProps>) {
  return (
    <div
      className={clsx(
        '-translate-x-1/2 -translate-y-1/2 absolute h-[6.499px] left-1/2 w-[12.001px]',
        additionalClassNames
      )}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0008 6.49919">
        {children}
      </svg>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <Wrapper1>
        <div className="relative shrink-0 size-[16px]" data-name="Shape">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            {children}
          </svg>
        </div>
      </Wrapper1>
    </div>
  );
}

function AccordionPlaceholder() {
  return (
    <Wrapper>
      <path
        clipRule="evenodd"
        d={svgPaths.pa51a700}
        fill="var(--fill-0, #242424)"
        fillRule="evenodd"
        id="Shape"
      />
    </Wrapper>
  );
}

function Placeholder2() {
  return (
    <div className="bg-[#ebf3fc] relative shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <Text text="SWAP WITH CONTENT COMPONENT" />
      </div>
    </div>
  );
}

type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = '' }: TextProps) {
  return (
    <div
      className={clsx(
        'content-stretch flex items-center justify-center px-[43px] py-[15px] relative',
        additionalClassNames
      )}
    >
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f6cbd] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}

type PlaceholderProps = {
  className?: string;
  image?: React.ReactNode | null;
  instance?: React.ReactNode | null;
  slot?: '1' | '2';
  slotBefore?: boolean;
};

function Placeholder({
  className,
  image = null,
  instance = null,
  slot = '1',
  slotBefore = true,
}: PlaceholderProps) {
  const is1 = slot === '1';
  const is2 = slot === '2';
  return (
    <div className={className || `relative ${is2 ? '' : '-translate-y-1/2 bg-[#ebf3fc]'}`}>
      <div
        className={`flex ${is2 ? 'content-stretch gap-[16px] items-start relative' : 'flex-row items-center justify-center size-full'}`}
      >
        {is1 && <Text text="SWAP WITH CONTENT COMPONENT" />}
        {is2 && slotBefore && (image || <Placeholder2 />)}
        {is2 && (instance || <Placeholder2 />)}
      </div>
    </div>
  );
}

type Placeholder1Props = {
  className?: string;
  size?: '12' | '16' | '20' | '24' | '28' | '32' | '48';
  theme?: 'Regular' | 'Filled';
};

function Placeholder1({ className, size = '12', theme = 'Regular' }: Placeholder1Props) {
  const is12AndFilled = size === '12' && theme === 'Filled';
  const is12AndRegular = size === '12' && theme === 'Regular';
  const is16AndRegular = size === '16' && theme === 'Regular';
  const is20AndRegular = size === '20' && theme === 'Regular';
  const is24AndRegular = size === '24' && theme === 'Regular';
  const is28AndRegular = size === '28' && theme === 'Regular';
  const is32AndRegular = size === '32' && theme === 'Regular';
  const is48AndRegular = size === '48' && theme === 'Regular';
  return (
    <div
      className={
        className ||
        `-translate-x-1/2 -translate-y-1/2 relative ${is48AndRegular ? 'size-[48px]' : is24AndRegular || is20AndRegular || is16AndRegular || is12AndRegular || is12AndFilled ? '' : is32AndRegular ? 'size-[32px]' : 'size-[28px]'}`
      }
    >
      {(is24AndRegular || is20AndRegular || is16AndRegular || is12AndRegular || is12AndFilled) && (
        <Wrapper1>
          <div
            className={`relative shrink-0 ${is12AndRegular || is12AndFilled ? 'size-[8px]' : is16AndRegular ? 'size-[12px]' : is20AndRegular ? 'size-[16px]' : 'size-[20px]'}`}
            data-name="Shape"
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox={
                is12AndRegular || is12AndFilled
                  ? '0 0 8 8'
                  : is16AndRegular
                    ? '0 0 12 12'
                    : is20AndRegular
                      ? '0 0 16 16'
                      : '0 0 20 20'
              }
            >
              <path
                clipRule="evenodd"
                d={
                  is12AndRegular || is12AndFilled
                    ? svgPaths.p18da8d00
                    : is16AndRegular
                      ? svgPaths.p31a9aa00
                      : is20AndRegular
                        ? svgPaths.pa51a700
                        : svgPaths.p399cfc00
                }
                fill="var(--fill-0, #242424)"
                fillRule="evenodd"
                id="Shape"
              />
            </svg>
          </div>
        </Wrapper1>
      )}
      {(is28AndRegular || is32AndRegular || is48AndRegular) && (
        <div
          className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${is48AndRegular ? 'size-[40px]' : is32AndRegular ? 'size-[26px]' : 'size-[22px]'}`}
          data-name="Shape"
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox={is48AndRegular ? '0 0 40 40' : is32AndRegular ? '0 0 26 26' : '0 0 22 22'}
          >
            <path
              clipRule="evenodd"
              d={is48AndRegular ? svgPaths.p20a13b40 : is32AndRegular ? svgPaths.p14bd3300 : svgPaths.p3a7e7880}
              fill="var(--fill-0, #242424)"
              fillRule="evenodd"
              id="Shape"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface AccordionProps_Display {
  chevron?: 'Before' | 'After';
  contentSwap?: React.ReactNode | null;
  focused?: boolean;
  icon?: boolean;
  iconBefore20PxRegular?: React.ReactNode | null;
  size?: 'Medium' | 'Large' | 'Small' | 'Extra large';
  state?: 'Rest' | 'Disabled';
  text: string;
}

function Accordion_Display({
  chevron,
  contentSwap,
  focused,
  icon,
  iconBefore20PxRegular,
  size,
  state,
  text,
}: AccordionProps_Display) {
  const [open, setOpen] = React.useState(true);

  return (
    <Accordion
      chevron={chevron}
      contentSwap={contentSwap}
      open={open}
      onOpenChange={setOpen}
      focused={focused}
      icon={icon}
      iconBefore20PxRegular={iconBefore20PxRegular}
      size={size}
      state={state}
      text={text}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultAccordion
export function DefaultAccordion() {
  return <Accordion_Display text="Default Accordion" />;
}

// @figmaExample SmallSizeAccordion
export function SmallSizeAccordion() {
  return <Accordion_Display text="Small Size" size="Small" />;
}

// @figmaExample LargeSizeAccordion
export function LargeSizeAccordion() {
  return <Accordion_Display text="Large Size" size="Large" />;
}

// @figmaExample ExtraLargeSizeAccordion
export function ExtraLargeSizeAccordion() {
  return <Accordion_Display text="Extra Large Size" size="Extra large" />;
}

// @figmaExample ChevronAfterAccordion
export function ChevronAfterAccordion() {
  return <Accordion_Display text="Chevron After" chevron="After" />;
}

// @figmaExample NoIconAccordion
export function NoIconAccordion() {
  return <Accordion_Display text="No Icon" icon={false} />;
}

// @figmaExample CustomContentAccordion
export function CustomContentAccordion() {
  return (
    <Accordion_Display
      text="Custom Content"
      contentSwap={
        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-700">This is custom content inside the accordion panel.</p>
          <div className="mt-2 h-12 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-blue-600 font-medium">Custom Component</span>
          </div>
        </div>
      }
    />
  );
}

// @figmaExample DisabledStateAccordion
export function DisabledStateAccordion() {
  return <Accordion_Display text="Disabled State" state="Disabled" />;
}