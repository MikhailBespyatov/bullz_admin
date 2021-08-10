import { Portal } from 'componentsNewDesign/layouts/Portal';
import {
    calculateTooltipLeft,
    calculateTooltipTop,
    tooltipArrowHeight,
    tooltipBorder
} from 'componentsNewDesign/modals/Tooltip/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { black2 } from 'constants/styles/colors';
import { useRefWidthAndHeight } from 'hooks/getRefProperty';
import { useModal } from 'hooks/modal';
import React, { FC, MouseEvent as MouseEventReact, useRef, useState } from 'react';
import { PopoverType, Title } from 'types/data';
import { TooltipArrow, TooltipRelativeWrapper, TooltipSpan, TooltipWrapper } from './styles';

export interface TooltipProps extends PopoverType, Pick<Title, 'title'> {}

export const Tooltip: FC<TooltipProps> = ({ children, type = 'top', title }) => {
    const isTopType = type === 'top';
    const { visible, open, close } = useModal();
    const childrenRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const childrenProperty = useRefWidthAndHeight(childrenRef);
    const tooltipProperty = useRefWidthAndHeight(tooltipRef);
    //const tooltipShift = useShiftPopover(tooltipRef);
    //const childrenHalfWidth = childrenProperty[0] / 2 + 'px';
    //const tooltipLeft = calculateTooltipLeft(childrenHalfWidth, tooltipProperty[0] + 'px', tooltipShift);
    //const tooltipTop = calculateTooltipTop(isTopType, childrenProperty[1]);

    const arrowTop = isTopType ? tooltipProperty[1] - parseInt(tooltipBorder) + 'px' : '0px';
    const arrowLeft =
        (tooltipProperty[0] - parseInt(tooltipArrowHeight)) * 0.5 +
        (!isTopType ? parseInt(tooltipArrowHeight) : 0) +
        'px';

    const [[coordinatePopoverX, coordinatePopoverY], setCoordinatePopover] = useState([0, 0]);
    const tooltipLeft = calculateTooltipLeft(childrenProperty[0], tooltipProperty[0], coordinatePopoverX);
    const tooltipTop = calculateTooltipTop(isTopType, childrenProperty[1], tooltipProperty[1], coordinatePopoverY);

    const onClick = (e: MouseEventReact<HTMLDivElement>) => {
        e.stopPropagation();

        if (!childrenRef.current) return;
        const { x, y } = childrenRef.current.getBoundingClientRect();
        setCoordinatePopover([x, y]);
        open();
    };

    return (
        <TooltipRelativeWrapper ref={childrenRef} onMouseLeave={close} onMouseMove={onClick}>
            <Portal>
                <TooltipWrapper ref={tooltipRef} left={tooltipLeft} top={tooltipTop} visible={visible} zIndex="1000">
                    <ContentWrapper backgroundColor={black2} borderRadius="4px" padding="8px 15px">
                        <TooltipSpan>{title}</TooltipSpan>
                    </ContentWrapper>
                    <TooltipArrow left={arrowLeft} top={arrowTop} type={type} />
                </TooltipWrapper>
            </Portal>
            {children}
        </TooltipRelativeWrapper>
    );
};
