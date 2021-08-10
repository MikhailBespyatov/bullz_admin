import { Empty as AntEmpty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';
import { Wrapper } from 'components/layouts/resultLayouts/Empty/styles';
import React from 'react';

export const Empty = ({ description, ...rest }: EmptyProps) => (
    <Wrapper>
        <AntEmpty description={description} {...rest} />
    </Wrapper>
);
