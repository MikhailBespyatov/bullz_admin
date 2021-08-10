import { Span } from 'componentsNewDesign/common/typography/Span';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { black2, white } from 'constants/styles/colors';
import styled from 'styled-components';
import { PopoverType } from 'types/data';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { tooltipArrowDiameter, tooltipArrowHalfDiameter } from 'componentsNewDesign/modals/Tooltip/constants';
import { Visibility } from 'types/styles';

export const TooltipWrapper = styled(AbsoluteWrapper)<Visibility>`
    white-space: nowrap;
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    box-shadow: 0px 12px 36px rgba(0, 0, 0, 0.25);
`;

export const TooltipRelativeWrapper = styled(RelativeWrapper)``;

export const TooltipSpan = styled(Span)`
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    color: ${white};
`;

export const TooltipArrow = styled(AbsoluteWrapper)<PopoverType>`
    width: ${tooltipArrowDiameter};
    height: ${tooltipArrowDiameter};
    background: transparent;
    transform-origin: 0 0;
    transform: ${({ type }) => (type === 'top' ? 'rotate(-45deg)' : 'rotate(135deg)')};
    z-index: ${sideBarZIndex + 1};
    border: ${tooltipArrowHalfDiameter} solid transparent;
    border-bottom: ${tooltipArrowHalfDiameter} solid ${black2};
    border-left: ${tooltipArrowHalfDiameter} solid ${black2};
`;
