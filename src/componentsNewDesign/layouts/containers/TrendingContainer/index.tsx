import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { Title } from 'componentsNewDesign/layouts/containers/TrendingContainer/styles';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { filterMargin } from 'constants/styles/sizes';
import React, { FC } from 'react';
import { StrictTitle, TotalRecords } from 'types/data';

interface Props extends TotalRecords, Pick<StrictTitle, 'title'> {
    features?: JSX.Element;
}

export const TrendingContainer: FC<Props> = ({ children, title, totalRecords, features }) => (
    <ContentWrapper marginBottom="8px" padding="8px 17px">
        <Section justifyBetween marginBottom="13px" marginRight={filterMargin}>
            <Row alignCenter>
                <Column marginRight="16px">
                    <Title>{title}</Title>
                </Column>
                <Column marginRight="16px">
                    <TotalBadge quantity={totalRecords} />
                </Column>
            </Row>
            <Row>{features}</Row>
        </Section>
        <Section>{children}</Section>
    </ContentWrapper>
);
