import { Meta, Story } from '@storybook/react/types-6-0';
import sampleImage from 'assets/user_image_sample.svg';
import { CommentBlock, CommentBlockProps } from 'componentsNewDesign/layouts/blocks/CommentBlock';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { grey14 } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: CommentBlock,
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

const Template: Story<CommentBlockProps> = args => <CommentBlock {...args} />;

export const SampleCommentCard = Template.bind({});
SampleCommentCard.args = {
    profileImageUrl: sampleImage,
    username: 'Dianne Russell',
    utcCreated: '1h',
    body: '😃😃😃 !!Parent comment ullamco est sit aliqua dolor do amet sint',
    isBlocked: false,
    repliesCount: 4,
    threadComments: [
        {
            profileImageUrl: sampleImage,
            username: ' Jack Lee',
            body: 'Some text here comment ullamco est sit aliqua dolor do amet sint',
            utcCreated: '2.5h',
            utcUpdated: '3h',
            isBlocked: false
        },
        {
            username: ' Donald Trump',
            body: 'Some text here comment ullamco est sit aliqua dolor do amet sint',
            utcCreated: '3.2h',
            isBlocked: true
        },
        {
            profileImageUrl: sampleImage,
            username: ' Luicy Liu',
            body: 'Some text here comment ullamco est sit aliqua dolor do amet sint',
            utcCreated: '4h',
            isBlocked: false
        },
        {
            profileImageUrl: sampleImage,
            username: ' Vanessa Paradi',
            body: 'Some text here comment ullamco est sit aliqua dolor do amet sint',
            utcCreated: '4.5h',
            isBlocked: false
        }
    ]
};
