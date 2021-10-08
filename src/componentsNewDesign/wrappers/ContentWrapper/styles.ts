import {
    contentWrapperBorderRadius,
    contentWrapperMinWidth
} from 'componentsNewDesign/wrappers/ContentWrapper/constants';
import styled from 'styled-components';
import { BackgroundColor, BorderRadius, Margin, MaxSizes, MinSizes, Padding, Sizes } from 'types/styles';

export interface ContentWrapperProps
    extends Sizes,
        Padding,
        MinSizes,
        MaxSizes,
        BackgroundColor,
        BorderRadius,
        Margin {}

export const ContentWrapper = styled.div<ContentWrapperProps>`
    ${({ height }) => height && `height: ${height}`};
    ${({ width }) => width && `width: ${width}`};
    min-width: ${({ minWidth }) => minWidth || contentWrapperMinWidth};
    ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
    ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}`};
    ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight}`};
    ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}`};
    ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop}`};
    ${({ paddingBottom }) => paddingBottom && `padding-bottom: ${paddingBottom}`};
    ${({ padding }) => padding && `padding: ${padding}`};
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight};`};
    ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`};
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`};
    border-radius: ${({ borderRadius }) => borderRadius || contentWrapperBorderRadius};
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
`;
