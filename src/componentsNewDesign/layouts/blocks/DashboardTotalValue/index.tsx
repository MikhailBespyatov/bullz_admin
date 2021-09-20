import { graphicBlocks } from 'componentsNewDesign/common/graphicComponents/DashboardGraphic/constants';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { Column, FlexGrow, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { format, isSameYear } from 'date-fns';
import { useStore } from 'effector-react';
import React from 'react';
import { statisticsEffects } from 'stores/statistics';
import { ActivityStatistics, Title } from 'types/data';
import { dashboardTotalValueHeight } from './constants';
import { DashboardValueContentWrapper, TitleValue, Value } from './styles';

interface DashboardValueProps extends Pick<Title, 'title'> {
    type?: 'row' | 'column';
    value?: string | number;
}

const DashboardValue = ({ type = 'row', title, value }: DashboardValueProps) =>
    type === 'row' ? (
        <Row alignCenter>
            <MarginWrapper marginRight="8px">
                <TitleValue>{title}</TitleValue>
            </MarginWrapper>
            <MarginWrapper>
                <Value>{value}</Value>
            </MarginWrapper>
        </Row>
    ) : (
        <Column>
            <MarginWrapper marginBottom="8px">
                <TitleValue>{title}</TitleValue>
            </MarginWrapper>
            <Value>{value}</Value>
        </Column>
    );

interface TotalValueRangeProps {
    dateFrom: Date;
    dateTo: Date;
}

const TotalValueRange = ({ dateFrom, dateTo }: TotalValueRangeProps) => {
    const isRangeSameYear = isSameYear(dateFrom, dateTo);
    return (
        <Value>{`${format(dateFrom, `MMM d ${!isRangeSameYear ? ', yyyy' : ''}`)} - ${format(
            dateTo,
            'MMM d, yyyy'
        )}`}</Value>
    );
};

interface DashboardTotalValueProps extends ActivityStatistics {}

export const DashboardTotalValue = ({ activityStatistics }: DashboardTotalValueProps) => {
    const dateFromValue =
        activityStatistics && activityStatistics[0] ? activityStatistics[0].utcStart : new Date().toISOString();
    const dateToValue =
        activityStatistics && activityStatistics[activityStatistics.length - 1]
            ? activityStatistics[activityStatistics.length - 1].utcEnd
            : new Date().toISOString();

    const calculatedActivityStatistics =
        activityStatistics && activityStatistics[0]
            ? Object.keys(activityStatistics[0]).reduce((ret, key) => {
                  // @ts-ignore TODO: Adding type
                  ret[key] = activityStatistics.map(el => el[key]);
                  return ret;
              }, {})
            : undefined;

    const loading = useStore(statisticsEffects.getActivityStatistics.pending);

    return (
        <Section>
            <Column width="100%">
                <DashboardValueContentWrapper
                    borderRadius="8px"
                    minHeight={dashboardTotalValueHeight}
                    padding="12px 21px"
                    width="100%"
                >
                    {loading ? (
                        <FlexGrow alignCenter justifyCenter>
                            <Loader size="large" />
                        </FlexGrow>
                    ) : (
                        <>
                            <Row alignCenter marginBottom="14px">
                                <MarginWrapper marginRight="16px">
                                    <Span fontSize="15px" fontWeight="bold" lineHeight="18px">
                                        Total Value
                                    </Span>
                                </MarginWrapper>
                                <Row>
                                    <TotalValueRange
                                        dateFrom={new Date(dateFromValue || '')}
                                        dateTo={new Date(dateToValue || '')}
                                    />
                                </Row>
                                {/*<MarginWrapper marginRight="34px">*/}
                                {/*    <DashboardValue title="From" value={getDateFromString(dateFromValue)} />*/}
                                {/*</MarginWrapper>*/}
                                {/*<DashboardValue title="To" value={getDateFromString(dateToValue)} />*/}
                            </Row>
                            <Section alignCenter>
                                {calculatedActivityStatistics &&
                                    graphicBlocks.map(({ statisticKey, calculatedTitle }) => (
                                        <MarginWrapper key={calculatedTitle} marginBottom="10px" marginRight="37px">
                                            <DashboardValue
                                                title={calculatedTitle}
                                                type="column"
                                                // @ts-ignore TODO: Adding type
                                                value={(calculatedActivityStatistics[statisticKey] as number[]).reduce(
                                                    (previous, current) => current + previous,
                                                    0
                                                )}
                                            />
                                        </MarginWrapper>
                                    ))}
                            </Section>
                        </>
                    )}
                </DashboardValueContentWrapper>
            </Column>
        </Section>
    );
};
