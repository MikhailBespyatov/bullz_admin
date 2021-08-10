import {
    linkActiveColor,
    linkColor,
    linkFontSize,
    linkFontWeight,
    linkHoverColor
} from 'componentsNewDesign/common/links/ExternalLink/constants';
import styled from 'styled-components';
import { Color, TextProperties } from 'types/styles';

export interface StyledLinkProps extends Color, TextProperties {}

export const StyledLink = styled.a<StyledLinkProps>`
    font-size: ${({ fontSize }) => fontSize || linkFontSize};
    font-weight: ${({ fontWeight }) => fontWeight || linkFontWeight};
    color: ${({ color }) => color || linkColor};
    &:hover {
        color: ${({ color }) => color || linkHoverColor};
    }
    &:active {
        color: ${({ color }) => color || linkActiveColor};
    }
`;
