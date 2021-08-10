import React, { ChangeEvent } from 'react';
import { Disabled } from 'types/form';
import { StyledToggleButton } from './styles';

export interface ToggleButtonProps extends Disabled {
    value?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleButton = ({ value, onChange, disabled }: ToggleButtonProps) => (
    <StyledToggleButton checked={value} disabled={disabled} type="checkbox" onChange={onChange} />
);
