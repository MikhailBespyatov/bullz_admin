import { grey28 } from 'constants/styles/colors';
import { flexStart } from 'constants/styles/mixins';
import { footerHeight, padding, sideBarWidth, sm } from 'constants/styles/sizes';
import styled from 'styled-components';

export const Wrapper = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${grey28};
    //height: ${footerHeight};
    ${flexStart};
    flex-direction: row;
    justify-content: space-between;
    z-index: 9;
    padding: calc(2 * ${padding});
    @media (min-width: ${sm}) {
        padding-left: calc(2 * ${padding} + ${sideBarWidth});
    }
`;
