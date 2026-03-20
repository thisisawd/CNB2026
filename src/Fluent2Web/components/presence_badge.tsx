import * as React from 'react';
import svgPaths from "./svg-p69dhp50cm";

/**
 * A circular badge component that displays a user's availability status and office location.
 * Appears as a small circular indicator with color-coded icons representing different presence states.
 * The badge is fully circular (pill-shaped) with a white background and border, containing a colored status icon at its center.
 * 
 * Use this component to show user availability in profiles, avatars, chat interfaces, or contact lists.
 * The badge provides visual feedback about whether someone is available, busy, away, offline, or out of office.
 * 
 * The badge automatically becomes keyboard-accessible and shows a pointer cursor when onClick is provided.
 * Different status types are represented by different colors: green for Available, red for Busy/Do not disturb/Blocked,
 * yellow/amber for Away, gray for Offline, and purple for Out of Office (OOF).
 */
export interface PresenceBadgeProps {
  className?: string; // Custom CSS classes to override default styling. Default: "bg-white relative rounded-[9999px]"
  inOffice?: boolean; // Indicates whether the user is physically in the office. Affects the visual representation when combined with status. Default: true
  size?: 'Extra-large huge' | 'Large' | 'Medium' | 'Small' | 'Extra-small' | 'Tiny'; // Controls the dimensions of the badge. Default: "Extra-large huge"
  status?: 'Offline' | 'Available' | 'Busy' | 'Away' | 'Blocked' | 'Do not disturb' | 'Unknown' | 'OOF'; // The user's current presence state. Default: "Available"
  onClick?: () => void; // Click handler that makes the badge interactive. When provided, the badge becomes keyboard-accessible with Enter/Space key support
}

// ---------------------- Main Component ----------------------

