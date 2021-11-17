import { useMediaQuery } from '@material-ui/core';
import arrowRight from 'assets/arrow_right.svg';
import {
    dropdownWrapperWidth,
    dropdownWrapperWidthMobile,
    rightArrowIconHeight,
    rightArrowIconWidth,
    titlePadding
} from 'componentsNewDesign/common/dropdowns/SectionDropdown/constants';
import {
    DropdownSectionButton,
    DropdownSectionProps,
    DropdownSectionWrapper
} from 'componentsNewDesign/common/dropdowns/SectionDropdown/style';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey29 } from 'constants/styles/colors';
import { xxs } from 'constants/styles/sizes';
import { useToggle } from 'hooks/toggle';
import React, { FC } from 'react';
import { DefaultValueBoolean } from 'types/form';

export const DropdownColumn: FC = ({ children }) => {
    const isMobile = useMediaQuery(`(max-width: ${xxs})`);
    return !isMobile ? (
        <Column width={dropdownWrapperWidth}>{children}</Column>
    ) : (
        <Column width={dropdownWrapperWidthMobile}>{children}</Column>
    );
};

export interface Props extends DropdownSectionProps, DefaultValueBoolean {
    title: string;
    backgroundColor?: string;
}

export const DropdownSection: FC<Props> = ({ children, title, defaultValue = false, ...rest }) => {
    const [isOpened, toggleIsOpened] = useToggle(defaultValue);

    return (
        <DropdownSectionWrapper backgroundColor={grey29} isOpened={isOpened} {...rest}>
            <DropdownSectionButton backgroundColor={grey29} onClick={toggleIsOpened} {...rest}>
                <ContentText fontSize="16px" fontWeight="700" padding={titlePadding}>
                    {title}
                </ContentText>
                <CustomImg
                    alt="Arrow"
                    height={rightArrowIconHeight}
                    rotate={isOpened ? 90 : 0}
                    src={arrowRight}
                    width={rightArrowIconWidth}
                />
            </DropdownSectionButton>
            {isOpened && children}
        </DropdownSectionWrapper>
    );
};
