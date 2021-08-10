import { useEffect, useRef } from 'react';

export const usePortal = (id: string) => {
    const rootElemRef = useRef(document.createElement('div'));

    useEffect(() => {
        const parentElem = document.querySelector(`#${id}`);
        if (!parentElem) return;
        const currentEl = rootElemRef.current;

        parentElem.appendChild(currentEl);
        return () => {
            currentEl.remove();
        };
    }, [id]);

    return rootElemRef.current;
};
