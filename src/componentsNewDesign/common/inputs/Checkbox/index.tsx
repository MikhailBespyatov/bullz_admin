import checkmarkIcon from 'assets/checkmark_icon.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { checkMarkIconHeight, checkMarkIconWidth } from 'componentsNewDesign/common/inputs/Checkbox/constants';
import { HiddenCheckbox, Label, VisibleCheckbox, Wrapper } from 'componentsNewDesign/common/inputs/Checkbox/styles';
import { CheckboxProps } from 'componentsNewDesign/common/inputs/Checkbox/types';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { noop } from 'constants/functions';
import React, { useEffect, useState } from 'react';

interface Props extends CheckboxProps {
    onChange?: (checked: boolean) => void;
    name?: string;
}

export const BooleanCheckbox = ({
    defaultChecked = false,
    disabled = false,
    onChange = noop,
    name = 'name'
}: Props) => {
    const [checked, setChecked] = useState(defaultChecked);

    const onCheckboxChange = () => {
        setChecked(!checked);
        onChange(!checked);
    };

    useEffect(() => setChecked(defaultChecked), [defaultChecked]);

    return (
        <Wrapper>
            <Label>
                <VisibleCheckbox checked={checked} disabled={disabled}>
                    <AbsoluteWrapper bottom="4px" left="2px">
                        <CustomImg
                            alt="Checkbox"
                            height={checkMarkIconHeight}
                            src={checkmarkIcon}
                            width={checkMarkIconWidth}
                        />
                    </AbsoluteWrapper>
                </VisibleCheckbox>
                <HiddenCheckbox checked={checked} disabled={disabled} name={name} onChange={onCheckboxChange} />
            </Label>
        </Wrapper>
    );
};
