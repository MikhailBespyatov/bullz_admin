import { Card } from 'antd';
import React, { FC } from 'react';
import { StrictTitle } from 'types/data';
import { Sizes } from 'types/styles';

interface Props extends StrictTitle, Pick<Sizes, 'width'> {}

export const FormCard: FC<Props> = ({ children, title, width = '600px' }) => (
    <Card size="small" style={{ width: parseInt(width) }} title={title}>
        {children}
    </Card>
);
