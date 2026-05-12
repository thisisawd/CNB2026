import { Search, Plus } from 'lucide-react';
import { memo } from 'react';

interface WaffleMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AppTile {
  name: string;
  letter: string;
  bg: string;
}

const APPS: AppTile[] = [
  { name: 'Microsoft 365 Copilot', letter: 'M', bg: 'linear-gradient(135deg,#7b68ee,#ff6b6b,#ffd93d)' },
  { name: 'Outlook', letter: 'O', bg: '#0078d4' },
  { name: 'OneDrive', letter: 'O', bg: '#0364b8' },
  { name: 'Word', letter: 'W', bg: '#185abd' },
  { name: 'Excel', letter: 'X', bg: '#107c41' },
  { name: 'PowerPoint', letter: 'P', bg: '#c43e1c' },
  { name: 'OneNote', letter: 'N', bg: '#7719AA' },
  { name: 'SharePoint', letter: 'S', bg: '#038387' },
  { name: 'Teams', letter: 'T', bg: '#5059c9' },
  { name: 'Sway', letter: 'S', bg: '#008272' },
  { name: 'Forms', letter: 'F', bg: '#038387' },
  { name: 'Class Notebook', letter: 'N', bg: '#7719AA' },
  { name: 'Kaizala', letter: 'K', bg: '#0078d4' },
  { name: 'Power Apps', letter: 'P', bg: '#742774' },
  { name: 'More apps', letter: '⊞', bg: '#605e5c' },
];

const CREATE_TILES: AppTile[] = [
  { name: 'Document', letter: 'D', bg: '#185abd' },
  { name: 'Workbook', letter: 'X', bg: '#107c41' },
  { name: 'Presentation', letter: 'P', bg: '#c43e1c' },
  { name: 'Survey', letter: 'F', bg: '#038387' },
  { name: 'Create more', letter: '+', bg: 'transparent' },
];

function Tile({ app, isCreateMore }: { app: AppTile; isCreateMore?: boolean }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] transition-colors"
    >
      {isCreateMore ? (
        <div className="w-9 h-9 rounded-full border border-[#605e5c] dark:border-[#a0a0a0] flex items-center justify-center text-[#605e5c] dark:text-[#a0a0a0]">
          <Plus className="w-4 h-4" />
        </div>
      ) : (
        <div
          className="w-9 h-9 rounded flex items-center justify-center text-white text-[14px] font-semibold"
          style={{ background: app.bg }}
        >
          {app.letter}
        </div>
      )}
      <span className="text-[11px] text-[#323130] dark:text-[#d0d0d0] text-center leading-tight">
        {app.name}
      </span>
    </button>
  );
}

export const WaffleMenu = memo(function WaffleMenu({ isOpen, onClose }: WaffleMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div className="absolute top-12 left-0 z-50 bg-white dark:bg-[#2b2b2b] shadow-lg dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)] rounded-md w-[440px] p-4 border border-transparent dark:border-[#3d3d3d]">
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#605e5c] dark:text-[#a0a0a0]" />
          <input
            type="text"
            placeholder="Find Microsoft 365 apps"
            className="w-full pl-9 pr-3 py-2 bg-[#f3f2f1] dark:bg-[#1e1e1e] border border-transparent dark:border-[#3d3d3d] rounded text-[13px] text-[#323130] dark:text-[#ffffff] placeholder:text-[#605e5c] dark:placeholder:text-[#a0a0a0] outline-none focus:border-[#0078d4]"
          />
        </div>

        {/* Apps grid */}
        <div className="grid grid-cols-5 gap-1">
          {APPS.map((app) => (
            <Tile key={app.name} app={app} />
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#edebe9] dark:border-[#3d3d3d] my-3" />

        {/* Create new */}
        <div className="grid grid-cols-5 gap-1">
          {CREATE_TILES.map((app) => (
            <Tile key={app.name} app={app} isCreateMore={app.letter === '+'} />
          ))}
        </div>
      </div>
    </>
  );
});
