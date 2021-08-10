import { Header } from 'componentsNewDesign/grid/Header';
import { SideBar } from 'componentsNewDesign/grid/SideBar';
import { Container } from 'componentsNewDesign/layouts/MainLayout/styles';
import React, { FC } from 'react';
import { copyEvents } from 'stores/Copy';

export const MainLayout: FC = ({ children }) => (
    <>
        <Header />
        <SideBar />
        <Container onClick={() => copyEvents.setCopiedId('')}>{children}</Container>
    </>
);
