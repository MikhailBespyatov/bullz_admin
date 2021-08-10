import { BooleanAlignment, BorderRadius, Pointer, Rotation, Sizes } from 'types/styles';

export interface ImgWrapperProps extends Sizes, BooleanAlignment {}
export interface ImgProps extends Rotation, Pointer, BorderRadius, ImgWrapperProps {}
