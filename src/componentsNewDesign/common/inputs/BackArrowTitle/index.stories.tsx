import { Meta, Story } from '@storybook/react/types-6-0';
import { BackArrowTitle, BackArrowTitleProps } from 'componentsNewDesign/common/inputs/BackArrowTitle';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: BackArrowTitle,
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

const Template: Story<BackArrowTitleProps> = args => <BackArrowTitle {...args} />;

export const DefaultBackArrowTitle = Template.bind({});
DefaultBackArrowTitle.args = {
    value: 'Country and Region'
};
