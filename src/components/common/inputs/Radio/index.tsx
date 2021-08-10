import { Radio as AntRadio } from 'antd';
import { RadioProps } from 'antd/lib/radio';
import { Title } from 'components/common/typography/titles/Title';
import React, { FC } from 'react';
import { Title as TitleProps } from 'types/data';

interface Props extends RadioProps, TitleProps {
    tagsData?: string[];
    tagsValues: string[];
    defaultValue?: string;
}

export const Radio: FC<Props> = ({
    onChange,
    title = 'Sort by: ',
    tagsValues,
    tagsData = tagsValues,
    defaultValue = tagsValues[0]
}) => (
    <>
        <Title>{title}</Title>
        <AntRadio.Group defaultValue={defaultValue} onChange={onChange}>
            {tagsValues.map((radio, i) => (
                <AntRadio.Button key={radio} value={radio}>
                    {tagsData[i]}
                </AntRadio.Button>
            ))}
        </AntRadio.Group>
    </>
);
