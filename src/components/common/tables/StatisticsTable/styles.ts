import styled from 'styled-components';
import { Opacity } from 'types/styles';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';

interface ItemSpanProps {
    lineThrough?: boolean;
}

export const ItemSpan = styled(Span)<ItemSpanProps>`
    ${({ lineThrough }) => lineThrough && 'text-decoration: line-through;'};
`;

export const ItemWrapper = styled(Section)<Opacity>`
    ${({ opacity }) => (opacity ? `opacity: ${opacity};` : ``)};
`;
