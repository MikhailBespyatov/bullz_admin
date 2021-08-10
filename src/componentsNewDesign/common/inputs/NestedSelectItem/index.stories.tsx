import { Meta, Story } from '@storybook/react/types-6-0';
import { NestedSelectItem, NestedSelectItemProps } from 'componentsNewDesign/common/inputs/NestedSelectItem';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: NestedSelectItem,
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

const Template: Story<NestedSelectItemProps> = args => <NestedSelectItem {...args} />;

export const DefaultNestedSelectItem = Template.bind({});
DefaultNestedSelectItem.args = {
    value: 'Country and Region'
};
