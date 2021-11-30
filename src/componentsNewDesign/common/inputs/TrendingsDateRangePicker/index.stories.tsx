import { Meta, Story } from '@storybook/react/types-6-0';
import { DateRangePicker, DateRangePickerProps } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: DateRangePicker,
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

const Template: Story<DateRangePickerProps> = args => <DateRangePicker {...args} />;

export const DefaultDateRangePicker = Template.bind({});
DefaultDateRangePicker.args = {
    dateRange: ['2021-01-26T12:15:09.753Z', '2021-01-28T12:15:09.753Z']
};
