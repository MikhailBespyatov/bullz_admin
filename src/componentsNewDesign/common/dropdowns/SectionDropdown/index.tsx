import arrowRight from 'assets/arrow_right.svg';
import {
    dropdownWrapperWidth,
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
import { grey29, grey30 } from 'constants/styles/colors';
import { useToggle } from 'hooks/toggle';
import React, { FC } from 'react';
import { DefaultValueBoolean } from 'types/form';

export const DropdownColumn: FC = ({ children }) => <Column width={dropdownWrapperWidth}>{children}</Column>;

export interface Props extends DropdownSectionProps, DefaultValueBoolean {
    title: string;
    backgroundColor?: string;
}

export const DropdownSection: FC<Props> = ({ children, title, defaultValue = false, ...rest }) => {
    const [isOpened, toggleIsOpened] = useToggle(defaultValue);

    return (
        <DropdownSectionWrapper backgroundColor={isOpened ? grey30 : grey29} isOpened={isOpened} {...rest}>
            <DropdownSectionButton backgroundColor={isOpened ? grey30 : grey29} onClick={toggleIsOpened} {...rest}>
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
