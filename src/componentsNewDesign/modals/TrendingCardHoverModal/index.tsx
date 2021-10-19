import { MoreInfoIcon } from 'componentsNewDesign/common/icons/MoreInfoIcon';
import { TrashIcon } from 'componentsNewDesign/common/icons/TrashIcon';
import { clickableWrapperWidthAndHeight } from 'componentsNewDesign/modals/TrendingCardHoverModal/constants';
import { ActionBlockWrapper, Divider } from 'componentsNewDesign/modals/TrendingCardHoverModal/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import React from 'react';
import { RemoveClick } from 'types/modals';
import { ReactClick } from 'types/react';

export interface Props extends BULLZ.GetTrendingUserResponse, RemoveClick, ReactClick<HTMLButtonElement> {}

export const TrendingCardHoverModal = ({ onRemove, onClick }: Props) => (
    <>
        <ActionBlockWrapper>
            <ClickableWrapper
                height={clickableWrapperWidthAndHeight}
                width={clickableWrapperWidthAndHeight}
                onClick={onClick}
            >
                <MoreInfoIcon />
            </ClickableWrapper>

            <Divider />

            <ClickableWrapper
                height={clickableWrapperWidthAndHeight}
                width={clickableWrapperWidthAndHeight}
                onClick={onRemove}
            >
                <TrashIcon />
            </ClickableWrapper>
        </ActionBlockWrapper>
    </>
);
