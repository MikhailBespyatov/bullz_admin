import { Section } from 'components/grid/Section';
import { MainLayout } from 'components/layouts/MainLayout';
import { Result } from 'components/layouts/resultLayouts/Result';
import React from 'react';

export const Error401 = () => {
    console.log('test');
    return (
        <MainLayout>
            <Section justifyCenter>
                <Result subTitle="401" title="You are not Unauthorized." />
            </Section>
        </MainLayout>
    );
};
