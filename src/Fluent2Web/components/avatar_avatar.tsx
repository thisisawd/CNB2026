import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-j0v4851kdn';
import imgFill from 'figma:asset/1ca2b212726726ee9cfb52a97adb35738397e634.png';

/**
 * A circular avatar component that displays a user's profile image, icon, or initials with optional status indicators.
 * Appears as a circular element with configurable size from 16px to 120px. Can display an activity ring (blue border), badge icon (bottom-right corner), and/or presence badge (green status indicator in bottom-right corner). Supports hover effects when clickable with smooth opacity transition.
 * 
 * Use this component to represent users in your application. Choose 'Image' type for profile pictures, 'Icon' type for placeholder icons, or 'Initials' type to display user initials. Add presence badges to show online/availability status, badge icons for special indicators (like calendar events), and activity rings to highlight active or selected users.
 */
export interface AvatarAvatarProps {
  className?: string; // Custom CSS classes to override default positioning and sizing
  activityRing?: boolean; // Shows a blue circular border around the avatar to indicate activity or selection. Significantly changes appearance. (default: false)
  badgeIcon?: boolean; // Displays a small icon badge in the bottom-right corner of the avatar. Changes layout by adding an overlapping element. (default: false)
  initialsString1Max?: string; // Text to display when type is "Initials". Should be 1-2 characters maximum. (default: "M")
  presenceBadge?: boolean; // Shows a green circular presence indicator in the bottom-right corner. Changes layout by adding an overlapping element. (default: false)
  prop12PxRegular?: React.ReactNode | null; // Custom icon element for 16px avatars with type "Icon". Replaces default person icon. (default: null)
  prop12PxRegularBadgeIcon?: React.ReactNode | null; // Custom icon element for badge icon on smaller avatars (16-56px). Replaces default calendar icon. (default: null)
  prop16PxRegularBadgeIcon?: React.ReactNode | null; // Custom icon element for badge icon on medium avatars (64-72px). Replaces default calendar icon. (default: null)
  prop24PxRegularBadgeIcon?: React.ReactNode | null; // Custom icon element for badge icon on large avatars (96-120px). Replaces default calendar icon. (default: null)
  size?: "16" | "20" | "24" | "28" | "32 (Default)" | "36" | "40" | "48" | "56" | "64" | "72" | "96" | "120"; // Size of the avatar in pixels. Significantly changes appearance and layout. (default: "16")
  type?: "Image" | "Icon" | "Initials"; // Display mode: Image shows a profile picture, Icon shows a person icon, Initials shows text. Significantly changes appearance. (default: "Image")
  onClick?: () => void; // Click handler for the entire avatar. Makes avatar interactive with hover opacity effect and keyboard support.
  onBadgeClick?: () => void; // Click handler specifically for the badge icon. Event propagation is stopped to prevent triggering onClick.
  onPresenceClick?: () => void; // Click handler specifically for the presence badge. Event propagation is stopped to prevent triggering onClick.
}

// ---------------------- Main Component ----------------------

