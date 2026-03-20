import * as React from 'react';
import svgPaths from "./svg-auzycynbwq";
import imgApps from "figma:asset/d2dcb9d6944f2d59cdcf50a5aed617218c35e884.png";

/**
 * A guided tutorial/onboarding popover component that demonstrates Microsoft 365 app launcher functionality.
 * Appears as a vertically-stacked card with a light gray background (#fafafa), featuring a header, centered illustration,
 * descriptive text, and footer controls. The component has a fixed width of approximately 359px and adapts its height to content.
 *
 * Use this component when you need to create onboarding flows or tutorial experiences that guide users through features step-by-step.
 * It's specifically designed to showcase the Microsoft 365 App Launcher feature but can be adapted for similar multi-step tutorial scenarios.
 *
 * The popover displays:
 * - A "Your apps" header with a close button in the top-right
 * - A 128px illustration showing app icons
 * - Instructional text explaining the App Launcher feature
 * - A progress indicator showing current step out of total steps
 * - A blue "Next" button to advance through the tutorial
 */
export interface PopoverExampleAProps {
  className?: string; // Additional CSS classes to apply to the root container
  currentStep?: number; // The current step number in the tutorial sequence, displayed in the footer as "X of Y" (default: 1)
  totalSteps?: number; // The total number of steps in the tutorial, displayed in the footer (default: 6)
  onNext?: () => void; // Callback function triggered when the user clicks the "Next" button to advance to the next step
  onClose?: () => void; // Callback function triggered when the user clicks the close button (X icon) in the header
}

// ---------------------- Main Component ----------------------

export function PopoverExampleA({ 
  className,
  currentStep = 1,
  totalSteps = 6,
  onNext,
  onClose
}: PopoverExampleAProps) {
  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={className || ""} data-name="Popover example A">
      <div className="bg-[#fafafa] relative" data-name="Style=Default">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header">
            <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] h-[29px] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[24px] w-[284px]">
              <p className="leading-[32px] whitespace-pre-wrap">Your apps</p>
            </div>
            <button 
              className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors" 
              data-name="Button"
              onClick={handleClose}
              aria-label="Close"
              type="button"
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[6px] relative">
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
          </div>
          <div className="bg-[#fafafa] content-stretch flex h-[144px] items-center justify-center relative rounded-[2px] shrink-0 w-full">
            <div className="relative shrink-0 size-[128px]" data-name="Apps">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center relative size-full">
                  <div className="relative shrink-0 size-[128px]" data-name="Illustration">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgApps} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[359px]" data-name="Body">
            <p className="font-['Segoe_UI:Regular',sans-serif] h-[52px] leading-[0] not-italic relative shrink-0 text-[#424242] text-[0px] text-[16px] w-[310px] whitespace-pre-wrap">
              <span className="leading-[22px]">{`Expand the `}</span>
              <span className="font-['Segoe_UI:Semibold',sans-serif] leading-[22px]">{`App Launcher `}</span>
              <span className="leading-[22px]">to see all of your Microsoft 365 apps</span>
            </p>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-[359px]" data-name="Footer">
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">{currentStep} of {totalSteps}</p>
              </div>
              <button 
                className="bg-[#0f6cbd] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#115ea3] active:bg-[#0e4775] transition-colors" 
                data-name="Button"
                onClick={handleNext}
                type="button"
              >
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">
                    <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
                      <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                          <p className="leading-[20px]">Next</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface PopoverExampleAProps_Display {
  currentStep?: number;
  totalSteps?: number;
}

function PopoverExampleA_Display({
  currentStep,
  totalSteps,
}: PopoverExampleAProps_Display) {
  const [step, setStep] = React.useState(currentStep || 1);

  return (
    <PopoverExampleA
      currentStep={step}
      totalSteps={totalSteps}
      onNext={() => {
        if (step < (totalSteps || 6)) {
          setStep(step + 1);
        }
      }}
      onClose={() => {
        // Reset to initial step for demo purposes
        setStep(currentStep || 1);
      }}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample FirstStepTutorial
export function PopoverExampleAFirstStep() {
  return (
    <PopoverExampleA_Display
      currentStep={1}
      totalSteps={6}
    />
  );
}

// @figmaExample MidStepTutorial
export function PopoverExampleAMidStep() {
  return (
    <PopoverExampleA_Display
      currentStep={3}
      totalSteps={6}
    />
  );
}

// @figmaExample FinalStepTutorial
export function PopoverExampleAFinalStep() {
  return (
    <PopoverExampleA_Display
      currentStep={6}
      totalSteps={6}
    />
  );
}

// @figmaExample ShortTutorialStart
export function PopoverExampleAShortTutorial() {
  return (
    <PopoverExampleA_Display
      currentStep={1}
      totalSteps={4}
    />
  );
}