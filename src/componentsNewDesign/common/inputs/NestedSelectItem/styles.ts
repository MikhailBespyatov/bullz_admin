import {
    hoveredColor,
    itemHeight,
    selectedColor,
    selectedTextColor
} from 'componentsNewDesign/common/inputs/Select/constants';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { white } from 'constants/styles/colors';
import { defaultTextColor } from 'constants/styles/default';
import { ellipsisMixin } from 'constants/styles/mixins';
import styled, { css } from 'styled-components';
import { Active } from 'types/global';
import { PaddingLeft, TextProperties } from 'types/styles';

export const hoveredItemBackgroundColor = css`
    background-color: ${hoveredColor};
`;

export const selectedItemBackgroundColor = css`
    background-color: ${selectedColor};
`;
export const selectedItemTextColor = css`
    color: ${selectedTextColor};
`;
export const itemDefaultTextColor = css`
    color: ${defaultTextColor};
`;
export const itemTransparentBackground = css`
    background-color: transparent;
`;

export const flexAndVerticalAlignCenter = css`
    display: flex;
    align-items: center;
`;

interface NestedItemSpanProps extends PaddingLeft, Active, TextProperties {
    selectable?: boolean;
    isNested?: boolean;
}

export const NestedItemSpan = styled(ContentText)<NestedItemSpanProps>`
    font-weight: 400;
    line-height: ${itemHeight};
    padding: 0 5px 0 12px;
    min-height: ${itemHeight};
    width: 260px;
    ${ellipsisMixin}
    ${itemTransparentBackground}
    ${itemDefaultTextColor}
`;

export const ArrowClickableWrapper = styled(ClickableWrapper)<NestedItemSpanProps>`
    padding: 0 12px;
    min-height: ${itemHeight};
    ${itemTransparentBackground}

    :hover {
        ${hoveredItemBackgroundColor};
    }
`;

export const SelectorClickableWrapper = styled(ClickableWrapper)<NestedItemSpanProps>`
    ${flexAndVerticalAlignCenter}
    justify-content: flex-start;
    width: 100%;
    ${itemTransparentBackground}

    ${({ active }) =>
        active &&
        css`
            ${selectedItemBackgroundColor}

            ${NestedItemSpan} {
                ${selectedItemTextColor}
            }
        `};

    :hover {
        ${hoveredItemBackgroundColor}
        ${NestedItemSpan} {
            ${itemDefaultTextColor}
        }
    }
`;

export const NestedItemWrapper = styled.div<NestedItemSpanProps>`
    ${flexAndVerticalAlignCenter}
    justify-content: space-between;
    width: 100%;
    padding: 0px;
    background-color: ${white};
    ${itemDefaultTextColor}
    cursor: pointer;

    ${({ active, isNested }) =>
        active &&
        !isNested &&
        css`
            ${selectedItemBackgroundColor}

            ${NestedItemSpan} {
                ${selectedItemTextColor}
            }
        `};

    :hover {
        ${({ selectable, isNested }) =>
            (selectable || !isNested) &&
            css`
                ${hoveredItemBackgroundColor}
            `};
    }

    :last-child {
        border-bottom: 0;
        border-radius: 0;
    }
`;
