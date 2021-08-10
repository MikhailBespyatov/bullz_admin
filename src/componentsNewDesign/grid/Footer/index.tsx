import { TopScroller } from 'componentsNewDesign/dynamic/TopScroller';
import { Wrapper } from 'componentsNewDesign/grid/Footer/styles';
import React, { FC } from 'react';

export const Footer: FC = ({ children }) => (
    <Wrapper>
        {children}
        <TopScroller />
    </Wrapper>
);
