import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import {
    modalContentWrapperBackground,
    modalContentWrapperPaddingLeft,
    modalContentWrapperPaddingRight,
    modalContentWrapperVerticalPadding
} from 'componentsNewDesign/wrappers/ModalWrapper/constant';
import { grey26 } from 'constants/styles/colors';
import { absoluteCenterAlignmentMixin } from 'constants/styles/mixins';
import { sideBarWidth, xxl_1 } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Overflow } from 'types/styles';

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${modalContentWrapperBackground};
    padding-left: ${sideBarWidth};
    padding: 220px /*${modalContentWrapperVerticalPadding}*/ ${modalContentWrapperPaddingRight}
        ${modalContentWrapperVerticalPadding} ${modalContentWrapperPaddingLeft};
    z-index: ${sideBarZIndex + 1};
    overflow: auto;

    @media (max-width: ${xxl_1}) {
        padding-left: ${modalContentWrapperVerticalPadding};
    }
`;

interface ModalContentWrapperProps extends Overflow {
    background?: string;
}

export const ModalContentWrapper = styled(ContentWrapper)<ModalContentWrapperProps>`
    ${absoluteCenterAlignmentMixin};
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 80vw;
    max-height: 80vh;
    overflow: ${({ overflow }) => overflow || 'auto'};
    background: ${({ background }) => (background ? background : grey26)};
`;
