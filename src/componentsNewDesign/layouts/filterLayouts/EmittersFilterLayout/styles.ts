import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { grey30 } from 'constants/styles/colors';
import { filterMargin, lg, xxs } from 'constants/styles/sizes';
import styled from 'styled-components';
import { IsClosed } from 'types/data';

export const FilterMobileWrapper = styled.div<IsClosed>`
    position: relative;
    width: 100%;
    transform: ${({ isClosed }) => (isClosed ? 'scaleY(0)' : 'scaleY(1)')};
    margin-top: ${({ isClosed }) => (isClosed ? '-180px' : '0')};
    transition-property: margin-top, transform;
    transition-duration: 0.3s, 0.3s;

    @media (max-width: 480px) {
        margin-bottom: -10px;
    }
`;

export const SearchMobileWrapper = styled(ContentWrapper)<IsClosed>`
    width: 100%;
    transform: ${({ isClosed }) => (isClosed ? 'scaleY(0)' : 'scaleY(1)')};
    margin-top: ${({ isClosed }) => (isClosed ? '-127px' : '0')};
    transition-property: margin-top, transform;
    transition-duration: 0.3s, 0.3s;

    @media (max-width: 480px) {
        background-color: ${grey30};
    }
`;

export const ContentResetWrapper = styled.div`
    background-color: ${grey30};
    display: flex;
    align-items: center;
    justify-content: end;
`;

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
