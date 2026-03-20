import { ChevronLeft } from 'lucide-react';
import { memo } from 'react';
import NotebookIcon from '../../imports/NotebookIcon';

interface Notebook {
  id: string;
  name: string;
  createdAt: string;
  type?: 'class' | 'staff';
}

interface SelectNotebookStepProps {
  notebooks: Notebook[];
  selectedNotebookId: string;
  onSelect: (notebookId: string) => void;
  onBack: () => void;
  notebookType?: 'class' | 'staff';
}

const NOTEBOOK_COLORS = [
  '#7719AA', // Purple
  '#029DD4', // Blue
  '#00A6A6', // Teal
  '#F26D21', // Orange
  '#E03B8B', // Pink
  '#00B7C3', // Cyan
  '#8764B8', // Violet
  '#038387', // Dark Teal
];

export const SelectNotebookStep = memo(function SelectNotebookStep({ 
  notebooks, 
  selectedNotebookId, 
  onSelect,
  onBack,
  notebookType = 'class'
}: SelectNotebookStepProps) {
  const isStaff = notebookType === 'staff';
  
  // Filter notebooks by type
  const filteredNotebooks = notebooks.filter(nb => nb.type === notebookType);

  return (
    <div className="max-w-3xl mx-auto px-8 py-6">
      <div className="mb-12 mt-[32px]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff] transition-all mb-8 -ml-2 px-2 py-1 rounded hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-[#323130] dark:text-[#ffffff] mb-6" style={{ fontSize: '28px' }}>
          {isStaff
            ? 'Which staff notebook would you like to add staff members to?'
            : 'Which class notebook would you like to add or remove students from?'}
        </h1>
        
        <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-4" style={{ fontSize: '13px' }}>
          {isStaff
            ? <>Select the notebook to add a staff member to<span className="text-[#a4262c]">*</span></>
            : <>Select the notebook to add a student to<span className="text-[#a4262c]">*</span></>}
        </p>
      </div>

      <div className="space-y-3">
        {filteredNotebooks.length === 0 ? (
          <div className="text-[#605e5c] text-center py-12">
            No notebooks created yet. Create your first notebook to get started.
          </div>
        ) : (
          filteredNotebooks.map((notebook, index) => (
            <div
              key={notebook.id}
              onClick={() => onSelect(notebook.id)}
              className={`flex items-center gap-3 p-4 bg-white border rounded cursor-pointer transition-all ${
                selectedNotebookId === notebook.id
                  ? 'border-[#7719AA] bg-[#f3f2f1]'
                  : 'border-[#edebe9] hover:border-[#8a8886] hover:shadow-sm'
              }`}
            >
              <NotebookIcon 
                color={NOTEBOOK_COLORS[index % NOTEBOOK_COLORS.length]} 
                className="w-6 h-6 flex-shrink-0" 
              />
              <span className="text-[#323130]">{notebook.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
});