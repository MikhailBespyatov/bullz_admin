import { useEffect } from 'react';

const body = document.body;

export const useNonScrolledBackground = (visible?: boolean, expanded?: boolean) =>
    useEffect(() => {
        expanded && visible ? (body.style.overflow = 'hidden') : (body.style.overflow = 'auto');
    }, [visible, expanded]);
