import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import { Title } from 'components/common/typography/titles/Title';
import React, { FC } from 'react';
import { Title as TitleProps } from 'types/data';

export interface Props extends CheckboxProps, TitleProps {}

export const ModalCheckbox: FC<Props> = ({ title = 'WomValidationState3: ', onChange, checked, ...rest }) => (
    <>
        <Title>{title}</Title>
        <AntCheckbox checked={checked} onChange={onChange} {...rest} />
    </>
);
