import { playButtonWidthAndHeight } from 'componentsNewDesign/common/buttons/PlayButton/constants';
import { disableDefaultButtonStyleMixin, flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const PlayButtonWrapper = styled.button`
    ${disableDefaultButtonStyleMixin};
    ${flexCenter};
    position: absolute;
    top: calc(50% - ${playButtonWidthAndHeight} / 2);
    left: calc(50% - ${playButtonWidthAndHeight} / 2);
    width: ${playButtonWidthAndHeight};
    height: ${playButtonWidthAndHeight};
    background-color: transparent;
    cursor: pointer;
    z-index: 1;
`;
