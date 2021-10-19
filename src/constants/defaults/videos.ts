import { Dictionary } from 'types/global';
import { getDateBeforeAndReturnISO } from 'utils/parsers';
import {
    sortModeTagsValues,
    sortTagsCurationStateValues,
    sortTagsValues,
    sortTagsWomStageValues
} from '../filters/sorts';
import { defaultLimit, defaultPage } from './filterSettings';

export const sortModeTagsValuesDefault = sortModeTagsValues[1];
export const sortTagsValuesDefault = sortTagsValues[0];
export const sortTagsWomStageValuesDefault = sortTagsWomStageValues[0];
export const sortTagsCurationStateValuesDefault = sortTagsCurationStateValues[0];

export const defaultVideosValuesWithoutDate: BULLZ.QueryAllVideosRequest = {
    isReported: false,
    hasHlsStream: true,
    womValidationStage: sortTagsWomStageValuesDefault,
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true,
    isDeleted: false,
    fromCreatedDateTime: undefined,
    toCreatedDateTime: undefined,
    sort: undefined,
    videoCurationState: undefined,
    creatorId: undefined
};

export const defaultVideosValues: BULLZ.QueryAllVideosRequest = {
    ...defaultVideosValuesWithoutDate,
    fromCreatedDateTime: getDateBeforeAndReturnISO(7),
    toCreatedDateTime: getDateBeforeAndReturnISO(-1)
};

export const defaultPlaylistVideosValues: BULLZ.QueryPlaylistVideosRequest = {
    pageIndex: defaultPage,
    limit: defaultLimit
};

export const defaultProductVideosValues: BULLZ.QueryVideosByProductIdRequest = {
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};

export const defaultVideosByProductIdValues: BULLZ.QueryVideosByProductIdRequest = {
    pageIndex: defaultPage,
    limit: defaultLimit,
    returnQueryCount: true
};

export const validationReasons: Dictionary<BULLZ.VideoCurationState> = {
    None: 0,
    Processing: 1,
    Accepted: 2,
    Rejected: 3
};
