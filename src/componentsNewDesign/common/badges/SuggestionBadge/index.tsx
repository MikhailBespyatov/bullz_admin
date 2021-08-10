import {
    badgePadding,
    badgeTextFontWeight,
    suggestionObj,
    titlePadding
} from 'componentsNewDesign/common/badges/SuggestionBadge/constants';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey13 } from 'constants/styles/colors';
import React from 'react';
import { UserLevel } from 'types/data';

interface SuggestionProps extends UserLevel {
    text: string;
}

export const SuggestionBadge = ({ text, level }: SuggestionProps) => (
    <ContentWrapper backgroundColor={suggestionObj[level].backgroundColor} padding={badgePadding} width="100%">
        <Column width="100%">
            <ContentText
                uppercase
                color={grey13}
                fontSize="10px"
                fontWeight={badgeTextFontWeight}
                padding={titlePadding}
            >
                Suggestion
            </ContentText>
            <ContentText color={suggestionObj[level].color} fontSize="13px" fontWeight={badgeTextFontWeight}>
                {text}
            </ContentText>
        </Column>
    </ContentWrapper>
);
