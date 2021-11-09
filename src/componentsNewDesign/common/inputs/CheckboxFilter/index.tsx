import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { CheckboxProps } from 'componentsNewDesign/common/inputs/Checkbox/types';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import React from 'react';
import { TitleSpan, TrendingsTitleSpan } from './styles';

export interface CheckboxFilterProps extends CheckboxProps {
    children: string;
    onChange?: (checked: boolean) => void;
}

export const CheckboxFilter = ({ children, ...props }: CheckboxFilterProps) => (
    <>
        <MarginWrapper marginRight="10px">
            <BooleanCheckbox {...props} />
        </MarginWrapper>
        <TitleSpan>{children}</TitleSpan>
    </>
);

export const TrendingsCheckboxFilter = ({ children, ...props }: CheckboxFilterProps) => (
    <>
        <MarginWrapper marginRight="10px">
            <BooleanCheckbox {...props} />
        </MarginWrapper>
        <TrendingsTitleSpan>{children}</TrendingsTitleSpan>
    </>
);
