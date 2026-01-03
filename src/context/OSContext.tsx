import { createContext, useState, useCallback, PropsWithChildren } from 'react';
import type { WindowState, OSContextType } from '../types';

export const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider = ({ children }: PropsWithChildren) => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [maxZIndex, setMaxZIndex] = useState(10);

    const focusWindow = useCallback((id: string) => {
        setActiveWindowId(id);
        setWindows((prev) =>
            prev.map((win) =>
                win.id === id ? { ...win, zIndex: maxZIndex + 1, isMinimized: false } : win
            )
        );
        setMaxZIndex((prev) => prev + 1);
    }, [maxZIndex]);

    const openWindow = useCallback((newWindow: Omit<WindowState, 'isMinimized' | 'isMaximized' | 'zIndex'>) => {
        setWindows((prev) => {
            // Check if window already open
            const existing = prev.find((w) => w.id === newWindow.id);
            if (existing) {
                // Just focus it
                return prev.map(w => w.id === newWindow.id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w);
            }
            return [...prev, { ...newWindow, isMinimized: false, isMaximized: false, zIndex: maxZIndex + 1 }];
        });
        setActiveWindowId(newWindow.id);
        setMaxZIndex(z => z + 1);
    }, [maxZIndex]);

    const closeWindow = useCallback((id: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const minimizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const restoreWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
        );
        focusWindow(id);
    }, [focusWindow]);

    const maximizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
        );
        focusWindow(id);
    }, [focusWindow]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, []);

    return (
        <OSContext.Provider
            value={{
                windows,
                activeWindowId,
                openWindow,
                closeWindow,
                minimizeWindow,
                restoreWindow,
                maximizeWindow,
                focusWindow,
                theme,
                toggleTheme,
            }}
        >
            {children}
        </OSContext.Provider>
    );
};
