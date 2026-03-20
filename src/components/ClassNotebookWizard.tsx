import { useState } from "react";
import { FluentHeader } from "./FluentHeader";
import { WizardSidebar } from "./WizardSidebar";
import { WizardContent } from "./WizardContent";
import { WizardFooter } from "./WizardFooter";

export interface WizardStep {
  id: number;
  label: string;
  completed: boolean;
}

export function ClassNotebookWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [notebookName, setNotebookName] = useState("");
  const [notebookOverview, setNotebookOverview] = useState("");

  const steps: WizardStep[] = [
    { id: 1, label: "Notebook Name", completed: false },
    { id: 2, label: "Notebook Overview", completed: false },
    { id: 3, label: "Other Teachers", completed: false },
    { id: 4, label: "Students", completed: false },
    { id: 5, label: "Student Spaces", completed: false },
    { id: 6, label: "Preview", completed: false },
    { id: 7, label: "Done", completed: false },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  return (
    <div className="flex flex-col h-screen">
      <FluentHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <WizardSidebar
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
        
        <main className="flex-1 flex flex-col bg-[#faf9f8]">
          <WizardContent
            currentStep={currentStep}
            notebookName={notebookName}
            setNotebookName={setNotebookName}
            notebookOverview={notebookOverview}
            setNotebookOverview={setNotebookOverview}
            onNext={handleNext}
            onBack={handleBack}
          />
        </main>
      </div>
      
      <WizardFooter />
    </div>
  );
}
