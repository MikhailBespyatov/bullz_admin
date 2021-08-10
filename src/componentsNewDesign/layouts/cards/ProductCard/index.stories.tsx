import { Meta, Story } from '@storybook/react/types-6-0';
import history from 'browserHistory';
import { ProductCard, ProductCardProps } from 'componentsNewDesign/layouts/cards/ProductCard';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { grey } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { Router } from 'react-router-dom';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: ProductCard,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: grey }]
        }
    },
    decorators: [
        Story => (
            <>
                <Router history={history}>
                    <GlobalStyle />

                    <ContentWrapper
                        backgroundColor={grey}
                        borderRadius="0px"
                        height="100%"
                        paddingTop="20px"
                        width="100%"
                    >
                        <Story />
                    </ContentWrapper>
                </Router>
            </>
        )
    ]
} as Meta;

const Template: Story<ProductCardProps> = args => <ProductCard {...args} />;

export const Sample1 = Template.bind({});
Sample1.args = {
    name: 'Product Name',
    id: '84u4j83okejjf9e9384j4idodi'
    // primaryReferencesCount: 1,
    // hashTags: ['cream', 'trending', 'cream', 'trending', 'cream', 'trending']
};

export const Sample2 = Template.bind({});
Sample2.args = {
    name: 'Product Name',
    id: '84u4j83okejjf9e9384j4idodi'
    // primaryReferencesCount: 1,
    // hashTags: []
};
