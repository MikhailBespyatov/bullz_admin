import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import _ from 'lodash';
import {
    chartFieldsOption,
    chartsStyle,
    defaultTotalRatioData,
    defaultVideoStatisticsData,
    getTotalRatioOption,
    getVideoStatisticsOption,
    TotalRatioProps,
    totalRatioRange,
    VideoStatisticsProps
} from 'components/common/charts/VideoStatisticsChart/constants';

interface VideoStatisticsChartProps extends YEAY.QueryVideoStatisticsResponse {
    onFilter: (userId: string) => void;
}

export const VideoStatisticsChart = ({ items = [], onFilter }: VideoStatisticsChartProps) => {
    // console.log('items', items);

    // const userData =
    //     items?.length > 0
    //         ? items.map(
    //               ({
    //                   viewCount = 0,
    //                   totalCount = 0,
    //                   commentsCount = 0,
    //                   likeCount = 0,
    //                   saveCount = 0,
    //                   shareCount = 0,
    //                   clickCount = 0
    //               }) => {
    //                   const sum =
    //                       viewCount + totalCount + commentsCount + likeCount + saveCount + shareCount + clickCount;
    //
    //                   const getPercent = (value: number) => (value * 100) / sum;
    //
    //                   const viewCountPercent = getPercent(viewCount);
    //                   const totalCountPercent = getPercent(totalCount);
    //                   const commentsCountPercent = getPercent(commentsCount);
    //                   const likeCountPercent = getPercent(likeCount);
    //                   const saveCountPercent = getPercent(saveCount);
    //                   const shareCountPercent = getPercent(shareCount);
    //                   const clickCountPercent = getPercent(clickCount);
    //
    //                   // return [
    //                   //     viewCountPercent,
    //                   //     viewCountPercent + totalCountPercent,
    //                   //     viewCountPercent + totalCountPercent + commentsCountPercent,
    //                   //     viewCountPercent + totalCountPercent + commentsCountPercent + likeCountPercent,
    //                   //     viewCountPercent + totalCountPercent + commentsCountPercent + likeCountPercent + saveCountPercent,
    //                   //     viewCountPercent +
    //                   //         totalCountPercent +
    //                   //         commentsCountPercent +
    //                   //         likeCountPercent +
    //                   //         saveCountPercent +
    //                   //         shareCountPercent,
    //                   //     viewCountPercent +
    //                   //         totalCountPercent +
    //                   //         commentsCountPercent +
    //                   //         likeCountPercent +
    //                   //         saveCountPercent +
    //                   //         shareCountPercent +
    //                   //         clickCountPercent
    //                   // ];
    //
    //                   // console.log([
    //                   //     viewCountPercent,
    //                   //     totalCountPercent,
    //                   //     commentsCountPercent,
    //                   //     likeCountPercent,
    //                   //     saveCountPercent,
    //                   //     shareCountPercent,
    //                   //     clickCountPercent
    //                   // ]);
    //                   return [
    //                       viewCountPercent,
    //                       totalCountPercent,
    //                       commentsCountPercent,
    //                       likeCountPercent,
    //                       saveCountPercent,
    //                       shareCountPercent,
    //                       clickCountPercent
    //                   ];
    //               }
    //           )
    //         : [[0, 0, 0, 0, 0, 0, 0]];

    // const graphData = userData[0].map((_, index) => userData.map(data => data[index]));

    // const dataCharts: VideoChartData = {
    //     xAxisData: items?.length ? items?.map((_, i) => i) : [],
    //     series: graphData.map((data, i) => ({
    //         name: nameCharts[i],
    //         data
    //     }))
    // };

    /* Bar chart */

    const rowVideoStatisticsData =
        items && items.length > 0
            ? ((Object.keys(items[0]) as Array<keyof YEAY.VideoStatisticsResponse>).reduce((currentObject, key) => {
                  // @ts-ignore TODO: Adding type
                  currentObject[key] = items.map(el => el[key]);
                  return currentObject;
              }, {}) as { [key in keyof YEAY.VideoStatisticsResponse]: string[] | number[] })
            : undefined;

    rowVideoStatisticsData &&
        (Object.keys(defaultVideoStatisticsData) as Array<keyof YEAY.VideoStatisticsResponse>).map(key => {
            const item = rowVideoStatisticsData[key] as number[];
            const sum = item.reduce((sum, nextValue) => sum + nextValue, 0);

            return { name: key, data: item.map(value => (value * 100) / sum) };
        });

    const seriesData = rowVideoStatisticsData
        ? (Object.keys(defaultVideoStatisticsData) as Array<keyof YEAY.VideoStatisticsResponse>).map(key => {
              const item = rowVideoStatisticsData[key] as number[];
              const sum = item.reduce((sum, nextValue) => sum + nextValue, 0);
              return item.map(value => {
                  const result = (value * 100) / sum;
                  return isNaN(result) ? 0 : result;
              });
          })
        : [];

    const filteredVideoStatisticsData =
        seriesData.length > 0
            ? seriesData.map((data, i) => data.map(value => (value > chartFieldsOption[i].filteredValue ? value : 0)))
            : [];

    const videoStatisticsChartData =
        filteredVideoStatisticsData.length > 0
            ? filteredVideoStatisticsData[0].map((_, index) => filteredVideoStatisticsData.map(data => data[index]))
            : [];

    // console.log(barChartsData, 'barChartsData');

    // const filteredBarChartsData =
    //     barChartsData.length > 0
    //         ? barChartsData.map(data => data.map((value, i) => (value > filteredValueCharts[i] ? value : 0)))
    //         : [];

    // console.log(barChartsData, 'filteredBarChartsData');

    const seriesVideoStatisticsData = [
        ...videoStatisticsChartData,
        filteredVideoStatisticsData.map(data =>
            data.reduce((currentValue, nextValue) => (currentValue - nextValue < 0 ? 0 : currentValue - nextValue), 100)
        )
    ];

    const series =
        seriesVideoStatisticsData.length > 0
            ? seriesVideoStatisticsData
                  .map((data, i) => ({
                      name:
                          i !== seriesVideoStatisticsData.length - 1
                              ? rowVideoStatisticsData && rowVideoStatisticsData.userId
                                  ? (rowVideoStatisticsData?.userId[i] as string)
                                  : 'Unknown user'
                              : 'Other',
                      data: data.map(value => value)
                  }))
                  .filter(({ data }) => data.some(value => value > 0))
            : [];

    // console.log(series);

    const dataVideoStatisticsChart: VideoStatisticsProps = {
        legendData: rowVideoStatisticsData && (rowVideoStatisticsData.userId as string[]),
        series: series
    };
    // console.log(dataBarCharts);

    /* Total charts */

    // console.log(items);
    const rowTotalRatioData =
        items && items.length
            ? items.map(item => {
                  const sum = Object.keys(defaultTotalRatioData).reduce(
                      (prevValue, currentValue) =>
                          prevValue + (item[currentValue as keyof YEAY.VideoStatisticsResponse] as number),
                      0
                  );
                  return { sum, totalCount: item.totalCount, userId: item.userId };
              })
            : [{ sum: 0, totalCount: 0, userId: '' }];
    // console.log(totalItems);

    const totalRatioData = rowTotalRatioData
        .map(({ sum, userId, totalCount = 0 }) => ({
            ratio: (totalCount * 100) / (sum * 100),
            userId
        }))
        .filter(({ ratio }) => ratio > totalRatioRange.upper || ratio < totalRatioRange.lower);
    // console.log(totalRatioItems);

    const dataTotalRatioBarCharts: TotalRatioProps = {
        xAxisData: totalRatioData.map(({ userId }) => userId || ''),
        data: totalRatioData.map(({ ratio }) => ratio)
    };
    // console.log(dataTotalRatioBarCharts);

    const onEvents = {
        /* Any because lib echarts-for-react has bad typing */
        click: ({ seriesName }: any) => {
            onFilter(seriesName);
        }
    };

    if (items?.length === 0) return null;

    return (
        <>
            {/*<ContentWrapper height="500px" marginBottom="30px">*/}
            {/*    <ReactEcharts*/}
            {/*        option={getOption(dataCharts)}*/}
            {/*        style={{ height: '500px', width: '100%' }}*/}
            {/*        onEvents={onEvents}*/}
            {/*    />*/}
            {/*</ContentWrapper>*/}
            {totalRatioData.length && (
                <ContentWrapper height="500px">
                    <ReactEcharts
                        option={getTotalRatioOption(dataTotalRatioBarCharts)}
                        style={chartsStyle}
                        // onEvents={onEvents}
                    />
                </ContentWrapper>
            )}
            <ContentWrapper height="500px">
                <ReactEcharts
                    option={getVideoStatisticsOption(dataVideoStatisticsChart)}
                    style={chartsStyle}
                    onEvents={onEvents}
                />
            </ContentWrapper>
        </>
    );
};

export const VideoStatisticsChartMemo = React.memo(VideoStatisticsChart, (prevProps, nextProps) =>
    _.isEqual(prevProps.items, nextProps.items)
);
