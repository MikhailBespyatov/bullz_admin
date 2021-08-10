import { Meta, Story } from '@storybook/react/types-6-0';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { Tooltip, TooltipProps } from 'componentsNewDesign/modals/Tooltip';
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
    component: Tooltip,
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
                        <MarginWrapper marginLeft="10px" marginTop="50px">
                            <Story />
                        </MarginWrapper>
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<TooltipProps> = args => (
    <Tooltip {...args}>
        <CardButton>Assign Role</CardButton>
    </Tooltip>
);

export const TopTooltip = Template.bind({});
TopTooltip.args = {
    type: 'top',
    title: 'Test title string for view'
};

export const DownTooltip = Template.bind({});
DownTooltip.args = {
    ...TopTooltip.args,
    type: 'down'
};
