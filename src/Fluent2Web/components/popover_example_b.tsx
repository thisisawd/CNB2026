import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-5mfwirdosb';
import imgSubtract from 'figma:asset/fe7876f8e912ba870d00ba3e9784f3d70e037a4d.png';

/**
 * A menu popover component displaying a persona card with selectable action items.
 * Appears as a 240px wide light gray panel with rounded corners, containing an avatar,
 * user information ("Serena Davis", "Software Engineer"), a section header, and two
 * selectable menu items with icons. Includes visual checkmarks for the selected item
 * and a decorative cursor indicator.
 *
 * This component manages its own selection state internally and conditionally renders
 * based on the open prop. When closed (open=false), the component returns null and
 * renders nothing.
 */
export interface PopoverExampleBProps {
  className?: string; // Additional CSS classes to apply to the root container
  open?: boolean; // Controls visibility of the popover. When false, component renders nothing (default: true)
  onOpenChange?: (open: boolean) => void; // Callback fired when popover should change open state (currently only called by internal handleClose)
  onMenuItemSelect?: (index: number) => void; // Callback fired when a menu item is clicked, receives the index (0 or 1) of the selected item
  defaultSelectedIndex?: number; // The initially selected menu item index (0 or 1) (default: 0)
}

// ---------------------- Main Component ----------------------

