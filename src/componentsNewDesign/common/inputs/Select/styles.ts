import {
    itemHeight,
    lastItemBorderHeight,
    lastItemBorderRadius,
    selectorRightPadding,
    selectPadding
} from 'componentsNewDesign/common/inputs/Select/constants';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { black, grey23, white } from 'constants/styles/colors';
import styled from 'styled-components';
import { Active } from 'types/global';
import { BorderProperties, MaxSizes, Padding, PaddingLeft, TextProperties, Visibility } from 'types/styles';

export interface SelectWrapperProps extends Pick<Padding, 'padding'>, Pick<BorderProperties, 'border'> {}

export const SelectWrapper = styled(ContentWrapper)<SelectWrapperProps>`
    position: relative;
    min-width: 170px;
    background-color: transparent;
    ${({ border }) => border && `border: ${border}`};
    padding: ${({ padding }) => (padding ? padding : selectPadding)};
    color: ${white};

    :hover {
        background-color: ${grey23};
        cursor: pointer;
    }

    @media (min-width: 1270px) {
        padding: ${({ padding }) => (padding ? padding : selectorRightPadding)};
    }
`;

interface ItemsAbsoluteWrapperProps extends Visibility, MaxSizes {}

export const ItemsAbsoluteWrapper = styled(AbsoluteWrapper)<ItemsAbsoluteWrapperProps>`
    width: 100%;
    left: 0;
    background-color: ${black};
    max-height: ${({ maxHeight }) => maxHeight || `calc(${itemHeight} * 7)`};
    border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.24);
    overflow: auto;
    z-index: ${sideBarZIndex + 2};
    ${({ visible }) => !visible && 'visibility: hidden;'};
`;

export const LastBorderRadiusBlock = styled.div`
    width: 100%;
    height: ${lastItemBorderHeight};
    border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
`;

interface ItemWrapperProps extends PaddingLeft, Active, TextProperties {}

export const TitleSpan = styled(Span)`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
    color: ${white};
    opacity: 0.4;
`;

export const ItemSpan = styled.span<ItemWrapperProps>`
    font-size: 12px;
    font-style: ${({ fontStyle }) => fontStyle || 'normal'};
    font-weight: ${({ fontWeight }) => fontWeight || '400'};
    line-height: 13px;
    letter-spacing: 0em;
    text-align: left;
`;

export const ItemWrapper = styled.div<ItemWrapperProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: ${itemHeight};
    width: 100%;
    padding: 0 12px;
    background-color: ${grey23};
    color: ${white};

    :hover {
        cursor: pointer;
        background-color: ${black};
    }

    :last-child {
        border-bottom: 0;
        border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
    }
`;
