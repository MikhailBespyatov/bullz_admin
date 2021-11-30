import {
    cardButtonHeight,
    cardButtonMarginBottom,
    cardButtonMinWidth,
    cardButtonTextFontSize,
    disabledCardButtonTextColor,
    textColors,
    TextColorsType
} from 'componentsNewDesign/common/buttons/CardButton/constants';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
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
    fontSize?: string;
    textHover?: string;
    type?: TextColorsType;
    padding?: string;
    isLoading?: boolean;
}

export const CardButton: FC<UserCardButtonProps> = ({
    background,
    backgroundHover,
    children,
    isLoading = false,
    disabled,
    padding,
    color,
    textHover,
    type = 'primary',
    width,
    fontSize,
    onClick,
    ...props
}) => (
    <SimpleButton
        background={background || grey23}
        backgroundHover={backgroundHover || 'none'}
        color={disabled ? disabledCardButtonTextColor : color ? color : textColors[type]}
        disabled={disabled}
        fontSize={fontSize || cardButtonTextFontSize}
        height={cardButtonHeight}
        marginBottom={cardButtonMarginBottom}
        minWidth={width || cardButtonMinWidth}
        padding={padding}
        textHover={textHover || 'none'}
        width={width}
        onClick={disabled ? noop : onClick}
        {...props}
    >
        {isLoading ? <Loader isWhite size="middle" /> : children}
    </SimpleButton>
);
