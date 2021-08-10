import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { padding } from 'constants/styles/sizes';
import React from 'react';
import { Grow, RemoveMarginRightBottom, Sizes } from 'types/styles';

interface Props extends ButtonProps, RemoveMarginRightBottom, Grow, Sizes {}

export const AddButton = ({ removeMarginRight, removeMarginBottom, grow, width, height, ...props }: Props) => (
    <Button
        style={{
            width: width || 100,
            height: height || 35,
            marginRight: removeMarginRight ? 0 : padding,
            marginBottom: removeMarginBottom ? 0 : padding,
            flexGrow: grow ? 1 : 'unset'
        }}
        {...props}
        type="dashed"
    >
        <PlusOutlined />
    </Button>
);
