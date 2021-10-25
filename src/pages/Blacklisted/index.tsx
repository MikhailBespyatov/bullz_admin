import emptyStateImage from 'assets/icons/blacklist_empty_state_icon_white.svg';
import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { BlacklistedUsersTable } from 'componentsNewDesign/common/tables/BlacklistedUsersTable';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { Empty } from 'componentsNewDesign/layouts/resultLayouts/Empty';
import { FlexGrow, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultBlacklistedUsersValues } from 'constants/defaults/users';
import { grey23, grey27 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import {
    defaultMessage,
    emptyStateImageWrapperDiameter,
    searchInputBorder,
    searchInputPadding,
    selectPadding
} from 'pages/Blacklisted/constants';
import { BlacklistedLayoutWrapper, LayoutContentWrapper } from 'pages/Blacklisted/styles';
import { emailRegExp, mobileNumberRegExp } from 'pages/Users/constants';
import React from 'react';
import { blacklistedUsersEvents, blacklistedUsersStores } from 'stores/users/blacklistedUsers';
import { SearchParameters } from 'types/data';

const { /*setId,*/ updateValues /*setDefaultValues*/ } = blacklistedUsersEvents;

// interface BlacklistedQueryParams extends Partial<BULLZ.QueryBlacklistedUsersRequest> {}

// const updateQueryValues = ({ type, searchText, ...params }: BlacklistedQueryParams) => {
//     console.log('type, searchText', type, searchText);

//     setId(searchText || '');

//     updateValues({
//         ...defaultBlacklistedUsersValues,
//         type: type,
//         searchText: searchText
//     });
// };

export const Blacklisted = () => {
    //const defaultId = useStore(blacklistedUsersStores.getRequestId);

    const { items } = useStore(blacklistedUsersStores.blacklistedUsers);
    const { type, searchText } = useStore(blacklistedUsersStores.values);
    const loading = useStore(blacklistedUsersStores.loading);

    //const [queryParams, setQueryParams] = useQueryParams<BlacklistedQueryParams>(updateQueryValues);

    const resetSearch = () => {
        updateValues({
            ...defaultBlacklistedUsersValues,
            type: 0,
            searchText: undefined
        });
    };

    const onSearchByEmail = (email: string) => {
        updateValues({
            ...defaultBlacklistedUsersValues,
            type: 1,
            searchText: email || undefined
        });
    };
    const onSearchMobileNumber = (mobileNumber: string) => {
        updateValues({
            ...defaultBlacklistedUsersValues,
            type: 2,
            searchText: mobileNumber || undefined
        });
    };

    const onSearchByUsername = (username: string) => {
        updateValues({
            ...defaultBlacklistedUsersValues,
            type: 3,
            searchText: username || undefined
        });
    };

    const searchParameters: SearchParameters[] = [
        {
            searchBy: 'Email Address',
            defaultValue: searchText,
            placeholder: 'Search by Email Address',
            onSearch: onSearchByEmail,
            regExp: emailRegExp
        },
        {
            searchBy: 'Username',
            defaultValue: searchText,
            placeholder: 'Search by Username',
            onSearch: onSearchByUsername
        },
        {
            searchBy: 'Mobile Number',
            defaultValue: searchText,
            placeholder: 'Search by Mobile Number',
            onSearch: onSearchMobileNumber,
            regExp: mobileNumberRegExp
        }
    ];

    return (
        <MainLayout>
            <BlacklistedLayoutWrapper>
                <LayoutContentWrapper>
                    <Section alignCenter justifyBetween marginBottom="12px">
                        <Span fontSize="16px" fontWeight="700" lineHeight="18px">
                            Blacklisted Users
                        </Span>
                    </Section>

                    <Section marginBottom="8px">
                        <FlexGrow flexGrow="1" marginRight="20px">
                            <SearchInput
                                backgroundColor={grey27}
                                border={searchInputBorder}
                                padding={searchInputPadding}
                                searchParameters={searchParameters}
                                selectPadding={selectPadding}
                            />
                        </FlexGrow>
                        <ResetSearchButton onClick={resetSearch} />
                    </Section>

                    <Section>
                        {loading ? (
                            <Section justifyCenter>
                                <Loader size="large" />
                            </Section>
                        ) : (
                            <Section>
                                {items && type ? (
                                    <BlacklistedUsersTable items={items} type={type} />
                                ) : (
                                    <Empty
                                        emptyLayoutMarginTop="100px"
                                        imageHeight="18px"
                                        imageSrc={emptyStateImage}
                                        imageWidth="22px"
                                        imageWrapperBackgroundColor={grey23}
                                        imageWrapperBorderRadius="50%"
                                        imageWrapperHeight={emptyStateImageWrapperDiameter}
                                        imageWrapperWidth={emptyStateImageWrapperDiameter}
                                        title={defaultMessage}
                                        titleFontSize="16px"
                                        titleFontWeight="500"
                                        titleLineHeight="26px"
                                        titleWidth="390px"
                                    />
                                )}
                            </Section>
                        )}
                    </Section>
                </LayoutContentWrapper>
            </BlacklistedLayoutWrapper>
        </MainLayout>
    );
};
