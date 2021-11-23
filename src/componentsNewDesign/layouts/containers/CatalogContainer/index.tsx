import { useMediaQuery } from '@material-ui/core';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { Breadcrumb } from 'componentsNewDesign/grid/Breadcrumb';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { cardMargin, filterMargin, xs } from 'constants/styles/sizes';
import React, { FC } from 'react';
import { TotalRecords } from 'types/data';
import { CatalogContainerWrapper } from './styles';

interface Props extends TotalRecords {}

export const CatalogContainer: FC<Props> = ({ children, totalRecords }) => {
    const isMobile = useMediaQuery(`(max-width: ${xs})`);
    const marginBottom = isMobile ? cardMargin : filterMargin;
    const marginLeft = isMobile ? '10px' : '0';
    const marginRight = isMobile ? '8px' : '50px';

    return (
        <CatalogContainerWrapper>
            <Section alignCenter marginBottom={marginBottom} marginLeft={marginLeft}>
                <MarginWrapper marginRight={marginRight}>
                    <Breadcrumb />
                </MarginWrapper>
                {totalRecords !== undefined && <TotalBadge quantity={totalRecords} />}
            </Section>
            {children}
        </CatalogContainerWrapper>
    );
};
