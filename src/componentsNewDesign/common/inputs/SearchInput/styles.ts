import {
    inputBorderBottom,
    inputPadding,
    mobileInputBorderBottom
} from 'componentsNewDesign/common/inputs/SearchInput/constants';
import { xs, xxs } from 'constants/styles/sizes';
import styled from 'styled-components';
import { BackgroundColor, BorderProperties, Padding, Sizes } from 'types/styles';

interface InputProps extends Pick<Padding, 'padding'>, Sizes, Pick<BorderProperties, 'border'>, BackgroundColor {}

export const InputWrapper = styled.div<InputProps>`
    flex-wrap: nowrap;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    padding: ${({ padding }) => (padding ? padding : inputPadding)};
    margin-right: 12px;
    border-bottom: ${inputBorderBottom};
    ${({ border }) => border && `border: ${border}; border-radius: 8px`};
    min-width: 200px;
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`}

    @media (max-width: ${xs}) {
        width: ${({ width }) => (width ? width : '100%')};
        max-width: 440px;
        padding-left: 0;
        margin-left: 19px;
        margin-right: 26px;
        border-bottom: ${mobileInputBorderBottom};
        margin-bottom: 10px;
    }
    @media (max-width: ${xxs}) {
        max-width: 280px;
    }
`;

// export const Input = styled.input<InputProps>`
//     ${disableDefaultInputStyleMixin};
//     width: 100%;
//     font-size: 12px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 14px;
//     letter-spacing: 0em;
//     text-align: left;
//     padding-left: ${({ paddingLeft }) => paddingLeft || '10px'};
//     padding-bottom: 16px;
//     background-color: transparent;
//     border-bottom: 1px solid #000;
//     opacity: 0.4;
//     // height: ${inputHeight};

//     :placeholder {
//         font-style: normal;
//         font-weight: bold;
//         font-size: 12px;
//         line-height: 14px;
//         color: ${grey14};
//         // opacity: 0.6;
//     }

//     :focus {
//         opacity: 1;
//     }
// `;

// export const SearchInputWrapper = styled(ContentWrapper)`
//     outline: none;
//     /* border: 1px solid rgba(0, 0, 0, 0); */
//     /* margin-right: ${filterMargin}; */
//     margin-bottom: ${({ marginBottom }) => marginBottom || filterMargin};

//     /* :focus-within {
//         border-bottom: 1px solid #000;
//     } */
// `;

// export const FlexGrowInput = styled.div`
//     flex-grow: 1;
//     margin-right: 5px;
//     /* padding: 10px 0; */
// `;

// export const BorderInputBlock = styled.div`
//     width: 2px;
//     background-color: ${grey2};
//     height: 48px;
//     opacity: 0.4;
// `;
