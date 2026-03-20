import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-9fxeadcy3f';

/**
 * A clickable text link component with multiple style variants and interactive states (hover, focus, pressed, disabled).
 * Appears as inline text with an optional external link icon to the right. The link automatically handles visual feedback
 * for user interactions with different colors and optional underlines. Default height is 21px with 14px Segoe UI font.
 * 
 * Use this component for navigation links, external references, or any clickable text that needs to follow Microsoft Fluent
 * design patterns. The component handles all accessibility and interaction states automatically.
 */
export interface LinkProps {
  className?: string; // Custom CSS classes to override default styling
  inlineStyle?: boolean; // When true, adds an underline beneath the link text (default: false)
  showIcon?: boolean; // When true, displays an external link icon to the right of the text (default: true)
  disabled?: boolean; // When true, disables the link and shows disabled styling (default: false)
  style?: 'Default' | 'Subtle' | 'Inverted' | 'OnBrand'; // Visual style variant (default: "Default"). "Default": Blue link (#115EA3) for standard use cases. "Subtle": Gray link (#424242) for less prominent links. "Inverted": White link for use on dark backgrounds. "OnBrand": White link for use on brand-colored backgrounds.
  text?: string; // The link text to display (default: "Link")
  href?: string; // The URL to navigate to when clicked
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; // Click handler callback
  target?: string; // Standard anchor target attribute (e.g., "_blank" for new window)
  rel?: string; // Standard anchor rel attribute (e.g., "noopener noreferrer" for external links)
}

// ---------------------- Main Component ----------------------

