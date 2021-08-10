import { defaultLimit, defaultPage } from './filterSettings';

export const defaultCommentsValues: YEAY.AdminQueryPostsRequest = {
    isReported: false,
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};

export const defaultVideoCommentsValues: YEAY.QueryPostsRequest = {
    videoId: '',
    pageIndex: defaultPage,
    limit: /*5*/ defaultLimit,
    returnQueryCount: true
};

export const defaultVideoCommentRepliesValues: YEAY.QueryRepliesRequest = {
    postId: '',
    pageIndex: defaultPage,
    limit: /*2*/ defaultLimit,
    returnQueryCount: true
};
