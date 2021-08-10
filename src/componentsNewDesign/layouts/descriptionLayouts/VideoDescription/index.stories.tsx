import { Meta, Story } from '@storybook/react/types-6-0';
import { Section } from 'components/grid/Section';
import {
    VideoDescription,
    VideoDescriptionProps
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { grey } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: VideoDescription,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: grey }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <ContentWrapper backgroundColor={grey} borderRadius="0px" height="100%" paddingTop="20px" width="100%">
                    <Section>
                        <Story />
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<VideoDescriptionProps> = args => <VideoDescription {...args} />;

export const SampleVideoDescription = Template.bind({});
SampleVideoDescription.args = {
    validation: {
        yeay: {
            curationState: 3
        }
    },
    streaming: {
        details: {
            hlsUrl: '',
            screenGrabUrl: ''
        }
    },
    curationEndedReason: 10,
    thumbnailUrl: '',
    id: '5ff95b43446e4cf3ea6236f2',
    ownerId: '...9jsk5iuser',
    primaryProductId: '...8jsksproduct',
    username: '@esther.howard',
    audioLanguages: ['en', 'ru', 'pt'],
    utcUploaded: '2021-01-09T13:57:15.832Z',
    hashTags: [
        'cream',
        'trending',
        'cream',
        'trending',
        'cream',
        'trending',
        'cream',
        'trending',
        'cream',
        'trending',
        'cream',
        'trending',
        'cream',
        'trending',
        'cream',
        'trending',
        'cream',
        'trending',
        'cream',
        'trending',
        'cream'
    ]
};
