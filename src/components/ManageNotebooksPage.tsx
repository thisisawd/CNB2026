import { ChevronLeft } from 'lucide-react';
import { memo, useState } from 'react';
import NotebookIcon from '../imports/NotebookIcon';
import { NotebookDetailsPage } from './NotebookDetailsPage';

interface Notebook {
  id: string;
  name: string;
  createdAt: string;
  isTeams?: boolean;
  studentSections?: string[];
  type?: 'class' | 'staff';
}

interface ManageNotebooksPageProps {
  notebooks: Notebook[];
  onBack: () => void;
  onUpdateNotebook: (notebook: Notebook) => void;
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

export const ManageNotebooksPage = memo(function ManageNotebooksPage({ notebooks, onBack, onUpdateNotebook, notebookType = 'class' }: ManageNotebooksPageProps) {
  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(null);

  // Filter notebooks by type
  const filteredNotebooks = notebooks.filter(nb => nb.type === notebookType);

  if (selectedNotebook) {
    return (
      <NotebookDetailsPage
        notebook={selectedNotebook}
        onBack={() => setSelectedNotebook(null)}
        onUpdateNotebook={(updated) => {
          onUpdateNotebook(updated);
          setSelectedNotebook(updated);
        }}
        notebookType={notebookType}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#605e5c] hover:text-[#323130] transition-all mb-8 -ml-2 px-2 py-1 rounded hover:bg-[#f3f2f1]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-[#323130] mb-2" style={{ fontSize: '28px' }}>
          Select a notebook to manage
        </h1>
        
        <p className="text-[#605e5c] mb-8">
          (Teams) indicates that a notebook was created in Microsoft Teams
        </p>

        <div className="space-y-4">
          {filteredNotebooks.length === 0 ? (
            <div className="text-[#605e5c] text-center py-12">
              No notebooks created yet. Create your first notebook to get started.
            </div>
          ) : (
            filteredNotebooks.map((notebook, index) => (
              <div
                key={notebook.id}
                className="flex items-center gap-3 p-4 bg-white border border-[#edebe9] rounded hover:border-[#8a8886] hover:shadow-sm transition-all cursor-pointer"
                onClick={() => setSelectedNotebook(notebook)}
              >
                <NotebookIcon 
                  color={NOTEBOOK_COLORS[index % NOTEBOOK_COLORS.length]} 
                  className="w-6 h-6 flex-shrink-0" 
                />
                <div className="flex-1">
                  <span className="text-[#323130]">{notebook.name}</span>
                  {notebook.isTeams && (
                    <span className="text-[#605e5c] ml-2">(Teams)</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
});