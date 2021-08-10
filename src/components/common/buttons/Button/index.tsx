import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { padding } from 'constants/styles/sizes';
import React, { FC } from 'react';
import { Grow, RemoveMarginRightBottom } from 'types/styles';

interface Props extends ButtonProps, RemoveMarginRightBottom, Grow {}

export const Button: FC<Props> = ({
    type = 'primary',
    htmlType = 'submit',
    disabled = false,
    children,
    onClick,
    grow,
    removeMarginBottom,
    removeMarginRight,
    icon
}) => (
    <AntButton
        disabled={disabled}
        htmlType={htmlType}
        icon={icon}
        style={{
            marginRight: removeMarginRight ? 0 : padding,
            marginBottom: removeMarginBottom ? 0 : padding,
            flexGrow: grow ? 1 : 'unset'
        }}
        type={type}
        onClick={onClick}
    >
        {children}
    </AntButton>
);
