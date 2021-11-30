import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { Breadcrumb } from 'componentsNewDesign/grid/Breadcrumb';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { filterMargin } from 'constants/styles/sizes';
import React, { FC } from 'react';
import { TotalRecords } from 'types/data';
import { MarginRight } from 'types/styles';
import { CatalogContainerWrapper } from './styles';

interface Props extends TotalRecords, MarginRight {}

export const CatalogContainer: FC<Props> = ({ children, totalRecords, marginRight }) => (
    <CatalogContainerWrapper>
        <Section alignCenter marginBottom={filterMargin}>
            <MarginWrapper marginRight={marginRight || '50px'}>
                <Breadcrumb />
            </MarginWrapper>
            {totalRecords !== undefined && <TotalBadge quantity={totalRecords} />}
        </Section>
        {children}
    </CatalogContainerWrapper>
);
// export const CatalogContainer: FC<Props> = ({ children, totalRecords }) => {
//     const isMobile = useMediaQuery(`(max-width: ${xs})`);
//     const marginBottom = isMobile ? cardMargin : filterMargin;
//     const marginLeft = isMobile ? '10px' : '0';
//     const marginRight = isMobile ? '8px' : '50px';

//     return (
//         <CatalogContainerWrapper>
//             <Section alignCenter marginBottom={marginBottom} marginLeft={marginLeft}>
//                 <MarginWrapper marginRight={marginRight}>
//                     <Breadcrumb />
//                 </MarginWrapper>
//                 {totalRecords !== undefined && <TotalBadge quantity={totalRecords} />}
//             </Section>
//             {children}
//         </CatalogContainerWrapper>
//     );
// };
