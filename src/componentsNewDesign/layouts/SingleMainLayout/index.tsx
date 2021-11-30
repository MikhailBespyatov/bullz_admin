import { Section } from 'components/grid/Section';
import { Breadcrumb } from 'componentsNewDesign/grid/Breadcrumb';
import { SideBar } from 'componentsNewDesign/grid/SideBar';
import { SingleHeader } from 'componentsNewDesign/grid/SingleHeader';
import { Container } from 'componentsNewDesign/layouts/MainLayout/styles';
import React, { FC } from 'react';
import { SingleMainWrapper } from './styles';

export const SingleMainLayout: FC = ({ children }) => (
    <>
        <SingleHeader />
        <SideBar />
        <Container>
            <SingleMainWrapper>
                <Section>
                    <Breadcrumb />
                </Section>
                {children}
            </SingleMainWrapper>
        </Container>
    </>
);
