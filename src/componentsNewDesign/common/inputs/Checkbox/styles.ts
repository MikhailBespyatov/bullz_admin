import { checkboxBorderRadius, checkboxDiameter } from 'componentsNewDesign/common/inputs/Checkbox/constants';
import { CheckboxProps } from 'componentsNewDesign/common/inputs/Checkbox/types';
import { backgroundColor, black, grey2 } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import { transitionTime } from 'constants/styles/others';
import { borderWidth } from 'constants/styles/sizes';
import styled from 'styled-components';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';

export const Wrapper = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const Label = styled.label`
    ${flexCenter};
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

export const VisibleCheckbox = styled.div<CheckboxProps>`
    position: relative;
    width: ${checkboxDiameter};
    height: ${checkboxDiameter};
    background: transparent;
    border-radius: ${checkboxBorderRadius};
    border: ${borderWidth} solid ${black};
    transition: ${transitionTime};
    cursor: pointer;
    ${({ disabled }) =>
        disabled ? `background: '${backgroundColor}'; border-color: ${grey2}; cursor: not-allowed` : ``};
    ${CustomImage} {
        visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    }
`;
