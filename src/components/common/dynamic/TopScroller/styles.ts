import { scrollerDiameter } from 'components/common/dynamic/TopScroller/constants';
import { ScrollerProps } from 'components/common/dynamic/TopScroller/types';
import { transitionTime } from 'constants/styles/others';
import styled from 'styled-components';

export const Wrapper = styled.div<ScrollerProps>`
    width: ${scrollerDiameter};
    height: ${scrollerDiameter};
    display: ${({ show }) => (show ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    transition: display ${transitionTime};
    cursor: pointer;
`;
