import {
    inputBorder,
    inputsHorizontalPadding,
    inputsVerticalPadding
} from 'componentsNewDesign/common/inputs/StyledTextInput/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const TextInputWrapper = styled(ContentWrapper)`
    ${flexCenter};
    border: ${inputBorder};
    padding: ${inputsVerticalPadding} ${inputsHorizontalPadding};
    outline: none;
`;
