declare namespace YEAY {
    interface RemoveValues {
        removeValues: string[];
    }

    interface Pagination {
        pageIndex?: number;
        limit?: number;
    }

    export interface GetAffiliateLinkRequest {
        productId: string;
    }

    export interface AffiliateLinkEntryResponse {
        providerId?: string;
        utcExpires?: string;
        cultureInfo?: string;
        url?: string;
        priority?: number;
    }

    export interface GetAffiliateLinkResponse {
        productId?: string;
        utcCreated?: string;
        entries?: AffiliateLinkEntryResponse[];
    }

    export interface UserAuthorizeResponse extends YEAY.Error400BadRequest {
        token?: string;
        user?: GetUserResponse;
    }

    export interface AdminGetVideoResponse {
        isDeleted?: boolean;
    }

    export interface QueryAllVideosRequest {
        brandText?: string;
        creatorId?: string; // objectId
        facilitatorId?: string; // objectId
        isReported?: boolean;
        hasHlsStream?: boolean;
        fromCreatedDateTime?: string;
        toCreatedDateTime?: string;
        limit: number; // int32
        pageIndex: number; // int32
        returnQueryCount?: boolean;
        searchText?: string;
        sortByValidationDateAsc?: boolean;
        sort?: string;
        videoCurationState?: VideoCurationState;
        womEndedReason?: ValidationEndedReason;
        womValidationResult?: WomVideoValidationStatus;
        womValidationStage?: ValidationStage;
    }

    export interface QueryAllVideosRequestValues extends Omit<QueryAllVideosRequest, 'pageIndex', 'limit'> {}

    export interface QueryVideosByProductIdRequestValues
        extends Omit<QueryVideosByProductIdRequest, 'pageIndex', 'limit'> {}

    export interface QueryManagedProductRequestValues extends Omit<QueryManagedProductRequest, 'pageIndex', 'limit'> {}

    export interface QueryAllUsersRequestValues extends Omit<QueryAllUsersRequest, 'pageIndex', 'limit'> {}

    export interface QueryTeamsRequestValues extends Omit<QueryTeamsRequest, 'pageIndex', 'limit'> {}
    export interface QueryPlaylistVideosRequestValues
        extends Omit<QueryPlaylistVideosRequest, 'pageIndex' | 'limit'>,
            Pagination {}

    export interface QueryVideosByProductIdRequest {
        productId?: string;
        pageIndex: number;
        limit: number;
        returnQueryCount?: boolean;
    }

    export interface QueryAllUsersRequest {
        username?: string;
        /**
         * int32
         */
        limit: number; // int32
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
        /**
         * nullable1
         * Sorts the users by latest active. Null to not apply the sort.
         */
        sortByActivityAsc?: boolean;
        role?: string;
    }

    export interface UpdateAndRemoveValues {
        updateValues?: QueryAllVideosRequestValues;
        removeValues: string[];
    }

    export interface UpdateAndRemoveProductVideosValues {
        updateValues?: QueryVideosByProductIdRequestValues;
        removeValues: string[];
    }

    export interface UpdateAndRemoveProductsValues {
        updateValues?: QueryManagedProductRequestValues;
        removeValues: string[];
    }

    export interface UpdateAndRemoveUserValues {
        updateValues?: QueryAllUsersRequestValues;
        removeValues: string[];
    }

    export interface UpdateAndRemoveTeamsValues {
        updateValues?: QueryTeamsRequestValues;
        removeValues: string[];
    }

    export interface UpdateAndRemovePlaylistVideosValues extends RemoveValues {
        updateValues?: QueryPlaylistVideosRequestValues;
    }

    // export interface AdminGetUserResponse {
    //     profileImageUrl?: string;
    // }

    export interface AdminGetVideoResponse {
        profileImageUrl?: string;
    }

    export interface PutManagedProductRequest {
        id: string;
        name?: string;
        description?: string;
        brand?: string;
        color?: string;
        features?: string[];
        category?: string[];
        hashTags?: string[];
        upcCodes?: string[];
        brandImageUrl?: string;
        primaryImageId?: string;
    }

    export interface UpdateVideoRequest {
        videoCurationState?: 0 | 1 | 2 | 3;
        id: string;
        ownerId?: string;
        facilitatorId?: string;
        title?: string;
        subtitle?: string;
        primaryProductId?: string;
        secondaryProductIds?: string[];
        audioLanguages?: string[];
        hashTags?: string[];
        isDeleted?: boolean;
        isPublic?: boolean;
        isDisabled?: boolean;
    }
    export interface GetPostResponse {
        repliesCount?: number;
    }

    export interface AdminQueryPostsRequestWithoutPageLimit extends Partial<AdminQueryPostsRequest> {}

    export interface MarketingStatistics
        extends YEAY.MarketingStatisticsResponse,
            YEAY.CreateMarketingStatisticsRequest {}

    export interface EngagementsParameters {
        maxViews: number;
        minViews: number;
        spreadViews: number;
        maxComments: number;
        minComments: number;
        spreadComments: number;
        maxShares: number;
        minShares: number;
        spreadShares: number;
    }
    export interface EngagementsOnContent {
        all: EngagementsParameters;
        public: EngagementsParameters;
        private: EngagementsParameters;
    }

    export interface SpreadParameters {
        views: number;
        comments: number;
        shares: number;
    }

    export interface MaxSpreadParameters {
        views: SpreadParameters;
        comments: SpreadParameters;
        shares: SpreadParameters;
    }

    export type LevelType = 'low' | 'medium' | 'high';

    export interface UserReport {
        userId: string;
        email?: string;
        phone?: string;
        locale?: string | null;
        location?: string;
        isTrusted?: boolean;
        isBlocked?: boolean;
        createdAt?: string;
        updatedAt?: string;
        lastSeenAt?: string;
        totalVideos: number;
        liveVideos: number;
        deletedVideos: number;
        engagements: EngagementsOnContent;
        spread: MaxSpreadParameters;
        userLevel: LevelType;
    }
}
