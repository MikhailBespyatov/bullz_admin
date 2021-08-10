import { BtnHL, ContainerHL, Log } from 'components/common/buttons/MenuCloseButton/styles';
import React from 'react';
import { IsClosed } from 'types/data';
import { NoopClick } from 'types/global';

interface Props extends NoopClick, IsClosed {}

export const MenuCloseButton = ({ onClick, isClosed }: Props) => (
    <BtnHL onClick={onClick}>
        <ContainerHL>
            <Log isClosed={isClosed} />
            <Log isClosed={isClosed} />
            <Log isClosed={isClosed} />
        </ContainerHL>
    </BtnHL>
);
