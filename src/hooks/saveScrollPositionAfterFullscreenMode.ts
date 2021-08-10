import { useEffect, useRef } from 'react';

export const useSaveScrollPositionAfterFullscreenMode = () => {
    const scrollHeightRef = useRef(0);

    const scrollEvent = () => {
        if (window.pageYOffset !== 0) scrollHeightRef.current = window.pageYOffset;
    };

    useEffect(() => {
        const fullScreenChanged = () => {
            if (!document.fullscreenElement) {
                window.scrollTo(0, scrollHeightRef.current);
            }
        };
        /* Chrome, Safari and Opera */
        document.addEventListener('webkitfullscreenchange', fullScreenChanged);
        /* Standard syntax */
        document.addEventListener('fullscreenchange', fullScreenChanged);
        /* Firefox */
        document.addEventListener('mozfullscreenchange', fullScreenChanged);
        /* IE / Edge */
        document.addEventListener('msfullscreenchange', fullScreenChanged);
        document.addEventListener('scroll', scrollEvent, false);
        return () => {
            document.removeEventListener('webkitfullscreenchange', fullScreenChanged);
            document.removeEventListener('fullscreenchange', fullScreenChanged);
            document.removeEventListener('mozfullscreenchange', fullScreenChanged);
            document.removeEventListener('msfullscreenchange', fullScreenChanged);
        };
    }, []);
};
