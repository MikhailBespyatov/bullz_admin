import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { AddIcon } from 'componentsNewDesign/common/icons/AddIcon';
import { hoverModalHeight, hoverModalWidth } from 'componentsNewDesign/modals/CreateTrendingCardHoverModal/constants';
import { black } from 'constants/styles/colors';
import React from 'react';
import { ReactClick } from 'types/react';

export interface Props extends YEAY.GetTrendingUserResponse, ReactClick<HTMLButtonElement> {}

export const CreateTrendingCardHoverModal = ({ onClick }: Props) => (
    <SimpleButton background={black} height={hoverModalHeight} width={hoverModalWidth} onClick={onClick}>
        <AddIcon />
    </SimpleButton>
);
