import { affiliateLinksSearchParameters } from 'componentsNewDesign/common/dropdowns/AffiliateLinksSectionDropdown/constants';
import { DropdownSection } from 'componentsNewDesign/common/dropdowns/SectionDropdown';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { AffiliateLinksTable } from 'componentsNewDesign/common/tables/AffiliateLinksTable';
import React from 'react';

export const AffiliateLinksDropdownSection = () => (
    <DropdownSection title="Affiliate links">
        <SearchInput searchParameters={affiliateLinksSearchParameters} />
        <AffiliateLinksTable />
    </DropdownSection>
);
