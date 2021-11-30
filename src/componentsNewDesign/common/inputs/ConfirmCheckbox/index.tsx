import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { white } from 'constants/styles/colors';
import React from 'react';

export interface ConfirmCheckboxProps {
    title?: string;
    isConfirmed: boolean;
    onChange?: (checked: boolean) => void;
    fontSize?: string;
}

export const ConfirmCheckbox = ({ isConfirmed, onChange, title, fontSize }: ConfirmCheckboxProps) => (
    <Row alignCenter noWrap>
        <BooleanCheckbox defaultChecked={isConfirmed} onChange={onChange} />
        <Span noWrap color={white} fontSize={fontSize ? fontSize : '14px'} fontWeight="400" lineHeight="24px">
            {title}
        </Span>
    </Row>
);
