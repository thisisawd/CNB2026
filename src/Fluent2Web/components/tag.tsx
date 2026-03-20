import * as React from 'react';
import clsx from 'clsx';
import svgPaths from './svg-fbht1xgjfm';

/**
 * A versatile tag/chip component for categorization, filtering, or displaying user selections.
 * Appears as a compact, rounded rectangular element with text and optional icon/avatar. The tag can include a dismiss button on the right side and supports multiple visual styles and sizes to match different UI contexts.
 * 
 * This component is fully interactive with keyboard navigation support (Enter/Space keys) and can be used for filtering, categorization, selection, or displaying metadata. The tag automatically handles disabled states and prevents interaction when appropriate.
 */
export interface TagProps {
  /** The main text displayed in the tag (default: "Primary text") */
  primaryString?: string;
  /** Secondary text shown only in 2-line layout (Medium size only) (default: "Secondary") */
  secondaryString?: string;
  /** Controls the overall size of the tag (default: "Medium (Default)")
   * - "Extra small": 20px height, smallest compact size with 12px text
   * - "Small": 24px height, small size with 12px text
   * - "Medium (Default)": 32px height, default size with 14px text and support for 2-line layout
   */
  size?: "Extra small" | "Small" | "Medium (Default)";
  /** Visual style variant, significantly changes appearance (default: "Filled (Default)")
   * - "Filled (Default)": Light gray background (#f5f5f5), standard appearance
   * - "Outline": Transparent background with border (#d1d1d1)
   * - "Brand": Light blue background (#ebf3fc) with blue text (#115ea3), used for branded tags
   */
  style?: "Filled (Default)" | "Outline" | "Brand";
  /** Current interaction state
   * - "Rest": Normal default state
   * - "Hover": Hover state (for visual representation)
   * - "Pressed": Pressed/active state (for visual representation)
   * - "Disabled": Disabled state with reduced opacity, prevents all interaction
   */
  state?: "Rest" | "Hover" | "Pressed" | "Disabled";
  /** Whether the tag is selected, changes to blue background (#0f6cbd) with white text (default: false) */
  selected?: boolean;
  /** Text layout configuration (default: "1 line (Default)")
   * - "1 line (Default)": Single line of text (primaryString only)
   * - "2 line (Medium only)": Two lines showing both primaryString and secondaryString (only available with Medium size)
   */
  layout?: "1 line (Default)" | "2 line (Medium only)";
  /** Whether to show an avatar circle on the left side with initials (default: false) */
  avatar?: boolean;
  /** Whether to show an icon before the text (default: false) */
  icon?: boolean;
  /** Whether to show the dismiss/close button on the right side (default: true) */
  dismiss?: boolean;
  /** Whether to show focus ring (black border) around the tag (default: false) */
  focus?: boolean;
  /** Click handler for the entire tag, makes tag interactive */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Handler for dismiss button click, event propagation is stopped automatically */
  onDismiss?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Optional custom className to override default styles */
  className?: string;
  /** Custom icon for Extra small size (12px) */
  regular12Px?: React.ReactNode | null;
  /** Custom icon for Small size (16px) */
  regular16Px?: React.ReactNode | null;
  /** Custom icon for Medium size (20px) */
  regular20Px?: React.ReactNode | null;
  /** Custom filled icon for selected state (20px) */
  filled20Px?: React.ReactNode | null;
}

