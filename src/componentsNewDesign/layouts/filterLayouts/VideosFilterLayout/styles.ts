import { grey30 } from 'constants/styles/colors';
import { filterMargin, lg, xxs } from 'constants/styles/sizes';
import styled from 'styled-components';
import { IsClosed } from 'types/data';

export const ComponentWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0px;
    margin-bottom: ${filterMargin};

    @media (max-width: ${lg}) {
        flex-wrap: wrap;
        margin-bottom: 20px;
        width: 380px;
        justify-content: space-between;
    }

    @media (max-width: ${xxs}) {
        width: 100%;
    } ;
`;

export const FilterMobileWrapper = styled.div<IsClosed>`
    position: relative;
    width: 100%;
    transform: ${({ isClosed }) => (isClosed ? 'scaleY(0)' : 'scaleY(1)')};
    margin-top: ${({ isClosed }) => (isClosed ? '-347px' : '0')};
    margin-bottom: ${({ isClosed }) => (isClosed ? '0' : '10px')};
    transition-property: margin-top, transform;
    transition-duration: 0.3s, 0.3s;
`;

export const SearchMobileWrapper = styled.div<IsClosed>`
    width: 100%;
    transform: ${({ isClosed }) => (isClosed ? 'scaleY(0)' : 'scaleY(1)')};
    margin-top: ${({ isClosed }) => (isClosed ? '-169px' : '0')};
    transition-property: margin-top, transform;
    transition-duration: 0.3s, 0.3s;
    padding-top: 25px;
    background-color: ${grey30};
`;
