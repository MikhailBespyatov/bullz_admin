import { itemHeight, selectedTextColor } from 'componentsNewDesign/common/inputs/Select/constants';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { black, grey23, grey28 } from 'constants/styles/colors';
import { defaultTextColor } from 'constants/styles/default';
import { ellipsisMixin } from 'constants/styles/mixins';
import { xs } from 'constants/styles/sizes';
import styled, { css } from 'styled-components';
import { Active } from 'types/global';
import { PaddingLeft, TextProperties } from 'types/styles';

export const hoveredItemBackgroundColor = css`
    background-color: ${grey23};
`;

export const selectedItemBackgroundColor = css`
    background-color: ${grey23};

    @media (max-width: ${xs}) {
        background-color: ${grey28};
    }
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

    @media screen and (max-width: ${xs}) {
        width: auto;
    }
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
    background-color: ${black};
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

    @media (max-width: ${xs}) {
        background-color: ${grey28};
        padding-left: 8px;
        padding-right: 8px;
    }
`;
