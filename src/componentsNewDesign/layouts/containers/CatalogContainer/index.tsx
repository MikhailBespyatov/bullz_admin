import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { Breadcrumb } from 'componentsNewDesign/grid/Breadcrumb';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { filterMargin } from 'constants/styles/sizes';
import React, { FC } from 'react';
import { TotalRecords } from 'types/data';
import { CatalogContainerWrapper } from './styles';

interface Props extends TotalRecords {}

export const CatalogContainer: FC<Props> = ({ children, totalRecords }) => (
    <CatalogContainerWrapper>
        <Section alignCenter marginBottom={filterMargin}>
            <MarginWrapper marginRight="50px">
                <Breadcrumb />
            </MarginWrapper>
            {totalRecords !== undefined && <TotalBadge quantity={totalRecords} />}
        </Section>
        {children}
    </CatalogContainerWrapper>
);
