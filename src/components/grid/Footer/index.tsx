import { TopScroller } from 'components/common/dynamic/TopScroller';
import { Wrapper } from 'components/grid/Footer/styles';
import React, { FC } from 'react';

export const Footer: FC = ({ children }) => (
    <Wrapper>
        {children}
        <TopScroller />
    </Wrapper>
);
