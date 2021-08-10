import React, { FC } from 'react';
import { getTotalRecords } from 'utils/usefulFunctions';
import { Text, TotalBadgeWrapper } from './style';

interface TotalBadgeProps {
    quantity: number | undefined | null;
}

export const TotalBadge: FC<TotalBadgeProps> = ({ quantity }) => (
    <TotalBadgeWrapper alignCenter>
        Total
        <Text>{getTotalRecords(quantity)}</Text>
    </TotalBadgeWrapper>
);
