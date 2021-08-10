import {
    defaultFontFamily,
    defaultFontSize,
    defaultFontStyle,
    defaultFontWeight,
    defaultLineHeight,
    defaultTextColor
} from 'constants/styles/default';
import styled from 'styled-components';
import { Color, Opacity, TextProperties } from 'types/styles';

export interface SpanProps extends Color, TextProperties, Opacity {}

export const Span = styled.span<SpanProps>`
    font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : defaultFontFamily)};
    font-style: ${({ fontStyle }) => (fontStyle ? fontStyle : defaultFontStyle)};
    font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : defaultFontWeight)};
    font-size: ${({ fontSize }) => (fontSize ? fontSize : defaultFontSize)};
    line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : defaultLineHeight)};
    color: ${({ color }) => (color ? color : defaultTextColor)};
    ${({ noWrap }) => (noWrap ? 'white-space: nowrap' : '')};
    ${({ opacity }) => (opacity ? `opacity: ${opacity};` : ``)};
    ${({ alignCenter }) => (alignCenter ? 'text-align: center' : '')}
`;
