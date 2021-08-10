import { videoBorderRadius } from 'componentsNewDesign/common/Video/constants';
import styled from 'styled-components';
import { ReactRefType } from 'types/react';
import { MaxSizes, Sizes } from 'types/styles';

export interface VideoProps extends Sizes, MaxSizes, ReactRefType<HTMLVideoElement> {
    poster?: string;
    videoSource?: string;
    videoType?: string;
}

export const Video = styled.video<VideoProps>`
    width: 100%;
    height: 100%;
    ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}`};
    border-radius: ${videoBorderRadius};
    outline: none;
`;
