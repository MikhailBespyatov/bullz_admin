import { blue, grey } from '@material-ui/core/colors';
import { checkboxBorderRadius, checkboxDiameter, spanPadding } from 'components/common/inputs/SimpleCheckbox/constants';
import { CheckboxProps } from 'components/common/inputs/SimpleCheckbox/types';
import { black } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import { transitionTime } from 'constants/styles/others';
import { borderWidth } from 'constants/styles/sizes';
/*import {
    black,
    blue,
    borderWidth,
    disableDefaultCheckboxStyleMixin,
    disabledGrey,
    flexCenter,
    formGrey3,
    transitionTime,
    white
} from 'constants/styles';*/
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

/*
export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    ${disableDefaultCheckboxStyleMixin};
`;*/

export const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`;

export const StyledCheckbox = styled.div<CheckboxProps>`
    display: inline-block;
    width: ${checkboxDiameter};
    height: ${checkboxDiameter};
    background: ${({ checked }) => (checked ? 'grey' : 'white')};
    border-radius: ${checkboxBorderRadius};
    border: ${borderWidth} solid ${black};
    transition: ${transitionTime};
    cursor: pointer;
    ${({ disabled }) => (disabled ? `background: ${grey}; border-color: ${grey}; cursor: not-allowed` : ``)};
`;
/* 
    ${Checkbox}:focus + & {
        box-shadow: 0 0 0 3px ${greenYellow};
    }
    ${Icon} {
        visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    }
*/

export const Label = styled.label`
    ${flexCenter};
`;

export const Span = styled.span<CheckboxProps>`
    padding-left: ${spanPadding};
    font-size: ${checkboxDiameter};
    color: ${({ checked }) => (checked ? blue : black)};
    ${({ disabled }) => (disabled ? `color: ${grey}` : ``)};
    transition: ${transitionTime};
`;
