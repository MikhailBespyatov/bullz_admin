import { SaveCSVButton } from 'componentsNewDesign/common/buttons/SaveCSVButton';
import { DashboardGraphicMemo } from 'componentsNewDesign/common/graphicComponents/DashboardGraphic';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { DashboardAddButtonBlock, DashboardBlock } from 'componentsNewDesign/layouts/blocks/DashboardBlock';
import { DashboardBlockGrid } from 'componentsNewDesign/layouts/blocks/DashboardBlock/styles';
import { DashboardLayout } from 'componentsNewDesign/layouts/blocks/DashboardLayout';
import { DashboardTotalValue } from 'componentsNewDesign/layouts/blocks/DashboardTotalValue';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { noop } from 'constants/functions';
import format from 'date-fns/format';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import { csvFilename, dateFormatInCSV, defaultDateRangeRequest, headerForCSVTable } from 'pages/Dashboard/constants';
import React, { useEffect, useState } from 'react';
import { statisticsEffects, statisticsEvents, statisticsStores } from 'stores/statistics';

const { reloadStatistics, getActivityStatistics } = statisticsEffects;
const { clearStatistics, removeActivityStatistics, setCountStatistics } = statisticsEvents;

interface DashboardQueryParams extends BULLZ.CreateMarketingStatisticsRequest {
    countStatistics?: number;
}

export const Dashboard = () => {
    const activityStatistics = useStore(statisticsStores.activityStatistics);
    const csvData = activityStatistics.map(({ utcEnd, utcStart, ...rest }) => ({
        utcEnd: format(new Date(utcEnd || ''), dateFormatInCSV),
        utcStart: format(new Date(utcStart || ''), dateFormatInCSV),
        ...rest
    }));
    const countStatistics = useStore(statisticsStores.countStatistics);
    const loading = useStore(statisticsEffects.getActivityStatistics.pending);
    const [[dateFrom, dateTo], setSelectedDateRange] = useState(defaultDateRangeRequest);

    const updateQueryValues = ({ countStatistics, utcStart, utcEnd }: DashboardQueryParams) => {
        countStatistics && setCountStatistics(countStatistics);
        utcStart && utcEnd && setSelectedDateRange([utcStart, utcEnd]);
        utcStart && utcEnd && countStatistics && reloadStatistics({ utcStart, utcEnd });
    };

    const [nextDateFrom, nextDateTo] = useStore(statisticsStores.nextDateRange);
    const [activeIndexActivityStatistics, setActiveIndexActivityStatistics] = useState<number>();
    const [activeIndexStatistic, setActiveIndexStatistic] = useState<number>();

    const [
        { utcEnd, utcStart, countStatistics: queryParamsCountStatistics },
        setQueryParams
    ] = useQueryParams<DashboardQueryParams>(updateQueryValues);

    const onGraphicClick = (activeIndexActivityStatistics: number, activeIndexStatistic: number) => {
        setActiveIndexActivityStatistics(activeIndexActivityStatistics);
        setActiveIndexStatistic(() => activeIndexStatistic);
    };

    const onChange = ([newUtcStart, newUtcEnd]: [string, string]) => {
        setSelectedDateRange([newUtcStart, newUtcEnd]);
        if (newUtcEnd !== dateTo || newUtcStart !== dateFrom) {
            reloadStatistics({
                utcStart: newUtcStart,
                utcEnd: newUtcEnd
            });
        }
    };

    const onRemoveClick = (i: number) => removeActivityStatistics(i);

    const onGetActivityStatisticsClick = async () => {
        await getActivityStatistics({ utcStart: nextDateFrom, utcEnd: nextDateTo });
    };

    useEffect(() => {
        if (!queryParamsCountStatistics && !utcEnd && !utcStart)
            getActivityStatistics({ utcStart: dateFrom, utcEnd: dateTo });
        return () => clearStatistics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setQueryParams({ countStatistics, utcEnd: dateTo, utcStart: dateFrom });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateFrom, dateTo, countStatistics]);

    return (
        <MainLayout>
            <DashboardLayout>
                <Section alignCenter justifyBetween marginBottom="12px">
                    <Span fontSize="18px" fontWeight="bold" lineHeight="21px">
                        Dashboard
                    </Span>
                    <SaveCSVButton
                        data={csvData}
                        disabled={loading}
                        filename={csvFilename()}
                        headers={headerForCSVTable}
                    >
                        {loading ? (
                            <Section alignCenter justifyCenter>
                                <Loader />
                            </Section>
                        ) : (
                            'Save as CSV'
                        )}
                    </SaveCSVButton>
                </Section>
                <MarginWrapper marginBottom="12px">
                    <DashboardTotalValue activityStatistics={activityStatistics} />
                </MarginWrapper>
                <DashboardGraphicMemo activityStatistics={activityStatistics} onClick={onGraphicClick} />
                <DashboardBlockGrid>
                    {activityStatistics[0] && (
                        <DashboardBlock
                            active={activeIndexActivityStatistics === 0}
                            activeIndexStatistic={activeIndexStatistic}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            order={1}
                            {...activityStatistics[0]}
                            onChange={onChange}
                        />
                    )}
                    {activityStatistics
                        .filter((_, i) => i !== 0)
                        .map(
                            ({ utcEnd, utcStart, ...statistics }, i) =>
                                utcStart &&
                                utcEnd && (
                                    <DashboardBlock
                                        {...statistics}
                                        key={i.toString()}
                                        disabled
                                        active={activeIndexActivityStatistics === i + 1}
                                        activeIndexStatistic={activeIndexStatistic}
                                        dateFrom={utcStart}
                                        dateTo={utcEnd}
                                        order={i + 2}
                                        onChange={noop}
                                        onRemove={() => onRemoveClick(i + 1)}
                                    />
                                )
                        )}
                    <DashboardAddButtonBlock
                        dateFrom={nextDateFrom}
                        dateTo={nextDateTo}
                        loading={loading}
                        order={activityStatistics.length + 1}
                        onClick={onGetActivityStatisticsClick}
                    />
                </DashboardBlockGrid>
            </DashboardLayout>
        </MainLayout>
    );
};
