import { motion } from 'framer-motion';
import { X, Minus, Square, Copy } from 'lucide-react';
import { useWindow } from '../../../hooks/useWindow';
import type { WindowState } from '../../../types';

interface WindowFrameProps {
    windowState: WindowState;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowState }) => {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindow();

    const { id, title, component, isMaximized, zIndex } = windowState;

    // If minimized, we might just hide it or render nothing (Taskbar handles visibility usually)
    // implementing "hide" here or handling it in parent map
    // Assuming parent filters or we just use display: none
    if (windowState.isMinimized) return null;

    return (
        <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            dragListener={!isMaximized}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                width: isMaximized ? '100%' : 800,
                height: isMaximized ? '100%' : 600,
                x: isMaximized ? 0 : undefined,
                y: isMaximized ? 0 : undefined,
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            onMouseDown={() => focusWindow(id)}
            style={{
                position: isMaximized ? 'fixed' : 'absolute',
                top: isMaximized ? 0 : 100, // Default start pos
                left: isMaximized ? 0 : 100,
                zIndex: zIndex,
                background: 'rgba(20, 20, 30, 0.6)', // Glass effect
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: isMaximized ? 0 : '12px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                color: '#fff',
            }}
            className="window-frame"
        >
            {/* Title Bar */}
            <div
                className="window-titlebar"
                onDoubleClick={() => maximizeWindow(id)}
                style={{
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    cursor: isMaximized ? 'default' : 'grab',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    userSelect: 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
                    {/* Icon could go here */}
                    {/* If we had icons in state: windowState.icon */}
                    <span>{title}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex' }}
                        className="hover:bg-white/10" // Using inline styles primarily but pseudo via class if configured
                    >
                        <Minus size={14} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                        style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex' }}
                    >
                        {isMaximized ? <Copy size={14} /> : <Square size={14} />}
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex' }}
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                {component}
            </div>
        </motion.div>
    );
};
