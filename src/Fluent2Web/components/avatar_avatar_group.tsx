import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-tomowmaieo';
import imgAvatarAvatar from 'figma:asset/1ca2b212726726ee9cfb52a97adb35738397e634.png';

/**
 * Avatar type definition:
 * - type: "image" - Displays a circular profile image (content should be image URL)
 * - type: "icon" - Displays a default person icon on gray background
 * - type: "text" - Displays text initials on gray background (content should be 1-2 characters)
 * - content: URL string for image type, or text string for text type (e.g., "M" or "AB")
 */
export interface Avatar {
  type: "image" | "icon" | "text";
  content?: string;
}

/**
 * A group display component for showing multiple user avatars in a horizontal arrangement.
 * Appears as a row of small (16px) circular avatars that can either be spread out with spacing or stacked with overlapping edges.
 * 
 * Use this component when you need to show multiple users or participants in a compact space,
 * such as in collaboration features, group chats, or document sharing interfaces.
 * 
 * - Avatars are 16px circular elements that maintain consistent sizing
 * - In "Stack" layout, avatars overlap by 4px creating a cascading effect
 * - In "Spread" layout, avatars are separated by 12px gaps
 * - Interactive avatars scale to 110% on hover and gain a higher z-index
 * - Keyboard accessible with Enter/Space key support when onClick handler is provided
 */
export interface AvatarAvatarGroupProps {
  className?: string; // Custom CSS class for the root container (default: "relative")
  layout?: "Spread" | "Stack"; // Layout mode for avatar arrangement - "Spread" (default): Avatars separated by 12px gaps, "Stack": Avatars overlap by 4px
  avatars?: Avatar[]; // Array of avatar configurations. If not provided, displays 5 default avatars
  onAvatarClick?: (index: number) => void; // Callback fired when an avatar is clicked. The index parameter indicates which avatar was clicked (0-based)
  onAvatarHover?: (index: number | null) => void; // Callback fired when hovering over avatars. Receives the avatar index on mouse enter, or null on mouse leave
}

// ---------------------- Main Component ----------------------

