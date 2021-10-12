import {
    hashtagBorderColor,
    hashtagBorderRadius,
    hashtagHeight,
    hashtagPaddingRightAndLeft,
    hashtagTextColor,
    hashtagTextFontSize,
    hashtagTextFontWeight
} from 'componentsNewDesign/common/tags/Hashtag/constants';
import { HashtagProps } from 'componentsNewDesign/common/tags/Hashtag/types';
import { grey30 } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const StyledHashtag = styled.div<HashtagProps>`
    width: ${({ width }) => width || 'fit-content'};
    height: ${({ height }) => height || hashtagHeight};
    white-space: nowrap;
    font-size: ${({ fontSize }) => fontSize || hashtagTextFontSize};
    font-weight: ${({ fontWeight }) => fontWeight || hashtagTextFontWeight};
    color: ${({ color }) => color || hashtagTextColor};
    border: 1px solid ${({ borderColor }) => borderColor || hashtagBorderColor};
    background-color: ${grey30};
    border-radius: ${({ borderRadius }) => borderRadius || hashtagBorderRadius};
    padding: 0 ${({ horizontalPadding }) => horizontalPadding || hashtagPaddingRightAndLeft};
    ${flexCenter};
`;
