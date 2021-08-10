import { Disabled } from 'types/form';
import { Background, BackgroundColor, BorderRadius, MarginRightBottom, MaxSizes, Sizes } from 'types/styles';

export interface CardWrapperProps
    extends BackgroundColor,
        Background,
        BorderRadius,
        Disabled,
        MarginRightBottom,
        Sizes,
        MaxSizes {
    isSelected?: boolean;
}
