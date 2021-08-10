import { textInfoColor } from 'constants/styles/colors';
import { ellipsisMixin } from 'constants/styles/mixins';
import { textInfoFontSize, textInfoLineHeight } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Ellipsis, RemoveMarginBottom } from 'types/styles';

interface Props extends Ellipsis, RemoveMarginBottom {}

export const H4 = styled.h4<Props>`
    font-weight: normal;
    font-size: ${textInfoFontSize};
    line-height: ${textInfoLineHeight};

    color: ${textInfoColor};
    max-width: 100%;
    ${({ ellipsis }) => (ellipsis ? ellipsisMixin : '')};
    ${({ removeMarginBottom }) => (removeMarginBottom ? 'margin-bottom: 0;' : '')};
`;
