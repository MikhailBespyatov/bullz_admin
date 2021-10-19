import { Meta, Story } from '@storybook/react/types-6-0';
import sampleImage from 'assets/user_image_sample.svg';
import { TeamDescription } from 'componentsNewDesign/layouts/descriptionLayouts/TeamDescription';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: TeamDescription,
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
                <Section>
                    <Story />
                </Section>
            </>
        )
    ]
} as Meta;

const Template: Story<BULLZ.GetTeamInfoResponse> = args => <TeamDescription {...args} />;

export const DefaultTeamDescription = Template.bind({});
DefaultTeamDescription.args = {
    id: '5f9a57bc1e766d2a85306ee4',
    name: 'Rezident Evil Dream Team',
    urlName: 'yeayapp://yeay.com/teams/7635e60e-3065-4dcc-9d2e-7fd65864d1da',
    owner: {
        username: 'Elis',
        userId: '5dfca2c086ac975ce869229a',
        profileImageUrl: sampleImage
    },
    utcCreated: '2021-01-09T13:57:15.832Z',
    members: [
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' }
    ],
    banned: [
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' },
        { username: 'Kristin Watson' },
        { username: 'Tony Stark' }
    ],
    admins: [{ username: 'Dr. Strange' }, { username: 'Tony Stark' }, { username: 'Thor' }]
};
