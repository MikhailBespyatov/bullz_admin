import { Meta, Story } from '@storybook/react/types-6-0';
import { Section } from 'components/grid/Section';
import { TeamVideoCard, TeamVideoCardProps } from 'componentsNewDesign/layouts/cards/TeamVideoCard';
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
    component: TeamVideoCard,
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

const Template: Story<TeamVideoCardProps> = args => <TeamVideoCard {...args} />;

export const SampleTeamVideoCard = Template.bind({});
SampleTeamVideoCard.args = {
    isTrusted: true,
    id: '5ff95b43446e4cf3ea6236f2',
    ownerId: '...9jsk5iuser',
    primaryProductId: '...8jsksproduct',
    username: '@esther.howard',
    audioLanguages: ['en'],
    // utcUploaded: '2021-01-09T13:57:15.832Z',

    profileImageUrl: 'url',

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
