import { black, grey17 } from 'constants/styles/colors';
import { disableDefaultInputStyleMixin } from 'constants/styles/mixins';
import styled from 'styled-components';
import { Active } from 'types/global';
import { Sizes } from 'types/styles';

export const Input = styled.input`
    ${disableDefaultInputStyleMixin};
    width: 100%;
    padding: 7px 10px;
    font-size: 11px;
    font-weight: '500';
    font-style: normal;
    line-height: normal;
    letter-spacing: 0em;
    text-align: left;
    background-color: transparent;
    outline: none;

    :placeholder {
        color: ${grey17};
    }

    :focus::placeholder {
        color: transparent;
    }
`;

interface InputWrapperProps extends Active, Pick<Sizes, 'width'> {}

export const InputWrapper = styled.div<InputWrapperProps>`
    display: flex;
    align-items: center;
    width: ${({ width }) => width || '90%'};
    border: 1px solid ${grey17};
    border-radius: 2px;
    outline: none;
    margin: 3px auto;

    ${({ active }) => active && `border-color: ${black};`};
`;
