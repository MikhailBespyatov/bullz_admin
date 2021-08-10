import { PlusOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React, { FC } from 'react';
import { NoopClick } from 'types/global';
import { Color } from 'types/styles';

interface Props extends NoopClick, Color {}

export const AddableTag: FC<Props> = ({ onClick, children, color }) => (
    <Tag className="site-tag-plus" color={color} onClick={onClick}>
        <PlusOutlined />
        &nbsp;
        {children}
    </Tag>
);
