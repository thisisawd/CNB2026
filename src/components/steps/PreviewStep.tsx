import { ChevronLeft, BookOpen } from 'lucide-react';
import { memo, useState } from 'react';
import { Button } from '../ui/button';
import notebookIcon from 'figma:asset/80fa9b5015278767c625ee32c5e7b1597a02f0ca.png';
import tabIcon from 'figma:asset/cce56037713ebe0db120d7c4c1dfe46163a14419.png';

interface PreviewStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  notebookType?: 'class' | 'staff';
}

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

export const PreviewStep = memo(function PreviewStep({ data, onNext, onBack, notebookType = 'class' }: PreviewStepProps) {
  const isStaff = notebookType === 'staff';
  const [activeTab, setActiveTab] = useState<'teacher' | 'student'>(isStaff ? 'teacher' : 'student');
  
  const studentSections = data.studentSections || (isStaff 
    ? ['Professional Development', 'Classroom Observations', 'Lesson Plan Feedback', 'Evaluation', 'Parent Communication']
    : ['Handouts', 'Class Notes', 'Homework', 'Quizzes']);
  const notebookName = data.name || 'My Class Notebook';
  const students = data.students || [];
  
  // Helper function to get student name (handles both string and object formats)
  const getStudentName = (student: any): string => {
    if (typeof student === 'string') {
      return student;
    }
    return student?.name || '';
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="mb-8 mt-[68px]">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-[#7719AA] hover:text-[#6b15a0] mb-4"
          style={{ fontSize: '14px' }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <h1 className="text-[#323130] mb-8" style={{ fontSize: '24px' }}>
          Did we get this right? Please confirm with the visual preview
        </h1>
        
        {/* Tab switcher */}
        <div className="flex justify-end gap-0 mb-4">
          <button
            onClick={() => setActiveTab('teacher')}
            className={`px-4 py-2 border border-b-0 rounded-t transition-colors ${
              activeTab === 'teacher'
                ? 'bg-white border-[#d1d1d1] text-[#323130] relative z-10'
                : 'bg-[#f3f2f1] border-transparent text-[#605e5c] hover:bg-[#edebe9]'
            }`}
          >
            {isStaff ? "Staff leader's notebook" : "Teacher's notebook"}
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`px-4 py-2 border border-b-0 rounded-t transition-colors ${
              activeTab === 'student'
                ? 'bg-white border-[#d1d1d1] text-[#7719AA] relative z-10'
                : 'bg-[#f3f2f1] border-transparent text-[#605e5c] hover:bg-[#edebe9]'
            }`}
          >
            {isStaff ? "Staff member's notebook" : "Student's notebook"}
          </button>
        </div>

        {/* Notebook preview */}
        <div className="border border-[#d1d1d1] rounded bg-white overflow-hidden" style={{ minHeight: '500px' }}>
          {/* Purple header bar */}
          <div className="h-3 bg-[#7719AA]"></div>
          
          {/* Notebook name */}
          <div className="px-6 py-4 border-b border-[#edebe9]">
            <div className="flex items-center gap-2">
              <img src={notebookIcon} alt="" className="w-6 h-6" />
              <span className="text-[#323130]">{notebookName}</span>
            </div>
          </div>

          <div className="flex" style={{ height: '450px' }}>
            {/* Left sidebar */}
            <div className="w-64 border-r border-[#edebe9] p-4 bg-[#faf9f8]">
              <div className="space-y-1">
                {/* Welcome */}
                <div className="flex items-center gap-2 px-2 py-1.5 text-[#323130] text-sm">
                  <img src={tabIcon} alt="" className="w-2 h-5" style={{ filter: 'hue-rotate(200deg) brightness(0.8) saturate(1.5)' }} />
                  <span>Welcome</span>
                </div>

                {/* Collaboration Space */}
                <div className="flex items-center gap-2 px-2 py-1.5 text-[#323130] text-sm">
                  <img src={tabIcon} alt="" className="w-2 h-5" style={{ filter: 'hue-rotate(200deg) brightness(0.8) saturate(1.5)' }} />
                  <span>_Collaboration Space</span>
                </div>

                {/* Content Library */}
                <div className="flex items-center gap-2 px-2 py-1.5 text-[#323130] text-sm">
                  <img src={tabIcon} alt="" className="w-2 h-5" style={{ filter: 'hue-rotate(200deg) brightness(0.8) saturate(1.5)' }} />
                  <span>_Content Library</span>
                </div>

                {/* Teacher Only - only show in teacher view */}
                {activeTab === 'teacher' && (
                  <div className="flex items-center gap-2 px-2 py-1.5 text-[#323130] text-sm">
                    <img src={tabIcon} alt="" className="w-2 h-5" style={{ filter: 'hue-rotate(200deg) brightness(0.8) saturate(1.5)' }} />
                    <span>{isStaff ? '_Leader Only' : '_Teacher Only'}</span>
                  </div>
                )}

                {/* Student tabs - only show in teacher view if students exist */}
                {activeTab === 'teacher' && students.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {students.map((student: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 px-2 py-1.5 text-[#323130] text-sm">
                        <img src={tabIcon} alt="" className="w-2 h-5" style={{ filter: 'hue-rotate(200deg) brightness(0.8) saturate(1.5)' }} />
                        <span>{getStudentName(student)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Student's section group - only show in student view */}
                {activeTab === 'student' && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 px-2 py-1.5 text-[#323130] text-sm">
                      <img src={tabIcon} alt="" className="w-2 h-5" style={{ filter: 'hue-rotate(200deg) brightness(0.8) saturate(1.5)' }} />
                      <span>{isStaff ? "Staff member's section group" : "Student's section group"}</span>
                    </div>

                    {/* Student sections (indented) */}
                    <div className="ml-4 mt-1 space-y-1">
                      {studentSections.map((section: string, index: number) => {
                        const colorIndex = index % SECTION_COLORS.length;
                        const color = SECTION_COLORS[colorIndex];
                        
                        return (
                          <div key={index} className="flex items-center gap-2 px-2 py-1.5 text-[#605e5c] text-sm">
                            <img 
                              src={tabIcon} 
                              alt="" 
                              className="w-2 h-5" 
                              style={{ filter: `hue-rotate(${colorIndex * 45}deg) brightness(0.9) saturate(1.2)` }} 
                            />
                            <span>{section}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 bg-white">
              {/* Content placeholder */}
              <div className="px-6 py-6 space-y-4">
                <div className="h-8 bg-[#f3f2f1] rounded w-3/4"></div>
                <div className="h-4 bg-[#faf9f8] rounded w-full"></div>
                <div className="h-4 bg-[#faf9f8] rounded w-5/6"></div>
                
                <div className="mt-6 space-y-3">
                  <div className="h-20 bg-[#f3f2f1] rounded"></div>
                  <div className="h-20 bg-[#f3f2f1] rounded"></div>
                  <div className="h-20 bg-[#f3f2f1] rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-[#8a8886] text-[#323130] hover:bg-[#f3f2f1] rounded"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-6 rounded"
        >
          {isStaff ? 'Create' : 'Create Notebook'}
        </Button>
      </div>
    </div>
  );
});