import { Button as AntButton, Form } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { tailLayout } from 'components/formComponents/FormButton/constants';
import React, { FC } from 'react';

export const FormButton: FC<ButtonProps> = ({
    type = 'primary',
    htmlType = 'submit',
    disabled = false,
    children,
    ...rest
}) => (
    <Form.Item {...tailLayout}>
        <AntButton disabled={disabled} htmlType={htmlType} type={type} {...rest}>
            {children}
        </AntButton>
    </Form.Item>
);
