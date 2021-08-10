import { Section } from 'components/grid/Section';
import { MainLayout } from 'components/layouts/MainLayout';
import { Result } from 'components/layouts/resultLayouts/Result';
import React from 'react';

export const Error403 = () => (
    <MainLayout>
        <Section justifyCenter>
            <Result />
        </Section>
    </MainLayout>
);
