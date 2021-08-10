import {
    backgroundColors,
    cardButtonHeight,
    cardButtonMarginBottom,
    cardButtonMinWidth,
    cardButtonTextFontSize,
    disabledCardButtonBackgroundColor,
    disabledCardButtonTextColor,
    textColors,
    TextColorsType
} from 'componentsNewDesign/common/buttons/CardButton/constants';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import React, { FC } from 'react';
import { Disabled } from 'types/form';
import { ReactClick } from 'types/react';
import { Blocked, Margin, Sizes } from 'types/styles';
import { noop } from 'constants/functions';

export interface UserCardButtonProps extends Disabled, ReactClick<HTMLButtonElement>, Margin, Sizes, Blocked {
    children: string;
    type?: TextColorsType;
}

export const CardButton: FC<UserCardButtonProps> = ({
    children,
    type = 'primary',
    disabled,
    width,
    onClick,
    ...props
}) => (
    <SimpleButton
        background={disabled ? disabledCardButtonBackgroundColor : backgroundColors[type]}
        color={disabled ? disabledCardButtonTextColor : textColors[type]}
        disabled={disabled}
        fontSize={cardButtonTextFontSize}
        height={cardButtonHeight}
        marginBottom={cardButtonMarginBottom}
        minWidth={width || cardButtonMinWidth}
        width={width}
        onClick={disabled ? noop : onClick}
        {...props}
    >
        {children}
    </SimpleButton>
);
