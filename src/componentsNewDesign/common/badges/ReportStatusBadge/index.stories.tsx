import { Meta } from '@storybook/react/types-6-0';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { white } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';
import { ReportStatusBadge } from 'componentsNewDesign/common/badges/ReportStatusBadge/index';

export default {
    title: getStoriesTitle(base),
    component: ReportStatusBadge,
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
                    <Column justifyBetween height="300px">
                        <Story />
                    </Column>
                </ContentWrapper>
            </>
        )
    ]
} as Meta;

export const ReportStatusBadgeSamples = () => (
    <>
        <ReportStatusBadge title="Report" />

        <ReportStatusBadge level="low" title="Report" />

        <ReportStatusBadge level="medium" title="Report" />

        <ReportStatusBadge level="high" title="Report" />
    </>
);
