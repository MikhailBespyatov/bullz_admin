import { Badge as AntBadge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import { primaryColor } from 'constants/styles/colors';
import { padding } from 'constants/styles/sizes';
import React, { FC } from 'react';

export const Badge: FC<BadgeProps> = props => (
    <AntBadge
        {...props}
        style={{
            backgroundColor: primaryColor,
            marginRight: padding,
            marginBottom: padding
        }}
    />
);
