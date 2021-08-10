import { useEffect } from 'react';
import { noop } from 'types/types';

// * any because HTML Element can be any
export const useModalCloseClick = (visible: boolean, close: noop) => {
    useEffect(() => {
        if (visible) document.addEventListener('click', close);

        return () => document.removeEventListener('click', close);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);
};
