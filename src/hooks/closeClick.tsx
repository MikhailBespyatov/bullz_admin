import { RefObject, useEffect } from 'react';
import { noop } from 'types/types';
import { findElementInChildrenList } from 'utils/usefulFunctions';

const portal = document.querySelector('#portal-root') || document.createElement('div');

// * any because HTML Element can be any
export const useCloseClick = (ref: RefObject<any>, close: noop, visible?: boolean) => {
    useEffect(() => {
        const closeClick = (e: MouseEvent) => {
            if (!ref.current) return;

            if (
                ref.current !== e.target &&
                !findElementInChildrenList(ref.current, e.target) &&
                !findElementInChildrenList(portal, e.target)
            ) {
                close();
            }
        };
        document.addEventListener('click', closeClick);

        return () => document.removeEventListener('click', closeClick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);
};
