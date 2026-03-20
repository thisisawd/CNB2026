import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-5t2i1p0z70';
import imgAvatarAvatar from 'figma:asset/1ca2b212726726ee9cfb52a97adb35738397e634.png';

/**
 * A Microsoft Fluent UI-style component for displaying user information with an avatar or presence badge alongside text content.
 * Appears as a horizontal or vertical layout combining a circular avatar (16px or 40px) or presence badge with one to four lines of text.
 * 
 * IMPORTANT NOTES:
 * - Uses a hardcoded avatar image - this is a design component, not a dynamic user avatar
 * - When onClick is provided, the component becomes fully interactive with keyboard navigation (Enter/Space), hover states, and focus rings
 * - Text content is conditionally rendered based on boolean flags (subtext, tertiaryText, quaternaryText)
 * - Interactive mode automatically adds accessibility features (role="button", tabIndex, aria-label)
 */
export interface PersonaProps {
  className?: string; // Custom CSS class for the outer container element
  
  alignment?: "Center (Default)" | "Top"; // Vertical alignment - "Center (Default)": centers avatar with text, "Top": aligns avatar to top (default: "Center (Default)")
  
  layout?: "Text after (Default)" | "Text before (Avatar only)" | "Text below (Avatar only)"; // Layout direction - affects flex direction and spacing (default: "Text after (Default)")
  
  size?: "Small (Badge only)" | "Medium (Default)" | "Large"; // Component size - affects avatar size and text sizing (default: "Medium (Default)")
  
  style?: "Avatar (Default)" | "Presence badge"; // Display style - "Avatar (Default)": circular avatar, "Presence badge": green presence dot (default: "Avatar (Default)")
  
  primaryString?: string; // Main text displayed, typically the user's name (default: "Primary string")
  
  secondaryString?: string; // Secondary text line, typically job title or status (default: "Secondary string")
  
  subtext?: boolean; // Controls visibility of the secondaryString line (default: true)
  
  tertiaryString?: string; // Third text line, requires subtext to be true (default: "Tertiary string")
  
  tertiaryText?: boolean; // Controls visibility of the tertiaryString line (default: false)
  
  quaternaryString?: string; // Fourth text line, requires subtext to be true (default: "Quaternary string")
  
  quaternaryText?: boolean; // Controls visibility of the quaternaryString line (default: false)
  
  onClick?: () => void; // Click handler that makes the component interactive with hover effects, focus rings, and keyboard support
  
  onKeyDown?: (e: React.KeyboardEvent) => void; // Keyboard event handler for custom key handling
}

// ---------------------- Main Component ----------------------

