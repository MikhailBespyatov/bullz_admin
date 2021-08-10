import { Meta, Story } from '@storybook/react/types-6-0';
import sampleImage from 'assets/user_image_sample.svg';
import { UserCard, UserCardProps } from 'componentsNewDesign/layouts/cards/UserCard';
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
    component: UserCard,
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

const Template: Story<UserCardProps> = args => <UserCard {...args} />;

export const TrustedUserCard = Template.bind({});
TrustedUserCard.args = {
    id: '5fe6ljdighdlsis83',
    facilitatorId: '5fe6ljdighdlsis83',
    username: '@dianne.russell',
    utcCreated: '2021-01-26T14:55:06.384Z',
    utcLastAuthentication: '2021-01-26T18:40:00.384Z',
    roles: ['Administrator', 'ContentManager'],
    isAccountVerified: true,
    profileImageUrl: sampleImage,
    // email: 'myemailaddress@gmail.com',
    isDisabled: false,
    isTrusted: true,
    locale: 'tr-TR'
};

export const TrustedAndDisabledUserCard = Template.bind({});
TrustedAndDisabledUserCard.args = {
    id: '5fe6ljdighdlsis83',
    facilitatorId: '5fe6ljdighdlsis83',
    username: '@dianne.russell',
    utcCreated: '2021-01-26T14:55:06.384Z',
    utcLastAuthentication: '2021-01-26T18:40:00.384Z',
    roles: ['Administrator', 'ContentManager', 'Curator', 'Facilitator'],
    isAccountVerified: true,
    profileImageUrl: sampleImage,
    // email: 'myemailaddress@gmail.com',
    isDisabled: true,
    isTrusted: true,
    locale: 'tr-TR'
};

export const NotVerifiedUserCard = Template.bind({});
NotVerifiedUserCard.args = {
    ...TrustedUserCard.args,
    isAccountVerified: false,
    isDisabled: true,
    isTrusted: true
};
