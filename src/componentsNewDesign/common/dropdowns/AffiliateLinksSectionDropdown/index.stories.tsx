import { Meta } from '@storybook/react/types-6-0';
import { AffiliateLinksDropdownSection } from 'componentsNewDesign/common/dropdowns/AffiliateLinksSectionDropdown';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: AffiliateLinksDropdownSection,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: 'fcfcfc' }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <ContentWrapper
                    backgroundColor="fcfcfc"
                    borderRadius="0px"
                    height="100%"
                    paddingLeft="20px"
                    paddingRight="20px"
                    paddingTop="20px"
                    width="100%"
                >
                    <Story />
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

export const AffiliateLinksDropdownSectionSample = () => <AffiliateLinksDropdownSection />;
