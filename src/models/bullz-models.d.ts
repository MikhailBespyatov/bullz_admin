declare namespace BULLZ {
    /**
     * addressResponse
     */
    export interface AddressResponse {
        /**
         * string
         */
        name?: string | null;
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * string
         */
        accountType?: string | null;
        /**
         * string
         */
        address?: string | null;
        /**
         * boolean
         */
        hasTransacted?: boolean;
        /**
         * boolean
         */
        isDefault?: boolean;
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        balanceWei?: string; // string
        /**
         * decimal
         */
        balance?: number; // double
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        pendingBalanceWei?: string; // string
        /**
         * decimal
         */
        pendingBalance?: number; // double
        /**
         * dateTime
         */
        balanceQueriedAtUtc?: string; // date-time
    }
    /**
     * adminAllCountriesResponse
     */
    export interface AdminAllCountriesResponse {
        /**
         * list1
         */
        countries?: /* countryResponse */ CountryResponse[] | null;
    }
    /**
     * adminAllRegionsByCountryResponse
     */
    export interface AdminAllRegionsByCountryResponse {
        /**
         * list1
         */
        regions?: string[] | null;
    }
    /**
     * adminDeleteTeamRequest
     */
    export interface AdminDeleteTeamRequest {
        /**
         * objectId
         * The id of the team to delete
         * example:
         * 000000000000000000000000
         */
        teamId?: string; // objectId
    }
    /**
     * adminDeleteUserInfo
     */
    export interface AdminDeleteUserInfo {
        /**
         * objectId
         * The id of user to be deleted.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * list1
         * Reason to delete
         */
        reasons?: /* userDeletionReason */ UserDeletionReason /* int32 */[] | null;
        /**
         * string
         * An admin can leave the comment blank
         */
        comment?: string | null;
    }
    /**
     * adminDeleteUsersRequest
     */
    export interface AdminDeleteUsersRequest {
        /**
         * list1
         * The users to be deleted.
         */
        users?: /* adminDeleteUserInfo */ AdminDeleteUserInfo[] | null;
        /**
         * list1
         */
        userIds?: string /* objectId */[] | null;
    }
    /**
     * adminDisableUsersRequest
     */
    export interface AdminDisableUsersRequest {
        /**
         * list1
         * The users to be disabled.
         */
        users?: /* disableUserInfo */ DisableUserInfo[] | null;
    }
    /**
     * adminEnableUsersRequest
     */
    export interface AdminEnableUsersRequest {
        /**
         * list1
         * The users to be disabled.
         */
        users?: string /* objectId */[] | null;
    }
    /**
     * adminGetCountriesRequest
     */
    export interface AdminGetCountriesRequest {}
    /**
     * adminGetProductVideoResponse
     */
    export interface AdminGetProductVideoResponse {
        userInfo?: /* briefUserInfo */ BriefUserInfo;
        /**
         * objectId
         * The id of the video.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * The id of the facilitator.
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string; // objectId
        /**
         * string
         * The title of the video.
         */
        title?: string | null;
        /**
         * string
         * The brief description of the video.
         */
        subtitle?: string | null;
        /**
         * list1
         * Ids of the secondary products. Each product should be already stored in the YEAY database.
         */
        secondaryProductIds?: string /* objectId */[] | null;
        /**
         * languageInfo
         * List of languages which are spoken in this video. Empty array means that video is not language specific and can be targeted to all users.
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * objectId
         * Id of the primary product. It should reference the product which is already stored in the YEAY database.
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        /**
         * tags
         * List of video hash tags.
         */
        hashTags?: string /* string */[] | null;
        /**
         * dateTime
         * The date and time when the video was uploaded.
         */
        utcUploaded?: string; // date-time
        meta?: /* videoDetailsMeta */ VideoDetailsMeta;
        streaming?: /* videoDetailsStreaming */ VideoDetailsStreaming;
        validation?: /* videoDetailsValidation */ VideoDetailsValidation;
        engagementStatistics?: /* videoDetailsEngagementDeltas */ VideoDetailsEngagementDeltas;
        /**
         * boolean
         * True if the video can be exclusive and can not be validated.
         */
        isWithoutValidation?: boolean;
        videoTeamExclusivityInfo?: /* videoExclusivityResponse */ VideoExclusivityResponse;
        /**
         * boolean
         * Like status of video.
         */
        isLiked?: boolean;
        /**
         * boolean
         * Save status of video.
         */
        isSaved?: boolean;
        /**
         * string
         * Product link of the video
         */
        productLink?: string | null;
        /**
         * boolean
         * Product link of the video
         */
        isFollowed?: boolean;
    }
    /**
     * adminGetRegionsByCountryRequest
     */
    export interface AdminGetRegionsByCountryRequest {
        /**
         * countryInfo
         * example:
         * string
         */
        country?: string | null; // string
    }
    /**
     * adminGetUserCommon
     */
    export interface AdminGetUserCommon {
        /**
         * objectId
         * The user's team id
         * example:
         * 000000000000000000000000
         */
        teamId?: string; // objectId
        /**
         * dateTime
         * Account creation time.
         */
        utcCreated?: string; // date-time
        /**
         * dateTime
         * Last account update time.
         */
        utcUpdated?: string; // date-time
        /**
         * dateTime
         * Last account authentication time.
         */
        utcLastAuthentication?: string; // date-time
        /**
         * string
         * The name of the user.
         */
        username?: string | null;
        /**
         * string
         * URL to user's profile image.
         */
        profileImageUrl?: string | null;
        /**
         * int32
         * Count of public videos
         */
        videoCount?: number; // int32
        /**
         * boolean
         * Indicates if the user's account verified.
         */
        isAccountVerified?: boolean;
        location?: /* location */ Location;
        /**
         * boolean
         */
        isTrusted?: boolean;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string; // objectId
        /**
         * string
         */
        firstName?: string | null;
        /**
         * string
         */
        lastName?: string | null;
        /**
         * string
         */
        country?: string | null;
        gender?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */;
        /**
         * dateTime
         */
        dateOfBirth?: string; // date-time
        /**
         * string
         */
        primaryLanguage?: string | null;
        /**
         * cultureInfo
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * int32
         */
        freeStakingRemaining?: number; // int32
        /**
         * boolean
         */
        isFreeStakingEligible?: boolean;
        /**
         * roles
         */
        roles?: string /* string */[] | null;
        /**
         * boolean
         */
        isDisabled?: boolean;
        /**
         * list1
         */
        disablingInfo?: /* userDisablingInfo */ UserDisablingInfo[] | null;
        /**
         * list1
         */
        enablingInfo?: /* userEnablingInfo */ UserEnablingInfo[] | null;
    }
    /**
     * adminGetUserRequest
     */
    export interface AdminGetUserRequest {
        /**
         * objectId
         * The id of the user to be returned.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * adminGetVideoResponse
     */
    export interface AdminGetVideoResponse {
        /**
         * objectId
         * Id of the user
         * example:
         * 000000000000000000000000
         */
        ownerId?: string; // objectId
        /**
         * string
         * Name of the user
         */
        username?: string | null;
        /**
         * string
         * Link to user's profile image.
         */
        profileImageUrl?: string | null;
        /**
         * boolean
         * True if user is trusted
         */
        isTrusted?: boolean;
        /**
         * string
         * Primary product brand
         */
        primaryProductBrand?: string | null;
        /**
         * string
         * Screen grab url
         */
        thumbnailUrl?: string | null;
        preview?: /* previewDetailsMp4 */ PreviewDetailsMp4;
        /**
         * int32
         * Count of comments
         */
        commentsCount?: number; // int32
        /**
         * int32
         * Count of reported comments
         */
        reportedCommentsCount?: number; // int32
        /**
         * int32
         * Count of active/live comments
         */
        activeCommentsCount?: number; // int32
        /**
         * boolean
         * Is video deleted
         */
        isDeleted?: boolean;
        /**
         * boolean
         */
        isPublic?: boolean;
        userInfo?: /* videoUserInfo */ VideoUserInfo;
        /**
         * objectId
         * The id of the video.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * The id of the facilitator.
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string; // objectId
        /**
         * string
         * The title of the video.
         */
        title?: string | null;
        /**
         * string
         * The brief description of the video.
         */
        subtitle?: string | null;
        /**
         * list1
         * Ids of the secondary products. Each product should be already stored in the YEAY database.
         */
        secondaryProductIds?: string /* objectId */[] | null;
        /**
         * languageInfo
         * List of languages which are spoken in this video. Empty array means that video is not language specific and can be targeted to all users.
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * objectId
         * Id of the primary product. It should reference the product which is already stored in the YEAY database.
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        /**
         * tags
         * List of video hash tags.
         */
        hashTags?: string /* string */[] | null;
        /**
         * dateTime
         * The date and time when the video was uploaded.
         */
        utcUploaded?: string; // date-time
        meta?: /* videoDetailsMeta */ VideoDetailsMeta;
        streaming?: /* videoDetailsStreaming */ VideoDetailsStreaming;
        validation?: /* videoDetailsValidation */ VideoDetailsValidation;
        engagementStatistics?: /* videoDetailsEngagementDeltas */ VideoDetailsEngagementDeltas;
        /**
         * boolean
         * True if the video can be exclusive and can not be validated.
         */
        isWithoutValidation?: boolean;
        videoTeamExclusivityInfo?: /* videoExclusivityResponse */ VideoExclusivityResponse;
        /**
         * boolean
         * Like status of video.
         */
        isLiked?: boolean;
        /**
         * boolean
         * Save status of video.
         */
        isSaved?: boolean;
        /**
         * string
         * Product link of the video
         */
        productLink?: string | null;
        /**
         * boolean
         * Product link of the video
         */
        isFollowed?: boolean;
    }
    /**
     * adminQueryPostsRequest
     */
    export interface AdminQueryPostsRequest {
        /**
         * nullable1
         * Id of the video. Could be null
         * example:
         * 000000000000000000000000
         */
        threadId?: string | null; // objectId
        /**
         * nullable1
         * Id of the user. Could be null
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * nullable1
         * If true return reported comments. If false - not reported. If null - all comments
         */
        isReported?: boolean | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * adminQueryPostsResponse
     */
    export interface AdminQueryPostsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getPostResponse */ GetPostResponse[] | null;
    }
    /**
     * adminUpdateUserRequest
     */
    export interface AdminUpdateUserRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string; // objectId
        /**
         * string
         */
        firstName?: string | null;
        /**
         * string
         */
        lastName?: string | null;
        /**
         * string
         */
        country?: string | null;
        gender?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */;
        /**
         * dateTime
         */
        dateOfBirth?: string; // date-time
        /**
         * string
         */
        primaryLanguage?: string | null;
        /**
         * cultureInfo
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * int32
         */
        freeStakingRemaining?: number; // int32
        /**
         * boolean
         */
        isFreeStakingEligible?: boolean;
        /**
         * boolean
         */
        isTrusted?: boolean;
        /**
         * roles
         */
        roles?: string /* string */[] | null;
        /**
         * boolean
         */
        isDisabled?: boolean;
    }
    /**
     * adminVerifyUserAccountRequest
     */
    export interface AdminVerifyUserAccountRequest {
        /**
         * objectId
         * The id of user to be verified.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
    }
    /**
     * affiliateLinkEntryResponse
     */
    export interface AffiliateLinkEntryResponse {
        /**
         * objectId
         * Id of the provider which created entry
         * example:
         * 000000000000000000000000
         */
        providerId?: string; // objectId
        /**
         * dateTime
         * Time when entry will expire
         */
        utcExpires?: string; // date-time
        /**
         * cultureInfo
         * Locale of entry
         * example:
         * en-GB
         */
        cultureInfo?: string | null; // string
        /**
         * string
         * Affiliate link
         */
        url?: string | null;
        /**
         * int32
         * Priority of the affiliate link
         */
        priority?: number; // int32
    }
    /**
     * ageRange
     */
    export interface AgeRange {
        /**
         * int32
         */
        start?: number; // int32
        /**
         * int32
         */
        end?: number; // int32
    }
    /**
     * analyzeMobileNumberRequest
     */
    export interface AnalyzeMobileNumberRequest {
        /**
         * string
         */
        mobileNumber?: string | null;
    }
    /**
     * analyzeMobileNumberResponse
     */
    export interface AnalyzeMobileNumberResponse {
        result?: /**
         * mobileNumberValidity
         * <br/><br/>Values:<br/>0 = Exists<br/>1 = NotFoundInSystem<br/>-2 = PendingVerification<br/>-1 = InvalidFormat
         */
        MobileNumberValidity /* int32 */;
    }
    /**
     * area
     */
    export interface Area {
        /**
         * string
         */
        city?: string | null;
        /**
         * string
         */
        region?: string | null;
    }
    /**
     * authenticateWebRecorderRequest
     */
    export interface AuthenticateWebRecorderRequest {}
    /**
     * authenticateWithTokenRequest
     */
    export interface AuthenticateWithTokenRequest {
        /**
         * string
         */
        email: string;
        /**
         * string
         */
        confirmationToken: string;
        /**
         * string
         */
        password: string;
    }
    /**
     * bigQueryUserResponse
     */
    export interface BigQueryUserResponse {
        /**
         * string
         */
        username?: string | null;
        /**
         * string
         */
        email?: string | null;
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * cultureInfo
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * string
         */
        country?: string | null;
        /**
         * string
         */
        region?: string | null;
        /**
         * string
         */
        city?: string | null;
        /**
         * string
         */
        urlInYasy?: string | null;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * bigQueryUsersRequest
     */
    export interface BigQueryUsersRequest {
        /**
         * uri
         * Example: https://afjmjt-beta.yeay.com/users/
         */
        yasyUrlToUser?: string | null; // uri
        /**
         * string
         * Regex for search users by username.
         */
        username?: string | null;
        /**
         * string
         * Return the user by email address (fuzzy match).
         */
        email?: string | null;
        /**
         * string
         * Return the user by mobile phone number
         */
        mobileNumber?: string | null;
        /**
         * nullable1
         * True if only trusted users have to be returned otherwise false.
         */
        isTrusted?: boolean | null;
        /**
         * nullable1
         * Sorts the users by latest active. Null to not apply the sort.
         */
        sortByActivityAsc?: boolean | null;
        /**
         * string
         * Filter by user role.
         */
        role?: string | null;
        /**
         * cultureInfo
         * Filter by user locale
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * countryInfo
         * Filter user by Country
         * example:
         * string
         */
        country?: string | null; // string
        /**
         * string
         * Filter user by Region
         */
        region?: string | null;
        /**
         * string
         * Sorts the results by field ascending (UtcCreated+asc) or descending (UtcCreated+desc).<br />
         * Supported fields: UtcCreated, UtcLastAuthentication, UtcUpdated.
         */
        sortByField?: string | null;
        /**
         * dateTime
         * Filter users created/updated/lastAuthenticated after this time.
         */
        fromUtcDateTime?: string; // date-time
        /**
         * dateTime
         * Filter users created/updated/lastAuthenticated before this time.
         */
        toUtcDateTime?: string; // date-time
        /**
         * string
         * Filter the results by date field.<br />
         * Supported fields: UtcCreated, UtcLastAuthentication, UtcUpdated.
         */
        filterByDate?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * bigQueryUsersResponse
     */
    export interface BigQueryUsersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* bigQueryUserResponse */ BigQueryUserResponse[] | null;
    }
    /**
     * blockUserRequest
     */
    export interface BlockUserRequest {
        /**
         * objectId
         * Id of block user
         * example:
         * 000000000000000000000000
         */
        blockedUserId?: string; // objectId
        /**
         * boolean
         * If true - block. If false - unblock
         */
        isBlock?: boolean;
    }
    /**
     * brandVoucherResponse
     */
    export interface BrandVoucherResponse {
        /**
         * string
         */
        brandName?: string | null;
        /**
         * string
         */
        countryName?: string | null;
        /**
         * string
         */
        currency?: string | null;
        /**
         * list1
         */
        denominations?: number /* double */[] | null;
        /**
         * list1
         */
        foreignDenominations?: number /* double */[] | null;
        valueRestrictions?: /* voucherValueRestrictions */ VoucherValueRestrictions;
        foreignValueRestrictions?: /* voucherValueRestrictions */ VoucherValueRestrictions;
        /**
         * int64
         */
        productId?: number; // int64
        /**
         * string
         */
        productImage?: string | null;
        /**
         * string
         */
        productDescription?: string | null;
        /**
         * string
         */
        howToUse?: string | null;
        /**
         * string
         */
        termsAndConditions?: string | null;
        /**
         * string
         */
        expiryAndValidity?: string | null;
    }
    /**
     * briefUserInfo
     */
    export interface BriefUserInfo {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         */
        userName?: string | null;
        /**
         * string
         */
        oldUserName?: string | null;
        /**
         * boolean
         */
        isTrusted?: boolean;
    }
    /**
     * bullzValidationInfo
     */
    export interface BullzValidationInfo {
        /**
         * dateTime
         */
        utcApproved?: string; // date-time
        curationState?: /**
         * videoCurationState
         * <br/><br/>Values:<br/>0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
         */
        VideoCurationState /* int32 */;
        curationEndedReason?: /**
         * curationEndedReason
         * Bullz video curation ended reason. Currently has only rejection reasons. May be extended to support acceptance reasons.<br/><br/>Values:<br/>0 = None<br/>1 = DeclineRequested<br/>2 = Inappropriate<br/>3 = GraphicContent<br/>4 = Violence<br/>5 = Copyright<br/>6 = TestVideo<br/>7 = IncorrectFormat<br/>8 = UserRequested<br/>9 = Other<br/>10 = NotProductRecommendation<br/>11 = WrongLanguage<br/>12 = QualityGuidelines
         */
        CurationEndedReason /* int32 */;
        reportedReason?: /**
         * videoReportedReason
         * <br/><br/>Values:<br/>0 = None<br/>1 = ContainsViolence<br/>2 = ContainsHarassment<br/>3 = ContentObjectionable<br/>4 = ContentInappropriate<br/>5 = ContainsNudity
         */
        VideoReportedReason /* int32 */;
    }
    /**
     * changeUserPasswordViaSmsRequest
     */
    export interface ChangeUserPasswordViaSmsRequest {
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * string
         */
        validationCode?: string | null;
        /**
         * string
         */
        newPassword: string;
    }
    /**
     * changeUserPasswordViaSmsResponse
     */
    export interface ChangeUserPasswordViaSmsResponse {}
    /**
     * changeVideoExclusivityStatusRequest
     */
    export interface ChangeVideoExclusivityStatusRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        exclusivityStatus?: /**
         * videoExclusivityStatus
         * <br/><br/>Values:<br/>0 = None<br/>5 = Hot<br/>10 = Exclusive
         */
        VideoExclusivityStatus /* int32 */;
    }
    /**
     * checkSmsCodeRequest
     */
    export interface CheckSmsCodeRequest {
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * string
         */
        code?: string | null;
    }
    /**
     * checkSmsCodeResponse
     */
    export interface CheckSmsCodeResponse {
        /**
         * boolean
         */
        result?: boolean;
    }
    /**
     * commentReportedState
     * <br/><br/>Values:<br/>0 = None<br/>1 = Inappropriate<br/>2 = Violence<br/>3 = Harassment<br/>4 = Objectionable<br/>5 = Nudity
     */
    export type CommentReportedState = 0 | 1 | 2 | 3 | 4 | 5; // int32
    /**
     * commentsResponse
     */
    export interface CommentsResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        threadId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        parentId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        bodyType?: /**
         * postBodyType
         * <br/><br/>Values:<br/>0 = Undefined<br/>1 = PlainText<br/>2 = Html
         */
        PostBodyType /* int32 */;
        /**
         * string
         */
        body?: string | null;
        /**
         * dateTime
         */
        utcUpdated?: string; // date-time
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * int32
         */
        level?: number; // int32
    }
    /**
     * consensusRange
     */
    export interface ConsensusRange {
        /**
         * decimal
         */
        lowCreativity?: number; // double
        /**
         * decimal
         */
        lowAuthenticity?: number; // double
        /**
         * decimal
         */
        lowPositivity?: number; // double
        /**
         * decimal
         */
        highCreativity?: number; // double
        /**
         * decimal
         */
        highAuthenticity?: number; // double
        /**
         * decimal
         */
        highPositivity?: number; // double
    }
    /**
     * countQueryResponse
     */
    export interface CountQueryResponse {
        /**
         * int32
         */
        queryCount?: number; // int32
    }
    /**
     * countQueryUsersRequest
     */
    export interface CountQueryUsersRequest {
        /**
         * string
         * Regex for search users by username.
         */
        username?: string | null;
        /**
         * string
         * Return the user by email address (fuzzy match).
         */
        email?: string | null;
        /**
         * string
         * Return the user by mobile phone number
         */
        mobileNumber?: string | null;
        /**
         * nullable1
         * True if only trusted users have to be returned otherwise false.
         */
        isTrusted?: boolean | null;
        /**
         * string
         * Filter by user role.
         */
        role?: string | null;
        /**
         * cultureInfo
         * Filter by user locale
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * countryInfo
         * Filter user by Country
         * example:
         * string
         */
        country?: string | null; // string
        /**
         * string
         * Filter user by Region
         */
        region?: string | null;
        /**
         * dateTime
         * Filter users created/updated/lastAuthenticated after this time.
         */
        fromUtcDateTime?: string; // date-time
        /**
         * dateTime
         * Filter users created/updated/lastAuthenticated before this time.
         */
        toUtcDateTime?: string; // date-time
        /**
         * string
         * Filter the results by date field.<br />
         * Supported fields: UtcCreated, UtcLastAuthentication, UtcUpdated.
         */
        filterByDate?: string | null;
    }
    /**
     * countryResponse
     */
    export interface CountryResponse {
        /**
         * string
         */
        countryCode?: string | null;
        /**
         * string
         */
        countryName?: string | null;
    }
    /**
     * createEngagementEmitterRequest
     */
    export interface CreateEngagementEmitterRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * dateTime
         */
        utcStart?: string; // date-time
        /**
         * dateTime
         */
        utcEnd?: string; // date-time
        /**
         * int32
         */
        totalViews?: number; // int32
        /**
         * int32
         */
        totalShares?: number; // int32
        /**
         * int32
         */
        totalLikes?: number; // int32
    }
    /**
     * createManagedProductAffiliateLinkRequest
     */
    export interface CreateManagedProductAffiliateLinkRequest {
        /**
         * objectId
         * The Id of the product to which the affiliate link will be linked to.
         * example:
         * 000000000000000000000000
         */
        productId?: string; // objectId
        /**
         * cultureInfo
         * The locale of newly created affiliate link. Null if the link should be Default.
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * string
         * The URL of newly created affiliate link.
         */
        url?: string | null;
        /**
         * boolean
         * The URL of newly created affiliate link.
         */
        isDefault?: boolean;
    }
    /**
     * createManagedProductAffiliateLinkResponse
     */
    export interface CreateManagedProductAffiliateLinkResponse {
        /**
         * string
         * The URL of the affiliate link.
         */
        url?: string | null;
        /**
         * boolean
         * Indicates whether the affiliate link is default or locale-specific.
         */
        isDefault?: boolean;
        /**
         * cultureInfo
         * The Locale of the affiliate link if it's culture-specific.
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * objectId
         * The id of the product which this affiliate link is referenced to.
         * example:
         * 000000000000000000000000
         */
        productId?: string; // objectId
    }
    /**
     * createMarketingStatisticsRequest
     */
    export interface CreateMarketingStatisticsRequest {
        /**
         * dateTime
         * Filter event aggregation statistics by created date time. Return statistics created after this time.
         */
        utcStart?: string; // date-time
        /**
         * dateTime
         * Filter event aggregation statistics by created date time. Return statistics created before this time.
         */
        utcEnd?: string; // date-time
    }
    /**
     * createPlaylistForVideosResponse
     */
    export interface CreatePlaylistForVideosResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * dictionary2
         */
        performance?: {
            [name: string]: number; // int64
        } | null;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* playlistVideoResponse */ PlaylistVideoResponse[] | null;
    }
    /**
     * createPlaylistRequest
     */
    export interface CreatePlaylistRequest {
        /**
         * boolean
         * If set, will return query performance metrics.
         */
        returnQueryPerformanceMetrics?: boolean;
        /**
         * string
         * LEFT FOR OLD VERSIONS. USE playlist/query-videos. Filter playlist by a hashtag.
         */
        byHashtag?: string | null;
        /**
         * nullable1
         * LEFT FOR OLD VERSIONS. USE playlist/query-videos. Filter playlist by a primary product.
         * example:
         * 000000000000000000000000
         */
        byProductId?: string | null; // objectId
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * createPostRequest
     */
    export interface CreatePostRequest {
        /**
         * objectId
         * Id of the video
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * string
         * Comment body
         */
        body?: string | null;
        bodyType?: /**
         * postBodyType
         * <br/><br/>Values:<br/>0 = Undefined<br/>1 = PlainText<br/>2 = Html
         */
        PostBodyType /* int32 */;
        /**
         * objectId
         * Comment id against which user replied
         * example:
         * 000000000000000000000000
         */
        parentCommentId?: string; // objectId
    }
    /**
     * createPromotionRequest
     */
    export interface CreatePromotionRequest {
        /**
         * list1
         */
        userAgeRanges?: /* ageRange */ AgeRange[] | null;
        /**
         * list1
         */
        userGenders?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */[] | null;
        /**
         * list1
         */
        location?: string /* string */[] | null;
        /**
         * string
         */
        pageLocation?: string | null;
    }
    /**
     * createPromotionResponse
     */
    export interface CreatePromotionResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * list1
         */
        userAgeRanges?: /* ageRange */ AgeRange[] | null;
        /**
         * list1
         */
        userGenders?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */[] | null;
        /**
         * list1
         */
        location?: string /* string */[] | null;
        /**
         * string
         */
        pageRoute?: string | null;
    }
    /**
     * createSavedVideoRequest
     */
    export interface CreateSavedVideoRequest {
        /**
         * objectId
         * Id of the video
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * boolean
         * If true video will be save, If false video will be deleted
         */
        isSave?: boolean;
    }
    /**
     * createTeamRequest
     */
    export interface CreateTeamRequest {
        /**
         * string
         * Name of the new Team.
         */
        name?: string | null;
        /**
         * string
         * UrlName, which will be in deeplink
         */
        urlName?: string | null;
    }
    /**
     * createTeamResponse
     */
    export interface CreateTeamResponse {
        /**
         * objectId
         * Id of the team.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * Name of the team.
         */
        name?: string | null;
        /**
         * string
         * Deep link url name, unique.
         */
        urlName?: string | null;
        owner?: /* teamMemberResponse */ TeamMemberResponse;
        /**
         * dateTime
         * Date when team was created.
         */
        utcCreated?: string; // date-time
        /**
         * IEnumerable`1
         * List of admins info.
         */
        admins?: /* teamMemberResponse */ TeamMemberResponse[] | null;
        /**
         * IEnumerable`1
         * List of banned users.
         */
        banned?: /* teamMemberResponse */ TeamMemberResponse[] | null;
    }
    /**
     * createTopicRequest
     */
    export interface CreateTopicRequest {
        /**
         * string
         */
        name?: string | null;
        /**
         * tags
         */
        tags?: string /* string */[] | null;
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        brandId?: string | null; // objectId
        /**
         * string
         */
        link?: string | null;
    }
    /**
     * createTrendingOverridesRequest
     */
    export interface CreateTrendingOverridesRequest {
        /**
         * objectId
         * Id of the target document, depending on the type
         * example:
         * 000000000000000000000000
         */
        targetId?: string; // objectId
        /**
         * string
         * Tag for trending if type are Tag
         */
        tag?: string | null;
        /**
         * int32
         * Position in trending
         */
        position?: number; // int32
        type?: /**
         * trendingType
         * <br/><br/>Values:<br/>0 = None<br/>100 = Tag<br/>200 = Video<br/>300 = User
         */
        TrendingType /* int32 */;
        /**
         * cultureInfo
         * Trending language
         * example:
         * en-GB
         */
        language?: string | null; // string
    }
    /**
     * createTrendingOverridesResponse
     */
    export interface CreateTrendingOverridesResponse {
        /**
         * objectId
         * Id of the trending document
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * Id of the target document, depending on the type
         * example:
         * 000000000000000000000000
         */
        targetId?: string; // objectId
        /**
         * string
         * Tag for trending if type are Tag
         */
        tag?: string | null;
        video?: /* getTrendVideosResponse */ GetTrendVideosResponse;
        user?: /* getTrendingUserResponse */ GetTrendingUserResponse;
        /**
         * int32
         * Position in trending
         */
        position?: number; // int32
        type?: /**
         * trendingType
         * <br/><br/>Values:<br/>0 = None<br/>100 = Tag<br/>200 = Video<br/>300 = User
         */
        TrendingType /* int32 */;
    }
    /**
     * createVideoRequest
     */
    export interface CreateVideoRequest {
        /**
         * string
         * Brand free-form text.
         */
        brand?: string | null;
        /**
         * string
         * Product free-form text.
         */
        product?: string | null;
        /**
         * objectId
         * Id of the product.
         * example:
         * 000000000000000000000000
         */
        productId?: string; // objectId
        /**
         * string
         */
        uploadSessionId?: string | null;
        /**
         * languageInfo
         * List of languages which are spoken in this video. Empty array means that video is not language specific and can be targeted to all users.
         */
        spokenLanguages?: string /* string */[] | null;
        /**
         * languageInfo
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * tags
         * List of video hash tags.
         */
        hashTags?: string /* string */[] | null;
        /**
         * boolean
         * Can be set just by trusted user
         */
        isExclusive?: boolean;
        /**
         * string
         */
        productLink?: string | null;
    }
    /**
     * createVideoResponse
     * Contains upload identifiers which should be used to upload files.
     */
    export interface CreateVideoResponse {
        /**
         * objectId
         * Id of the newly created video.
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * objectId
         * Video upload id for media upload endpoint.
         * example:
         * 000000000000000000000000
         */
        videoUploadId?: string; // objectId
    }
    /**
     * createVoucherTransactionRequest
     */
    export interface CreateVoucherTransactionRequest {
        /**
         * int64
         */
        productId?: number; // int64
        /**
         * int32
         */
        denomination?: number; // int32
    }
    /**
     * creationStatus
     * <br/><br/>Values:<br/>0 = None<br/>1 = NotCreated<br/>2 = Processing<br/>3 = Processed<br/>4 = Failed
     */
    export type CreationStatus = 0 | 1 | 2 | 3 | 4; // int32
    /**
     * curatedVideoResponse
     */
    export interface CuratedVideoResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        title?: string | null;
        /**
         * string
         */
        subtitle?: string | null;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        /**
         * list1
         */
        secondaryProductIds?: string /* objectId */[] | null;
        /**
         * languageInfo
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * tags
         */
        hashTags?: string /* string */[] | null;
        streamDetails?: /* videoStreamDetails */ VideoStreamDetails;
        /**
         * boolean
         */
        isLegacy?: boolean;
    }
    /**
     * curationEndedReason
     * Bullz video curation ended reason. Currently has only rejection reasons. May be extended to support acceptance reasons.<br/><br/>Values:<br/>0 = None<br/>1 = DeclineRequested<br/>2 = Inappropriate<br/>3 = GraphicContent<br/>4 = Violence<br/>5 = Copyright<br/>6 = TestVideo<br/>7 = IncorrectFormat<br/>8 = UserRequested<br/>9 = Other<br/>10 = NotProductRecommendation<br/>11 = WrongLanguage<br/>12 = QualityGuidelines
     */
    export type CurationEndedReason = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // int32
    /**
     * deleteEngagementEmittersRequest
     */
    export interface DeleteEngagementEmittersRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * deleteManagedProductRequest
     */
    export interface DeleteManagedProductRequest {
        /**
         * objectId
         * The id of the product which should be deleted.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * deleteManagedProductResponse
     */
    export interface DeleteManagedProductResponse {}
    /**
     * deletePostRequest
     */
    export interface DeletePostRequest {
        /**
         * objectId
         * The id of post which should be deleted.
         * example:
         * 000000000000000000000000
         */
        postId?: string; // objectId
    }
    /**
     * deleteTopicRequest
     */
    export interface DeleteTopicRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * deleteUserRequest
     */
    export interface DeleteUserRequest {
        /**
         * string
         * Current user's password
         */
        password?: string | null;
    }
    /**
     * deleteVideoRequest
     */
    export interface DeleteVideoRequest {
        /**
         * objectId
         * The Id of the video which should be deleted.
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
    }
    /**
     * deleteVideoResponse
     */
    export interface DeleteVideoResponse {}
    /**
     * deletedUserResponse
     */
    export interface DeletedUserResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         */
        userName?: string | null;
        /**
         * string
         */
        email?: string | null;
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * dateTime
         */
        utcDeleted?: string; // date-time
        /**
         * list1
         */
        reasons?: /* userDeletionReason */ UserDeletionReason /* int32 */[] | null;
        /**
         * string
         */
        comment?: string | null;
        /**
         * list1
         */
        videoIds?: string /* objectId */[] | null;
        deleterInfo?: /* shortUserInfo */ ShortUserInfo;
    }
    /**
     * disableUserInfo
     */
    export interface DisableUserInfo {
        /**
         * objectId
         * The id of user to be disabled.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * list1
         * Reason to delete
         */
        reasons?: /* userDisablingReason */ UserDisablingReason /* int32 */[] | null;
        /**
         * string
         * An admin can leave the comment blank
         */
        comment?: string | null;
    }
    /**
     * domainSearchKey
     * <br/><br/>Values:<br/>0 = None<br/>1 = User<br/>2 = Video<br/>3 = HashTag<br/>4 = Product<br/>5 = Topic
     */
    export type DomainSearchKey = 0 | 1 | 2 | 3 | 4 | 5; // int32
    /**
     * engagementEmitter
     */
    export interface EngagementEmitter {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * nullable1
         */
        utcUpdated?: string | null; // date-time
        /**
         * dateTime
         */
        utcEmitStart?: string; // date-time
        /**
         * dateTime
         */
        utcEmitEnd?: string; // date-time
        /**
         * boolean
         */
        isActive?: boolean;
        /**
         * boolean
         */
        isPast?: boolean;
        /**
         * int32
         */
        viewsTotalTarget?: number; // int32
        /**
         * int32
         */
        viewsEmitted?: number; // int32
        /**
         * decimal
         */
        viewsProgress?: number; // double
        /**
         * int32
         */
        likesTotalTarget?: number; // int32
        /**
         * int32
         */
        likesEmitted?: number; // int32
        /**
         * decimal
         */
        likesProgress?: number; // double
        /**
         * int32
         */
        sharesTotalTarget?: number; // int32
        /**
         * int32
         */
        sharesEmitted?: number; // int32
        /**
         * decimal
         */
        sharesProgress?: number; // double
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id: string; // objectId
    }
    /**
     * engagementEmitterUserInfo
     */
    export interface EngagementEmitterUserInfo {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        userName?: string | null;
        /**
         * cultureInfo
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * boolean
         */
        isTrusted?: boolean;
        /**
         * string
         */
        avatar?: string | null;
    }
    /**
     * engagementEmitterVideoInfo
     */
    export interface EngagementEmitterVideoInfo {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        engagement?: /* videoEngagement */ VideoEngagement;
        /**
         * string
         */
        thumbnailUrl?: string | null;
    }
    /**
     * error400BadRequest
     */
    export interface Error400BadRequest {
        /**
         * dictionary2
         */
        errors?: {
            [name: string]: string[];
        } | null;
        /**
         * string
         */
        title?: string | null;
        /**
         * string
         */
        traceId?: string | null;
        /**
         * boolean
         */
        isSuccess?: boolean;
        loggingLevel?: /**
         * logLevel
         * <br/><br/>Values:<br/>0 = Trace<br/>1 = Debug<br/>2 = Information<br/>3 = Warning<br/>4 = Error<br/>5 = Critical<br/>6 = None
         */
        LogLevel /* int32 */;
        /**
         * string
         */
        message?: string | null;
    }
    /**
     * error404NotFoundResponse
     */
    export interface Error404NotFoundResponse {
        /**
         * boolean
         */
        isSuccess?: boolean;
        loggingLevel?: /**
         * logLevel
         * <br/><br/>Values:<br/>0 = Trace<br/>1 = Debug<br/>2 = Information<br/>3 = Warning<br/>4 = Error<br/>5 = Critical<br/>6 = None
         */
        LogLevel /* int32 */;
        /**
         * string
         */
        message?: string | null;
    }
    /**
     * error409ConflictResponse
     */
    export interface Error409ConflictResponse {
        /**
         * boolean
         */
        isSuccess?: boolean;
        loggingLevel?: /**
         * logLevel
         * <br/><br/>Values:<br/>0 = Trace<br/>1 = Debug<br/>2 = Information<br/>3 = Warning<br/>4 = Error<br/>5 = Critical<br/>6 = None
         */
        LogLevel /* int32 */;
        /**
         * string
         */
        message?: string | null;
    }
    /**
     * existenceResponse
     */
    export interface ExistenceResponse {
        /**
         * boolean
         */
        exists?: boolean;
    }
    /**
     * filterLogic
     * <br/><br/>Values:<br/>0 = And<br/>1 = Or
     */
    export type FilterLogic = 0 | 1; // int32
    /**
     * getAdminPromotionResponse
     */
    export interface GetAdminPromotionResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * list1
         */
        userAgeRanges?: /* ageRange */ AgeRange[] | null;
        /**
         * list1
         */
        userGenders?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */[] | null;
        /**
         * list1
         */
        location?: string /* string */[] | null;
        /**
         * string
         */
        icon?: string | null;
        /**
         * boolean
         */
        isActive?: boolean;
        /**
         * string
         */
        pageLocation?: string | null;
    }
    /**
     * getAdminTeamsResponse
     */
    export interface GetAdminTeamsResponse {
        /**
         * int32
         */
        membersCount?: number; // int32
        /**
         * string
         */
        teamLeaderName?: string | null;
        /**
         * objectId
         * Team id
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * Name of the team
         */
        name?: string | null;
        /**
         * string
         * UrlName, which will be in deeplink
         */
        urlName?: string | null;
        /**
         * dateTime
         * Creating team date in UTC
         */
        utcCreated?: string; // date-time
        /**
         * objectId
         * User id, who is Owner of this team
         * example:
         * 000000000000000000000000
         */
        ownerId?: string; // objectId
    }
    /**
     * getAffiliateLinkRequest
     */
    export interface GetAffiliateLinkRequest {
        /**
         * objectId
         * The Id of the product
         * example:
         * 000000000000000000000000
         */
        productId?: string; // objectId
    }
    /**
     * getAffiliateLinkResponse
     */
    export interface GetAffiliateLinkResponse {
        /**
         * objectId
         * The Id of the product
         * example:
         * 000000000000000000000000
         */
        productId?: string; // objectId
        /**
         * dateTime
         * Time when link was created
         */
        utcCreated?: string; // date-time
        /**
         * list1
         * Affiliate link entries by country
         */
        entries?: /* affiliateLinkEntryResponse */ AffiliateLinkEntryResponse[] | null;
        defaultEntry?: /* affiliateLinkEntryResponse */ AffiliateLinkEntryResponse;
    }
    /**
     * getBlacklistedUsersResponse
     */
    export interface GetBlacklistedUsersResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        type?: /* identityType */ IdentityType /* int32 */;
        /**
         * string
         * Return the user by email address/ mobileNumber or username (fuzzy match).
         */
        searchTextValue?: string | null;
    }
    /**
     * getBullzUserRequest
     */
    export interface GetBullzUserRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
    }
    /**
     * getCurrentAuthorizationsRequest
     */
    export interface GetCurrentAuthorizationsRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
    }
    /**
     * getCurrentAuthorizationsResponse
     */
    export interface GetCurrentAuthorizationsResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
        /**
         * roles
         */
        roles?: string /* string */[] | null;
        /**
         * string
         */
        email?: string | null;
        /**
         * boolean
         */
        isEmailValidated?: boolean;
        /**
         * boolean
         */
        isAccountVerified?: boolean;
    }
    /**
     * getEngagementEmitterResponse
     */
    export interface GetEngagementEmitterResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * boolean
         */
        isActive?: boolean;
        /**
         * boolean
         */
        isPast?: boolean;
        /**
         * int32
         */
        likesEmitted?: number; // int32
        /**
         * decimal
         */
        likesProgress?: number; // double
        /**
         * int32
         */
        likesTotalTarget?: number; // int32
        /**
         * int32
         */
        sharesEmitted?: number; // int32
        /**
         * decimal
         */
        sharesProgress?: number; // double
        /**
         * int32
         */
        sharesTotalTarget?: number; // int32
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * dateTime
         */
        utcEmitEnd?: string; // date-time
        /**
         * dateTime
         */
        utcEmitStart?: string; // date-time
        /**
         * nullable1
         */
        utcUpdated?: string | null; // date-time
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * int32
         */
        viewsEmitted?: number; // int32
        /**
         * decimal
         */
        viewsProgress?: number; // double
        /**
         * int32
         */
        viewsTotalTarget?: number; // int32
        video?: /* engagementEmitterVideoInfo */ EngagementEmitterVideoInfo;
        user?: /* engagementEmitterUserInfo */ EngagementEmitterUserInfo;
    }
    /**
     * getEngagementEmittersRequest
     */
    export interface GetEngagementEmittersRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * getEngagementScoresRequest
     */
    export interface GetEngagementScoresRequest {}
    /**
     * getLanguageTrendingRequest
     */
    export interface GetLanguageTrendingRequest {
        /**
         * cultureInfo
         * example:
         * en-GB
         */
        language?: string | null; // string
    }
    /**
     * getManagedProductRequest
     */
    export interface GetManagedProductRequest {
        /**
         * objectId
         * The Id of the product which details should be returned.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * getManagedProductResponse
     */
    export interface GetManagedProductResponse {
        /**
         * int32
         */
        primaryReferencesCount?: number; // int32
        /**
         * dictionary2
         * The dictionary of locale string to affiliate link id.
         */
        affiliateLinkLocaleIds?: {
            [name: string]: string; // objectId
        } | null;
        /**
         * nullable1
         * The id of default affiliate link of the product.
         * example:
         * 000000000000000000000000
         */
        affiliateLinkIdDefault?: string | null; // objectId
        /**
         * string
         */
        brandImageUrl?: string | null;
        /**
         * nullable1
         * The Id of the primary image of the product.
         * example:
         * 000000000000000000000000
         */
        primaryImageId?: string | null; // objectId
        /**
         * objectId
         * The Id of the product.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * list1
         * Product UPC.
         */
        upcCodes?: string[] | null;
        /**
         * string
         * User specified name of the product.
         */
        name?: string | null;
        /**
         * string
         * Product description.
         */
        description?: string | null;
        /**
         * string
         * Product OrganizationViewer name.
         */
        brand?: string | null;
        /**
         * string
         * Product color.
         */
        color?: string | null;
        /**
         * list1
         * Array of product features.
         */
        features?: string[] | null;
        /**
         * list1
         * List of product categories.
         */
        category?: string[] | null;
        /**
         * tags
         * Product hash tags.
         */
        hashTags?: string /* string */[] | null;
    }
    /**
     * getNextCuratedVideoRequest
     */
    export interface GetNextCuratedVideoRequest {
        /**
         * nullable1
         * Low bound filter for the query.
         * example:
         * 000000000000000000000000
         */
        latestVideoId?: string | null; // objectId
    }
    /**
     * getNextCuratedVideoResponse
     */
    export interface GetNextCuratedVideoResponse {
        video?: /* curatedVideoResponse */ CuratedVideoResponse;
        /**
         * int32
         * The number remaining videos to be curated.
         */
        videosRemaining?: number; // int32
    }
    /**
     * getNotificationsRequest
     */
    export interface GetNotificationsRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        lastId?: string; // objectId
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * getPlaylistVideoRequest
     */
    export interface GetPlaylistVideoRequest {
        /**
         * objectId
         * Id of the video which is available in playlist.
         * example:
         * 000000000000000000000000
         */
        playlistVideoId?: string; // objectId
    }
    /**
     * getPostResponse
     */
    export interface GetPostResponse {
        /**
         * objectId
         * Id of the user
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         * Link to user's profile image.
         */
        profileImageUrl?: string | null;
        /**
         * string
         * User's full name.
         */
        username?: string | null;
        /**
         * boolean
         * True if you followed the user, false if do not
         */
        isFollowed?: boolean;
        /**
         * boolean
         * True if user is trusted
         */
        isTrusted?: boolean;
        /**
         * objectId
         * Id of the comment
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * Id of the comment parent
         * example:
         * 000000000000000000000000
         */
        parentId?: string; // objectId
        bodyType?: /**
         * postBodyType
         * <br/><br/>Values:<br/>0 = Undefined<br/>1 = PlainText<br/>2 = Html
         */
        PostBodyType /* int32 */;
        /**
         * string
         * Body
         */
        body?: string | null;
        /**
         * dateTime
         * The date and time when the video was updated
         */
        utcUpdated?: string; // date-time
        /**
         * dateTime
         * The date and time when the video was created
         */
        utcCreated?: string; // date-time
        /**
         * int32
         * Level of comment
         */
        deep?: number; // int32
        reportedState?: /**
         * commentReportedState
         * <br/><br/>Values:<br/>0 = None<br/>1 = Inappropriate<br/>2 = Violence<br/>3 = Harassment<br/>4 = Objectionable<br/>5 = Nudity
         */
        CommentReportedState /* int32 */;
    }
    /**
     * getProductByBarcodeRequest
     */
    export interface GetProductByBarcodeRequest {
        /**
         * string
         * Barcode of a product.
         */
        barcode: string;
        /**
         * boolean
         * Indicates whether a new product should be created by querying 3rd party barcode API in case the barcode does not exist in the YEAY database.
         */
        createNew: boolean;
    }
    /**
     * getProductResponse
     */
    export interface GetProductResponse {
        /**
         * objectId
         * The Id of the product.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * list1
         * Product UPC.
         */
        upcCodes?: string[] | null;
        /**
         * string
         * User specified name of the product.
         */
        name?: string | null;
        /**
         * string
         * Product description.
         */
        description?: string | null;
        /**
         * string
         * Product OrganizationViewer name.
         */
        brand?: string | null;
        /**
         * string
         * Product color.
         */
        color?: string | null;
        /**
         * list1
         * Array of product features.
         */
        features?: string[] | null;
        /**
         * list1
         * List of product categories.
         */
        category?: string[] | null;
        /**
         * tags
         * Product hash tags.
         */
        hashTags?: string /* string */[] | null;
        /**
         * string
         * The URL of product image.
         */
        imageUrl?: string | null;
    }
    /**
     * getProductsByNameRequest
     */
    export interface GetProductsByNameRequest {
        /**
         * string
         * The name which is a part of a product name.
         */
        name: string;
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * getProductsResponse
     */
    export interface GetProductsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* productResponseLegacy */ ProductResponseLegacy[] | null;
    }
    /**
     * getPromotionForCurrentUserRequest
     */
    export interface GetPromotionForCurrentUserRequest {}
    /**
     * getPromotionForCurrentUserResponse
     */
    export interface GetPromotionForCurrentUserResponse {
        /**
         * string
         */
        icon?: string | null;
        /**
         * string
         */
        pageLocation?: string | null;
    }
    /**
     * getServiceStateResponse
     */
    export interface GetServiceStateResponse {
        /**
         * boolean
         */
        isEnabled?: boolean;
        /**
         * nullable1
         */
        utcLastDisabled?: string | null; // date-time
        /**
         * nullable1
         */
        utcLastEnabled?: string | null; // date-time
    }
    /**
     * getTeamDetailRequest
     */
    export interface GetTeamDetailRequest {
        /**
         * nullable1
         * Id of the team which info should be received. If set, UrlName will be ignored.
         * example:
         * 000000000000000000000000
         */
        id?: string | null; // objectId
        /**
         * string
         * Url name of the team which info should be received.
         */
        urlName?: string | null;
    }
    /**
     * getTeamDetailResponse
     */
    export interface GetTeamDetailResponse {
        /**
         * int32
         * Count of team video.
         */
        videoCount?: number; // int32
        /**
         * int32
         * Count of team member.
         */
        memberCount?: number; // int32
        /**
         * objectId
         * Id of the team.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * Name of the team.
         */
        name?: string | null;
        /**
         * string
         * Deep link url name, unique.
         */
        urlName?: string | null;
        owner?: /* teamMemberResponse */ TeamMemberResponse;
        /**
         * dateTime
         * Date when team was created.
         */
        utcCreated?: string; // date-time
        /**
         * IEnumerable`1
         * List of admins info.
         */
        admins?: /* teamMemberResponse */ TeamMemberResponse[] | null;
        /**
         * IEnumerable`1
         * List of banned users.
         */
        banned?: /* teamMemberResponse */ TeamMemberResponse[] | null;
    }
    /**
     * getTeamInfoRequest
     */
    export interface GetTeamInfoRequest {
        /**
         * nullable1
         * Id of the team which info should be received. If set, UrlName will be ignored.
         * example:
         * 000000000000000000000000
         */
        id?: string | null; // objectId
        /**
         * string
         * Url name of the team which info should be received.
         */
        urlName?: string | null;
    }
    /**
     * getTeamInfoResponse
     */
    export interface GetTeamInfoResponse {
        /**
         * IEnumerable`1
         */
        members?: /* teamMemberResponse */ TeamMemberResponse[] | null;
        /**
         * objectId
         * Id of the team.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * Name of the team.
         */
        name?: string | null;
        /**
         * string
         * Deep link url name, unique.
         */
        urlName?: string | null;
        owner?: /* teamMemberResponse */ TeamMemberResponse;
        /**
         * dateTime
         * Date when team was created.
         */
        utcCreated?: string; // date-time
        /**
         * IEnumerable`1
         * List of admins info.
         */
        admins?: /* teamMemberResponse */ TeamMemberResponse[] | null;
        /**
         * IEnumerable`1
         * List of banned users.
         */
        banned?: /* teamMemberResponse */ TeamMemberResponse[] | null;
    }
    /**
     * getTeamResponse
     */
    export interface GetTeamResponse {
        /**
         * objectId
         * Team id
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * Name of the team
         */
        name?: string | null;
        /**
         * string
         * UrlName, which will be in deeplink
         */
        urlName?: string | null;
        /**
         * dateTime
         * Creating team date in UTC
         */
        utcCreated?: string; // date-time
        /**
         * objectId
         * User id, who is Owner of this team
         * example:
         * 000000000000000000000000
         */
        ownerId?: string; // objectId
    }
    /**
     * getTopicRequest
     */
    export interface GetTopicRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * getTotalEmittedEngagementRequest
     */
    export interface GetTotalEmittedEngagementRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        videoId?: string | null; // objectId
    }
    /**
     * getTotalEmittedEngagementResponse
     */
    export interface GetTotalEmittedEngagementResponse {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        videoId?: string | null; // objectId
        /**
         * int32
         */
        totalViews?: number; // int32
        /**
         * int32
         */
        totalShares?: number; // int32
        /**
         * int32
         */
        totalLikes?: number; // int32
    }
    /**
     * getTrendVideosResponse
     */
    export interface GetTrendVideosResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * string
         */
        title?: string | null;
        /**
         * string
         * Link to user's profile image.
         */
        thumbnailUrl?: string | null;
        /**
         * int32
         */
        viewCount?: number; // int32
    }
    /**
     * getTrendingOverridesResponse
     */
    export interface GetTrendingOverridesResponse {
        /**
         * objectId
         * Id of the trending document
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * Id of the target document, depending on the type
         * example:
         * 000000000000000000000000
         */
        targetId?: string; // objectId
        /**
         * string
         * Tag for trending if type are Tag
         */
        tag?: string | null;
        video?: /* getTrendVideosResponse */ GetTrendVideosResponse;
        user?: /* getTrendingUserResponse */ GetTrendingUserResponse;
        /**
         * int32
         * Position in trending
         */
        position?: number; // int32
        type?: /**
         * trendingType
         * <br/><br/>Values:<br/>0 = None<br/>100 = Tag<br/>200 = Video<br/>300 = User
         */
        TrendingType /* int32 */;
    }
    /**
     * getTrendingRequest
     */
    export interface GetTrendingRequest {}
    /**
     * getTrendingResponse
     */
    export interface GetTrendingResponse {
        /**
         * boolean
         */
        isCached?: boolean;
        /**
         * list1
         */
        tags?: /* getTrendingTagResponse */ GetTrendingTagResponse[] | null;
        /**
         * list1
         */
        users?: /* getTrendingUserResponse */ GetTrendingUserResponse[] | null;
        /**
         * list1
         */
        videos?: /* getTrendVideosResponse */ GetTrendVideosResponse[] | null;
    }
    /**
     * getTrendingTagResponse
     */
    export interface GetTrendingTagResponse {
        /**
         * tag
         * example:
         * string
         */
        tag?: string; // string
    }
    /**
     * getTrendingUserResponse
     */
    export interface GetTrendingUserResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         */
        username?: string | null;
        /**
         * string
         * Link to user's profile image.
         */
        profileImageUrl?: string | null;
        /**
         * boolean
         * True if user is trusted
         */
        isTrusted?: boolean;
    }
    /**
     * getUserProfileImageResponse
     */
    export interface GetUserProfileImageResponse {
        /**
         * string
         * The URL to profile image.
         */
        profileImageUrl?: string | null;
    }
    /**
     * getUserProfileRequest
     */
    export interface GetUserProfileRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
    }
    /**
     * getUserProfileResponse
     */
    export interface GetUserProfileResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        bio?: string | null;
        team?: /* teamInfoResponse */ TeamInfoResponse;
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        ownedTeamId?: string | null; // objectId
        /**
         * string
         */
        firstName?: string | null;
        /**
         * string
         */
        lastName?: string | null;
        /**
         * boolean
         */
        isTrusted?: boolean;
        /**
         * int32
         */
        followedCount?: number; // int32
        /**
         * int32
         */
        followersCount?: number; // int32
        /**
         * string
         */
        username?: string | null;
        /**
         * boolean
         */
        isFollowed?: boolean;
        /**
         * string
         */
        profileImageUrl?: string | null;
    }
    /**
     * getUserResponse
     */
    export interface GetUserResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
        team?: /* teamInfoResponse */ TeamInfoResponse;
        ownedTeam?: /* teamOwnerInfoResponse */ TeamOwnerInfoResponse;
        /**
         * string
         */
        firstName?: string | null;
        /**
         * string
         */
        lastName?: string | null;
        /**
         * string
         */
        fullName?: string | null;
        /**
         * int32
         */
        followersCount?: number; // int32
        /**
         * int32
         */
        followingCount?: number; // int32
        /**
         * boolean
         */
        isFreeStakingEligible?: boolean;
        /**
         * int32
         */
        freeStakesRemaining?: number; // int32
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string; // objectId
        /**
         * boolean
         */
        isTrusted?: boolean;
        userGender?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */;
        /**
         * nullable1
         */
        dateOfBirth?: string | null; // date-time
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * dateTime
         */
        utcUpdated?: string; // date-time
        /**
         * dateTime
         */
        utcLastAuthentication?: string; // date-time
        /**
         * roles
         */
        roles?: string /* string */[] | null;
        /**
         * string
         */
        email?: string | null;
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * string
         */
        username?: string | null;
        /**
         * boolean
         */
        isAccountVerified?: boolean;
        /**
         * boolean
         */
        isEmailValidated?: boolean;
        profile?: /* userProfileResponse */ UserProfileResponse;
        /**
         * boolean
         */
        isDisabled?: boolean;
    }
    /**
     * getValidationStateRequest
     */
    export interface GetValidationStateRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         */
        remoteContentId?: string | null;
    }
    /**
     * getVideoDetailsRequest
     */
    export interface GetVideoDetailsRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * objectId
         * Id of the uploaded video.
         * example:
         * 000000000000000000000000
         */
        videoId: string; // objectId
    }
    /**
     * getVideoDetailsResponse
     */
    export interface GetVideoDetailsResponse {
        primaryProduct?: /* topicResponse */ TopicResponse;
        /**
         * objectId
         * The id of the video.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * The id of the facilitator.
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string; // objectId
        /**
         * string
         * The title of the video.
         */
        title?: string | null;
        /**
         * string
         * The brief description of the video.
         */
        subtitle?: string | null;
        /**
         * list1
         * Ids of the secondary products. Each product should be already stored in the YEAY database.
         */
        secondaryProductIds?: string /* objectId */[] | null;
        /**
         * languageInfo
         * List of languages which are spoken in this video. Empty array means that video is not language specific and can be targeted to all users.
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * objectId
         * Id of the primary product. It should reference the product which is already stored in the YEAY database.
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        /**
         * tags
         * List of video hash tags.
         */
        hashTags?: string /* string */[] | null;
        /**
         * dateTime
         * The date and time when the video was uploaded.
         */
        utcUploaded?: string; // date-time
        meta?: /* videoDetailsMeta */ VideoDetailsMeta;
        streaming?: /* videoDetailsStreaming */ VideoDetailsStreaming;
        validation?: /* videoDetailsValidation */ VideoDetailsValidation;
        engagementStatistics?: /* videoDetailsEngagementDeltas */ VideoDetailsEngagementDeltas;
        /**
         * boolean
         * True if the video can be exclusive and can not be validated.
         */
        isWithoutValidation?: boolean;
        videoTeamExclusivityInfo?: /* videoExclusivityResponse */ VideoExclusivityResponse;
        /**
         * boolean
         * Like status of video.
         */
        isLiked?: boolean;
        /**
         * boolean
         * Save status of video.
         */
        isSaved?: boolean;
        /**
         * string
         * Product link of the video
         */
        productLink?: string | null;
        /**
         * boolean
         * Product link of the video
         */
        isFollowed?: boolean;
    }
    /**
     * getVideoMetaRequest
     */
    export interface GetVideoMetaRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
    }
    /**
     * getVideoMetaResponse
     */
    export interface GetVideoMetaResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * string
         */
        title?: string | null;
        /**
         * string
         */
        description?: string | null;
        /**
         * string
         */
        thumbnailUrl?: string | null;
        /**
         * tags
         */
        hashtags?: string /* string */[] | null;
        /**
         * string
         */
        username?: string | null;
        /**
         * string
         */
        productName?: string | null;
        /**
         * tags
         */
        productHashTags?: string /* string */[] | null;
        /**
         * string
         */
        previewUrl?: string | null;
        /**
         * string
         */
        productLink?: string | null;
    }
    /**
     * getVideoPreviewRequest
     */
    export interface GetVideoPreviewRequest {
        /**
         * objectId
         * The video id for taking or creating preview
         * example:
         * 000000000000000000000000
         */
        videoId: string; // objectId
    }
    /**
     * getVideoPreviewResponse
     */
    export interface GetVideoPreviewResponse {
        /**
         * string
         */
        url?: string | null;
        status?: /**
         * creationStatus
         * <br/><br/>Values:<br/>0 = None<br/>1 = NotCreated<br/>2 = Processing<br/>3 = Processed<br/>4 = Failed
         */
        CreationStatus /* int32 */;
    }
    /**
     * getVideoRequest
     */
    export interface GetVideoRequest {
        /**
         * objectId
         * The id of the video which details should be returned.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * getVideoSourceFileRequest
     */
    export interface GetVideoSourceFileRequest {
        /**
         * objectId
         * The video id for taking or creating source file
         * example:
         * 000000000000000000000000
         */
        videoId: string; // objectId
    }
    /**
     * getVideoSourceFileResponse
     */
    export interface GetVideoSourceFileResponse {
        /**
         * string
         */
        url?: string | null;
        status?: /**
         * creationStatus
         * <br/><br/>Values:<br/>0 = None<br/>1 = NotCreated<br/>2 = Processing<br/>3 = Processed<br/>4 = Failed
         */
        CreationStatus /* int32 */;
    }
    /**
     * getVoucherBrandsRequest
     */
    export interface GetVoucherBrandsRequest {
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * getVoucherBrandsResponse
     */
    export interface GetVoucherBrandsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* brandVoucherResponse */ BrandVoucherResponse[] | null;
    }
    /**
     * getVoucherCountriesRequest
     */
    export interface GetVoucherCountriesRequest {}
    /**
     * getVoucherCountriesResponse
     */
    export interface GetVoucherCountriesResponse {
        /**
         * list1
         */
        countries?: string[] | null;
        /**
         * string
         */
        message?: string | null;
        /**
         * boolean
         */
        isSuccess?: boolean;
    }
    /**
     * getVoucherTransactionRequest
     */
    export interface GetVoucherTransactionRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        transactionId?: string; // objectId
    }
    /**
     * hasAffiliateLinksRequest
     */
    export interface HasAffiliateLinksRequest {
        /**
         * list1
         * Product ids for check affiliate links
         */
        productIds?: string /* objectId */[] | null;
    }
    /**
     * hasAffiliateLinksResponse
     */
    export interface HasAffiliateLinksResponse {
        /**
         * list1
         * Product ids which has affiliate links
         */
        productIds?: string /* objectId */[] | null;
    }
    /**
     * IWOMScoreEngagement
     */
    export interface IWOMScoreEngagement {
        /**
         * nullable1
         */
        authenticity?: number | null; // double
        /**
         * nullable1
         */
        creativity?: number | null; // double
        /**
         * nullable1
         */
        positivity?: number | null; // double
    }
    /**
     * identityType
     */
    export type IdentityType = 0 | 1 | 2 | 3; // int32
    /**
     * initializeWebRecorderRequest
     */
    export interface InitializeWebRecorderRequest {
        /**
         * string
         */
        organizationPublicId?: string | null;
        remoteProduct?: /* remoteProductDescription */ RemoteProductDescription;
    }
    /**
     * initializeWebRecorderResponse
     */
    export interface InitializeWebRecorderResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        productId?: string; // objectId
        /**
         * boolean
         */
        isCreatedNew?: boolean;
    }
    /**
     * joinTeamRequest
     */
    export interface JoinTeamRequest {
        /**
         * nullable1
         * Id of the team which should be joined. If set, UrlName will be ignored.
         * example:
         * 000000000000000000000000
         */
        id?: string | null; // objectId
        /**
         * string
         * Url name of the team which should be joined.
         */
        urlName?: string | null;
    }
    /**
     * jwtTokenResponse
     */
    export interface JwtTokenResponse {
        /**
         * string
         */
        token?: string | null;
    }
    /**
     * leaveTeamRequest
     */
    export interface LeaveTeamRequest {
        /**
         * objectId
         * Id if the team to leave.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * location
     */
    export interface Location {
        /**
         * string
         */
        countryCode?: string | null;
        /**
         * string
         */
        countryName?: string | null;
        area?: /* area */ Area;
        /**
         * string
         */
        ip?: string | null;
        /**
         * int64
         */
        ipNumber?: number; // int64
    }
    /**
     * logLevel
     * <br/><br/>Values:<br/>0 = Trace<br/>1 = Debug<br/>2 = Information<br/>3 = Warning<br/>4 = Error<br/>5 = Critical<br/>6 = None
     */
    export type LogLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6; // int32
    /**
     * marketingStatisticsResponse
     */
    export interface MarketingStatisticsResponse {
        /**
         * int32
         */
        verifiedUserCount?: number; // int32
        /**
         * int32
         */
        phoneVerifiedUserCount?: number; // int32
        /**
         * int32
         */
        notVerifiedUserCount?: number; // int32
        /**
         * int32
         */
        videoCount?: number; // int32
        /**
         * int32
         */
        rejectedVideoCount?: number; // int32
        /**
         * int32
         */
        unProcessedVideoCount?: number; // int32
        /**
         * int32
         */
        commentCount?: number; // int32
        /**
         * int32
         */
        viewCount?: number; // int32
        /**
         * int32
         */
        shareCount?: number; // int32
    }
    /**
     * messageResponseBase
     */
    export interface MessageResponseBase {
        /**
         * string
         */
        message?: string | null;
        /**
         * boolean
         */
        isSuccess?: boolean;
    }
    /**
     * mobileNumberValidity
     * <br/><br/>Values:<br/>0 = Exists<br/>1 = NotFoundInSystem<br/>-2 = PendingVerification<br/>-1 = InvalidFormat
     */
    export type MobileNumberValidity = 0 | 1 | -2 | -1; // int32
    /**
     * notificationItemResponse
     */
    export interface NotificationItemResponse {
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * string
         */
        type?: string | null;
        /**
         * string
         */
        receiverUserId?: string | null;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        receiverNetworkId?: string; // objectId
        /**
         * boolean
         */
        isImportant?: boolean;
        /**
         * list1
         */
        arguments?: string[] | null;
        /**
         * dictionary2
         */
        keys?: {
            [name: string]: string;
        } | null;
    }
    /**
     * notificationsResponse
     */
    export interface NotificationsResponse {
        /**
         * list1
         */
        items?: /* notificationItemResponse */ NotificationItemResponse[] | null;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        maxId?: string; // objectId
    }
    /**
     * playlistSingleVideoResponse
     */
    export interface PlaylistSingleVideoResponse {
        /**
         * objectId
         * [OBSOLETE] Will be removed when front-end is switched to PrimaryProduct field.
         * Id of the primary product. It should reference the product which is already stored in the YEAY database.
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        /**
         * list1
         * [OBSOLETE] Will be removed when front-end is switched to PrimaryProduct field.
         * Ids of the secondary products. Each product should be already stored in the YEAY database.
         */
        secondaryProductIds?: string /* objectId */[] | null;
        /**
         * list1
         * Secondary products information.
         */
        secondaryProducts?: /* topicResponse */ TopicResponse[] | null;
        /**
         * list1
         * Secondary products information.
         */
        comments?: /* commentsResponse */ CommentsResponse[] | null;
        /**
         * objectId
         * The id of the video.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * The id of the video owner.
         * example:
         * 000000000000000000000000
         */
        ownerId?: string; // objectId
        /**
         * string
         * Link to user's profile image.
         */
        profileImageUrl?: string | null;
        /**
         * string
         * User's full name.
         */
        username?: string | null;
        /**
         * boolean
         * True if user is trusted
         */
        isTrusted?: boolean;
        /**
         * string
         * The title of the video.
         */
        title?: string | null;
        /**
         * string
         * The url for video download.
         */
        videoDownloadUrl?: string | null;
        /**
         * string
         * The brief description of the video.
         */
        subtitle?: string | null;
        primaryProduct?: /* topicResponse */ TopicResponse;
        /**
         * languageInfo
         * List of languages which are spoken in this video. Empty array means that video is not language specific and can be targeted to all users.
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * tags
         * List of video hash tags.
         */
        hashTags?: string /* string */[] | null;
        meta?: /* videoDetailsMeta */ VideoDetailsMeta;
        streaming?: /* videoDetailsResponse */ VideoDetailsResponse;
        engagement?: /* videoDetailsEngagement */ VideoDetailsEngagement;
        /**
         * boolean
         * True if the video can be exclusive and can not be validated.
         */
        isWithoutValidation?: boolean;
        engagementUser?: /* playlistVideoUserEngagement */ PlaylistVideoUserEngagement;
        videoTeamExclusivityInfo?: /* videoExclusivityResponse */ VideoExclusivityResponse;
        /**
         * string
         */
        productLink?: string | null;
        /**
         * boolean
         * Owner of video is followed or not.
         */
        isFollowed?: boolean;
    }
    /**
     * playlistVideoResponse
     */
    export interface PlaylistVideoResponse {
        /**
         * list1
         * Ids of the secondary products. Each product should be already stored in the YEAY database.
         */
        secondaryProductIds?: string /* objectId */[] | null;
        /**
         * list1
         * Secondary products information.
         */
        secondaryProducts?: /* topicResponse */ TopicResponse[] | null;
        /**
         * list1
         * Secondary products information.
         */
        comments?: /* commentsResponse */ CommentsResponse[] | null;
        /**
         * objectId
         * The id of the video.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * The id of the video owner.
         * example:
         * 000000000000000000000000
         */
        ownerId?: string; // objectId
        /**
         * string
         * Link to user's profile image.
         */
        profileImageUrl?: string | null;
        /**
         * string
         * User's full name.
         */
        username?: string | null;
        /**
         * boolean
         * True if user is trusted
         */
        isTrusted?: boolean;
        /**
         * string
         * The title of the video.
         */
        title?: string | null;
        /**
         * string
         * The url for video download.
         */
        videoDownloadUrl?: string | null;
        /**
         * string
         * The brief description of the video.
         */
        subtitle?: string | null;
        /**
         * objectId
         * [OBSOLETE] Will be removed when front-end is switched to PrimaryProduct field.
         * Id of the primary product. It should reference the product which is already stored in the Bullz database.
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        primaryProduct?: /* topicResponse */ TopicResponse;
        /**
         * languageInfo
         * List of languages which are spoken in this video. Empty array means that video is not language specific and can be targeted to all users.
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * tags
         * List of video hash tags.
         */
        hashTags?: string /* string */[] | null;
        meta?: /* videoDetailsMeta */ VideoDetailsMeta;
        streaming?: /* videoDetailsResponse */ VideoDetailsResponse;
        engagement?: /* videoDetailsEngagement */ VideoDetailsEngagement;
        /**
         * boolean
         * True if the video can be exclusive and can not be validated.
         */
        isWithoutValidation?: boolean;
        engagementUser?: /* playlistVideoUserEngagement */ PlaylistVideoUserEngagement;
        videoTeamExclusivityInfo?: /* videoExclusivityResponse */ VideoExclusivityResponse;
        /**
         * string
         */
        productLink?: string | null;
        /**
         * boolean
         * Owner of video is followed or not.
         */
        isFollowed?: boolean;
    }
    /**
     * playlistVideoUserEngagement
     */
    export interface PlaylistVideoUserEngagement {
        /**
         * boolean
         * Indicates whether user has liked the video.
         */
        isLiked?: boolean;
        /**
         * boolean
         * Indicates whether user has saved the video.
         */
        isSaved?: boolean;
        womGrades?: /* IWOMScoreEngagement */ IWOMScoreEngagement;
    }
    /**
     * postBodyType
     * <br/><br/>Values:<br/>0 = Undefined<br/>1 = PlainText<br/>2 = Html
     */
    export type PostBodyType = 0 | 1 | 2; // int32
    /**
     * previewDetails
     */
    export interface PreviewDetails {
        data?: /* previewDetailsData */ PreviewDetailsData;
        status?: /**
         * creationStatus
         * <br/><br/>Values:<br/>0 = None<br/>1 = NotCreated<br/>2 = Processing<br/>3 = Processed<br/>4 = Failed
         */
        CreationStatus /* int32 */;
    }
    /**
     * previewDetailsData
     */
    export interface PreviewDetailsData {
        /**
         * string
         */
        url?: string | null;
        /**
         * timeSpan
         * example:
         * 0
         */
        duration?: number; // int64
    }
    /**
     * previewDetailsMp4
     */
    export interface PreviewDetailsMp4 {
        /**
         * boolean
         * Info has been received from CloudFlare.
         */
        isReady?: boolean;
        details?: /* previewDetails */ PreviewDetails;
    }
    /**
     * productInfo
     */
    export interface ProductInfo {
        /**
         * string
         */
        productImage?: string | null;
        /**
         * string
         */
        productDescription?: string | null;
        /**
         * string
         */
        howToUse?: string | null;
        /**
         * string
         */
        termsAndConditions?: string | null;
        /**
         * string
         */
        expiryAndValidity?: string | null;
        /**
         * string
         */
        brandName?: string | null;
        /**
         * string
         */
        countryName?: string | null;
    }
    /**
     * productResponseLegacy
     */
    export interface ProductResponseLegacy {
        /**
         * objectId
         * The Id of the product.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * list1
         * Product UPC.
         */
        upcCodes?: string[] | null;
        /**
         * string
         * User specified name of the product.
         */
        name?: string | null;
        /**
         * string
         * Product description.
         */
        description?: string | null;
        /**
         * string
         * Product OrganizationViewer name.
         */
        brand?: string | null;
        /**
         * string
         * Product color.
         */
        color?: string | null;
        /**
         * list1
         * Array of product features.
         */
        features?: string[] | null;
        /**
         * list1
         * List of product categories.
         */
        category?: string[] | null;
        /**
         * tags
         * Product hash tags.
         */
        hashTags?: string /* string */[] | null;
        /**
         * string
         * The URL of product image.
         */
        imageUrl?: string | null;
    }
    /**
     * promoteVideoRequest
     */
    export interface PromoteVideoRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * boolean
         */
        isPromoted?: boolean;
    }
    /**
     * promoteVideoResponse
     */
    export interface PromoteVideoResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * boolean
         */
        isPromoted?: boolean;
    }
    /**
     * putManagedProductRequest
     */
    export interface PutManagedProductRequest {
        /**
         * objectId
         * The Id of the product.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * User specified name of the product.
         */
        name?: string | null;
        /**
         * string
         * Product description.
         */
        description?: string | null;
        /**
         * string
         * Product OrganizationViewer name.
         */
        brand?: string | null;
        /**
         * string
         * Product color.
         */
        color?: string | null;
        /**
         * list1
         * Array of product features.
         */
        features?: string[] | null;
        /**
         * list1
         * List of product categories.
         */
        category?: string[] | null;
        /**
         * tags
         * Product hash tags.
         */
        hashTags?: string /* string */[] | null;
        /**
         * list1
         * Product UPC.
         */
        upcCodes?: string[] | null;
        /**
         * string
         * The URL of product image.
         */
        brandImageUrl?: string | null;
        /**
         * nullable1
         * The Id of the primary product image.
         * example:
         * 000000000000000000000000
         */
        primaryImageId?: string | null; // objectId
    }
    /**
     * putManagedProductResponse
     */
    export interface PutManagedProductResponse {
        /**
         * dictionary2
         * The dictionary of locale string to affiliate link id.
         */
        affiliateLinkLocaleIds?: {
            [name: string]: string; // objectId
        } | null;
        /**
         * nullable1
         * The id of default affiliate link of the product.
         * example:
         * 000000000000000000000000
         */
        affiliateLinkIdDefault?: string | null; // objectId
        /**
         * string
         */
        brandImageUrl?: string | null;
        /**
         * nullable1
         * The Id of the primary image of the product.
         * example:
         * 000000000000000000000000
         */
        primaryImageId?: string | null; // objectId
        /**
         * objectId
         * The Id of the product.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * list1
         * Product UPC.
         */
        upcCodes?: string[] | null;
        /**
         * string
         * User specified name of the product.
         */
        name?: string | null;
        /**
         * string
         * Product description.
         */
        description?: string | null;
        /**
         * string
         * Product OrganizationViewer name.
         */
        brand?: string | null;
        /**
         * string
         * Product color.
         */
        color?: string | null;
        /**
         * list1
         * Array of product features.
         */
        features?: string[] | null;
        /**
         * list1
         * List of product categories.
         */
        category?: string[] | null;
        /**
         * tags
         * Product hash tags.
         */
        hashTags?: string /* string */[] | null;
    }
    /**
     * queryAdminPromotionRequest
     */
    export interface QueryAdminPromotionRequest {
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryAdminPromotionResponse
     */
    export interface QueryAdminPromotionResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getAdminPromotionResponse */ GetAdminPromotionResponse[] | null;
    }
    /**
     * queryAdminTeamsRequest
     */
    export interface QueryAdminTeamsRequest {
        /**
         * string
         */
        teamName?: string | null;
        /**
         * string
         */
        teamLeaderUsername?: string | null;
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        teamId?: string | null; // objectId
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        teamLeaderId?: string | null; // objectId
        /**
         * nullable1
         */
        sortByMemberCountAsc?: boolean | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryAdminTeamsResponse
     */
    export interface QueryAdminTeamsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getAdminTeamsResponse */ GetAdminTeamsResponse[] | null;
    }
    /**
     * queryAffiliateProductsByVideoIdRequest
     */
    export interface QueryAffiliateProductsByVideoIdRequest {
        /**
         * objectId
         * The Id of the video.
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
    }
    /**
     * queryAffiliateProductsByVideoIdResponse
     */
    export interface QueryAffiliateProductsByVideoIdResponse {
        primaryProduct?: /* topicResponse */ TopicResponse;
        /**
         * list1
         * Secondary products information.
         */
        secondaryProducts?: /* topicResponse */ TopicResponse[] | null;
    }
    /**
     * queryAllUsersRequest
     */
    export interface QueryAllUsersRequest {
        /**
         * string
         * Regex for search users by username.
         */
        username?: string | null;
        /**
         * string
         * Return the user by email address (fuzzy match).
         */
        email?: string | null;
        /**
         * string
         * Return the user by mobile phone number
         */
        mobileNumber?: string | null;
        /**
         * nullable1
         * True if only trusted users have to be returned otherwise false.
         */
        isTrusted?: boolean | null;
        /**
         * nullable1
         * Sorts the users by latest active. Null to not apply the sort.
         */
        sortByActivityAsc?: boolean | null;
        /**
         * string
         * Filter by user role.
         */
        role?: string | null;
        /**
         * cultureInfo
         * Filter by user locale
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * countryInfo
         * Filter user by Country
         * example:
         * string
         */
        country?: string | null; // string
        /**
         * string
         * Filter user by Region
         */
        region?: string | null;
        /**
         * string
         * Sorts the results by field ascending (UtcCreated+asc) or descending (UtcCreated+desc).<br />
         * Supported fields: UtcCreated, UtcLastAuthentication, UtcUpdated.
         */
        sortByField?: string | null;
        /**
         * dateTime
         * Filter users created/updated/lastAuthenticated after this time.
         */
        fromUtcDateTime?: string; // date-time
        /**
         * dateTime
         * Filter users created/updated/lastAuthenticated before this time.
         */
        toUtcDateTime?: string; // date-time
        /**
         * string
         * Filter the results by date field.<br />
         * Supported fields: UtcCreated, UtcLastAuthentication, UtcUpdated.
         */
        filterByDate?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryAllVideosRequest
     * Allows filtering videos using AND logic. If the field is null then it's not used for filtering.
     */
    export interface QueryAllVideosRequest {
        /**
         * string
         * Search for videos which title, subtitle or owner username contains specified text.
         */
        searchText?: string | null;
        /**
         * nullable1
         * Search videos by creator id.
         * example:
         * 000000000000000000000000
         */
        creatorId?: string | null; // objectId
        /**
         * nullable1
         * Search videos by facilitator id.
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string | null; // objectId
        /**
         * nullable1
         * Filter videos by 'reported' state.
         */
        isReported?: boolean | null;
        /**
         * nullable1
         * Filter videos by 'reported' state.
         */
        isDeleted?: boolean | null;
        /**
         * nullable1
         * Filter videos by HLS stream.
         */
        hasHlsStream?: boolean | null;
        /**
         * nullable1
         * Filter videos by created date time. Return videos created after this time.
         */
        fromCreatedDateTime?: string | null; // date-time
        /**
         * nullable1
         * Filter videos by created date time. Return videos created before this time.
         */
        toCreatedDateTime?: string | null; // date-time
        videoCurationState?: /**
         * videoCurationState
         * <br/><br/>Values:<br/>0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
         */
        VideoCurationState /* int32 */;
        womValidationResult?: /**
         * womVideoValidationStatus
         * Video validation status which comes from WOM side.<br/><br/>Values:<br/>0 = NotProcessed<br/>1 = Accepted<br/>2 = Processing<br/>-1 = Rejected
         */
        WomVideoValidationStatus /* int32 */;
        womValidationStage?: /**
         * validationStage
         * <br/><br/>Values:<br/>0 = NotStarted<br/>1 = Processing<br/>2 = Ended<br/>3 = Held
         */
        ValidationStage /* int32 */;
        womEndedReason?: /**
         * validationEndedReason
         * <br/><br/>Values:<br/>0 = None<br/>1 = CompletedNormally<br/>2 = ConsensusNotReached<br/>3 = TerminatedInHold<br/>4 = Deleted
         */
        ValidationEndedReason /* int32 */;
        /**
         * string
         * Searches for videos which primary product brand field contains specified text.
         */
        brandText?: string | null;
        /**
         * string
         * Sorts the results by field ascending (likes+asc) or descending (views+desc).<br />
         * Supported fields: likes, views, saves, shares, womValidationDate, yeayValidationDate.
         */
        sort?: string | null;
        /**
         * nullable1
         * Filter videos by 'trusted' state.
         */
        isTrusted?: boolean | null;
        /**
         * tags
         * Return documents that match any of these tags
         */
        tagsAny?: string /* string */[] | null;
        /**
         * tags
         * Return documents that contain all of these tags
         */
        tagsAll?: string /* string */[] | null;
        /**
         * cultureInfo
         * Filter video by locale.
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * countryInfo
         * Filter video by country
         * example:
         * string
         */
        country?: string | null; // string
        /**
         * string
         * Filter video by region
         */
        region?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryAllVideosResponse
     */
    export interface QueryAllVideosResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* adminGetVideoResponse */ AdminGetVideoResponse[] | null;
    }
    /**
     * queryBlacklistedUsersRequest
     */
    export interface QueryBlacklistedUsersRequest {
        type?: /* identityType */ IdentityType /* int32 */;
        /**
         * string
         * Search the user by email address/ mobileNumber or username (fuzzy match).
         */
        searchText?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryBlacklistedUsersResponse
     */
    export interface QueryBlacklistedUsersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getBlacklistedUsersResponse */ GetBlacklistedUsersResponse[] | null;
    }
    /**
     * queryDeletedUsersRequest
     */
    export interface QueryDeletedUsersRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        deletedUserId?: string | null; // objectId
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        deleterUserId?: string | null; // objectId
        /**
         * nullable1
         */
        fromUtcDeleted?: string | null; // date-time
        /**
         * nullable1
         */
        toUtcDeleted?: string | null; // date-time
        /**
         * list1
         */
        deletionReasons?: /* userDeletionReason */ UserDeletionReason /* int32 */[] | null;
        /**
         * string
         */
        email?: string | null;
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryDeletedUsersResponse
     */
    export interface QueryDeletedUsersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* deletedUserResponse */ DeletedUserResponse[] | null;
    }
    /**
     * queryDisabledUsersRequest
     */
    export interface QueryDisabledUsersRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        disabledUserId?: string | null; // objectId
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        disablerUserId?: string | null; // objectId
        /**
         * nullable1
         */
        fromUtcDisabled?: string | null; // date-time
        /**
         * nullable1
         */
        toUtcDisabled?: string | null; // date-time
        /**
         * list1
         * Values:
         * 0 = None
         * 1 = Spamming
         * 2 = Copyright
         * 3 = Inappropriate
         * 4 = Collusion
         * 5 = FakeAccount
         * 6 = Requested
         */
        disablingReasons?: /* userDisablingReason */ UserDisablingReason /* int32 */[] | null;
        /**
         * string
         */
        email?: string | null;
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryDisabledUsersResponse
     */
    export interface QueryDisabledUsersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* adminGetUserCommon */ AdminGetUserCommon[] | null;
    }
    /**
     * queryEnabledUsersRequest
     */
    export interface QueryEnabledUsersRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        enabledUserId?: string | null; // objectId
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        enablerUserId?: string | null; // objectId
        /**
         * nullable1
         */
        fromUtcEnabled?: string | null; // date-time
        /**
         * nullable1
         */
        toUtcEnabled?: string | null; // date-time
        /**
         * string
         */
        email?: string | null;
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryEnabledUsersResponse
     */
    export interface QueryEnabledUsersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* adminGetUserCommon */ AdminGetUserCommon[] | null;
    }
    /**
     * queryEngagementEmitterResponse
     */
    export interface QueryEngagementEmitterResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getEngagementEmitterResponse */ GetEngagementEmitterResponse[] | null;
    }
    /**
     * queryEngagementEmittersRequest
     */
    export interface QueryEngagementEmittersRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        emitId?: string | null; // objectId
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        videoId?: string | null; // objectId
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * nullable1
         */
        fromUtcCreated?: string | null; // date-time
        /**
         * nullable1
         */
        toUtcCreated?: string | null; // date-time
        /**
         * boolean
         */
        isActive?: boolean;
        /**
         * boolean
         */
        isPast?: boolean;
        /**
         * string
         */
        sort?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryFacilitatorInfoResponse
     */
    export interface QueryFacilitatorInfoResponse {
        /**
         * objectId
         * The id of the facilitator.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         * Facilitator's username.
         */
        username?: string | null;
        /**
         * string
         * Facilitator's first name.
         */
        firstName?: string | null;
        /**
         * string
         * Facilitator's last name.
         */
        lastName?: string | null;
    }
    /**
     * queryFacilitatorsListRequest
     */
    export interface QueryFacilitatorsListRequest {
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryFacilitatorsListResponse
     */
    export interface QueryFacilitatorsListResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* queryFacilitatorInfoResponse */ QueryFacilitatorInfoResponse[] | null;
    }
    /**
     * queryFollowedHashTagResponseItem
     */
    export interface QueryFollowedHashTagResponseItem {
        /**
         * tag
         * example:
         * string
         */
        hashTag?: string; // string
    }
    /**
     * queryFollowedHashTagsRequest
     */
    export interface QueryFollowedHashTagsRequest {
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryFollowedUserResponse
     */
    export interface QueryFollowedUserResponse {
        /**
         * objectId
         * The user's id.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         * The user's username if it exists.
         */
        username?: string | null;
        /**
         * string
         * The user's profile image if it exists.
         */
        profileImageUrl?: string | null;
        /**
         * boolean
         * True if user are trusted
         */
        isTrusted?: boolean;
        /**
         * string
         * The user's bio text.
         */
        bio?: string | null;
        /**
         * int32
         * Count user's video.
         */
        videoCount?: number; // int32
        /**
         * dateTime
         * Start follow date.
         */
        utcFollowedAt?: string; // date-time
        /**
         * boolean
         * True if current user follow the user
         */
        isFollowed?: boolean;
    }
    /**
     * queryFollowedUsersRequest
     */
    export interface QueryFollowedUsersRequest {
        /**
         * nullable1
         * The id of the user which following need to get
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryFollowedUsersResponse
     */
    export interface QueryFollowedUsersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* queryFollowedUserResponse */ QueryFollowedUserResponse[] | null;
    }
    /**
     * queryFollowerResponse
     */
    export interface QueryFollowerResponse {
        /**
         * objectId
         * The user's id.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         * The user's username if it exists.
         */
        username?: string | null;
        /**
         * string
         * The user's profile image if it exists.
         */
        profileImageUrl?: string | null;
        /**
         * boolean
         * True if user are trusted
         */
        isTrusted?: boolean;
        /**
         * string
         * The user's bio text.
         */
        bio?: string | null;
        /**
         * int32
         * Count user's video.
         */
        videoCount?: number; // int32
        /**
         * dateTime
         * Start follow date.
         */
        utcFollowedAt?: string; // date-time
        /**
         * boolean
         * True if current user follow the user
         */
        isFollowed?: boolean;
    }
    /**
     * queryFollowersRequest
     */
    export interface QueryFollowersRequest {
        /**
         * nullable1
         * The id of the user which followers need to get
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryFollowersResponse
     */
    export interface QueryFollowersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* queryFollowerResponse */ QueryFollowerResponse[] | null;
    }
    /**
     * queryFollowingHashTagsResponse
     */
    export interface QueryFollowingHashTagsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* queryFollowedHashTagResponseItem */ QueryFollowedHashTagResponseItem[] | null;
    }
    /**
     * queryManagedProductRequest
     * AND logic is used is multiple search filters are not null.
     */
    export interface QueryManagedProductRequest {
        /**
         * string
         * Search by "Name" field. Null if this field is not used in search.
         */
        name?: string | null;
        /**
         * string
         * Search by "Brand" field. Null if this field is not used in search.
         */
        brand?: string | null;
        /**
         * string
         * Search by "Name" and "Brand" field. Null if this field is not used in search.
         */
        nameBrand?: string | null;
        /**
         * nullable1
         * If set to true, returns products which Brand is not null. If set to Null, this field is not used in search.
         */
        isBrandSet?: boolean | null;
        /**
         * nullable1
         * If set to true, returns products which are referenced by videos more than 0 time. If set to Null, this field is not used in search.
         */
        isReferenced?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) brand name.
         */
        sortByBrandAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) product name.
         */
        sortByNameAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) video references count.
         */
        sortByVideoReferenceCountAsc?: boolean | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryManagedProductResponse
     */
    export interface QueryManagedProductResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getManagedProductResponse */ GetManagedProductResponse[] | null;
    }
    /**
     * queryMembersRequest
     */
    export interface QueryMembersRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        teamId?: string; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryMembersResponse
     */
    export interface QueryMembersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* teamMemberResponse */ TeamMemberResponse[] | null;
    }
    /**
     * queryNotificationsRequest
     */
    export interface QueryNotificationsRequest {
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryNotificationsResponse
     */
    export interface QueryNotificationsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* notificationItemResponse */ NotificationItemResponse[] | null;
    }
    /**
     * queryPlaylistByCreatorRequest
     */
    export interface QueryPlaylistByCreatorRequest {
        /**
         * nullable1
         * The id of the creator which public video should be returned.
         * example:
         * 000000000000000000000000
         */
        creatorId?: string | null; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryPlaylistVideosRequest
     */
    export interface QueryPlaylistVideosRequest {
        /**
         * nullable1
         * The id of the creator which public video should be returned.
         * example:
         * 000000000000000000000000
         */
        byCreatorId?: string | null; // objectId
        /**
         * nullable1
         * The id of the team which public video should be returned.
         * example:
         * 000000000000000000000000
         */
        byTeamId?: string | null; // objectId
        /**
         * string
         * Filter playlist by a hashtag.
         */
        byHashtag?: string | null;
        /**
         * nullable1
         * Filter playlist by a primary product.
         * example:
         * 000000000000000000000000
         */
        byProductId?: string | null; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryPlaylistVideosResponse
     */
    export interface QueryPlaylistVideosResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* playlistVideoResponse */ PlaylistVideoResponse[] | null;
    }
    /**
     * queryPostsRequest
     */
    export interface QueryPostsRequest {
        /**
         * objectId
         * Id of the video
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryPostsResponse
     */
    export interface QueryPostsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getPostResponse */ GetPostResponse[] | null;
    }
    /**
     * queryRepliesRequest
     */
    export interface QueryRepliesRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        postId?: string; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryReportedPostsRequest
     */
    export interface QueryReportedPostsRequest {
        /**
         * nullable1
         * Id of the video. Could be null
         * example:
         * 000000000000000000000000
         */
        threadId?: string | null; // objectId
        /**
         * nullable1
         * Id of the user. Could be null
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * querySavedVideosRequest
     */
    export interface QuerySavedVideosRequest {
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * querySavedVideosResponse
     */
    export interface QuerySavedVideosResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* playlistVideoResponse */ PlaylistVideoResponse[] | null;
    }
    /**
     * querySearchRequest
     */
    export interface QuerySearchRequest {
        /**
         * string
         * Text for search. (@ - users, # - hashtags, empty or null - all)
         */
        searchText?: string | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * querySearchResponse
     */
    export interface QuerySearchResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* searchResponse */ SearchResponse[] | null;
    }
    /**
     * queryTeamVideosRequest
     */
    export interface QueryTeamVideosRequest {
        /**
         * objectId
         * Id of the team which info should be received. If set, UrlName will be ignored.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryTeamVideosResponse
     */
    export interface QueryTeamVideosResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* teamVideoResponse */ TeamVideoResponse[] | null;
    }
    /**
     * queryTeamsRequest
     */
    export interface QueryTeamsRequest {
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryTeamsResponse
     */
    export interface QueryTeamsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getTeamResponse */ GetTeamResponse[] | null;
    }
    /**
     * queryTopicsRequest
     */
    export interface QueryTopicsRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        brandId?: string | null; // objectId
        /**
         * string
         * Search by "Name" field. Null if this field is not used in search.
         */
        name?: string | null;
        /**
         * string
         * Search by "BrandName" field. Null if this field is not used in search.
         */
        brandName?: string | null;
        /**
         * nullable1
         * If set to true, returns products which Brand is not null. If set to Null, this field is not used in search.
         */
        isBrandSet?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) brand name.
         */
        sortByBrandAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) product name.
         */
        sortByNameAsc?: boolean | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryTrendingOverridesRequest
     */
    export interface QueryTrendingOverridesRequest {
        type?: /**
         * trendingType
         * <br/><br/>Values:<br/>0 = None<br/>100 = Tag<br/>200 = Video<br/>300 = User
         */
        TrendingType /* int32 */;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryTrendingOverridesResponse
     */
    export interface QueryTrendingOverridesResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getTrendingOverridesResponse */ GetTrendingOverridesResponse[] | null;
    }
    /**
     * queryUploadedVideosRequest
     */
    export interface QueryUploadedVideosRequest {
        videoType?: /**
         * uploadedVideoType
         * <br/><br/>Values:<br/>0 = Uploaded<br/>1 = Live<br/>-1 = Failed
         */
        UploadedVideoType /* int32 */;
        /**
         * nullable1
         * If true, apply Reported filter. Null if filter should not be applied. False - reserved.
         * <remarks>
         *     The exact reason of the video being reported is not taken into account.
         * </remarks>
         */
        isReported?: boolean | null;
        /**
         * nullable1
         * If true, apply Uploaded filter. Null if filter should not be applied. False - reserved.
         */
        isUploaded?: boolean | null;
        /**
         * nullable1
         * If true, apply Failed filter. Null if filter should not be applied. False - reserved.
         */
        isFailed?: boolean | null;
        /**
         * nullable1
         * If true, apply Live filter. Null if filter should not be applied. False - reserved.
         */
        isLive?: boolean | null;
        filterLogic?: /**
         * filterLogic
         * <br/><br/>Values:<br/>0 = And<br/>1 = Or
         */
        FilterLogic /* int32 */;
        /**
         * nullable1
         * The user's unique identifier, optional. If not specified the current caller's userid will be used.
         * <remarks>
         *     Only admin can query videos having different user ids specified. 'Registered' user can only call with his user
         *     id or empty field.
         * </remarks>
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryUploadedVideosResponse
     */
    export interface QueryUploadedVideosResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* getVideoDetailsResponse */ GetVideoDetailsResponse[] | null;
    }
    /**
     * queryUsersResponse
     */
    export interface QueryUsersResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* adminGetUserCommon */ AdminGetUserCommon[] | null;
    }
    /**
     * queryVideoStatisticsRequest
     * This will help to get video-event aggregation statistics by quering on event streams by passing UserId/VideoId to track the suspicious activities
     */
    export interface QueryVideoStatisticsRequest {
        /**
         * nullable1
         * Filter event aggregation statistics by passing UserId
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * nullable1
         * Filter event aggregation statistics by passing VideoId
         * example:
         * 000000000000000000000000
         */
        videoId?: string | null; // objectId
        /**
         * dateTime
         * Filter event aggregation statistics by created date time. Return statistics created after this time.
         */
        utcStart?: string; // date-time
        /**
         * dateTime
         * Filter event aggregation statistics by created date time. Return statistics created before this time.
         */
        utcEnd?: string; // date-time
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) on UserId.
         */
        sortByUserIdAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) on VideoId.
         */
        sortByVideoIdAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) by created datetime.
         */
        sortByUtcCreatedAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) by likeCounts.
         */
        sortByLikeCountAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) by shareCounts.
         */
        sortByShareCountAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) by commentCounts.
         */
        sortByCommentCountAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) by saveCounts.
         */
        sortBySaveCountAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) by clickCounts.
         */
        sortByClickCountAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) by viewCounts.
         */
        sortByViewCountAsc?: boolean | null;
        /**
         * nullable1
         * Sorts the results by either ascending (true) or descending (false) by totalCounts.
         */
        sortByTotalCountAsc?: boolean | null;
        /**
         * nullable1
         * Filter event aggregation statistics based on IsUserDisabled.
         */
        isUserDisabled?: boolean | null;
        /**
         * nullable1
         * Filter event aggregation statistics based on IsUserTrusted.
         */
        isUserTrusted?: boolean | null;
        /**
         * string
         * User's username.
         */
        username?: string | null;
        /**
         * nullable1
         * Filter event aggregation statistics based on IsvideoDeleted.
         */
        isVideoDeleted?: boolean | null;
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryVideoStatisticsResponse
     */
    export interface QueryVideoStatisticsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * dateTime
         * This is the start utc datetime that we have used to filter result
         */
        utcStart?: string; // date-time
        /**
         * dateTime
         * This is the end utc datetime that we have used to filter result
         */
        utcEnd?: string; // date-time
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* videoStatisticsResponse */ VideoStatisticsResponse[] | null;
    }
    /**
     * queryVideosByProductIdRequest
     */
    export interface QueryVideosByProductIdRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        productId?: string; // objectId
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryVideosByProductIdResponse
     */
    export interface QueryVideosByProductIdResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* adminGetProductVideoResponse */ AdminGetProductVideoResponse[] | null;
    }
    /**
     * queryVoucherStatisticsRequest
     */
    export interface QueryVoucherStatisticsRequest {
        /**
         * dateTime
         */
        utcStart?: string; // date-time
        /**
         * dateTime
         */
        utcEnd?: string; // date-time
        /**
         * boolean
         */
        groupByWeek?: boolean;
    }
    /**
     * queryVoucherStatisticsResponse
     */
    export interface QueryVoucherStatisticsResponse {
        /**
         * list1
         */
        items?: /* voucherStatisticsResponse */ VoucherStatisticsResponse[] | null;
    }
    /**
     * queryVoucherTransactionRequest
     */
    export interface QueryVoucherTransactionRequest {
        /**
         * int32
         */
        pageIndex: number; // int32
        /**
         * int32
         */
        limit: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * queryVoucherTransactionResponse
     */
    export interface QueryVoucherTransactionResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* voucherTransactionResponse */ VoucherTransactionResponse[] | null;
    }
    /**
     * registerAggregatedEventRequest
     */
    export interface RegisterAggregatedEventRequest {
        /**
         * objectId
         * The id of the video.
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * string
         * The Id of the client session. Better to be GUID.
         * TODO: make it required field when old clients are not supported.
         */
        sessionId?: string | null;
        /**
         * nullable1
         * True if the user has liked the video. False if has disliked. Null if like state should not be changed.
         */
        liked?: boolean | null;
        /**
         * nullable1
         * True if the user has viewed the video and this view should be counted. False or null if views count should not be changed.
         */
        viewed?: boolean | null;
        /**
         * nullable1
         * If Viewed set to true, positive value of this field means the view percentage of the video being watched.
         */
        viewDurationPercentage?: number | null; // double
        /**
         * nullable1
         * [OBSOLETE: Use SharedCount instead. Left for backward compatibility] True if the user has shared the video and this share should be counted. False or null if share count should not be changed.
         */
        shared?: boolean | null;
        /**
         * int32
         */
        shareCount?: number; // int32
        /**
         * nullable1
         * True if the user has saved the video. False if has not saved. Null if the save state should not be changed.
         */
        saved?: boolean | null;
        /**
         * nullable1
         * True if the user has clicked the video and this click should be counted. False or null if clicks count should not be changed.
         */
        clicked?: boolean | null;
        /**
         * nullable1
         * Authenticity grade (0..1). Null if not specified.
         */
        authenticity?: number | null; // double
        /**
         * nullable1
         * Creativity grade (0..1). Null if not specified.
         */
        creativity?: number | null; // double
        /**
         * nullable1
         * Positivity grade (0..1). Null if not specified.
         */
        positivity?: number | null; // double
    }
    /**
     * registerAggregatedEventResponse
     */
    export interface RegisterAggregatedEventResponse {}
    /**
     * remoteProductDescription
     */
    export interface RemoteProductDescription {
        /**
         * string
         */
        publicId?: string | null;
        /**
         * string
         */
        name?: string | null;
        /**
         * string
         */
        brand?: string | null;
        /**
         * string
         */
        url?: string | null;
        /**
         * string
         */
        imageUrl?: string | null;
    }
    /**
     * removeTeamMemberRequest
     */
    export interface RemoveTeamMemberRequest {
        /**
         * objectId
         * Id of the team.
         * example:
         * 000000000000000000000000
         */
        teamId?: string; // objectId
        /**
         * objectId
         * Id of user to be removed.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * boolean
         * True if user should be banned for this team.
         */
        isBanned?: boolean;
    }
    /**
     * removeTrendingOverridesRequest
     */
    export interface RemoveTrendingOverridesRequest {
        /**
         * objectId
         * Id of the trending document
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * reportPostRequest
     */
    export interface ReportPostRequest {
        /**
         * objectId
         * Id of the comment
         * example:
         * 000000000000000000000000
         */
        commentId?: string; // objectId
        reportedReason?: /**
         * commentReportedState
         * <br/><br/>Values:<br/>0 = None<br/>1 = Inappropriate<br/>2 = Violence<br/>3 = Harassment<br/>4 = Objectionable<br/>5 = Nudity
         */
        CommentReportedState /* int32 */;
    }
    /**
     * reportVideoRequest
     */
    export interface ReportVideoRequest {
        /**
         * objectId
         * The video being reported.
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        reason?: /**
         * videoReportedReasonRequest
         * <br/><br/>Values:<br/>0 = ContainsNudity<br/>1 = ContainsViolence<br/>2 = ContainsHarassment<br/>3 = ContentObjectionable<br/>4 = ContentInappropriate
         */
        VideoReportedReasonRequest /* int32 */;
        /**
         * boolean
         * Indicates whether the creator of the video should be considered by YEAY team for being blocked.
         */
        requestCreatorBlocking?: boolean;
    }
    /**
     * reportVideoResponse
     */
    export interface ReportVideoResponse {}
    /**
     * searchResponse
     */
    export interface SearchResponse {
        /**
         * string
         * Document title
         */
        title?: string | null;
        /**
         * boolean
         * True if user is trusted
         */
        isTrusted?: boolean;
        type?: /**
         * domainSearchKey
         * <br/><br/>Values:<br/>0 = None<br/>1 = User<br/>2 = Video<br/>3 = HashTag<br/>4 = Product<br/>5 = Topic
         */
        DomainSearchKey /* int32 */;
        /**
         * string
         * Additional information
         */
        description?: string | null;
        /**
         * string
         * Url for preview
         */
        thumbnailUrl?: string | null;
        /**
         * objectId
         * Id of parent document in collection
         * example:
         * 000000000000000000000000
         */
        entityId?: string; // objectId
        /**
         * nullable1
         * Reference count
         */
        referenceCount?: null | number; // int32
    }
    /**
     * sendForgottenPasswordSmsRequest
     */
    export interface SendForgottenPasswordSmsRequest {
        /**
         * string
         */
        mobileNumber?: string | null;
    }
    /**
     * sendForgottenPasswordSmsResponse
     */
    export interface SendForgottenPasswordSmsResponse {
        /**
         * boolean
         */
        isOk?: boolean;
    }
    /**
     * sendVerificationSmsRequest
     */
    export interface SendVerificationSmsRequest {
        /**
         * string
         */
        mobileNumber?: string | null;
    }
    /**
     * sendVerificationSmsResponse
     */
    export interface SendVerificationSmsResponse {
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * string
         */
        mobileNumberE164?: string | null;
    }
    /**
     * shortUserInfo
     */
    export interface ShortUserInfo {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         */
        userName?: string | null;
        /**
         * string
         */
        avatar?: string | null;
    }
    /**
     * simulatedDataRequest
     */
    export interface SimulatedDataRequest {
        /**
         * string
         * The target date, a random time of day will be used.
         */
        dateString?: string | null;
        /**
         * boolean
         * Generate video engagement
         */
        generateEngagement?: boolean;
        /**
         * nullable1
         * If specified, this video will be the target of this operation.
         * example:
         * 000000000000000000000000
         */
        videoId?: string | null; // objectId
        /**
         * int32
         * Amount of random videos to use for this operation.
         */
        videoCount?: number; // int32
        /**
         * int32
         * Amount of random users to use for this operation.
         */
        userCount?: number; // int32
    }
    /**
     * statisticsUserInfo
     */
    export interface StatisticsUserInfo {
        /**
         * string
         * The user's username if it exists.
         */
        username?: string | null;
        /**
         * nullable1
         * True if user is disabled
         */
        isDisabled?: boolean | null;
        /**
         * nullable1
         * True if user is trusted
         */
        isTrusted?: boolean | null;
    }
    /**
     * statisticsVideoInfo
     */
    export interface StatisticsVideoInfo {
        /**
         * nullable1
         * True if video is deleted
         */
        isDeleted?: boolean | null;
    }
    /**
     * submitVideoCurationRequest
     */
    export interface SubmitVideoCurationRequest {
        /**
         * objectId
         * Video Id.
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * boolean
         * True if video YEAY validation status should be set to Valid (the video will be displayed inside YEAY playlist).
         * False if video YEAY validation status should be set to Invalid (this video will not appear in YEAY network
         * playlist).
         */
        isApproved?: boolean;
        reason?: /**
         * curationEndedReason
         * Bullz video curation ended reason. Currently has only rejection reasons. May be extended to support acceptance reasons.<br/><br/>Values:<br/>0 = None<br/>1 = DeclineRequested<br/>2 = Inappropriate<br/>3 = GraphicContent<br/>4 = Violence<br/>5 = Copyright<br/>6 = TestVideo<br/>7 = IncorrectFormat<br/>8 = UserRequested<br/>9 = Other<br/>10 = NotProductRecommendation<br/>11 = WrongLanguage<br/>12 = QualityGuidelines
         */
        CurationEndedReason /* int32 */;
    }
    /**
     * submitVideoCurationResponse
     */
    export interface SubmitVideoCurationResponse {}
    /**
     * switchEmitterStateRequest
     */
    export interface SwitchEmitterStateRequest {
        /**
         * boolean
         */
        enabled?: boolean;
    }
    /**
     * teamInfoResponse
     */
    export interface TeamInfoResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        ownerId?: string; // objectId
        /**
         * string
         */
        ownerName?: string | null;
        /**
         * string
         */
        name?: string | null;
        /**
         * string
         */
        urlName?: string | null;
        /**
         * string
         */
        ownerProfileImageUrl?: string | null;
    }
    /**
     * teamMemberResponse
     */
    export interface TeamMemberResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         */
        username?: string | null;
        /**
         * boolean
         */
        isTrusted?: boolean;
        /**
         * string
         */
        profileImageUrl?: string | null;
        /**
         * int32
         */
        videoCount?: number; // int32
        /**
         * boolean
         */
        isFollowed?: boolean;
    }
    /**
     * teamOwnerInfoResponse
     */
    export interface TeamOwnerInfoResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        teamId?: string; // objectId
        /**
         * string
         */
        urlName?: string | null;
        /**
         * string
         */
        name?: string | null;
        /**
         * int64
         */
        membersCount?: number; // int64
    }
    /**
     * teamVideoResponse
     */
    export interface TeamVideoResponse {
        /**
         * objectId
         * The id of the video.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * The id of the video owner.
         * example:
         * 000000000000000000000000
         */
        ownerId?: string; // objectId
        /**
         * string
         * Link to user's profile image.
         */
        profileImageUrl?: string | null;
        /**
         * string
         * User's full name.
         */
        username?: string | null;
        /**
         * boolean
         * True if user is trusted
         */
        isTrusted?: boolean;
        /**
         * string
         * The title of the video.
         */
        title?: string | null;
        /**
         * string
         * The url for video download.
         */
        videoDownloadUrl?: string | null;
        /**
         * string
         * The brief description of the video.
         */
        subtitle?: string | null;
        /**
         * objectId
         * [OBSOLETE] Will be removed when front-end is switched to PrimaryProduct field.
         * Id of the primary product. It should reference the product which is already stored in the Bullz database.
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        primaryProduct?: /* topicResponse */ TopicResponse;
        /**
         * languageInfo
         * List of languages which are spoken in this video. Empty array means that video is not language specific and can be targeted to all users.
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * tags
         * List of video hash tags.
         */
        hashTags?: string /* string */[] | null;
        meta?: /* videoDetailsMeta */ VideoDetailsMeta;
        streaming?: /* videoDetailsResponse */ VideoDetailsResponse;
        engagement?: /* videoDetailsEngagement */ VideoDetailsEngagement;
        /**
         * boolean
         * True if the video can be exclusive and can not be validated.
         */
        isWithoutValidation?: boolean;
        engagementUser?: /* playlistVideoUserEngagement */ PlaylistVideoUserEngagement;
        videoTeamExclusivityInfo?: /* videoExclusivityResponse */ VideoExclusivityResponse;
        /**
         * string
         */
        productLink?: string | null;
        /**
         * boolean
         * Owner of video is followed or not.
         */
        isFollowed?: boolean;
    }
    /**
     * topicResponse
     */
    export interface TopicResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string | null;
        /**
         * string
         */
        description?: string | null;
        /**
         * tags
         */
        tags?: string /* string */[] | null;
        /**
         * string
         */
        link?: string | null;
        /**
         * string
         */
        imageUrl?: string | null;
        /**
         * boolean
         */
        hasAffiliateLink?: boolean;
    }
    /**
     * topicsResponse
     */
    export interface TopicsResponse {
        /**
         * dictionary2
         */
        queryStatistics?: {
            [name: string]: string;
        } | null;
        /**
         * int32
         */
        totalPages?: number; // int32
        /**
         * int32
         */
        currentPageIndex?: number; // int32
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: /* topicResponse */ TopicResponse[] | null;
    }
    /**
     * trendingType
     * <br/><br/>Values:<br/>0 = None<br/>100 = Tag<br/>200 = Video<br/>300 = User
     */
    export type TrendingType = 0 | 100 | 200 | 300; // int32
    /**
     * updateAdminPromotionRequest
     */
    export interface UpdateAdminPromotionRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * list1
         */
        userAgeRanges?: /* ageRange */ AgeRange[] | null;
        /**
         * list1
         */
        userGenders?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */[] | null;
        /**
         * list1
         */
        geoLocations?: string /* string */[] | null;
        /**
         * string
         */
        pageLocation?: string | null;
        /**
         * nullable1
         */
        isActive?: boolean | null;
    }
    /**
     * updateEngagementEmitterRequest
     */
    export interface UpdateEngagementEmitterRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * dateTime
         */
        utcStart?: string; // date-time
        /**
         * dateTime
         */
        utcEnd?: string; // date-time
        /**
         * int32
         */
        totalViews?: number; // int32
        /**
         * int32
         */
        totalShares?: number; // int32
        /**
         * int32
         */
        totalLikes?: number; // int32
    }
    /**
     * updatePostRequest
     */
    export interface UpdatePostRequest {
        /**
         * objectId
         * Id of the comment
         * example:
         * 000000000000000000000000
         */
        commentId?: string; // objectId
        reportedState?: /**
         * commentReportedState
         * <br/><br/>Values:<br/>0 = None<br/>1 = Inappropriate<br/>2 = Violence<br/>3 = Harassment<br/>4 = Objectionable<br/>5 = Nudity
         */
        CommentReportedState /* int32 */;
    }
    /**
     * updateTeamRequest
     */
    export interface UpdateTeamRequest {
        /**
         * objectId
         * Team id
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * Name of the new Team.
         */
        name?: string | null;
        /**
         * string
         * UrlName, which will be in deeplink
         */
        urlName?: string | null;
        /**
         * objectId
         * List of users, who can manage team
         */
        adminIds?: string /* objectId */[] | null;
        /**
         * objectId
         * List of users, who cant join team
         */
        bannedIds?: string /* objectId */[] | null;
        /**
         * objectId
         * List of users, who should be unban
         */
        userIdsToUnban?: string /* objectId */[] | null;
    }
    /**
     * updateTeamResponse
     */
    export interface UpdateTeamResponse {
        /**
         * objectId
         * Id of the team.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * Name of the team.
         */
        name?: string | null;
        /**
         * string
         * Deep link url name, unique.
         */
        urlName?: string | null;
        owner?: /* teamMemberResponse */ TeamMemberResponse;
        /**
         * dateTime
         * Date when team was created.
         */
        utcCreated?: string; // date-time
        /**
         * IEnumerable`1
         * List of admins info.
         */
        admins?: /* teamMemberResponse */ TeamMemberResponse[] | null;
        /**
         * IEnumerable`1
         * List of banned users.
         */
        banned?: /* teamMemberResponse */ TeamMemberResponse[] | null;
    }
    /**
     * updateTopicRequest
     */
    export interface UpdateTopicRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string | null;
        /**
         * tags
         */
        tags?: string /* string */[] | null;
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        brandId?: string | null; // objectId
        /**
         * string
         */
        link?: string | null;
    }
    /**
     * updateTrendingOverridesRequest
     */
    export interface UpdateTrendingOverridesRequest {
        /**
         * objectId
         * Id of the trending document
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * Tag for trending if type are Tag
         */
        tag?: string | null;
        /**
         * nullable1
         * Position in trending
         */
        position?: null | number; // int32
    }
    /**
     * updateTrendingOverridesResponse
     */
    export interface UpdateTrendingOverridesResponse {
        /**
         * objectId
         * Id of the trending document
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * Id of the target document, depending on the type
         * example:
         * 000000000000000000000000
         */
        targetId?: string; // objectId
        /**
         * string
         * Tag for trending if type are Tag
         */
        tag?: string | null;
        video?: /* getTrendVideosResponse */ GetTrendVideosResponse;
        user?: /* getTrendingUserResponse */ GetTrendingUserResponse;
        /**
         * int32
         * Position in trending
         */
        position?: number; // int32
        type?: /**
         * trendingType
         * <br/><br/>Values:<br/>0 = None<br/>100 = Tag<br/>200 = Video<br/>300 = User
         */
        TrendingType /* int32 */;
    }
    /**
     * updateUserVideoRequest
     */
    export interface UpdateUserVideoRequest {
        /**
         * objectId
         * Id of the video.
         * example:
         * 000000000000000000000000
         */
        videoId?: string; // objectId
        /**
         * string
         * Link of topic.
         */
        link?: string | null;
    }
    /**
     * updateVideoCuratorRequest
     */
    export interface UpdateVideoCuratorRequest {
        /**
         * objectId
         * Low bound filter for the query.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * nullable1
         * Primary product id.
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string | null; // objectId
        /**
         * list1
         * Secondary products ids
         */
        secondaryProductsIds?: string /* objectId */[] | null;
        /**
         * tags
         * Video tags
         */
        tags?: string /* string */[] | null;
    }
    /**
     * updateVideoRequest
     */
    export interface UpdateVideoRequest {
        videoCurationState?: /**
         * videoCurationState
         * <br/><br/>Values:<br/>0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
         */
        VideoCurationState /* int32 */;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        ownerId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string; // objectId
        /**
         * string
         */
        title?: string | null;
        /**
         * string
         */
        subtitle?: string | null;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        /**
         * list1
         */
        secondaryProductIds?: string /* objectId */[] | null;
        /**
         * languageInfo
         */
        audioLanguages?: string /* string */[] | null;
        /**
         * tags
         */
        hashTags?: string /* string */[] | null;
        /**
         * boolean
         */
        isDeleted?: boolean;
        /**
         * boolean
         */
        isDisabled?: boolean;
    }
    /**
     * uploadTopicImageResponse
     */
    export interface UploadTopicImageResponse {
        /**
         * string
         */
        imageUrl?: string | null;
    }
    /**
     * uploadUserProfileImageContentRequest
     */
    export interface UploadUserProfileImageContentRequest {}
    /**
     * uploadUserProfileImageContentResponse
     */
    export interface UploadUserProfileImageContentResponse {
        /**
         * objectId
         * Upload Id which should be used to upload profile image content.
         * example:
         * 000000000000000000000000
         */
        uploadId?: string; // objectId
    }
    /**
     * uploadedVideoType
     * <br/><br/>Values:<br/>0 = Uploaded<br/>1 = Live<br/>-1 = Failed
     */
    export type UploadedVideoType = 0 | 1 | -1; // int32
    /**
     * userAuthChallengeEmailOrUsernameOrPhoneRequest
     */
    export interface UserAuthChallengeEmailOrUsernameOrPhoneRequest {
        /**
         * string
         */
        usernameOrEmail?: string | null;
        /**
         * string
         */
        email?: string | null;
        /**
         * string
         */
        mobileNumber?: string | null;
        /**
         * string
         */
        password: string;
    }
    /**
     * userChangePasswordRequest
     */
    export interface UserChangePasswordRequest {
        /**
         * string
         * Current password
         */
        currentPassword?: string | null;
        /**
         * string
         * New password
         */
        newPassword?: string | null;
    }
    /**
     * userCreateAccountRequest
     */
    export interface UserCreateAccountRequest {
        /**
         * string
         * Email of user.
         */
        email?: string | null;
        userGender?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */;
        /**
         * string
         * User's username.
         */
        username: string;
        /**
         * objectId
         * Facilitator id (optional)
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string; // objectId
        /**
         * string
         * User mobile number. Should be set only if user chose mobile number verification option.
         */
        mobileNumber?: string | null;
        /**
         * string
         * The code received in verification sms. If incorrect
         */
        smsVerificationCode?: string | null;
        /**
         * nullable1
         * User's date of birth. Time doesn't matter
         */
        dateOfBirth?: string | null; // date-time
        /**
         * string
         * The locale string of newly created user (xx-YY, e.g. 'en-GB').
         */
        locale?: string | null;
        /**
         * string
         * The standard which is used to encode the Locale field (supported: 'ISO639').
         */
        localeStandard?: string | null;
        /**
         * string
         * User's language.
         */
        language: string;
        /**
         * boolean
         * Has to be accepted to create an account.
         */
        acceptLicense?: boolean;
        /**
         * string
         */
        password: string;
    }
    /**
     * userCreateAnonymousAccountRequest
     */
    export interface UserCreateAnonymousAccountRequest {
        /**
         * string
         * The locale string of newly created user.
         */
        locale: string;
        /**
         * string
         * The standard which is used to encode the Locale field (supported: 'ISO639').
         */
        localeStandard?: string | null;
    }
    /**
     * userDeletionReason
     */
    export type UserDeletionReason = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // int32
    /**
     * userDisablingInfo
     */
    export interface UserDisablingInfo {
        /**
         * dateTime
         */
        utcDisabled?: string; // date-time
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        disablerId?: string; // objectId
        /**
         * list1
         */
        reasons?: /* userDisablingReason */ UserDisablingReason /* int32 */[] | null;
        /**
         * string
         */
        comment?: string | null;
    }
    /**
     * userDisablingReason
     */
    export type UserDisablingReason = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // int32
    /**
     * userEnablingInfo
     */
    export interface UserEnablingInfo {
        /**
         * dateTime
         */
        utcEnabled?: string; // date-time
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        enablerId?: string; // objectId
    }
    /**
     * userFollowHashTagRequest
     */
    export interface UserFollowHashTagRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
        /**
         * string
         * Hashtag, which user wants to follow
         */
        hashtag?: string | null;
        /**
         * boolean
         * Boolean value. If true - user wants to follow, if false - unfollow
         */
        isFollow?: boolean;
    }
    /**
     * userFollowRequest
     */
    export interface UserFollowRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
        /**
         * objectId
         * CreatorId, which user wants to follow/unfollow
         * example:
         * 000000000000000000000000
         */
        creatorId?: string; // objectId
        /**
         * boolean
         * Boolean value. If true - user wants to follow, if false - unfollow
         */
        isFollow?: boolean;
    }
    /**
     * userGender
     * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
     */
    export type UserGender = 0 | 1 | 2 | 3; // int32
    /**
     * userJwtTokenResponse
     */
    export interface UserJwtTokenResponse {
        user?: /* getUserResponse */ GetUserResponse;
        /**
         * string
         */
        token?: string | null;
    }
    /**
     * userProfileResponse
     */
    export interface UserProfileResponse {
        /**
         * string
         * User's mobile number, E164 format.
         */
        mobileNumber?: string | null;
        /**
         * string
         * User's country.
         */
        country?: string | null;
        /**
         * string
         * URL to user's profile image.
         */
        profileImageUrl?: string | null;
        /**
         * cultureInfo
         * Locale of the user.
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * string
         * User's bio.
         */
        bio?: string | null;
        /**
         * string
         */
        primaryLanguage?: string | null;
    }
    /**
     * userRoleChangeRequest
     */
    export interface UserRoleChangeRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
        /**
         * boolean
         */
        remove?: boolean;
        /**
         * string
         */
        role?: string | null;
    }
    /**
     * userUpdateRequest
     */
    export interface UserUpdateRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * string
         * Username. Null if field should not be modified.
         */
        username?: string | null;
        /**
         * string
         * User's last name. Null if field should not be modified.
         */
        firstName?: string | null;
        /**
         * string
         * User's first name. Null if field should not be modified.
         */
        lastName?: string | null;
        userGender?: /**
         * userGender
         * Represents a gender of a user.<br/><br/>Values:<br/>0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary
         */
        UserGender /* int32 */;
        /**
         * nullable1
         * User's date of birth.
         */
        dateOfBirth?: string | null; // date-time
        /**
         * string
         * User's bio. Null if field should not be modified.
         */
        bio?: string | null;
        /**
         * nullable1
         * Facilitator Id. Null if field should not be modified.
         * example:
         * 000000000000000000000000
         */
        facilitatorId?: string | null; // objectId
        /**
         * string
         * User mobile number. Should be set only if user is not registered it's mobile number and forced to update.
         */
        mobileNumber?: string | null;
        /**
         * string
         * The code received in verification sms. If incorrect
         */
        smsVerificationCode?: string | null;
    }
    /**
     * userWantsForgottenPasswordRequest
     */
    export interface UserWantsForgottenPasswordRequest {
        /**
         * string
         */
        email: string;
    }
    /**
     * userWantsValidationLinkEmailRequest
     */
    export interface UserWantsValidationLinkEmailRequest {
        /**
         * string
         */
        email: string;
    }
    /**
     * usernameExistsRequest
     */
    export interface UsernameExistsRequest {
        /**
         * string
         */
        username?: string | null;
    }
    /**
     * validationEndedReason
     * <br/><br/>Values:<br/>0 = None<br/>1 = CompletedNormally<br/>2 = ConsensusNotReached<br/>3 = TerminatedInHold<br/>4 = Deleted
     */
    export type ValidationEndedReason = 0 | 1 | 2 | 3 | 4; // int32
    /**
     * validationResult
     * <br/><br/>Values:<br/>0 = NotProcessed<br/>1 = AcceptedByConsensus<br/>-1 = RejectedByConsensus
     */
    export type ValidationResult = 0 | 1 | -1; // int32
    /**
     * validationStage
     * <br/><br/>Values:<br/>0 = NotStarted<br/>1 = Processing<br/>2 = Ended<br/>3 = Held
     */
    export type ValidationStage = 0 | 1 | 2 | 3; // int32
    /**
     * validationStateResponse
     */
    export interface ValidationStateResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        womContentId?: string; // objectId
        /**
         * string
         */
        remoteContentId?: string | null;
        /**
         * dateTime
         */
        utcValidateBy?: string; // date-time
        currentStage?: /**
         * validationStage
         * <br/><br/>Values:<br/>0 = NotStarted<br/>1 = Processing<br/>2 = Ended<br/>3 = Held
         */
        ValidationStage /* int32 */;
        consensusRange?: /* consensusRange */ ConsensusRange;
        validationResult?: /**
         * validationResult
         * <br/><br/>Values:<br/>0 = NotProcessed<br/>1 = AcceptedByConsensus<br/>-1 = RejectedByConsensus
         */
        ValidationResult /* int32 */;
        endedReason?: /**
         * validationEndedReason
         * <br/><br/>Values:<br/>0 = None<br/>1 = CompletedNormally<br/>2 = ConsensusNotReached<br/>3 = TerminatedInHold<br/>4 = Deleted
         */
        ValidationEndedReason /* int32 */;
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        womStakedWei?: string; // string
        /**
         * decimal
         */
        womStaked?: number; // double
    }
    /**
     * videoCurationState
     * <br/><br/>Values:<br/>0 = None<br/>1 = Processing<br/>2 = Accepted<br/>3 = Rejected
     */
    export type VideoCurationState = 0 | 1 | 2 | 3; // int32
    /**
     * videoDetailsData
     */
    export interface VideoDetailsData {
        /**
         * string
         */
        hlsUrl?: string | null;
        /**
         * string
         */
        screenGrabUrl?: string | null;
        /**
         * timeSpan
         * example:
         * 0
         */
        duration?: number; // int64
    }
    /**
     * videoDetailsEngagement
     */
    export interface VideoDetailsEngagement {
        /**
         * int32
         * Total likes count.
         */
        likes?: number; // int32
        /**
         * int32
         * Total shares count.
         */
        shares?: number; // int32
        /**
         * int32
         * Total views count.
         */
        views?: number; // int32
        /**
         * int32
         * Total saves count.
         */
        saves?: number; // int32
        /**
         * int32
         * Total clicks count.
         */
        clicks?: number; // int32
        /**
         * int32
         * Total ratings count.
         */
        ratings?: number; // int32
        /**
         * int32
         */
        commentCount?: number; // int32
        /**
         * int32
         */
        buyCount?: number; // int32
        /**
         * int32
         */
        total?: number; // int32
    }
    /**
     * videoDetailsEngagementDeltas
     */
    export interface VideoDetailsEngagementDeltas {
        /**
         * decimal
         * Likes delta (from 0 to 1, current week compared to average of previous 3 weeks).
         */
        likesDelta?: number; // double
        /**
         * decimal
         * Shares delta (from 0 to 1, current week compared to average of previous 3 weeks).
         */
        sharesDelta?: number; // double
        /**
         * decimal
         * Views delta (from 0 to 1, current week compared to average of previous 3 weeks).
         */
        viewsDelta?: number; // double
        /**
         * decimal
         * Saves delta (from 0 to 1, current week compared to average of previous 3 weeks).
         */
        savesDelta?: number; // double
        /**
         * decimal
         * Clicks delta (from 0 to 1, current week compared to average of previous 3 weeks).
         */
        clicksDelta?: number; // double
        /**
         * int32
         * Total likes count.
         */
        likes?: number; // int32
        /**
         * int32
         * Total shares count.
         */
        shares?: number; // int32
        /**
         * int32
         * Total views count.
         */
        views?: number; // int32
        /**
         * int32
         * Total saves count.
         */
        saves?: number; // int32
        /**
         * int32
         * Total clicks count.
         */
        clicks?: number; // int32
        /**
         * int32
         * Total ratings count.
         */
        ratings?: number; // int32
        /**
         * int32
         */
        commentCount?: number; // int32
        /**
         * int32
         */
        buyCount?: number; // int32
        /**
         * int32
         */
        total?: number; // int32
    }
    /**
     * videoDetailsMeta
     */
    export interface VideoDetailsMeta {
        /**
         * nullable1
         * example:
         * 0
         */
        duration?: null | number; // int64
    }
    /**
     * videoDetailsResponse
     */
    export interface VideoDetailsResponse {
        /**
         * boolean
         */
        isReadyForStreaming?: boolean;
        /**
         * string
         */
        hlsUrl?: string | null;
        /**
         * string
         */
        screenGrabUrl?: string | null;
        /**
         * timeSpan
         * example:
         * 0
         */
        duration?: number; // int64
    }
    /**
     * videoDetailsStreaming
     */
    export interface VideoDetailsStreaming {
        /**
         * boolean
         * Streaming info has been received from CloudFlare.
         */
        isReady?: boolean;
        details?: /* videoDetailsResponse */ VideoDetailsResponse;
    }
    /**
     * videoDetailsValidation
     */
    export interface VideoDetailsValidation {
        wom?: /* videoDetailsValidationWom */ VideoDetailsValidationWOM;
        bullz?: /* bullzValidationInfo */ BullzValidationInfo;
    }
    /**
     * videoDetailsValidationWom
     */
    export interface VideoDetailsValidationWOM {
        processStatus?: /**
         * womVideoValidationStatus
         * Video validation status which comes from WOM side.<br/><br/>Values:<br/>0 = NotProcessed<br/>1 = Accepted<br/>2 = Processing<br/>-1 = Rejected
         */
        WomVideoValidationStatus /* int32 */;
        endedReason?: /**
         * validationEndedReason
         * <br/><br/>Values:<br/>0 = None<br/>1 = CompletedNormally<br/>2 = ConsensusNotReached<br/>3 = TerminatedInHold<br/>4 = Deleted
         */
        ValidationEndedReason /* int32 */;
        currentStage?: /**
         * validationStage
         * <br/><br/>Values:<br/>0 = NotStarted<br/>1 = Processing<br/>2 = Ended<br/>3 = Held
         */
        ValidationStage /* int32 */;
        validationResult?: /**
         * validationResult
         * <br/><br/>Values:<br/>0 = NotProcessed<br/>1 = AcceptedByConsensus<br/>-1 = RejectedByConsensus
         */
        ValidationResult /* int32 */;
        /**
         * dateTime
         * The date when WOM validation started
         */
        utcValidationStarted?: string; // date-time
        /**
         * dateTime
         * UTC time of ProcessStatus update.
         */
        utcValidationEnded?: string; // date-time
        /**
         * dateTime
         * UTC time of expiration of validation.
         */
        utcValidationExpired?: string; // date-time
        rejectionReason?: /**
         * videoDetailsValidationWomrejectionReason
         * <br/><br/>Values:<br/>0 = None<br/>1 = BadRating<br/>2 = NoRating
         */
        VideoDetailsValidationWOMRejectionReason /* int32 */;
        refund?: /* videoDetailsValidationWomrefund */ VideoDetailsValidationWOMRefund;
        grading?: /* videoDetailsValidationWomgrading */ VideoDetailsValidationWOMGrading;
        profitLoss?: /* videoDetailsValidationWomprofitLoss */ VideoDetailsValidationWOMProfitLoss;
    }
    /**
     * videoDetailsValidationWomgrading
     */
    export interface VideoDetailsValidationWOMGrading {
        submission?: /* videoDetailsValidationWomgradingCommon */ VideoDetailsValidationWOMGradingCommon;
        consensus?: /* videoDetailsValidationWomgradingCommon */ VideoDetailsValidationWOMGradingCommon;
    }
    /**
     * videoDetailsValidationWomgradingCommon
     */
    export interface VideoDetailsValidationWOMGradingCommon {
        /**
         * nullable1
         */
        authenticity?: number | null; // double
        /**
         * nullable1
         */
        creativity?: number | null; // double
        /**
         * nullable1
         */
        positivity?: number | null; // double
    }
    /**
     * videoDetailsValidationWomprofitLoss
     */
    export interface VideoDetailsValidationWOMProfitLoss {
        /**
         * decimal
         * Amount paid for WOM validation by creator of the video.
         */
        womStaked?: number; // double
        /**
         * decimal
         * Creator total earnings for the video.
         */
        womTotalEarnings?: number; // double
        /**
         * decimal
         * Amount of total earnings actually received by the creator of the video.
         */
        womTotalPaidOut?: number; // double
    }
    /**
     * videoDetailsValidationWomrefund
     */
    export interface VideoDetailsValidationWOMRefund {
        /**
         * decimal
         * Amount of tokens that has been refunded to the video creator.
         */
        womTotalRefunded?: number; // double
        /**
         * dateTime
         * UTC time when refund occured.
         */
        utcRefunded?: string; // date-time
    }
    /**
     * videoDetailsValidationWomrejectionReason
     * <br/><br/>Values:<br/>0 = None<br/>1 = BadRating<br/>2 = NoRating
     */
    export type VideoDetailsValidationWOMRejectionReason = 0 | 1 | 2; // int32
    /**
     * videoEngagement
     */
    export interface VideoEngagement {
        /**
         * int32
         */
        likeCount?: number; // int32
        /**
         * int32
         */
        viewCount?: number; // int32
        /**
         * int32
         */
        shareCount?: number; // int32
        /**
         * int32
         */
        commentCount?: number; // int32
        /**
         * int32
         */
        saveCount?: number; // int32
        /**
         * int32
         */
        clickCount?: number; // int32
        /**
         * int32
         */
        ratingCount?: number; // int32
        /**
         * int32
         */
        buyCount?: number; // int32
        /**
         * int32
         */
        total?: number; // int32
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        lastSyncSessionId?: string; // objectId
    }
    /**
     * videoEngagementScore
     */
    export interface VideoEngagementScore {
        /**
         * int32
         */
        maxViewCount?: number; // int32
        /**
         * int32
         */
        maxShareCount?: number; // int32
        /**
         * int32
         */
        maxLikeCount?: number; // int32
    }
    /**
     * videoExclusivityResponse
     */
    export interface VideoExclusivityResponse {
        status?: /**
         * videoExclusivityStatus
         * <br/><br/>Values:<br/>0 = None<br/>5 = Hot<br/>10 = Exclusive
         */
        VideoExclusivityStatus /* int32 */;
        /**
         * nullable1
         * Null if is not hot
         */
        hotPosition?: null | number; // int32
    }
    /**
     * videoExclusivityStatus
     * <br/><br/>Values:<br/>0 = None<br/>5 = Hot<br/>10 = Exclusive
     */
    export type VideoExclusivityStatus = 0 | 5 | 10; // int32
    /**
     * videoReportedReason
     * <br/><br/>Values:<br/>0 = None<br/>1 = ContainsViolence<br/>2 = ContainsHarassment<br/>3 = ContentObjectionable<br/>4 = ContentInappropriate<br/>5 = ContainsNudity
     */
    export type VideoReportedReason = 0 | 1 | 2 | 3 | 4 | 5; // int32
    /**
     * videoReportedReasonRequest
     * <br/><br/>Values:<br/>0 = ContainsNudity<br/>1 = ContainsViolence<br/>2 = ContainsHarassment<br/>3 = ContentObjectionable<br/>4 = ContentInappropriate
     */
    export type VideoReportedReasonRequest = 0 | 1 | 2 | 3 | 4; // int32
    /**
     * videoStatisticsResponse
     */
    export interface VideoStatisticsResponse {
        /**
         * nullable1
         * Id of the user for video event
         * example:
         * 000000000000000000000000
         */
        userId?: string | null; // objectId
        /**
         * nullable1
         * Id of the video
         * example:
         * 000000000000000000000000
         */
        videoId?: string | null; // objectId
        /**
         * int32
         * Count of likes by user for videos
         */
        likeCount?: number; // int32
        /**
         * int32
         * Count of shared videos by user
         */
        shareCount?: number; // int32
        /**
         * int32
         * Count of reported comments by user
         */
        commentsCount?: number; // int32
        /**
         * int32
         * Count of saved video by user
         */
        saveCount?: number; // int32
        /**
         * int32
         * Count of clicks on videos
         */
        clickCount?: number; // int32
        /**
         * int32
         * Count of views viewd by user for videos
         */
        viewCount?: number; // int32
        /**
         * int32
         * Total Counts of records for statistics
         */
        totalCount?: number; // int32
        userInfo?: /* statisticsUserInfo */ StatisticsUserInfo;
        videoInfo?: /* statisticsVideoInfo */ StatisticsVideoInfo;
    }
    /**
     * videoStreamDetails
     */
    export interface VideoStreamDetails {
        /**
         * boolean
         */
        isReadyForStreaming?: boolean;
        data?: /* videoDetailsData */ VideoDetailsData;
    }
    /**
     * videoUserInfo
     */
    export interface VideoUserInfo {
        /**
         * cultureInfo
         * example:
         * en-GB
         */
        locale?: string | null; // string
        /**
         * string
         */
        country?: string | null;
        /**
         * string
         */
        region?: string | null;
    }
    /**
     * voucherData
     */
    export interface VoucherData {
        /**
         * string
         */
        code?: string | null;
        /**
         * string
         */
        url?: string | null;
        /**
         * string
         */
        pin?: string | null;
        /**
         * string
         */
        validityDate?: string | null;
        /**
         * int64
         */
        orderProductId?: number; // int64
        /**
         * string
         */
        faceValue?: string | null;
        /**
         * string
         */
        voucherCurrency?: string | null;
    }
    /**
     * voucherPurchaseStatus
     * <br/><br/>Values:<br/>0 = None<br/>100 = InProcess<br/>200 = Success<br/>-100 = Failure
     */
    export type VoucherPurchaseStatus = 0 | 100 | 200 | -100; // int32
    /**
     * voucherStatisticsInfo
     */
    export interface VoucherStatisticsInfo {
        /**
         * int32
         */
        totalSpentCount?: number; // int32
        /**
         * decimal
         */
        totalPurchasedInWom?: number; // double
        /**
         * decimal
         */
        totalRefundedInWom?: number; // double
        /**
         * decimal
         */
        totalFailedInWom?: number; // double
        /**
         * list1
         */
        items?: /* voucherTransactionInfo */ VoucherTransactionInfo[] | null;
    }
    /**
     * voucherStatisticsResponse
     */
    export interface VoucherStatisticsResponse {
        /**
         * date
         * example:
         * 2020-01-01T00:00:00Z
         */
        date?: string; // string
        /**
         * int32
         */
        week?: number; // int32
        /**
         * int32
         */
        totalSpentCount?: number; // int32
        /**
         * decimal
         */
        totalPurchasedInWom?: number; // double
        /**
         * decimal
         */
        totalRefundedInWom?: number; // double
        /**
         * dictionary2
         */
        locales?: {
            [name: string]: /* voucherStatisticsInfo */ VoucherStatisticsInfo;
        } | null;
    }
    /**
     * voucherTransactionInfo
     */
    export interface VoucherTransactionInfo {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        transactionStatus?: /**
         * voucherTransactionStatus
         * <br/><br/>Values:<br/>0 = None<br/>50 = Create<br/>100 = Await<br/>200 = WomInProcess<br/>300 = WomSuccess<br/>400 = AwaitPhaze<br/>500 = PhazeInProcess<br/>600 = AwaitRefund<br/>700 = RefundInProgress<br/>800 = RefundSuccess<br/>900 = Success<br/>-300 = RefundFailed<br/>-200 = PhazeFailure<br/>-100 = WomFailure
         */
        VoucherTransactionStatus /* int32 */;
        /**
         * int32
         */
        denomination?: number; // int32
        /**
         * int64
         */
        productId?: number; // int64
        /**
         * decimal
         */
        priceInWom?: number; // double
        /**
         * string
         */
        currency?: string | null;
        /**
         * string
         */
        country?: string | null;
        /**
         * dateTime
         */
        createdUtc?: string; // date-time
        /**
         * nullable1
         */
        processedUtc?: string | null; // date-time
        /**
         * string
         */
        platformIdentifier?: string | null;
        /**
         * cultureInfo
         * example:
         * en-GB
         */
        locale?: string | null; // string
    }
    /**
     * voucherTransactionResponse
     */
    export interface VoucherTransactionResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        transactionStatus?: /**
         * voucherPurchaseStatus
         * <br/><br/>Values:<br/>0 = None<br/>100 = InProcess<br/>200 = Success<br/>-100 = Failure
         */
        VoucherPurchaseStatus /* int32 */;
        /**
         * int32
         */
        denomination?: number; // int32
        /**
         * int64
         */
        productId?: number; // int64
        /**
         * decimal
         */
        priceInWom?: number; // double
        /**
         * dateTime
         */
        createdUtc?: string; // date-time
        /**
         * nullable1
         */
        updatedUtc?: string | null; // date-time
        productInfo?: /* productInfo */ ProductInfo;
        /**
         * list1
         */
        giftCardData?: /* voucherData */ VoucherData[] | null;
    }
    /**
     * voucherTransactionStatus
     * <br/><br/>Values:<br/>0 = None<br/>50 = Create<br/>100 = Await<br/>200 = WomInProcess<br/>300 = WomSuccess<br/>400 = AwaitPhaze<br/>500 = PhazeInProcess<br/>600 = AwaitRefund<br/>700 = RefundInProgress<br/>800 = RefundSuccess<br/>900 = Success<br/>-300 = RefundFailed<br/>-200 = PhazeFailure<br/>-100 = WomFailure
     */
    export type VoucherTransactionStatus =
        | 0
        | 50
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900
        | -300
        | -200
        | -100; // int32
    /**
     * voucherValueRestrictions
     */
    export interface VoucherValueRestrictions {
        /**
         * decimal
         */
        maxVal?: number; // double
        /**
         * decimal
         */
        minVal?: number; // double
    }
    /**
     * WOMRestartValidationRequest
     */
    export interface WOMRestartValidationRequest {
        /**
         * objectId
         * The id of the YEAY content that will be submitted for validation.
         * example:
         * 000000000000000000000000
         */
        contentId: string; // objectId
        /**
         * decimal
         * The amount of WOM tokens to be staked in order to begin validation.
         */
        stakeAmount: number; // double
        /**
         * boolean
         * If promotions for staking amounts are running, request that this user benefit from them. It is not a guarantee.
         */
        requestStakingPromotion?: boolean;
    }
    /**
     * WOMStartValidationRequest
     */
    export interface WOMStartValidationRequest {
        /**
         * objectId
         * The id of the YEAY content that will be submitted for validation.
         * example:
         * 000000000000000000000000
         */
        contentId: string; // objectId
        /**
         * decimal
         * The amount of WOM tokens to be staked in order to begin validation.
         */
        stakeAmount: number; // double
        /**
         * boolean
         * If promotions for staking amounts are running, request that this user benefit from them. It is not a guarantee.
         */
        requestStakingPromotion?: boolean;
        /**
         * boolean
         * If set to true validation on WOM side will begin only when the video is approved on YEAY side.
         */
        holdUntilApproved?: boolean;
    }
    /**
     * walletResponse
     */
    export interface WalletResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        walletId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * boolean
         */
        hasWallet?: boolean;
        /**
         * boolean
         */
        hasTransacted?: boolean;
        /**
         * list1
         */
        items?: /* addressResponse */ AddressResponse[] | null;
    }
    /**
     * womVideoValidationStatus
     * Video validation status which comes from WOM side.<br/><br/>Values:<br/>0 = NotProcessed<br/>1 = Accepted<br/>2 = Processing<br/>-1 = Rejected
     */
    export type WomVideoValidationStatus = 0 | 1 | 2 | -1; // int32
}
declare namespace Paths {
    namespace AdminLocationQueryCountries {
        namespace Post {
            export type RequestBody = /* adminGetCountriesRequest */ Components.Schemas.AdminGetCountriesRequest;
            namespace Responses {
                export type $200 = /* adminAllCountriesResponse */ Components.Schemas.AdminAllCountriesResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminLocationQueryRegions {
        namespace Post {
            export type RequestBody = /* adminGetRegionsByCountryRequest */ Components.Schemas.AdminGetRegionsByCountryRequest;
            namespace Responses {
                export type $200 = /* adminAllRegionsByCountryResponse */ Components.Schemas.AdminAllRegionsByCountryResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminPromotionCreate {
        namespace Post {
            export type RequestBody = /* createPromotionRequest */ Components.Schemas.CreatePromotionRequest;
            namespace Responses {
                export type $200 = /* createPromotionResponse */ Components.Schemas.CreatePromotionResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminPromotionQuery {
        namespace Post {
            export type RequestBody = /* queryAdminPromotionRequest */ Components.Schemas.QueryAdminPromotionRequest;
            namespace Responses {
                export type $200 = /* queryAdminPromotionResponse */ Components.Schemas.QueryAdminPromotionResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminPromotionUpdate {
        namespace Post {
            export type RequestBody = /* updateAdminPromotionRequest */ Components.Schemas.UpdateAdminPromotionRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminPromotionUploadIcon$Id {
        namespace Post {
            namespace Parameters {
                /**
                 * string
                 */
                export type Id = string;
            }
            export interface PathParameters {
                id: /* string */ Parameters.Id;
            }
            export interface RequestBody {
                /**
                 * IFormFile
                 */
                file: string; // binary
            }
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminTeamDeleteTeam {
        namespace Post {
            export type RequestBody = /* adminDeleteTeamRequest */ Components.Schemas.AdminDeleteTeamRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminTeamQuery {
        namespace Post {
            export type RequestBody = /* queryAdminTeamsRequest */ Components.Schemas.QueryAdminTeamsRequest;
            namespace Responses {
                export type $200 = /* queryAdminTeamsResponse */ Components.Schemas.QueryAdminTeamsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminTrendingCreate {
        namespace Post {
            export type RequestBody = /* createTrendingOverridesRequest */ Components.Schemas.CreateTrendingOverridesRequest;
            namespace Responses {
                export type $200 = /* createTrendingOverridesResponse */ Components.Schemas.CreateTrendingOverridesResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminTrendingQuery {
        namespace Post {
            export type RequestBody = /* queryTrendingOverridesRequest */ Components.Schemas.QueryTrendingOverridesRequest;
            namespace Responses {
                export type $200 = /* queryTrendingOverridesResponse */ Components.Schemas.QueryTrendingOverridesResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminTrendingRemove {
        namespace Post {
            export type RequestBody = /* removeTrendingOverridesRequest */ Components.Schemas.RemoveTrendingOverridesRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminTrendingUpdate {
        namespace Post {
            export type RequestBody = /* updateTrendingOverridesRequest */ Components.Schemas.UpdateTrendingOverridesRequest;
            namespace Responses {
                export type $200 = /* updateTrendingOverridesResponse */ Components.Schemas.UpdateTrendingOverridesResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserDelete {
        namespace Post {
            export type RequestBody = /* adminDeleteUsersRequest */ Components.Schemas.AdminDeleteUsersRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminUserDisable {
        namespace Post {
            export type RequestBody = /* adminDisableUsersRequest */ Components.Schemas.AdminDisableUsersRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserEnable {
        namespace Post {
            export type RequestBody = /* adminEnableUsersRequest */ Components.Schemas.AdminEnableUsersRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserGet {
        namespace Post {
            export type RequestBody = /* adminGetUserRequest */ Components.Schemas.AdminGetUserRequest;
            namespace Responses {
                export type $200 = /* adminGetUserCommon */ Components.Schemas.AdminGetUserCommon;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserManageRole {
        namespace Post {
            export type RequestBody = /* userRoleChangeRequest */ Components.Schemas.UserRoleChangeRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminUserQuery {
        namespace Post {
            export type RequestBody = /* queryAllUsersRequest */ Components.Schemas.QueryAllUsersRequest;
            namespace Responses {
                export type $200 = /* queryUsersResponse */ Components.Schemas.QueryUsersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserQueryBlacklistedUsers {
        namespace Post {
            export type RequestBody = /* queryBlacklistedUsersRequest */ Components.Schemas.QueryBlacklistedUsersRequest;
            namespace Responses {
                export type $200 = /* queryBlacklistedUsersResponse */ Components.Schemas.QueryBlacklistedUsersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserQueryDeleted {
        namespace Post {
            export type RequestBody = /* queryDeletedUsersRequest */ Components.Schemas.QueryDeletedUsersRequest;
            namespace Responses {
                export type $200 = /* queryDeletedUsersResponse */ Components.Schemas.QueryDeletedUsersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserQueryDisabled {
        namespace Post {
            export type RequestBody = /* queryDisabledUsersRequest */ Components.Schemas.QueryDisabledUsersRequest;
            namespace Responses {
                export type $200 = /* queryDisabledUsersResponse */ Components.Schemas.QueryDisabledUsersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserQueryEnabled {
        namespace Post {
            export type RequestBody = /* queryEnabledUsersRequest */ Components.Schemas.QueryEnabledUsersRequest;
            namespace Responses {
                export type $200 = /* queryEnabledUsersResponse */ Components.Schemas.QueryEnabledUsersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserUpdate {
        namespace Post {
            export type RequestBody = /* adminUpdateUserRequest */ Components.Schemas.AdminUpdateUserRequest;
            namespace Responses {
                export type $200 = /* adminGetUserCommon */ Components.Schemas.AdminGetUserCommon;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminUserVerifyAccount {
        namespace Post {
            export type RequestBody = /* adminVerifyUserAccountRequest */ Components.Schemas.AdminVerifyUserAccountRequest;
            namespace Responses {
                export type $200 = /* adminGetUserCommon */ Components.Schemas.AdminGetUserCommon;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace AdminVideoCommentQuery {
        namespace Post {
            export type RequestBody = /* adminQueryPostsRequest */ Components.Schemas.AdminQueryPostsRequest;
            namespace Responses {
                export type $200 = /* adminQueryPostsResponse */ Components.Schemas.AdminQueryPostsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoCommentQueryReported {
        namespace Post {
            export type RequestBody = /* queryReportedPostsRequest */ Components.Schemas.QueryReportedPostsRequest;
            namespace Responses {
                export type $200 = /* adminQueryPostsResponse */ Components.Schemas.AdminQueryPostsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoCommentUpdate {
        namespace Post {
            export type RequestBody = /* updatePostRequest */ Components.Schemas.UpdatePostRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace AdminVideoGet {
        namespace Post {
            export type RequestBody = /* getVideoRequest */ Components.Schemas.GetVideoRequest;
            namespace Responses {
                export type $200 = /* adminGetVideoResponse */ Components.Schemas.AdminGetVideoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoGetSourceFile {
        namespace Post {
            export type RequestBody = /* getVideoSourceFileRequest */ Components.Schemas.GetVideoSourceFileRequest;
            namespace Responses {
                export type $200 = /* getVideoSourceFileResponse */ Components.Schemas.GetVideoSourceFileResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoPromoteVideo {
        namespace Post {
            export type RequestBody = /* promoteVideoRequest */ Components.Schemas.PromoteVideoRequest;
            namespace Responses {
                export type $200 = /* promoteVideoResponse */ Components.Schemas.PromoteVideoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoQuery {
        namespace Post {
            export type RequestBody = /**
             * queryAllVideosRequest
             * Allows filtering videos using AND logic. If the field is null then it's not used for filtering.
             */ Components.Schemas.QueryAllVideosRequest;
            namespace Responses {
                export type $200 = /* queryAllVideosResponse */ Components.Schemas.QueryAllVideosResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoQueryByProduct {
        namespace Post {
            export type RequestBody = /* queryVideosByProductIdRequest */ Components.Schemas.QueryVideosByProductIdRequest;
            namespace Responses {
                export type $200 = /* queryVideosByProductIdResponse */ Components.Schemas.QueryVideosByProductIdResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoQueryStatistics {
        namespace Post {
            export type RequestBody = /**
             * queryVideoStatisticsRequest
             * This will help to get video-event aggregation statistics by quering on event streams by passing UserId/VideoId to track the suspicious activities
             */ Components.Schemas.QueryVideoStatisticsRequest;
            namespace Responses {
                export type $200 = /* queryVideoStatisticsResponse */ Components.Schemas.QueryVideoStatisticsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoSimulateData {
        namespace Post {
            export type RequestBody = /* simulatedDataRequest */ Components.Schemas.SimulatedDataRequest;
            namespace Responses {
                /**
                 * string
                 */
                export type $200 = string;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace AdminVideoUpdate {
        namespace Post {
            export type RequestBody = /* updateVideoRequest */ Components.Schemas.UpdateVideoRequest;
            namespace Responses {
                export type $200 = /* adminGetVideoResponse */ Components.Schemas.AdminGetVideoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace Assets$StorageKey {
        namespace Get {
            namespace Parameters {
                /**
                 * string
                 */
                export type StorageKey = string;
            }
            export interface PathParameters {
                storageKey: /* string */ Parameters.StorageKey;
            }
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace CurationAffiliateLinkCreate {
        namespace Post {
            export type RequestBody = /* createManagedProductAffiliateLinkRequest */ Components.Schemas.CreateManagedProductAffiliateLinkRequest;
            namespace Responses {
                export type $200 = /* createManagedProductAffiliateLinkResponse */ Components.Schemas.CreateManagedProductAffiliateLinkResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace CurationAffiliateLinkGet {
        namespace Post {
            export type RequestBody = /* getAffiliateLinkRequest */ Components.Schemas.GetAffiliateLinkRequest;
            namespace Responses {
                export type $200 = /* getAffiliateLinkResponse */ Components.Schemas.GetAffiliateLinkResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace CurationNextVideo {
        namespace Post {
            export type RequestBody = /* getNextCuratedVideoRequest */ Components.Schemas.GetNextCuratedVideoRequest;
            namespace Responses {
                export type $200 = /* getNextCuratedVideoResponse */ Components.Schemas.GetNextCuratedVideoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace CurationProductDelete {
        namespace Post {
            export type RequestBody = /* deleteManagedProductRequest */ Components.Schemas.DeleteManagedProductRequest;
            namespace Responses {
                export type $200 = /* deleteManagedProductResponse */ Components.Schemas.DeleteManagedProductResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace CurationProductGet {
        namespace Post {
            export type RequestBody = /* getManagedProductRequest */ Components.Schemas.GetManagedProductRequest;
            namespace Responses {
                export type $200 = /* getManagedProductResponse */ Components.Schemas.GetManagedProductResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace CurationProductPut {
        namespace Post {
            export type RequestBody = /* putManagedProductRequest */ Components.Schemas.PutManagedProductRequest;
            namespace Responses {
                export type $200 = /* putManagedProductResponse */ Components.Schemas.PutManagedProductResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace CurationProductQuery {
        namespace Post {
            export type RequestBody = /**
             * queryManagedProductRequest
             * AND logic is used is multiple search filters are not null.
             */ Components.Schemas.QueryManagedProductRequest;
            namespace Responses {
                export type $200 = /* queryManagedProductResponse */ Components.Schemas.QueryManagedProductResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace CurationSubmit {
        namespace Post {
            export type RequestBody = /* submitVideoCurationRequest */ Components.Schemas.SubmitVideoCurationRequest;
            namespace Responses {
                export type $200 = /* submitVideoCurationResponse */ Components.Schemas.SubmitVideoCurationResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace CurationVideoUpdate {
        namespace Post {
            export type RequestBody = /* updateVideoCuratorRequest */ Components.Schemas.UpdateVideoCuratorRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace EngagementEmittersCreate {
        namespace Post {
            export type RequestBody = /* createEngagementEmitterRequest */ Components.Schemas.CreateEngagementEmitterRequest;
            namespace Responses {
                export type $200 = /* engagementEmitter */ Components.Schemas.EngagementEmitter;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace EngagementEmittersDelete {
        namespace Post {
            export type RequestBody = /* deleteEngagementEmittersRequest */ Components.Schemas.DeleteEngagementEmittersRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace EngagementEmittersGet {
        namespace Post {
            export type RequestBody = /* getEngagementEmittersRequest */ Components.Schemas.GetEngagementEmittersRequest;
            namespace Responses {
                export type $200 = /* getEngagementEmitterResponse */ Components.Schemas.GetEngagementEmitterResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace EngagementEmittersQuery {
        namespace Post {
            export type RequestBody = /* queryEngagementEmittersRequest */ Components.Schemas.QueryEngagementEmittersRequest;
            namespace Responses {
                export type $200 = /* queryEngagementEmitterResponse */ Components.Schemas.QueryEngagementEmitterResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace EngagementEmittersUpdate {
        namespace Post {
            export type RequestBody = /* updateEngagementEmitterRequest */ Components.Schemas.UpdateEngagementEmitterRequest;
            namespace Responses {
                export type $200 = /* engagementEmitter */ Components.Schemas.EngagementEmitter;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace EngagementGetScores {
        namespace Post {
            export type RequestBody = /* getEngagementScoresRequest */ Components.Schemas.GetEngagementScoresRequest;
            namespace Responses {
                export type $200 = /* videoEngagementScore */ Components.Schemas.VideoEngagementScore;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace EngagementGetServiceState {
        namespace Post {
            namespace Responses {
                export type $200 = /* getServiceStateResponse */ Components.Schemas.GetServiceStateResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace EngagementGetTotalEmitted {
        namespace Post {
            export type RequestBody = /* getTotalEmittedEngagementRequest */ Components.Schemas.GetTotalEmittedEngagementRequest;
            namespace Responses {
                export type $200 = /* getTotalEmittedEngagementResponse */ Components.Schemas.GetTotalEmittedEngagementResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace EngagementSwitchState {
        namespace Post {
            export type RequestBody = /* switchEmitterStateRequest */ Components.Schemas.SwitchEmitterStateRequest;
            namespace Responses {
                export type $200 = /* getServiceStateResponse */ Components.Schemas.GetServiceStateResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace MediaUpload$Id {
        namespace Post {
            namespace Parameters {
                /**
                 * string
                 */
                export type Id = string;
            }
            export interface PathParameters {
                id: /* string */ Parameters.Id;
            }
            export interface RequestBody {
                fileName?: string; // binary
            }
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace NotificationGet {
        namespace Post {
            export type RequestBody = /* getNotificationsRequest */ Components.Schemas.GetNotificationsRequest;
            namespace Responses {
                export type $200 = /* notificationsResponse */ Components.Schemas.NotificationsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace NotificationQuery {
        namespace Post {
            export type RequestBody = /* queryNotificationsRequest */ Components.Schemas.QueryNotificationsRequest;
            namespace Responses {
                export type $200 = /* queryNotificationsResponse */ Components.Schemas.QueryNotificationsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace Out$UserId$VideoId$ProductId$SessionId {
        namespace Get {
            namespace Parameters {
                /**
                 * string
                 */
                export type ProductId = string;
                /**
                 * string
                 */
                export type SessionId = string;
                /**
                 * string
                 */
                export type UserId = string;
                /**
                 * string
                 */
                export type VideoId = string;
            }
            export interface PathParameters {
                userId: /* string */ Parameters.UserId;
                videoId: /* string */ Parameters.VideoId;
                productId: /* string */ Parameters.ProductId;
                sessionId: /* string */ Parameters.SessionId;
            }
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace PlaylistCheckAffiliateLinks {
        namespace Post {
            export type RequestBody = /* hasAffiliateLinksRequest */ Components.Schemas.HasAffiliateLinksRequest;
            namespace Responses {
                export type $200 = /* hasAffiliateLinksResponse */ Components.Schemas.HasAffiliateLinksResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace PlaylistGet {
        namespace Post {
            export type RequestBody = /* getPlaylistVideoRequest */ Components.Schemas.GetPlaylistVideoRequest;
            namespace Responses {
                export type $200 = /* playlistSingleVideoResponse */ Components.Schemas.PlaylistSingleVideoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace PlaylistGetMeta {
        namespace Post {
            export type RequestBody = /* getVideoMetaRequest */ Components.Schemas.GetVideoMetaRequest;
            namespace Responses {
                export type $200 = /* getVideoMetaResponse */ Components.Schemas.GetVideoMetaResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace PlaylistQuery {
        namespace Post {
            export type RequestBody = /* createPlaylistRequest */ Components.Schemas.CreatePlaylistRequest;
            namespace Responses {
                export type $200 = /* createPlaylistForVideosResponse */ Components.Schemas.CreatePlaylistForVideosResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace PlaylistQueryByCreator {
        namespace Post {
            export type RequestBody = /* queryPlaylistByCreatorRequest */ Components.Schemas.QueryPlaylistByCreatorRequest;
            namespace Responses {
                export type $200 = /* queryPlaylistVideosResponse */ Components.Schemas.QueryPlaylistVideosResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace PlaylistQueryVideos {
        namespace Post {
            export type RequestBody = /* queryPlaylistVideosRequest */ Components.Schemas.QueryPlaylistVideosRequest;
            namespace Responses {
                export type $200 = /* queryPlaylistVideosResponse */ Components.Schemas.QueryPlaylistVideosResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace ProductGetByBarcode {
        namespace Post {
            export type RequestBody = /* getProductByBarcodeRequest */ Components.Schemas.GetProductByBarcodeRequest;
            namespace Responses {
                export type $200 = /* getProductResponse */ Components.Schemas.GetProductResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace ProductManage$IdUploadImage {
        namespace Post {
            namespace Parameters {
                /**
                 * string
                 */
                export type Id = string;
            }
            export interface PathParameters {
                id: /* string */ Parameters.Id;
            }
            export interface RequestBody {
                /**
                 * IFormFile
                 */
                file?: string; // binary
            }
            namespace Responses {
                export type $200 = /* uploadTopicImageResponse */ Components.Schemas.UploadTopicImageResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace ProductManageCreate {
        namespace Post {
            export type RequestBody = /* createTopicRequest */ Components.Schemas.CreateTopicRequest;
            namespace Responses {
                export type $200 = /* topicResponse */ Components.Schemas.TopicResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace ProductManageDelete {
        namespace Post {
            export type RequestBody = /* deleteTopicRequest */ Components.Schemas.DeleteTopicRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace ProductManageGet {
        namespace Post {
            export type RequestBody = /* getTopicRequest */ Components.Schemas.GetTopicRequest;
            namespace Responses {
                export type $200 = /* topicResponse */ Components.Schemas.TopicResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace ProductManageQuery {
        namespace Post {
            export type RequestBody = /* queryTopicsRequest */ Components.Schemas.QueryTopicsRequest;
            namespace Responses {
                export type $200 = /* topicsResponse */ Components.Schemas.TopicsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace ProductManageUpdate {
        namespace Post {
            export type RequestBody = /* updateTopicRequest */ Components.Schemas.UpdateTopicRequest;
            namespace Responses {
                export type $200 = /* topicResponse */ Components.Schemas.TopicResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace ProductQueryByName {
        namespace Post {
            export type RequestBody = /* getProductsByNameRequest */ Components.Schemas.GetProductsByNameRequest;
            namespace Responses {
                export type $200 = /* getProductsResponse */ Components.Schemas.GetProductsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace ProductQueryByVideo {
        namespace Post {
            export type RequestBody = /* queryAffiliateProductsByVideoIdRequest */ Components.Schemas.QueryAffiliateProductsByVideoIdRequest;
            namespace Responses {
                export type $200 = /* queryAffiliateProductsByVideoIdResponse */ Components.Schemas.QueryAffiliateProductsByVideoIdResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace PromotionGet {
        namespace Post {
            export type RequestBody = /* getPromotionForCurrentUserRequest */ Components.Schemas.GetPromotionForCurrentUserRequest;
            namespace Responses {
                export type $200 = /* getPromotionForCurrentUserResponse */ Components.Schemas.GetPromotionForCurrentUserResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace Search {
        namespace Post {
            export type RequestBody = /* querySearchRequest */ Components.Schemas.QuerySearchRequest;
            namespace Responses {
                export type $200 = /* querySearchResponse */ Components.Schemas.QuerySearchResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace SearchQueryTrendingByLanguage {
        namespace Post {
            export type RequestBody = /* getLanguageTrendingRequest */ Components.Schemas.GetLanguageTrendingRequest;
            namespace Responses {
                export type $200 = /* getTrendingResponse */ Components.Schemas.GetTrendingResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace SearchTrending {
        namespace Post {
            export type RequestBody = /* getTrendingRequest */ Components.Schemas.GetTrendingRequest;
            namespace Responses {
                export type $200 = /* getTrendingResponse */ Components.Schemas.GetTrendingResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace StatisticsActivityGet {
        namespace Post {
            export type RequestBody = /* createMarketingStatisticsRequest */ Components.Schemas.CreateMarketingStatisticsRequest;
            namespace Responses {
                export type $200 = /* marketingStatisticsResponse */ Components.Schemas.MarketingStatisticsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace SuperAdminUserBigQuery {
        namespace Post {
            export type RequestBody = /* bigQueryUsersRequest */ Components.Schemas.BigQueryUsersRequest;
            namespace Responses {
                export type $200 = /* bigQueryUsersResponse */ Components.Schemas.BigQueryUsersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace SuperAdminUserBigQueryCount {
        namespace Post {
            export type RequestBody = /* countQueryUsersRequest */ Components.Schemas.CountQueryUsersRequest;
            namespace Responses {
                export type $200 = /* countQueryResponse */ Components.Schemas.CountQueryResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace TeamCreate {
        namespace Post {
            export type RequestBody = /* createTeamRequest */ Components.Schemas.CreateTeamRequest;
            namespace Responses {
                export type $200 = /* createTeamResponse */ Components.Schemas.CreateTeamResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamGet {
        namespace Post {
            export type RequestBody = /* getTeamInfoRequest */ Components.Schemas.GetTeamInfoRequest;
            namespace Responses {
                export type $200 = /* getTeamInfoResponse */ Components.Schemas.GetTeamInfoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamGetInfo {
        namespace Post {
            export type RequestBody = /* getTeamDetailRequest */ Components.Schemas.GetTeamDetailRequest;
            namespace Responses {
                export type $200 = /* getTeamDetailResponse */ Components.Schemas.GetTeamDetailResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamGetMembers {
        namespace Post {
            export type RequestBody = /* queryMembersRequest */ Components.Schemas.QueryMembersRequest;
            namespace Responses {
                export type $200 = /* queryMembersResponse */ Components.Schemas.QueryMembersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamGetVideos {
        namespace Post {
            export type RequestBody = /* queryTeamVideosRequest */ Components.Schemas.QueryTeamVideosRequest;
            namespace Responses {
                export type $200 = /* queryTeamVideosResponse */ Components.Schemas.QueryTeamVideosResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamJoin {
        namespace Post {
            export type RequestBody = /* joinTeamRequest */ Components.Schemas.JoinTeamRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamLeave {
        namespace Post {
            export type RequestBody = /* leaveTeamRequest */ Components.Schemas.LeaveTeamRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamQuery {
        namespace Post {
            export type RequestBody = /* queryTeamsRequest */ Components.Schemas.QueryTeamsRequest;
            namespace Responses {
                export type $200 = /* queryTeamsResponse */ Components.Schemas.QueryTeamsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamRemove {
        namespace Post {
            export type RequestBody = /* removeTeamMemberRequest */ Components.Schemas.RemoveTeamMemberRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamUpdate {
        namespace Post {
            export type RequestBody = /* updateTeamRequest */ Components.Schemas.UpdateTeamRequest;
            namespace Responses {
                export type $200 = /* updateTeamResponse */ Components.Schemas.UpdateTeamResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TeamVideoStatus {
        namespace Post {
            export type RequestBody = /* changeVideoExclusivityStatusRequest */ Components.Schemas.ChangeVideoExclusivityStatusRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace TestCancelAndResetStatistics {
        namespace Post {
            namespace Responses {
                /**
                 * boolean
                 */
                export type $200 = boolean;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace TestCreateVideoStatistics {
        namespace Post {
            namespace Parameters {
                /**
                 * int32
                 */
                export type Days = number; // int32
            }
            export interface QueryParameters {
                days?: /* int32 */ Parameters.Days /* int32 */;
            }
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace TestDeleteNonReferencedProducts {
        namespace Post {
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace TestQueryNonReferencedProducts {
        namespace Post {
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace TestRebuildSearchDocumentsAll {
        namespace Post {
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace TestRebuildStatistics {
        namespace Post {
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace TestRebuildVideoStatistics {
        namespace Post {
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace TestResendAllStatistics {
        namespace Post {
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace TestSyncWomVideosValidation {
        namespace Post {
            namespace Responses {
                export interface $200 {}
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserAuthenticate {
        namespace Post {
            export type RequestBody = /* userAuthChallengeEmailOrUsernameOrPhoneRequest */ Components.Schemas.UserAuthChallengeEmailOrUsernameOrPhoneRequest;
            namespace Responses {
                export type $200 = /* userJwtTokenResponse */ Components.Schemas.UserJwtTokenResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserAuthenticateWebrecorder {
        namespace Post {
            export type RequestBody = /* authenticateWebRecorderRequest */ Components.Schemas.AuthenticateWebRecorderRequest;
            namespace Responses {
                export type $200 = /* jwtTokenResponse */ Components.Schemas.JwtTokenResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserAuthenticateWithToken {
        namespace Post {
            export type RequestBody = /* authenticateWithTokenRequest */ Components.Schemas.AuthenticateWithTokenRequest;
            namespace Responses {
                export type $200 = /* userJwtTokenResponse */ Components.Schemas.UserJwtTokenResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserChangePassword {
        namespace Post {
            export type RequestBody = /* userChangePasswordRequest */ Components.Schemas.UserChangePasswordRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserCreateAccount {
        namespace Post {
            export type RequestBody = /* userCreateAccountRequest */ Components.Schemas.UserCreateAccountRequest;
            namespace Responses {
                export type $200 = /* userJwtTokenResponse */ Components.Schemas.UserJwtTokenResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace UserCreateAccountAnonymous {
        namespace Post {
            export type RequestBody = /* userCreateAnonymousAccountRequest */ Components.Schemas.UserCreateAnonymousAccountRequest;
            namespace Responses {
                export type $200 = /* userJwtTokenResponse */ Components.Schemas.UserJwtTokenResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace UserDeleteAccount {
        namespace Post {
            export type RequestBody = /* deleteUserRequest */ Components.Schemas.DeleteUserRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserFollow {
        namespace Post {
            export type RequestBody = /* userFollowRequest */ Components.Schemas.UserFollowRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace UserGet {
        namespace Post {
            export type RequestBody = /* getBullzUserRequest */ Components.Schemas.GetBullzUserRequest;
            namespace Responses {
                export type $200 = /* getUserResponse */ Components.Schemas.GetUserResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserGetCurrentAuthorization {
        namespace Post {
            export type RequestBody = /* getCurrentAuthorizationsRequest */ Components.Schemas.GetCurrentAuthorizationsRequest;
            namespace Responses {
                export type $200 = /* getCurrentAuthorizationsResponse */ Components.Schemas.GetCurrentAuthorizationsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserGetProfile {
        namespace Post {
            export type RequestBody = /* getUserProfileRequest */ Components.Schemas.GetUserProfileRequest;
            namespace Responses {
                export type $200 = /* getUserProfileResponse */ Components.Schemas.GetUserProfileResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserHashtagFollow {
        namespace Post {
            export type RequestBody = /* userFollowHashTagRequest */ Components.Schemas.UserFollowHashTagRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace UserHashtagQueryFollowed {
        namespace Post {
            export type RequestBody = /* queryFollowedHashTagsRequest */ Components.Schemas.QueryFollowedHashTagsRequest;
            namespace Responses {
                export type $200 = /* queryFollowingHashTagsResponse */ Components.Schemas.QueryFollowingHashTagsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserQueryFacilitators {
        namespace Post {
            export type RequestBody = /* queryFacilitatorsListRequest */ Components.Schemas.QueryFacilitatorsListRequest;
            namespace Responses {
                export type $200 = /* queryFacilitatorsListResponse */ Components.Schemas.QueryFacilitatorsListResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserQueryFollowed {
        namespace Post {
            export type RequestBody = /* queryFollowedUsersRequest */ Components.Schemas.QueryFollowedUsersRequest;
            namespace Responses {
                export type $200 = /* queryFollowedUsersResponse */ Components.Schemas.QueryFollowedUsersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserQueryFollowers {
        namespace Post {
            export type RequestBody = /* queryFollowersRequest */ Components.Schemas.QueryFollowersRequest;
            namespace Responses {
                export type $200 = /* queryFollowersResponse */ Components.Schemas.QueryFollowersResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserSendForgottenPasswordEmail {
        namespace Post {
            export type RequestBody = /* userWantsForgottenPasswordRequest */ Components.Schemas.UserWantsForgottenPasswordRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserSendValidationLinkEmail {
        namespace Post {
            export type RequestBody = /* userWantsValidationLinkEmailRequest */ Components.Schemas.UserWantsValidationLinkEmailRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace UserSmsAnalyzeMobileNumber {
        namespace Post {
            export type RequestBody = /* analyzeMobileNumberRequest */ Components.Schemas.AnalyzeMobileNumberRequest;
            namespace Responses {
                export type $200 = /* analyzeMobileNumberResponse */ Components.Schemas.AnalyzeMobileNumberResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace UserSmsChangeUserPassword {
        namespace Post {
            export type RequestBody = /* changeUserPasswordViaSmsRequest */ Components.Schemas.ChangeUserPasswordViaSmsRequest;
            namespace Responses {
                export type $200 = /* changeUserPasswordViaSmsResponse */ Components.Schemas.ChangeUserPasswordViaSmsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace UserSmsCheckVerificationCode {
        namespace Post {
            export type RequestBody = /* checkSmsCodeRequest */ Components.Schemas.CheckSmsCodeRequest;
            namespace Responses {
                export type $200 = /* checkSmsCodeResponse */ Components.Schemas.CheckSmsCodeResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace UserSmsSendForgottenPassword {
        namespace Post {
            export type RequestBody = /* sendForgottenPasswordSmsRequest */ Components.Schemas.SendForgottenPasswordSmsRequest;
            namespace Responses {
                export type $200 = /* sendForgottenPasswordSmsResponse */ Components.Schemas.SendForgottenPasswordSmsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace UserSmsSendVerification {
        namespace Post {
            export type RequestBody = /* sendVerificationSmsRequest */ Components.Schemas.SendVerificationSmsRequest;
            namespace Responses {
                export type $200 = /* sendVerificationSmsResponse */ Components.Schemas.SendVerificationSmsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace UserUpdate {
        namespace Post {
            export type RequestBody = /* userUpdateRequest */ Components.Schemas.UserUpdateRequest;
            namespace Responses {
                export type $200 = /* getUserResponse */ Components.Schemas.GetUserResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace UserUploadProfileImage {
        namespace Post {
            export type RequestBody = /* uploadUserProfileImageContentRequest */ Components.Schemas.UploadUserProfileImageContentRequest;
            namespace Responses {
                export type $200 = /* uploadUserProfileImageContentResponse */ Components.Schemas.UploadUserProfileImageContentResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserUploadProfileImage$Id {
        namespace Post {
            namespace Parameters {
                /**
                 * objectId
                 * example:
                 * 000000000000000000000000
                 */
                export type Id = string; // objectId
            }
            export interface PathParameters {
                id: /**
                 * objectId
                 * example:
                 * 000000000000000000000000
                 */
                Parameters.Id /* objectId */;
            }
            export interface RequestBody {
                fileName?: string; // binary
            }
            namespace Responses {
                export type $200 = /* getUserProfileImageResponse */ Components.Schemas.GetUserProfileImageResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserUsernameExists {
        namespace Post {
            export type RequestBody = /* usernameExistsRequest */ Components.Schemas.UsernameExistsRequest;
            namespace Responses {
                export type $200 = /* existenceResponse */ Components.Schemas.ExistenceResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
            }
        }
    }
    namespace UserVideoQuerySaved {
        namespace Post {
            export type RequestBody = /* querySavedVideosRequest */ Components.Schemas.QuerySavedVideosRequest;
            namespace Responses {
                export type $200 = /* querySavedVideosResponse */ Components.Schemas.QuerySavedVideosResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace UserVideoSave {
        namespace Post {
            export type RequestBody = /* createSavedVideoRequest */ Components.Schemas.CreateSavedVideoRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace VideoCommentBlock {
        namespace Post {
            export type RequestBody = /* blockUserRequest */ Components.Schemas.BlockUserRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoCommentDelete {
        namespace Post {
            export type RequestBody = /* deletePostRequest */ Components.Schemas.DeletePostRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoCommentPost {
        namespace Post {
            export type RequestBody = /* createPostRequest */ Components.Schemas.CreatePostRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoCommentQuery {
        namespace Post {
            export type RequestBody = /* queryPostsRequest */ Components.Schemas.QueryPostsRequest;
            namespace Responses {
                export type $200 = /* queryPostsResponse */ Components.Schemas.QueryPostsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoCommentQueryReplies {
        namespace Post {
            export type RequestBody = /* queryRepliesRequest */ Components.Schemas.QueryRepliesRequest;
            namespace Responses {
                export type $200 = /* queryPostsResponse */ Components.Schemas.QueryPostsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoCommentReport {
        namespace Post {
            export type RequestBody = /* reportPostRequest */ Components.Schemas.ReportPostRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoDelete {
        namespace Post {
            export type RequestBody = /* deleteVideoRequest */ Components.Schemas.DeleteVideoRequest;
            namespace Responses {
                export type $200 = /* deleteVideoResponse */ Components.Schemas.DeleteVideoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoGet {
        namespace Post {
            export type RequestBody = /* getVideoDetailsRequest */ Components.Schemas.GetVideoDetailsRequest;
            namespace Responses {
                export type $200 = /* getVideoDetailsResponse */ Components.Schemas.GetVideoDetailsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoNew {
        namespace Post {
            export type RequestBody = /* createVideoRequest */ Components.Schemas.CreateVideoRequest;
            namespace Responses {
                export type $200 = /**
                 * createVideoResponse
                 * Contains upload identifiers which should be used to upload files.
                 */ Components.Schemas.CreateVideoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace VideoPreviewGet {
        namespace Post {
            export type RequestBody = /* getVideoPreviewRequest */ Components.Schemas.GetVideoPreviewRequest;
            namespace Responses {
                export type $200 = /* getVideoPreviewResponse */ Components.Schemas.GetVideoPreviewResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoQueryUploaded {
        namespace Post {
            export type RequestBody = /* queryUploadedVideosRequest */ Components.Schemas.QueryUploadedVideosRequest;
            namespace Responses {
                export type $200 = /* queryUploadedVideosResponse */ Components.Schemas.QueryUploadedVideosResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace VideoRegisterEvent {
        namespace Post {
            export type RequestBody = /* registerAggregatedEventRequest */ Components.Schemas.RegisterAggregatedEventRequest;
            namespace Responses {
                export type $200 = /* registerAggregatedEventResponse */ Components.Schemas.RegisterAggregatedEventResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoReport {
        namespace Post {
            export type RequestBody = /* reportVideoRequest */ Components.Schemas.ReportVideoRequest;
            namespace Responses {
                export type $200 = /* reportVideoResponse */ Components.Schemas.ReportVideoResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VideoUpdate {
        namespace Post {
            export type RequestBody = /* updateUserVideoRequest */ Components.Schemas.UpdateUserVideoRequest;
            namespace Responses {
                export type $200 = /* messageResponseBase */ Components.Schemas.MessageResponseBase;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
                export type $409 = /* error409ConflictResponse */ Components.Schemas.Error409ConflictResponse;
            }
        }
    }
    namespace VoucherGet {
        namespace Post {
            export type RequestBody = /* getVoucherTransactionRequest */ Components.Schemas.GetVoucherTransactionRequest;
            namespace Responses {
                export type $200 = /* voucherTransactionResponse */ Components.Schemas.VoucherTransactionResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VoucherPurchase {
        namespace Post {
            export type RequestBody = /* createVoucherTransactionRequest */ Components.Schemas.CreateVoucherTransactionRequest;
            namespace Responses {
                export type $200 = /* voucherTransactionResponse */ Components.Schemas.VoucherTransactionResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VoucherQuery {
        namespace Post {
            export type RequestBody = /* queryVoucherTransactionRequest */ Components.Schemas.QueryVoucherTransactionRequest;
            namespace Responses {
                export type $200 = /* queryVoucherTransactionResponse */ Components.Schemas.QueryVoucherTransactionResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VoucherQueryBrands {
        namespace Post {
            export type RequestBody = /* getVoucherBrandsRequest */ Components.Schemas.GetVoucherBrandsRequest;
            namespace Responses {
                export type $200 = /* getVoucherBrandsResponse */ Components.Schemas.GetVoucherBrandsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VoucherQueryCountries {
        namespace Post {
            export type RequestBody = /* getVoucherCountriesRequest */ Components.Schemas.GetVoucherCountriesRequest;
            namespace Responses {
                export type $200 = /* getVoucherCountriesResponse */ Components.Schemas.GetVoucherCountriesResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace VoucherQueryStatistics {
        namespace Post {
            export type RequestBody = /* queryVoucherStatisticsRequest */ Components.Schemas.QueryVoucherStatisticsRequest;
            namespace Responses {
                export type $200 = /* queryVoucherStatisticsResponse */ Components.Schemas.QueryVoucherStatisticsResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace WebRecorderRemoteProductInitialize {
        namespace Post {
            export type RequestBody = /* initializeWebRecorderRequest */ Components.Schemas.InitializeWebRecorderRequest;
            namespace Responses {
                export type $200 = /* initializeWebRecorderResponse */ Components.Schemas.InitializeWebRecorderResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
            }
        }
    }
    namespace WomBeginValidation {
        namespace Post {
            export type RequestBody = /* WOMStartValidationRequest */ Components.Schemas.WOMStartValidationRequest;
            namespace Responses {
                export type $200 = /* validationStateResponse */ Components.Schemas.ValidationStateResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace WomCreateWomWallet {
        namespace Post {
            namespace Responses {
                export type $200 = /* walletResponse */ Components.Schemas.WalletResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace WomGetValidationState {
        namespace Post {
            export type RequestBody = /* getValidationStateRequest */ Components.Schemas.GetValidationStateRequest;
            namespace Responses {
                export type $200 = /* validationStateResponse */ Components.Schemas.ValidationStateResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
    namespace WomRestartValidation {
        namespace Post {
            export type RequestBody = /* WOMRestartValidationRequest */ Components.Schemas.WOMRestartValidationRequest;
            namespace Responses {
                export type $200 = /* validationStateResponse */ Components.Schemas.ValidationStateResponse;
                export type $400 = /* error400BadRequest */ Components.Schemas.Error400BadRequest;
                export interface $401 {}
                export type $404 = /* error404NotFoundResponse */ Components.Schemas.Error404NotFoundResponse;
            }
        }
    }
}
