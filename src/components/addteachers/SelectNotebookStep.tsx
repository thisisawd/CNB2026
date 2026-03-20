import { memo } from 'react';
import { ChevronLeft } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="mt-[68px]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff] transition-all mb-8 -ml-2 px-2 py-1 rounded hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-[#323130] dark:text-[#ffffff] mb-2" style={{ fontSize: '28px' }}>
          {isStaff
            ? 'Select the notebook to add or remove co-owners'
            : 'Which class notebook would you like to add teachers to?'}
        </h1>
      </div>

      <div className="space-y-3">
        {filteredNotebooks.length === 0 ? (
          <div className="text-[#605e5c] dark:text-[#d0d0d0] text-center py-12">
            No notebooks created yet. Create your first notebook to get started.
          </div>
        ) : (
          filteredNotebooks.map((notebook, index) => (
            <div
              key={notebook.id}
              onClick={() => onSelect(notebook.id)}
              className={`flex items-center gap-3 p-4 bg-white dark:bg-[#2b2b2b] border rounded cursor-pointer transition-all ${
                selectedNotebookId === notebook.id
                  ? 'border-[#7719AA] bg-[#f3f2f1] dark:bg-[#3d3d3d]'
                  : 'border-[#edebe9] dark:border-[#5d5d5d] hover:border-[#8a8886] dark:hover:border-[#8a8886] hover:shadow-sm'
              }`}
            >
              <NotebookIcon 
                color={NOTEBOOK_COLORS[index % NOTEBOOK_COLORS.length]} 
                className="w-6 h-6 flex-shrink-0" 
              />
              <span className="text-[#323130] dark:text-[#ffffff]">{notebook.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
});