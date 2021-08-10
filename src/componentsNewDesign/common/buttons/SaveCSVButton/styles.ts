import styled, { css } from 'styled-components';
import { buttonEffectMixin, disableDefaultButtonStyleMixin } from 'constants/styles/mixins';
import { black, white } from 'constants/styles/colors';

const styledButtonMixin = css`
    color: ${black};
    background-color: ${white};
    border-radius: 8px;
    padding: 12px;
    min-width: 100px;
`;

export const DisabledButton = styled.button`
    ${disableDefaultButtonStyleMixin};
    ${styledButtonMixin};
    cursor: not-allowed;
`;

export const CSVButton = styled.button`
    ${disableDefaultButtonStyleMixin};
    ${buttonEffectMixin};
    height: 40px;
    a {
        ${styledButtonMixin};
    }
`;
