import { useState } from 'react';

export const Notepad = () => {
    const [content, setContent] = useState('');

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#1e1e1e', color: '#fff' }}>
            {/* Toolbar */}
            <div style={{ padding: '8px', borderBottom: '1px solid #333', fontSize: '12px', display: 'flex', gap: '12px' }}>
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
            </div>
            <textarea
                style={{
                    flex: 1,
                    background: 'transparent',
                    color: '#fff',
                    border: 'none',
                    resize: 'none',
                    padding: '12px',
                    outline: 'none',
                    fontFamily: 'Consolas, monospace',
                    fontSize: '14px',
                }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                spellCheck={false}
            />
        </div>
    );
};
