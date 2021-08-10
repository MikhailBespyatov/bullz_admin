import { Meta, Story } from '@storybook/react/types-6-0';
import { NotificationBadge, NotificationBadgeProps } from 'componentsNewDesign/common/typography/NotificationBadge';
import { notificationBlockWidth } from 'componentsNewDesign/common/typography/NotificationBadge/constants';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: NotificationBadge,
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

const Template: Story<NotificationBadgeProps> = args => <NotificationBadge {...args} />;

export const smallNotificationBlock = Template.bind({});
smallNotificationBlock.args = {
    children: 'Not verified',
    width: notificationBlockWidth
};

export const bigNotificationBlock = Template.bind({});
bigNotificationBlock.args = {
    children: 'This User is Blocked',
    backgroundColor: 'transparent',
    fontSize: '17px',
    padding: '8px',
    height: '20px'
};
