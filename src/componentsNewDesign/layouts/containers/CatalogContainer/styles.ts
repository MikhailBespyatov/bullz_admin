import { grey30 } from 'constants/styles/colors';
import { cardMargin, descriptionPadding, xs, xxs } from 'constants/styles/sizes';
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
        padding-bottom: 110px;
    }

    @media (max-width: ${xxs}) {
        padding-left: ${descriptionPadding};
        padding-right: ${descriptionPadding};
        padding-top: ${descriptionPadding};
    }
`;
