import { Meta } from '@storybook/react/types-6-0';
import { DeleteOrBlockUserModal } from 'componentsNewDesign/modals/DeleteOrBlockUserModal';
import { deleteReasonsList } from 'componentsNewDesign/modals/DeleteOrBlockUserModal/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { modalEvents } from 'stores/modals/asyncModal';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: DeleteOrBlockUserModal,
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
                <ContentWrapper height="500px">
                    <Section>
                        <MarginWrapper marginLeft="130px" marginTop="400px">
                            <Story />
                        </MarginWrapper>
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

export const SampleDeleteOrBlockUserModal = () => <DeleteOrBlockUserModal />;

modalEvents.openDeleteOrBlockUserModal({
    userId: '10',
    username: 'Garry Potter',
    action: 'delete',
    reasonsList: deleteReasonsList
});
