import {
    quantityColor,
    quantityFontSize,
    quantityPaddingLeft,
    totalBadgeBorderRadius,
    totalBadgeHeight,
    totalBadgePadding
} from 'componentsNewDesign/common/badges/TotalBadge/constants';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { black, white } from 'constants/styles/colors';
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
    background: ${white};
    border-radius: ${totalBadgeBorderRadius};
    color: ${black};
    font-size: ${quantityFontSize};
    font-style: normal;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0em;
    text-align: left;
    padding: ${totalBadgePadding};
`;
