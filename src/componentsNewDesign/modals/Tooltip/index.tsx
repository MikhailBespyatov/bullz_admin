import { Portal } from 'componentsNewDesign/layouts/Portal';
import {
    calculateTooltipLeft,
    calculateTooltipTop,
    tooltipArrowHeight,
    tooltipBorder
} from 'componentsNewDesign/modals/Tooltip/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { black2 } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import { useRefWidthAndHeight } from 'hooks/getRefProperty';
import { useModal } from 'hooks/modal';
import React, { FC, MouseEvent as MouseEventReact, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { PopoverType, Title } from 'types/data';
import { Background, Color, Sizes } from 'types/styles';
import { TooltipArrow, TooltipRelativeWrapper, TooltipSpan, TooltipWrapper } from './styles';

export interface TooltipProps extends PopoverType, Background, Color, Sizes, Pick<Title, 'title'> {}

export const Tooltip: FC<TooltipProps> = ({ children, type = 'top', title, background, color, width }) => {
    const isTopType = type === 'top';
    const { visible, open, close } = useModal();
    const childrenRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const childrenProperty = useRefWidthAndHeight(childrenRef);
    const tooltipProperty = useRefWidthAndHeight(tooltipRef);
    const isMobile = useMediaQuery({ query: `(max-width: ${xs})` });

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
        <TooltipRelativeWrapper ref={childrenRef} width={width} onMouseLeave={close} onMouseMove={onClick}>
            <Portal>
                <TooltipWrapper
                    ref={tooltipRef}
                    left={isMobile ? `calc(${tooltipLeft} - 50px)` : tooltipLeft}
                    top={tooltipTop}
                    visible={visible}
                    zIndex="1000"
                >
                    <ContentWrapper
                        backgroundColor={background ? background : black2}
                        borderRadius="4px"
                        padding="8px 15px"
                    >
                        <TooltipSpan color={color}>{title}</TooltipSpan>
                    </ContentWrapper>
                    <TooltipArrow
                        background={background}
                        left={isMobile ? `calc(${arrowLeft} + 50px)` : arrowLeft}
                        top={arrowTop}
                        type={type}
                    />
                </TooltipWrapper>
            </Portal>
            {children}
        </TooltipRelativeWrapper>
    );
};
