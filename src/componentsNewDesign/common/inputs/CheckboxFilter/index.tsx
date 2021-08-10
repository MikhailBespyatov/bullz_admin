import React from 'react';
import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { TitleSpan } from './styles';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { CheckboxProps } from 'componentsNewDesign/common/inputs/Checkbox/types';

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
