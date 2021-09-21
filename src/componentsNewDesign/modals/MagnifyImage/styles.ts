import { ImgWrapperProps } from 'componentsNewDesign/common/imgComponents/CustomImg/types';
import { flexCenter } from 'constants/styles/mixins';
import { primaryBorderRadius } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Background, BorderRadius } from 'types/styles';

interface Props extends ImgWrapperProps, BorderRadius, Background {}

export const ImgWrapper = styled.div<Props>`
    ${flexCenter};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    ${({ center }) => center && 'margin: auto;'};
    ${({ background }) => background && `background-image: url(${background});`}
    //background-size: cover;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: ${({ borderRadius }) => borderRadius || primaryBorderRadius};
    overflow: hidden;
`;

export const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
    background-size: auto;
    visibility: hidden;
`;

export const ClickWrapper = styled.div`
    cursor: pointer;
`;

export const MagnifyWrapper = styled.div`
    max-width: 400px;
    max-height: 400px;
`;
