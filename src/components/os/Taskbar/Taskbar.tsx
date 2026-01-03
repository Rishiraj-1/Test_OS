import { useState, useEffect } from 'react';
import { useWindow } from '../../../hooks/useWindow';
import { Monitor } from 'lucide-react'; // Monitor as Start icon
import { StartMenu } from './StartMenu';

export const Taskbar = () => {
    const { windows, activeWindowId, minimizeWindow, restoreWindow, focusWindow } = useWindow();
    const [time, setTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '48px',
                    background: 'rgba(20, 20, 30, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                    zIndex: 9999,
                    gap: '12px'
                }}
            >
                {/* Start Button */}
                <button
                    id="start-button"
                    onClick={() => setIsStartOpen(!isStartOpen)}
                    style={{
                        background: isStartOpen ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '6px',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                    className="hover:bg-white/20"
                >
                    <Monitor size={20} />
                </button>

                {/* Taskbar Items */}
                <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
                    {windows.map((win) => (
                        <button
                            key={win.id}
                            onClick={() => {
                                if (activeWindowId === win.id && !win.isMinimized) {
                                    minimizeWindow(win.id);
                                } else {
                                    restoreWindow(win.id);
                                    focusWindow(win.id);
                                }
                            }}
                            style={{
                                background: activeWindowId === win.id && !win.isMinimized ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '0 12px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#fff',
                                cursor: 'pointer',
                                maxWidth: '200px',
                                minWidth: '120px',
                            }}
                            className="hover:bg-white/10"
                        >
                            {/* If app has icon, show it here. Circle as placeholder */}
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeWindowId === win.id ? '#4ade80' : '#94a3b8' }} />
                            <span style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {win.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* System Tray */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#ccc' }}>
                    <span>
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </>
    );
};
