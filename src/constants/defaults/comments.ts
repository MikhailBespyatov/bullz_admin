import { defaultLimit, defaultPage } from './filterSettings';

export const defaultCommentsValues: BULLZ.AdminQueryPostsRequest = {
    isReported: false,
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};

export const defaultVideoCommentsValues: BULLZ.QueryPostsRequest = {
    videoId: '',
    pageIndex: defaultPage,
    limit: /*5*/ defaultLimit,
    returnQueryCount: true
};

export const defaultVideoCommentRepliesValues: BULLZ.QueryRepliesRequest = {
    postId: '',
    pageIndex: defaultPage,
    limit: /*2*/ defaultLimit,
    returnQueryCount: true
};
