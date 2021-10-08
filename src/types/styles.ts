import { size } from 'types/types';

export interface Reverse {
    reverse?: boolean;
}

export interface AbsoluteLocation {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}

export interface NoWrap {
    noWrap?: boolean | 'unset';
}

export interface FlexBooleanAlignment extends NoWrap {
    alignCenter?: boolean;
    alignBaseline?: boolean;
    alignContentAround?: boolean;
    alignContentBetween?: boolean;
    alignEnd?: boolean;
    justifyCenter?: boolean;
    justifyBetween?: boolean;
    justifyAround?: boolean;
    justifyEvenly?: boolean;
    justifyEnd?: boolean;
}

export interface FlexAlignment {
    align?: string;
    justify?: string;
    direction?: string;
    wrap?: string;
}

export interface Center {
    center?: boolean;
}

export interface Sizes {
    width?: string;
    height?: string;
}

export interface FixSize {
    fixSize?: boolean;
}

export interface MinSizes {
    minWidth?: string;
    minHeight?: string;
}

export interface WidthMaxContent {
    widthMaxContent?: boolean;
}

export interface MaxSizes {
    maxWidth?: string;
    maxHeight?: string;
}

export interface BorderRadius {
    borderRadius?: string;
}

export interface BorderRadiusProperties {
    borderRadius?: string;
}

export interface BorderRadiusProperties extends BorderRadius {
    borderTopLeftRadius?: string;
    borderTopRightRadius?: string;
    borderBottomLeftRadius?: string;
    borderBottomRightRadius?: string;
}

export interface BorderProperties {
    border?: string;
    borderTop?: string;
    borderLeft?: string;
    borderRight?: string;
    borderBottom?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
}

export interface BoxShadow {
    boxShadow?: string;
}

export interface Background {
    background?: string;
}

export interface Blocked {
    blocked?: boolean;
}

export interface BackgroundColor {
    backgroundColor?: string;
}

export interface BackgroundHover {
    backgroundHover?: string;
}

export interface TextAlignment {
    alignTextCenter?: boolean;
}

export interface Color {
    color?: string;
}

export interface ForcedColor {
    forcedColor?: string;
}

export interface TextProperties extends NoWrap, Color {
    fontFamily?: string;
    fontStyle?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    alignCenter?: boolean;
    alignEnd?: boolean;
    uppercase?: boolean;
}

export interface TextDecoration {
    textDecoration?: string;
}

export interface RemoveMarginBottom {
    removeMarginBottom?: boolean;
}

export interface RemoveMarginRight {
    removeMarginRight?: boolean;
}

export interface RemoveMarginRightBottom extends RemoveMarginBottom, RemoveMarginRight {}

export interface MarginRight {
    marginRight?: string;
}

export interface MarginBottom {
    marginBottom?: string;
}

export interface MarginRightBottom extends MarginRight, MarginBottom {}

export interface Margin extends MarginRightBottom {
    margin?: string;
    marginLeft?: string;
    marginTop?: string;
}

export interface RemovePaddingRight {
    removePaddingRight?: boolean;
}

export interface PaddingRight {
    paddingRight?: string;
}

export interface PaddingLeft {
    paddingLeft?: string;
}
export interface PaddingBottom {
    paddingBottom?: string;
}

export interface PaddingTop {
    paddingTop?: string;
}

export interface PaddingRightLeft extends PaddingRight, PaddingLeft {}
export interface PaddingTopBottom extends PaddingTop, PaddingBottom {}

export interface HorizontalPadding extends PaddingRightLeft {
    horizontalPadding?: string;
}

export interface Padding extends PaddingRightLeft, PaddingTopBottom {
    padding?: string;
}

export interface Rotation {
    rotate?: number;
}

export interface Pointer {
    pointer?: boolean;
}

export interface Opacity {
    opacity?: number;
}

export interface Visibility {
    visible?: boolean;
}

export interface Overflow {
    overflow?: string;
}

export interface ZIndex {
    zIndex?: string;
}

export interface Show {
    show: boolean;
}

export interface Ellipsis {
    ellipsis?: boolean;
}

export interface BooleanAlignment {
    center?: boolean;
}

export interface Size {
    sizes?: size;
}

export interface Grow {
    grow?: boolean;
}

export interface FlexGrow {
    flexGrow?: string;
}

export interface FlexShrink {
    flexShrink?: string;
}

export interface FlexBasis {
    flexBasis?: string;
}

export interface Round {
    round?: boolean;
}

export interface FlexDirection {
    flexDirection?: 'column' | 'row';
}

export interface StrictVisibility {
    visible: boolean;
}

export interface Visibility {
    visible?: boolean;
}