export function AvatarAvatar({ className, activityRing = false, badgeIcon = false, initialsString1Max = "M", presenceBadge = false, prop12PxRegular = null, prop12PxRegularBadgeIcon = null, prop16PxRegularBadgeIcon = null, prop24PxRegularBadgeIcon = null, size = "16", type = "Image", onClick, onBadgeClick, onPresenceClick }: AvatarAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isIconAnd16 = type === "Icon" && size === "16";
  const isImageAnd120 = type === "Image" && size === "120";
  const isImageAnd16 = type === "Image" && size === "16";
  const isImageAnd20 = type === "Image" && size === "20";
  const isImageAnd24 = type === "Image" && size === "24";
  const isImageAnd28 = type === "Image" && size === "28";
  const isImageAnd32Default = type === "Image" && size === "32 (Default)";
  const isImageAnd36 = type === "Image" && size === "36";
  const isImageAnd40 = type === "Image" && size === "40";
  const isImageAnd48 = type === "Image" && size === "48";
  const isImageAnd56 = type === "Image" && size === "56";
  const isImageAnd64 = type === "Image" && size === "64";
  const isImageAnd72 = type === "Image" && size === "72";
  const isImageAnd96 = type === "Image" && size === "96";
  const isInitialsAnd16 = type === "Initials" && size === "16";
  return (
    <div 
      className={className || `relative rounded-[9999px] ${isImageAnd120 ? "size-[120px]" : isImageAnd96 ? "w-[96px]" : isImageAnd72 ? "size-[72px]" : isImageAnd64 ? "size-[64px]" : isImageAnd56 ? "size-[56px]" : isImageAnd48 ? "size-[48px]" : isImageAnd40 ? "size-[40px]" : isImageAnd36 ? "size-[36px]" : isImageAnd32Default ? "size-[32px]" : isImageAnd28 ? "size-[28px]" : isImageAnd24 ? "size-[24px]" : isImageAnd20 ? "size-[20px]" : "size-[16px]"}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default', transition: 'opacity 0.2s', opacity: isHovered && onClick ? 0.9 : 1 }}
    >
      <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid pointer-events-none ${isImageAnd64 || isImageAnd72 || isImageAnd96 || isImageAnd120 ? "border-4 inset-[-4px] rounded-[10003px]" : isImageAnd56 ? "border-3 inset-[-3px] rounded-[10002px]" : isImageAnd36 || isImageAnd40 || isImageAnd48 ? "border-2 inset-[-2px] rounded-[10001px]" : "border inset-[-1px] rounded-[10000px]"}`} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className={`content-stretch flex items-center justify-center relative ${isImageAnd96 ? "w-full" : "size-full"}`}>
          {(isImageAnd16 || isImageAnd20 || isImageAnd24 || isImageAnd28 || isImageAnd32Default || isImageAnd36 || isImageAnd40 || isImageAnd48 || isIconAnd16 || isInitialsAnd16) && activityRing && (
            <div className="absolute bg-white inset-[-2px] rounded-[9999px]" data-name="Activity ring">
              <div aria-hidden="true" className="absolute border-2 border-[#0f6cbd] border-solid inset-[-2px] pointer-events-none rounded-[10001px]" />
            </div>
          )}
          {(isImageAnd16 || isImageAnd20 || isImageAnd24 || isImageAnd28 || isImageAnd32Default || isImageAnd36 || isImageAnd40 || isImageAnd48 || isIconAnd16 || isInitialsAnd16) && (
            <div className={`relative rounded-[9999px] shrink-0 ${isIconAnd16 || isInitialsAnd16 ? "bg-[#e6e6e6] size-[16px]" : isImageAnd48 ? "pointer-events-none size-[48px]" : isImageAnd40 ? "pointer-events-none size-[40px]" : isImageAnd36 ? "pointer-events-none size-[36px]" : isImageAnd32Default ? "pointer-events-none size-[32px]" : isImageAnd28 ? "pointer-events-none size-[28px]" : isImageAnd24 ? "pointer-events-none size-[24px]" : isImageAnd20 ? "pointer-events-none size-[20px]" : "pointer-events-none size-[16px]"}`} data-name="Fill">
              {(isImageAnd16 || isImageAnd20 || isImageAnd24 || isImageAnd28 || isImageAnd32Default || isImageAnd36 || isImageAnd40 || isImageAnd48) && <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgFill} />}
              <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px] ${isIconAnd16 || isInitialsAnd16 ? "border pointer-events-none" : isImageAnd36 || isImageAnd40 || isImageAnd48 ? "border-2" : "border"}`} />
            </div>
          )}
          {(isImageAnd56 || isImageAnd64 || isImageAnd72 || isImageAnd96 || isImageAnd120) && activityRing && (
            <div className="absolute bg-white inset-[-3px] rounded-[9999px]" data-name="Activity ring">
              <div aria-hidden="true" className="absolute border-3 border-[#0f6cbd] border-solid inset-[-3px] pointer-events-none rounded-[10002px]" />
            </div>
          )}
          {(isImageAnd56 || isImageAnd64 || isImageAnd72 || isImageAnd96 || isImageAnd120) && (
            <div className={`pointer-events-none relative rounded-[9999px] shrink-0 ${isImageAnd120 ? "size-[120px]" : isImageAnd96 ? "size-[96px]" : isImageAnd72 ? "size-[72px]" : isImageAnd64 ? "size-[64px]" : "size-[56px]"}`} data-name="Fill">
              <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgFill} />
              <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0)] border-solid inset-0 rounded-[9999px] ${isImageAnd64 || isImageAnd72 || isImageAnd96 || isImageAnd120 ? "border-4" : "border-3"}`} />
            </div>
          )}
          {(isImageAnd16 || isImageAnd20 || isImageAnd24) && presenceBadge && <AvatarAvatarPresenceBadge onClick={onPresenceClick} />}
          {(isImageAnd32Default || isImageAnd36) && badgeIcon && <AvatarAvatarBadgeIcon additionalClassNames="p-px" prop12PxRegularBadgeIcon={prop12PxRegularBadgeIcon} onClick={onBadgeClick} />}
          {(isImageAnd28 || isImageAnd32Default || isImageAnd36) && presenceBadge && (
            <PresenceBadge onClick={onPresenceClick}>
              <AvatarAvatarHelper additionalClassNames="size-[10px]">
                <path d={svgPaths.p1855600} fill="var(--fill-0, #13A10E)" id="Shape" />
              </AvatarAvatarHelper>
            </PresenceBadge>
          )}
          {(isImageAnd48 || isImageAnd56) && badgeIcon && <AvatarAvatarBadgeIcon additionalClassNames="p-[4px]" prop12PxRegularBadgeIcon={prop12PxRegularBadgeIcon} onClick={onBadgeClick} />}
          {(isImageAnd48 || isImageAnd56) && presenceBadge && (
            <PresenceBadge onClick={onPresenceClick}>
              <div className="relative shrink-0 size-[16px]" data-name="Presence">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path d={svgPaths.p209c1a00} fill="var(--fill-0, #13A10E)" id="Shape" />
                  </svg>
                </div>
              </div>
            </PresenceBadge>
          )}
          {(isImageAnd64 || isImageAnd72) && badgeIcon && (
            <div 
              className="absolute bg-white bottom-[-2px] content-stretch flex items-center justify-center p-[4px] right-[-2px] rounded-[9999px]" 
              data-name="Badge icon"
              onClick={(e) => {
                if (onBadgeClick) {
                  e.stopPropagation();
                  onBadgeClick();
                }
              }}
              role={onBadgeClick ? "button" : undefined}
              tabIndex={onBadgeClick ? 0 : undefined}
              onKeyDown={onBadgeClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onBadgeClick();
                }
              } : undefined}
              style={{ cursor: onBadgeClick ? 'pointer' : 'default' }}
            >
              {prop16PxRegularBadgeIcon || (
                <AvatarAvatarHelper1 additionalClassNames="overflow-clip size-[16px]">
                  <path d={svgPaths.p5290700} fill="var(--fill-0, #424242)" id="Shape" />
                </AvatarAvatarHelper1>
              )}
            </div>
          )}
          {(isImageAnd64 || isImageAnd72) && presenceBadge && (
            <PresenceBadge onClick={onPresenceClick}>
              <div className="relative shrink-0 size-[20px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p33046200} fill="var(--fill-0, #13A10E)" id="Shape" />
                </svg>
              </div>
            </PresenceBadge>
          )}
          {(isImageAnd96 || isImageAnd120) && badgeIcon && (
            <div 
              className="absolute bg-white bottom-[-2px] content-stretch flex items-center justify-center p-[4px] right-[-2px] rounded-[9999px]" 
              data-name="Badge icon"
              onClick={(e) => {
                if (onBadgeClick) {
                  e.stopPropagation();
                  onBadgeClick();
                }
              }}
              role={onBadgeClick ? "button" : undefined}
              tabIndex={onBadgeClick ? 0 : undefined}
              onKeyDown={onBadgeClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onBadgeClick();
                }
              } : undefined}
              style={{ cursor: onBadgeClick ? 'pointer' : 'default' }}
            >
              {prop24PxRegularBadgeIcon || (
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Calendar">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                      <path d={svgPaths.p18a70500} fill="var(--fill-0, #424242)" id="Shape" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}
          {(isImageAnd96 || isImageAnd120) && presenceBadge && (
            <PresenceBadge onClick={onPresenceClick}>
              <div className="relative shrink-0 size-[28px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
                  <path d={svgPaths.p264e2680} fill="var(--fill-0, #13A10E)" id="Shape" />
                </svg>
              </div>
            </PresenceBadge>
          )}
          {isImageAnd40 && badgeIcon && <AvatarAvatarBadgeIcon additionalClassNames="p-[2px]" prop12PxRegularBadgeIcon={prop12PxRegularBadgeIcon} onClick={onBadgeClick} />}
          {isImageAnd40 && presenceBadge && (
            <PresenceBadge onClick={onPresenceClick}>
              <AvatarAvatarHelper1 additionalClassNames="size-[12px]">
                <path d={svgPaths.p292f0a00} fill="var(--fill-0, #13A10E)" id="Shape" />
              </AvatarAvatarHelper1>
            </PresenceBadge>
          )}
          {isIconAnd16 &&
            (prop12PxRegular || (
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[12px] top-1/2" data-name="Person">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-1/2 top-1/2 w-[8px]" data-name="Shape">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10">
                    <path d={svgPaths.p1d528180} fill="var(--fill-0, #616161)" id="Shape" />
                  </svg>
                </div>
              </div>
            ))}
          {isIconAnd16 && presenceBadge && <AvatarAvatarPresenceBadge onClick={onPresenceClick} />}
          {isInitialsAnd16 && <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] leading-[14px] left-1/2 not-italic overflow-hidden text-[#616161] text-[10px] text-center text-ellipsis top-[calc(50%-7px)] w-[16px] whitespace-nowrap">{initialsString1Max}</p>}
          {isInitialsAnd16 && presenceBadge && <AvatarAvatarPresenceBadge onClick={onPresenceClick} />}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function PresenceBadge({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div 
      className="absolute bg-white bottom-0 right-0 rounded-[9999px]"
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }
      } : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
      <div className="content-stretch flex items-start relative">{children}</div>
    </div>
  );
}

type AvatarAvatarHelper1Props = {
  additionalClassNames?: string;
};

function AvatarAvatarHelper1({ children, additionalClassNames = "" }: React.PropsWithChildren<AvatarAvatarHelper1Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          {children}
        </svg>
      </div>
    </div>
  );
}

type AvatarAvatarHelperProps = {
  additionalClassNames?: string;
};

function AvatarAvatarHelper({ children, additionalClassNames = "" }: React.PropsWithChildren<AvatarAvatarHelperProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          {children}
        </svg>
      </div>
    </div>
  );
}

type AvatarAvatarBadgeIconProps = {
  prop12PxRegularBadgeIcon: any;
  additionalClassNames?: string;
  onClick?: () => void;
};

function AvatarAvatarBadgeIcon({ prop12PxRegularBadgeIcon, additionalClassNames = "", onClick }: AvatarAvatarBadgeIconProps) {
  return (
    <div 
      className={clsx("absolute bg-white bottom-[-2px] content-stretch flex items-center justify-center right-[-2px] rounded-[9999px]", additionalClassNames)}
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }
      } : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {prop12PxRegularBadgeIcon || (
        <AvatarAvatarHelper additionalClassNames="overflow-clip size-[12px]">
          <path d={svgPaths.p1851ef80} fill="var(--fill-0, #424242)" id="Shape" />
        </AvatarAvatarHelper>
      )}
    </div>
  );
}

