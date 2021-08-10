import { RefObject, useEffect, useState } from 'react';

// * any because html element can be any
export const useRefWidthAndHeight = (ref: RefObject<any>, visible?: boolean): [number, number] => {
    const [childrenProperty, setChildrenProperty] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        if (!ref.current) return;

        setChildrenProperty([ref.current.clientWidth, ref.current.clientHeight]);
        // * visible should activate useEffect
    }, [ref, visible]);

    return childrenProperty;
};
