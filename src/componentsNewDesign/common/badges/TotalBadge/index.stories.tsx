import { Meta } from '@storybook/react/types-6-0';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { white } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: TotalBadge,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: white }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <ContentWrapper
                    backgroundColor={white}
                    borderRadius="0px"
                    height="100%"
                    paddingLeft="20px"
                    paddingRight="20px"
                    paddingTop="20px"
                    width="100%"
                >
                    <Section justifyEvenly>
                        <Story />
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

export const TotalBtn = () => (
    <>
        <TotalBadge quantity={384} />
        <TotalBadge quantity={10500} />
    </>
);
