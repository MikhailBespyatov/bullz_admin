import { Meta, Story } from '@storybook/react/types-6-0';
import sampleVideoImage from 'assets/sample_video_image.svg';
import { Props, TrendingVideoCard } from 'componentsNewDesign/layouts/cards/TrendingVideoCard';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { noop } from 'constants/functions';
import { nameProject } from 'constants/services';
import { grey14 } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: TrendingVideoCard,
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
                    <Story />
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

const Template: Story<Props> = args => <TrendingVideoCard {...args} />;

export const VideoCard = Template.bind({});
VideoCard.args = {
    thumbnailUrl: sampleVideoImage,
    viewCount: 2396,
    position: 1,
    onRemove: noop
};
