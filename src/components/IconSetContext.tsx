import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import classNotebookIconDark from '../assets/CNB_ICON_V2.png';
import staffNotebookIconDark from '../assets/SNB_ICON_V2.png';
import classNotebookIconLight from '../assets/CNB_Light.png';
import staffNotebookIconLight from '../assets/SNB_Light.png';
import classNotebookIconEduLight from '../assets/EDU_CNB_Light.png';
import staffNotebookIconEduLight from '../assets/EDU_SNB_Light.png';
import classNotebookIconFinal from '../assets/CNB_FINAL.png';
import staffNotebookIconFinal from '../assets/SNB_FINAL.png';

export interface IconSetOption {
  key: string;
  label: string;
}

export const ICON_SETS: IconSetOption[] = [
  { key: 'onenote-dark-modifier', label: 'OneNote Icon - Dark Modifier' },
  { key: 'onenote-light-modifier', label: 'OneNote Icon - Light Modifier' },
  { key: 'edu-light-modifier', label: 'EDU Icon Light Modifier' },
  { key: 'final-icon', label: 'Final Icon' },
];

interface IconSetVariant {
  classIcon: string;
  staffIcon: string;
  faviconClassBase: string;
  faviconStaffBase: string;
}

const ICON_VARIANTS: Record<string, IconSetVariant> = {
  'onenote-dark-modifier': {
    classIcon: classNotebookIconDark,
    staffIcon: staffNotebookIconDark,
    faviconClassBase: 'favicon-class',
    faviconStaffBase: 'favicon-staff',
  },
  'onenote-light-modifier': {
    classIcon: classNotebookIconLight,
    staffIcon: staffNotebookIconLight,
    faviconClassBase: 'favicon-class-light',
    faviconStaffBase: 'favicon-staff-light',
  },
  'edu-light-modifier': {
    classIcon: classNotebookIconEduLight,
    staffIcon: staffNotebookIconEduLight,
    faviconClassBase: 'favicon-class-edu-light',
    faviconStaffBase: 'favicon-staff-edu-light',
  },
  'final-icon': {
    classIcon: classNotebookIconFinal,
    staffIcon: staffNotebookIconFinal,
    faviconClassBase: 'favicon-class-final',
    faviconStaffBase: 'favicon-staff-final',
  },
};

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

  const variant = ICON_VARIANTS[selectedIconSet] ?? ICON_VARIANTS[DEFAULT_SET];
  const isLightIconSet = selectedIconSet !== 'onenote-dark-modifier';
  const classNotebookIcon = variant.classIcon;
  const staffNotebookIcon = variant.staffIcon;
  const faviconClassBase = variant.faviconClassBase;
  const faviconStaffBase = variant.faviconStaffBase;

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
