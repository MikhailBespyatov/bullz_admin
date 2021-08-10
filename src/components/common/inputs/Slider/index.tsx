import { Slider as AntSlider } from 'antd';
import { SliderMarks } from 'antd/lib/slider';
import { Button } from 'components/common/buttons/Button';
import { marginRight, maximum, minimum, sliderWidth } from 'components/common/inputs/Slider/constants';
import { Title } from 'components/common/typography/titles/Title';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { noop } from 'constants/functions';
import React, { useState } from 'react';
import { Title as TitleProps } from 'types/data';

type DefaultValue = [number, number];

interface Props extends TitleProps {
    onClick?: (value: DefaultValue) => void;
    defaultValue?: [number, number];
    min?: number;
    max?: number;
}

export const Slider = ({
    title = 'years:',
    subtitle = 'filter by years',
    onClick = noop,
    defaultValue = [minimum, maximum],
    min = minimum,
    max = maximum
}: Props) => {
    const [value, setValue] = useState<DefaultValue>(defaultValue);

    let marks: SliderMarks = {};
    marks[min] = min.toString();
    marks[max] = max.toString();

    const onSliderChange = (value: DefaultValue) => setValue(value);

    const handleClick = () => onClick(value);

    return (
        <>
            <Column marginRight={marginRight}>
                <Title>
                    {value[0]} - {value[1]} {title}
                </Title>
            </Column>
            <Column marginRight={marginRight} width={sliderWidth}>
                <AntSlider
                    range
                    defaultValue={defaultValue}
                    marks={marks}
                    max={max}
                    min={min}
                    //tooltipVisible={false}
                    onChange={onSliderChange}
                />
            </Column>
            <Button onClick={handleClick}>{subtitle}</Button>
        </>
    );
};