export function PopoverExampleB({ 
  className,
  open = true,
  onOpenChange,
  onMenuItemSelect,
  defaultSelectedIndex = 0
}: PopoverExampleBProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    onMenuItemSelect?.(index);
  };

  const handleClose = () => {
    onOpenChange?.(false);
  };

  if (!open) return null;

  return (
    <div className={className || ""} data-name="Popover example B">
      <div className="bg-[#fafafa] relative w-[240px]" data-name="Style=Default" role="menu">
        <div className="content-stretch flex flex-col items-start relative w-full">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Persona">
            <div className="relative shrink-0 size-[48px]" data-name="Avatar">
              <div className="absolute left-0 size-[48px] top-0" data-name="Subtract">
                <img alt="Serena Davis" className="block max-w-none size-full" height="48" src={imgSubtract} width="48" />
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start pb-[5px] pt-px relative shrink-0" data-name="Content">
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] mb-[-2px] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">Serena Davis</p>
              </div>
              <div className="content-stretch flex flex-col items-start mb-[-2px] relative shrink-0" data-name="Other content">
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] whitespace-nowrap">
                  <p className="leading-[16px]">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
          <Divider className="relative shrink-0 w-full" />
          <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name=".[DEPRECATED] .Section header">
            <div className="content-stretch flex flex-col items-start py-[8px] relative w-full">
              <div className="content-stretch flex h-[16px] items-center px-[6px] relative shrink-0" data-name="left lockup">
                <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#616161] text-[12px]">Section header</p>
              </div>
            </div>
          </div>
          <DeprecatedMenuItem 
            additionalClassNames={selectedIndex === 0 ? "bg-[#f5f5f5]" : "bg-white"}
            isSelected={selectedIndex === 0}
            onClick={() => handleMenuItemClick(0)}
          >
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[4px] items-center pl-[6px] pr-[4px] relative w-full">
                {selectedIndex === 0 && (
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Checkmark">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[9.001px] left-[calc(50%+0.13px)] top-[calc(50%-0.25px)] w-[12.25px]" data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 9.00113">
                        <path d={svgPaths.p35118f00} fill="var(--fill-0, #424242)" id="Shape" />
                      </svg>
                    </div>
                  </div>
                )}
                <PopoverExampleBHelper>
                  <path d={svgPaths.p83f1700} fill="var(--fill-0, #242424)" id="Shape" />
                </PopoverExampleBHelper>
                <PopoverExampleBContentFrame />
              </div>
            </div>
          </DeprecatedMenuItem>
          <DeprecatedMenuItem 
            additionalClassNames={selectedIndex === 1 ? "bg-[#f5f5f5]" : "bg-white"}
            isSelected={selectedIndex === 1}
            onClick={() => handleMenuItemClick(1)}
          >
            <div className="content-stretch flex gap-[4px] items-start pl-[6px] pr-[4px] relative w-full">
              {selectedIndex === 1 && (
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Checkmark">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[9.001px] left-[calc(50%+0.13px)] top-[calc(50%-0.25px)] w-[12.25px]" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 9.00113">
                      <path d={svgPaths.p35118f00} fill="var(--fill-0, #424242)" id="Shape" />
                    </svg>
                  </div>
                </div>
              )}
              <PopoverExampleBHelper>
                <path d={svgPaths.p19631e80} fill="var(--fill-0, #242424)" id="Shape" />
              </PopoverExampleBHelper>
              <PopoverExampleBContentFrame />
            </div>
          </DeprecatedMenuItem>
          <div className="absolute h-[16px] left-[191px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)] top-[121.88px] w-[15px]" data-name="Anatomy / Cursor">
            <div className="absolute inset-[2.98%_1.69%_1.59%_2.92%]" data-name="Fill 1">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3083 15.2681">
                <path clipRule="evenodd" d={svgPaths.p428eb00} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
              </svg>
            </div>
            <div className="absolute inset-[2.98%_1.69%_1.59%_2.92%]" data-name="Stroke 3">
              <div className="absolute inset-[-2.46%_-2.62%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0582 16.0181">
                  <path clipRule="evenodd" d={svgPaths.p19e35668} fillRule="evenodd" id="Stroke 3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[57.97%_16.22%_20.41%_77.11%]" data-name="Stroke 5">
              <div className="absolute inset-[-10.84%_62.5%_-10.84%_-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 4.209">
                  <path d="M0.375 3.834V0.375" id="Stroke 5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[57.96%_36.33%_20.34%_63.57%]" data-name="Stroke 7">
              <div className="absolute inset-[-10.8%_-2343.75%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.766 4.223">
                  <path d="M0.391 3.848L0.375 0.375" id="Stroke 7" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.15%_42.97%_20.43%_50.36%]" data-name="Stroke 9">
              <div className="absolute inset-[-10.95%_60.4%_-10.95%_-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.771 4.176">
                  <path d="M0.375 0.375L0.396 3.801" id="Stroke 9" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="0.75" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function PopoverExampleBHelper({ children }: React.PropsWithChildren<{}>) {
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

type DeprecatedMenuItemProps = {
  additionalClassNames?: string;
  isSelected?: boolean;
  onClick?: () => void;
};

function DeprecatedMenuItem({ children, additionalClassNames = "", isSelected = false, onClick }: React.PropsWithChildren<DeprecatedMenuItemProps>) {
  return (
    <div 
      className={clsx(
        "relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors hover:bg-[#f5f5f5]", 
        additionalClassNames
      )}
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center relative w-full">
          <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name=".[DEPRECATED] .Start-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function PopoverExampleBContentFrame() {
  return (
    <div className="content-stretch flex items-center overflow-clip px-[2px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`Action `}</p>
      </div>
    </div>
  );
}

function Divider({ className }: { className?: string }) {
  return (
    <div className={className || "relative w-[960px]"} data-name="Divider">
      <div className="content-stretch flex flex-col items-start py-[8px] relative w-full">
        <div className="bg-[#edebe9] h-px shrink-0 w-full" data-name="hr" />
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface PopoverExampleBProps_Display {
  defaultSelectedIndex?: number;
}

function PopoverExampleB_Display({
  defaultSelectedIndex,
}: PopoverExampleBProps_Display) {
  return (
    <PopoverExampleB
      open={true}
      defaultSelectedIndex={defaultSelectedIndex}
      onOpenChange={() => {}}
      onMenuItemSelect={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample PopoverWithFirstItemSelected
export function PopoverFirstItemSelected() {
  return (
    <PopoverExampleB_Display
      defaultSelectedIndex={0}
    />
  );
}

// @figmaExample PopoverWithSecondItemSelected
export function PopoverSecondItemSelected() {
  return (
    <PopoverExampleB_Display
      defaultSelectedIndex={1}
    />
  );
}