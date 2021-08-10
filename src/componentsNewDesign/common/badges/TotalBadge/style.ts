import {
    quantityColor,
    quantityFontSize,
    quantityPaddingLeft,
    totalBadgeBackgroundColor,
    totalBadgeBorderRadius,
    totalBadgeHeight,
    totalBadgePadding,
    totalBadgeTextColor
} from 'componentsNewDesign/common/badges/TotalBadge/constants';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import styled from 'styled-components';
import { HorizontalPadding, TextProperties } from 'types/styles';

export interface TextProps extends TextProperties, HorizontalPadding {}

export const Text = styled.span<TextProps>`
    font-size: ${({ fontSize }) => fontSize || quantityFontSize};
    color: ${({ color }) => color || quantityColor};
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0em;
    text-align: left;
    background-color: transparent;
    padding-left: ${quantityPaddingLeft};
`;

export const TotalBadgeWrapper = styled(Row)`
    width: fit-content;
    height: ${totalBadgeHeight};
    background: ${totalBadgeBackgroundColor};
    border-radius: ${totalBadgeBorderRadius};
    color: ${totalBadgeTextColor};
    font-size: ${quantityFontSize};
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0em;
    text-align: left;
    padding: ${totalBadgePadding};
`;
