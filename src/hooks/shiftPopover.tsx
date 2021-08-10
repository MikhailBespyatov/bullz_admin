import { RefObject, useEffect, useState } from 'react';

const bodyWidth = document.body.getBoundingClientRect().width;
const criticalWidth = 30;

export const useShiftPopover = (ref: RefObject<any>, visible?: boolean, expansionValue?: number) => {
    const [shift, setShift] = useState(0);

    useEffect(() => {
        if (!ref.current) return;
        const distance = ref.current.getBoundingClientRect();
        const distanceLeft = distance.left;
        const distanceRight = bodyWidth - distance.right - (expansionValue || 0);

        if (distanceRight - criticalWidth === 0) return;

        if (distanceLeft < criticalWidth) {
            setShift(criticalWidth - distanceLeft);
            return;
        }
        distanceRight < criticalWidth ? setShift(distanceRight - criticalWidth) : setShift(0);
        // * visible should activate useEffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current, visible]);

    return shift;
};
