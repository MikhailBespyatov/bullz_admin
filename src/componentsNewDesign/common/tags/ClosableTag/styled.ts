import { Span } from 'componentsNewDesign/common/typography/Span';
import { pink, purple } from 'constants/styles/colors';
import styled from 'styled-components';
import { MarginRightBottom } from 'types/styles';

export interface ClosableTagWrapperProps extends MarginRightBottom {}

export const ClosableTagWrapper = styled.div<ClosableTagWrapperProps>`
    padding: 8px 16px;
    background-color: ${pink};
    border-radius: 32px;
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight}`};
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`};
`;

export const ClosableTagSpan = styled(Span)`
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${purple};
`;
