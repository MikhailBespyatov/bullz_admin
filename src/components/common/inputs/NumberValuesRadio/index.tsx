import { Radio as AntRadio } from 'antd';
import { RadioProps } from 'antd/lib/radio';
import { Title } from 'components/common/typography/titles/Title';
import React from 'react';

interface Props<T> extends RadioProps /*, Name*/ {
    tagsData?: string[];
    tagsValues: T[];
    defaultValue?: T;
}

export const NumberValuesRadio: <T>({
    onChange,
    name,
    tagsValues,
    tagsData,
    defaultValue
}: Props<T>) => JSX.Element = ({
    onChange,
    name = 'Sort by: ',
    tagsValues,
    tagsData = tagsValues,
    defaultValue = tagsValues[0]
}) => (
    <>
        <Title>{name}</Title>
        <AntRadio.Group defaultValue={defaultValue} onChange={onChange}>
            {tagsValues.map((radio, i) => (
                <AntRadio.Button key={i.toString()} value={radio}>
                    {tagsData[i]}
                </AntRadio.Button>
            ))}
        </AntRadio.Group>
    </>
);
