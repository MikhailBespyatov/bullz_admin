import { Meta, Story } from '@storybook/react/types-6-0';
import sampleImage from 'assets/user_image_sample.svg';
import { PosterLayout, PosterLayoutProps } from 'componentsNewDesign/layouts/PosterLayout';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { grey14 } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: PosterLayout,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: grey14 }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />

                <ContentWrapper
                    backgroundColor={grey14}
                    borderRadius="0px"
                    height="100%"
                    paddingLeft="20px"
                    paddingRight="20px"
                    paddingTop="20px"
                    width="100%"
                >
                    <Section>
                        <Story />
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<PosterLayoutProps> = args => <PosterLayout {...args} />;

export const SampleIPosterLayout = Template.bind({});
SampleIPosterLayout.args = {
    src: sampleImage,
    height: '32px',
    width: '32px'
};
