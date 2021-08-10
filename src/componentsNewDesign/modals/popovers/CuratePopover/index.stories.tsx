import { Meta, Story } from '@storybook/react/types-6-0';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { CuratePopover, CuratePopoverProps } from 'componentsNewDesign/modals/popovers/CuratePopover';
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
    component: CuratePopover,
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
                        <MarginWrapper marginLeft="30px" marginTop="400px">
                            <Story />
                        </MarginWrapper>
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<CuratePopoverProps> = args => (
    <CuratePopover {...args}>
        <CardButton>Curate</CardButton>
    </CuratePopover>
);

export const TopPopover = Template.bind({});
TopPopover.args = {
    title: 'Curate video',
    id: '1',
    type: 'top'
};

export const DownPopover = Template.bind({});
DownPopover.args = {
    ...TopPopover.args,
    type: 'down'
};
