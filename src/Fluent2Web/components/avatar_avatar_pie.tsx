import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-4kmkbk2nlv';
import imgFirstAvatar from 'figma:asset/1ca2b212726726ee9cfb52a97adb35738397e634.png';

/**
 * A composite avatar component that displays multiple user avatars arranged in a circular "pie" layout, divided by white separators.
 * 
 * Appears as a circular container with 2 or 3 avatar sections split vertically. Each avatar section occupies half (for 2 avatars) or a portion (for 3 avatars) of the circle.
 * The first avatar shows an image, while subsequent avatars display initials on a gray background. White divider lines separate the avatar sections.
 * 
 * USAGE NOTES:
 * - Use when you need to represent multiple users in a single compact avatar (e.g., shared documents, group conversations)
 * - The component is fully keyboard accessible when interactive (Enter/Space keys)
 * - Individual avatar hover states show reduced opacity (80%) for visual feedback
 * - The 3-avatar layout only works with size "32 (Default)" and shows a small user icon on the third avatar
 * - First avatar displays the provided image URL or a default image
 * - Second avatar shows initials/label text on a gray circular background
 * - For larger sizes (48+), the default second avatar label is "EW", for smaller sizes it's "E"
 */
export interface AvatarAvatarPieProps {
  layout?: '2 avatars' | '3 avatars'; // Determines how many avatar sections to display (default: "2 avatars")
  size?: '16' | '20' | '24' | '28' | '32 (Default)' | '36' | '40' | '48' | '56' | '64' | '72' | '96' | '120'; // Controls the overall dimensions of the circular container (default: "32 (Default)")
  onClick?: () => void; // Optional click handler for the entire avatar group. When provided, makes the whole component clickable and keyboard accessible
  onAvatarClick?: (index: number) => void; // Optional click handler for individual avatars. Receives the index (0, 1, or 2) of the clicked avatar
  avatarUrls?: string[]; // Array of image URLs for the avatars. Currently only the first URL is used for the first avatar display
  avatarLabels?: string[]; // Array of text labels/initials for the avatars. The second label (index 1) is used for the second avatar's text display
  className?: string; // Optional custom className to override the default styling and sizing
}

// ---------------------- Main Component ----------------------

