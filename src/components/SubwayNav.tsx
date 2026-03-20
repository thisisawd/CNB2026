import { memo, useState } from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';
import checkmarkIcon from 'figma:asset/52d9a280139806be617a61c5c2870d2918da30ec.png';

interface Step {
  id: number;
  title: string;
}

interface SubwayNavProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export const SubwayNav = memo(function SubwayNav({ steps, currentStep, onStepClick }: SubwayNavProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <>
      {/* Desktop view - visible on sm and up */}
      <aside className="hidden sm:flex w-80 bg-white dark:bg-[#1f1f1f] border-r border-[#edebe9] dark:border-[#3d3d3d] flex-col py-8 pl-6 pr-4">
        <div className="flex-1">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const isClickable = step.id <= currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="relative">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  className={`
                    w-full text-left flex items-center gap-3 py-4 transition-all
                    ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                  `}
                  disabled={!isClickable}
                >
                  <div className="relative flex-shrink-0">
                    {isCompleted ? (
                      <div className="relative">
                        <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#FFFFFF] dark:bg-[#1f1f1f] z-10" />
                        <img src={checkmarkIcon} alt="" className="w-4 h-4 relative z-20" />
                      </div>
                    ) : isActive ? (
                      <div className="relative">
                        <div 
                          className="absolute inset-[-2px] w-5 h-5 rounded-full bg-[#8661c5] opacity-30 blur-sm"
                          style={{
                            animation: 'glow-pulse 3s ease-in-out infinite'
                          }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-[#8661c5] bg-white dark:bg-[#1f1f1f] relative z-10"
                          style={{
                            animation: 'stroke-pulse 3s ease-in-out infinite'
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-dashed border-[#c8c6c4] dark:border-[#5d5d5d] bg-white dark:bg-[#1f1f1f] box-border relative z-10" />
                    )}
                  </div>
                  <span className="text-[#323130] dark:text-[#ffffff] text-sm whitespace-nowrap">
                    {step.id}. {step.title}
                  </span>
                </button>
                
                {/* Vertical solid line centered between stops */}
                {!isLast && (
                  <div className="absolute left-[7px] top-[40px] bottom-[-8px] w-[2px] bg-[#d1d1d1] dark:bg-[#5d5d5d] rounded-full overflow-hidden">
                    {isCompleted && (
                      <div 
                        className="w-full h-full bg-[#8661c5] origin-top rounded-full"
                        style={{
                          animation: 'line-fill 1s ease-out forwards'
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Mobile dropdown view - visible below sm breakpoint, overlays content */}
      <div className="sm:hidden fixed top-[48px] left-0 right-0 z-50 shadow-md">
        <div className="relative bg-white dark:bg-[#1f1f1f]">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#f3f2f1] dark:hover:bg-[#2b2b2b] border-b border-[#edebe9] dark:border-[#3d3d3d]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div 
                  className="absolute inset-[-2px] w-5 h-5 rounded-full bg-[#8661c5] opacity-30 blur-sm"
                  style={{
                    animation: 'glow-pulse 3s ease-in-out infinite'
                  }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-[#8661c5] bg-white dark:bg-[#1f1f1f] relative z-10"
                  style={{
                    animation: 'stroke-pulse 3s ease-in-out infinite'
                  }}
                />
              </div>
              <span className="text-[#323130] dark:text-[#ffffff] text-sm truncate">
                {currentStep}. {currentStepData?.title}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <ChevronDown className={`w-5 h-5 text-[#605e5c] dark:text-[#d0d0d0] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="border-b border-[#edebe9] dark:border-[#3d3d3d] bg-white dark:bg-[#1f1f1f] max-h-[60vh] overflow-y-auto">
              <div className="px-4 py-2">
                {steps.map((step, index) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = step.id < currentStep;
                  const isClickable = step.id <= currentStep;
                  const isLast = index === steps.length - 1;

                  return (
                    <div key={step.id} className="relative">
                      <button
                        onClick={() => {
                          if (isClickable) {
                            onStepClick(step.id);
                            setIsDropdownOpen(false);
                          }
                        }}
                        className={`
                          w-full text-left flex items-center gap-3 py-3 transition-all
                          ${isClickable ? 'cursor-pointer hover:bg-[#f3f2f1] dark:hover:bg-[#2b2b2b]' : 'cursor-default opacity-60'}
                        `}
                        disabled={!isClickable}
                      >
                        <div className="relative flex-shrink-0">
                          {isCompleted ? (
                            <div className="relative">
                              <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#FFFFFF] dark:bg-[#1f1f1f] z-10" />
                              <img src={checkmarkIcon} alt="" className="w-4 h-4 relative z-20" />
                            </div>
                          ) : isActive ? (
                            <div className="relative">
                              <div 
                                className="absolute inset-[-2px] w-5 h-5 rounded-full bg-[#8661c5] opacity-30 blur-sm"
                                style={{
                                  animation: 'glow-pulse 3s ease-in-out infinite'
                                }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full border border-[#8661c5] bg-white dark:bg-[#1f1f1f] relative z-10"
                                style={{
                                  animation: 'stroke-pulse 3s ease-in-out infinite'
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-dashed border-[#c8c6c4] dark:border-[#5d5d5d] bg-white dark:bg-[#1f1f1f] box-border relative z-10" />
                          )}
                        </div>
                        <span className="text-[#323130] dark:text-[#ffffff] text-sm">
                          {step.id}. {step.title}
                        </span>
                      </button>
                      
                      {/* Vertical solid line for mobile dropdown */}
                      {!isLast && (
                        <div className="absolute left-[7px] top-[36px] bottom-[-6px] w-[2px] bg-[#d1d1d1] dark:bg-[#5d5d5d] rounded-full overflow-hidden">
                          {isCompleted && (
                            <div 
                              className="w-full h-full bg-[#8661c5] origin-top rounded-full"
                              style={{
                                animation: 'line-fill 1s ease-out forwards'
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});