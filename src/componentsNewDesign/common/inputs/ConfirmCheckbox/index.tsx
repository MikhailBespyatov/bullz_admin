import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey13 } from 'constants/styles/colors';
import React from 'react';

export interface ConfirmCheckboxProps {
    title?: string;
    isConfirmed: boolean;
    onChange?: (checked: boolean) => void;
}

export const ConfirmCheckbox = ({ isConfirmed, onChange, title }: ConfirmCheckboxProps) => (
    <Row alignCenter noWrap>
        <BooleanCheckbox defaultChecked={isConfirmed} onChange={onChange} />
        <ContentText color={grey13} fontSize="14px" fontWeight="400" lineHeight="24px" padding="0px 0px 0px 12px">
            {title}
        </ContentText>
    </Row>
);
