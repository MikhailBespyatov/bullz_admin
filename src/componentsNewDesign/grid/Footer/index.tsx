import { TopScroller } from 'componentsNewDesign/dynamic/TopScroller';
import { TrendingsWrapper, Wrapper } from 'componentsNewDesign/grid/Footer/styles';
import React, { FC } from 'react';

export const Footer: FC = ({ children }) => (
    <Wrapper>
        {children}
        <TopScroller />
    </Wrapper>
);

export const TrendingsFooter: FC = ({ children }) => <TrendingsWrapper>{children}</TrendingsWrapper>;