export function AvatarAvatarGroup({ 
  className, 
  layout = "Spread",
  avatars,
  onAvatarClick,
  onAvatarHover
}: AvatarAvatarGroupProps) {
  const isStack = layout === "Stack";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Default avatars if none provided
  const defaultAvatars: Avatar[] = [
    { type: "image", content: imgAvatarAvatar },
    { type: "icon" },
    { type: "text", content: "M" },
    { type: "text", content: "M" },
    { type: "text", content: "M" },
  ];
  
  const displayAvatars = avatars || defaultAvatars;
  
  const handleAvatarClick = (index: number) => {
    if (onAvatarClick) {
      onAvatarClick(index);
    }
  };
  
  const handleAvatarMouseEnter = (index: number) => {
    setHoveredIndex(index);
    if (onAvatarHover) {
      onAvatarHover(index);
    }
  };
  
  const handleAvatarMouseLeave = () => {
    setHoveredIndex(null);
    if (onAvatarHover) {
      onAvatarHover(null);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAvatarClick(index);
    }
  };
  
  const renderAvatar = (avatar: Avatar, index: number) => {
    const isClickable = !!onAvatarClick;
    const isHovered = hoveredIndex === index;
    
    let content;
    if (avatar.type === "image") {
      content = (
        <Wrapper>
          <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[16px]" data-name="Fill">
            <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={avatar.content || imgAvatarAvatar} />
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px]" />
          </div>
        </Wrapper>
      );
    } else if (avatar.type === "icon") {
      content = (
        <Wrapper>
          <AvatarAvatarGroupFill />
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[12px] top-1/2" data-name="Size=12, Theme=Regular">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-1/2 top-1/2 w-[8px]" data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10">
                <path d={svgPaths.p1d528180} fill="var(--fill-0, #242424)" id="Shape" />
              </svg>
            </div>
          </div>
        </Wrapper>
      );
    } else {
      content = <Text text={avatar.content || "M"} />;
    }
    
    return (
      <div 
        key={index}
        className={`relative rounded-[9999px] shrink-0 size-[16px] ${isStack ? "mr-[-4px]" : ""} ${isClickable ? "cursor-pointer" : ""} ${isHovered ? "z-10 scale-110" : ""} transition-transform duration-150`} 
        data-name="Avatar/Avatar"
        onClick={() => handleAvatarClick(index)}
        onMouseEnter={() => handleAvatarMouseEnter(index)}
        onMouseLeave={handleAvatarMouseLeave}
        onKeyDown={(e) => handleKeyDown(e, index)}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={`Avatar ${index + 1}`}
      >
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
        {content}
      </div>
    );
  };
  
  return (
    <div className={className || "relative"}>
      <div className="flex flex-row items-center size-full">
        <div className={`content-stretch flex items-center relative ${isStack ? "pr-[4px]" : "gap-[12px]"}`}>
          {displayAvatars.map((avatar, index) => renderAvatar(avatar, index))}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

type TextProps = {
  text: string;
};

export function Text({ text }: TextProps) {
  return (
    <Wrapper>
      <AvatarAvatarGroupFill />
      <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] leading-[14px] left-1/2 not-italic overflow-hidden text-[#616161] text-[10px] text-center text-ellipsis top-[calc(50%-7px)] w-[16px] whitespace-nowrap">{text}</p>
    </Wrapper>
  );
}

export function AvatarAvatarGroupFill() {
  return (
    <div className="bg-[#e6e6e6] relative rounded-[9999px] shrink-0 size-[16px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface AvatarAvatarGroupProps_Display {
  layout?: "Spread" | "Stack";
  avatars?: Avatar[];
}

function AvatarAvatarGroup_Display({
  layout,
  avatars,
}: AvatarAvatarGroupProps_Display) {
  return (
    <AvatarAvatarGroup
      layout={layout}
      avatars={avatars}
      onAvatarClick={(index) => {
        console.log(`Avatar ${index} clicked`);
      }}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SpreadImageAvatars
export function SpreadImageAvatars() {
  return (
    <AvatarAvatarGroup_Display
      layout="Spread"
      avatars={[
        { type: "image", content: "https://i.pravatar.cc/150?img=1" },
        { type: "image", content: "https://i.pravatar.cc/150?img=2" },
        { type: "image", content: "https://i.pravatar.cc/150?img=3" },
        { type: "image", content: "https://i.pravatar.cc/150?img=4" }
      ]}
    />
  );
}

// @figmaExample StackedImageAvatars
export function StackedImageAvatars() {
  return (
    <AvatarAvatarGroup_Display
      layout="Stack"
      avatars={[
        { type: "image", content: "https://i.pravatar.cc/150?img=5" },
        { type: "image", content: "https://i.pravatar.cc/150?img=6" },
        { type: "image", content: "https://i.pravatar.cc/150?img=7" },
        { type: "image", content: "https://i.pravatar.cc/150?img=8" },
        { type: "image", content: "https://i.pravatar.cc/150?img=9" }
      ]}
    />
  );
}

// @figmaExample SpreadMixedAvatars
export function SpreadMixedAvatars() {
  return (
    <AvatarAvatarGroup_Display
      layout="Spread"
      avatars={[
        { type: "text", content: "AB" },
        { type: "text", content: "CD" },
        { type: "icon" },
        { type: "text", content: "EF" }
      ]}
    />
  );
}

// @figmaExample StackedMixedAvatars
export function StackedMixedAvatars() {
  return (
    <AvatarAvatarGroup_Display
      layout="Stack"
      avatars={[
        { type: "image", content: "https://i.pravatar.cc/150?img=10" },
        { type: "text", content: "MK" },
        { type: "icon" },
        { type: "text", content: "JD" },
        { type: "image", content: "https://i.pravatar.cc/150?img=11" }
      ]}
    />
  );
}

// @figmaExample SpreadIconAvatars
export function SpreadIconAvatars() {
  return (
    <AvatarAvatarGroup_Display
      layout="Spread"
      avatars={[
        { type: "icon" },
        { type: "icon" },
        { type: "icon" }
      ]}
    />
  );
}

// @figmaExample StackedTextAvatars
export function StackedTextAvatars() {
  return (
    <AvatarAvatarGroup_Display
      layout="Stack"
      avatars={[
        { type: "text", content: "A" },
        { type: "text", content: "B" },
        { type: "text", content: "C" },
        { type: "text", content: "D" },
        { type: "text", content: "E" },
        { type: "text", content: "F" }
      ]}
    />
  );
}