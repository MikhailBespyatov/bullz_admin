import { Meta } from '@storybook/react/types-6-0';
import { NestedSelect } from 'componentsNewDesign/common/inputs/NestedSelect';
import { mockSelectorsArray } from 'componentsNewDesign/common/inputs/NestedSelect/constants';
import { Select } from 'componentsNewDesign/common/inputs/Select';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { noop } from 'constants/functions';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

//Title = NewDesign/Select (-> inputs/select after relocation folder)
export default {
    title: getStoriesTitle(base),
    component: Select,
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

export const SampleNestedSelect = () => (
    <NestedSelect isLoading={false} selector={mockSelectorsArray} title="Filter by Locale" onSelect={noop} />
);
