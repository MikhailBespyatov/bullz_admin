import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { timeFormat } from 'constants/defaults/formats';
import format from 'date-fns/format';
import { useInterval } from 'hooks/use.interval';
import React, { useState } from 'react';
import { Color } from 'types/styles';

export const TimeBadge = ({ color }: Color) => {
    const [date, setDate] = useState(new Date());
    const formattedDate = format(date, timeFormat);

    useInterval(() => {
        setDate(new Date());
    }, 1000);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setDate(new Date());
    //     }, 1000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // });

    return <ContentText color={color}>{formattedDate}</ContentText>;
};
