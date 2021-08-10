import Icon from '@ant-design/icons';
import { polylinePoints, viewBoxSizes } from 'components/common/inputs/SimpleCheckbox/constants';
import { Label } from 'components/common/inputs/SimpleCheckbox/styles';
import { Wrapper } from 'componentsNewDesign/grid/SideBar/styles';
import React from 'react';
import { DefaultChecked, Disabled } from 'types/form';

interface Props extends DefaultChecked, Disabled {
    onChange?: (checked: boolean) => void;
    name?: string;
}

export const BooleanCheckbox = (
    /*{
    defaultChecked = false,
    disabled = false
}: onChange = Noop,
name = 'name'
/*Props) => {
    const [checked, setChecked] = useState(defaultChecked);

    const onCheckboxChange = () => {
        setChecked(!checked);
        onChange(!checked);
    };*/

    //return (
    <>
        <Wrapper>
            <Label>
                <Icon viewBox={viewBoxSizes}>
                    <polyline points={polylinePoints} />
                </Icon>
                {/* <HiddenCheckbox checked={checked} disabled={disabled} name={name} onChange={onCheckboxChange} /> */}
            </Label>
        </Wrapper>
    </>
);
