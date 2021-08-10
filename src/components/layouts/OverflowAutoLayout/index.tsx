import React, { FC } from 'react';
import { AdaptiveFixedWidthWrapper } from 'components/grid/wrappers/AdaptiveFixedWidthWrapper';
import { OverflowAutoWrapper } from 'components/grid/wrappers/OverflowAutoWrapper';

export interface Props {}

export const OverflowAutoLayout: FC<Props> = ({ children }) => (
    <OverflowAutoWrapper>
        <AdaptiveFixedWidthWrapper>{children}</AdaptiveFixedWidthWrapper>
    </OverflowAutoWrapper>
);
