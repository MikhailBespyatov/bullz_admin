import { SliderWrapper } from 'components/common/dynamic/Slider/styles';
import React, { FC, useEffect, useRef, useState } from 'react';

interface Props {
    parentWidth: number;
}

export const Slider: FC<Props> = ({ parentWidth, children }) => {
    const slider = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);

    const MouseDownHandler = () => {
        const difference = width - parentWidth;
        if (difference < 0) return;
    };

    useEffect(() => {
        setWidth(slider?.current?.offsetWidth || 0);
    }, []);
    return (
        <SliderWrapper ref={slider} onMouseDown={MouseDownHandler}>
            {children}
        </SliderWrapper>
    );
};
