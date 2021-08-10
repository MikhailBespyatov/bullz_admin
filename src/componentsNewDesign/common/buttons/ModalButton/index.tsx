import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { white } from 'constants/styles/colors';
import React, { FC } from 'react';
import { Disabled } from 'types/form';
import { NoopClick } from 'types/global';
import { Background, Sizes } from 'types/styles';

interface ButtonProps extends NoopClick, Background, Disabled, Sizes {}

export const ModalButton: FC<ButtonProps> = ({ width, ...props }) => (
    <SimpleButton color={white} fontSize="11px" fontWeight="500" {...props} height="45px" width={width || '103px'} />
);
