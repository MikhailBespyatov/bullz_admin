import { ArrowImg } from 'componentsNewDesign/common/imgComponents/ArrowImg';
import { ItemWrapper } from 'componentsNewDesign/common/inputs/BackArrowTitle/styles';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import React from 'react';

export interface BackArrowTitleProps {
    onClick: (value: string) => void;
    value: string;
}

export const BackArrowTitle = ({ value, onClick }: BackArrowTitleProps) => (
    <ItemWrapper onClick={() => onClick(value)}>
        <ArrowImg alt="Back Icon" height="20px" rotate={90} width="10px" />

        <ContentText /*fontSize="11px"*/ fontWeight="700" padding="0 7px">
            {value}
        </ContentText>
    </ItemWrapper>
);
