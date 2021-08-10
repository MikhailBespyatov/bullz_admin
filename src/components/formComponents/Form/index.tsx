import { Form as AntForm } from 'antd';
import { FormProps } from 'antd/lib/form';
import { layout } from 'components/formComponents/Form/constants';
import React, { FC } from 'react';

// TODO: [any]
interface Props extends FormProps {
    onFinish: (values: any) => void;
}

export const Form: FC<Props> = props => <AntForm {...layout} {...props} />;
