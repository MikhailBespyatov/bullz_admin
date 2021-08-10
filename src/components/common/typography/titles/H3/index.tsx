import { textInfoColor } from 'constants/styles/colors';
import { ellipsisMixin, flexStart } from 'constants/styles/mixins';
import { textInfoFontSize, textInfoLineHeight } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Ellipsis, RemoveMarginBottom } from 'types/styles';

interface Props extends Ellipsis, RemoveMarginBottom {}

export const H3 = styled.h3<Props>`
    ${flexStart};
    font-weight: bold;
    font-size: ${textInfoFontSize};
    line-height: ${textInfoLineHeight};

    color: ${textInfoColor};
    max-width: 100%;
    ${({ ellipsis }) => (ellipsis ? ellipsisMixin : '')};
    ${({ removeMarginBottom }) => (removeMarginBottom ? 'margin-bottom: 0;' : '')};
`;
