import { Meta, Story } from '@storybook/react/types-6-0';
import { SortSelector, SortSelectorProps } from 'componentsNewDesign/common/inputs/SortSelector';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: SortSelector,
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

const Template: Story<SortSelectorProps> = args => <SortSelector {...args} />;

export const DefaultSortSelector = Template.bind({});
DefaultSortSelector.args = {
    type: '+asc',
    onChange: isAscending => console.log(isAscending)
};
