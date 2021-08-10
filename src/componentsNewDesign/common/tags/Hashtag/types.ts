import {
    Background,
    BorderProperties,
    BorderRadiusProperties,
    HorizontalPadding,
    Sizes,
    TextProperties
} from 'types/styles';

export interface HashtagProps
    extends Sizes,
        TextProperties,
        HorizontalPadding,
        Background,
        BorderRadiusProperties,
        BorderProperties {}
