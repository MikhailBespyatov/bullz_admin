import { Meta } from '@storybook/react/types-6-0';
import { AddIcon } from 'componentsNewDesign/common/icons/AddIcon';
import { BackArrowIcon } from 'componentsNewDesign/common/icons/BackArrowIcon';
import { MoreInfoIcon } from 'componentsNewDesign/common/icons/MoreInfoIcon';
import { SearchIcon } from 'componentsNewDesign/common/icons/SearchIcon';
import { TrashIcon } from 'componentsNewDesign/common/icons/TrashIcon';
import { TrustedIcon } from 'componentsNewDesign/common/icons/TrustedIcon';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { nameProject } from 'constants/services';
import { backgroundColor } from 'constants/styles/colors';
import { GlobalStyle } from 'constants/styles/global';
import React from 'react';
import { BannedIcon } from './BannedIcon';
import { NotVerifiedIcon } from 'componentsNewDesign/common/icons/NotVerifiedIcon';

export default {
    title: 'Icons/All Icons',
    component: SearchIcon,
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
                <Section justifyAround>
                    <Story />
                </Section>
            </>
        )
    ]
} as Meta;

export const Icons = () => (
    <>
        <SearchIcon />
        <BannedIcon />
        <TrustedIcon />
        <BackArrowIcon />
        <MoreInfoIcon />
        <TrashIcon />
        <AddIcon />
        <NotVerifiedIcon />
    </>
);
