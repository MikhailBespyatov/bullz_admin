import arrow from 'assets/icons/sort_arrow.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { arrowDiameter } from 'componentsNewDesign/common/inputs/SortSelector/constants';
import { StyledButton } from 'componentsNewDesign/common/inputs/SortSelector/styles';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import React from 'react';
import { SortType } from 'types/types';

export interface SortSelectorProps {
    onChange: (isAscending: boolean) => void;
    type?: SortType;
}

export const SortSelector = ({ type, onChange }: SortSelectorProps) => {
    const onClickDescending = () => {
        onChange(false);
    };

    const onClickAscending = () => {
        onChange(true);
    };

    return (
        <Row alignCenter noWrap>
            <StyledButton active={type === '+desc'} onClick={onClickDescending}>
                <CustomImg height={arrowDiameter} rotate={180} src={arrow} width={arrowDiameter} />
            </StyledButton>
            <StyledButton active={type === '+asc'} onClick={onClickAscending}>
                <CustomImg height={arrowDiameter} rotate={0} src={arrow} width={arrowDiameter} />
            </StyledButton>
        </Row>
    );
};
