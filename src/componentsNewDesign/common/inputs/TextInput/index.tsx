import { ClearInputButton } from 'componentsNewDesign/common/buttons/ClearInputButton';
import { noop } from 'constants/functions';
import React, { ChangeEvent } from 'react';
import { OnStringChange, Placeholder } from 'types/form';
import { ReactClick, ReactKeyboard } from 'types/react';
import { BorderProperties } from 'types/styles';
import { IconWrapper, Input, InputProps, InputWrapper } from './styles';

export interface Props
    extends Placeholder,
        InputProps,
        Pick<BorderProperties, 'borderBottom'>,
        OnStringChange,
        ReactKeyboard<HTMLInputElement>,
        ReactClick<HTMLButtonElement> {
    value?: string;
    disableClearButton?: boolean;
    disableEnterKeyDown?: boolean;
}

export const TextInput = ({
    value,
    placeholder,
    disableClearButton,
    disableEnterKeyDown,
    onChange = noop,
    onKeyDown = noop,
    onClick,
    width,
    borderBottom,
    ...props
}: Props) => {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return (
        <InputWrapper borderBottom={borderBottom} width={width}>
            <Input
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={onInputChange}
                onKeyDown={disableEnterKeyDown ? undefined : onKeyDown}
                {...props}
            />
            <IconWrapper>{value && !disableClearButton && <ClearInputButton onClick={onClick} />}</IconWrapper>
        </InputWrapper>
    );
};
