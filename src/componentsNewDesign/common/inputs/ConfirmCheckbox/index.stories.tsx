import { Meta, Story } from '@storybook/react/types-6-0';
import { ConfirmCheckbox, ConfirmCheckboxProps } from 'componentsNewDesign/common/inputs/ConfirmCheckbox';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: ConfirmCheckbox,
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

const Template: Story<ConfirmCheckboxProps> = args => <ConfirmCheckbox {...args} />;

export const ConfirmCheckboxSample = Template.bind({});
ConfirmCheckboxSample.args = {
    title: 'Are you sure you want to apply this curation status?'
};
