import {
    cardButtonHeight,
    cardButtonMarginBottom,
    cardButtonMinWidth,
    cardButtonTextFontSize,
    disabledCardButtonTextColor,
    TextColorsType
} from 'componentsNewDesign/common/buttons/CardButton/constants';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { noop } from 'constants/functions';
import { grey23 } from 'constants/styles/colors';
import React, { FC } from 'react';
import { Disabled } from 'types/form';
import { ReactClick } from 'types/react';
import { Blocked, Margin, Sizes } from 'types/styles';

export interface UserCardButtonProps extends Disabled, ReactClick<HTMLButtonElement>, Margin, Sizes, Blocked {
    children: string;
    backgroundHover?: string;
    background?: string;
    color?: string;
    textHover?: string;
    type?: TextColorsType;
}

export const CardButton: FC<UserCardButtonProps> = ({
    background,
    backgroundHover,
    children,
    disabled,
    color,
    textHover,
    type = 'primary',
    width,
    onClick,
    ...props
}) => (
    <SimpleButton
        background={background || grey23}
        backgroundHover={backgroundHover || 'none'}
        color={disabled ? disabledCardButtonTextColor : color}
        disabled={disabled}
        fontSize={cardButtonTextFontSize}
        height={cardButtonHeight}
        marginBottom={cardButtonMarginBottom}
        minWidth={width || cardButtonMinWidth}
        textHover={textHover || 'none'}
        width={width}
        onClick={disabled ? noop : onClick}
        {...props}
    >
        {children}
    </SimpleButton>
);
