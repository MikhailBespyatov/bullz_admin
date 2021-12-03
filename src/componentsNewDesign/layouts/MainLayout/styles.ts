import { headerHeight } from 'componentsNewDesign/grid/Header/constants';
import { grey28, grey30 } from 'constants/styles/colors';
import { flexStart } from 'constants/styles/mixins';
import { footerHeight, lg, lg_1, padding, sideBarWidth, smallSideBarWidth, xs } from 'constants/styles/sizes';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: calc(100% - 4 * ${padding} - ${footerHeight});
    padding: calc(2 * ${padding});
    padding-bottom: calc(2 * ${padding} + ${footerHeight});
    //padding-right: 0;
    ${flexStart};
    flex-direction: column;
    background-color: ${grey28};

    @media (min-width: ${lg}) {
        padding-left: calc(2 * ${padding} + ${sideBarWidth});
    }
    @media (max-width: ${lg_1}) {
        padding-left: calc(2 * ${padding} + ${smallSideBarWidth});
    }
    @media (max-width: ${xs}) {
        padding: 0;
        padding-top: ${headerHeight};
        height: auto;
        background-color: ${grey30};
    }
`;
