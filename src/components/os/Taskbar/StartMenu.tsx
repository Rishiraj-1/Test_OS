import { useRef, useEffect } from 'react';
import { useWindow } from '../../../hooks/useWindow';
import { FileText, Terminal, Globe, Settings } from 'lucide-react';
import { Notepad } from '../../../apps/Notepad';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const StartMenu = ({ isOpen, onClose }: StartMenuProps) => {
    const { openWindow } = useWindow();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest('#start-button')) { // Ignore clicks on start button
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const apps = [
        {
            id: 'notepad',
            title: 'Notepad',
            icon: <FileText size={24} />,
            component: <Notepad />
        },
        {
            id: 'terminal',
            title: 'Terminal',
            icon: <Terminal size={24} />,
            component: <div style={{ color: '#fff', padding: 20 }}>Terminal Coming Soon...</div>
        },
        {
            id: 'browser',
            title: 'Browser',
            icon: <Globe size={24} />,
            component: <div style={{ color: '#fff', padding: 20 }}>Browser Coming Soon...</div>
        },
        {
            id: 'settings',
            title: 'Settings',
            icon: <Settings size={24} />,
            component: <div style={{ color: '#fff', padding: 20 }}>Settings Coming Soon...</div>
        },
    ];

    return (
        <div
            ref={menuRef}
            style={{
                position: 'fixed',
                bottom: '56px',
                left: '12px',
                width: '320px',
                height: '400px',
                background: 'rgba(30, 30, 40, 0.85)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                padding: '16px',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ marginBottom: '16px', fontWeight: 600, fontSize: '18px', color: '#fff' }}>Pinned Apps</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {apps.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => {
                            openWindow({
                                id: app.id,
                                title: app.title,
                                component: app.component,
                            });
                            onClose();
                        }}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#eee',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '8px',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                        <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}>
                            {app.icon}
                        </div>
                        <span style={{ fontSize: '12px' }}>{app.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
