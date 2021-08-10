import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { AddIcon } from 'componentsNewDesign/common/icons/AddIcon';
import {
    buttonBackgroundColor,
    hoverModalHeight,
    hoverModalWidth
} from 'componentsNewDesign/modals/CreateTrendingCardHoverModal/constants';
import React from 'react';
import { ReactClick } from 'types/react';

export interface Props extends YEAY.GetTrendingUserResponse, ReactClick<HTMLButtonElement> {}

export const CreateTrendingCardHoverModal = ({ onClick }: Props) => (
    <SimpleButton
        background={buttonBackgroundColor}
        height={hoverModalHeight}
        width={hoverModalWidth}
        onClick={onClick}
    >
        <AddIcon />
    </SimpleButton>
);
