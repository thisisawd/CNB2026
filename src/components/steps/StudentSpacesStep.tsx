import { ChevronLeft, Plus, X } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { F2Button, F2BackButton } from '../fluent2/FluentAdapters';
import tabIcon from 'figma:asset/cce56037713ebe0db120d7c4c1dfe46163a14419.png';

interface StudentSpacesStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  notebookType?: 'class' | 'staff';
}

const DEFAULT_SECTIONS = ['Handouts', 'Class Notes', 'Homework', 'Quizzes'];
const DEFAULT_STAFF_SECTIONS = ['Professional Development', 'Classroom Observations', 'Lesson Plan Feedback', 'Evaluation', 'Parent Communication'];

// Microsoft Fluent color palette for section icons
const SECTION_COLORS = [
  '#7FB3E4', // Blue
  '#8363C1', // Purple
  '#228286', // Teal
  '#267B1F', // Green
  '#CA5010', // Orange
  '#D13438', // Red
  '#8764B8', // Violet
  '#00B7C3', // Cyan
];

export const StudentSpacesStep = memo(function StudentSpacesStep({ data, onDataChange, onNext, onBack, notebookType = 'class' }: StudentSpacesStepProps) {
  const [newSection, setNewSection] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const isStaff = notebookType === 'staff';

  // Initialize sections if not already set
  const sections = data.studentSections || (isStaff ? DEFAULT_STAFF_SECTIONS : DEFAULT_SECTIONS);

  const addSection = useCallback(() => {
    if (newSection.trim()) {
      onDataChange({
        ...data,
        studentSections: [...sections, newSection.trim()],
      });
      setNewSection('');
      setIsAdding(false);
    }
  }, [newSection, sections, data, onDataChange]);

  const removeSection = useCallback((index: number) => {
    onDataChange({
      ...data,
      studentSections: sections.filter((_: string, i: number) => i !== index),
    });
  }, [sections, data, onDataChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSection();
    } else if (e.key === 'Escape') {
      setNewSection('');
      setIsAdding(false);
    }
  }, [addSection]);

  return (
    <div className="max-w-2xl mx-auto px-8 py-12">
      <div className="mb-12 mt-[68px]">
        <F2BackButton onClick={onBack} />
        
        <h2 className="text-[#323130] dark:text-[#ffffff] mb-6" style={{ fontSize: '20px' }}>
          {isStaff
            ? "Almost there! What should be inside each member's private space?"
            : "Almost there! What should be inside each student's private space?"
          }
        </h2>
        
        <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-8">
          {isStaff
            ? "These sections will be created in every staff members' private notebook. Here are a few suggestions:*"
            : "These sections will be created in every student's private notebook. Here are a few suggestions.*"
          }
        </p>
        
        {/* Sections list */}
        <div className="space-y-3 mb-4">
          {sections.map((section: string, index: number) => {
            const iconColor = SECTION_COLORS[index % SECTION_COLORS.length];
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white dark:bg-[#1f1f1f] border border-[#edebe9] dark:border-[#3d3d3d] rounded hover:border-[#d1d1d1] dark:hover:border-[#5d5d5d] transition-colors group"
              >
                <img src={tabIcon} alt="" className="w-2 h-5 flex-shrink-0" style={{ filter: 'grayscale(100%)' }} />
                <span className="flex-1 text-[#323130] dark:text-[#ffffff]">{section}</span>
                <button
                  onClick={() => removeSection(index)}
                  className="text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {/* Add section input */}
          {isAdding && (
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#292929] border border-[#8661c5] rounded">
              <img src={tabIcon} alt="" className="w-2 h-5 flex-shrink-0" style={{ filter: 'grayscale(100%)' }} />
              <input
                type="text"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  if (!newSection.trim()) {
                    setIsAdding(false);
                  }
                }}
                placeholder="Section name"
                className="flex-1 outline-none text-[#323130] dark:text-[#ffffff] bg-transparent placeholder:text-[#707070] dark:placeholder:text-[#8a8886] no-fluent-style"
                style={{ border: 'none' }}
                autoFocus
              />
              <button
                onClick={() => {
                  setNewSection('');
                  setIsAdding(false);
                }}
                className="text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Add section button */}
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 text-[#8661c5] hover:text-[#6b4ca3] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add section</span>
        </button>
      </div>
      
      <div className="flex justify-end gap-3">
        <F2Button
          onClick={onBack}
          variant="outline"
        >
          Back
        </F2Button>
        <F2Button
          onClick={onNext}
          accentColor="#7719AA"
          accentHover="#6b15a0"
          className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-6 rounded"
        >
          Next
        </F2Button>
      </div>
    </div>
  );
});