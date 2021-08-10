import { Meta, Story } from '@storybook/react/types-6-0';
import { TopBar, TopBarProps } from 'componentsNewDesign/grid/TopBar';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';
import { ContentWrapper } from '../../wrappers/ContentWrapper';

export default {
    title: getStoriesTitle(base),
    component: TopBar,
    parameters: {
        backgrounds: {
            default: 'YEAY',
            values: [{ name: 'YEAY', value: backgroundColor }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <Section>
                    <ContentWrapper height="400px" paddingLeft="30px" paddingTop="20px" width="100%">
                        <Story />
                    </ContentWrapper>
                </Section>
            </>
        )
    ]
} as Meta;

const contentTopBar = ['First Item', 'Second Item', 'Last Item'];

const changeContentTopBar = () => {};

const Template: Story<TopBarProps> = args => <TopBar {...args} />;

export const DefaultTopBar = Template.bind({});
DefaultTopBar.args = {
    content: contentTopBar,
    onChange: changeContentTopBar,
    defaultActiveItem: contentTopBar[1]
};
