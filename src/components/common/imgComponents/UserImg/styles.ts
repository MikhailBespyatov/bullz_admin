import { imgDiameter } from 'components/common/imgComponents/UserImg/constants';
import { ImgWrapperProps } from 'componentsNewDesign/common/imgComponents/CustomImg/types';
import styled from 'styled-components';

export const ImgWrapper = styled.div<ImgWrapperProps>`
    position: relative;
    width: ${imgDiameter};
    height: ${imgDiameter};
    margin: 0;
`;
