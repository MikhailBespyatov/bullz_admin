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
import { useToggle } from 'hooks/toggle';
import React, { FC } from 'react';
import { DefaultValueBoolean } from 'types/form';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';

export const DropdownColumn: FC = ({ children }) => <Column width={dropdownWrapperWidth}>{children}</Column>;

export interface Props extends DropdownSectionProps, DefaultValueBoolean {
    title: string;
}

export const DropdownSection: FC<Props> = ({ children, title, defaultValue = false, ...rest }) => {
    const [isOpened, toggleIsOpened] = useToggle(defaultValue);

    return (
        <DropdownSectionWrapper isOpened={isOpened} {...rest}>
            <DropdownSectionButton onClick={toggleIsOpened}>
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
