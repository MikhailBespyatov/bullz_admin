import { Meta, Story } from '@storybook/react/types-6-0';
import { Empty, EmptyProps } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: Empty,
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

export const Template: Story<EmptyProps> = args => <Empty {...args} />;

export const DefaultEmpty = Template.bind({});
DefaultEmpty.args = {
    title: 'No Video Found',
    subtitle:
        'Pol, a bene contencio, raptus ionicis tormento! Pol, a bene contencio, raptus ionicis tormento! Pol, a bene contencio, raptus ionicis tormento! Pol, a bene contencio, raptus ionicis tormento!'
};
