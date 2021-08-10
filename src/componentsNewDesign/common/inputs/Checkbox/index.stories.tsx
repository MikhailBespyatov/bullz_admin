import { Meta } from '@storybook/react/types-6-0';
import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { CheckboxProps } from 'componentsNewDesign/common/inputs/Checkbox/types';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React, { FC } from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: BooleanCheckbox,
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

export const Checkbox: FC<CheckboxProps> = args => <BooleanCheckbox {...args} />;
