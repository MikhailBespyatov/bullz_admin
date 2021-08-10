import { paddingTop } from 'components/layouts/MainLayout/constants';
import { headerHeight } from 'componentsNewDesign/grid/Header/constants';
import { backgroundColor } from 'constants/styles/colors';
import { flexStart } from 'constants/styles/mixins';
import { CloseButtonDiameter, footerHeight, padding, sideBarWidth, sm, sm_1 } from 'constants/styles/sizes';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    //min-height: 100%;
    padding: calc(2 * ${padding});
    padding-top: ${headerHeight};
    ${flexStart};
    flex-direction: column;
    background-color: ${backgroundColor};
    @media (min-width: ${sm}) {
        padding-left: calc(2 * ${padding} + ${sideBarWidth});
    }
    @media (max-width: ${sm_1}) {
        padding: calc(2 * ${padding});
        padding-top: calc(2 * ${padding} + ${CloseButtonDiameter} + ${paddingTop});
    }
    padding-bottom: calc(0 * ${padding} + ${footerHeight});
    padding-right: 0;
`;
