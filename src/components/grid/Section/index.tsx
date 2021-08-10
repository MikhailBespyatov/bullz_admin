import { flexStart, marginBottomMixin } from 'constants/styles/mixins';
import { padding } from 'constants/styles/sizes';
import styled from 'styled-components';
import { FlexBooleanAlignment, RemoveMarginRightBottom } from 'types/styles';

interface Props extends RemoveMarginRightBottom, FlexBooleanAlignment {}

export const Section = styled.section<Props>`
    width: 100%;
    ${flexStart};
    ${({ justifyCenter }) => (justifyCenter ? 'justify-content: center;' : '')};
    ${({ justifyBetween }) => (justifyBetween ? 'justify-content: space-between;' : '')};
    ${({ alignCenter }) => (alignCenter ? 'align-items: center;' : '')};
    flex-direction: row;
    flex-wrap: wrap;
    ${({ removeMarginBottom }) => (removeMarginBottom ? `` : `margin-bottom: ${padding}`)};
    ${({ removeMarginRight }) => (removeMarginRight ? `` : `padding-right: calc(2 * ${padding})`)};
    //${({ removeMarginBottom }) => (removeMarginBottom ? '' : marginBottomMixin)};
    margin-bottom: 24px;
`;
