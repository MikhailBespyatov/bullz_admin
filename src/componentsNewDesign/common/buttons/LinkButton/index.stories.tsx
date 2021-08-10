import { Meta, Story } from '@storybook/react/types-6-0';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';
import { LinkButton, LinkButtonProps } from '.';

export default {
    title: getStoriesTitle(base),
    component: LinkButton,
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
                <ContentWrapper backgroundColor="#F8F8F8" height="150px" padding="10px" width="300px">
                    <Story />
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<LinkButtonProps> = args => <LinkButton {...args} />;

export const DefaultLinkButton = Template.bind({});
DefaultLinkButton.args = {
    id: 'as1213asda12',
    linkRoute: '/users'
};

export const DisabledLinkButton = Template.bind({});
DisabledLinkButton.args = {
    id: '',
    linkRoute: '/products'
};
