import playButtonImage from 'assets/play_button_image.svg';
import { PlayButtonWrapper } from 'componentsNewDesign/common/buttons/PlayButton/styles';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React, { FC } from 'react';
import { ReactClick } from 'types/react';

export const PlayButton: FC<ReactClick<HTMLButtonElement>> = props => (
    <PlayButtonWrapper {...props}>
        <CustomImg alt="Play button" height="100%" src={playButtonImage} width="100%" />
    </PlayButtonWrapper>
);
