import { ArrowLeft, BookOpen, FileText, Users, FolderOpen, Check } from 'lucide-react';
import { Button } from './ui/button';

interface PreviewStepProps {
  onNext: () => void;
  onBack: () => void;
  notebookName: string;
}

export function PreviewStep({ onNext, onBack, notebookName }: PreviewStepProps) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full hover:bg-neutral-200 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-neutral-800">
          Review your class notebook
        </h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-neutral-900 mb-1">Notebook Name</h3>
                <p className="text-neutral-700">
                  {notebookName || 'Not specified'}
                </p>
              </div>
              <button className="text-sm text-purple-600 hover:underline">
                Edit
              </button>
            </div>

            <div className="h-px bg-neutral-200"></div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-neutral-900 mb-1">Overview</h3>
                <p className="text-neutral-700">
                  Overview section configured
                </p>
              </div>
              <button className="text-sm text-purple-600 hover:underline">
                Edit
              </button>
            </div>

            <div className="h-px bg-neutral-200"></div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-neutral-900 mb-1">Students & Teachers</h3>
                <p className="text-neutral-700">
                  Ready to add students and co-teachers
                </p>
              </div>
              <button className="text-sm text-purple-600 hover:underline">
                Edit
              </button>
            </div>

            <div className="h-px bg-neutral-200"></div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FolderOpen className="w-5 h-5 text-orange-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-neutral-900 mb-1">Student Spaces</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Collaboration Space enabled</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Content Library enabled</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Private student sections included</span>
                  </div>
                </div>
              </div>
              <button className="text-sm text-purple-600 hover:underline">
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-8">
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
          <Button
            onClick={onNext}
            className="bg-purple-600 hover:bg-purple-700 px-8"
          >
            Create Notebook
          </Button>
        </div>
      </div>
    </div>
  );
}
