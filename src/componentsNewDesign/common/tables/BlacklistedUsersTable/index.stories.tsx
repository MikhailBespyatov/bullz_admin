import { Meta, Story } from '@storybook/react/types-6-0';
import { Section } from 'components/grid/Section';
import {
    BlacklistedUsersTable,
    BlacklistedUsersTableProps
} from 'componentsNewDesign/common/tables/BlacklistedUsersTable';
import { MockBlacklistedUsers, testType } from 'componentsNewDesign/common/tables/BlacklistedUsersTable/constants';
import { Table } from 'componentsNewDesign/common/tables/Table';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: Table,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: 'white' }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <Section>
                    <ContentWrapper padding="25px" width="800px">
                        <Story />
                    </ContentWrapper>
                </Section>
            </>
        )
    ]
} as Meta;

const Template: Story<BlacklistedUsersTableProps> = args => <BlacklistedUsersTable {...args} />;

export const DefaultTable = Template.bind({});
DefaultTable.args = {
    items: MockBlacklistedUsers,
    type: testType
};
