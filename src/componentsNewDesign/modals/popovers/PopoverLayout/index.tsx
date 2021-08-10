import { Portal } from 'componentsNewDesign/layouts/Portal';
import { popoverArrowHeight, popoverVerticalMargin } from 'componentsNewDesign/modals/popovers/PopoverLayout/constants';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { useCloseClick } from 'hooks/closeClick';
import { useRefWidthAndHeight } from 'hooks/getRefProperty';
import React, { MouseEvent as MouseEventReact, ReactNode, useRef, useState } from 'react';
import { Disabled } from 'types/form';
import { MinSizes } from 'types/styles';
import { noop } from 'types/types';
import { PopoverAbsoluteWrapper, PopoverArrow } from './styles';

export interface PopoverLayoutProps extends Disabled, MinSizes {
    visibleChildren: JSX.Element | null | ReactNode;
    modalChildren: JSX.Element | null;
    type?: 'top' | 'down';
    shiftX?: number;
    modalMargin?: string;
    close: noop;
    open: noop;
    visible: boolean;
}

export const PopoverLayout = ({
    visibleChildren,
    modalChildren,
    type,
    shiftX,
    modalMargin = popoverVerticalMargin,
    disabled,
    close,
    open,
    visible,
    minWidth
}: PopoverLayoutProps) => {
    const relativeRef = useRef<HTMLDivElement>(null);
    const absoluteRef = useRef<HTMLDivElement>(null);
    const [relativeWidth, relativeHeight] = useRefWidthAndHeight(relativeRef, visible);
    const [absoluteWidth, absoluteHeight] = useRefWidthAndHeight(absoluteRef, visible);
    const [[coordinatePopoverX, coordinatePopoverY], setCoordinatePopover] = useState([0, 0]);

    // console.log(absoluteHeight);

    const isTopType = type === 'top';

    const arrowTop =
        (isTopType ? -1 : 1) * (parseInt(popoverArrowHeight) / 2 + parseInt(modalMargin)) +
        (isTopType ? 0 : 1) * relativeHeight +
        'px';
    // !!! wtf with transform origin, why 1.25 ???
    const arrowLeft = (relativeWidth + (isTopType ? -1 : 1) * parseInt(popoverArrowHeight)) * 0.5 + 'px';
    const top = (isTopType ? -1 : 0) * absoluteHeight + +parseInt(arrowTop) + 'px';
    const left = (relativeWidth - absoluteWidth) / 2 + (shiftX || 0) + 'px';

    const onClick = (e: MouseEventReact<HTMLDivElement>) => {
        e.stopPropagation();
        if (disabled) return;

        if (!relativeRef.current) return;
        const { x, y } = relativeRef.current.getBoundingClientRect();
        setCoordinatePopover([x, y]);

        // console.log('relative clicked');

        visible ? close() : open();
    };

    // useModalCloseClick(visible, close);
    useCloseClick(relativeRef, close, visible);

    // useEffect(() => {
    //     if (!relativeRef.current) return;
    //     const { x, y } = relativeRef.current.getBoundingClientRect();
    //     setCoordinatePopover([x, y]);
    // }, [relativeRef, visible]);

    return (
        <RelativeWrapper ref={relativeRef} height="auto" width="100%" onClick={onClick}>
            {visible && (
                <>
                    <Portal>
                        <AbsoluteWrapper
                            left={coordinatePopoverX + 'px'}
                            top={coordinatePopoverY + window.scrollY + 'px'}
                            zIndex="1000"
                        >
                            <PopoverAbsoluteWrapper
                                ref={absoluteRef}
                                left={left}
                                minWidth={minWidth}
                                top={top}
                                onClick={e => {
                                    // ('clicked :(');
                                    e.stopPropagation();
                                }}
                            >
                                {modalChildren}
                            </PopoverAbsoluteWrapper>
                            <PopoverArrow left={arrowLeft} top={arrowTop} type={type} />
                        </AbsoluteWrapper>
                    </Portal>
                </>
            )}
            {visibleChildren}
        </RelativeWrapper>
    );
};
