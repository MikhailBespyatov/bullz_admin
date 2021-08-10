import {
    cardButtonHeight,
    cardButtonMarginBottom,
    cardButtonMinWidth,
    cardButtonTextFontSize
} from 'componentsNewDesign/common/buttons/CardButton/constants';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { grey21 } from 'constants/styles/colors';
import React, { FC } from 'react';
import { ReactClick } from 'types/react';
import { Blocked, Margin, Sizes } from 'types/styles';

export interface MakePrimaryButtonProps extends ReactClick<HTMLButtonElement>, Margin, Sizes, Blocked {
    children: string;
}

export const MakePrimaryButton: FC<MakePrimaryButtonProps> = ({ children, width, onClick, ...props }) => (
    <SimpleButton
        background="transparent"
        border={`1px solid ${grey21}`}
        fontSize={cardButtonTextFontSize}
        height={cardButtonHeight}
        marginBottom={cardButtonMarginBottom}
        minWidth={width || cardButtonMinWidth}
        width={width}
        onClick={onClick}
        {...props}
    >
        {children}
    </SimpleButton>
);
