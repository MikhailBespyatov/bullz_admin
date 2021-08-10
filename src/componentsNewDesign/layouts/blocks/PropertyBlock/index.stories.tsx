import { Meta, Story } from '@storybook/react/types-6-0';
import { PropertyBlock, PropertyBlockProps } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: PropertyBlock,
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
                <ContentWrapper height="150px" paddingLeft="20px" paddingRight="20px" paddingTop="20px" width="300px">
                    <Story />
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<PropertyBlockProps> = args => <PropertyBlock {...args} />;

export const IDPropertyBlock = Template.bind({});
IDPropertyBlock.args = {
    title: 'User ID',
    subtitle: 'asdasdasdasdsadasdasdasdasdsadasdasdasdasdasdasdasdasd',
    success: 'success message'
};

export const IDEmptyPropertyBlock = Template.bind({});
IDEmptyPropertyBlock.args = {
    title: 'User ID',
    subtitle: '',
    success: 'success message',
    copiable: true
};

export const EmailPropertyBlock = Template.bind({});
EmailPropertyBlock.args = {
    type: 'id',
    title: 'Email Address',
    subtitle: 'a@test.ru',
    success: 'success message',
    notVerified: true,
    copiable: true
};

export const DatePropertyBlock = Template.bind({});
DatePropertyBlock.args = {
    isDate: true,
    title: 'Created Account',
    subtitle: '2021-01-09T13:57:15.832Z',
    success: 'success message'
};

export const UsernamePropertyBlock = Template.bind({});
UsernamePropertyBlock.args = {
    title: 'Username',
    subtitle: 'testusername',
    isTrusted: true
};
