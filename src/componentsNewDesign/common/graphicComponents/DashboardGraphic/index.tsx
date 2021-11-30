import { GraphicInfoBlock } from 'componentsNewDesign/layouts/blocks/GraphicInfoBlock';
import { graphicInfoBlockHeight } from 'componentsNewDesign/layouts/blocks/GraphicInfoBlock/constants';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityStatistics } from 'types/data';
import { getDateFromString, toggleValueToArray } from 'utils/usefulFunctions';
import { getGraphicOption, getSeries, graphicBlocks } from './constants';
import { GraphicWrapper } from './styles';

interface DashboardGraphiProps extends ActivityStatistics {
    onClick: (activeIndexActivityStatistics: number, activeIndexStatistic: number) => void;
}

export const DashboardGraphic = ({ activityStatistics = [], onClick }: DashboardGraphiProps) => {
    const [selectedBlocks, setSelectedBlocks] = useState<string[]>(['Phone Numbers']);
    const [series, setSeries] = useState<ReturnType<typeof getSeries>>([]);
    const graphSeries = useMemo(() => series.filter(({ name }) => selectedBlocks.some(block => block === name)), [
        series,
        selectedBlocks
    ]);

    const graphicOption = useMemo(
        () =>
            getGraphicOption({
                xAxisData: activityStatistics?.map(
                    ({ utcEnd, utcStart }) => getDateFromString(utcStart) + ' - ' + getDateFromString(utcEnd)
                )
            }),
        [activityStatistics]
    );

    const [option, setOption] = useState({
        series: graphSeries,
        ...graphicOption
    });

    useEffect(() => {
        setOption({
            series: graphSeries,
            ...graphicOption,
            backgroundColor: '#2C2E3A'
        });
    }, [graphSeries, graphicOption, selectedBlocks, activityStatistics]);

    const changeSelectedBlocks = (nameBlock: string) =>
        setSelectedBlocks(block => toggleValueToArray(block, nameBlock));

    useEffect(() => {
        setSeries(getSeries(activityStatistics));
    }, [activityStatistics, selectedBlocks]);

    const onEvents = {
        /* Any because lib echarts-for-react has bad typing */
        mouseover: ({ seriesName, dataIndex }: any) => {
            onClick(
                dataIndex,
                graphicBlocks.findIndex(({ nameBlock }) => nameBlock === seriesName)
            );
        }
    };

    return (
        <GraphicWrapper noWrap marginBottom="16px">
            <Column>
                {graphicBlocks.map(({ nameBlock, selectedBackgroundColor, subtitle, title, icon = () => null }) => {
                    const isSelected = selectedBlocks.some(block => block === nameBlock);
                    const background = isSelected ? selectedBackgroundColor : '#2C2E3A';

                    return (
                        <GraphicInfoBlock
                            key={nameBlock}
                            background={background}
                            icon={icon()}
                            isSelected={isSelected}
                            subtitle={subtitle}
                            title={title}
                            onClick={() => changeSelectedBlocks(nameBlock)}
                        />
                    );
                })}
            </Column>
            <ReactEcharts
                /* For rerender ReactEcharts component when option have been changed. If do not rerender after changing option - graphs hold stay */
                // key={selectedBlocks.length.toString()}
                option={option}
                style={{
                    height: parseInt(graphicInfoBlockHeight) * graphicBlocks.length,
                    width: '100%'
                }}
                onEvents={onEvents}
            />
        </GraphicWrapper>
    );
};

export const DashboardGraphicMemo = React.memo(DashboardGraphic, (prevProps, nextProps) =>
    _.isEqual(prevProps.activityStatistics, nextProps.activityStatistics)
);
