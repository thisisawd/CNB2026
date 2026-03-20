import { ArrowLeft, UserPlus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface OtherTeachersStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function OtherTeachersStep({ onNext, onBack }: OtherTeachersStepProps) {
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teachers, setTeachers] = useState<string[]>([]);

  const handleAddTeacher = () => {
    if (teacherEmail.trim() && teacherEmail.includes('@')) {
      setTeachers([...teachers, teacherEmail]);
      setTeacherEmail('');
    }
  };

  const handleRemoveTeacher = (index: number) => {
    setTeachers(teachers.filter((_, i) => i !== index));
  };

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
          Add other teachers to this notebook
        </h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-3 p-3 bg-neutral-100 rounded-lg">
            <UserPlus className="w-5 h-5 text-neutral-700" />
          </div>
          
          <div className="flex-1">
            <div className="flex gap-2">
              <Input
                type="email"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTeacher()}
                placeholder="Enter teacher email address"
                className="flex-1"
              />
              <Button onClick={handleAddTeacher} variant="outline">
                Add
              </Button>
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              Other teachers will have full editing permissions for this notebook.
            </p>

            {teachers.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-neutral-700">Added teachers:</p>
                <div className="flex flex-wrap gap-2">
                  {teachers.map((teacher, index) => (
                    <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1">
                      {teacher}
                      <button
                        onClick={() => handleRemoveTeacher(index)}
                        className="ml-2 hover:bg-neutral-300 rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
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
