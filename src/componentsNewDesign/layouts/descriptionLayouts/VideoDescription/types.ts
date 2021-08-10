import {
    Background,
    BorderRadiusProperties,
    Color,
    HorizontalPadding,
    MarginRight,
    Sizes,
    TextProperties
} from 'types/styles';

export interface VideoCardProps extends Sizes, TextProperties, Background, BorderRadiusProperties, HorizontalPadding {}

export interface LanguagesOfAudioProps extends TextProperties, Sizes, Color {}

export interface VideoCommentsWrapperProps extends Sizes, MarginRight {}
