import { Meta, Story } from '@storybook/react/types-6-0';
import { VideoCardButton, VideoCardButtonProps } from 'componentsNewDesign/common/buttons/VideoCardButton';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { white } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

interface Props extends VideoCardButtonProps {
    children: string;
}

export default {
    title: getStoriesTitle(base),
    component: VideoCardButton,
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
                    <Section justifyAround>
                        <Story />
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

export const VideoCardButtons: Story<Props> = args => (
    <>
        <VideoCardButton {...args}>More Info</VideoCardButton>
        <VideoCardButton {...args}>Curate</VideoCardButton>
    </>
);