export function AvatarAvatarPie({ 
  className, 
  layout = '2 avatars', 
  size = '32 (Default)',
  onClick,
  onAvatarClick,
  avatarUrls = [],
  avatarLabels = []
}: AvatarAvatarPieProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const is2AvatarsAnd120 = layout === '2 avatars' && size === '120';
  const is2AvatarsAnd16 = layout === '2 avatars' && size === '16';
  const is2AvatarsAnd20 = layout === '2 avatars' && size === '20';
  const is2AvatarsAnd24 = layout === '2 avatars' && size === '24';
  const is2AvatarsAnd28 = layout === '2 avatars' && size === '28';
  const is2AvatarsAnd32Default = layout === '2 avatars' && size === '32 (Default)';
  const is2AvatarsAnd36 = layout === '2 avatars' && size === '36';
  const is2AvatarsAnd40 = layout === '2 avatars' && size === '40';
  const is2AvatarsAnd48 = layout === '2 avatars' && size === '48';
  const is2AvatarsAnd56 = layout === '2 avatars' && size === '56';
  const is2AvatarsAnd64 = layout === '2 avatars' && size === '64';
  const is2AvatarsAnd72 = layout === '2 avatars' && size === '72';
  const is2AvatarsAnd96 = layout === '2 avatars' && size === '96';
  const is3AvatarsAnd32Default = layout === '3 avatars' && size === '32 (Default)';
  
  const isInteractive = onClick || onAvatarClick;
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  };
  
  const handleAvatarClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAvatarClick) {
      onAvatarClick(index);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
    }
  };
  
  const firstAvatarUrl = avatarUrls[0] || imgFirstAvatar;
  const secondAvatarLabel = avatarLabels[1] || (is2AvatarsAnd48 || is2AvatarsAnd56 || is2AvatarsAnd64 || is2AvatarsAnd72 || is2AvatarsAnd96 || is2AvatarsAnd120 ? 'EW' : 'E');
  
  return (
    <div 
      className={className || `relative rounded-[9999px] ${is2AvatarsAnd120 ? 'size-[120px]' : is2AvatarsAnd96 ? 'size-[96px]' : is2AvatarsAnd72 ? 'size-[72px]' : is2AvatarsAnd64 ? 'size-[64px]' : is2AvatarsAnd56 ? 'size-[56px]' : is2AvatarsAnd48 ? 'size-[48px]' : is2AvatarsAnd40 ? 'size-[40px]' : is2AvatarsAnd36 ? 'size-[36px]' : is2AvatarsAnd28 ? 'size-[28px]' : is2AvatarsAnd24 ? 'size-[24px]' : is2AvatarsAnd20 ? 'max-h-[20px] max-w-[20px] min-h-[20px] min-w-[20px] size-[20px]' : is2AvatarsAnd16 ? 'max-h-[16px] max-w-[16px] min-h-[16px] min-w-[16px]' : 'size-[32px]'} ${isInteractive ? 'cursor-pointer' : ''}`}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Avatar group with ${layout}` : undefined}
    >
      <div className={`flex flex-row items-center size-full ${is2AvatarsAnd16 || is2AvatarsAnd20 ? 'max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit]' : ''}`}>
        <div className={`content-stretch flex items-center overflow-clip relative ${is2AvatarsAnd20 ? 'max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit] size-full' : is2AvatarsAnd16 ? 'max-h-[inherit] max-w-[inherit] min-h-[inherit] min-w-[inherit]' : 'size-full'}`}>
          <div 
            className={`relative rounded-[9999px] shrink-0 ${is2AvatarsAnd120 ? 'size-[120px]' : is2AvatarsAnd96 ? 'w-[96px]' : is2AvatarsAnd72 ? 'size-[72px]' : is2AvatarsAnd64 ? 'size-[64px]' : is2AvatarsAnd56 ? 'size-[56px]' : is2AvatarsAnd48 ? 'size-[48px]' : is2AvatarsAnd40 ? 'size-[40px]' : is2AvatarsAnd36 ? 'size-[36px]' : is2AvatarsAnd28 ? 'size-[28px]' : is2AvatarsAnd24 ? 'size-[24px]' : is2AvatarsAnd20 ? 'size-[20px]' : is2AvatarsAnd16 ? 'size-[16px]' : 'size-[32px]'} ${onAvatarClick ? 'cursor-pointer' : ''} ${hoveredIndex === 0 ? 'opacity-80' : ''}`} 
            data-name="Avatar/Avatar"
            onClick={onAvatarClick ? (e) => handleAvatarClick(0, e) : undefined}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid pointer-events-none ${is2AvatarsAnd64 || is2AvatarsAnd72 || is2AvatarsAnd96 || is2AvatarsAnd120 ? 'border-4 inset-[-4px] rounded-[10003px]' : is2AvatarsAnd56 ? 'border-3 inset-[-3px] rounded-[10002px]' : is2AvatarsAnd36 || is2AvatarsAnd40 || is2AvatarsAnd48 ? 'border-2 inset-[-2px] rounded-[10001px]' : 'border inset-[-1px] rounded-[10000px]'}`} />
            <div className="flex flex-row items-center justify-center size-full">
              <div className={`content-stretch flex items-center justify-center relative ${is2AvatarsAnd96 ? 'w-full' : 'size-full'}`}>
                <div className={`pointer-events-none relative rounded-[9999px] shrink-0 ${is2AvatarsAnd120 ? 'size-[120px]' : is2AvatarsAnd96 ? 'size-[96px]' : is2AvatarsAnd72 ? 'size-[72px]' : is2AvatarsAnd64 ? 'size-[64px]' : is2AvatarsAnd56 ? 'size-[56px]' : is2AvatarsAnd48 ? 'size-[48px]' : is2AvatarsAnd40 ? 'size-[40px]' : is2AvatarsAnd36 ? 'size-[36px]' : is2AvatarsAnd28 ? 'size-[28px]' : is2AvatarsAnd24 ? 'size-[24px]' : is2AvatarsAnd20 ? 'size-[20px]' : is2AvatarsAnd16 ? 'size-[16px]' : 'size-[32px]'}`} data-name="Fill">
                  <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={firstAvatarUrl} />
                  <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px] ${is2AvatarsAnd64 || is2AvatarsAnd72 || is2AvatarsAnd96 || is2AvatarsAnd120 ? 'border-4' : is2AvatarsAnd56 ? 'border-3' : is2AvatarsAnd36 || is2AvatarsAnd40 || is2AvatarsAnd48 ? 'border-2' : 'border'}`} />
                </div>
              </div>
            </div>
          </div>
          <div 
            className={`rounded-[9999px] ${is3AvatarsAnd32Default ? 'absolute right-0 size-[16px] top-0' : is2AvatarsAnd120 ? 'relative shrink-0 size-[120px]' : is2AvatarsAnd96 ? 'relative shrink-0 size-[96px]' : is2AvatarsAnd72 ? 'relative shrink-0 size-[72px]' : is2AvatarsAnd64 ? 'relative shrink-0 size-[64px]' : is2AvatarsAnd56 ? 'relative shrink-0 size-[56px]' : is2AvatarsAnd48 ? 'relative shrink-0 size-[48px]' : is2AvatarsAnd40 ? 'relative shrink-0 size-[40px]' : is2AvatarsAnd36 ? 'relative shrink-0 size-[36px]' : is2AvatarsAnd28 ? 'relative shrink-0 size-[28px]' : is2AvatarsAnd24 ? 'relative shrink-0 size-[24px]' : is2AvatarsAnd20 ? 'relative shrink-0 size-[20px]' : is2AvatarsAnd16 ? 'relative shrink-0 size-[16px]' : 'relative shrink-0 size-[32px]'} ${onAvatarClick ? 'cursor-pointer' : ''} ${hoveredIndex === 1 ? 'opacity-80' : ''}`} 
            data-name="Avatar/Avatar"
            onClick={onAvatarClick ? (e) => handleAvatarClick(1, e) : undefined}
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid pointer-events-none ${is2AvatarsAnd64 || is2AvatarsAnd72 || is2AvatarsAnd96 || is2AvatarsAnd120 ? 'border-4 inset-[-4px] rounded-[10003px]' : is2AvatarsAnd56 ? 'border-3 inset-[-3px] rounded-[10002px]' : is2AvatarsAnd36 || is2AvatarsAnd40 || is2AvatarsAnd48 ? 'border-2 inset-[-2px] rounded-[10001px]' : 'border inset-[-1px] rounded-[10000px]'}`} />
            <AvatarAvatarPieHelper>
              <div className={`bg-[#e6e6e6] relative rounded-[9999px] shrink-0 ${is2AvatarsAnd120 ? 'size-[120px]' : is2AvatarsAnd96 ? 'size-[96px]' : is2AvatarsAnd72 ? 'size-[72px]' : is2AvatarsAnd64 ? 'size-[64px]' : is2AvatarsAnd56 ? 'size-[56px]' : is2AvatarsAnd48 ? 'size-[48px]' : is2AvatarsAnd40 ? 'size-[40px]' : is2AvatarsAnd36 ? 'size-[36px]' : is2AvatarsAnd28 ? 'size-[28px]' : is2AvatarsAnd24 ? 'size-[24px]' : is2AvatarsAnd20 ? 'size-[20px]' : is2AvatarsAnd16 || is3AvatarsAnd32Default ? 'size-[16px]' : 'size-[32px]'}`} data-name="Fill">
                <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px] ${is2AvatarsAnd64 || is2AvatarsAnd72 || is2AvatarsAnd96 || is2AvatarsAnd120 ? 'border-4' : is2AvatarsAnd56 ? 'border-3' : is2AvatarsAnd36 || is2AvatarsAnd40 || is2AvatarsAnd48 ? 'border-2' : 'border'}`} />
              </div>
              <p className={`-translate-x-1/2 absolute font-["Segoe_UI:Semibold",sans-serif] left-1/2 not-italic overflow-hidden text-[#616161] text-center text-ellipsis whitespace-nowrap ${is2AvatarsAnd120 ? 'leading-[32px] text-[24px] top-[calc(50%-16px)] w-[120px]' : is2AvatarsAnd96 ? 'leading-[32px] text-[24px] top-[calc(50%-16px)] w-[96px]' : is2AvatarsAnd72 ? 'leading-[28px] text-[20px] top-[calc(50%-14px)] w-[72px]' : is2AvatarsAnd64 ? 'leading-[28px] text-[20px] top-[calc(50%-14px)] w-[64px]' : is2AvatarsAnd56 ? 'leading-[22px] text-[16px] top-[calc(50%-11px)] w-[56px]' : is2AvatarsAnd48 ? 'leading-[20px] text-[14px] top-[calc(50%-10px)] w-[48px]' : is2AvatarsAnd40 ? 'leading-[20px] text-[14px] top-[calc(50%-10px)] w-[40px]' : is2AvatarsAnd36 ? 'leading-[20px] text-[14px] top-[calc(50%-10px)] w-[36px]' : is2AvatarsAnd28 ? 'leading-[16px] text-[12px] top-[calc(50%-8px)] w-[28px]' : is2AvatarsAnd24 ? 'leading-[14px] text-[10px] top-[calc(50%-7px)] w-[24px]' : is2AvatarsAnd20 ? 'h-[14px] leading-[14px] text-[10px] top-[calc(50%-7px)] w-[20px]' : is2AvatarsAnd16 || is3AvatarsAnd32Default ? 'leading-[14px] text-[10px] top-[calc(50%-7px)] w-[16px]' : 'leading-[20px] text-[14px] top-[calc(50%-10px)] w-[32px]'}`}>{secondAvatarLabel}</p>
            </AvatarAvatarPieHelper>
          </div>
          {(is2AvatarsAnd32Default || is2AvatarsAnd16 || is2AvatarsAnd20 || is2AvatarsAnd24 || is2AvatarsAnd28 || is2AvatarsAnd36 || is2AvatarsAnd40 || is2AvatarsAnd48 || is2AvatarsAnd56 || is2AvatarsAnd64 || is2AvatarsAnd72 || is2AvatarsAnd96 || is2AvatarsAnd120) && <div className="-translate-x-1/2 absolute bg-white bottom-0 left-1/2 top-0 w-[2px]" data-name="Divider" />}
          {is3AvatarsAnd32Default && (
            <>
              <div 
                className={`absolute bottom-0 right-0 rounded-[9999px] size-[16px] ${onAvatarClick ? 'cursor-pointer' : ''} ${hoveredIndex === 2 ? 'opacity-80' : ''}`} 
                data-name="Avatar/Avatar"
                onClick={onAvatarClick ? (e) => handleAvatarClick(2, e) : undefined}
                onMouseEnter={() => setHoveredIndex(2)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
                <AvatarAvatarPieHelper>
                  <div className="bg-[#e6e6e6] relative rounded-[9999px] shrink-0 size-[16px]" data-name="Fill">
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                  </div>
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[12px] top-1/2" data-name="Size=12, Theme=Regular">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-1/2 top-1/2 w-[8px]" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10">
                        <path d={svgPaths.p1d528180} fill="var(--fill-0, #63276D)" id="Shape" />
                      </svg>
                    </div>
                  </div>
                </AvatarAvatarPieHelper>
              </div>
              <div className="absolute bg-white inset-[15px_0_15px_15px]" data-name="Divider" />
              <div className="-translate-x-1/2 absolute bg-white bottom-0 left-1/2 top-0 w-[2px]" data-name="Divider" />
            </>
          )}
        </div>
      </div>
      <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px] ${is2AvatarsAnd64 || is2AvatarsAnd72 || is2AvatarsAnd96 || is2AvatarsAnd120 ? 'border-4' : is2AvatarsAnd56 ? 'border-3' : is2AvatarsAnd36 || is2AvatarsAnd40 || is2AvatarsAnd48 ? 'border-2' : 'border'}`} />
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function AvatarAvatarPieHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface AvatarAvatarPieProps_Display {
  layout?: '2 avatars' | '3 avatars';
  size?: '16' | '20' | '24' | '28' | '32 (Default)' | '36' | '40' | '48' | '56' | '64' | '72' | '96' | '120';
  avatarUrls?: string[];
  avatarLabels?: string[];
}

function AvatarAvatarPie_Display({
  layout,
  size,
  avatarUrls,
  avatarLabels,
}: AvatarAvatarPieProps_Display) {
  return (
    <AvatarAvatarPie
      layout={layout}
      size={size}
      avatarUrls={avatarUrls}
      avatarLabels={avatarLabels}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultAvatarPieWithInitials
export function AvatarPieDefaultSize() {
  return (
    <AvatarAvatarPie_Display
      layout="2 avatars"
      size="32 (Default)"
      avatarUrls={['https://via.placeholder.com/150/4A90E2/FFFFFF?text=User1']}
      avatarLabels={['', 'JD']}
    />
  );
}

// @figmaExample MediumAvatarPieWithCustomInitials
export function AvatarPieMediumSize() {
  return (
    <AvatarAvatarPie_Display
      layout="2 avatars"
      size="48"
      avatarUrls={['https://via.placeholder.com/150/E94E77/FFFFFF?text=User2']}
      avatarLabels={['', 'EW']}
    />
  );
}

// @figmaExample LargeAvatarPieWithTwoUsers
export function AvatarPieLargeSize() {
  return (
    <AvatarAvatarPie_Display
      layout="2 avatars"
      size="72"
      avatarUrls={['https://via.placeholder.com/150/50C878/FFFFFF?text=User3']}
      avatarLabels={['', 'AB']}
    />
  );
}

// @figmaExample ExtraLargeAvatarPie
export function AvatarPieExtraLargeSize() {
  return (
    <AvatarAvatarPie_Display
      layout="2 avatars"
      size="96"
      avatarUrls={['https://via.placeholder.com/150/9370DB/FFFFFF?text=User4']}
      avatarLabels={['', 'TC']}
    />
  );
}

// @figmaExample ThreeAvatarPieLayout
export function AvatarPieThreeAvatars() {
  return (
    <AvatarAvatarPie_Display
      layout="3 avatars"
      size="32 (Default)"
      avatarUrls={['https://via.placeholder.com/150/FF6347/FFFFFF?text=User5']}
      avatarLabels={['', 'MK']}
    />
  );
}

// @figmaExample SmallAvatarPieCompact
export function AvatarPieSmallSize() {
  return (
    <AvatarAvatarPie_Display
      layout="2 avatars"
      size="24"
      avatarUrls={['https://via.placeholder.com/150/20B2AA/FFFFFF?text=User6']}
      avatarLabels={['', 'E']}
    />
  );
}