import { Meta, Story } from '@storybook/react/types-6-0';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { SimpleButtonProps } from 'componentsNewDesign/common/buttons/SimpleButton/types';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { black, white } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

interface Props extends SimpleButtonProps {}

export default {
    title: getStoriesTitle(base),
    component: SimpleButton,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: white }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <ContentWrapper
                    backgroundColor={white}
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

export const PrimaryButton = () => <SimpleButton>Create Topic</SimpleButton>;

interface TemplateProps extends Props {
    children: string;
}
const Template: Story<TemplateProps> = args => <SimpleButton {...args} />;

export const SecondaryButton = Template.bind({});
SecondaryButton.args = { background: black, color: white, children: 'Create User' };

export const TertiaryButton = Template.bind({});
TertiaryButton.args = {
    background: black,
    color: white,
    borderRadius: '24px',
    padding: '8px 24px',
    children: 'Upload image'
};

export const QuaternaryButton = Template.bind({});
QuaternaryButton.args = {
    background: 'transparent',
    color: '#ff3333',
    borderRadius: '24px',
    padding: '8px 24px',
    children: 'Disable'
};
