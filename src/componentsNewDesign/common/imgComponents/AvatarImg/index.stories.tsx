import { Meta, Story } from '@storybook/react/types-6-0';
import sampleImage from 'assets/user_image_sample.svg';
import { AvatarImg } from 'componentsNewDesign/common/imgComponents/AvatarImg';
import { UserDescription } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import { base } from 'paths.macro';
import React from 'react';
import { ImgProperties } from 'types/data';
import { Sizes } from 'types/styles';
import { getStoriesTitle } from 'utils/usefulFunctions';

export default {
    title: getStoriesTitle(base),
    component: UserDescription,
    parameters: {
        backgrounds: {
            default: nameProject,
            values: [{ name: nameProject, value: backgroundColor }]
        }
    },
    decorators: [
        Story => (
            <>
                <GlobalStyle />
                <Section>
                    <Story />
                </Section>
            </>
        )
    ]
} as Meta;

interface AvatarImgProps
    extends ImgProperties,
        Sizes,
        Pick<YEAY.AdminGetUserCommon, 'isTrusted' | 'isDisabled' | 'isAccountVerified'> {}

const Template: Story<AvatarImgProps> = args => <AvatarImg {...args} />;

export const SampleAvatarImg = Template.bind({});

SampleAvatarImg.args = {
    width: '75px',
    height: '75px',
    isDisabled: true,
    isTrusted: true,
    isAccountVerified: false,
    src: sampleImage
};
