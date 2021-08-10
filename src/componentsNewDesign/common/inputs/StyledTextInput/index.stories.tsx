import { Meta, Story } from '@storybook/react/types-6-0';
import { Props, StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: StyledTextInput,
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

const Template: Story<Props> = args => <StyledTextInput {...args} />;

export const TextInput = Template.bind({});
TextInput.args = { placeholder: 'placeholder', defaultValue: 'Some text', disableClearButton: false };
