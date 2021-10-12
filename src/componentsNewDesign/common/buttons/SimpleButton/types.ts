import {
    Background,
    BackgroundHover,
    Blocked,
    BorderProperties,
    BorderRadiusProperties,
    FlexAlignment,
    Margin,
    MinSizes,
    Padding,
    Sizes,
    TextHover,
    TextProperties
} from 'types/styles';

export interface SimpleButtonProps
    extends Sizes,
        TextProperties,
        Background,
        BackgroundHover,
        TextHover,
        BorderRadiusProperties,
        BorderProperties,
        Padding,
        FlexAlignment,
        Margin,
        MinSizes,
        Blocked {}
