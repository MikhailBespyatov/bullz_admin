export const chartFieldsOption = [
    { name: 'View', filteredValue: 12 },
    { name: 'Total', filteredValue: 12 },
    { name: 'Comment', filteredValue: 18 },
    { name: 'Like', filteredValue: 12 },
    { name: 'Save', filteredValue: 18 },
    { name: 'Share', filteredValue: 18 },
    { name: 'Click', filteredValue: 18 }
];

export const totalRatioRange = { lower: 0.8, upper: 1.2 };

export const defaultTotalRatioData: { [key in keyof YEAY.VideoStatisticsResponse]: number } = {
    viewCount: 0,
    commentsCount: 0,
    likeCount: 0,
    saveCount: 0,
    shareCount: 0,
    clickCount: 0
};

export const defaultVideoStatisticsData: { [key in keyof YEAY.VideoStatisticsResponse]: number } = {
    viewCount: 0,
    totalCount: 0,
    commentsCount: 0,
    likeCount: 0,
    saveCount: 0,
    shareCount: 0,
    clickCount: 0
};

export const chartsStyle = { height: '500px', width: '100%' };

/* Any - because eCharts don't have types for arguments */
const formaterForValue = ({ value }: any) => (value === 0 ? '' : value.toFixed(2));

interface XAxisData {
    xAxisData?: Array<string | number>;
}

export interface TotalRatioProps extends XAxisData {
    data: number[];
}

export const getTotalRatioOption = ({ xAxisData, data }: TotalRatioProps) => ({
    title: { text: 'Total Ratio' },
    xAxis: {
        type: 'category',
        data: xAxisData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type: 'bar',
            data,
            label: {
                show: true,
                formatter: formaterForValue
            }
        },
        { type: 'line', data: data.map(_ => 1) }
    ]
});

export interface VideoStatisticsProps extends XAxisData {
    series: Array<{ name: string; data: Array<string | number> }>;
    legendData?: string[];
}

export const getVideoStatisticsOption = ({ series, legendData }: VideoStatisticsProps) => ({
    title: {
        text: 'Video statistics'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        },
        /* Any - because eCharts don't have types for arguments */
        formatter: (params: any) =>
            params
                .filter(({ value }: any) => value > 0)
                .map(({ value, marker, seriesName }: any) => marker + seriesName + ': ' + value.toFixed(2))
                .join('<br/>')
    },
    legend: {
        data: legendData,
        show: false
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: chartFieldsOption.map(({ name }) => name)
    },
    series: series.map(({ name, data }) => ({
        name,
        type: 'bar',
        stack: 'videoBarStatistics',
        label: {
            show: true,
            formatter: formaterForValue
        },
        emphasis: {
            focus: 'series'
        },
        data
    }))
});

// const getOption = ({ xAxisData, series }: VideoChartData) => ({
//     title: {
//         text: 'Video statistics'
//     },
//     tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//             type: 'cross',
//             label: {
//                 backgroundColor: '#6a7985'
//             }
//         }
//     },
//     legend: {
//         data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
//     },
//     toolbox: {
//         feature: {
//             saveAsImage: {}
//         }
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     xAxis: [
//         {
//             type: 'category',
//             boundaryGap: false,
//             data: xAxisData
//         }
//     ],
//     yAxis: [
//         {
//             type: 'value'
//         }
//     ],
//     series: series.map(({ name, data }) => ({
//         name,
//         type: 'line',
//         stack: 'videoStatistics',
//         areaStyle: {},
//         data
//     }))
// });
