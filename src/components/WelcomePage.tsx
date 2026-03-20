import { memo, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CNBBackgroundGradient } from './CNBBackgroundGradient';
import BackpackIcon from '../imports/backpack-icon';
import createNotebookIcon from 'figma:asset/2f173971636b421ff0273180a4600c3546b454b0.png';
import createStaffNotebookIcon from 'figma:asset/3a975afe9c0dd16c1341fb550f63e4838acc47a0.png';
import studentsIcon from 'figma:asset/286689605a02652f0f3caddb7bd9d873df1bee4c.png';
import studentsIconAlt1 from 'figma:asset/ad90c25bb85d91f5b753ee4bac48ec1183080283.png';
import teachersIcon from 'figma:asset/7f9b25071bcf91f545dddf31f7d7402a0958b02c.png';
import teachersIconAlt1 from 'figma:asset/fda74c55ddc3678091a07337db1c999712a5d995.png';
import manageNotebooksIcon from 'figma:asset/06430bd97958568f7ca0c534a55c620123e1f031.png';

interface WelcomePageProps {
  onCreateNotebook: () => void;
  onManageNotebooks: () => void;
  onAddTeachers: () => void;
  onAddStudents: () => void;
  featureFlags?: Record<string, boolean>;
  notebookType?: 'class' | 'staff';
}

export const WelcomePage = memo(function WelcomePage({ onCreateNotebook, onManageNotebooks, onAddTeachers, onAddStudents, featureFlags = {}, notebookType = 'class' }: WelcomePageProps) {
  const useAlt1Icons = featureFlags.teacher_student_icon_alt1;
  const isStaff = notebookType === 'staff';

  const cards = useMemo(() => [
    {
      id: 'create',
      icon: <ImageWithFallback src={isStaff ? createStaffNotebookIcon : createNotebookIcon} alt={isStaff ? "Create a staff notebook" : "Create Class Notebook"} className="w-12 h-12" />,
      label: isStaff ? 'Create a staff notebook' : 'Create a Class Notebook',
      onClick: onCreateNotebook,
    },
    {
      id: 'students',
      icon: useAlt1Icons 
        ? <ImageWithFallback src={studentsIconAlt1} alt={isStaff ? "Add or remove staff members" : "Add or remove students"} className="w-12 h-12" />
        : <ImageWithFallback src={studentsIcon} alt={isStaff ? "Add or remove staff members" : "Add or remove students"} className="w-12 h-12" />,
      label: isStaff ? 'Add or remove staff members' : 'Add or remove students',
      onClick: onAddStudents,
    },
    {
      id: 'teachers',
      icon: useAlt1Icons 
        ? <ImageWithFallback src={teachersIconAlt1} alt={isStaff ? "Add or remove notebook co-owners" : "Add or remove teachers"} className="w-12 h-12" />
        : <ImageWithFallback src={teachersIcon} alt={isStaff ? "Add or remove notebook co-owners" : "Add or remove teachers"} className="w-12 h-12" />,
      label: isStaff ? 'Add or remove notebook co-owners' : 'Add or remove teachers',
      onClick: onAddTeachers,
    },
    {
      id: 'manage',
      icon: <ImageWithFallback src={manageNotebooksIcon} alt="Manage existing notebooks" className="w-12 h-12" />,
      label: 'Manage notebooks',
      onClick: onManageNotebooks,
    },
  ], [useAlt1Icons, isStaff, onCreateNotebook, onManageNotebooks, onAddTeachers, onAddStudents]);

  return (
    <CNBBackgroundGradient className="min-h-screen bg-white dark:bg-[#1f1f1f] flex flex-col items-center p-8 overflow-y-auto">
      <div className="max-w-5xl w-full flex-shrink-0 pt-8 sm:pt-12 pb-8">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1 className="text-[#323130] dark:text-[#ffffff] mb-3 sm:mb-4 text-[20px] sm:text-[24px] md:text-[28px] leading-tight">
            {isStaff 
              ? <>Welcome to the OneNote Staff Notebook for Education</>
              : <>Welcome to <span className="text-[#7719AA]">OneNote Class Notebook</span></>
            }
          </h1>
          <p className="text-[#605e5c] dark:text-[#d0d0d0] text-[13px] sm:text-[14px] md:text-[15px]">
            {isStaff 
              ? 'We will help you create a notebook you can use with your staff'
              : 'We will help you create a notebook you can use in your classroom.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
          {cards.map((card, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center gap-4 p-6 bg-white dark:bg-[#2b2b2b] rounded-[16px] border border-transparent dark:border-[#3d3d3d] transition-all duration-200 ease-out cursor-pointer min-h-[180px] shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.132),0_0.3px_0.9px_0_rgba(0,0,0,0.108)] dark:shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.3),0_0.3px_0.9px_0_rgba(0,0,0,0.2)] hover:shadow-[0_6.4px_14.4px_0_rgba(0,0,0,0.132),0_1.2px_3.6px_0_rgba(0,0,0,0.108)] dark:hover:shadow-[0_6.4px_14.4px_0_rgba(0,0,0,0.4),0_1.2px_3.6px_0_rgba(0,0,0,0.3)] hover:-translate-y-2 active:scale-[0.98] active:translate-y-0"
              onClick={card.onClick}
            >
              <div className="w-12 h-12 flex items-center justify-center">
                {card.icon}
              </div>
              <span className="text-[#323130] dark:text-[#ffffff] text-center text-sm">
                {card.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </CNBBackgroundGradient>
  );
});