import { Span } from 'componentsNewDesign/common/typography/Span';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import {
    animationPopoverTime,
    popoverArrowDiameter,
    popoverArrowHalfDiameter,
    popoverBackgroundColor,
    popoverBorderRadius,
    popoverDifference,
    popoverHeight,
    popoverMinWidth
} from 'componentsNewDesign/modals/popovers/CuratePopover/constants';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { blue, grey13, paleBlue } from 'constants/styles/colors';
import styled from 'styled-components';
import { PopoverType } from 'types/data';
import { Active } from 'types/global';

export const TitleWrapper = styled(Section)`
    height: 42px;
`;

export const TitleSpan = styled(Span)`
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    color: ${blue};
`;

export const AgreementSpan = styled(Span)`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: ${grey13};
`;

export const ItemSpan = styled(Span)`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    white-space: nowrap;
`;

export const ItemWrapper = styled(Row)<Active>`
    width: 188px;
    height: 30px;
    padding: 8px;
    ${({ active }) => active && `background-color: ${paleBlue}`};
    cursor: pointer;

    ${ItemSpan} {
        ${({ active }) => active && `color: ${blue}`};
    }
`;

// interface PopoverAbsoluteWrapperProps {
//     isRejected: boolean;
// }

export const PopoverAbsoluteWrapper = styled(AbsoluteWrapper)`
    background-color: ${popoverBackgroundColor};
    //min-width: ${popoverMinWidth};
    transform: translateX(${({ width }) => (width === popoverMinWidth ? '0' : '-' + popoverDifference)});
    height: ${popoverHeight};
    border-radius: ${popoverBorderRadius};
    box-shadow: 0px -8px 60px rgba(0, 0, 0, 0.25);
    z-index: ${sideBarZIndex + 1};
    display: flex;
    flex-direction: column;
    transition-duration: ${animationPopoverTime}s;
    transition-property: width, transform;
`;

export const PopoverArrow = styled(AbsoluteWrapper)<PopoverType>`
    width: ${popoverArrowDiameter};
    height: ${popoverArrowDiameter};
    transform: ${({ type }) => (type === 'top' ? 'rotate(-45deg)' : 'rotate(135deg)')};
    z-index: ${sideBarZIndex + 1};
    border: ${popoverArrowHalfDiameter} solid transparent;
    border-bottom: ${popoverArrowHalfDiameter} solid ${popoverBackgroundColor};
    border-left: ${popoverArrowHalfDiameter} solid ${popoverBackgroundColor};
`;

export const ContentWrapper = styled.div`
    padding: 0 20px 10px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
