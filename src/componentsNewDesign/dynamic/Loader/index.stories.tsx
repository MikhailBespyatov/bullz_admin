import { Meta } from '@storybook/react/types-6-0';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { nameProject } from 'constants/services';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: Loader,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: 'lightGrey' }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <ContentWrapper
                    backgroundColor="lightGrey"
                    borderRadius="0"
                    height="100%"
                    paddingLeft="30px"
                    paddingTop="50px"
                    width="100%"
                >
                    <Section alignCenter>
                        <Story />
                    </Section>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

export const Loaders = () => (
    <>
        <Loader size="small" />
        <MarginWrapper margin="0 50px">
            <Loader size="middle" />
        </MarginWrapper>
        <Loader size="large" />

        <MarginWrapper margin="0 50px">
            <Loader isWhite size="small" />
        </MarginWrapper>

        <Loader isWhite size="middle" />

        <MarginWrapper margin="0 50px">
            <Loader isWhite size="large" />
        </MarginWrapper>
    </>
);
