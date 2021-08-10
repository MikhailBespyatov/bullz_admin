import { Meta, Story } from '@storybook/react/types-6-0';
import { MakePrimaryButton, MakePrimaryButtonProps } from 'componentsNewDesign/common/buttons/MakePrimaryButton';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { white } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

interface Props extends MakePrimaryButtonProps {
    children: string;
}

export default {
    title: getStoriesTitle(base),
    component: MakePrimaryButton,
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

export const ChooseAsPrimaryButton: Story<Props> = args => (
    <MakePrimaryButton {...args}>+ Make Primary</MakePrimaryButton>
);
