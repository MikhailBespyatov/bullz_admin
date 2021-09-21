import {
    iconWrapperVerticalPadding,
    inputFontSize,
    inputVerticalPadding,
    inputWrapperHeight
} from 'componentsNewDesign/common/inputs/TextInput/constants';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { grey14 } from 'constants/styles/colors';
import { disableDefaultInputStyleMixin } from 'constants/styles/mixins';
import styled from 'styled-components';
import { BorderProperties, Opacity, Sizes, TextProperties } from 'types/styles';

export interface InputProps extends TextProperties, Opacity, Sizes, Pick<BorderProperties, 'borderBottom'> {
    backgroundColor?: string;
}

export const InputWrapper = styled(RelativeWrapper)<InputProps>`
    outline: none;
    height: ${inputWrapperHeight};
    width: ${({ width }) => width || '100%'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ borderBottom }) => borderBottom && `border-bottom: ${borderBottom}`};
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`}
`;

export const IconWrapper = styled.div`
    padding: ${iconWrapperVerticalPadding} 0px;
`;

export const Input = styled.input<InputProps>`
    ${disableDefaultInputStyleMixin};
    font-size: ${inputFontSize};
    font-weight: ${({ fontWeight }) => fontWeight || '400'};
    font-style: normal;
    line-height: normal;
    letter-spacing: 0em;
    text-align: left;
    padding: ${inputVerticalPadding} 5px ${inputVerticalPadding} 0px;
    background-color: transparent;
    outline: none;
    width: 100%;
    ${({ opacity }) => opacity && `opacity: ${opacity}`};
    color: white;

    :placeholder {
        font-size: ${inputFontSize};
        font-weight: bold;
        font-style: normal;
        line-height: normal;
        color: ${grey14};
    }

    :focus::placeholder {
        color: transparent;
    }
`;
