import { Meta, Story } from '@storybook/react/types-6-0';
import { SearchInput, SearchInputProps } from 'componentsNewDesign/common/inputs/SearchInput';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { SearchParameters } from 'types/data';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: SearchInput,
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

const Template: Story<SearchInputProps> = args => <SearchInput {...args} />;

const searchParameters: SearchParameters[] = [
    {
        searchBy: 'User ID',
        defaultValue: 'userId112312124',
        onSearch: () => {}
    },
    {
        searchBy: 'Thread ID',
        defaultValue: '',
        placeholder: 'placeholder of field of thread id ',
        onSearch: () => {}
    }
];

export const DefaultSearchInput = Template.bind({});
DefaultSearchInput.args = {
    searchParameters: searchParameters
};
