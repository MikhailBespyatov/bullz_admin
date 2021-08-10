import { StyledHashtag } from 'componentsNewDesign/common/tags/Hashtag/styles';
import { HashtagProps } from 'componentsNewDesign/common/tags/Hashtag/types';
import React from 'react';

interface Props extends HashtagProps {
    text: string;
}

export const Hashtag = ({ text, background }: Props) => (
    <StyledHashtag background={background}>&#35;{text}</StyledHashtag>
);

export const VideoCardHashtag = ({ text, background }: Props) => <Hashtag background={background} text={text} />;
