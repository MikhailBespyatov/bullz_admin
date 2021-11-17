import styled from 'styled-components';
import { IsClosed } from '../../../../types/data';
import { ContentWrapper } from '../../../wrappers/ContentWrapper';

export const FilterMobileWrapper = styled.div<IsClosed>`
    position: relative;
    width: 100%;
    transform: ${({ isClosed }) => (isClosed ? 'scaleY(0)' : 'scaleY(1)')};
    margin-top: ${({ isClosed }) => (isClosed ? '-127px' : '0')};
    transition-property: margin-top, transform;
    transition-duration: 0.3s, 0.3s;
`;

export const SearchMobileWrapper = styled(ContentWrapper)<IsClosed>`
    width: 100%;
    transform: ${({ isClosed }) => (isClosed ? 'scaleY(0)' : 'scaleY(1)')};
    margin-top: ${({ isClosed }) => (isClosed ? '-127px' : '0')};
    transition-property: margin-top, transform;
    transition-duration: 0.3s, 0.3s;
`;
