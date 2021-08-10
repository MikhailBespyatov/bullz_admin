import { Meta, Story } from '@storybook/react/types-6-0';
import { RemovableHashtag, RemovableHashtagProps } from 'componentsNewDesign/common/tags/RemovableHashtag';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: RemovableHashtag,
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

const Template: Story<RemovableHashtagProps> = args => <RemovableHashtag {...args} />;

export const DefaultClosableTag = Template.bind({});
DefaultClosableTag.args = { subject: 'Test string' };