export function Persona({ className, alignment = "Center (Default)", layout = "Text after (Default)", primaryString = "Primary string", quaternaryString = "Quaternary string", quaternaryText = false, secondaryString = "Secondary string", size = "Medium (Default)", style = "Avatar (Default)", subtext = true, tertiaryString = "Tertiary string", tertiaryText = false, onClick, onKeyDown }: PersonaProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isInteractive = Boolean(onClick);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
    
    // Handle Enter and Space keys for accessibility
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };
  
  const isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault = layout === "Text after (Default)" && style === "Avatar (Default)" && size === "Large" && alignment === "Center (Default)";
  const isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndCenter = layout === "Text after (Default)" && style === "Avatar (Default)" && size === "Medium (Default)" && alignment === "Center (Default)";
  const isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndTop = layout === "Text after (Default)" && style === "Avatar (Default)" && size === "Medium (Default)" && alignment === "Top";
  const isTextAfterDefaultAndPresenceBadgeAndMediumDefaultAndCenter = layout === "Text after (Default)" && style === "Presence badge" && size === "Medium (Default)" && alignment === "Center (Default)";
  const isTextAfterDefaultAndPresenceBadgeAndSmallBadgeOnlyAndCenter = layout === "Text after (Default)" && style === "Presence badge" && size === "Small (Badge only)" && alignment === "Center (Default)";
  const isTextBeforeAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter = layout === "Text before (Avatar only)" && style === "Avatar (Default)" && size === "Medium (Default)" && alignment === "Center (Default)";
  const isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter = layout === "Text below (Avatar only)" && style === "Avatar (Default)" && size === "Medium (Default)" && alignment === "Center (Default)";
  
  const containerProps = isInteractive ? {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    role: 'button',
    tabIndex: 0,
    'aria-label': primaryString,
    style: { cursor: 'pointer' }
  } : {};
  
  const interactiveClasses = isInteractive ? clsx(
    'transition-all duration-150',
    (isHovered || isFocused) && 'bg-gray-50',
    isFocused && 'ring-2 ring-blue-500 ring-offset-2 outline-none',
    'rounded-md'
  ) : '';
  
  return (
    <div className={className || "relative"} {...containerProps}>
      <div className={clsx(
        `flex ${isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter ? "flex-col items-center size-full" : isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndTop ? "content-stretch gap-[8px] items-start relative" : "flex-row items-center size-full"}`,
        interactiveClasses
      )}>
        {(isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndCenter || isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault || isTextBeforeAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter || isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter || isTextAfterDefaultAndPresenceBadgeAndMediumDefaultAndCenter || isTextAfterDefaultAndPresenceBadgeAndSmallBadgeOnlyAndCenter) && (
          <div className={`content-stretch flex items-center relative ${isTextAfterDefaultAndPresenceBadgeAndSmallBadgeOnlyAndCenter ? "gap-[6px]" : isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter ? "flex-col gap-[8px]" : isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault ? "gap-[10px]" : "gap-[8px]"}`}>
            {(isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndCenter || isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault || isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter) && (
              <div className={`relative rounded-[9999px] shrink-0 ${isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault ? "size-[40px]" : "size-[16px]"}`} data-name="Avatar/Avatar">
                <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid pointer-events-none ${isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault ? "border-2 inset-[-2px] rounded-[10001px]" : "border inset-[-1px] rounded-[10000px]"}`} />
                <Wrapper>
                  <div className={`pointer-events-none relative rounded-[9999px] shrink-0 ${isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault ? "size-[40px]" : "size-[16px]"}`} data-name="Fill">
                    <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgAvatarAvatar} />
                    <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px] ${isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault ? "border-2" : "border"}`} />
                  </div>
                </Wrapper>
              </div>
            )}
            {(isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndCenter || isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault || isTextBeforeAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter || isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter) && (
              <div className={`content-stretch flex flex-col leading-[0] not-italic pb-[4px] pt-[2px] relative shrink-0 ${isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter ? "font-['Segoe_UI:Regular',sans-serif] items-center text-center" : isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault ? "items-start" : "font-['Segoe_UI:Regular',sans-serif] items-start"}`} data-name="Content">
                {(isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndCenter || isTextBeforeAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter || isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter) && (
                  <div className="flex flex-col justify-center mb-[-2px] relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                    <p className="leading-[20px]">{primaryString}</p>
                  </div>
                )}
                {(isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndCenter || isTextBeforeAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter) && subtext && <PersonaSubtext additionalClassNames="items-start" secondaryString={secondaryString} tertiaryText={tertiaryText} tertiaryString={tertiaryString} quaternaryText={quaternaryText} quaternaryString={quaternaryString} />}
                {isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault && (
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center mb-[-2px] relative shrink-0 text-[#242424] text-[16px] whitespace-nowrap">
                    <p className="leading-[22px]">{primaryString}</p>
                  </div>
                )}
                {isTextAfterDefaultAndAvatarDefaultAndLargeAndCenterDefault && subtext && (
                  <div className="content-stretch flex flex-col font-['Segoe_UI:Regular',sans-serif] items-start mb-[-2px] relative shrink-0 text-[#424242] text-[14px]" data-name="Subtext">
                    <div className="flex flex-col justify-center relative shrink-0 w-full">
                      <p className="leading-[20px] whitespace-pre-wrap">{secondaryString}</p>
                    </div>
                    {tertiaryText && (
                      <div className="flex flex-col justify-center relative shrink-0 w-full">
                        <p className="leading-[20px] whitespace-pre-wrap">{tertiaryString}</p>
                      </div>
                    )}
                    {quaternaryText && (
                      <div className="flex flex-col justify-center relative shrink-0 w-full">
                        <p className="leading-[20px] whitespace-pre-wrap">{quaternaryString}</p>
                      </div>
                    )}
                  </div>
                )}
                {isTextBelowAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter && subtext && <PersonaSubtext additionalClassNames="items-center" secondaryString={secondaryString} tertiaryText={tertiaryText} tertiaryString={tertiaryString} quaternaryText={quaternaryText} quaternaryString={quaternaryString} />}
              </div>
            )}
            {(isTextAfterDefaultAndPresenceBadgeAndMediumDefaultAndCenter || isTextAfterDefaultAndPresenceBadgeAndSmallBadgeOnlyAndCenter) && (
              <div className="bg-white relative rounded-[9999px] shrink-0" data-name="Presence Badge">
                <div aria-hidden="true" className={`absolute border-solid border-white pointer-events-none ${isTextAfterDefaultAndPresenceBadgeAndSmallBadgeOnlyAndCenter ? "border inset-[-1px] rounded-[10000px]" : "border-2 inset-[-2px] rounded-[10001px]"}`} />
                <div className="content-stretch flex items-start relative">
                  {isTextAfterDefaultAndPresenceBadgeAndMediumDefaultAndCenter && (
                    <div className="relative shrink-0 size-[12px]" data-name="Presence">
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                          <path d={svgPaths.p292f0a00} fill="var(--fill-0, #13A10E)" id="Shape" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {isTextAfterDefaultAndPresenceBadgeAndSmallBadgeOnlyAndCenter && (
                    <div className="relative shrink-0 size-[6px]" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                        <path d={svgPaths.p237e6900} fill="var(--fill-0, #13A10E)" id="Shape" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}
            {isTextBeforeAvatarOnlyAndAvatarDefaultAndMediumDefaultAndCenter && <PersonaAvatarAvatarImage />}
            {isTextAfterDefaultAndPresenceBadgeAndMediumDefaultAndCenter && <Content primaryString={primaryString} subtext={subtext} secondaryString={secondaryString} tertiaryText={tertiaryText} tertiaryString={tertiaryString} quaternaryText={quaternaryText} quaternaryString={quaternaryString} />}
            {isTextAfterDefaultAndPresenceBadgeAndSmallBadgeOnlyAndCenter && (
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] w-[74px]">
                <p className="leading-[16px] whitespace-pre-wrap">{primaryString}</p>
              </div>
            )}
          </div>
        )}
        {isTextAfterDefaultAndAvatarDefaultAndMediumDefaultAndTop && (
          <>
            <PersonaAvatarAvatarImage />
            <Content primaryString={primaryString} subtext={subtext} secondaryString={secondaryString} tertiaryText={tertiaryText} tertiaryString={tertiaryString} quaternaryText={quaternaryText} quaternaryString={quaternaryString} />
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

type ContentProps = {
  primaryString: string;
  subtext: boolean;
  secondaryString: string;
  tertiaryText: boolean;
  tertiaryString: string;
  quaternaryText: boolean;
  quaternaryString: string;
  additionalClassNames?: string;
};

function Content({ primaryString, subtext, secondaryString, tertiaryText, tertiaryString, quaternaryText, quaternaryString, additionalClassNames = "" }: ContentProps) {
  return (
    <div className="content-stretch flex flex-col font-['Segoe_UI:Regular',sans-serif] items-start leading-[0] not-italic pb-[4px] pt-[2px] relative shrink-0">
      <div className="flex flex-col justify-center mb-[-2px] relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{primaryString}</p>
      </div>
      {subtext && <PersonaSubtext additionalClassNames="items-start" secondaryString={secondaryString} tertiaryText={tertiaryText} tertiaryString={tertiaryString} quaternaryText={quaternaryText} quaternaryString={quaternaryString} />}
    </div>
  );
}

function PersonaAvatarAvatarImage() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[16px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
      <Wrapper>
        <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[16px]" data-name="Fill">
          <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgAvatarAvatar} />
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px]" />
        </div>
      </Wrapper>
    </div>
  );
}

type PersonaSubtextProps = {
  secondaryString: string;
  tertiaryText: boolean;
  tertiaryString: string;
  quaternaryText: boolean;
  quaternaryString: string;
  additionalClassNames?: string;
};

function PersonaSubtext({ secondaryString, tertiaryText, tertiaryString, quaternaryText, quaternaryString, additionalClassNames = "" }: PersonaSubtextProps) {
  return (
    <div className={clsx("content-stretch flex flex-col mb-[-2px] relative shrink-0 text-[#424242] text-[12px]", additionalClassNames)}>
      <div className="flex flex-col justify-center relative shrink-0 w-full">
        <p className="leading-[16px] whitespace-pre-wrap">{secondaryString}</p>
      </div>
      {tertiaryText && (
        <div className="flex flex-col justify-center relative shrink-0 w-full">
          <p className="leading-[16px] whitespace-pre-wrap">{tertiaryString}</p>
        </div>
      )}
      {quaternaryText && (
        <div className="flex flex-col justify-center relative shrink-0 w-full">
          <p className="leading-[16px] whitespace-pre-wrap">{quaternaryString}</p>
        </div>
      )}
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface PersonaProps_Display {
  alignment?: "Center (Default)" | "Top";
  layout?: "Text after (Default)" | "Text before (Avatar only)" | "Text below (Avatar only)";
  size?: "Small (Badge only)" | "Medium (Default)" | "Large";
  style?: "Avatar (Default)" | "Presence badge";
  primaryString?: string;
  secondaryString?: string;
  subtext?: boolean;
  tertiaryString?: string;
  tertiaryText?: boolean;
  quaternaryString?: string;
  quaternaryText?: boolean;
}

function Persona_Display({
  alignment,
  layout,
  size,
  style,
  primaryString,
  secondaryString,
  subtext,
  tertiaryString,
  tertiaryText,
  quaternaryString,
  quaternaryText,
}: PersonaProps_Display) {
  return (
    <Persona
      alignment={alignment}
      layout={layout}
      size={size}
      style={style}
      primaryString={primaryString}
      secondaryString={secondaryString}
      subtext={subtext}
      tertiaryString={tertiaryString}
      tertiaryText={tertiaryText}
      quaternaryString={quaternaryString}
      quaternaryText={quaternaryText}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample BasicPersonaCard
export function BasicPersonaCard() {
  return (
    <Persona_Display
      size="Medium (Default)"
      style="Avatar (Default)"
      primaryString="Sarah Johnson"
      subtext={false}
    />
  );
}

// @figmaExample LargePersonaWithDepartment
export function LargePersonaWithDepartment() {
  return (
    <Persona_Display
      size="Large"
      style="Avatar (Default)"
      primaryString="John Smith"
      secondaryString="Software Engineer"
      subtext={true}
      tertiaryText={true}
      tertiaryString="Engineering Department"
    />
  );
}

// @figmaExample PersonaWithPresenceBadge
export function PersonaWithPresenceBadge() {
  return (
    <Persona_Display
      size="Medium (Default)"
      style="Presence badge"
      primaryString="Michael Brown"
      secondaryString="Available"
      subtext={true}
    />
  );
}

// @figmaExample SmallPresenceBadge
export function SmallPresenceBadge() {
  return (
    <Persona_Display
      size="Small (Badge only)"
      style="Presence badge"
      primaryString="Emily Chen"
      secondaryString="Online"
      subtext={true}
    />
  );
}

// @figmaExample PersonaTextBelow
export function PersonaTextBelow() {
  return (
    <Persona_Display
      size="Medium (Default)"
      layout="Text below (Avatar only)"
      primaryString="Alex Taylor"
      secondaryString="Designer"
      subtext={true}
    />
  );
}

// @figmaExample PersonaTextBefore
export function PersonaTextBefore() {
  return (
    <Persona_Display
      size="Medium (Default)"
      layout="Text before (Avatar only)"
      primaryString="Jordan Lee"
      secondaryString="Product Manager"
      subtext={true}
    />
  );
}

// @figmaExample DetailedPersonaTopAligned
export function DetailedPersonaTopAligned() {
  return (
    <Persona_Display
      size="Large"
      alignment="Top"
      primaryString="Morgan Davis"
      secondaryString="Senior Developer"
      subtext={true}
      tertiaryText={true}
      tertiaryString="Platform Team"
      quaternaryText={true}
      quaternaryString="San Francisco, CA"
    />
  );
}

// @figmaExample PersonaWithTeamInfo
export function PersonaWithTeamInfo() {
  return (
    <Persona_Display
      size="Medium (Default)"
      style="Avatar (Default)"
      primaryString="Casey Williams"
      secondaryString="UX Researcher"
      subtext={true}
      tertiaryText={true}
      tertiaryString="Design Team"
    />
  );
}