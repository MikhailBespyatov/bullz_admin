import styled from 'styled-components';
import { Sizes } from 'types/styles';

export const RelativeWrapper = styled.div<Sizes>`
    position: relative;
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
`;
