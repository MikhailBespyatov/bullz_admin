import { Background, BorderRadiusProperties, Color, HorizontalPadding, Sizes, TextProperties } from 'types/styles';

export interface VideoCardProps extends Sizes, TextProperties, Background, BorderRadiusProperties, HorizontalPadding {}

export interface ContentTextProps extends TextProperties, Sizes, Color, HorizontalPadding {}

export interface LanguagesOfAudioProps extends TextProperties, Sizes, Color {}
