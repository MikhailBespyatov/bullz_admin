import {
    hoveredColor,
    itemHeight,
    lastItemBorderRadius,
    selectedColor,
    selectedTextColor
} from 'componentsNewDesign/common/inputs/Select/constants';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { PropertyBlockProps } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { propertyBlockMarginBottom } from 'componentsNewDesign/layouts/blocks/PropertyBlock/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { black, grey3 } from 'constants/styles/colors';
import { defaultTextColor } from 'constants/styles/default';
import { disableDefaultButtonStyleMixin, ellipsisMixin } from 'constants/styles/mixins';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Active } from 'types/global';
import { MaxSizes, PaddingLeft, Pointer, TextProperties, Visibility } from 'types/styles';

export const BlockWrapper = styled(ContentWrapper)<PropertyBlockProps>`
    position: relative;
    min-height: ${({ minHeight }) => minHeight || '65px'};
    min-width: 112px;
    ${({ width }) => width && `width: ${width}`};
    padding: 8px ${({ horizontalPadding }) => horizontalPadding || '8px'};
    margin-bottom: ${({ marginBottom }) => marginBottom || propertyBlockMarginBottom};
    background-color: ${({ backgroundColor }) => backgroundColor || grey3};
`;
export const BlockTitle = styled(Span)`
    /* ${({ uppercase }) => uppercase && `text-transform: uppercase`}; */
    text-transform: uppercase;
    line-height: 14px;
    font-weight: 500;
    font-size: 10px;
    color: #7b8193;
    margin-right: 5px;
    ${ellipsisMixin};
`;

export const BlockSubTitle = styled(Span)`
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 14px;
    color: ${({ color }) => color || black};
    ${ellipsisMixin};
`;

export const DateSpanWrapper = styled(Row)`
    overflow: hidden;
`;

export const StyledLink = styled(Link)`
    :hover {
        text-decoration: underline;
        text-decoration-color: ${({ color }) => color || black};
    }
    ${ellipsisMixin};
`;

export const EllipsisRow = styled(Row)`
    ${ellipsisMixin};
`;

export const InteractionButton = styled.button`
    ${disableDefaultButtonStyleMixin};
`;

export const SelectableItemWrapper = styled(Section)<Pointer>`
    ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')};
`;

interface ItemsAbsoluteWrapperProps extends Visibility, MaxSizes {}

export const ItemsAbsoluteWrapper = styled(AbsoluteWrapper)<ItemsAbsoluteWrapperProps>`
    width: 100%;
    left: 0;
    background-color: ${grey3};
    max-height: ${({ maxHeight }) => maxHeight || `calc(${itemHeight} * 7)`};
    border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.24);
    overflow: auto;
    z-index: ${sideBarZIndex + 2};
    ${({ visible }) => !visible && 'visibility: hidden;'};
`;

interface ItemWrapperProps extends PaddingLeft, Active, TextProperties {}

export const TitleSpan = styled(Span)`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
    color: black;
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
    background-color: ${grey3};

    @media (min-width: 992px) {
        background-color: ${({ active }) => (active ? selectedColor : grey3)};

        ${ItemSpan} {
            color: ${({ active }) => (active ? selectedTextColor : defaultTextColor)};
        }
    }

    :hover {
        background-color: ${hoveredColor};
        cursor: pointer;
        ${ItemSpan} {
            color: black;
        }
    }

    :last-child {
        border-bottom: 0;
        border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
    }
`;

// export const PropertyBlockWrapper = styled(ContentWrapper)<PropertyBlockProps>`
//     min-height: 65px;
//     min-width: 112px;
//     ${({ width }) => width && `width: ${width}`};
//     padding: 8px ${({ horizontalPadding }) => horizontalPadding || '8px'} 0px;
//     margin-bottom: ${({ marginBottom }) => marginBottom || propertyBlockMarginBottom};
// `;

// export const PropertyContent = styled(Span)`
//     ${({ uppercase }) => uppercase && `text-transform: uppercase`};
//     font-weight: 500;
//     font-size: ${({ fontSize }) => fontSize || '12px'};
//     ${ellipsisMixin};
// `;

// export const PropertyContentWrapper = styled(Section)`
//     padding: 0;
//     margin-bottom: 8px;
//     overflow: hidden;
//     width: ${({ width }) => width || '100%'};
// `;
