import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Theme {
  id: string;
  /** Either a solid color OR a CSS gradient. */
  color?: string;
  gradient?: string;
}

export const THEMES: Theme[] = [
  { id: 'default', color: '#5a5a5a' },
  { id: 'blue', color: '#0000ff' },
  { id: 'sky', gradient: 'linear-gradient(135deg, #4a90e2 0%, #67b8e3 100%)' },
  { id: 'peach', gradient: 'linear-gradient(135deg, #ffa07a 0%, #ff6b9d 100%)' },
  { id: 'sunset', gradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffd93d 100%)' },
  { id: 'navy', color: '#1e5a8e' },
  { id: 'rose', gradient: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)' },
  { id: 'slate', color: '#2c3e50' },
  { id: 'plum', color: '#8b4789' },
  { id: 'forest', gradient: 'linear-gradient(135deg, #2c5f2d 0%, #97bc62 100%)' },
];

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  themeId: string;
  setThemeId: (id: string) => void;
  theme: Theme;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children, disabled = false }: { children: ReactNode; disabled?: boolean }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('onenote_dark_mode');
    return stored ? JSON.parse(stored) : false;
  });

  const [themeId, setThemeIdState] = useState<string>(() => {
    return localStorage.getItem('onenote_theme_id') || 'default';
  });

  useEffect(() => {
    localStorage.setItem('onenote_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode && !disabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, disabled]);

  useEffect(() => {
    localStorage.setItem('onenote_theme_id', themeId);
  }, [themeId]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  const setThemeId = (id: string) => setThemeIdState(id);

  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0];

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, themeId, setThemeId, theme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}
