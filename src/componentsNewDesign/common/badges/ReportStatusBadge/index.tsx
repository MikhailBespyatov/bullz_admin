import { suggestionObj } from 'componentsNewDesign/common/badges/SuggestionBadge/constants';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import React from 'react';
import { Title, UserLevel } from 'types/data';
import { ColoredDot, ReportTitle } from './styles';

interface ReportStatusBadgeProps extends Pick<Title, 'title'>, Partial<UserLevel> {}

export const ReportStatusBadge = ({ level, title }: ReportStatusBadgeProps) => (
    <Row alignCenter noWrap>
        <MarginWrapper marginRight="17px">
            <ReportTitle color={level && suggestionObj[level].color}>{title}</ReportTitle>
        </MarginWrapper>
        <ColoredDot backgroundColor={level && suggestionObj[level].color} />
    </Row>
);
