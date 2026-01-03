import { ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  component: ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  icon?: ReactNode; // Optional icon for taskbar
}

export interface OSContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (window: Omit<WindowState, 'isMinimized' | 'isMaximized' | 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}
