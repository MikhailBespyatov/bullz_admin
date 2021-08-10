import { wrapperWidth } from 'components/grid/wrappers/AdaptiveFixedWidthWrapper/constants';
import styled from 'styled-components';
import { Sizes } from 'types/styles';

interface Props extends Sizes {}

export const AdaptiveFixedWidthWrapper = styled.div<Props>`
    width: 100%;

    @media (max-width: ${({ width }) => width || wrapperWidth}) {
        width: ${({ width }) => width || wrapperWidth};
    }
`;
