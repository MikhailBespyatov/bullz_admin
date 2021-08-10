import { Dropdown as AntDropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import React, { FC } from 'react';

export const Dropdown: FC<DropDownProps> = ({
    children,
    overlay,
    trigger = ['click'],
    arrow = true,
    placement = 'topCenter'
}) => (
    <AntDropdown arrow={arrow} overlay={overlay} placement={placement} trigger={trigger}>
        {children}
    </AntDropdown>
);
