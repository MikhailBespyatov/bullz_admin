import { Spin } from 'antd';
import { SizeType } from 'components/common/dynamic/Loader/types';
import React, { FC } from 'react';

interface Props {
    size?: SizeType;
}

export const Loader: FC<Props> = ({ size = 'default' }) => <Spin size={size} />;
