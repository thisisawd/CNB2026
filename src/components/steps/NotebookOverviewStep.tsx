import { ChevronLeft, Users, BookOpen, Lock, Notebook, GraduationCap, EyeOff, Pencil, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import contentLibraryIcon from 'figma:asset/01c86e909d15cfd069e215329b0b0ca4839c68dc.png';
import collaborationSpaceIcon from 'figma:asset/c1bc9c27e626cbe32d6717719c650031195f5eac.png';
import studentNotebooksIcon from 'figma:asset/e01a2f1abfc5910baf9d691a79a2300dd221b166.png';
import teacherOnlyIcon from 'figma:asset/9c51044c3d995c7014de5806fb0c5521aded090a.png';

interface NotebookOverviewStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  featureFlags?: Record<string, boolean>;
  notebookType?: 'class' | 'staff';
}

interface SectionBadge {
  icon: React.ReactNode;
  text: string;
  disabled?: boolean;
}

interface NotebookSection {
  icon: React.ReactNode;
  title: string;
  description: string;
  badges: SectionBadge[];
  showBadgeLabel?: boolean;
}

export function NotebookOverviewStep({ data, onDataChange, onNext, onBack, featureFlags = {}, notebookType = 'class' }: NotebookOverviewStepProps) {
  const sections: NotebookSection[] = notebookType === 'staff' ? [
    {
      icon: <ImageWithFallback src={collaborationSpaceIcon} alt="Collaboration Space" className="w-5 h-5 text-[#8661c5]" />,
      title: 'Collaboration Space',
      description: 'All staff can work together',
      badges: [
        { icon: <Pencil className="w-4 h-4" />, text: 'Staff leader can edit the content' },
        { icon: <Pencil className="w-4 h-4" />, text: 'Staff member can edit the content', disabled: true },
      ],
    },
    {
      icon: <ImageWithFallback src={contentLibraryIcon} alt="Content Library" className="w-5 h-5 text-[#8661c5]" />,
      title: 'Content Library',
      description: 'Publish read-only materials to staff members',
      badges: [
        { icon: <Pencil className="w-4 h-4" />, text: 'Staff leader can edit the content' },
        { icon: <Eye className="w-4 h-4" />, text: 'Staff member can only view the content', disabled: true },
      ],
    },
    {
      icon: <ImageWithFallback src={teacherOnlyIcon} alt="Leader Only" className="w-5 h-5 text-[#8661c5]" />,
      title: 'Leader Only',
      description: 'A private space for leaders',
      badges: [
        { icon: <Pencil className="w-4 h-4" />, text: 'Staff leader can edit the content' },
        { icon: <EyeOff className="w-4 h-4" />, text: 'Staff member cannot view content', disabled: true },
      ],
    },
    {
      icon: <ImageWithFallback src={studentNotebooksIcon} alt="Private Notebooks" className="w-5 h-5 text-[#8661c5]" />,
      title: 'Private Notebooks',
      description: 'A private space for each staff member',
      badges: [
        { icon: <Pencil className="w-4 h-4" />, text: 'Staff leader can edit the content' },
        { icon: <Pencil className="w-4 h-4" />, text: 'Staff member can edit his or her own content and can\'t view others\' notebooks', disabled: true },
      ],
    },
  ] : [
    {
      icon: <ImageWithFallback src={collaborationSpaceIcon} alt="Collaboration Space" className="w-5 h-5 text-[#8661c5]" />,
      title: 'Collaboration Space',
      description: 'Students and teachers can work together',
      badges: [
        { icon: <Pencil className="w-4 h-4" />, text: 'Teacher can edit' },
        { icon: <Pencil className="w-4 h-4" />, text: 'Student can edit', disabled: true },
      ],
    },
    {
      icon: <ImageWithFallback src={contentLibraryIcon} alt="Content Library" className="w-5 h-5 text-[#8661c5]" />,
      title: 'Content Library',
      description: 'Publish course materials to students',
      badges: [
        { icon: <Pencil className="w-4 h-4" />, text: 'Teacher can edit' },
        { icon: <Eye className="w-4 h-4" />, text: 'Student can view', disabled: true },
      ],
    },
    {
      icon: <ImageWithFallback src={teacherOnlyIcon} alt="Teacher-Only Section" className="w-5 h-5 text-[#8661c5]" />,
      title: 'Teacher-Only Section',
      description: 'A private space for teachers',
      badges: [
        { icon: <Pencil className="w-4 h-4" />, text: 'Teacher can edit' },
        { icon: <EyeOff className="w-4 h-4" />, text: 'Student can\'t view', disabled: true },
      ],
    },
    {
      icon: <ImageWithFallback src={studentNotebooksIcon} alt="Student Notebooks" className="w-5 h-5 text-[#8661c5]" />,
      title: 'Student Notebooks',
      description: 'A private space for each student',
      badges: [
        { icon: <Pencil className="w-4 h-4" />, text: 'Teacher can edit' },
        { icon: <Pencil className="w-4 h-4" />, text: 'Student can edit', disabled: true },
      ],
    },
  ];

  const subheadingText = notebookType === 'staff' 
    ? 'These areas will be section groups of your staff notebook*'
    : 'These areas will be section groups of your class notebook';

  return (
    <div className="max-w-4xl mx-auto px-8 py-6">
      <div className="mb-12 mt-[32px]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff] transition-all mb-8 -ml-2 px-2 py-1 rounded hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <h1 className="text-[#323130] dark:text-[#ffffff] mb-3" style={{ fontSize: '28px' }}>
          Great! We'll create <span className="text-[#8661c5] dark:text-[#8661c5]">{data.name || 'your notebook'}</span> for you. Here's what will be inside:
        </h1>
        
        <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-6" style={{ fontSize: '13px' }}>
          {subheadingText}
        </p>
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white dark:bg-[#2b2b2b] rounded-lg border border-[#e1dfdd] dark:border-[#3d3d3d]"
            >
              <div className="flex gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EDEBE9] dark:bg-[#EDEBE9] flex items-center justify-center">
                  {section.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#323130] dark:text-[#ffffff] mb-1">
                    {section.title}
                  </h3>
                  <p className="text-[#605e5c] dark:text-[#d0d0d0] text-sm">
                    {section.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                {section.badges.map((badge, badgeIndex) => (
                  <div
                    key={badgeIndex}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap w-fit ${
                      badge.disabled
                        ? 'bg-[#f3f2f1] dark:bg-[#3d3d3d] text-[#a19f9d] dark:text-[#8a8886]'
                        : 'bg-[#f3e6ff] dark:bg-[#3d2b4d] text-[#8661c5] dark:text-[#b59dd8]'
                    }`}
                  >
                    <span className="flex-shrink-0">{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-[#8a8886] text-[#323130] dark:text-[#ffffff] dark:border-[#8a8886] hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] rounded"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-6 rounded"
        >
          Next
        </Button>
      </div>
    </div>
  );
}