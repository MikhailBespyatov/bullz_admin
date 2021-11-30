import { useMediaQuery } from '@material-ui/core';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { Title } from 'componentsNewDesign/layouts/containers/TrendingContainer/styles';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey29 } from 'constants/styles/colors';
import { filterMargin, xs } from 'constants/styles/sizes';
import React, { FC } from 'react';
import { StrictTitle, TotalRecords } from 'types/data';

interface Props extends TotalRecords, Pick<StrictTitle, 'title'> {
    features?: JSX.Element;
    isTags?: boolean;
}

export const TrendingContainer: FC<Props> = ({ children, title, totalRecords, features, isTags }) => {
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    return (
        <ContentWrapper backgroundColor={grey29} marginBottom="8px" padding={isMobile ? '16px' : '8px 17px'}>
            <Section justifyBetween marginBottom="13px" marginRight={isMobile ? '0' : filterMargin}>
                <Row alignCenter marginBottom={isMobile && isTags ? '22px' : '0'}>
                    <Column marginRight="16px">
                        <Title>{title}</Title>
                    </Column>
                    <Column marginRight="16px">
                        <TotalBadge quantity={totalRecords} />
                    </Column>
                </Row>
                <Row width={isMobile ? (isTags ? '100%' : 'max-content') : 'fit-content'}>{features}</Row>
            </Section>
            <Section justifyAround={isMobile}>{children}</Section>
        </ContentWrapper>
    );
};
