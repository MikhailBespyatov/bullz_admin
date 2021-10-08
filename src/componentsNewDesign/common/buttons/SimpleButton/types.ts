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
    TextProperties
} from 'types/styles';

export interface SimpleButtonProps
    extends Sizes,
        TextProperties,
        Background,
        BackgroundHover,
        BorderRadiusProperties,
        BorderProperties,
        Padding,
        FlexAlignment,
        Margin,
        MinSizes,
        Blocked {}
