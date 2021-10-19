export const tableBorderRadius = '8px 8px 0px 0px';

export const blacklistedTableColumnTitles = ['User ID', 'Email Address', 'Mobile Number', 'Username'];
export const defaultTitles = [blacklistedTableColumnTitles[0], blacklistedTableColumnTitles[1]];
//export const blacklistedTableColumnSizes = [1, 1, 1, 1];

// Mock Blacklist

export const testType = 3;
const testValuesArray = ['373jf7fh487444f89fyf2', 'test-email@gmail.com', '(704) 555-0127', 'TestUserName'];

export type SearchType = 1 | 2 | 3;

export const MockBlacklistedUsers: BULLZ.GetBlacklistedUsersResponse[] = [
    {
        id: testValuesArray[0],
        type: testType,
        searchTextValue: testValuesArray[testType]
    },
    {
        id: testValuesArray[0],
        type: testType,
        searchTextValue: testValuesArray[testType]
    },
    {
        id: testValuesArray[0],
        type: testType,
        searchTextValue: testValuesArray[testType]
    },
    {
        id: testValuesArray[0],
        type: testType,
        searchTextValue: testValuesArray[testType]
    }
];
