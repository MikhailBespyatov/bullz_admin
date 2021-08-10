declare namespace WOM {
    /**
     * addressAccountType
     * Representing the wallet types<br/><br/>Values:<br/>0 = None<br/>1 = WOM<br/>2 = RP
     */
    export type AddressAccountType = 0 | 1 | 2; // int32
    /**
     * addressCreateRequest
     */
    export interface AddressCreateRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
        addressAccountType?: AddressAccountType; // int32
    }
    /**
     * addressResponse
     * A strongly typed entity representing the amount of tokens in a user's account.
     */
    export interface AddressResponse {
        /**
         * string
         * The name used to describe this address.
         */
        name?: string;
        /**
         * dateTime
         * The utc date of this address's creation.
         */
        utcCreated?: string; // date-time
        /**
         * string
         * This address's account type.
         */
        accountType?: string;
        /**
         * string
         * The unique address for this particular token account.
         */
        address?: string;
        /**
         * boolean
         * Only true if this address has previously participated in a transaction.
         */
        hasTransacted?: boolean;
        /**
         * boolean
         * True, if this is the default address for this account type.
         */
        isDefault?: boolean;
        /**
         * bigInteger
         * The balance currently on this address denominated in WEI
         * example:
         * 100000000000000000000000
         */
        balanceWei?: string; // string
        /**
         * decimal
         * The balance currently on this address denominated in Ether
         */
        balance?: number; // double
        /**
         * bigInteger
         * The balance pending on this address denominated in WEI
         * example:
         * 100000000000000000000000
         */
        pendingBalanceWei?: string; // string
        /**
         * decimal
         * The balance pending on this address denominated in Ether
         */
        pendingBalance?: number; // double
        /**
         * dateTime
         * The UTC datetime representation of the balance request.
         */
        balanceQueriedAtUtc?: string; // date-time
    }
    /**
     * analyzeEmailRequest
     */
    export interface AnalyzeEmailRequest {
        /**
         * string
         */
        email: string;
    }
    /**
     * analyzeEmailResponse
     */
    export interface AnalyzeEmailResponse {
        result?: EmailValidity; // int32
    }
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
     * brandResponse
     */
    export interface BrandResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
    }
    /**
     * brandVoucherResponse
     */
    export interface BrandVoucherResponse {
        /**
         * string
         */
        brandName?: string;
        /**
         * string
         */
        countryName?: string;
        /**
         * string
         */
        currency?: string;
        /**
         * list1
         */
        denominations?: number /* double */[];
        /**
         * list1
         */
        foreignDenominations?: number /* double */[];
        valueRestrictions?: VoucherValueRestrictions;
        foreignValueRestrictions?: VoucherValueRestrictions;
        /**
         * int64
         */
        productId?: number; // int64
        /**
         * string
         */
        productImage?: string;
        /**
         * string
         */
        productDescription?: string;
        /**
         * string
         */
        howToUse?: string;
        /**
         * string
         */
        termsAndConditions?: string;
        /**
         * string
         */
        expiryAndValidity?: string;
    }
    /**
     * brandsResponse
     */
    export interface BrandsResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: BrandResponse[];
    }
    /**
     * bridgeSystemBalanceResponse
     */
    export interface BridgeSystemBalanceResponse {
        womX?: SystemBalanceResponse;
        womERC20?: SystemBalanceResponse;
        /**
         * string
         */
        escrowAddress?: string;
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        escrowEthBalanceWei?: string; // string
        /**
         * string
         */
        telemetry?: string;
        /**
         * decimal
         */
        escrowEthBalance?: number; // double
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        missingFromEscrowWei?: string; // string
        /**
         * decimal
         */
        readonly missingFromEscrow?: number; // double
        /**
         * boolean
         */
        readonly isBalanced?: boolean;
    }
    /**
     * campaignBudget
     */
    export interface CampaignBudget {
        /**
         * decimal
         * The amount of money allocated to this campaign.
         */
        budgetTotal?: number; // double
        /**
         * decimal
         * The amount spent on this campaign so far.
         */
        budgetSpent?: number; // double
        /**
         * decimal
         * The amount being spent per day.
         */
        budgetPerDay?: number; // double
        /**
         * decimal
         * The remaining amount to be spent.
         */
        readonly budgetRemaining?: number; // double
        /**
         * dateTime
         */
        utcPaidUntil?: string; // date-time
        /**
         * boolean
         */
        readonly isCurrentlyPaid?: boolean;
    }
    /**
     * campaignDetailResponse
     */
    export interface CampaignDetailResponse {
        /**
         * objectId
         * This campaign's unique identifier.
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         * The user generated name of this campaign.
         */
        title?: string;
        /**
         * boolean
         * Determines the visibility of this campaign.
         */
        isHidden?: boolean;
        /**
         * objectId
         * The id of the organization that owns this campaign.
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * objectId
         * The id of the user who initially created this campaign.
         * example:
         * 000000000000000000000000
         */
        creatorId?: string; // objectId
        /**
         * objectId
         * The id of the user who last updated this campaign.
         * example:
         * 000000000000000000000000
         */
        updatedById?: string; // objectId
        /**
         * dateTime
         * The UTC creation date
         */
        utcCreated?: string; // date-time
        /**
         * dateTime
         * The UTC date of the last change.
         */
        utcLastUpdated?: string; // date-time
        /**
         * hashSet1
         * The IDs of the content items used for this campaign.
         */
        contentIds?: string /* objectId */[];
        engagement?: EngagementStatistics;
        deltaStatistics?: EngagementStatisticsHistorical;
        womQualityScore?: WOMQualityScore;
        settings?: CampaignSettings;
        budget?: CampaignBudget;
        schedule?: CampaignSchedule;
        /**
         * boolean
         */
        isEnabled?: boolean;
        /**
         * string
         */
        disabledReason?: string;
        /**
         * boolean
         */
        isActive?: boolean;
    }
    /**
     * campaignGetRequest
     */
    export interface CampaignGetRequest {
        /**
         * objectId
         * The unique identifier of the campaign you are retreiving.
         * example:
         * 000000000000000000000000
         */
        campaignId?: string; // objectId
        /**
         * int32
         * If set the query will return statistics based on the period (in days) specified here.
         */
        returnStatisticsPeriod?: number; // int32
    }
    /**
     * campaignSchedule
     */
    export interface CampaignSchedule {
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * dateTime
         */
        utcStarted?: string; // date-time
        /**
         * dateTime
         */
        utcEnded?: string; // date-time
        /**
         * dateTime
         */
        utcToStart?: string; // date-time
        /**
         * dateTime
         */
        utcToEnd?: string; // date-time
        /**
         * int32
         */
        readonly durationDays?: number; // int32
        /**
         * int32
         */
        readonly remainingDays?: number; // int32
        /**
         * boolean
         */
        readonly hasStarted?: boolean;
        /**
         * boolean
         */
        readonly hasEnded?: boolean;
        /**
         * boolean
         */
        readonly inDateWindow?: boolean;
    }
    /**
     * campaignSettings
     */
    export interface CampaignSettings {
        /**
         * boolean
         * Enable / disable 'watch override'
         */
        watchOverride?: boolean;
        /**
         * boolean
         * Enable / disable 'must watch'
         */
        mustWatch?: boolean;
        /**
         * int32
         * Boost the content by supplied value.
         */
        boostContentValue?: number; // int32
        /**
         * int32
         * Boost the creator by supplied value.
         */
        boostCreatorValue?: number; // int32
    }
    /**
     * campaignStatisticsQueryRequest
     */
    export interface CampaignStatisticsQueryRequest {
        /**
         * objectId
         * The id of the campaign.
         * example:
         * 000000000000000000000000
         */
        campaignId?: string; // objectId
        /**
         * date
         * Retrieve statistics starting with this date
         * example:
         * 2020-01-01T00:00:00Z
         */
        dateFrom?: string; // string
        /**
         * date
         * Retrieve statistics up until and including this date
         * example:
         * 2020-01-01T00:00:00Z
         */
        dateTo?: string; // string
        /**
         * int32
         * The amount of historical comparison sets to generate
         */
        historicalSets?: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * campaignStatisticsQueryResponse
     */
    export interface CampaignStatisticsQueryResponse {
        request?: CampaignStatisticsQueryRequest;
        deltaStatistics?: EngagementStatisticsHistorical;
        /**
         * list1
         */
        readonly sets?: CampaignStatisticsQuerySetResponse[];
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        readonly returnedRecords?: number; // int32
    }
    /**
     * campaignStatisticsQuerySetResponse
     */
    export interface CampaignStatisticsQuerySetResponse {
        request?: CampaignStatisticsQueryRequest;
        summary?: EngagementStatistics;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: DailyAggregatedCampaignStatistics[];
    }
    /**
     * campaignUpsertRequest
     */
    export interface CampaignUpsertRequest {
        /**
         * nullable1
         * The unique identifier of the campaign (only required during update).
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * The unique identifier of the organization (this cannot be changed)
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * string
         * The user generated name of this campaign.
         */
        title?: string;
        /**
         * boolean
         * Determines the visibility of this campaign.
         */
        isHidden?: boolean;
        /**
         * tags
         * This campaign's tags
         */
        tags?: string /* string */[];
        /**
         * hashSet1
         * The IDs of the content items used for this campaign.
         */
        contentIds?: string /* objectId */[];
        schedule?: CampaignSchedule;
        budget?: CampaignBudget;
        settings?: CampaignSettings;
    }
    /**
     * campaignsContentRequest
     */
    export interface CampaignsContentRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
    }
    /**
     * campaignsQueryRequest
     */
    export interface CampaignsQueryRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId: string; // objectId
        /**
         * list1
         * Return documents that match any of these tags
         */
        tagsAny?: string[];
        /**
         * list1
         * Return documents that contain all of these tags
         */
        tagsAll?: string[];
        /**
         * nullable1
         * Will only return campaigns that are currently active (or not).
         */
        isActive?: boolean;
        /**
         * int32
         * If set the query will return statistics based on the period (in days) specified here.
         */
        returnStatisticsPeriod?: number; // int32
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
     * campaignsQueryResponse
     */
    export interface CampaignsQueryResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: CampaignDetailResponse[];
    }
    /**
     * channelContentResponse
     */
    export interface ChannelContentResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        channelId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        productUrl?: string;
        /**
         * list1
         */
        audioLanguage?: string[];
        streaming?: StreamingInfo;
        engagement?: ContentEngagement;
    }
    /**
     * channelContentsResponse
     */
    export interface ChannelContentsResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: ChannelContentResponse[];
    }
    /**
     * channelResponse
     */
    export interface ChannelResponse {
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
        organizationId?: string; // objectId
        /**
         * string
         */
        publicId?: string;
        /**
         * string
         */
        name?: string;
        /**
         * boolean
         */
        isDisabled?: boolean;
        /**
         * boolean
         */
        isPrivate?: boolean;
    }
    /**
     * channelViewerContentItemsResponse
     */
    export interface ChannelViewerContentItemsResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: ChannelContentResponse[];
    }
    /**
     * channelsResponse
     */
    export interface ChannelsResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: ChannelResponse[];
    }
    /**
     * contentDeleteRequest
     */
    export interface ContentDeleteRequest {
        /**
         * objectId
         * Search by the id of the content required.
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         * Search by the remote id ('your' id) of this content.
         * You must request with a token issued on the target remote network for a match to occur.
         */
        remoteContentId?: string;
    }
    /**
     * contentEarningReportRequest
     */
    export interface ContentEarningReportRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         */
        remoteContentId?: string;
    }
    /**
     * contentEarningReportResponse
     */
    export interface ContentEarningReportResponse {
        /**
         * boolean
         */
        isCreator?: boolean;
        /**
         * boolean
         */
        isValidator?: boolean;
        /**
         * decimal
         */
        value?: number; // double
        /**
         * decimal
         */
        performanceValue?: number; // double
        /**
         * decimal
         */
        validatorValue?: number; // double
    }
    /**
     * contentEngagement
     */
    export interface ContentEngagement {
        /**
         * int32
         */
        viewCount?: number; // int32
        /**
         * int32
         */
        likeCount?: number; // int32
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
        readonly total?: number; // int32
    }
    /**
     * contentFlagInappropriateRequest
     */
    export interface ContentFlagInappropriateRequest {
        /**
         * objectId
         * Id of the content to be flagged.
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         * Remote id of the content to be flagged.
         * You must request with a token issued on the target remote network for a match to occur.
         */
        remoteContentId?: string;
    }
    /**
     * contentGetRequest
     */
    export interface ContentGetRequest {
        /**
         * objectId
         * Search by the id of the content required.
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         * Search by the remote id ('your' id) of this content.
         * You must request with a token issued on the target remote network for a match to occur.
         */
        remoteContentId?: string;
        /**
         * string
         * Search by the primary Uri of this content.
         */
        uriPrimary?: string;
        /**
         * boolean
         * Enable the 'is document hidden by user' feature.
         */
        returnUserValidatorHidden?: boolean;
        /**
         * boolean
         * Enable the 'user flag inappropriate' feature.
         */
        returnUserFlagInappropriate?: boolean;
        /**
         * boolean
         * Enable the 'user specific validation details' feature.
         */
        returnUserValidationDetails?: boolean;
        /**
         * boolean
         * Enable the 'user details' feature, which returns more comprehensive information on the owner.
         */
        returnUserDetails?: boolean;
        /**
         * boolean
         */
        returnContentEarnings?: boolean;
    }
    /**
     * contentItemResponse
     */
    export interface ContentItemResponse {
        /**
         * objectId
         * This content's unique identifier on WOM.
         * example:
         * 000000000000000000000000
         */
        womContentId?: string; // objectId
        /**
         * dateTime
         */
        createdUtc?: string; // date-time
        /**
         * string
         * The id for this content on the remote network that created it.
         */
        remoteContentId?: string;
        /**
         * objectId
         * The UserId of this content's owner.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * objectId
         * The segment Id of the originating (source) network.
         * example:
         * 000000000000000000000000
         */
        segmentId?: string; // objectId
        /**
         * string
         * The title given to this content by the creator.
         */
        title?: string;
        /**
         * list1
         * The first is the primary product of this content, followed by additional products if available.
         */
        products?: ProductResponseLegacy[];
        /**
         * hashSet1
         * The ids of campaigns this content is currently participating in.
         */
        inCampaignIds?: string /* objectId */[];
        /**
         * hashSet1
         * The ids of campaigns this content is currently being promoted in.
         */
        inCampaignPromotionIds?: string /* objectId */[];
        /**
         * boolean
         * True if this content is currently in use in any campaigns.
         */
        readonly inCampaignUse?: boolean;
        /**
         * boolean
         * True if this content is currently in use in any promotions.
         */
        readonly inCampaignPromotionUse?: boolean;
        /**
         * tags
         * The tags associated with this content.
         */
        tags?: string /* string */[];
        /**
         * string
         * The primary Uri of the content on the originating network.
         */
        uriPrimary?: string;
        streamDetails?: StreamDetails;
        videoAnalysis?: VideoAnalysisResponse;
        validationState?: ValidationStateResponse;
        womQualityScore?: WOMQualityScore;
        engagement?: EngagementStatistics;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        facilitatorUserId?: string; // objectId
        /**
         * nullable1
         * If requested in a query, this field shows if the requesting user has hidden this content for validation / authentication.
         */
        userValidatorHidden?: boolean;
        /**
         * nullable1
         * If requested in a query, this field shows if the requesting user has marked this content as inappropriate.
         */
        userFlagInappropriate?: boolean;
        /**
         * boolean
         * Has this content been deleted
         */
        isDeleted?: boolean;
        userValidationDetails?: UserValidationDetails;
        userDetails?: GetUserResponse;
        /**
         * nullable1
         */
        earningsValue?: number; // double
    }
    /**
     * contentPutRequest
     */
    export interface ContentPutRequest {
        /**
         * string
         * The remote id of this content, can be used to look up this content later.
         */
        remoteId?: string;
        /**
         * string
         * The title of this content.
         */
        title?: string;
        /**
         * tags
         * The tags associated with this content.
         */
        tags?: string /* string */[];
        /**
         * string
         * The primary Uri of this content, as determined by the remote network sending it.
         */
        uriPrimary?: string;
        streamDetails?: StreamDetails;
        videoAnalysis?: VideoAnalysisResponse;
        /**
         * boolean
         * If true, allows to accept the video details at a later time.
         */
        isDelayedProcessing?: boolean;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        primaryProductId?: string; // objectId
        /**
         * string
         * The id of the facilitator on the calling network. Leave null if none specified.
         */
        facilitatorUserId?: string;
        /**
         * string
         * The id of the publisher organization/system/user.
         */
        publisherId?: string;
    }
    /**
     * contentPutResponse
     */
    export interface ContentPutResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * contentQueryPromoted
     */
    export interface ContentQueryPromoted {}
    /**
     * contentQueryRequest
     */
    export interface ContentQueryRequest {
        /**
         * hashSet1
         * Query by a list of content ids.
         */
        byContentIds?: string /* objectId */[];
        validationResult?: ValidationResult; // int32
        validationEndedReason?: ValidationEndedReason; // int32
        validationStage?: ValidationStage; // int32
        /**
         * nullable1
         * Filter by documents that are currently being validated.
         */
        currentlyValidating?: boolean;
        /**
         * nullable1
         * Filter by reported state
         */
        isReported?: boolean;
        /**
         * nullable1
         * Filter by live state
         */
        isLive?: boolean;
        /**
         * nullable1
         * If set, will return deleted videos
         */
        isDeleted?: boolean;
        /**
         * nullable1
         * Filter by whether this user participated during consensus.
         */
        partOfConsensus?: boolean;
        /**
         * boolean
         * Implies: PartOfConsensus, returns validation documents that the user participated in, but did not get rewarded for or that are no longer live.
         */
        partOfConsensusComplete?: boolean;
        /**
         * objectId
         * Return only documents owned by this user Id.
         * example:
         * 000000000000000000000000
         */
        byUserId?: string; // objectId
        /**
         * string
         * Return only documents owned by this remote user Id.
         * You must request with a token issued on the target remote network for a match to occur.
         */
        byRemoteUserId?: string;
        /**
         * string
         * Return only documents owned by this remote Id.
         * You must request with a token issued on the target remote network for a match to occur.
         */
        byRemoteId?: string;
        /**
         * objectId
         * Return only documents from this segment.
         * example:
         * 000000000000000000000000
         */
        bySegmentId?: string; // objectId
        /**
         * nullable1
         * Filter by documents that are single channel audio
         */
        isSingleChannelAudio?: boolean;
        /**
         * nullable1
         * Filter by documents that are unlimited length
         */
        isUnlimitedLength?: boolean;
        /**
         * nullable1
         * Filter by documents that were filmed in portrait mode
         */
        isPortraitAspect?: boolean;
        /**
         * nullable1
         * Filter by documents with subtitles.
         */
        hasSubtitles?: boolean;
        /**
         * tags
         * Return documents that match any of these tags
         */
        tagsAny?: string /* string */[];
        /**
         * tags
         * Return documents that contain all of these tags
         */
        tagsAll?: string /* string */[];
        /**
         * boolean
         * Enable the 'is document hidden by user' feature.
         */
        returnUserValidatorHidden?: boolean;
        /**
         * boolean
         * Enable the 'user flag inappropriate' feature.
         */
        returnUserFlagInappropriate?: boolean;
        /**
         * boolean
         * Enable the 'user specific validation details' feature.
         */
        returnUserValidationDetails?: boolean;
        /**
         * boolean
         * Enable the 'user details' feature, which returns more comprehensive information on the owner.
         */
        returnUserDetails?: boolean;
        /**
         * boolean
         * Will return this user's earnings for each content element
         */
        returnContentEarnings?: boolean;
        /**
         * boolean
         */
        orderByValidationTimer?: boolean;
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
     * contentQueryResponse
     */
    export interface ContentQueryResponse {
        request?: ContentQueryRequest;
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: ContentItemResponse[];
    }
    /**
     * contentResponse
     */
    export interface ContentResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        productUrl?: string;
        /**
         * list1
         */
        audioLanguage?: string[];
        streaming?: StreamingInfo;
        engagement?: ContentEngagement;
    }
    /**
     * contentStatisticsQueryRequest
     */
    export interface ContentStatisticsQueryRequest {
        /**
         * objectId
         * Search by the id of the content required.
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         * Search by the remote id ('your' id) of this content.
         * You must request with a token issued on the target remote network for a match to occur.
         */
        remoteContentId?: string;
        /**
         * string
         * Search by the primary Uri of this content.
         */
        uriPrimary?: string;
        /**
         * date
         * Retrieve statistics starting with this date
         * example:
         * 2020-01-01T00:00:00Z
         */
        dateFrom?: string; // string
        /**
         * date
         * Retrieve statistics up until and including this date
         * example:
         * 2020-01-01T00:00:00Z
         */
        dateTo?: string; // string
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * contentStatisticsQueryResponse
     */
    export interface ContentStatisticsQueryResponse {
        request?: ContentStatisticsQueryRequest;
        totalsInPage?: EngagementStatistics;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: StatisticsDaily[];
    }
    /**
     * contentStreamUpdateRequest
     */
    export interface ContentStreamUpdateRequest {
        /**
         * objectId
         * Search by the id of the content required.
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         * The remote id of this content, can be used to look up this content later.
         */
        remoteContentId?: string;
        /**
         * string
         * The primary Uri of this content, as determined by the remote network sending it.
         */
        uriPrimary?: string;
        streamDetails?: StreamDetails;
        videoAnalysis?: VideoAnalysisResponse;
    }
    /**
     * createBrandRequest
     */
    export interface CreateBrandRequest {
        /**
         * string
         */
        name?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
    }
    /**
     * createChannelContentRequest
     */
    export interface CreateChannelContentRequest {
        /**
         * nullable1
         * If calling user is an admin, they will be able to create a channel content on behalf of other organization.
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        channelId?: string; // objectId
        /**
         * string
         */
        affiliateLinkUrl?: string;
    }
    /**
     * createChannelRequest
     */
    export interface CreateChannelRequest {
        /**
         * string
         */
        name?: string;
        /**
         * boolean
         */
        isPrivate?: boolean;
    }
    /**
     * createNetworkAdministratorRequest
     */
    export interface CreateNetworkAdministratorRequest {
        /**
         * string
         */
        remoteIssuer?: string;
        /**
         * string
         */
        remoteId?: string;
    }
    /**
     * createOrganizationRequest
     */
    export interface CreateOrganizationRequest {
        /**
         * string
         * The title of this organization.
         */
        companyName?: string;
        /**
         * string
         * The key that will be used publicly to represent this organization.
         */
        key?: string;
        /**
         * string
         * Supply an email for the initial administrator of this organization.
         */
        administratorEmail?: string;
        /**
         * tags
         * The mandatory tags of this organization.
         */
        mandatoryTags?: string /* string */[];
    }
    /**
     * createProductRequest
     */
    export interface CreateProductRequest {
        /**
         * string
         */
        name?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        brandId?: string; // objectId
    }
    /**
     * createRemoteProductRequest
     */
    export interface CreateRemoteProductRequest {
        /**
         * string
         */
        name?: string;
        /**
         * string
         */
        brand?: string;
        /**
         * string
         */
        publicId?: string;
        /**
         * string
         */
        url?: string;
        /**
         * string
         */
        imageUrl?: string;
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
     * cryptoInformationResponse
     */
    export interface CryptoInformationResponse {
        /**
         * list1
         */
        addresses?: AddressResponse[];
        bridgeBalanceReport?: BridgeSystemBalanceResponse;
        /**
         * transactionQueueReportResponse
         */
        pendingBalanceReport?: TransactionQueueReportItemResponse[];
    }
    /**
     * dailyAggregatedCampaignStatistics
     */
    export interface DailyAggregatedCampaignStatistics {
        /**
         * objectId
         * The ID of the campaign
         * example:
         * 000000000000000000000000
         */
        campaignId?: string; // objectId
        /**
         * date
         * The date (does not include a time component) of this statistics entry.
         * example:
         * 2020-01-01T00:00:00Z
         */
        dateUtc?: string; // string
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        authenticity?: number; // double
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        creativity?: number; // double
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        positivity?: number; // double
        /**
         * int32
         * The total number of views
         */
        viewCount?: number; // int32
        /**
         * int32
         * Views that had a duration less than 25%
         */
        viewD1Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD1Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 25-49%
         */
        viewD2Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD2Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 50-74%
         */
        viewD3Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD3Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 75-100%
         */
        viewD4Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD4Percentage?: number; // double
        /**
         * int32
         * The total number of likes
         */
        likeCount?: number; // int32
        /**
         * decimal
         */
        readonly likesPercentage?: number; // double
        /**
         * int32
         * The total number of ratings by users (not authenticators)
         */
        ratingCount?: number; // int32
        /**
         * decimal
         */
        readonly ratingsPercentage?: number; // double
        /**
         * int32
         * The total number of times this item was saved.
         */
        saveCount?: number; // int32
        /**
         * decimal
         */
        readonly savesPercentage?: number; // double
        /**
         * int32
         * The amount of times this item was shared.
         */
        shareCount?: number; // int32
        /**
         * decimal
         */
        readonly sharesPercentage?: number; // double
        /**
         * int32
         * The amount of comments.
         */
        commentCount?: number; // int32
        /**
         * decimal
         */
        readonly commentsPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a click.
         */
        clickCount?: number; // int32
        /**
         * decimal
         */
        readonly clicksPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a buy event.
         */
        buyCount?: number; // int32
        /**
         * decimal
         */
        readonly buysPercentage?: number; // double
        /**
         * int32
         * The total engagements of this item.
         */
        readonly total?: number; // int32
    }
    /**
     * dailyAggregatedOrganizationStatistics
     */
    export interface DailyAggregatedOrganizationStatistics {
        /**
         * objectId
         * The ID of the organization
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * date
         * The date (does not include a time component) of this statistics entry.
         * example:
         * 2020-01-01T00:00:00Z
         */
        dateUtc?: string; // string
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        authenticity?: number; // double
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        creativity?: number; // double
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        positivity?: number; // double
        /**
         * int32
         * The total number of views
         */
        viewCount?: number; // int32
        /**
         * int32
         * Views that had a duration less than 25%
         */
        viewD1Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD1Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 25-49%
         */
        viewD2Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD2Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 50-74%
         */
        viewD3Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD3Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 75-100%
         */
        viewD4Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD4Percentage?: number; // double
        /**
         * int32
         * The total number of likes
         */
        likeCount?: number; // int32
        /**
         * decimal
         */
        readonly likesPercentage?: number; // double
        /**
         * int32
         * The total number of ratings by users (not authenticators)
         */
        ratingCount?: number; // int32
        /**
         * decimal
         */
        readonly ratingsPercentage?: number; // double
        /**
         * int32
         * The total number of times this item was saved.
         */
        saveCount?: number; // int32
        /**
         * decimal
         */
        readonly savesPercentage?: number; // double
        /**
         * int32
         * The amount of times this item was shared.
         */
        shareCount?: number; // int32
        /**
         * decimal
         */
        readonly sharesPercentage?: number; // double
        /**
         * int32
         * The amount of comments.
         */
        commentCount?: number; // int32
        /**
         * decimal
         */
        readonly commentsPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a click.
         */
        clickCount?: number; // int32
        /**
         * decimal
         */
        readonly clicksPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a buy event.
         */
        buyCount?: number; // int32
        /**
         * decimal
         */
        readonly buysPercentage?: number; // double
        /**
         * int32
         * The total engagements of this item.
         */
        readonly total?: number; // int32
    }
    /**
     * deleteBrandRequest
     */
    export interface DeleteBrandRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * deleteChannelContentRequest
     */
    export interface DeleteChannelContentRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * deleteChannelRequest
     */
    export interface DeleteChannelRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * deleteProductRequest
     */
    export interface DeleteProductRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * deleteRemoteProductRequest
     */
    export interface DeleteRemoteProductRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * emailValidity
     * <br/><br/>Values:<br/>0 = NotExists<br/>1 = InvalidFormat<br/>2 = SingleUseDomain<br/>3 = Exists
     */
    export type EmailValidity = 0 | 1 | 2 | 3; // int32
    /**
     * enableNetworkAccountRequest
     */
    export interface EnableNetworkAccountRequest {
        /**
         * string
         */
        remoteId?: string;
        /**
         * string
         */
        remoteUsername?: string;
        /**
         * string
         */
        remoteValidatedEmail?: string;
        /**
         * string
         */
        remoteVerifiedMobileNumber?: string;
        /**
         * cultureInfo
         * example:
         * en-GB
         */
        remoteLocale?: string; // string
    }
    /**
     * engagementStatistics
     */
    export interface EngagementStatistics {
        /**
         * int32
         * The total number of views
         */
        viewCount?: number; // int32
        /**
         * int32
         * Views that had a duration less than 25%
         */
        viewD1Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD1Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 25-49%
         */
        viewD2Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD2Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 50-74%
         */
        viewD3Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD3Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 75-100%
         */
        viewD4Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD4Percentage?: number; // double
        /**
         * int32
         * The total number of likes
         */
        likeCount?: number; // int32
        /**
         * decimal
         */
        readonly likesPercentage?: number; // double
        /**
         * int32
         * The total number of ratings by users (not authenticators)
         */
        ratingCount?: number; // int32
        /**
         * decimal
         */
        readonly ratingsPercentage?: number; // double
        /**
         * int32
         * The total number of times this item was saved.
         */
        saveCount?: number; // int32
        /**
         * decimal
         */
        readonly savesPercentage?: number; // double
        /**
         * int32
         * The amount of times this item was shared.
         */
        shareCount?: number; // int32
        /**
         * decimal
         */
        readonly sharesPercentage?: number; // double
        /**
         * int32
         * The amount of comments.
         */
        commentCount?: number; // int32
        /**
         * decimal
         */
        readonly commentsPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a click.
         */
        clickCount?: number; // int32
        /**
         * decimal
         */
        readonly clicksPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a buy event.
         */
        buyCount?: number; // int32
        /**
         * decimal
         */
        readonly buysPercentage?: number; // double
        /**
         * int32
         * The total engagements of this item.
         */
        readonly total?: number; // int32
    }
    /**
     * engagementStatisticsHistorical
     */
    export interface EngagementStatisticsHistorical {
        /**
         * dateTime
         */
        dateFromHistorical?: string; // date-time
        /**
         * dateTime
         */
        dateToHistorical?: string; // date-time
        /**
         * dateTime
         */
        dateFromLatest?: string; // date-time
        /**
         * dateTime
         */
        dateToLatest?: string; // date-time
        /**
         * decimal
         */
        readonly viewsDelta?: number; // double
        /**
         * decimal
         */
        readonly viewsD1Delta?: number; // double
        /**
         * decimal
         */
        readonly viewsD2Delta?: number; // double
        /**
         * decimal
         */
        readonly viewsD3Delta?: number; // double
        /**
         * decimal
         */
        readonly viewsD4Delta?: number; // double
        /**
         * decimal
         */
        readonly likesDelta?: number; // double
        /**
         * decimal
         */
        readonly ratingsDelta?: number; // double
        /**
         * decimal
         */
        readonly savesDelta?: number; // double
        /**
         * decimal
         */
        readonly sharesDelta?: number; // double
        /**
         * decimal
         */
        readonly clicksDelta?: number; // double
        /**
         * decimal
         */
        readonly buysDelta?: number; // double
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
        };
        /**
         * string
         */
        title?: string;
        /**
         * string
         */
        traceId?: string;
        /**
         * boolean
         */
        readonly isSuccess?: boolean;
        loggingLevel?: LogLevel; // int32
        /**
         * string
         */
        readonly message?: string;
    }
    /**
     * error404NotFoundResponse
     */
    export interface Error404NotFoundResponse {
        /**
         * boolean
         */
        readonly isSuccess?: boolean;
        loggingLevel?: LogLevel; // int32
        /**
         * string
         */
        readonly message?: string;
    }
    /**
     * error409ConflictResponse
     */
    export interface Error409ConflictResponse {
        /**
         * boolean
         */
        readonly isSuccess?: boolean;
        loggingLevel?: LogLevel; // int32
        /**
         * string
         */
        readonly message?: string;
    }
    /**
     * exchangeRateItem
     */
    export interface ExchangeRateItem {
        /**
         * string
         */
        assetName?: string;
        /**
         * decimal
         */
        price?: number; // double
    }
    /**
     * exchangeRateRequest
     */
    export interface ExchangeRateRequest {}
    /**
     * exchangeRateResponse
     */
    export interface ExchangeRateResponse {
        /**
         * list1
         */
        rates?: ExchangeRateItem[];
        /**
         * dateTime
         * The time at which this request to the token information external API was made.
         */
        utcRequested?: string; // date-time
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
     * getBrandRequest
     */
    export interface GetBrandRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * getChannelContentRequest
     */
    export interface GetChannelContentRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * getChannelRequest
     */
    export interface GetChannelRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
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
        userId?: string; // objectId
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
        roles?: string /* string */[];
        /**
         * string
         */
        email?: string;
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
     * getOrganizationRequest
     */
    export interface GetOrganizationRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId: string; // objectId
    }
    /**
     * getOrganizationTagsRequest
     */
    export interface GetOrganizationTagsRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId: string; // objectId
    }
    /**
     * getProductRequest
     */
    export interface GetProductRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
    }
    /**
     * getRemoteProductRequest
     */
    export interface GetRemoteProductRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        remoteId?: string;
    }
    /**
     * getUserRequest
     */
    export interface GetUserRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * string
         */
        remoteUserId?: string;
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
        /**
         * objectId
         * WOM's id for this user.
         * example:
         * 000000000000000000000000
         */
        womUserId?: string; // objectId
        /**
         * string
         */
        firstName?: string;
        /**
         * string
         */
        lastName?: string;
        /**
         * string
         */
        readonly fullName?: string;
        /**
         * string
         * The user's remote id (not WOM userId) if it exists.
         */
        remoteUserId?: string;
        /**
         * string
         * The user's remote username if it exists.
         */
        remoteUsername?: string;
        /**
         * string
         * The remote issuer that created this user, if it exists.
         */
        remoteIssuer?: string;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        walletId?: string; // objectId
        /**
         * boolean
         */
        hasWallet?: boolean;
        /**
         * int32
         * If this user is allowed free stakes, the amount of stakes remaining.
         */
        freeStakesRemaining?: number; // int32
        /**
         * objectId
         * If this user is a member of any organization.
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
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
        roles?: string /* string */[];
        /**
         * string
         */
        email?: string;
        /**
         * string
         */
        mobileNumber?: string;
        /**
         * string
         */
        username?: string;
        /**
         * boolean
         */
        isAccountVerified?: boolean;
        /**
         * boolean
         */
        isEmailValidated?: boolean;
        profile?: UserProfileResponse;
    }
    /**
     * getValidationDetailRequest
     */
    export interface GetValidationDetailRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         */
        remoteContentId?: string;
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
        remoteContentId?: string;
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: BrandVoucherResponse[];
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
        countries?: string[];
        /**
         * string
         */
        readonly message?: string;
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
     * hour
     */
    export interface Hour {
        /**
         * int32
         */
        hoursSinceEpoch?: number; // int32
        /**
         * boolean
         */
        readonly isDefault?: boolean;
    }
    /**
     * initializeWebRecorderRequest
     */
    export interface InitializeWebRecorderRequest {
        /**
         * string
         */
        organizationPublicId?: string;
        remoteProduct?: RemoteProductDescription;
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
     * linkRemoteProductRequest
     */
    export interface LinkRemoteProductRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        remoteProductId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        productId?: string; // objectId
        /**
         * boolean
         */
        link?: boolean;
    }
    /**
     * linkedProductResponse
     */
    export interface LinkedProductResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        brandId?: string; // objectId
    }
    /**
     * logLevel
     * <br/><br/>Values:<br/>0 = Trace<br/>1 = Debug<br/>2 = Information<br/>3 = Warning<br/>4 = Error<br/>5 = Critical<br/>6 = None
     */
    export type LogLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6; // int32
    /**
     * messageResponseBase
     */
    export interface MessageResponseBase {
        /**
         * string
         */
        readonly message?: string;
        /**
         * boolean
         */
        isSuccess?: boolean;
    }
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
        type?: string;
        /**
         * string
         */
        receiverUserId?: string;
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
        arguments?: string[];
        /**
         * dictionary2
         */
        keys?: {
            [name: string]: string;
        };
    }
    /**
     * notificationsResponse
     */
    export interface NotificationsResponse {
        /**
         * list1
         */
        items?: NotificationItemResponse[];
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        maxId?: string; // objectId
    }
    /**
     * organizationAcceptInviteRequest
     */
    export interface OrganizationAcceptInviteRequest {
        /**
         * string
         * The invite code will associate the created user with the correct organization
         */
        inviteCode: string;
        /**
         * string
         * The user name of this account
         */
        username: string;
        /**
         * string
         * The password must be at least 8 characters long, contain a digit and an uppercase character.
         */
        password: string;
    }
    /**
     * organizationAnalyzeEmailRequest
     */
    export interface OrganizationAnalyzeEmailRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * string
         */
        email: string;
    }
    /**
     * organizationAuthenticateWithTokenRequest
     */
    export interface OrganizationAuthenticateWithTokenRequest {
        /**
         * string
         */
        email: string;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
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
     * organizationIdentityRequest
     */
    export interface OrganizationIdentityRequest {
        /**
         * string
         * The key for the organization, usually taken from the CM sub domain.
         */
        organizationKey?: string;
    }
    /**
     * organizationIdentityResponse
     */
    export interface OrganizationIdentityResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * string
         */
        organizationTitle?: string;
        /**
         * boolean
         */
        hasTheme?: boolean;
    }
    /**
     * organizationInvitationItem
     */
    export interface OrganizationInvitationItem {
        /**
         * string
         */
        email: string;
        permission: OrganizationPermission; // int32
    }
    /**
     * organizationModifyUserRequest
     */
    export interface OrganizationModifyUserRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
        permission: OrganizationPermission; // int32
    }
    /**
     * organizationPermission
     * <br/><br/>Values:<br/>0 = None<br/>1 = Member<br/>2 = Admin
     */
    export type OrganizationPermission = 0 | 1 | 2; // int32
    /**
     * organizationQueryUsersRequest
     */
    export interface OrganizationQueryUsersRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId: string; // objectId
        /**
         * string
         */
        textSearch?: string;
        /**
         * list1
         */
        userIds?: string /* objectId */[];
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
     * organizationQueryUsersResponse
     */
    export interface OrganizationQueryUsersResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: GetUserResponse[];
    }
    /**
     * organizationResponse
     */
    export interface OrganizationResponse {
        /**
         * objectId
         * The unique identifier for this organization
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * string
         * The title of this organization.
         */
        title?: string;
        /**
         * string
         * The key that will used publicly to represent this organization.
         */
        key?: string;
        /**
         * string
         * This field is a public merchant id. Instead of Key.
         */
        publicId?: string;
        /**
         * tags
         * The mandatory tags of this organization.
         */
        mandatoryTags?: string /* string */[];
        /**
         * list1
         * The users (by id) that have admin rights over this organization.
         */
        adminIds?: string /* objectId */[];
        /**
         * list1
         * The users (by id) that are members of this organization.
         */
        memberIds?: string /* objectId */[];
        /**
         * objectId
         * If created, the identifier of this organization's wallet
         * example:
         * 000000000000000000000000
         */
        walletId?: string; // objectId
        /**
         * boolean
         * True if this organization has a token wallet.
         */
        hasWallet?: boolean;
    }
    /**
     * organizationSendInvitationsRequest
     */
    export interface OrganizationSendInvitationsRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId: string; // objectId
        /**
         * list1
         */
        invitations: OrganizationInvitationItem[];
    }
    /**
     * organizationStatisticsQueryRequest
     */
    export interface OrganizationStatisticsQueryRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * date
         * Retrieve statistics starting with this date
         * example:
         * 2020-01-01T00:00:00Z
         */
        dateFrom?: string; // string
        /**
         * date
         * Retrieve statistics up until and including this date
         * example:
         * 2020-01-01T00:00:00Z
         */
        dateTo?: string; // string
        /**
         * int32
         * The amount of historical comparison sets to generate
         */
        historicalSets?: number; // int32
        /**
         * boolean
         */
        returnQueryCount?: boolean;
    }
    /**
     * organizationStatisticsQueryResponse
     */
    export interface OrganizationStatisticsQueryResponse {
        request?: OrganizationStatisticsQueryRequest;
        deltaStatistics?: EngagementStatisticsHistorical;
        /**
         * list1
         */
        readonly sets?: OrganizationStatisticsQuerySetResponse[];
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        readonly returnedRecords?: number; // int32
    }
    /**
     * organizationStatisticsQuerySetResponse
     */
    export interface OrganizationStatisticsQuerySetResponse {
        request?: OrganizationStatisticsQueryRequest;
        summary?: EngagementStatistics;
        /**
         * int32
         */
        totalRecords?: number; // int32
        /**
         * int32
         */
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: DailyAggregatedOrganizationStatistics[];
    }
    /**
     * organizationStatisticsRequest
     */
    export interface OrganizationStatisticsRequest {
        /**
         * objectId
         * The id of the organization.
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
    }
    /**
     * organizationStatisticsResponse
     */
    export interface OrganizationStatisticsResponse {
        /**
         * int32
         */
        campaignsRunning?: number; // int32
        /**
         * decimal
         * The amount of money allocated to this campaign.
         */
        budgetTotal?: number; // double
        /**
         * decimal
         * The amount spent on this campaign so far.
         */
        budgetSpent?: number; // double
        /**
         * decimal
         * The amount being spent per day.
         */
        budgetPerDay?: number; // double
        /**
         * decimal
         * The remaining amount to be spent.
         */
        readonly budgetRemaining?: number; // double
        /**
         * dateTime
         */
        utcPaidUntil?: string; // date-time
        /**
         * boolean
         */
        readonly isCurrentlyPaid?: boolean;
    }
    /**
     * organizationTagsResponse
     */
    export interface OrganizationTagsResponse {
        /**
         * tags
         */
        discoveryTags?: string /* string */[];
    }
    /**
     * organizationUserAuthChallengeRequest
     */
    export interface OrganizationUserAuthChallengeRequest {
        /**
         * string
         */
        email: string;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * string
         */
        password: string;
    }
    /**
     * organizationUserWantsForgottenPasswordRequest
     */
    export interface OrganizationUserWantsForgottenPasswordRequest {
        /**
         * string
         */
        email: string;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
    }
    /**
     * organizationUserWantsValidationLinkEmailRequest
     */
    export interface OrganizationUserWantsValidationLinkEmailRequest {
        /**
         * string
         */
        email: string;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
    }
    /**
     * organizationsResponse
     */
    export interface OrganizationsResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: OrganizationResponse[];
    }
    /**
     * paymentType
     * <br/><br/>Values:<br/>0 = None<br/>1 = Creator<br/>2 = Authenticator<br/>3 = Facilitator<br/>4 = Publisher<br/>5 = DisplayNetwork<br/>6 = Advertiser<br/>7 = Brand
     */
    export type PaymentType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // int32
    /**
     * performancePaymentsContentPaymentsItem
     */
    export interface PerformancePaymentsContentPaymentsItem {
        /**
         * string
         */
        name?: string;
        /**
         * string
         */
        address?: string;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        transactionId?: string; // objectId
        type?: PaymentType; // int32
        /**
         * decimal
         */
        value?: number; // double
    }
    /**
     * performancePaymentsContentPaymentsRequest
     */
    export interface PerformancePaymentsContentPaymentsRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        auditId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
    }
    /**
     * performancePaymentsContentPaymentsResponse
     */
    export interface PerformancePaymentsContentPaymentsResponse {
        /**
         * int32
         */
        paymentsCount?: number; // int32
        /**
         * list1
         */
        items?: PerformancePaymentsContentPaymentsItem[];
    }
    /**
     * performancePaymentsGetRequest
     */
    export interface PerformancePaymentsGetRequest {
        /**
         * int32
         */
        year?: number; // int32
        /**
         * int32
         */
        month?: number; // int32
        /**
         * int32
         */
        day?: number; // int32
        /**
         * boolean
         */
        processPayments?: boolean;
        /**
         * boolean
         */
        reAnalyze?: boolean;
    }
    /**
     * performancePaymentsGetResponse
     */
    export interface PerformancePaymentsGetResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        auditId?: string; // objectId
        /**
         * date
         * example:
         * 2020-01-01T00:00:00Z
         */
        date?: string; // string
        /**
         * dateTime
         */
        readonly utcDate?: string; // date-time
        /**
         * dateTime
         */
        utcGenerated?: string; // date-time
        /**
         * boolean
         */
        isCompleted?: boolean;
        /**
         * decimal
         */
        womEmissionCalculated?: number; // double
        /**
         * decimal
         */
        womEmissionExpected?: number; // double
        /**
         * decimal
         */
        globalContentPoints?: number; // double
        /**
         * decimal
         */
        globalAuthenticationPoints?: number; // double
        /**
         * decimal
         */
        globalPoints?: number; // double
        /**
         * timeSpan
         * example:
         * 0
         */
        timingPerformance?: number; // int64
        /**
         * timeSpan
         * example:
         * 0
         */
        timingPayments?: number; // int64
        /**
         * list1
         */
        items?: PerformancePaymentsItem[];
        /**
         * string
         */
        readonly url?: string;
    }
    /**
     * performancePaymentsItem
     */
    export interface PerformancePaymentsItem {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         */
        title?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
        /**
         * decimal
         */
        womPayout?: number; // double
        /**
         * decimal
         */
        womPromotedPayout?: number; // double
        /**
         * decimal
         */
        authenticationPoints?: number; // double
        /**
         * decimal
         */
        contentPoints?: number; // double
        /**
         * decimal
         */
        totalPoints?: number; // double
    }
    /**
     * performancePaymentsQueryRequest
     */
    export interface PerformancePaymentsQueryRequest {
        /**
         * dateTime
         */
        dateFrom?: string; // date-time
        /**
         * dateTime
         */
        dateTo?: string; // date-time
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
     * performancePaymentsQueryResponse
     */
    export interface PerformancePaymentsQueryResponse {
        request?: PerformancePaymentsQueryRequest;
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: PerformancePaymentsGetResponse[];
    }
    /**
     * productInfo
     */
    export interface ProductInfo {
        /**
         * string
         */
        productImage?: string;
        /**
         * string
         */
        productDescription?: string;
        /**
         * string
         */
        howToUse?: string;
        /**
         * string
         */
        termsAndConditions?: string;
        /**
         * string
         */
        expiryAndValidity?: string;
        /**
         * string
         */
        brandName?: string;
        /**
         * string
         */
        countryName?: string;
    }
    /**
     * productResponse
     */
    export interface ProductResponse {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        brandId?: string; // objectId
        brand?: BrandResponse;
        /**
         * nullable1
         */
        hasRemoteProduct?: boolean;
    }
    /**
     * productResponseLegacy
     */
    export interface ProductResponseLegacy {
        /**
         * objectId
         * The product's unique identifier
         * example:
         * 000000000000000000000000
         */
        readonly id?: string; // objectId
        /**
         * string
         * This product's brand name
         */
        brandName?: string;
        /**
         * string
         * The item name of this product.
         */
        item?: string;
        /**
         * tag
         * The tag that represents this product's brand.
         * example:
         * string
         */
        tagBrand?: string; // string
        /**
         * tag
         * The main category tag
         * example:
         * string
         */
        tagCategory?: string; // string
        /**
         * tag
         * The sub category tag
         * example:
         * string
         */
        tagSubCategory?: string; // string
        /**
         * tags
         * Extra tags, will not include other tags referenced here.
         */
        extraTags?: string /* string */[];
    }
    /**
     * productsResponse
     */
    export interface ProductsResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: ProductResponse[];
    }
    /**
     * queryBrandsRequest
     */
    export interface QueryBrandsRequest {
        /**
         * list1
         */
        ids?: string /* objectId */[];
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
     * queryChannelContentsRequest
     */
    export interface QueryChannelContentsRequest {
        /**
         * nullable1
         * If calling user is an admin, they will be able to create a channel content on behalf of other organization.
         * example:
         * 000000000000000000000000
         */
        channelId?: string; // objectId
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
     * queryChannelViewerContentRequest
     */
    export interface QueryChannelViewerContentRequest {
        /**
         * string
         */
        organizationPublicId?: string;
        /**
         * string
         */
        channelPublicId?: string;
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
     * queryChannelsRequest
     */
    export interface QueryChannelsRequest {
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
     * queryOrganizationRequest
     */
    export interface QueryOrganizationRequest {
        /**
         * nullable1
         * True if organizations should has a token wallet.
         */
        hasWallet?: boolean;
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
     * queryProductViewerContentRequest
     */
    export interface QueryProductViewerContentRequest {
        /**
         * string
         */
        organizationPublicId?: string;
        /**
         * string
         */
        remoteProductId?: string;
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
     * queryProductViewerContentResponse
     */
    export interface QueryProductViewerContentResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: ContentResponse[];
    }
    /**
     * queryProductsRequest
     */
    export interface QueryProductsRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        brandId?: string; // objectId
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
     * queryRemoteProductsRequest
     */
    export interface QueryRemoteProductsRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * nullable1
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
     * queryUnlinkedRemoteProductsRequest
     */
    export interface QueryUnlinkedRemoteProductsRequest {
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: VoucherTransactionResponse[];
    }
    /**
     * remoteProductDescription
     */
    export interface RemoteProductDescription {
        /**
         * string
         */
        publicId?: string;
        /**
         * string
         */
        name?: string;
        /**
         * string
         */
        brand?: string;
        /**
         * string
         */
        url?: string;
        /**
         * string
         */
        imageUrl?: string;
    }
    /**
     * remoteProductResponse
     */
    export interface RemoteProductResponse {
        linkedProduct?: LinkedProductResponse;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string;
        /**
         * string
         */
        brand?: string;
        /**
         * string
         */
        publicId?: string;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * string
         */
        url?: string;
        /**
         * string
         */
        imageUrl?: string;
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        linkedProductId?: string; // objectId
    }
    /**
     * remoteProductsResponse
     */
    export interface RemoteProductsResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: RemoteProductResponse[];
    }
    /**
     * rewardConsumeRequest
     */
    export interface RewardConsumeRequest {}
    /**
     * rewardGetPendingRequest
     */
    export interface RewardGetPendingRequest {}
    /**
     * rewardResponse
     */
    export interface RewardResponse {
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        valueWei?: string; // string
        /**
         * decimal
         */
        value?: number; // double
    }
    /**
     * statisticsDaily
     */
    export interface StatisticsDaily {
        /**
         * date
         * The date (does not include a time component) of this statistics entry.
         * example:
         * 2020-01-01T00:00:00Z
         */
        date?: string; // string
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * objectId
         * The ID of the content known to WOM.
         * example:
         * 000000000000000000000000
         */
        womContentId?: string; // objectId
        /**
         * string
         * The ID of the content known to the remote network.
         */
        remoteContentId?: string;
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        authenticity?: number; // double
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        creativity?: number; // double
        /**
         * nullable1
         * The latest content level value, on this day, of this rating.
         */
        positivity?: number; // double
        /**
         * int32
         * The total number of views
         */
        viewCount?: number; // int32
        /**
         * int32
         * Views that had a duration less than 25%
         */
        viewD1Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD1Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 25-49%
         */
        viewD2Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD2Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 50-74%
         */
        viewD3Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD3Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 75-100%
         */
        viewD4Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD4Percentage?: number; // double
        /**
         * int32
         * The total number of likes
         */
        likeCount?: number; // int32
        /**
         * decimal
         */
        readonly likesPercentage?: number; // double
        /**
         * int32
         * The total number of ratings by users (not authenticators)
         */
        ratingCount?: number; // int32
        /**
         * decimal
         */
        readonly ratingsPercentage?: number; // double
        /**
         * int32
         * The total number of times this item was saved.
         */
        saveCount?: number; // int32
        /**
         * decimal
         */
        readonly savesPercentage?: number; // double
        /**
         * int32
         * The amount of times this item was shared.
         */
        shareCount?: number; // int32
        /**
         * decimal
         */
        readonly sharesPercentage?: number; // double
        /**
         * int32
         * The amount of comments.
         */
        commentCount?: number; // int32
        /**
         * decimal
         */
        readonly commentsPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a click.
         */
        clickCount?: number; // int32
        /**
         * decimal
         */
        readonly clicksPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a buy event.
         */
        buyCount?: number; // int32
        /**
         * decimal
         */
        readonly buysPercentage?: number; // double
        /**
         * int32
         * The total engagements of this item.
         */
        readonly total?: number; // int32
    }
    /**
     * statisticsHourly
     */
    export interface StatisticsHourly {
        hour?: Hour;
        /**
         * nullable1
         */
        authenticity?: number; // double
        /**
         * nullable1
         */
        creativity?: number; // double
        /**
         * nullable1
         */
        positivity?: number; // double
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        readonly id?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        womContentId?: string; // objectId
        /**
         * string
         */
        remoteContentId?: string;
        /**
         * int32
         * The total number of views
         */
        viewCount?: number; // int32
        /**
         * int32
         * Views that had a duration less than 25%
         */
        viewD1Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD1Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 25-49%
         */
        viewD2Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD2Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 50-74%
         */
        viewD3Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD3Percentage?: number; // double
        /**
         * int32
         * Views that had a duration inclusive 75-100%
         */
        viewD4Count?: number; // int32
        /**
         * decimal
         */
        readonly viewsD4Percentage?: number; // double
        /**
         * int32
         * The total number of likes
         */
        likeCount?: number; // int32
        /**
         * decimal
         */
        readonly likesPercentage?: number; // double
        /**
         * int32
         * The total number of ratings by users (not authenticators)
         */
        ratingCount?: number; // int32
        /**
         * decimal
         */
        readonly ratingsPercentage?: number; // double
        /**
         * int32
         * The total number of times this item was saved.
         */
        saveCount?: number; // int32
        /**
         * decimal
         */
        readonly savesPercentage?: number; // double
        /**
         * int32
         * The amount of times this item was shared.
         */
        shareCount?: number; // int32
        /**
         * decimal
         */
        readonly sharesPercentage?: number; // double
        /**
         * int32
         * The amount of comments.
         */
        commentCount?: number; // int32
        /**
         * decimal
         */
        readonly commentsPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a click.
         */
        clickCount?: number; // int32
        /**
         * decimal
         */
        readonly clicksPercentage?: number; // double
        /**
         * int32
         * The amount of times this item received a buy event.
         */
        buyCount?: number; // int32
        /**
         * decimal
         */
        readonly buysPercentage?: number; // double
        /**
         * int32
         * The total engagements of this item.
         */
        readonly total?: number; // int32
    }
    /**
     * statisticsHourlyUploadRequest
     */
    export interface StatisticsHourlyUploadRequest {
        /**
         * list1
         */
        items?: StatisticsHourly[];
    }
    /**
     * streamDetails
     */
    export interface StreamDetails {
        /**
         * string
         */
        screenGrabUrl?: string;
        /**
         * string
         */
        hlsUrl?: string;
        /**
         * boolean
         */
        isHD?: boolean;
        /**
         * boolean
         */
        isSingleChannelAudio?: boolean;
        /**
         * boolean
         */
        isUnlimitedLength?: boolean;
        /**
         * boolean
         */
        isPortraitAspect?: boolean;
        /**
         * boolean
         */
        hasSubtitles?: boolean;
        /**
         * list1
         * The languages available on this content.
         */
        languageSpoken?: string[];
        /**
         * list1
         * The subtitle languages available for this content.
         */
        languageSubtitle?: string[];
    }
    /**
     * streamingInfo
     */
    export interface StreamingInfo {
        /**
         * string
         */
        thumbnailUrl?: string;
        /**
         * string
         */
        hlsUrl?: string;
        /**
         * timeSpan
         * example:
         * 0
         */
        duration?: number; // int64
    }
    /**
     * systemBalanceResponse
     */
    export interface SystemBalanceResponse {
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        sumBalanceWei?: string; // string
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        escrowBalanceWei?: string; // string
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        circulationBalanceWei?: string; // string
        /**
         * decimal
         */
        readonly sumBalance?: number; // double
        /**
         * decimal
         */
        readonly escrowBalance?: number; // double
        /**
         * decimal
         */
        readonly circulationBalance?: number; // double
    }
    /**
     * transactionCreateRequest
     */
    export interface TransactionCreateRequest {
        /**
         * nullable1
         * Optional, set the transaction id for this transaction.
         * example:
         * 000000000000000000000000
         */
        setTransactionId?: string; // objectId
        /**
         * decimal
         * The amount to transfer.
         */
        value?: number; // double
        /**
         * string
         * The account in the source wallet. Either WOM or RP.
         */
        addressFrom?: string;
        /**
         * string
         * The account in the destination wallet. Either WOM or RP.
         */
        addressTo?: string;
    }
    /**
     * transactionGetRequest
     */
    export interface TransactionGetRequest {
        /**
         * objectId
         * The unique identifier as received when the transaction was initiated
         * example:
         * 000000000000000000000000
         */
        transactionId?: string; // objectId
    }
    /**
     * transactionQueryRequest
     */
    export interface TransactionQueryRequest {
        /**
         * nullable1
         * Administrators only: The user's unique identifier.
         * When not specified the current caller's userid will be used.
         * example:
         * 000000000000000000000000
         */
        userId?: string; // objectId
        /**
         * nullable1
         * The wallet to return transactions for.
         * example:
         * 000000000000000000000000
         */
        walletId?: string; // objectId
        /**
         * boolean
         * Admin only, return all transactions.
         */
        returnAll?: boolean;
        /**
         * string
         * The address to return transactions for.
         */
        address?: string;
        status?: TransactionStatus; // int32
        type?: TransactionType; // int32
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
     * transactionQueryResponse
     */
    export interface TransactionQueryResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: TransactionResponse[];
    }
    /**
     * transactionQueueReportItemResponse
     */
    export interface TransactionQueueReportItemResponse {
        /**
         * string
         */
        name?: string;
        /**
         * string
         */
        address?: string;
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        balanceWei?: string; // string
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        queuedWei?: string; // string
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        requiredWei?: string; // string
        /**
         * decimal
         */
        balance?: number; // double
        /**
         * decimal
         */
        queued?: number; // double
        /**
         * decimal
         */
        required?: number; // double
    }
    /**
     * transactionResponse
     * Describes the current status of any transaction.
     */
    export interface TransactionResponse {
        type?: WOMNarrativeType; // int32
        /**
         * string
         * Description
         */
        meta?: string;
        /**
         * objectId
         * The transaction hash
         * example:
         * 000000000000000000000000
         */
        transactionId?: string; // objectId
        /**
         * string
         */
        ethereumTransactionHash?: string;
        /**
         * dateTime
         */
        utcCreated?: string; // date-time
        /**
         * string
         */
        from?: string;
        /**
         * string
         */
        to?: string;
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        valueWei?: string; // string
        status?: TransactionStatus; // int32
        /**
         * int32
         */
        durationSeconds?: number; // int32
        /**
         * decimal
         */
        value?: number; // double
    }
    /**
     * transactionStatus
     * Enum representing the current state of a token transfer<br/><br/>Values:<br/>0 = None<br/>1 = InProgress<br/>2 = Success<br/>-1 = Failure
     */
    export type TransactionStatus = 0 | 1 | 2 | -1; // int32
    /**
     * transactionType
     */
    export type TransactionType = 0 | 1 | 2 | 3 | 4; // int32
    /**
     * updateBrandRequest
     */
    export interface UpdateBrandRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
    }
    /**
     * updateChannelContentRequest
     */
    export interface UpdateChannelContentRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * nullable1
         * If calling user is an admin, they will be able to create a channel content on behalf of other organization.
         * example:
         * 000000000000000000000000
         */
        organizationId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        channelId?: string; // objectId
        /**
         * string
         */
        affiliateLinkUrl?: string;
    }
    /**
     * updateChannelRequest
     */
    export interface UpdateChannelRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string;
        /**
         * boolean
         */
        isPrivate?: boolean;
        /**
         * boolean
         */
        isDisabled?: boolean;
    }
    /**
     * updateOrganizationRequest
     */
    export interface UpdateOrganizationRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        organizationId: string; // objectId
        /**
         * string
         * The title of this organization.
         */
        title: string;
        /**
         * tags
         * The mandatory tags of this organization.
         */
        mandatoryTags: string /* string */[];
    }
    /**
     * updateProductRequest
     */
    export interface UpdateProductRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
        /**
         * nullable1
         * example:
         * 000000000000000000000000
         */
        brandId?: string; // objectId
    }
    /**
     * updateProductRequestLegacy
     */
    export interface UpdateProductRequestLegacy {
        /**
         * string
         */
        remoteId?: string;
        /**
         * hashSet1
         */
        upcCodes?: string[];
        /**
         * string
         */
        brandName?: string;
        /**
         * string
         */
        itemName?: string;
        /**
         * string
         */
        primaryCategory?: string;
        /**
         * hashSet1
         */
        secondaryCategories?: string[];
        /**
         * string
         */
        brandProductImageUrl?: string;
        /**
         * tags
         */
        tags?: string /* string */[];
    }
    /**
     * updateRemoteProductRequest
     */
    export interface UpdateRemoteProductRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        id?: string; // objectId
        /**
         * string
         */
        name?: string;
        /**
         * string
         */
        brand?: string;
        /**
         * string
         */
        publicId?: string;
        /**
         * string
         */
        url?: string;
        /**
         * string
         */
        imageUrl?: string;
    }
    /**
     * uploadUserProfileImageCommonResponse
     */
    export interface UploadUserProfileImageCommonResponse {
        /**
         * string
         */
        imageUrl?: string;
    }
    /**
     * userAuthChallengeRequest
     */
    export interface UserAuthChallengeRequest {
        /**
         * string
         */
        email: string;
        /**
         * string
         */
        password: string;
    }
    /**
     * userCreateValidatorAccountRequest
     */
    export interface UserCreateValidatorAccountRequest {
        /**
         * string
         */
        email: string;
        /**
         * string
         */
        locale?: string;
        /**
         * string
         * Username, must be unique
         */
        username: string;
        /**
         * string
         */
        password: string;
    }
    /**
     * userJwtTokenResponse
     */
    export interface UserJwtTokenResponse {
        user?: GetUserResponse;
        /**
         * string
         */
        token?: string;
    }
    /**
     * userProfileResponse
     */
    export interface UserProfileResponse {
        /**
         * string
         */
        imageUrl?: string;
        /**
         * string
         */
        primaryLanguage?: string;
    }
    /**
     * userQueryRequest
     */
    export interface UserQueryRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        segmentId?: string; // objectId
        /**
         * list1
         */
        userIds?: string /* objectId */[];
        /**
         * list1
         */
        walletIds?: string /* objectId */[];
        /**
         * string
         */
        userName?: string;
        /**
         * string
         */
        email?: string;
        /**
         * string
         */
        mobileNumber?: string;
        /**
         * string
         */
        textSearch?: string;
        /**
         * roles
         */
        rolesAll?: string /* string */[];
        /**
         * roles
         */
        rolesAny?: string /* string */[];
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
     * userQueryResponse
     */
    export interface UserQueryResponse {
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: GetUserResponse[];
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
        role?: string;
    }
    /**
     * userTokenRequest
     */
    export interface UserTokenRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
    }
    /**
     * userUpdateRequest
     */
    export interface UserUpdateRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
        /**
         * string
         */
        locale?: string;
        /**
         * string
         */
        firstName?: string;
        /**
         * string
         */
        lastName?: string;
        /**
         * string
         */
        email?: string;
    }
    /**
     * userValidationDetails
     */
    export interface UserValidationDetails {
        /**
         * string
         */
        payoutAddress?: string;
        /**
         * bigInteger
         * Amount paid out so far in WEI
         * example:
         * 100000000000000000000000
         */
        paidOutWei?: string; // string
        /**
         * bigInteger
         * The content creator's initial WOM stake for this validation in WEI
         * example:
         * 100000000000000000000000
         */
        stakedWei?: string; // string
        /**
         * decimal
         * Amount paid out so far
         */
        paidOut?: number; // double
        /**
         * decimal
         * The content creator's initial WOM stake for this validation
         */
        staked?: number; // double
        /**
         * boolean
         * Is this user the content creator
         */
        isContentCreator?: boolean;
        rating?: WOMScore;
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
        username?: string;
    }
    /**
     * validateContentRequest
     */
    export interface ValidateContentRequest {
        /**
         * objectId
         * The id of the content to validate.
         * example:
         * 000000000000000000000000
         */
        contentId: string; // objectId
        /**
         * decimal
         * The amount of WOM being staked to satisfy the validation process.
         */
        womStake: number; // double
        /**
         * boolean
         * Request a free promotional stake, if available.
         */
        requestStakingPromotion?: boolean;
        /**
         * decimal
         * Creativity rating
         */
        creativity: number; // double
        /**
         * decimal
         * Authenticity rating
         */
        authenticity: number; // double
        /**
         * decimal
         * Positivity rating
         */
        positivity: number; // double
    }
    /**
     * validateHideRequest
     */
    export interface ValidateHideRequest {
        /**
         * objectId
         * The id of the content to hide.
         * example:
         * 000000000000000000000000
         */
        contentId: string; // objectId
    }
    /**
     * validateStartRequest
     */
    export interface ValidateStartRequest {
        /**
         * objectId
         * The id of the content to hide.
         * example:
         * 000000000000000000000000
         */
        contentId: string; // objectId
        /**
         * decimal
         * The amount of WOM the submitter is staking for validation to begin.
         */
        stakeAmount?: number; // double
        /**
         * string
         * Submit for validation on behalf of this user. [Remote server only]
         */
        remoteUserId?: string;
        /**
         * boolean
         * If set, this validation sequence will require further steps.
         */
        startWithHold?: boolean;
        /**
         * objectId
         * The wallet id that will supply the stake amount.
         * example:
         * 000000000000000000000000
         */
        stakeWalletId?: string; // objectId
        /**
         * nullable1
         * Optional: Specify a different payout wallet from the staking wallet.
         * example:
         * 000000000000000000000000
         */
        payoutWalletId?: string; // objectId
    }
    /**
     * validationDetailResponse
     */
    export interface ValidationDetailResponse {
        validationState?: ValidationStateResponse;
        engagement?: EngagementStatistics;
        womQualityScore?: WOMQualityScore;
        userValidationDetails?: UserValidationDetails;
    }
    /**
     * validationEndedReason
     * <br/><br/>Values:<br/>0 = None<br/>1 = CompletedNormally<br/>2 = ConsensusNotReached<br/>3 = TerminatedInHold
     */
    export type ValidationEndedReason = 0 | 1 | 2 | 3; // int32
    /**
     * validationEntriesRequest
     */
    export interface ValidationEntriesRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         */
        remoteContentId?: string;
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
     * validationEntriesResponse
     */
    export interface ValidationEntriesResponse {
        request?: ValidationEntriesRequest;
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
        readonly returnedRecords?: number; // int32
        /**
         * list1
         */
        items?: ValidationEntryResponse[];
    }
    /**
     * validationEntryResponse
     */
    export interface ValidationEntryResponse {
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
        contentId?: string; // objectId
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
         * string
         */
        validatorPayoutAddress?: string;
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        womStakedWei?: string; // string
        /**
         * decimal
         */
        readonly womStaked?: number; // double
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        transactionId?: string; // objectId
        /**
         * decimal
         */
        creativity?: number; // double
        /**
         * decimal
         */
        authenticity?: number; // double
        /**
         * decimal
         */
        positivity?: number; // double
        /**
         * decimal
         */
        averageScore?: number; // double
        /**
         * decimal
         */
        qualityScore?: number; // double
        /**
         * boolean
         */
        isProcessed?: boolean;
        /**
         * boolean
         */
        isPartOfConsensus?: boolean;
        /**
         * boolean
         */
        isRewarded?: boolean;
        /**
         * boolean
         */
        isRefunded?: boolean;
        /**
         * decimal
         */
        payoutMultiplier?: number; // double
        /**
         * decimal
         */
        payoutPercentage?: number; // double
        /**
         * bigInteger
         * example:
         * 100000000000000000000000
         */
        payoutValueWei?: string; // string
        /**
         * decimal
         */
        readonly payoutValue?: number; // double
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        associatedTransactionId?: string; // objectId
    }
    /**
     * validationReleaseHoldRequest
     */
    export interface ValidationReleaseHoldRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         */
        remoteContentId?: string;
        /**
         * boolean
         */
        terminate?: boolean;
    }
    /**
     * validationResetRequest
     */
    export interface ValidationResetRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        contentId?: string; // objectId
        /**
         * string
         */
        remoteContentId?: string;
    }
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
         * WOM's internal identifier for this content
         * example:
         * 000000000000000000000000
         */
        womContentId?: string; // objectId
        /**
         * string
         * Remote content id (if available).
         */
        remoteContentId?: string;
        /**
         * dateTime
         */
        utcValidateBy?: string; // date-time
        currentStage?: ValidationStage; // int32
        validationResult?: ValidationResult; // int32
        endedReason?: ValidationEndedReason; // int32
        /**
         * bigInteger
         * The amount of WOM the creator staked to begin validation in WEI.
         * example:
         * 100000000000000000000000
         */
        womStakedWei?: string; // string
        /**
         * decimal
         * The amount of WOM the creator staked to begin validation.
         */
        womStaked?: number; // double
    }
    /**
     * videoAnalysisResponse
     */
    export interface VideoAnalysisResponse {
        /**
         * timeSpan
         * example:
         * 0
         */
        duration?: number; // int64
        /**
         * int64
         */
        size?: number; // int64
    }
    /**
     * voucherData
     */
    export interface VoucherData {
        /**
         * string
         */
        code?: string;
        /**
         * string
         */
        url?: string;
        /**
         * string
         */
        pin?: string;
        /**
         * string
         */
        validityDate?: string;
        /**
         * int64
         */
        orderProductId?: number; // int64
        /**
         * string
         */
        faceValue?: string;
        /**
         * string
         */
        voucherCurrency?: string;
    }
    /**
     * voucherPurchaseStatus
     * <br/><br/>Values:<br/>0 = None<br/>100 = InProcess<br/>200 = Success<br/>-100 = Failure
     */
    export type VoucherPurchaseStatus = 0 | 100 | 200 | -100; // int32
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
        transactionStatus?: VoucherPurchaseStatus; // int32
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
        updatedUtc?: string; // date-time
        productInfo?: ProductInfo;
        /**
         * list1
         */
        giftCardData?: VoucherData[];
    }
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
     * WOMNarrativeType
     * <br/><br/>Values:<br/>0 = None<br/>100 = Deposit<br/>200 = Withdrawal<br/>300 = CreatorStake<br/>301 = CreatorReward<br/>302 = CreatorStakeRefund<br/>400 = ValidationStake<br/>401 = ValidationReward<br/>402 = ValidationStakeRefund<br/>500 = Exchange<br/>600 = UserTransfer<br/>700 = Reward<br/>800 = MigrationSync<br/>900 = CampaignPayment<br/>1000 = PerformancePayment<br/>2000 = GiftCardPayment<br/>2100 = GiftCardRefund
     */
    export type WOMNarrativeType =
        | 0
        | 100
        | 200
        | 300
        | 301
        | 302
        | 400
        | 401
        | 402
        | 500
        | 600
        | 700
        | 800
        | 900
        | 1000
        | 2000
        | 2100; // int32
    /**
     * WOMQualityScore
     */
    export interface WOMQualityScore {
        /**
         * decimal
         * The WOM quality score is the sum of the other ratings multiplied by individual weights.
         */
        quality?: number; // double
        /**
         * decimal
         * The WOM authenticity score as determined by the WOM validation process.
         */
        authenticity?: number; // double
        /**
         * decimal
         * The WOM creativity score as determined by the WOM validation process.
         */
        creativity?: number; // double
        /**
         * decimal
         * The WOM positivity score as determined by the WOM validation process.
         */
        positivity?: number; // double
    }
    /**
     * WOMScore
     */
    export interface WOMScore {
        /**
         * decimal
         * The WOM authenticity score as determined by the WOM validation process.
         */
        authenticity?: number; // double
        /**
         * decimal
         * The WOM creativity score as determined by the WOM validation process.
         */
        creativity?: number; // double
        /**
         * decimal
         * The WOM positivity score as determined by the WOM validation process.
         */
        positivity?: number; // double
    }
    /**
     * walletCreateRequest
     */
    export interface WalletCreateRequest {
        /**
         * objectId
         * example:
         * 000000000000000000000000
         */
        userId: string; // objectId
    }
    /**
     * walletGetRequest
     */
    export interface WalletGetRequest {
        /**
         * nullable1
         * The id of the user's wallet, if not specified the calling user's primary wallet will be returned.
         * example:
         * 000000000000000000000000
         */
        walletId?: string; // objectId
        /**
         * string
         * If specified the wallet for the given address will be displayed (Admin only)
         */
        publicAddress?: string;
    }
    /**
     * walletResponse
     */
    export interface WalletResponse {
        /**
         * objectId
         * The user's wallet id if present, or default if not available
         * example:
         * 000000000000000000000000
         */
        walletId?: string; // objectId
        /**
         * boolean
         * Determines if this user has a wallet
         */
        hasWallet?: boolean;
        /**
         * boolean
         * Has the user participated in any WOM or RP token transactions.
         */
        hasTransacted?: boolean;
        /**
         * list1
         * The addresses held in this wallet if available
         */
        items?: AddressResponse[];
    }
    /**
     * withdrawalRequest
     */
    export interface WithdrawalRequest {
        /**
         * string
         * The source address, if not specified the calling user's primary account will be used.
         */
        addressFrom?: string;
        /**
         * string
         * The destination address, must be a valid Ethereum WOM ERC20 destination.
         */
        addressTo?: string;
        /**
         * decimal
         * This value is denominated in ETHER (WOM), it is a decimal value where 10.5 WOM tokens should be written as 10.5
         */
        value?: number; // double
    }
}
