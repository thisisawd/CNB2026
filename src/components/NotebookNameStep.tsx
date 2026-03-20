import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface NotebookNameStepProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  notebookName: string;
  setNotebookName: (name: string) => void;
}

export function NotebookNameStep({ 
  onNext, 
  onBack, 
  currentStep,
  notebookName,
  setNotebookName 
}: NotebookNameStepProps) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        {currentStep > 1 && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full hover:bg-neutral-200 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-neutral-800">
          What do you want to name your class notebook?
        </h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-3 p-3 bg-neutral-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-neutral-700" />
          </div>
          
          <div className="flex-1">
            <Input
              type="text"
              value={notebookName}
              onChange={(e) => setNotebookName(e.target.value)}
              placeholder="Enter a notebook name, e.g., Biology 3 period 2"
              className="w-full"
            />
            <p className="mt-2 text-sm text-neutral-600">
              Choose a descriptive name that helps you identify this class notebook.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-8">
          <Button
            onClick={onNext}
            disabled={!notebookName.trim()}
            className="bg-purple-600 hover:bg-purple-700 px-8 disabled:bg-[#f3f2f1] disabled:text-[#a19f9d] disabled:hover:bg-[#f3f2f1] disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}