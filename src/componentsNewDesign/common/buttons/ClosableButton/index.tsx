import closeIcon from 'assets/close_closable_tag.svg';
import React from 'react';
import { NoopClick } from 'types/global';
import { ClosableButtonImg } from './styled';

export interface ClosableButtonProps extends NoopClick {}

export const ClosableButton = ({ onClick }: ClosableButtonProps) => (
    <ClosableButtonImg pointer src={closeIcon} onClick={onClick} />
);
