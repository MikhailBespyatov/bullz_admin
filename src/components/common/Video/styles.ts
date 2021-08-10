import { PlayThumbnailRadius } from 'components/common/Video/constants';
import { primaryColor } from 'constants/styles/colors';
import { borderRadius, borderWidth } from 'constants/styles/sizes';
import styled from 'styled-components';

export const PlayThumbnailWrapper = styled.div`
    position: absolute;
    top: calc(50% - ${PlayThumbnailRadius} / 2);
    left: calc(50% - ${PlayThumbnailRadius} / 2);
    width: ${PlayThumbnailRadius};
    height: ${PlayThumbnailRadius};
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
`;

export const Video = styled.video`
    width: 100%;
    height: 100%;
    //border-radius: ${borderRadius};
    border-top-left-radius: ${borderRadius};
    border-top-right-radius: ${borderRadius};
    border: ${borderWidth} solid ${primaryColor};
    &:focus {
        outline: none;
    }
`;

export const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
`;
