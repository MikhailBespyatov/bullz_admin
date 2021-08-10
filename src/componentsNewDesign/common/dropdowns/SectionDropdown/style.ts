import { sectionBorderRadius } from 'componentsNewDesign/common/dropdowns/SectionDropdown/constants';
import { black, grey11, white } from 'constants/styles/colors';
import { disableDefaultButtonStyleMixin } from 'constants/styles/mixins';
import styled from 'styled-components';
import { BorderRadius, Sizes } from 'types/styles';

export interface DropdownSectionProps extends Sizes, BorderRadius {
    isOpened?: boolean;
}

export const DropdownSectionWrapper = styled.div<DropdownSectionProps>`
    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || 'fit-content'};
    border: 1px solid ${grey11};
    background-color: ${white};
    &:first-child {
        border-top-left-radius: ${sectionBorderRadius};
        border-top-right-radius: ${sectionBorderRadius};
    }
    &:last-child {
        border-bottom-left-radius: ${sectionBorderRadius};
        border-bottom-right-radius: ${sectionBorderRadius};
    }
    padding: 0 20px;
    ${({ isOpened }) => isOpened && 'padding-bottom: 8px;'};
    // border: 2px solid springgreen;
`;

export const DropdownSectionButton = styled.button<DropdownSectionProps>`
    ${disableDefaultButtonStyleMixin};
    border-radius: inherit;
    border-top-left-radius: inherit;
    width: 100%;
    height: 60px;
    // padding: 0 10px;
    color: ${black};
    background-color: ${white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;
