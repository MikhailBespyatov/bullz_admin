import { Section } from 'components/grid/Section';
import { Breadcrumb } from 'componentsNewDesign/grid/Breadcrumb';
import React, { FC } from 'react';
import { SingleMainWrapper } from './styles';
import { MainLayout } from 'components/layouts/MainLayout';

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
