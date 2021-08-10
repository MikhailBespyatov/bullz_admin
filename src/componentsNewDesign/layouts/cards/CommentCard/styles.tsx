import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { BlockButtonProps } from 'componentsNewDesign/layouts/cards/CommentCard';
import {
    blockButtonFontWeight,
    blockIconDiameter,
    commentInTreadMarginLeft,
    primaryFontSize,
    primaryFontWeight,
    secondaryFontSize,
    secondaryFontWeight,
    tertiaryFontSize,
    tertiaryFontWeight
} from 'componentsNewDesign/layouts/cards/CommentCard/constants';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { blockedColor, errorColor, grey16, grey9 } from 'constants/styles/colors';
import styled, { css } from 'styled-components';

interface CommentCardWrapperProps {
    isBlocked?: boolean;
}

const visibilityMixin = css`
    visibility: visible;
`;

const iconSizesMixin = css`
    height: ${blockIconDiameter};
    width: ${blockIconDiameter};
`;

export const CommentCardWrapper = styled(ContentWrapper)<CommentCardWrapperProps>`
    border-radius: 0px;
    padding: 8px 0px 8px 10px;

    ${({ isBlocked }) =>
        isBlocked &&
        css`
            background-color: ${blockedColor};
        `}

    :hover {
        background-color: ${({ isBlocked }) => (isBlocked ? '#ffe8e8' : grey16)};
    }
`;

export const UserNameSpan = styled(ContentText)`
    font-size: ${primaryFontSize};
    font-weight: ${primaryFontWeight};
    white-space: normal;
`;

export const CommentSpan = styled(ContentText)`
    font-size: ${secondaryFontSize};
    font-weight: ${secondaryFontWeight};
    line-height: 22px;
`;

export const SupplementarySpan = styled(ContentText)`
    color: ${grey9};
    font-size: ${tertiaryFontSize};
    font-weight: ${tertiaryFontWeight};
    line-height: 22px;
`;

export const BlockIconRed = styled(CustomImg)`
    ${iconSizesMixin}
`;
export const BlockIconBlack = styled(CustomImg)`
    ${iconSizesMixin}
`;
export const BlockButtonSpan = styled(UserNameSpan)`
    font-weight: ${blockButtonFontWeight};
`;

const redIconAndTextMixin = css`
    ${BlockIconBlack} {
        display: none;
    }
    ${BlockIconRed} {
        display: block;
    }
    ${BlockButtonSpan} {
        color: ${errorColor};
    }
`;

export const Button = styled(ClickableWrapper)<BlockButtonProps>`
    width: 125px;
    display: flex;
    visibility: hidden;
    padding: 20px 35px 10px 20px;
    justify-content: flex-start;

    ${CommentCardWrapper}:hover & {
        ${visibilityMixin}
    }

    ${({ isBlocked }) => isBlocked && visibilityMixin}

    ${BlockIconBlack} {
        display: block;
    }
    ${BlockIconRed} {
        display: none;
    }

    ${({ isBlocked }) =>
        isBlocked &&
        css`
            ${redIconAndTextMixin}
        `};

    &:hover {
        ${redIconAndTextMixin}
    }
`;

export const ShowHideRepliesButton = styled(ClickableWrapper)`
    padding: 8px 10px 0px;
    justify-content: flex-start;
`;

export interface StyledSectionProps {
    isThreadComment?: boolean;
}
export const StyledSection = styled(Section)<StyledSectionProps>`
    height: 100%;
    flex-wrap: nowrap;

    ${({ isThreadComment }) =>
        isThreadComment &&
        css`
            margin-left: ${commentInTreadMarginLeft};
            width: Calc(100% - ${commentInTreadMarginLeft});
        `}
`;
