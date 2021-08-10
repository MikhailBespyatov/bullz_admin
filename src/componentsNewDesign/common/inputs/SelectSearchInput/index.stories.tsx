import { Meta, Story } from '@storybook/react/types-6-0';
import { SelectSearchInput, SelectSearchInputProps } from 'componentsNewDesign/common/inputs/SelectSearchInput';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: SelectSearchInput,
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

const Template: Story<SelectSearchInputProps> = args => <SelectSearchInput {...args} />;

export const SelectInput = Template.bind({});
SelectInput.args = { placeholder: 'Type country or region' };
