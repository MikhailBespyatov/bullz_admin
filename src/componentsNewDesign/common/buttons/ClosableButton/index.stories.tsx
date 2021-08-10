import { Meta, Story } from '@storybook/react/types-6-0';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor, pink } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';
import { ClosableButton } from '.';

export default {
    title: getStoriesTitle(base),
    component: ClosableButton,
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
                <ContentWrapper backgroundColor={pink} height="150px" padding="10px" width="300px">
                    <Story />
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story = args => <ClosableButton {...args} />;

export const DefaultClosableButton = Template.bind({});
DefaultClosableButton.args = {};
