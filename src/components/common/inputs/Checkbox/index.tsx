import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import { Title } from 'components/common/typography/titles/Title';
import React, { FC } from 'react';
import { Title as TitleProps } from 'types/data';

export interface Props extends CheckboxProps, TitleProps {}

export const Checkbox: FC<Props> = ({ title = 'WomValidationState3: ', onChange, defaultChecked = true, ...rest }) => (
    <>
        <Title>{title}</Title>
        <AntCheckbox defaultChecked={defaultChecked} onChange={onChange} {...rest} />
    </>
);
