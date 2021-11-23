import commentsIcon from 'assets/icons/comments_white_icon.svg';
import sharesIcon from 'assets/icons/shares_white_icon.svg';
import viewsIcon from 'assets/icons/views_white_icon.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { black, grey, white } from 'constants/styles/colors';
import React from 'react';

export const viewsIconDiameter = '16px';

export const graphicBlocks = [
    {
        selectedBackgroundColor: '#EAB90E',
        title: 'Videos',
        subtitle: 'Accepted',
        nameBlock: 'Videos Accepted',
        statisticKey: 'videoCount',
        calculatedTitle: 'Accepted videos'
    },
    {
        selectedBackgroundColor: '#CF4F4F',
        title: 'Videos',
        subtitle: 'Rejected',
        nameBlock: 'Videos Rejected',
        statisticKey: 'rejectedVideoCount',
        calculatedTitle: 'Rejected videos'
    },
    {
        selectedBackgroundColor: '#FF8743',
        title: 'Upload',
        subtitle: 'Error',
        nameBlock: 'Upload Error',
        statisticKey: 'unProcessedVideoCount',
        calculatedTitle: 'Upload Errors'
    },
    {
        selectedBackgroundColor: '#FF53A5',
        title: 'Phone Numbers',
        nameBlock: 'Phone Numbers',
        statisticKey: 'phoneVerifiedUserCount',
        calculatedTitle: 'Phone Numbers'
    },
    {
        selectedBackgroundColor: '#B360DB',
        title: 'Comments',
        nameBlock: 'Comments',
        icon: () => <CustomImg alt="shares" height="14px" src={commentsIcon} width="14px" />,
        statisticKey: 'commentCount',
        calculatedTitle: 'Comments'
    },
    {
        selectedBackgroundColor: '#3A89FF',
        title: 'Views',
        nameBlock: 'Views',
        icon: () => <CustomImg alt="shares" height={viewsIconDiameter} src={viewsIcon} width={viewsIconDiameter} />,
        statisticKey: 'viewCount',
        calculatedTitle: 'Views'
    },
    {
        selectedBackgroundColor: '#19DACE',
        title: 'Shares',
        nameBlock: 'Shares',
        icon: () => <CustomImg alt="shares" height="12px" src={sharesIcon} width="16px" />,
        statisticKey: 'shareCount',
        calculatedTitle: 'Shares'
    }
];

// const labelBackground = 'black';
// const primaryColorText = labelBackground;

export const areaCommonStyle = { origin: 'start', shadowColor: 'rgba(0, 0, 0, 0.1)', shadowBlur: 3, opacity: 0.1 };

interface seriesDataProps {
    data: number[];
    name: string;
    color: string;
}

export const getSeriesData = ({ data, name, color }: seriesDataProps) => ({
    name,
    type: 'line',
    smooth: true,
    // stack: 'Buy',
    symbolSize: 20,
    label: {
        show: true,
        // formatter: ({ dataIndex, value }: any) => value + '\n\n' + (dataIndex + 1),
        position: 'top',
        // distance: -20,
        color,
        fontSize: 15,
        lineHeight: 15,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    itemStyle: {
        color,
        borderWidth: 2
    },
    lineStyle: {
        color
    },
    data
});

export const getSeries = (activityStatistics: BULLZ.MarketingStatistics[]) =>
    graphicBlocks.map(({ statisticKey, nameBlock, selectedBackgroundColor }) =>
        getSeriesData({
            /* TODO: adding type because need typing statisticKey as key for statistic */
            //@ts-ignore
            data: activityStatistics?.map(statistic => statistic[statisticKey]) as number[],
            name: nameBlock,
            color: selectedBackgroundColor
        })
    );

//
// export const testSeries = {
//     name: 'dashboardGraphic',
//     type: 'line',
//     smooth: true,
//     stack: 'Buy',
//     symbolSize: 10,
//     label: {
//         normal: {
//             show: true,
//             position: 'top',
//             color: 'yellow',
//             fontSize: 12,
//             lineHeight: 16
//         }
//     },
//     itemStyle: {
//         color: 'yellow',
//         borderWidth: 2
//     },
//     lineStyle: {
//         color: 'yellow'
//     },
//     // areaStyle: {
//     //     ...areaCommonStyle,
//     //     color: {
//     //         type: 'linear',
//     //         x: 0,
//     //         y: 0,
//     //         x2: 0,
//     //         y2: 1,
//     //         colorStops: [
//     //             {
//     //                 offset: 0.2,
//     //                 color: 'brown' // color at 0% position
//     //             },
//     //             {
//     //                 offset: 1,
//     //                 color: 'white' // color at 100% position
//     //             }
//     //         ]
//     //     }
//     // },
//     data: [1, 2, 3, 4, 5, 6, 7, 1]
// };

interface GraphicOptionProps {
    xAxisData?: string[];
    positionFn?: (pos: any, params: any, el: any, elRect: any, size: any) => void;
}

export const getGraphicOption = ({ xAxisData, positionFn }: GraphicOptionProps) => ({
    backgroundColor: white,
    tooltip: {
        trigger: 'axis',
        position: positionFn,
        backgroundColor: black,
        textStyle: {
            color: white
        },
        axisPointer: {
            type: 'cross',
            axis: 'x',
            lineStyle: { type: 'dashed', width: 1.5 },
            crossStyle: { type: 'dashed', width: 1.5 },
            label: {
                backgroundColor: black,
                color: white,
                precision: 0
            }
        }
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {
    //             title: 'Save as image...'
    //         }
    //     }
    // },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        borderColor: 'red'
    },
    xAxis: [
        {
            type: 'category',
            axisTick: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            boundaryGap: false,
            data: xAxisData,
            axisLabel: { show: true, color: grey }
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisTick: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            data: xAxisData,
            axisLabel: { show: true, color: grey }
        }
    ],
    animation: true,
    animationThreshold: 2000,
    animationDuration: 1000,
    animationDelay: 0,
    animationDurationUpdate: 300
});
