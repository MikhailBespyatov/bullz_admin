import { Disabled } from 'types/form';
import { Quantity } from 'types/global';
import { AbsoluteLocation, FixSize, RemoveMarginBottom, RemovePaddingRight, Sizes } from 'types/styles';

export interface CardProps extends Disabled, FixSize {}

export interface DescriptionCellProps extends Sizes {}

export interface FeatureCellProps {}

export interface CardRowProps extends RemoveMarginBottom, RemovePaddingRight {
    alignCenter?: boolean;
    marginTop?: boolean;
}

export interface PinnedBlockProps extends AbsoluteLocation {}

export interface DescriptionCellProps extends Sizes {}

export interface FeatureCellProps extends Quantity {}
