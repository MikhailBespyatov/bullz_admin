import { graphicInfoBlockHeight } from 'componentsNewDesign/layouts/blocks/GraphicInfoBlock/constants';
import { disableDefaultHStyleMixin, ellipsisMixin } from 'constants/styles/mixins';
import styled from 'styled-components';
import { Background, Color } from 'types/styles';

export const Wrapper = styled.div<Background>`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 122px;
    height: ${graphicInfoBlockHeight};
    background: ${({ background }) => background || 'white'};
    padding: 0 8px;
    cursor: pointer;
`;

export const Title = styled.h3<Color>`
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: 0.04em;
    text-align: left;
    color: ${({ color }) => color || 'black'};
    ${disableDefaultHStyleMixin};
    ${ellipsisMixin};
`;

export const Subtitle = styled.h4<Color>`
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.04em;
    text-align: left;
    color: ${({ color }) => color || 'white'};
    opacity: 0.4;
    ${disableDefaultHStyleMixin};
    ${ellipsisMixin};
`;
