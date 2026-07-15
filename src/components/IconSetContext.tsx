import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import classNotebookIconDark from '../assets/CNB_ICON_V2.png';
import staffNotebookIconDark from '../assets/SNB_ICON_V2.png';
import classNotebookIconLight from '../assets/CNB_Light.png';
import staffNotebookIconLight from '../assets/SNB_Light.png';

export interface IconSetOption {
  key: string;
  label: string;
}

export const ICON_SETS: IconSetOption[] = [
  { key: 'onenote-dark-modifier', label: 'OneNote Icon - Dark Modifier' },
  { key: 'onenote-light-modifier', label: 'OneNote Icon - Light Modifier' },
];

interface IconSetContextType {
  selectedIconSet: string;
  setSelectedIconSet: (id: string) => void;
  iconSets: IconSetOption[];
  isLightIconSet: boolean;
  /** Class Notebook icon src for the currently-selected set. */
  classNotebookIcon: string;
  /** Staff Notebook icon src for the currently-selected set. */
  staffNotebookIcon: string;
  /** Public-folder filename (no extension) to use for the class favicon. */
  faviconClassBase: string;
  /** Public-folder filename (no extension) to use for the staff favicon. */
  faviconStaffBase: string;
}

const IconSetContext = createContext<IconSetContextType | undefined>(undefined);

const STORAGE_KEY = 'onenote_icon_set';
const DEFAULT_SET = 'onenote-dark-modifier';

export function IconSetProvider({ children }: { children: ReactNode }) {
  const [selectedIconSet, setSelectedIconSetState] = useState<string>(() => {
    if (typeof window === 'undefined') return DEFAULT_SET;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && ICON_SETS.some((s) => s.key === stored)) return stored;
    return DEFAULT_SET;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, selectedIconSet);
    } catch {
      // ignore write failures (private mode, etc.)
    }
  }, [selectedIconSet]);

  const setSelectedIconSet = (id: string) => setSelectedIconSetState(id);

  const isLightIconSet = selectedIconSet === 'onenote-light-modifier';
  const classNotebookIcon = isLightIconSet ? classNotebookIconLight : classNotebookIconDark;
  const staffNotebookIcon = isLightIconSet ? staffNotebookIconLight : staffNotebookIconDark;
  const faviconClassBase = isLightIconSet ? 'favicon-class-light' : 'favicon-class';
  const faviconStaffBase = isLightIconSet ? 'favicon-staff-light' : 'favicon-staff';

  return (
    <IconSetContext.Provider
      value={{
        selectedIconSet,
        setSelectedIconSet,
        iconSets: ICON_SETS,
        isLightIconSet,
        classNotebookIcon,
        staffNotebookIcon,
        faviconClassBase,
        faviconStaffBase,
      }}
    >
      {children}
    </IconSetContext.Provider>
  );
}

export function useIconSet() {
  const context = useContext(IconSetContext);
  if (context === undefined) {
    throw new Error('useIconSet must be used within an IconSetProvider');
  }
  return context;
}
