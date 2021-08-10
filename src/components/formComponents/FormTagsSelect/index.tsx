import { Form, Select } from 'antd';
import React, { FC } from 'react';
import { Disabled, Placeholder } from 'types/form';

interface Props extends Disabled, Placeholder {
    label?: string;
    name?: string;
    rules: any;
}

export const FormTagsSelect: FC<Props> = ({
    label = 'Login',
    name = 'usernameOrEmail',
    placeholder,
    rules,
    disabled
}) => (
    <Form.Item label={label} name={name} rules={rules}>
        <Select disabled={disabled} mode="tags" placeholder={placeholder} style={{ width: '100%' }} />
    </Form.Item>
);
