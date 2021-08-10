import {
    notificationBlockBackgroundColor,
    notificationBlockBorderRadius,
    notificationBlockFontSize,
    notificationBlockHeight,
    notificationBlockHorizontalPadding,
    notificationBlockTextColor
} from 'componentsNewDesign/common/typography/NotificationBadge/constants';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';
import { BackgroundColor, BorderRadius, HorizontalPadding, Padding, Sizes, TextProperties } from 'types/styles';

export interface NotificationBadgeProps
    extends Sizes,
        Padding,
        BackgroundColor,
        BorderRadius,
        TextProperties,
        HorizontalPadding {
    children: string;
}

export const NotificationBadge = styled.div<NotificationBadgeProps>`
    font-size: ${({ fontSize }) => fontSize || notificationBlockFontSize};
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ color }) => color || notificationBlockTextColor};
    ${({ width }) => width && `width: ${width}`};
    height: ${({ height }) => height || notificationBlockHeight};
    border-radius: ${({ borderRadius }) => borderRadius || notificationBlockBorderRadius};
    background-color: ${({ backgroundColor }) => backgroundColor || notificationBlockBackgroundColor};
    padding: 0 ${({ horizontalPadding }) => horizontalPadding || notificationBlockHorizontalPadding};
    white-space: nowrap;
    ${flexCenter};
`;
