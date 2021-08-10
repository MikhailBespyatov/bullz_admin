import { Meta, Story } from '@storybook/react/types-6-0';
import { TeamCard, TeamCardProps } from 'componentsNewDesign/layouts/cards/TeamCard';
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
    component: TeamCard,
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
                    <Router>
                        <Story />
                    </Router>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<TeamCardProps> = args => <TeamCard {...args} />;

export const DefaultTeamCard = Template.bind({});
DefaultTeamCard.args = {
    id: '5fe6ljdighdlsis83...',
    ownerId: '5fe6ljdighdlsis83...',
    name: 'RC Drift Dream Team 1',
    urlName: 'yeayapp://yeay.com/teams/7635e60e-3065-4dcc...',
    utcCreated: '2021-01-26T14:55:06.384Z'
};
