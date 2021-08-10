import { Select as AntSelect } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { noop } from 'constants/functions';
import React from 'react';

const { Option } = AntSelect;

interface Props extends SelectProps<string> {
    values: string[];
    data?: string[];
}

export const Select = ({ values, data = values, defaultValue = values[0], onChange = noop, ...rest }: Props) => (
    <AntSelect defaultValue={defaultValue} style={{ width: 120 }} onChange={onChange} {...rest}>
        {values?.map((item, i) => (
            <Option key={item} value={item}>
                {data[i]}
            </Option>
        ))}
    </AntSelect>
);
