import { Header } from 'componentsNewDesign/grid/Header';
import { SideBar } from 'componentsNewDesign/grid/SideBar';
import { Container } from 'componentsNewDesign/layouts/MainLayout/styles';
import React, { FC } from 'react';

export const MainLayout: FC = ({ children }) => (
    <>
        <Header />
        <SideBar />
        <Container>{children}</Container>
    </>
);
