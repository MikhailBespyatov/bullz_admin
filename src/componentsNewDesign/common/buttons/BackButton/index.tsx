import { BackButton } from 'componentsNewDesign/common/buttons/BackButton/style';
import { BackArrowIcon } from 'componentsNewDesign/common/icons/BackArrowIcon';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import React, { FC } from 'react';
import { ReactClick } from 'types/react';

interface BackButtonProps extends ReactClick<HTMLButtonElement> {}

export const BackButtonUserCard: FC<BackButtonProps> = ({ children, ...props }) => (
    <BackButton {...props}>
        <BackArrowIcon />
        <ContentWrapper backgroundColor="transparent" minWidth="30px" paddingLeft="24px">
            {children}
        </ContentWrapper>
    </BackButton>
);
