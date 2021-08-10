import { Meta, Story } from '@storybook/react/types-6-0';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { RolesPopover } from 'componentsNewDesign/modals/popovers/RolesPopover';
import {
    EditTeamInfoPopover,
    EditTeamInfoPopoverProps
} from 'componentsNewDesign/modals/popovers/teams/EditTeamInfoPopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: RolesPopover,
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
                        <MarginWrapper marginLeft="100px" marginTop="250px">
                            <Story />
                        </MarginWrapper>
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<EditTeamInfoPopoverProps> = args => (
    <EditTeamInfoPopover {...args}>
        <CardButton>Edit Info</CardButton>
    </EditTeamInfoPopover>
);

export const TopPopover = Template.bind({});
TopPopover.args = {
    //subjects: ['Facilitator', 'Curator', 'Content Manager'],
    //setSubject: subjects => console.log(subjects),
    // title: 'Edit Team Info',
    type: 'top',
    //id: '00000000000000',
    name: 'RC Drift Dream Team',
    urlName: 'yeayapp://yeay.com/teams/7635e60e-3065-4dcc-9d'
};

export const DownPopover = Template.bind({});
DownPopover.args = {
    ...TopPopover.args,
    type: 'down'
};
