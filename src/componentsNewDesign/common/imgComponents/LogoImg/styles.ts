import logoImg from 'assets/logo_bullz_white.svg';
import { headerLogoHeight, logoDivider } from 'componentsNewDesign/common/imgComponents/LogoImg/constants';
import styled from 'styled-components';

interface Props {
    height?: string;
}

export const LogoImg = styled.div<Props>`
    height: ${({ height }) => height || headerLogoHeight};
    width: ${({ height }) =>
        height ? `calc(${height} * ${logoDivider})` : `calc(${headerLogoHeight} * ${logoDivider})`};

    background-image: url(${logoImg});
    background-size: cover;
`;
