import { paginationHeight } from 'componentsNewDesign/layouts/Pagination/constants';
import { modalHorizontalPadding } from 'componentsNewDesign/wrappers/ModalWrapper/constant';
import { grey, grey28 } from 'constants/styles/colors';
import { flexCenter, flexStart } from 'constants/styles/mixins';
import { borderWidth, footerHeight, lg_1, padding, sideBarWidth, smallSideBarWidth, xs } from 'constants/styles/sizes';
import styled from 'styled-components';

export const Wrapper = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${paginationHeight};
    background-color: ${grey28};
    // height: ${footerHeight};
    ${flexStart};
    flex-direction: row;
    justify-content: space-between;
    // border-top: ${borderWidth} solid ${grey};
    z-index: 9;
    padding: calc(2 * ${padding});
    padding-left: calc(2 * ${padding} + ${sideBarWidth});

    @media (max-width: ${lg_1}) {
        padding-left: calc(2 * ${padding} + ${smallSideBarWidth});
    }

    @media (max-width: ${xs}) {
        padding: 0 4px;
        align-items: center;
    }
`;

export const TrendingsWrapper = styled.footer`
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${paginationHeight};
    background-color: ${grey28};
    ${flexCenter};
    flex-direction: row;
    justify-content: space-between;
    // border-top: ${borderWidth} solid ${grey};
    z-index: 9;
    margin-left: -${modalHorizontalPadding};
    margin-right: -${modalHorizontalPadding};

    @media screen and (max-width: ${xs}) {
        margin-left: -13px;
        margin-right: -9px;
        padding: 0 8px;
    }
`;
