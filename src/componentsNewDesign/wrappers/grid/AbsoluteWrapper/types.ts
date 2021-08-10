import { IsClosed } from 'types/data';
import { AbsoluteLocation, Sizes, ZIndex } from 'types/styles';

export interface AbsoluteWrapperProps extends AbsoluteLocation, IsClosed, Sizes, ZIndex {}
