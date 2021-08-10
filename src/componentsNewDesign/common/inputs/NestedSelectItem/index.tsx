import { ArrowImg } from 'componentsNewDesign/common/imgComponents/ArrowImg';
import {
    ArrowClickableWrapper,
    NestedItemSpan,
    NestedItemWrapper,
    SelectorClickableWrapper
} from 'componentsNewDesign/common/inputs/NestedSelectItem/styles';
import React from 'react';
import { Active } from 'types/global';

export interface NestedSelectItemProps extends Active {
    onSelectorClick: (value: string) => void;
    onArrowClick: (value: string) => void;
    value: string;
    isNested?: boolean;
    selectable: boolean;
}

export const NestedSelectItem = ({
    value,
    onSelectorClick,
    onArrowClick,
    selectable,
    active,
    isNested = true
}: NestedSelectItemProps) => (
    //console.log('selectable', selectable);

    <NestedItemWrapper active={active} isNested={isNested} selectable={selectable}>
        <SelectorClickableWrapper
            active={active}
            onClick={() => {
                selectable && onArrowClick(value);
                onSelectorClick(value);
            }}
        >
            <NestedItemSpan>{value}</NestedItemSpan>
        </SelectorClickableWrapper>
        {isNested && (
            <ArrowClickableWrapper onClick={() => onArrowClick(value)}>
                <ArrowImg alt="Select Icon" height="20px" rotate={270} width="10px" />
            </ArrowClickableWrapper>
        )}
    </NestedItemWrapper>
);
