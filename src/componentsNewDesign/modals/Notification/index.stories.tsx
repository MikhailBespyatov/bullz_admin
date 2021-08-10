import { Meta } from '@storybook/react/types-6-0';
import { NotificationModal } from 'componentsNewDesign/modals/Notification';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: NotificationModal,
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
                <Story />
            </>
        )
    ]
} as Meta;

export const Notification = () => <NotificationModal />;
