import playImg from 'assets/play.svg';
import { Img, PlayThumbnailWrapper } from 'components/common/Video/styles';
import React from 'react';
import { NoopClick } from 'types/global';

export { Video } from './styles';

interface Props extends NoopClick {
    src?: string;
    alt?: string;
}

export const PlayThumbnail = ({ src = playImg, alt = 'play', onClick }: Props) => (
    <PlayThumbnailWrapper onClick={onClick}>
        <Img alt={alt} src={src} />
    </PlayThumbnailWrapper>
);
