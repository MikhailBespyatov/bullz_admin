import commentsIcon from 'assets/icons/comments_black_icon.svg';
import viewsIcon from 'assets/icons/views_black_icon.svg';
import sharesIcon from 'assets/icons/shares_black_icon.svg';
import selectedCommentsIcon from 'assets/icons/comments_white_icon.svg';
import selectedViewsIcon from 'assets/icons/views_white_icon.svg';
import selectedSharesIcon from 'assets/icons/shares_white_icon.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';

export const viewsIconDiameter = '16px';

export const graphicBlocks = [
    {
        selectedBackgroundColor: '#FF886D',
        title: 'Users',
        nameBlock: 'Users Email Not Verified',
        subtitle: 'Email Not Verified',
        statisticKey: 'notVerifiedUserCount',
        calculatedTitle: 'Not verified users'
    },
    {
        selectedBackgroundColor: '#3CBA10',
        title: 'Users',
        nameBlock: 'Users Email Verified',
        subtitle: 'Email Verified',
        statisticKey: 'verifiedUserCount',
        calculatedTitle: 'Verified users'
    },
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
        selectedBackgroundColor: '#B360DB',
        title: 'Comments',
        nameBlock: 'Comments',
        icon: (selected: boolean) => (
            <CustomImg alt="shares" height="14px" src={selected ? selectedCommentsIcon : commentsIcon} width="14px" />
        ),
        statisticKey: 'commentCount',
        calculatedTitle: 'Comments'
    },
    {
        selectedBackgroundColor: '#3A89FF',
        title: 'Views',
        nameBlock: 'Views',
        icon: (selected: boolean) => (
            <CustomImg
                alt="shares"
                height={viewsIconDiameter}
                src={selected ? selectedViewsIcon : viewsIcon}
                width={viewsIconDiameter}
            />
        ),
        statisticKey: 'viewCount',
        calculatedTitle: 'Views'
    },
    {
        selectedBackgroundColor: '#19DACE',
        title: 'Shares',
        nameBlock: 'Shares',
        icon: (selected: boolean) => (
            <CustomImg alt="shares" height="12px" src={selected ? selectedSharesIcon : sharesIcon} width="16px" />
        ),
        statisticKey: 'shareCount',
        calculatedTitle: 'Shares'
    }
];

const graphicTextColor = 'black';
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

export const getSeries = (activityStatistics: YEAY.MarketingStatistics[]) =>
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
    // positionFn?: (pos: any, params: any, el: any, elRect: any, size: any) => void;
}

export const getGraphicOption = ({ xAxisData }: GraphicOptionProps) => ({
    backgroundColor: '#FBFBFB',
    textStyle: { color: graphicTextColor },
    tooltip: {
        trigger: 'axis',
        // position: positionFn,
        backgroundColor: 'white',
        textStyle: {
            color: 'black'
        },
        axisPointer: {
            type: 'cross',
            axis: 'x',
            lineStyle: { type: 'dashed', width: 1.5 },
            crossStyle: { type: 'dashed', width: 1.5 },
            label: {
                backgroundColor: 'transparent',
                color: 'black',
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
                show: false,
                lineStyle: {
                    type: 'dashed'
                }
            },
            // boundaryGap: false,
            data: xAxisData
            // axisLabel: { show: false, color: 'grey' }
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
                show: false,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: { show: false, color: 'grey' }
        }
    ]
});
