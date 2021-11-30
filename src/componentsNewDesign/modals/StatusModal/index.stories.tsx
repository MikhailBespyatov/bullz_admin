import { Meta } from '@storybook/react/types-6-0';
import { StatusModal } from 'componentsNewDesign/modals/StatusModal';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { modalEvents } from 'stores/modals/asyncModal';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: StatusModal,
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

export const SampleStatusModal = () => <StatusModal />;

modalEvents.openStatusModal({
    status: 'inProcess',
    title: 'Deleted',
    content: 'Garry Potter is successfully deleted.',
    buttonText: 'Download'
});
