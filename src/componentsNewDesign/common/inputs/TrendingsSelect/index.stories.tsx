import { Meta, Story } from '@storybook/react/types-6-0';
import { Select, SelectProps } from 'componentsNewDesign/common/inputs/Select';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
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

const Template: Story<SelectProps> = args => <Select {...args} />;

const selector = ['Name', 'Two', 'Testing string'];
let activeSelector = selector[0];
const setActiveSelector = (index: number) => {
    activeSelector = selector[index];
};

export const DefaultSelector = Template.bind({});
DefaultSelector.args = {
    defaultIndex: selector.findIndex(item => item === activeSelector),
    selector,
    onChange: setActiveSelector,
    width: '200px'
};

export const ManualSelector = Template.bind({});
ManualSelector.args = {
    ...DefaultSelector.args,
    paddingRight: '20px',
    paddingLeft: '10px',
    paddingBottom: '20px',
    paddingTop: '10px',
    width: '250px',
    height: '60px'
};

export const OneItemSelector = Template.bind({});
OneItemSelector.args = {
    ...DefaultSelector.args,
    selector: ['One item Selector']
};

export const TitleSelector = Template.bind({});
TitleSelector.args = {
    ...DefaultSelector.args,
    title: 'Test title string '
};
