import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import styled from 'styled-components';
import { PopoverType } from 'types/data';
import { MinSizes } from 'types/styles';
import {
    lastItemBorderRadius,
    popoverArrowDiameter,
    popoverArrowHalfDiameter,
    popoverBackgroundColor,
    popoverWidth
} from './constants';

export const PopoverAbsoluteWrapper = styled(AbsoluteWrapper)<MinSizes>`
    background-color: ${popoverBackgroundColor};
    min-width: ${({ minWidth }) => minWidth || popoverWidth};
    border-radius: ${lastItemBorderRadius};
    box-shadow: 0px -8px 60px rgba(0, 0, 0, 0.25);
    z-index: ${sideBarZIndex + 1};
`;

export const PopoverArrow = styled(AbsoluteWrapper)<PopoverType>`
    width: ${popoverArrowDiameter};
    height: ${popoverArrowDiameter};
    background: ${popoverBackgroundColor};
    transform-origin: 0 0;
    transform: ${({ type }) => (type === 'top' ? 'rotate(-45deg)' : 'rotate(135deg)')};
    z-index: ${sideBarZIndex + 1};
    border: ${popoverArrowHalfDiameter} solid transparent;
    border-bottom: ${popoverArrowHalfDiameter} solid ${popoverBackgroundColor};
    border-left: ${popoverArrowHalfDiameter} solid ${popoverBackgroundColor};
`;

export const PortalPosition = styled.div`
    position: absolute;
    top: 500px;
    left: 100px;
    z-index: 1000;
`;
