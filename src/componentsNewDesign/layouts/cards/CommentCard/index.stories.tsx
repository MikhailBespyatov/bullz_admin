import { Meta, Story } from '@storybook/react/types-6-0';
import sampleImage from 'assets/user_image_sample.svg';
import { CommentCard, CommentCardProps } from 'componentsNewDesign/layouts/cards/CommentCard';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { grey14 } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: CommentCard,
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

const Template: Story<CommentCardProps> = args => <CommentCard {...args} />;

export const SampleCommentCard = Template.bind({});
SampleCommentCard.args = {
    profileImageUrl: sampleImage,
    username: 'Dianne Russell',
    utcCreated: '1h',
    body: '😃😃😃 ullamco est sit aliqua dolor do amet sint',
    isBlocked: false
};
