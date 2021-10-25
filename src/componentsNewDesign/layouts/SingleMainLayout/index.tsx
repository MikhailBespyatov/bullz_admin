import { Section } from 'components/grid/Section';
import { MainLayout } from 'components/layouts/MainLayout';
import { Breadcrumb } from 'componentsNewDesign/grid/Breadcrumb';
import React, { FC } from 'react';
import { SingleMainWrapper } from './styles';

export const SingleMainLayout: FC = ({ children }) => (
    <MainLayout>
        <SingleMainWrapper>
            <Section>
                <Breadcrumb />
            </Section>
            {children}
        </SingleMainWrapper>
    </MainLayout>
);
