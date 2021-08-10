import { Meta, Story } from '@storybook/react/types-6-0';
import { BackButtonUserCard } from 'componentsNewDesign/common/buttons/BackButton';
import { BackButtonProps } from 'componentsNewDesign/common/buttons/BackButton/types';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { white } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

interface Props extends BackButtonProps {
    children: string;
}

export default {
    title: getStoriesTitle(base),
    component: BackButtonUserCard,
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

const Template: Story<Props> = args => <BackButtonUserCard {...args} />;

export const BackBtn = Template.bind({});
BackBtn.args = { children: 'User Info' };
