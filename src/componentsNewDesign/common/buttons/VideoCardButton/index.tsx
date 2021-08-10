import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import {
    videoCardButtonBackgroundColorPrimary,
    videoCardButtonBorderRadius,
    videoCardButtonMarginBottom,
    videoCardButtonPadding,
    videoCardButtonTextColorPrimary,
    videoCardButtonTextFontSize,
    videoCardButtonWidth
} from 'componentsNewDesign/common/buttons/VideoCardButton/constants';
import React, { FC } from 'react';
import { Disabled } from 'types/form';
import { ReactClick } from 'types/react';
import { BackgroundColor, BorderRadius, Color, MarginRightBottom, Padding, Sizes, TextProperties } from 'types/styles';

export interface VideoCardButtonProps
    extends ReactClick<HTMLButtonElement>,
        BackgroundColor,
        BorderRadius,
        Color,
        TextProperties,
        Sizes,
        Disabled,
        Padding,
        MarginRightBottom {}

export const VideoCardButton: FC<VideoCardButtonProps> = ({
    children,
    backgroundColor,
    color,
    fontSize,
    borderRadius,
    padding,
    width,
    ...props
}) => (
    <SimpleButton
        background={backgroundColor || videoCardButtonBackgroundColorPrimary}
        borderRadius={borderRadius || videoCardButtonBorderRadius}
        color={color || videoCardButtonTextColorPrimary}
        fontSize={fontSize || videoCardButtonTextFontSize}
        marginBottom={videoCardButtonMarginBottom}
        padding={padding || videoCardButtonPadding}
        width={width || videoCardButtonWidth}
        {...props}
    >
        {children}
    </SimpleButton>
);
