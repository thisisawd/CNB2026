import { memo } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, User } from 'lucide-react';

interface Student {
  name: string;
  email: string;
  photo?: string;
}

interface AddStudentPreviewStepProps {
  notebookName: string;
  newStudents: Student[];
  removedStudents: Student[];
  onBack: () => void;
  onNext: () => void;
  notebookType?: 'class' | 'staff';
}

export const AddStudentPreviewStep = memo(function AddStudentPreviewStep({
  notebookName,
  newStudents,
  removedStudents,
  onBack,
  onNext,
  notebookType = 'class',
}: AddStudentPreviewStepProps) {
  const hasChanges = newStudents.length > 0 || removedStudents.length > 0;
  const isStaff = notebookType === 'staff';
  const memberLabel = isStaff ? 'staff member' : 'student';

  const pluralize = (count: number, singular: string) =>
    count === 1 ? singular : `${singular}s`;

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Back button - text link style */}
      <div className="mt-[68px] mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[#7719AA] hover:underline transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="w-4 h-4" />
          <span style={{ fontSize: '14px' }}>Back</span>
        </button>
      </div>

      {/* Heading */}
      <h1
        className="text-[#323130] dark:text-[#ffffff] mb-8"
        style={{ fontSize: '24px', fontWeight: 300, lineHeight: 1.3 }}
      >
        {isStaff
          ? 'Did we get this right? Review your final staff member list below.'
          : 'Did we get this right? Review your final student list below.'}
      </h1>

      {/* Added Students Section */}
      {newStudents.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-[#323130] dark:text-[#ffffff] mb-4"
            style={{ fontSize: '14px', fontWeight: 400 }}
          >
            Add {newStudents.length} new {pluralize(newStudents.length, memberLabel)}:
          </h2>

          <div className="flex flex-wrap gap-2">
            {newStudents.map((student, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 border border-[#d1d1d1] dark:border-[#4d4d4d] rounded-full pl-1 pr-4 py-1 bg-white dark:bg-[#2d2d2d]"
              >
                {student.photo ? (
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#e1dfdd] dark:bg-[#4d4d4d] flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-[#605e5c] dark:text-[#d0d0d0]" />
                  </div>
                )}
                <span
                  className="text-[#323130] dark:text-[#ffffff]"
                  style={{ fontSize: '14px' }}
                >
                  {student.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Removed Students Section */}
      {removedStudents.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-[#323130] dark:text-[#ffffff] mb-4"
            style={{ fontSize: '14px', fontWeight: 400 }}
          >
            Remove {removedStudents.length} {pluralize(removedStudents.length, memberLabel)}:
          </h2>

          <div className="flex flex-wrap gap-2">
            {removedStudents.map((student, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 border border-[#d1d1d1] dark:border-[#4d4d4d] rounded-full pl-1 pr-4 py-1 bg-white dark:bg-[#2d2d2d]"
              >
                {student.photo ? (
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#e1dfdd] dark:bg-[#4d4d4d] flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-[#605e5c] dark:text-[#d0d0d0]" />
                  </div>
                )}
                <span
                  className="text-[#323130] dark:text-[#ffffff]"
                  style={{ fontSize: '14px' }}
                >
                  {student.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-12">
        <Button
          onClick={onNext}
          disabled={!hasChanges}
          className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-8 rounded disabled:bg-[#f3f2f1] disabled:text-[#a19f9d] disabled:hover:bg-[#f3f2f1] disabled:cursor-not-allowed"
        >
          Update
        </Button>
      </div>
    </div>
  );
});