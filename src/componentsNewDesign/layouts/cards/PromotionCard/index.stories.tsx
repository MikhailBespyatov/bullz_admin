import { Meta } from '@storybook/react/types-6-0';
import { PromotionCard } from 'componentsNewDesign/layouts/cards/PromotionCard';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { grey14 } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: PromotionCard,
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

//const Template: Story = () => <PromotionCard />;

// export const SamplePromotionCard = Template.bind({});

// SamplePromotionCard.args = {
//     id: '00000000000',
//     name: 'New Promotion',
//     startDate: undefined,
//     endDate: undefined,
//     pageRoute: 'https://someurl.com/3456',
//     targetRegions: ['Russia', 'United States', 'China'],
//     imageUrl: sampleImage
// };
