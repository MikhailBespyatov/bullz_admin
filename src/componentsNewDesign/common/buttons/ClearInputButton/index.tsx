import clearInputIcon from 'assets/clear_input_icon.svg';
import {
    clearInputButtonWidthAndHeight,
    clearInputIconWidthAndHeight
} from 'componentsNewDesign/common/buttons/ClearInputButton/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import React, { FC } from 'react';
import { ReactClick } from 'types/react';

export const ClearInputButton: FC<ReactClick<HTMLButtonElement>> = props => (
    <ClickableWrapper height={clearInputButtonWidthAndHeight} width={clearInputButtonWidthAndHeight} {...props}>
        <CustomImg
            alt="clear search button"
            height={clearInputIconWidthAndHeight}
            src={clearInputIcon}
            width={clearInputIconWidthAndHeight}
        />
    </ClickableWrapper>
);
