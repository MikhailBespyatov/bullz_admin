import { Span } from 'componentsNewDesign/common/typography/Span';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { grey2, grey29, grey7, white } from 'constants/styles/colors';
import { defaultTextColor } from 'constants/styles/default';
import {
    disableDefaultButtonStyleMixin,
    disableDefaultInputStyleMixin,
    flexCenter,
    flexStart
} from 'constants/styles/mixins';
import styled from 'styled-components';
import { Active } from 'types/global';
import { PaddingLeft } from 'types/styles';
import {
    borderItemColor,
    hoveredColor,
    itemHeight,
    lastItemBorderRadius,
    paginationCellActiveBackground,
    paginationCellBackground,
    paginationCellBorderRadius,
    PaginationCellFontSize,
    PaginationCellFontWeight,
    PaginationCellLineHeight,
    PaginationCellMarginRight,
    paginationCellWidth,
    paginationInputHeight,
    paginationInputPadding,
    paginationInputWidth,
    paginationWrapperMarginRight,
    selectedColor,
    selectedTextColor
} from './constants';
import { ArrowProps, PaginationCellProps } from './types';

export const PaginationCell = styled.button<PaginationCellProps>`
    ${disableDefaultButtonStyleMixin};
    ${flexCenter};
    border-radius: ${paginationCellBorderRadius};
    min-width: ${paginationCellWidth};
    padding: 8px 8px;
    background-color: ${({ active }) => (active ? paginationCellActiveBackground : paginationCellBackground)};
    font-weight: 500;
    font-size: ${PaginationCellFontSize};
    line-height: ${PaginationCellLineHeight};
    color: ${({ active }) => (active ? white : grey7)};
    margin-right: ${PaginationCellMarginRight};
    ${({ disabled }) => disabled && 'opacity: 0.5'};
`;

export const Arrow = styled(PaginationCell)<ArrowProps>`
    visibility: ${({ hide }) => (hide ? 'hidden' : 'visible')};
`;

export const PaginationWrapper = styled.div`
    ${flexStart};
    margin-right: ${paginationWrapperMarginRight};
    border-radius: ${paginationCellBorderRadius};
`;

export const PaginationInput = styled.input`
    ${disableDefaultInputStyleMixin};
    height: ${paginationInputHeight};
    width: ${paginationInputWidth};
    padding: 2px ${paginationInputPadding};
    box-sizing: border-box;
    border-radius: ${paginationCellBorderRadius};
    font-weight: ${PaginationCellFontWeight};
    font-size: ${PaginationCellFontSize};
    line-height: ${PaginationCellLineHeight};
    background-color: ${grey29};
    border: 1px solid rgba(0, 0, 0, 0);

    :focus-within {
        border: 1px solid #000;
    }
`;

export const ItemsAbsoluteWrapper = styled(AbsoluteWrapper)`
    background-color: ${white};
    //border: 1px solid ${grey2};
    border-radius: ${lastItemBorderRadius} ${lastItemBorderRadius} 0 0;
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.24);
`;

interface ItemWrapperProps extends PaddingLeft, Active {}

export const ItemSpan = styled(Span)`
    font-weight: ${PaginationCellFontWeight};
    font-size: ${PaginationCellFontSize};
    line-height: ${PaginationCellLineHeight};
    color: ${white};
`;

export const ItemWrapper = styled.div<ItemWrapperProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: ${itemHeight};
    width: 100%;
    ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}`};
    background-color: ${({ active }) => (active ? selectedColor : 'transparent')};
    border-bottom: 1px solid ${borderItemColor};

    ${ItemSpan} {
        color: ${({ active }) => (active ? selectedTextColor : defaultTextColor)};
    }

    :hover {
        background-color: ${hoveredColor};
        cursor: pointer;
        ${ItemSpan} {
            color: ${selectedTextColor};
        }
    }

    :first-child {
        border-bottom: 0;
        border-radius: ${lastItemBorderRadius} ${lastItemBorderRadius} 0 0;
    }
`;