export function Link({ 
  className, 
  inlineStyle = false, 
  showIcon = true, 
  disabled = false,
  style = "Default", 
  text = "Link",
  href,
  onClick,
  target,
  rel
}: LinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Determine the current state based on interactions
  const state = disabled 
    ? "Disabled" 
    : isPressed 
    ? "Pressed" 
    : isHovered 
    ? "Hover" 
    : isFocused 
    ? "Focused" 
    : "Rest/Visited";

  const isDefaultAndDisabled = style === "Default" && state === "Disabled";
  const isDefaultAndFocused = style === "Default" && state === "Focused";
  const isDefaultAndHover = style === "Default" && state === "Hover";
  const isDefaultAndPressed = style === "Default" && state === "Pressed";
  const isDefaultAndRestVisited = style === "Default" && state === "Rest/Visited";
  const isInvertedAndRestVisited = style === "Inverted" && state === "Rest/Visited";
  const isOnBrandAndRestVisited = style === "OnBrand" && state === "Rest/Visited";
  const isSubtleAndRestVisited = style === "Subtle" && state === "Rest/Visited";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsPressed(false);
  };

  return (
    <a
      href={disabled ? undefined : href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      target={target}
      rel={rel}
      aria-disabled={disabled}
      className={className || "h-[21px] relative"}
      style={{ cursor: disabled ? "default" : "pointer", textDecoration: "none" }}
    >
      <div className="content-stretch flex gap-[4px] h-full items-start relative">
        <div className="content-stretch flex flex-col items-start pb-[2px] relative shrink-0" data-name="Text">
          {(isDefaultAndRestVisited || isDefaultAndFocused) && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#115ea3] text-[14px]">{text}</p>}
          {(isOnBrandAndRestVisited || isInvertedAndRestVisited) && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white">{text}</p>}
          {(isOnBrandAndRestVisited || isInvertedAndRestVisited) && inlineStyle && (
            <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
              <div aria-hidden="true" className="absolute border-solid border-t border-white inset-0 pointer-events-none" />
            </div>
          )}
          {isDefaultAndRestVisited && inlineStyle && (
            <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
              <div aria-hidden="true" className="absolute border-[#115ea3] border-solid border-t inset-0 pointer-events-none" />
            </div>
          )}
          {isDefaultAndHover && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f548c] text-[14px]">{text}</p>}
          {(isDefaultAndHover || isDefaultAndFocused) && (
            <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
              <div aria-hidden="true" className={`absolute border-solid border-t inset-0 pointer-events-none ${isDefaultAndFocused ? "border-b border-black" : "border-[#0f548c]"}`} />
            </div>
          )}
          {isDefaultAndPressed && (
            <>
              <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c3b5e] text-[14px]">{text}</p>
              <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
                <div aria-hidden="true" className="absolute border-[#0c3b5e] border-solid border-t inset-0 pointer-events-none" />
              </div>
            </>
          )}
          {isDefaultAndDisabled && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#bdbdbd] text-[14px]">{text}</p>}
          {isDefaultAndDisabled && inlineStyle && (
            <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
              <div aria-hidden="true" className="absolute border-[#bdbdbd] border-solid border-t inset-0 pointer-events-none" />
            </div>
          )}
          {isSubtleAndRestVisited && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#424242] text-[14px]">{text}</p>}
          {isSubtleAndRestVisited && inlineStyle && (
            <div className="h-[3px] mb-[-2px] relative shrink-0 w-full" data-name="Underlines">
              <div aria-hidden="true" className="absolute border-[#424242] border-solid border-t inset-0 pointer-events-none" />
            </div>
          )}
        </div>
        {(isDefaultAndRestVisited || isDefaultAndFocused) && showIcon && (
          <LinkOpen>
            <path d={svgPaths.p20d37200} fill="var(--fill-0, #115EA3)" id="Shape" />
          </LinkOpen>
        )}
        {(isOnBrandAndRestVisited || isInvertedAndRestVisited) && showIcon && (
          <LinkOpen>
            <path d={svgPaths.p20d37200} fill="var(--fill-0, white)" id="Shape" />
          </LinkOpen>
        )}
        {isDefaultAndHover && showIcon && (
          <LinkOpen>
            <path d={svgPaths.p20d37200} fill="var(--fill-0, #0F548C)" id="Shape" />
          </LinkOpen>
        )}
        {isDefaultAndPressed && showIcon && (
          <LinkOpen>
            <path d={svgPaths.p20d37200} fill="var(--fill-0, #0C3B5E)" id="Shape" />
          </LinkOpen>
        )}
        {isDefaultAndDisabled && showIcon && (
          <LinkOpen>
            <path d={svgPaths.p20d37200} fill="var(--fill-0, #BDBDBD)" id="Shape" />
          </LinkOpen>
        )}
        {isSubtleAndRestVisited && showIcon && (
          <LinkOpen>
            <path d={svgPaths.p20d37200} fill="var(--fill-0, #424242)" id="Shape" />
          </LinkOpen>
        )}
      </div>
    </a>
  );
}

// ---------------------- Helper Components ----------------------

export function LinkOpen({ children }: React.PropsWithChildren<{}>) {
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

// ---------------------- Display Component ----------------------

interface LinkProps_Display {
  inlineStyle?: boolean;
  showIcon?: boolean;
  disabled?: boolean;
  style?: 'Default' | 'Subtle' | 'Inverted' | 'OnBrand';
  text?: string;
  href?: string;
  target?: string;
  rel?: string;
}

function Link_Display({
  inlineStyle,
  showIcon,
  disabled,
  style,
  text,
  href,
  target,
  rel,
}: LinkProps_Display) {
  return (
    <Link
      inlineStyle={inlineStyle}
      showIcon={showIcon}
      disabled={disabled}
      style={style}
      text={text}
      href={href}
      target={target}
      rel={rel}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultLinkWithIcon
export function DefaultLinkWithIcon() {
  return (
    <Link_Display
      text="Default Link"
      href="https://example.com"
      style="Default"
      showIcon={true}
    />
  );
}

// @figmaExample SubtleLinkWithIcon
export function SubtleLinkWithIcon() {
  return (
    <Link_Display
      text="Subtle Link"
      href="https://example.com"
      style="Subtle"
      showIcon={true}
    />
  );
}

// @figmaExample InvertedLinkWithIcon
export function InvertedLinkWithIcon() {
  return (
    <Link_Display
      text="Inverted Link"
      href="https://example.com"
      style="Inverted"
      showIcon={true}
    />
  );
}

// @figmaExample OnBrandLinkWithIcon
export function OnBrandLinkWithIcon() {
  return (
    <Link_Display
      text="OnBrand Link"
      href="https://example.com"
      style="OnBrand"
      showIcon={true}
    />
  );
}

// @figmaExample LinkWithoutIcon
export function LinkWithoutIcon() {
  return (
    <Link_Display
      text="Link Without Icon"
      href="/about"
      style="Default"
      showIcon={false}
    />
  );
}

// @figmaExample InlineStyledLink
export function InlineStyledLink() {
  return (
    <Link_Display
      text="Inline Styled Link"
      href="/learn-more"
      style="Default"
      inlineStyle={true}
      showIcon={false}
    />
  );
}

// @figmaExample DisabledLink
export function DisabledLink() {
  return (
    <Link_Display
      text="Disabled Link"
      href="https://example.com"
      style="Default"
      disabled={true}
      showIcon={true}
    />
  );
}

// @figmaExample ExternalDocumentationLink
export function ExternalDocumentationLink() {
  return (
    <Link_Display
      text="External Documentation"
      href="https://docs.example.com"
      style="Default"
      showIcon={true}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
}