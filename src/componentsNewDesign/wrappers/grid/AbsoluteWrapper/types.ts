import { IsClosed } from 'types/data';
import { AbsoluteLocation, Background, Sizes, ZIndex } from 'types/styles';

export interface AbsoluteWrapperProps extends AbsoluteLocation, IsClosed, Sizes, ZIndex, Background {}
