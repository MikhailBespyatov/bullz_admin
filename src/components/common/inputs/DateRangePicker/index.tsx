import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import { sliderWidth } from 'components/common/inputs/Slider/constants';
import { marginRight } from 'components/common/tags/Tags/constants';
import { Title } from 'components/common/typography/titles/Title';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { dateFormat } from 'constants/defaults/formats';
import { noop } from 'constants/functions';
import { padding } from 'constants/styles/sizes';
import { Moment } from 'moment';
import React from 'react';
import { Title as TitleProps } from 'types/data';
import { dateRangeMomentType } from 'types/types';

const { RangePicker } = DatePicker;

type MomentType = dateRangeMomentType;

interface Props extends TitleProps {
    onClick?: RangePickerProps['onChange'];
    format?: string;
    defaultValue?: [Moment, Moment];
}

export const DateRangePicker = ({
    title = 'Filter between dates: ',
    //subtitle = 'Filter by dates',
    onClick = noop,
    format = dateFormat,
    defaultValue
}: Props) => {
    //const [value, setValue] = useState<MomentType>(null);

    ////@ts-ignore
    const onChange: RangePickerProps['onChange'] = value => {
        onClick(value, [dateFormat, dateFormat]);
    };

    //const handleClick = () => onClick(value);

    return (
        <>
            <Column marginRight={marginRight}>
                <Title>{title}</Title>
            </Column>
            <Column marginRight={marginRight} width={sliderWidth}>
                <RangePicker
                    defaultValue={defaultValue}
                    format={format}
                    style={{ width: '100%', marginBottom: padding }}
                    onChange={onChange}
                />
            </Column>
            {/* <Button onClick={handleClick}>{subtitle}</Button> */}
        </>
    );
};