export function PresenceBadge({ className, inOffice = true, size = "Extra-large huge", status = "Available", onClick }: PresenceBadgeProps) {
  const isInOfficeAndAvailableAndExtraLargeHuge = inOffice && status === "Available" && size === "Extra-large huge";
  const isInOfficeAndAvailableAndExtraSmall = inOffice && status === "Available" && size === "Extra-small";
  const isInOfficeAndAvailableAndLarge = inOffice && status === "Available" && size === "Large";
  const isInOfficeAndAvailableAndMedium = inOffice && status === "Available" && size === "Medium";
  const isInOfficeAndAvailableAndSmall = inOffice && status === "Available" && size === "Small";
  const isInOfficeAndAvailableAndTiny = inOffice && status === "Available" && size === "Tiny";
  const isInOfficeAndAwayAndExtraLargeHuge = inOffice && status === "Away" && size === "Extra-large huge";
  const isInOfficeAndBlockedAndExtraLargeHuge = inOffice && status === "Blocked" && size === "Extra-large huge";
  const isInOfficeAndBusyAndExtraLargeHuge = inOffice && status === "Busy" && size === "Extra-large huge";
  const isInOfficeAndDoNotDisturbAndExtraLargeHuge = inOffice && status === "Do not disturb" && size === "Extra-large huge";
  const isInOfficeAndOfflineAndExtraLargeHuge = inOffice && status === "Offline" && size === "Extra-large huge";
  const isInOfficeAndOofAndExtraLargeHuge = inOffice && status === "OOF" && size === "Extra-large huge";
  const isInOfficeAndUnknownAndExtraLargeHuge = inOffice && status === "Unknown" && size === "Extra-large huge";
  const isNotInOfficeAndAvailableAndExtraLargeHuge = !inOffice && status === "Available" && size === "Extra-large huge";
  
  return (
    <div 
      className={className || "bg-white relative rounded-[9999px]"}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      style={onClick ? { cursor: 'pointer' } : undefined}
      aria-label={onClick ? `${status} presence badge${inOffice ? ' (in office)' : ''}` : undefined}
    >
      <div aria-hidden="true" className={`absolute border-solid border-white pointer-events-none ${isInOfficeAndAvailableAndExtraSmall || isInOfficeAndAvailableAndSmall || isInOfficeAndAvailableAndMedium || isInOfficeAndAvailableAndLarge || isNotInOfficeAndAvailableAndExtraLargeHuge || isInOfficeAndUnknownAndExtraLargeHuge || isInOfficeAndOofAndExtraLargeHuge || isInOfficeAndOfflineAndExtraLargeHuge || isInOfficeAndDoNotDisturbAndExtraLargeHuge || isInOfficeAndBusyAndExtraLargeHuge || isInOfficeAndBlockedAndExtraLargeHuge || isInOfficeAndAwayAndExtraLargeHuge || isInOfficeAndAvailableAndExtraLargeHuge ? "border-2 inset-[-2px] rounded-[10001px]" : "border inset-[-1px] rounded-[10000px]"}`} />
      <div className="content-stretch flex items-start relative">
        {(isInOfficeAndAvailableAndTiny || isInOfficeAndAvailableAndLarge || isNotInOfficeAndAvailableAndExtraLargeHuge || isInOfficeAndUnknownAndExtraLargeHuge || isInOfficeAndOofAndExtraLargeHuge || isInOfficeAndOfflineAndExtraLargeHuge || isInOfficeAndDoNotDisturbAndExtraLargeHuge || isInOfficeAndBusyAndExtraLargeHuge || isInOfficeAndBlockedAndExtraLargeHuge || isInOfficeAndAwayAndExtraLargeHuge || isInOfficeAndAvailableAndExtraLargeHuge) && (
          <div className={`relative shrink-0 ${isNotInOfficeAndAvailableAndExtraLargeHuge || isInOfficeAndUnknownAndExtraLargeHuge || isInOfficeAndOofAndExtraLargeHuge || isInOfficeAndOfflineAndExtraLargeHuge || isInOfficeAndDoNotDisturbAndExtraLargeHuge || isInOfficeAndBusyAndExtraLargeHuge || isInOfficeAndBlockedAndExtraLargeHuge || isInOfficeAndAwayAndExtraLargeHuge || isInOfficeAndAvailableAndExtraLargeHuge ? "size-[28px]" : isInOfficeAndAvailableAndLarge ? "size-[20px]" : "size-[6px]"}`} data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isNotInOfficeAndAvailableAndExtraLargeHuge || isInOfficeAndUnknownAndExtraLargeHuge || isInOfficeAndOofAndExtraLargeHuge || isInOfficeAndOfflineAndExtraLargeHuge || isInOfficeAndDoNotDisturbAndExtraLargeHuge || isInOfficeAndBusyAndExtraLargeHuge || isInOfficeAndBlockedAndExtraLargeHuge || isInOfficeAndAwayAndExtraLargeHuge || isInOfficeAndAvailableAndExtraLargeHuge ? "0 0 28 28" : isInOfficeAndAvailableAndLarge ? "0 0 20 20" : "0 0 6 6"}>
              <path d={isInOfficeAndAvailableAndExtraLargeHuge ? svgPaths.p264e2680 : isInOfficeAndAwayAndExtraLargeHuge ? svgPaths.p1e8080 : isInOfficeAndDoNotDisturbAndExtraLargeHuge || isInOfficeAndBusyAndExtraLargeHuge ? svgPaths.p3b780200 : isInOfficeAndOfflineAndExtraLargeHuge ? svgPaths.p3e4b6300 : isInOfficeAndOofAndExtraLargeHuge ? svgPaths.p2e0f8540 : isInOfficeAndUnknownAndExtraLargeHuge || isInOfficeAndBlockedAndExtraLargeHuge ? svgPaths.pd9ce7f0 : isNotInOfficeAndAvailableAndExtraLargeHuge ? svgPaths.p12b76900 : isInOfficeAndAvailableAndLarge ? svgPaths.p33046200 : svgPaths.p237e6900} fill={isInOfficeAndAwayAndExtraLargeHuge ? "var(--fill-0, #EAA300)" : isInOfficeAndOfflineAndExtraLargeHuge ? "var(--fill-0, #616161)" : isInOfficeAndOofAndExtraLargeHuge ? "var(--fill-0, #C239B3)" : isInOfficeAndUnknownAndExtraLargeHuge || isInOfficeAndDoNotDisturbAndExtraLargeHuge || isInOfficeAndBusyAndExtraLargeHuge || isInOfficeAndBlockedAndExtraLargeHuge ? "var(--fill-0, #C50F1F)" : "var(--fill-0, #13A10E)"} id="Shape" />
            </svg>
          </div>
        )}
        {(isInOfficeAndAvailableAndExtraSmall || isInOfficeAndAvailableAndSmall || isInOfficeAndAvailableAndMedium) && (
          <div className={`relative shrink-0 ${isInOfficeAndAvailableAndMedium ? "size-[16px]" : isInOfficeAndAvailableAndSmall ? "size-[12px]" : "size-[10px]"}`} data-name="Presence">
            <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${isInOfficeAndAvailableAndMedium ? "size-[16px]" : isInOfficeAndAvailableAndSmall ? "size-[12px]" : "size-[10px]"}`} data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isInOfficeAndAvailableAndMedium ? "0 0 16 16" : isInOfficeAndAvailableAndSmall ? "0 0 12 12" : "0 0 10 10"}>
                <path d={isInOfficeAndAvailableAndMedium ? svgPaths.p209c1a00 : isInOfficeAndAvailableAndSmall ? svgPaths.p292f0a00 : svgPaths.p1855600} fill="var(--fill-0, #13A10E)" id="Shape" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface PresenceBadgeProps_Display {
  inOffice?: boolean;
  size?: 'Extra-large huge' | 'Large' | 'Medium' | 'Small' | 'Extra-small' | 'Tiny';
  status?: 'Offline' | 'Available' | 'Busy' | 'Away' | 'Blocked' | 'Do not disturb' | 'Unknown' | 'OOF';
}

function PresenceBadge_Display({
  status,
  size,
  inOffice,
}: PresenceBadgeProps_Display) {
  return (
    <PresenceBadge
      status={status}
      size={size}
      inOffice={inOffice}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample AvailableMediumInOffice
export function AvailableMediumInOffice() {
  return (
    <PresenceBadge_Display
      status="Available"
      size="Medium"
      inOffice={true}
    />
  );
}

// @figmaExample BusyLargeInOffice
export function BusyLargeInOffice() {
  return (
    <PresenceBadge_Display
      status="Busy"
      size="Large"
      inOffice={true}
    />
  );
}

// @figmaExample AwaySmallInOffice
export function AwaySmallInOffice() {
  return (
    <PresenceBadge_Display
      status="Away"
      size="Small"
      inOffice={true}
    />
  );
}

// @figmaExample DoNotDisturbMediumInOffice
export function DoNotDisturbMediumInOffice() {
  return (
    <PresenceBadge_Display
      status="Do not disturb"
      size="Medium"
      inOffice={true}
    />
  );
}

// @figmaExample OfflineExtraSmallRemote
export function OfflineExtraSmallRemote() {
  return (
    <PresenceBadge_Display
      status="Offline"
      size="Extra-small"
      inOffice={false}
    />
  );
}

// @figmaExample OutOfOfficeExtraLargeRemote
export function OutOfOfficeExtraLargeRemote() {
  return (
    <PresenceBadge_Display
      status="OOF"
      size="Extra-large huge"
      inOffice={false}
    />
  );
}

// @figmaExample BlockedSmallInOffice
export function BlockedSmallInOffice() {
  return (
    <PresenceBadge_Display
      status="Blocked"
      size="Small"
      inOffice={true}
    />
  );
}

// @figmaExample UnknownTinyInOffice
export function UnknownTinyInOffice() {
  return (
    <PresenceBadge_Display
      status="Unknown"
      size="Tiny"
      inOffice={true}
    />
  );
}