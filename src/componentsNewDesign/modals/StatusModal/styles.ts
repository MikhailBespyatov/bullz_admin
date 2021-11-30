import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { black, grey29, white } from 'constants/styles/colors';
import { absoluteCenterAlignmentMixin } from 'constants/styles/mixins';
import { xs } from 'constants/styles/sizes';
import styled from 'styled-components';

export const ModalContentWrapper = styled(ContentWrapper)`
    ${absoluteCenterAlignmentMixin};
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 420px;
    min-height: 380px;
    padding: 10px 22px;
    border-radius: 16px;
    z-index: ${sideBarZIndex + 2};
    background-color: ${grey29};

    @media (max-width: ${xs}) {
        padding: 30px 22px;
        width: 276px;
        min-height: 280px;
    }
`;

export const TitleText = styled.span`
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin: 40px 0 6px;

    @media (max-width: ${xs}) {
        font-size: 20px;
        margin: 35px 0 12px;
    }
`;

export const ContentText = styled.span`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #999999;

    @media (max-width: ${xs}) {
        font-size: 14px;
    }
`;

export const StyledButton = styled(SimpleButton)`
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    height: 35px;
    padding: 8px 32px;
    color: ${white};
    background-color: ${black};
    border-radius: 4px;
    margin: 35px 0 20px;
`;
