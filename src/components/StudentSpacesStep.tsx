import { ArrowLeft, FolderOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { useState } from 'react';

interface StudentSpacesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function StudentSpacesStep({ onNext, onBack }: StudentSpacesStepProps) {
  const [collaborationSpace, setCollaborationSpace] = useState(true);
  const [contentLibrary, setContentLibrary] = useState(true);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full hover:bg-neutral-200 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-neutral-800">
          Configure student spaces
        </h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-3 p-3 bg-neutral-100 rounded-lg">
            <FolderOpen className="w-5 h-5 text-neutral-700" />
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="collaboration"
                  checked={collaborationSpace}
                  onCheckedChange={(checked) => setCollaborationSpace(checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="collaboration" className="cursor-pointer">
                    Collaboration Space
                  </Label>
                  <p className="text-sm text-neutral-600 mt-1">
                    A shared space where all students can read and write content together
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="library"
                  checked={contentLibrary}
                  onCheckedChange={(checked) => setContentLibrary(checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="library" className="cursor-pointer">
                    Content Library
                  </Label>
                  <p className="text-sm text-neutral-600 mt-1">
                    A read-only space where teachers can share reference materials and resources
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Each student will automatically get their own private section 
                for individual work that only they and teachers can access.
              </p>
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
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
