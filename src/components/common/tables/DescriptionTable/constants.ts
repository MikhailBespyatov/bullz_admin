export const columns = [
    {
        title: 'Field',
        dataIndex: 'field',
        key: 'field',
        ellipsis: {
            showTitle: false
        }
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action'
        // ,render: (actions?: JSX.Element) => actions
    }
];

export const affiliateLinksColumns = [
    // {
    //     title: 'Provider id',
    //     dataIndex: 'providerId',
    //     key: 'providerId',
    //     ellipsis: {
    //         showTitle: false
    //     }
    // },
    // {
    //     title: 'Expires at',
    //     dataIndex: 'utcExpires',
    //     key: 'utcExpires'
    // },
    {
        title: 'Locale',
        dataIndex: 'cultureInfo',
        key: 'cultureInfo',
        ellipsis: {
            showTitle: false
        }
    },
    {
        title: 'Url',
        dataIndex: 'url',
        key: 'url'
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action'
    }
];

export const defaultAffiliateLinkColumns = [
    // {
    //     title: 'Provider id',
    //     dataIndex: 'providerId',
    //     key: 'providerId',
    //     ellipsis: {
    //         showTitle: false
    //     }
    // },
    // {
    //     title: 'Expires at',
    //     dataIndex: 'utcExpires',
    //     key: 'utcExpires'
    // },
    {
        title: 'Locale',
        dataIndex: 'cultureInfo',
        key: 'cultureInfo',
        ellipsis: {
            showTitle: false
        }
    },
    {
        title: 'Default affiliate link',
        dataIndex: 'url',
        key: 'url'
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action'
    }
];

export const statisticsTableColumns = [
    {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
        width: 3
    },
    {
        title: 'Video ID',
        dataIndex: 'videoId',
        key: 'videoId',
        width: 3
    },
    {
        title: 'View',
        dataIndex: 'viewCount',
        key: 'viewCount',
        width: 1
    },
    {
        title: 'Total',
        dataIndex: 'totalCount',
        key: 'totalCount',
        width: 1
    },
    {
        title: 'Comments',
        dataIndex: 'commentsCount',
        key: 'commentsCount',
        width: 1
    },

    {
        title: 'Like',
        dataIndex: 'likeCount',
        key: 'likeCount',
        width: 1
    },
    {
        title: 'Save',
        dataIndex: 'saveCount',
        key: 'saveCount',
        width: 1
    },
    {
        title: 'Share',
        dataIndex: 'shareCount',
        key: 'shareCount',
        width: 1
    },
    {
        title: 'Click',
        dataIndex: 'clickCount',
        key: 'clickCount',
        width: 1
    }
];
