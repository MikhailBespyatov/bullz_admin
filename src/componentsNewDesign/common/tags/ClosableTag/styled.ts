import { Span } from 'componentsNewDesign/common/typography/Span';
import { pink, purple } from 'constants/styles/colors';
import styled from 'styled-components';
import { MarginRightBottom } from 'types/styles';

export interface ClosableTagWrapperProps extends MarginRightBottom {}

export const ClosableTagWrapper = styled.div<ClosableTagWrapperProps>`
    padding: 0 8px 2px 8px;
    background-color: ${pink};
    border-radius: 32px;
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight}`};
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`};
`;

export const ClosableTagSpan = styled(Span)`
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: ${purple};
`;
