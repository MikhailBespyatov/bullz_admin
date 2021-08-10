import { Form, Input as AntInput } from 'antd';
import React, { FC } from 'react';
import { Disabled } from 'types/form';

interface Props extends Disabled {
    label?: string;
    name?: string;
    rules: any;
}

export const FormInput: FC<Props> = ({ label = 'Login', name = 'usernameOrEmail', rules, disabled }) => (
    <Form.Item label={label} name={name} rules={rules}>
        {name === 'password' ? <AntInput.Password disabled={disabled} /> : <AntInput disabled={disabled} />}
    </Form.Item>
);
