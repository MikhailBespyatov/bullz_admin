import {
    FlexBasis,
    FlexBooleanAlignment,
    FlexDirection,
    FlexGrow,
    FlexShrink,
    Margin,
    MaxSizes,
    MinSizes,
    Overflow,
    Sizes,
    WidthMaxContent,
    ZIndex
} from 'types/styles';

export interface FlexProps
    extends FlexBooleanAlignment,
        Margin,
        MaxSizes,
        Sizes,
        MinSizes,
        WidthMaxContent,
        ZIndex,
        Overflow {}

export interface FlexGrowProps extends FlexGrow, FlexBasis, FlexShrink, FlexDirection {}
