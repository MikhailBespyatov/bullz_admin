import { Meta, Story } from '@storybook/react/types-6-0';
import { Section } from 'components/grid/Section';
import {
    ProductDescription,
    ProductDescriptionProps
} from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { grey } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: ProductDescription,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: grey }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <ContentWrapper backgroundColor={grey} borderRadius="0px" height="100%" paddingTop="20px" width="100%">
                    <Section>
                        <Story />
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<ProductDescriptionProps> = args => <ProductDescription {...args} />;

const Sample = Template.bind({});
Sample.args = {
    name: 'Product name',
    id: '5ff95b43446e4cf3ea6236f2',
    // primaryReferencesCount: 1,
    // hashTags: ['cream', 'trending', 'cream', 'trending', 'cream', 'trending', 'cream', 'trending', 'cream', 'trending'],
    url: 'https://as.ad4m.at/ad/kmr?a=28496&b=52604&c=964&d=tk...',
    cultureInfo: 'en-GB',
    priority: 1
};
