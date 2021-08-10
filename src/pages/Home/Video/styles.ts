import { marginBottomMixin } from 'constants/styles/mixins';
import { videoWrapperHeight, videoWrapperWidth } from 'pages/Home/Video/constants';
import styled from 'styled-components';
import { filterMargin } from 'constants/styles/sizes';

export const VideoWrapper = styled.div`
    width: ${videoWrapperWidth};
    height: ${videoWrapperHeight};
    position: relative;
    ${marginBottomMixin};
`;

export const UserInfoWrapper = styled.div`
    padding-right: ${filterMargin};
`;
