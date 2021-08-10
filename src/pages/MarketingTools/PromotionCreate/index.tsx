import { PromotionCard } from 'componentsNewDesign/layouts/cards/PromotionCard';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { PromotionCardWrapper } from 'pages/MarketingTools/PromotionCreate/styles';
import React from 'react';

export const PromotionCreate = () => (
    <MainLayout>
        <PromotionCardWrapper>
            <PromotionCard />
        </PromotionCardWrapper>
    </MainLayout>
);
