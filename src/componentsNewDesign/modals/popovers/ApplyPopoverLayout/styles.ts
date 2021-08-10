import { Span } from 'componentsNewDesign/common/typography/Span';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { blue, grey13 } from 'constants/styles/colors';
import styled from 'styled-components';
import { PopoverType } from 'types/data';
import { Sizes } from 'types/styles';
import {
    popoverArrowDiameter,
    popoverArrowHalfDiameter,
    popoverBackgroundColor,
    popoverBorderRadius,
    popoverZIndex
} from './constants';

export const PopoverAbsoluteWrapper = styled(AbsoluteWrapper)<Sizes>`
    background-color: ${popoverBackgroundColor};
    ${({ width }) => width && `width: ${width}`};
    ${({ height }) => height && `height: ${height}`};
    border-radius: ${popoverBorderRadius};
    box-shadow: 0px -8px 60px rgba(0, 0, 0, 0.25);
    z-index: ${popoverZIndex};
    display: flex;
    flex-direction: column;
`;

export const PopoverArrow = styled(AbsoluteWrapper)<PopoverType>`
    width: ${popoverArrowDiameter};
    height: ${popoverArrowDiameter};
    transform: ${({ type }) => (type === 'top' ? 'rotate(-45deg)' : 'rotate(135deg)')};
    z-index: ${popoverZIndex};
    border: ${popoverArrowHalfDiameter} solid transparent;
    border-bottom: ${popoverArrowHalfDiameter} solid ${popoverBackgroundColor};
    border-left: ${popoverArrowHalfDiameter} solid ${popoverBackgroundColor};
`;

export const TitleWrapper = styled(Section)`
    height: 42px;
`;

export const TitleSpan = styled(Span)`
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    color: ${blue};
`;

export const ContentWrapper = styled.div`
    padding: 0 13px 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const AgreementSpan = styled(Span)`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: ${grey13};
`;