export function Tag({ className, avatar = false, dismiss = true, filled20Px = null, focus = false, icon = false, layout = "1 line (Default)", primaryString = "Primary text", regular12Px = null, regular16Px = null, regular20Px = null, secondaryString = "Secondary", selected = false, size = "Medium (Default)", state = "Rest", style = "Filled (Default)", onClick, onDismiss }: TagProps) {
  const isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected = style === "Brand" && size === "Medium (Default)" && layout === "1 line (Default)" && state === "Rest" && !selected;
  const isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected = style === "Filled (Default)" && size === "Extra small" && layout === "1 line (Default)" && state === "Rest" && !selected;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && state === "Disabled" && !selected;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && state === "Hover" && !selected;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && state === "Pressed" && !selected;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && state === "Rest" && !selected;
  const isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected = style === "Filled (Default)" && size === "Medium (Default)" && layout === "1 line (Default)" && state === "Rest" && selected;
  const isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot = style === "Filled (Default)" && size === "Medium (Default)" && layout === "2 line (Medium only)" && state === "Rest" && !selected;
  const isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelected = style === "Filled (Default)" && size === "Small" && layout === "1 line (Default)" && state === "Rest" && !selected;
  const isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected = style === "Outline" && size === "Medium (Default)" && layout === "1 line (Default)" && state === "Rest" && !selected;
  
  const isDisabled = state === "Disabled";
  
  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDismiss?.(e);
  };
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDisabled) {
      onClick?.(e);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e as any);
    }
  };
  
  return (
    <div 
      className={className || `relative rounded-[4px] ${isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected ? "bg-[#0f6cbd] h-[32px] max-h-[32px]" : isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot ? "bg-[#f0f0f0] h-[32px] max-h-[32px]" : isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected ? "h-[32px] max-h-[32px]" : isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected ? "bg-[#ebf3fc] h-[32px] max-h-[32px]" : isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot ? "bg-[#f5f5f5] h-[32px] max-h-[32px]" : isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelected ? "bg-[#f5f5f5] h-[24px] max-h-[24px]" : "bg-[#f5f5f5] h-[20px] max-h-[20px]"}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-pressed={selected}
      style={{ cursor: isDisabled ? 'not-allowed' : onClick ? 'pointer' : 'default' }}
    >
      <div aria-hidden={isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot ? "true" : undefined} className={isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot ? "flex flex-row items-center max-h-[inherit] size-full" : isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected ? "absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" : "absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px]"}>
        {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndDisabledAndNot && (
          <div className="content-stretch flex h-full items-center max-h-[inherit] relative">
            {avatar && <TagAvatarContainer avatar={avatar} />}
            <div className="content-stretch flex gap-[4px] h-full items-center max-h-[32px] px-[8px] relative shrink-0" data-name="Content">
              {icon &&
                (regular20Px || (
                  <TagPlaceholder>
                    <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #BDBDBD)" fillRule="evenodd" id="Shape" />
                  </TagPlaceholder>
                ))}
              <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0" data-name="Text slot">
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bdbdbd] text-[14px] whitespace-nowrap">
                  <p className="leading-[20px]">{primaryString}</p>
                </div>
              </div>
              {dismiss && (
                <TagDismiss onClick={handleDismiss} disabled={isDisabled}>
                  <path d={svgPaths.p301c8b00} fill="var(--fill-0, #BDBDBD)" id="Shape" />
                </TagDismiss>
              )}
            </div>
          </div>
        )}
      </div>
      {(isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && (
        <div className="flex flex-row items-center max-h-[inherit] size-full">
          <div className="content-stretch flex h-full items-center max-h-[inherit] relative">
            {(isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && focus && (
              <div className="absolute inset-0 rounded-[4px]" data-name="Focus ring">
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute border border-solid border-white inset-0 rounded-[4px]" data-name="Inner stroke" />
                </div>
                <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
              </div>
            )}
            {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && avatar && <TagAvatarContainer avatar={avatar} />}
            {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && (
              <div className="content-stretch flex gap-[4px] h-full items-center max-h-[32px] px-[8px] relative shrink-0" data-name="Content">
                {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) &&
                  icon &&
                  (regular20Px || (
                    <TagPlaceholder>
                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                    </TagPlaceholder>
                  ))}
                {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && (
                  <div className={`content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0 ${isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot ? "" : "font-['Segoe_UI:Regular',sans-serif] leading-[0] not-italic text-[#424242] whitespace-nowrap"}`} data-name="Text slot">
                    {(isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && (
                      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
                        <p className="leading-[20px]">{primaryString}</p>
                      </div>
                    )}
                    {isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot && (
                      <>
                        <div className="flex flex-col justify-center relative shrink-0 text-[12px]">
                          <p className="leading-[16px]">{primaryString}</p>
                        </div>
                        <div className="flex flex-col justify-center relative shrink-0 text-[10px]">
                          <p className="leading-[14px]">{secondaryString}</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {(isFilledDefaultAndMediumDefaultAnd2LineMediumOnlyAndRestAndNot || isOutlineAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndNot) && dismiss && (
                  <TagDismiss onClick={handleDismiss} disabled={isDisabled}>
                    <path d={svgPaths.p301c8b00} fill="var(--fill-0, #424242)" id="Shape" />
                  </TagDismiss>
                )}
                {isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected &&
                  icon &&
                  (regular20Px || (
                    <TagPlaceholder>
                      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #115EA3)" fillRule="evenodd" id="Shape" />
                    </TagPlaceholder>
                  ))}
                {isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected && (
                  <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0" data-name="Text slot">
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#115ea3] text-[14px] whitespace-nowrap">
                      <p className="leading-[20px]">{primaryString}</p>
                    </div>
                  </div>
                )}
                {(isBrandAndMediumDefaultAnd1LineDefaultAndRestAndNotSelected || isFilledDefaultAndMediumDefaultAnd1LineDefaultAndPressedAndNot) && dismiss && (
                  <TagDismiss onClick={handleDismiss} disabled={isDisabled}>
                    <path d={svgPaths.p301c8b00} fill="var(--fill-0, #115EA3)" id="Shape" />
                  </TagDismiss>
                )}
                {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected &&
                  icon &&
                  (filled20Px || (
                    <TagPlaceholder>
                      <path clipRule="evenodd" d={svgPaths.p30769300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
                    </TagPlaceholder>
                  ))}
                {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected && (
                  <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0" data-name="Text slot">
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                      <p className="leading-[20px]">{primaryString}</p>
                    </div>
                  </div>
                )}
                {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndRestAndSelected && dismiss && (
                  <TagDismiss onClick={handleDismiss} disabled={isDisabled}>
                    <path d={svgPaths.p301c8b00} fill="var(--fill-0, white)" id="Shape" />
                  </TagDismiss>
                )}
                {isFilledDefaultAndMediumDefaultAnd1LineDefaultAndHoverAndNot && dismiss && (
                  <TagDismiss onClick={handleDismiss} disabled={isDisabled}>
                    <path d={svgPaths.p301c8b00} fill="var(--fill-0, #0F6CBD)" id="Shape" />
                  </TagDismiss>
                )}
              </div>
            )}
            {isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected && avatar && (
              <div className="content-stretch flex h-full items-center pl-[2px] relative shrink-0" data-name="Avatar container">
                {avatar && (
                  <AvatarAvatar additionalClassNames="size-[16px]">
                    <TagFill additionalClassNames="size-[16px]" />
                    <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] leading-[14px] left-1/2 not-italic overflow-hidden text-[#616161] text-[10px] text-center text-ellipsis top-[calc(50%-7px)] w-[16px] whitespace-nowrap">M</p>
                  </AvatarAvatar>
                )}
              </div>
            )}
            {isFilledDefaultAndExtraSmallAnd1LineDefaultAndRestAndNotSelected && (
              <div className="content-stretch flex gap-[2px] h-full items-center max-h-[32px] px-[6px] relative shrink-0" data-name="Content">
                {icon &&
                  (regular12Px || (
                    <Wrapper>
                      <div className="relative shrink-0 size-[8px]" data-name="Shape">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                          <path clipRule="evenodd" d={svgPaths.p18da8d00} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                        </svg>
                      </div>
                    </Wrapper>
                  ))}
                <TagTextSlot primaryString={primaryString} />
                {dismiss && (
                  <button
                    type="button"
                    onClick={handleDismiss}
                    disabled={isDisabled}
                    className="overflow-clip relative shrink-0 size-[12px] cursor-pointer border-0 bg-transparent p-0 hover:opacity-80 active:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Dismiss tag"
                    data-name="Dismiss"
                  >
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                        <path d={svgPaths.p3cfa52f0} fill="var(--fill-0, #424242)" id="Shape" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            )}
            {isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelected && avatar && (
              <div className="content-stretch flex h-full items-center pl-[2px] relative shrink-0" data-name="Avatar container">
                {avatar && (
                  <AvatarAvatar additionalClassNames="size-[20px]">
                    <TagFill additionalClassNames="size-[20px]" />
                    <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] h-[14px] leading-[14px] left-1/2 not-italic overflow-hidden text-[#616161] text-[10px] text-center text-ellipsis top-[calc(50%-7px)] w-[20px] whitespace-nowrap">MB</p>
                  </AvatarAvatar>
                )}
              </div>
            )}
            {isFilledDefaultAndSmallAnd1LineDefaultAndRestAndNotSelected && (
              <div className="content-stretch flex gap-[2px] h-full items-center max-h-[32px] px-[6px] relative shrink-0" data-name="Content">
                {icon &&
                  (regular16Px || (
                    <Wrapper>
                      <div className="relative shrink-0 size-[12px]" data-name="Shape">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                          <path clipRule="evenodd" d={svgPaths.p31a9aa00} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
                        </svg>
                      </div>
                    </Wrapper>
                  ))}
                <TagTextSlot primaryString={primaryString} />
                {dismiss && (
                  <button
                    type="button"
                    onClick={handleDismiss}
                    disabled={isDisabled}
                    className="overflow-clip relative shrink-0 size-[16px] cursor-pointer border-0 bg-transparent p-0 hover:opacity-80 active:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Dismiss tag"
                    data-name="Dismiss"
                  >
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[11px] top-1/2" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                        <path d={svgPaths.pd515600} fill="var(--fill-0, #424242)" id="Shape" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------- Helper Components ----------------------

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
    </div>
  );
}

type TagDismissProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

function TagDismiss({ children, onClick, disabled }: React.PropsWithChildren<TagDismissProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="overflow-clip relative shrink-0 size-[20px] cursor-pointer border-0 bg-transparent p-0 hover:opacity-80 active:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label="Dismiss tag"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          {children}
        </svg>
      </div>
    </button>
  );
}

type AvatarAvatarProps = {
  additionalClassNames?: string;
};

function AvatarAvatar({ children, additionalClassNames = "" }: React.PropsWithChildren<AvatarAvatarProps>) {
  return (
    <div className={clsx("relative rounded-[9999px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center relative size-full">{children}</div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <Wrapper1>{children}</Wrapper1>
    </div>
  );
}

function TagPlaceholder({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <div className="relative shrink-0 size-[16px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          {children}
        </svg>
      </div>
    </Wrapper>
  );
}

type TagTextSlotProps = {
  primaryString: string;
};

function TagTextSlot({ primaryString }: TagTextSlotProps) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">{primaryString}</p>
      </div>
    </div>
  );
}

type TagFillProps = {
  additionalClassNames?: string;
};

function TagFill({ additionalClassNames = "" }: TagFillProps) {
  return (
    <div className={clsx("bg-[#e6e6e6] relative rounded-[9999px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

type TagAvatarContainerProps = {
  avatar: boolean;
};

function TagAvatarContainer({ avatar }: TagAvatarContainerProps) {
  return (
    <div className="content-stretch flex h-full items-center pl-[2px] relative shrink-0">
      {avatar && (
        <AvatarAvatar additionalClassNames="size-[28px]">
          <TagFill additionalClassNames="size-[28px]" />
          <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] leading-[16px] left-1/2 not-italic overflow-hidden text-[#616161] text-[12px] text-center text-ellipsis top-[calc(50%-8px)] w-[28px] whitespace-nowrap">MB</p>
        </AvatarAvatar>
      )}
    </div>
  );
}

type PlaceholderProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Placeholder({ className, size = "12", theme = "Regular" }: PlaceholderProps) {
  const is12AndFilled = size === "12" && theme === "Filled";
  const is12AndRegular = size === "12" && theme === "Regular";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndRegular = size === "24" && theme === "Regular";
  const is28AndRegular = size === "28" && theme === "Regular";
  const is32AndRegular = size === "32" && theme === "Regular";
  const is48AndRegular = size === "48" && theme === "Regular";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is48AndRegular ? "size-[48px]" : is24AndRegular || is20AndRegular || is16AndRegular || is12AndRegular || is12AndFilled ? "" : is32AndRegular ? "size-[32px]" : "size-[28px]"}`}>
      {(is24AndRegular || is20AndRegular || is16AndRegular || is12AndRegular || is12AndFilled) && (
        <Wrapper1>
          <div className={`relative shrink-0 ${is12AndRegular || is12AndFilled ? "size-[8px]" : is16AndRegular ? "size-[12px]" : is20AndRegular ? "size-[16px]" : "size-[20px]"}`} data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is12AndRegular || is12AndFilled ? "0 0 8 8" : is16AndRegular ? "0 0 12 12" : is20AndRegular ? "0 0 16 16" : "0 0 20 20"}>
              <path clipRule="evenodd" d={is12AndRegular || is12AndFilled ? svgPaths.p18da8d00 : is16AndRegular ? svgPaths.p31a9aa00 : is20AndRegular ? svgPaths.pa51a700 : svgPaths.p399cfc00} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </Wrapper1>
      )}
      {(is28AndRegular || is32AndRegular || is48AndRegular) && (
        <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${is48AndRegular ? "size-[40px]" : is32AndRegular ? "size-[26px]" : "size-[22px]"}`} data-name="Shape">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is48AndRegular ? "0 0 40 40" : is32AndRegular ? "0 0 26 26" : "0 0 22 22"}>
            <path clipRule="evenodd" d={is48AndRegular ? svgPaths.p20a13b40 : is32AndRegular ? svgPaths.p14bd3300 : svgPaths.p3a7e7880} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      )}
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface TagProps_Display {
  primaryString?: string;
  secondaryString?: string;
  size?: "Extra small" | "Small" | "Medium (Default)";
  style?: "Filled (Default)" | "Outline" | "Brand";
  selected?: boolean;
  layout?: "1 line (Default)" | "2 line (Medium only)";
  avatar?: boolean;
  icon?: boolean;
  dismiss?: boolean;
  disabled?: boolean;
  regular12Px?: React.ReactNode | null;
  regular16Px?: React.ReactNode | null;
  regular20Px?: React.ReactNode | null;
  filled20Px?: React.ReactNode | null;
}

function Tag_Display({
  primaryString,
  secondaryString,
  size,
  style,
  selected,
  layout,
  avatar,
  icon,
  dismiss,
  disabled,
  regular12Px,
  regular16Px,
  regular20Px,
  filled20Px,
}: TagProps_Display) {
  const [isSelected, setIsSelected] = React.useState(selected || false);
  const [isDismissed, setIsDismissed] = React.useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <Tag
      primaryString={primaryString}
      secondaryString={secondaryString}
      size={size}
      style={style}
      state={disabled ? "Disabled" : "Rest"}
      selected={isSelected}
      layout={layout}
      avatar={avatar}
      icon={icon}
      dismiss={dismiss}
      regular12Px={regular12Px}
      regular16Px={regular16Px}
      regular20Px={regular20Px}
      filled20Px={filled20Px}
      onClick={(e) => {
        if (!disabled) {
          setIsSelected(!isSelected);
        }
      }}
      onDismiss={(e) => {
        if (!disabled) {
          setIsDismissed(true);
        }
      }}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DesignTag
export function DesignTag() {
  return (
    <Tag_Display
      primaryString="Design"
      size="Medium (Default)"
      style="Filled (Default)"
    />
  );
}

// @figmaExample ActiveFilterTag
export function ActiveFilterTag() {
  return (
    <Tag_Display
      primaryString="Active Filter"
      size="Medium (Default)"
      style="Filled (Default)"
      selected={true}
    />
  );
}

// @figmaExample FeaturedBrandTag
export function FeaturedBrandTag() {
  return (
    <Tag_Display
      primaryString="Featured"
      size="Medium (Default)"
      style="Brand"
      icon={true}
      regular20Px={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3l2.5 5.5L18 9l-4.5 4 1 6-4.5-2.5L5.5 19l1-6L2 9l5.5-.5L10 3z" />
        </svg>
      }
    />
  );
}

// @figmaExample UserAvatarTag
export function UserAvatarTag() {
  return (
    <Tag_Display
      primaryString="John Doe"
      size="Small"
      style="Filled (Default)"
      avatar={true}
      dismiss={false}
    />
  );
}

// @figmaExample TwoLineProjectTag
export function TwoLineProjectTag() {
  return (
    <Tag_Display
      primaryString="Project Name"
      secondaryString="Status: Active"
      size="Medium (Default)"
      style="Filled (Default)"
      layout="2 line (Medium only)"
    />
  );
}

// @figmaExample OutlineTag
export function OutlineTag() {
  return (
    <Tag_Display
      primaryString="Outline Tag"
      size="Medium (Default)"
      style="Outline"
    />
  );
}

// @figmaExample CompactIconTag
export function CompactIconTag() {
  return (
    <Tag_Display
      primaryString="Compact"
      size="Extra small"
      style="Filled (Default)"
      icon={true}
      regular12Px={
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <circle cx="6" cy="6" r="2" />
        </svg>
      }
    />
  );
}

// @figmaExample DisabledOutlineTag
export function DisabledOutlineTag() {
  return (
    <Tag_Display
      primaryString="Disabled"
      size="Medium (Default)"
      style="Outline"
      disabled={true}
    />
  );
}