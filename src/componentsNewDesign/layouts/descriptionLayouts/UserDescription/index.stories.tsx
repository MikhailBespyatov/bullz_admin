import { Meta, Story } from '@storybook/react/types-6-0';
import sampleImage from 'assets/user_image_sample.svg';
import { UserDescription } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: UserDescription,
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

const Template: Story<YEAY.AdminGetUserCommon> = args => <UserDescription {...args} />;

export const DefaultUserDescription = Template.bind({});
DefaultUserDescription.args = {
    username: 'username',
    id: 'asdasdas234234234',
    facilitatorId: '',
    freeStakingRemaining: 20,
    locale: 'ru',
    primaryLanguage: 'en',
    profileImageUrl: '',
    utcCreated: '2021-01-09T13:57:15.832Z',
    utcUpdated: '2021-01-09T13:57:15.832Z',
    utcLastAuthentication: '2021-01-09T13:57:15.832Z'
};

export const BlockedUserDescription = Template.bind({});
BlockedUserDescription.args = {
    ...DefaultUserDescription.args,
    isDisabled: true
};

export const NotVerifiedUserDescription = Template.bind({});
NotVerifiedUserDescription.args = {
    ...DefaultUserDescription.args,
    isAccountVerified: false
};

export const TrustedUserDescription = Template.bind({});
TrustedUserDescription.args = {
    ...DefaultUserDescription.args,
    isTrusted: true
};

export const AllIconsUserDescription = Template.bind({});
AllIconsUserDescription.args = {
    ...DefaultUserDescription.args,
    isDisabled: true,
    isTrusted: true,
    isAccountVerified: false,
    profileImageUrl: sampleImage
};