function AvatarAvatarPresenceBadge({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="absolute bg-white bottom-0 right-0 rounded-[9999px]"
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }
      } : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[10000px]" />
      <div className="content-stretch flex items-start relative">
        <div className="relative shrink-0 size-[6px]" data-name="Shape">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p237e6900} fill="var(--fill-0, #13A10E)" id="Shape" />
          </svg>
        </div>
      </div>
    </div>
  );
}

type PersonProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled" | "Light";
};

function Person({ className, size = "12", theme = "Regular" }: PersonProps) {
  const is12AndFilled = size === "12" && theme === "Filled";
  const is12AndRegular = size === "12" && theme === "Regular";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndRegular = size === "24" && theme === "Regular";
  const is28AndRegular = size === "28" && theme === "Regular";
  const is32AndLight = size === "32" && theme === "Light";
  const is32AndRegular = size === "32" && theme === "Regular";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is32AndRegular || is32AndLight ? "size-[32px]" : is12AndRegular || is12AndFilled ? "size-[12px]" : is16AndRegular ? "size-[16px]" : is20AndRegular ? "size-[20px]" : is24AndRegular ? "size-[24px]" : is28AndRegular ? "size-[28px]" : "size-[48px]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${is32AndRegular || is32AndLight ? "h-[28px] top-1/2 w-[24px]" : is12AndRegular || is12AndFilled ? "h-[10px] top-1/2 w-[8px]" : is16AndRegular ? "h-[12.5px] top-[calc(50%-0.25px)] w-[10px]" : is20AndRegular ? "h-[16px] top-1/2 w-[14px]" : is24AndRegular ? "h-[19.996px] top-1/2 w-[16px]" : is28AndRegular ? "h-[24px] top-1/2 w-[20px]" : "h-[40px] top-1/2 w-[32px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is32AndLight ? "0 0 23.9999 28" : is32AndRegular ? "0 0 24 28" : is12AndRegular || is12AndFilled ? "0 0 8 10" : is16AndRegular ? "0 0 10 12.5" : is20AndRegular ? "0 0 14 16" : is24AndRegular ? "0 0 15.9995 19.9964" : is28AndRegular ? "0 0 20 24" : "0 0 32 40"}>
          <path d={is32AndLight ? svgPaths.p38049c00 : is32AndRegular ? svgPaths.p1d4b6000 : is12AndRegular || is12AndFilled ? svgPaths.p1d528180 : is16AndRegular ? svgPaths.p28ed480 : is20AndRegular ? svgPaths.p1c10d780 : is24AndRegular ? svgPaths.p2379fd00 : is28AndRegular ? svgPaths.p1ee40700 : svgPaths.p321ac600} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
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

interface AvatarAvatarProps_Display {
  activityRing?: boolean;
  badgeIcon?: boolean;
  initialsString1Max?: string;
  presenceBadge?: boolean;
  prop12PxRegular?: React.ReactNode | null;
  prop12PxRegularBadgeIcon?: React.ReactNode | null;
  prop16PxRegularBadgeIcon?: React.ReactNode | null;
  prop24PxRegularBadgeIcon?: React.ReactNode | null;
  size?: "16" | "20" | "24" | "28" | "32 (Default)" | "36" | "40" | "48" | "56" | "64" | "72" | "96" | "120";
  type?: "Image" | "Icon" | "Initials";
}

function AvatarAvatar_Display({
  size,
  type,
  activityRing,
  badgeIcon,
  presenceBadge,
  initialsString1Max,
  prop12PxRegular,
  prop12PxRegularBadgeIcon,
  prop16PxRegularBadgeIcon,
  prop24PxRegularBadgeIcon,
}: AvatarAvatarProps_Display) {
  return (
    <AvatarAvatar
      size={size}
      type={type}
      activityRing={activityRing}
      badgeIcon={badgeIcon}
      presenceBadge={presenceBadge}
      initialsString1Max={initialsString1Max}
      prop12PxRegular={prop12PxRegular}
      prop12PxRegularBadgeIcon={prop12PxRegularBadgeIcon}
      prop16PxRegularBadgeIcon={prop16PxRegularBadgeIcon}
      prop24PxRegularBadgeIcon={prop24PxRegularBadgeIcon}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultImageAvatar
export function DefaultImageAvatar() {
  return (
    <AvatarAvatar_Display
      size="32 (Default)"
      type="Image"
    />
  );
}

// @figmaExample LargeImageAvatarWithPresence
export function LargeImageAvatarWithPresence() {
  return (
    <AvatarAvatar_Display
      size="48"
      type="Image"
      presenceBadge={true}
    />
  );
}

// @figmaExample InitialsAvatarWithActivityRing
export function InitialsAvatarWithActivityRing() {
  return (
    <AvatarAvatar_Display
      size="32 (Default)"
      type="Initials"
      initialsString1Max="JD"
      activityRing={true}
    />
  );
}

// @figmaExample IconAvatarWithBadge
export function IconAvatarWithBadge() {
  return (
    <AvatarAvatar_Display
      size="56"
      type="Icon"
      badgeIcon={true}
    />
  );
}

// @figmaExample LargeImageAvatarWithAllIndicators
export function LargeImageAvatarWithAllIndicators() {
  return (
    <AvatarAvatar_Display
      size="72"
      type="Image"
      badgeIcon={true}
      presenceBadge={true}
    />
  );
}

// @figmaExample ExtraLargeInitialsAvatarWithActivity
export function ExtraLargeInitialsAvatarWithActivity() {
  return (
    <AvatarAvatar_Display
      size="96"
      type="Initials"
      initialsString1Max="AB"
      activityRing={true}
      presenceBadge={true}
    />
  );
}

// @figmaExample SmallIconAvatarWithPresence
export function SmallIconAvatarWithPresence() {
  return (
    <AvatarAvatar_Display
      size="24"
      type="Icon"
      presenceBadge={true}
    />
  );
}

// @figmaExample MediumImageAvatarWithActivityAndBadge
export function MediumImageAvatarWithActivityAndBadge() {
  return (
    <AvatarAvatar_Display
      size="40"
      type="Image"
      activityRing={true}
      badgeIcon={true}
    />
  );
}