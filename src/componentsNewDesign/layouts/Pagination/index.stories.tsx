import { Meta, Story } from '@storybook/react/types-6-0';
import { Pagination, WrapperProps } from 'componentsNewDesign/layouts/Pagination';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: Pagination,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: backgroundColor }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <Section>
                    <Story />
                </Section>
            </>
        )
    ]
} as Meta;

const Template: Story<WrapperProps> = args => <Pagination {...args} />;

export const DefaultPagination = Template.bind({});
DefaultPagination.args = {
    currentIndex: 2,
    totalItems: 100,
    defaultSize: 20,
    onSizeChange: () => console.log('size change')
};
