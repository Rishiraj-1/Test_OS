// import React from 'react';
import { useWindow } from '../../hooks/useWindow';
import { WindowFrame } from './Window/WindowFrame';

export const Desktop = () => {
    const { windows } = useWindow();

    return (
        <div
            style={{
                width: '100%',
                height: 'calc(100% - 48px)', // Taskbar height
                position: 'relative',
                background: 'url("https://images.unsplash.com/photo-1614850523060-8da1d56ae167?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80") center/cover no-repeat',
                overflow: 'hidden',
                backgroundSize: 'cover',
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Render Windows */}
            {windows.map((windowState) => (
                <WindowFrame key={windowState.id} windowState={windowState} />
            ))}
        </div>
    );
};
