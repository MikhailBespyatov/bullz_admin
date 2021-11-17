import { grey30 } from 'constants/styles/colors';
import { cardMargin, xs } from 'constants/styles/sizes';
import styled from 'styled-components';

export const CatalogContainerWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    background-color: ${grey30};
    border-radius: 24px;
    padding-left: ${cardMargin};
    padding-right: ${cardMargin};
    padding-top: ${cardMargin};
    padding-bottom: 48px;

    @media (max-width: ${xs}) {
        border-radius: 0;
    }
`;
