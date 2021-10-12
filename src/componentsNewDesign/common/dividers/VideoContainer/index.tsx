import noVideoPoster from 'assets/no_video_poster.svg';
import { PlayButton } from 'componentsNewDesign/common/buttons/PlayButton';
import { Video } from 'componentsNewDesign/common/Video';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';
import { MaxSizes, MinSizes, Sizes } from 'types/styles';
import { hlsIsSupported } from './constants';

export interface VideoContainerProps
    extends Pick<YEAY.AdminGetVideoResponse, 'thumbnailUrl'>,
        Pick<YEAY.VideoDetailsResponse, 'screenGrabUrl'>,
        Sizes,
        MinSizes,
        MaxSizes {
    videoSrc?: string;
}

export const VideoContainer = ({ videoSrc, thumbnailUrl, screenGrabUrl, ...sizes }: VideoContainerProps) => {
    const video = useRef<HTMLVideoElement>(null);
    const [startLoading, setStartLoading] = useState(false);

    const goLoading = () => setStartLoading(true);

    useEffect(() => {
        if (startLoading && hlsIsSupported && videoSrc && video.current) {
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video?.current?.play();
            });
        }
    }, [videoSrc, startLoading]);

    return (
        <>
            {!startLoading && videoSrc && hlsIsSupported && <PlayButton onClick={goLoading} />}
            <Row alignCenter justifyCenter {...sizes}>
                <Video
                    ref={video}
                    controls={!!videoSrc && hlsIsSupported}
                    poster={videoSrc && hlsIsSupported ? thumbnailUrl || screenGrabUrl || '' : noVideoPoster}
                    preload="metadata"
                />
            </Row>
        </>
    );
};
