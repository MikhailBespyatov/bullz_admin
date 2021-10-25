import { StyledHashtag } from 'componentsNewDesign/common/tags/Hashtag/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { errorColor } from 'constants/styles/colors';
import styled from 'styled-components';

export const Wrapper = styled(StyledHashtag)`
    position: relative;
    margin-right: 6px;
    margin-bottom: 7px;
    border: 1px solid rgba(255, 255, 255, 0.5);
`;

export const CloseButton = styled(ClickableWrapper)`
    &:hover svg path {
        stroke: ${errorColor};
    }
`;
