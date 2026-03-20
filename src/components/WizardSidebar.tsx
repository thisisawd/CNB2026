import { Check } from "lucide-react";
import type { WizardStep } from "./ClassNotebookWizard";

interface WizardSidebarProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function WizardSidebar({ steps, currentStep, onStepClick }: WizardSidebarProps) {
  return (
    <aside className="w-80 bg-gradient-to-b from-[#6b2d8f] to-[#5c2684] text-white flex flex-col">
      <nav className="flex-1 py-8 px-4">
        <ul className="space-y-2">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <li key={step.id}>
                <button
                  onClick={() => onStepClick(step.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${
                    isActive
                      ? "bg-white/20 shadow-lg"
                      : "hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full text-sm flex-shrink-0 ${
                      isCompleted
                        ? "bg-white/90 text-[#6b2d8f]"
                        : isActive
                        ? "bg-white text-[#6b2d8f]"
                        : "bg-white/30"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <span className={`text-sm whitespace-nowrap ${isActive ? "font-medium" : ""}`}>
                    {step.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}