import { Meta, Story } from '@storybook/react/types-6-0';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';
import {
    ApplyPopoverLayout,
    ApplyPopoverLayoutProps
} from 'componentsNewDesign/modals/popovers/ApplyPopoverLayout/index';

export default {
    title: getStoriesTitle(base),
    component: ApplyPopoverLayout,
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
                        <MarginWrapper marginLeft="100px" marginTop="320px">
                            <Story />
                        </MarginWrapper>
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<ApplyPopoverLayoutProps> = args => (
    <ApplyPopoverLayout {...args}>
        <CardButton>Assign Role</CardButton>
    </ApplyPopoverLayout>
);

export const TopApplyPopoverLayout = Template.bind({});
TopApplyPopoverLayout.args = {
    title: 'Edit info',
    type: 'top',
    modalChildren: <Section>Test</Section>
};

export const DownApplyPopoverLayout = Template.bind({});
DownApplyPopoverLayout.args = {
    ...TopApplyPopoverLayout.args,
    type: 'down'
};
