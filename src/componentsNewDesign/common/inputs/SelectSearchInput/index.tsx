import crossIcon from 'assets/icons/cross_icon.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { clearButtonDiameter, crossIconDiameter } from 'componentsNewDesign/common/inputs/SelectSearchInput/constants';
import { Input, InputWrapper } from 'componentsNewDesign/common/inputs/SelectSearchInput/styles';
import { OpacityActiveEffect } from 'componentsNewDesign/dynamic/effects';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { noop } from 'constants/functions';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { OnStringChange, Placeholder } from 'types/form';
import { ReactKeyboard } from 'types/react';
import { Sizes } from 'types/styles';

//import { ReactKeyboard } from 'types/react';

export interface SelectSearchInputProps
    extends Placeholder,
        Required<OnStringChange>,
        ReactKeyboard<HTMLInputElement>,
        Pick<Sizes, 'width'> {
    startSearch?: (value: string) => void;
    value: string;
}

export const SelectSearchInput = ({
    onChange,
    startSearch = noop,
    placeholder,
    value,
    //onKeyDown,
    width
}: SelectSearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    //const [isPressedEnter, setIsPressedEnter] = useState(false);

    const onInputFocus = () => {
        setIsFocused(true);
    };

    const onInputBlur = () => {
        setIsFocused(false);
        // if (!isPressedEnter && value) {
        //     startSearch(value);
        //     setIsPressedEnter(true);
        // }
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    const onInputKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
        if (key === 'Enter' && value) {
            onChange(value);
            startSearch(value);
            // setIsPressedEnter(true);
        }
        // else if (key === 'Backspace') {
        //     value?.length === 1 && clearSearch();
        // }
    };

    const clearInput = () => {
        onChange('');
    };

    return (
        <InputWrapper active={isFocused} width={width}>
            <Input
                placeholder={placeholder}
                type="text"
                value={value}
                onBlur={onInputBlur}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onKeyDown={onInputKeyDown}
            />

            <OpacityActiveEffect active={!!value} opacity={0}>
                <ClickableWrapper height={clearButtonDiameter} width={clearButtonDiameter} onClick={clearInput}>
                    <CustomImg
                        alt="clear search button"
                        height={crossIconDiameter}
                        src={crossIcon}
                        width={crossIconDiameter}
                    />
                </ClickableWrapper>
            </OpacityActiveEffect>
        </InputWrapper>
    );
};
