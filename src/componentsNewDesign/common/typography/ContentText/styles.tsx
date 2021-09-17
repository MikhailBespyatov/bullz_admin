import { white } from 'constants/styles/colors';
import { ellipsisMixin } from 'constants/styles/mixins';
import styled from 'styled-components';
import { Color, MaxSizes, Padding, Sizes, TextAlignment, TextProperties } from 'types/styles';

export interface ContentTextProps
    extends TextProperties,
        Sizes,
        Color,
        Padding,
        TextAlignment,
        Pick<MaxSizes, 'maxWidth'> {}

export const ContentText = styled.span<ContentTextProps>`
    font-size: ${({ fontSize }) => fontSize || '12px'};
    font-weight: ${({ fontWeight }) => fontWeight || '500'};
    line-height: ${({ lineHeight }) => lineHeight || 'normal'};
    color: ${({ color }) => color || white};
    background-color: transparent;
    text-align: ${({ alignTextCenter }) => (alignTextCenter && 'center') || 'start'};
    ${({ padding }) => padding && `padding: ${padding}`};
    ${({ uppercase }) => uppercase && `text-transform: uppercase`};
    ${({ width }) => width && `width: ${width}`};
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}`};
    ${ellipsisMixin};
`;
