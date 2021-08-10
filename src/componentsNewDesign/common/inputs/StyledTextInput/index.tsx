import { TextInputWrapper } from 'componentsNewDesign/common/inputs/StyledTextInput/styles';
import { TextInput } from 'componentsNewDesign/common/inputs/TextInput';
import { noop } from 'constants/functions';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { DefaultValueString, OnStringChange, Placeholder } from 'types/form';
import { ReactKeyboard } from 'types/react';
import { Sizes } from 'types/styles';

export interface Props extends OnStringChange, DefaultValueString, Placeholder, Sizes, ReactKeyboard<HTMLInputElement> {
    disableClearButton?: boolean;
    disableEnterKeyDown?: boolean;
}

export const StyledTextInput = ({
    width = '100%',
    height,
    onChange = noop,
    onKeyDown,
    defaultValue,
    placeholder,
    disableClearButton,
    disableEnterKeyDown
}: Props) => {
    const [value, setValue] = useState(defaultValue);

    const onInputChange = (value: string) => {
        setValue(value);
        onChange(value);
    };
    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !disableEnterKeyDown) {
            if (value) {
                onChange(value);
                setValue('');
            }
        }
    };
    const clearInput = () => {
        setValue('');
        onChange('');
    };

    useEffect(() => setValue(defaultValue), [defaultValue]);

    return (
        <>
            <TextInputWrapper height={height} width={width}>
                <TextInput
                    disableClearButton={disableClearButton}
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                    onClick={clearInput}
                    onKeyDown={disableEnterKeyDown ? undefined : onKeyDown || onInputKeyDown}
                />
            </TextInputWrapper>
        </>
    );
};
