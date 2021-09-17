import { grey23 } from 'constants/styles/colors';
import { cardMargin } from 'constants/styles/sizes';
import styled from 'styled-components';

export const CatalogContainerWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    background-color: ${grey23};
    border-radius: 24px;
    padding-left: ${cardMargin};
    padding-right: ${cardMargin};
    padding-top: ${cardMargin};
    padding-bottom: 48px;
`;
