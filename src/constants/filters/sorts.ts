import { SortType, videoCurationStateType, womValidationStageType } from 'types/types';

export const sortModeTagsName = 'Filter mode: ';
export const sortTagsName = 'Sort by';

export const sortModeTagsValues: SortType[] = ['+asc', '+desc'];
export const sortModeTagsData = ['ascending', 'descending'];

// !these two array should have items in the same order
// !first one (sortTagsValues) is for UI, second (sortPrefixArray) is for query request ()
export const sortTagsValues = ['none', 'likes', 'views', 'saves', 'shares', 'comments'];
export const sortPrefixArray = ['none', 'likes', 'views', 'saves', 'shares', 'commentsCount'];

export const sortTagsWomStageValues: womValidationStageType[] = [undefined, 0, 1, 2, 3];
export const sortTagsWomStageData = ['None', 'Not started', 'Processing', 'Ended', 'Held'];

export const sortTagsCurationStateValues: videoCurationStateType[] = [undefined, 0, 1, 2, 3];
export const sortTagsCurationStateData = ['All', 'None', 'Processing', 'Accepted', 'Rejected'];

export const sortTagsProductsValues = [undefined, true, false];
export const sortTagsProductsData = ['All', 'Referenced', 'Not Referenced'];
