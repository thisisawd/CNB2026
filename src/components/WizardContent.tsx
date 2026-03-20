import { ArrowLeft } from "lucide-react";
import { NotebookNameStep } from "./steps/NotebookNameStep";
import { NotebookOverviewStep } from "./steps/NotebookOverviewStep";
import { OtherTeachersStep } from "./steps/OtherTeachersStep";
import { StudentsStep } from "./steps/StudentsStep";
import { StudentSpacesStep } from "./steps/StudentSpacesStep";
import { PreviewStep } from "./steps/PreviewStep";
import { DoneStep } from "./steps/DoneStep";

interface WizardContentProps {
  currentStep: number;
  notebookName: string;
  setNotebookName: (name: string) => void;
  notebookOverview: string;
  setNotebookOverview: (overview: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function WizardContent({
  currentStep,
  notebookName,
  setNotebookName,
  notebookOverview,
  setNotebookOverview,
  onNext,
  onBack,
}: WizardContentProps) {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <NotebookNameStep
            value={notebookName}
            onChange={setNotebookName}
            onNext={onNext}
          />
        );
      case 2:
        return (
          <NotebookOverviewStep
            value={notebookOverview}
            onChange={setNotebookOverview}
            onNext={onNext}
            onBack={onBack}
          />
        );
      case 3:
        return <OtherTeachersStep onNext={onNext} onBack={onBack} />;
      case 4:
        return <StudentsStep onNext={onNext} onBack={onBack} />;
      case 5:
        return <StudentSpacesStep onNext={onNext} onBack={onBack} />;
      case 6:
        return <PreviewStep onNext={onNext} onBack={onBack} />;
      case 7:
        return <DoneStep onBack={onBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {currentStep > 1 && (
        <div className="p-6 pb-0">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-2 text-[#0078d4] hover:bg-[#0078d4]/10 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
        </div>
      )}
      
      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
