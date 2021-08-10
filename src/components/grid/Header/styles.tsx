import { Layout } from 'antd';
import {
    copyIconDiameter,
    headerMarginRight,
    popupWrapperPaddingLeft,
    popupWrapperWidth
} from 'components/grid/Header/constants';
import { darkGrey, primaryColor, white } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import { headerHeight, padding, sm_1 } from 'constants/styles/sizes';
import styled from 'styled-components';

const { Header } = Layout;

export const HeaderLayout = styled(Header)`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding-right: ${headerMarginRight};
    padding-left: ${headerMarginRight};
    z-index: 19;
    height: ${headerHeight};
    overflow: hidden;
    @media (max-width: ${sm_1}) {
        padding: ${padding};
        padding-left: 0;
    }
`;

export const InfoBlock = styled.span`
    height: 100%;
    ${flexCenter};
    margin-left: ${headerMarginRight};
    //color: ${white}
    color: ${darkGrey};
`;

export const LogoutBlock = styled(InfoBlock)`
    margin-left: auto;
    cursor: pointer;
    &:hover {
        color: ${primaryColor};
    }
`;

export const PopupWrapper = styled.div`
    width: ${popupWrapperWidth};
    height: ${copyIconDiameter};
    padding-left: ${popupWrapperPaddingLeft};
`;

export const IconWrapper = styled.div`
    display: none;
`;

export const CopyWrapper = styled.div`
    ${flexCenter};
    &:hover ${IconWrapper} {
        display: flex;
    }
`;
