import { memo, useCallback } from 'react';
import { F2Button, F2BackButton, F2Input } from '../fluent2/FluentAdapters';

interface NotebookNameStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  notebookType?: 'class' | 'staff';
}

export const NotebookNameStep = memo(function NotebookNameStep({ data, onDataChange, onNext, onBack, notebookType = 'class' }: NotebookNameStepProps) {
  const handleNameChange = useCallback((e: any) => {
    onDataChange({ ...data, name: e.target.value });
  }, [data, onDataChange]);

  const accentColor = '#7719AA';
  const heading = notebookType === 'staff' 
    ? "What's the name of your staff notebook?"
    : "What's the name of your class?";
  const subtext = notebookType === 'staff'
    ? "This will be the name of your staff notebook*"
    : "This will be the name of your class notebook*";
  const placeholder = notebookType === 'staff'
    ? "For example, Seattle District Staff Notebook"
    : "For example, Biology 3 period 2";

  return (
    <div className="max-w-3xl mx-auto px-8 py-6">
      <div className="mb-12 mt-[32px]">
        <F2BackButton onClick={onBack} />
        
        <h1 className="text-[#323130] dark:text-[#ffffff] mb-6" style={{ fontSize: '28px' }}>
          {heading}
        </h1>
        
        <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-4" style={{ fontSize: '13px' }}>
          {subtext}
        </p>
        
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <F2Input
              type="text"
              placeholder={placeholder}
              value={data.name}
              onChange={handleNameChange}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <F2Button
          onClick={onNext}
          disabled={!data.name.trim()}
          accentColor={accentColor}
          accentHover={'#6b15a0'}
          className="text-white px-6 rounded disabled:bg-[#f3f2f1] disabled:text-[#a19f9d] disabled:hover:bg-[#f3f2f1] disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: data.name.trim() ? accentColor : undefined }}
          onMouseEnter={(e) => {
            if (data.name.trim()) {
              (e.target as HTMLElement).style.backgroundColor = '#6b15a0';
            }
          }}
          onMouseLeave={(e) => {
            if (data.name.trim()) {
              (e.target as HTMLElement).style.backgroundColor = accentColor;
            }
          }}
        >
          Next
        </F2Button>
      </div>
    </div>
  );
});