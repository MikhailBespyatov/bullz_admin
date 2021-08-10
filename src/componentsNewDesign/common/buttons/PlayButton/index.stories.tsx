import { Meta } from '@storybook/react/types-6-0';
import { UserCardButtonProps } from 'componentsNewDesign/common/buttons/CardButton';
import { PlayButton } from 'componentsNewDesign/common/buttons/PlayButton';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { nameProject } from 'constants/services';
import { grey } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import base from 'paths.macro';
import React from 'react';
import { getStoriesTitle } from 'utils/usefulFunctions';

interface Props extends UserCardButtonProps {
    children: string;
}

export default {
    title: getStoriesTitle(base),
    component: PlayButton,
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
                <ContentWrapper
                    backgroundColor={grey}
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

export const PlayBtn = () => <PlayButton />;
