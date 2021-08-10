import { Meta, Story } from '@storybook/react/types-6-0';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';
import { CopyButton, CopyButtonProps } from '.';

export default {
    title: getStoriesTitle(base),
    component: CopyButton,
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

const Template: Story<CopyButtonProps> = args => <CopyButton {...args} />;

export const DefaultCopyButton = Template.bind({});
DefaultCopyButton.args = {
    subject: 'as1213asda12',
    success: 'success message'
};

export const DisabledCopyButton = Template.bind({});
DisabledCopyButton.args = {
    subject: '',
    success: 'success message'
};
