import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { checkboxBorderRadius, checkboxDiameter } from 'componentsNewDesign/common/inputs/Checkbox/constants';
import { CheckboxProps } from 'componentsNewDesign/common/inputs/Checkbox/types';
import { backgroundColor, grey2, white } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import { transitionTime } from 'constants/styles/others';
import { borderWidth } from 'constants/styles/sizes';
import styled from 'styled-components';

export const Label = styled.label`
    ${flexCenter};
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;

    &:hover {
        cursor: pointer;
    }
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
    border: ${borderWidth} solid ${white};
    transition: ${transitionTime};
    cursor: pointer;
    ${({ disabled }) =>
        disabled ? `background: '${backgroundColor}'; border-color: ${grey2}; cursor: not-allowed` : ``};
    ${CustomImage} {
        visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    }
`;
