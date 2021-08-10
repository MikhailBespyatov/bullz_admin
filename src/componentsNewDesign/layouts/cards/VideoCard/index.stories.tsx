import { Meta, Story } from '@storybook/react/types-6-0';
import { Section } from 'components/grid/Section';
import { Props, VideoCard } from 'componentsNewDesign/layouts/cards/VideoCard';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { grey } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: VideoCard,
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
                        <Router>
                            <Story />
                        </Router>
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<Props> = args => <VideoCard {...args} />;

export const DeletedVideoCard = Template.bind({});
DeletedVideoCard.args = {
    isDeleted: true,
    isBlocked: true,
    isTrusted: true,
    id: '5ff95b43446e4cf3ea6236f2',
    ownerId: '...9jsk5iuser',
    primaryProductId: '...8jsksproduct',
    username: '@esther.howard',
    audioLanguages: ['en'],
    utcUploaded: '2021-01-09T13:57:15.832Z',

    thumbnailUrl: 'url',
    validation: {
        yeay: {
            curationState: 0
        }
    },
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

export const ProcessedVideoCard = Template.bind({});
ProcessedVideoCard.args = {
    isDeleted: false,
    isBlocked: false,
    isTrusted: true,
    id: '5ff95b43446e4cf3ea6236f2',
    ownerId: '...9jsk5iuser',
    primaryProductId: '...8jsksproduct',
    username: '@esther.howard',
    audioLanguages: ['en'],
    utcUploaded: '2021-01-09T13:57:15.832Z',
    thumbnailUrl: 'url',
    validation: {
        yeay: {
            curationState: 1,
            curationEndedReason: 0
        }
    },
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
        'trending'
    ]
};

export const AcceptedVideoCard = Template.bind({});
AcceptedVideoCard.args = {
    isDeleted: false,
    isBlocked: false,
    isTrusted: true,
    id: '5ff95b43446e4cf3ea6236f2',
    ownerId: '...9jsk5iuser',
    primaryProductId: '...8jsksproduct',
    username: '@esther.howard',
    audioLanguages: ['en'],
    utcUploaded: '2021-01-09T13:57:15.832Z',

    thumbnailUrl: 'url',
    validation: {
        yeay: {
            curationState: 2
        }
    },
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
        'trending'
    ]
};

export const RejectedVideoCard = Template.bind({});
RejectedVideoCard.args = {
    isDeleted: false,
    isBlocked: true,
    isTrusted: true,
    id: '5ff95b43446e4cf3ea6236f2',
    ownerId: '...9jsk5iuser',
    primaryProductId: '...8jsksproduct',
    username: '@esther.howard',
    audioLanguages: ['en'],
    utcUploaded: '2021-01-09T13:57:15.832Z',
    thumbnailUrl: 'url',
    validation: {
        yeay: {
            curationState: 3,
            curationEndedReason: 10
        }
    },
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
        'trending'
    ]
};
