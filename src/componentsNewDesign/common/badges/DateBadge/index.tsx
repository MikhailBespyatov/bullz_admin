import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { dateBadgeFormat } from 'constants/defaults/formats';
import format from 'date-fns/format';
import React from 'react';
import { Color } from 'types/styles';

interface DateBadgeProps extends Color {
    customDate?: Date;
}

export const DateBadge = ({ customDate, color }: DateBadgeProps) => {
    const date = customDate || new Date();
    const formattedDate = format(date, dateBadgeFormat);

    return <ContentText color={color}>Current Date: {formattedDate}</ContentText>;
};
