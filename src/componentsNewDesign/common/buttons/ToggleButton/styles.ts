import { togglerDiameter, togglerTop } from 'componentsNewDesign/common/buttons/ToggleButton/constants';
import { blue, white } from 'constants/styles/colors';
import styled from 'styled-components';

export const StyledToggleButton = styled.input`
    appearance: none;
    position: relative;
    width: 34px;
    height: 18px;
    background: #d1d1d1;
    border-radius: 9px;
    cursor: pointer;
    outline: none;

    &:after {
        content: '';
        display: inline-block;
        position: absolute;
        height: ${togglerDiameter};
        width: ${togglerDiameter};
        top: ${togglerTop};
        left: 2px;
        background-color: ${white};
        border-radius: 50%;

        transform: translateX(0);
    }

    &:checked::after {
        transform: translateX(calc(100% + ${togglerTop}));
        background-color: #fff;
    }

    &:checked {
        background-color: ${blue};
    }

    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
`;
