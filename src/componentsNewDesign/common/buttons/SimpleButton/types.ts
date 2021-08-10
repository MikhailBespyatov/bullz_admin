import {
    Background,
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
        BorderRadiusProperties,
        BorderProperties,
        Padding,
        FlexAlignment,
        Margin,
        MinSizes,
        Blocked {}
