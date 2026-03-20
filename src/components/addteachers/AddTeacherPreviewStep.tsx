import { memo } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

interface Teacher {
  name: string;
  email: string;
  photo?: string;
}

interface AddTeacherPreviewStepProps {
  notebookName: string;
  teachers: (string | Teacher)[];
  newTeachers?: Teacher[];
  removedTeachers?: Teacher[];
  onBack: () => void;
  onNext: () => void;
  notebookType?: 'class' | 'staff';
}

export const AddTeacherPreviewStep = memo(function AddTeacherPreviewStep({
  notebookName,
  teachers,
  newTeachers,
  removedTeachers,
  onBack,
  onNext,
  notebookType = 'class',
}: AddTeacherPreviewStepProps) {
  const isStaff = notebookType === 'staff';

  const getTeacherDisplay = (teacher: string | Teacher) => {
    if (typeof teacher === 'string') {
      return teacher;
    }
    return teacher.name;
  };

  // Use newTeachers and removedTeachers if provided, otherwise fall back to teachers
  const addedTeachers = newTeachers || teachers;
  const teachersToRemove = removedTeachers || [];

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="mt-[68px]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff] transition-all mb-8 -ml-2 px-2 py-1 rounded hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>
      
      <h1 className="text-[#323130] dark:text-[#ffffff] mb-6" style={{ fontSize: '20px' }}>
        {isStaff
          ? 'Did we get this right? Please confirm the co-owner changes.'
          : 'Did we get this right? Please confirm the teacher changes.'}
      </h1>
      
      {/* Added Teachers Section */}
      {addedTeachers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[#323130] dark:text-[#ffffff] mb-4">
            Add {addedTeachers.length} new {isStaff ? 'co-owner' : 'teacher'}(s)
          </h2>
          
          <div className="space-y-2">
            {addedTeachers.map((teacher, index) => {
              const isTeacherObject = typeof teacher !== 'string';
              return (
                <div key={index} className="flex items-center gap-2">
                  {isTeacherObject && teacher.photo && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f3f2f1] dark:bg-[#3d3d3d] rounded-full border border-[#d1d1d1] dark:border-[#5d5d5d]">
                      <img 
                        src={teacher.photo} 
                        alt={teacher.name} 
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-sm text-[#323130] dark:text-[#ffffff]">
                        {teacher.name}
                      </span>
                    </div>
                  )}
                  {!isTeacherObject && (
                    <span className="text-[#323130] dark:text-[#ffffff] pl-4">{teacher}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Removed Teachers Section */}
      {teachersToRemove.length > 0 && (
        <div className="mb-12">
          <h2 className="text-[#323130] dark:text-[#ffffff] mb-4">
            Remove {teachersToRemove.length} {isStaff ? 'co-owner' : 'teacher'}(s)
          </h2>
          
          <div className="space-y-2">
            {teachersToRemove.map((teacher, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f3f2f1] dark:bg-[#3d3d3d] rounded-full border border-[#d1d1d1] dark:border-[#5d5d5d]">
                  {teacher.photo && (
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm text-[#323130] dark:text-[#ffffff]">
                    {teacher.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show message if no changes */}
      {addedTeachers.length === 0 && teachersToRemove.length === 0 && (
        <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-12">
          {isStaff ? 'No changes to co-owners.' : 'No changes to teachers.'}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={addedTeachers.length === 0 && teachersToRemove.length === 0}
          className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-8 rounded disabled:bg-[#f3f2f1] disabled:text-[#a19f9d] disabled:hover:bg-[#f3f2f1] disabled:cursor-not-allowed"
        >
          Update
        </Button>
      </div>
    </div>
  );
});