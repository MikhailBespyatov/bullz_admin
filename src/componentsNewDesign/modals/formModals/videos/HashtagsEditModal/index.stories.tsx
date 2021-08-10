import { Meta, Story } from '@storybook/react/types-6-0';
import { VideoHashtagsEditorModal } from 'componentsNewDesign/modals/formModals/videos/HashtagsEditModal';
import { CuratePopover } from 'componentsNewDesign/modals/popovers/CuratePopover';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { nameProject } from 'constants/services';
import { grey } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: CuratePopover,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: grey }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <ContentWrapper backgroundColor="grey" borderRadius="0" height="100%" width="100%">
                    <Section>
                        <MarginWrapper marginLeft="30px" marginTop="400px">
                            <Story />
                        </MarginWrapper>
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story = args => <VideoHashtagsEditorModal {...args} />;

export const TopPopover = Template.bind({});
TopPopover.args = {
    hashTags: ['cream', 'trending', 'cream', 'trending', 'cream', 'trending']
};
