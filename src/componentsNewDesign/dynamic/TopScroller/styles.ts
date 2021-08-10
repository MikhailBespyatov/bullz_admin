import { scrollerDiameter } from 'componentsNewDesign/dynamic/TopScroller/constants';
import { ScrollerProps } from 'componentsNewDesign/dynamic/TopScroller/types';
import { transitionTime } from 'constants/styles/others';
import styled from 'styled-components';

export const Wrapper = styled.div<ScrollerProps>`
    display: flex;
    width: ${scrollerDiameter};
    height: ${scrollerDiameter};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    justify-content: center;
    align-items: center;
    transition: display ${transitionTime};
    cursor: pointer;
`;
