import { marginBottomMixin } from 'constants/styles/mixins';
import { lg, padding } from 'constants/styles/sizes';
import styled from 'styled-components';
import { RemovePaddingRight } from 'types/styles';
import { getWidthString } from 'utils/usefulFunctions';

interface Props extends RemovePaddingRight {
    lg: number;
}

export const SearchCell = styled.div<Props>`
    ${({ lg }) => (lg ? getWidthString(lg) : '')}
    ${({ removePaddingRight }) => (removePaddingRight ? '' : `padding-right: ${padding};`)}
  @media (max-width: ${lg}) {
        width: 100%;
        ${marginBottomMixin};
        padding-right: 0;
    }
`;

export const RowSectionCell = styled.div`
    margin-right: ${padding};
    margin-bottom: ${padding};
`;
