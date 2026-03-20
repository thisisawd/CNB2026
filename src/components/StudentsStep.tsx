import { ArrowLeft, Users, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

interface StudentsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function StudentsStep({ onNext, onBack }: StudentsStepProps) {
  const [students, setStudents] = useState('');

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
          Add students to this notebook
        </h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-3 p-3 bg-neutral-100 rounded-lg">
            <Users className="w-5 h-5 text-neutral-700" />
          </div>
          
          <div className="flex-1">
            <Textarea
              value={students}
              onChange={(e) => setStudents(e.target.value)}
              placeholder="Enter student email addresses, one per line&#10;&#10;student1@school.edu&#10;student2@school.edu&#10;student3@school.edu"
              className="w-full min-h-40"
            />
            <div className="mt-4 flex items-center gap-4">
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Import from CSV
              </Button>
              <p className="text-sm text-neutral-600">
                Or paste email addresses above
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
