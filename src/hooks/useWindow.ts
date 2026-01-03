import { useContext } from 'react';
import { OSContext } from '../context/OSContext';

export const useWindow = () => {
    const context = useContext(OSContext);
    if (!context) {
        throw new Error('useWindow must be used within an OSProvider');
    }
    return context;
};
