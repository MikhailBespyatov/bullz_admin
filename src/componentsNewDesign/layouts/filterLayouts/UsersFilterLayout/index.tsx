import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { CheckboxFilter } from 'componentsNewDesign/common/inputs/CheckboxFilter';
import { NestedSelect } from 'componentsNewDesign/common/inputs/NestedSelect';
import { FilterParameters, selectorsArray } from 'componentsNewDesign/common/inputs/NestedSelect/constants';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Select } from 'componentsNewDesign/common/inputs/Select';
import { Footer, TrendingsFooter } from 'componentsNewDesign/grid/Footer';
import { SearchWrapperLayout } from 'componentsNewDesign/layouts/blocks/SearchWrapperLayout';
import {
    defaultSearchParameters,
    LocaleSelectorProps,
    searchUserByEmailParameter,
    searchUserByIdParameter,
    searchUserByMobileNumberParameter,
    SelectorKeyType
} from 'componentsNewDesign/layouts/filterLayouts/UsersFilterLayout/constants';
import {
    FilterMobileWrapper,
    SearchMobileWrapper
} from 'componentsNewDesign/layouts/filterLayouts/UsersFilterLayout/styles';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { paginationHeight } from 'componentsNewDesign/layouts/Pagination/constants';
import { FlexGrow, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';
import { Roles, sortTagsUsersData, sortTagsUsersValues } from 'constants/defaults/users';
import { mongoDbObjectIdRegExp } from 'constants/regularExpressions';
import { filterMargin, xxs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import { useQueryParams } from 'hooks/queryParams';
import {
    emailRegExp,
    emailSearchPlaceholder,
    mobileNumberRegExp,
    mobileNumberSearchPlaceholder,
    userIdSearchPlaceholder,
    usernameSearchPlaceholder
} from 'pages/Users/constants';
import React, { FC, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { locationEffects, locationStores } from 'stores/location/location';
import { mobileHeaderStores } from 'stores/mobileHeader';
import { usersEffects, usersEvents, usersStores } from 'stores/users/users';
import { SearchParameters, TotalRecords, WithoutFooter } from 'types/data';

const { setId, updateValues, invokeGetItems, setIsFirstToFalse } = usersEvents;
const { loadItemById } = usersEffects;
const { loadListOfCountries } = locationEffects;

interface UsersQueryParams extends Partial<BULLZ.QueryAllUsersRequest> {
    userId?: string;
}

const updateQueryValues = ({ userId, ...params }: UsersQueryParams) => {
    if (userId) {
        setId(userId);
        loadItemById(userId);
    } else {
        updateValues(params);
    }
};

interface Props extends TotalRecords, WithoutFooter {}

export const UsersFilterLayout: FC<Props> = ({ totalRecords, children, withoutFooter }) => {
    const isFirst = useStore(usersStores.isFirst);
    const { pageIndex, limit, role, username, isTrusted, email, mobileNumber, country, region, locale } = useStore(
        usersStores.values
    );
    const defaultSelectedItemType = country ? 'country' : region ? 'region' : 'locale';
    const location = useStore(locationStores.locationList);
    const regionsListIsLoading = useStore(locationEffects.loadListOfRegionsByCountry.pending);
    //console.log('defaultSelectedItemType', defaultSelectedItemType);

    const defaultId = useStore(usersStores.getRequestId);
    const [queryParams, setQueryParams] = useQueryParams<UsersQueryParams>(updateQueryValues);

    const isMobile = useMediaQuery({ query: `(max-width: ${xxs})` });

    const filterVisible = useStore(mobileHeaderStores.filterVisible);
    const searchVisible = useStore(mobileHeaderStores.searchVisible);

    const onUsernameSearch = (name: string) => {
        setId('');
        usersEvents.updateValues({
            ...defaultSearchParameters,
            username: name,
            pageIndex: defaultPage
        });
    };

    const onIdSearch = (id: string) => {
        setId(id);
        if (id) {
            updateValues({
                username: undefined,
                email: undefined,
                mobileNumber: undefined
            });
            loadItemById(id);
        } else {
            updateValues({
                pageIndex: defaultPage
            });
        }
    };

    const onEmailSearch = (email: string) => {
        setId('');
        usersEvents.updateValues({
            ...defaultSearchParameters,
            email: email || undefined,
            pageIndex: defaultPage
        });
    };

    const onMobileNumberSearch = (mobileNumber: string) => {
        setId('');
        usersEvents.updateValues({
            ...defaultSearchParameters,
            mobileNumber: mobileNumber || undefined,
            pageIndex: defaultPage
        });
    };

    const onSortChange = (index: number) =>
        updateValues({
            role: sortTagsUsersValues[index],
            pageIndex: defaultPage
        });

    const onTrustedChange = (isTrusted: boolean) => {
        isTrusted
            ? updateValues({
                  isTrusted,
                  pageIndex: defaultPage
              })
            : updateValues({
                  isTrusted: undefined,
                  pageIndex: defaultPage
              });
    };

    const onLocaleSelect = ({ selectorType, selectorName, selectorCode }: FilterParameters) => {
        //console.log('received { selectorType, selectorName }', { selectorType, selectorName });

        const newValues: LocaleSelectorProps = { country: '', region: '', locale: '' };

        Object.keys(newValues);

        let key: SelectorKeyType;

        for (key in newValues) {
            key === selectorType && (newValues[key] = selectorCode || selectorName);
        }

        //console.log('newValues', newValues);

        setId('');
        usersEvents.updateValues({
            ...defaultSearchParameters,
            ...newValues,
            pageIndex: defaultPage
        });
    };

    const resetFilters = () => {
        setQueryParams({});
        document.location.reload();
    };

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    const searchParameters: SearchParameters[] = [
        {
            searchBy: 'Username',
            defaultValue: username,
            placeholder: usernameSearchPlaceholder,
            onSearch: onUsernameSearch
        },
        {
            searchBy: searchUserByIdParameter,
            defaultValue: defaultId,
            placeholder: userIdSearchPlaceholder,
            onSearch: onIdSearch,
            regExp: mongoDbObjectIdRegExp
        },
        {
            searchBy: searchUserByEmailParameter,
            defaultValue: email,
            placeholder: emailSearchPlaceholder,
            onSearch: onEmailSearch,
            accessFilter: [Roles.SuperAdministrator],
            regExp: emailRegExp
        },
        {
            searchBy: searchUserByMobileNumberParameter,
            defaultValue: mobileNumber,
            placeholder: mobileNumberSearchPlaceholder,
            onSearch: onMobileNumberSearch,
            accessFilter: [Roles.SuperAdministrator],
            regExp: mobileNumberRegExp
        }
    ];

    useEffect(() => {
        if (isFirst && !queryParams.userId) {
            invokeGetItems();
            setIsFirstToFalse();
            loadListOfCountries();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setQueryParams({
            pageIndex,
            limit,
            role,
            username,
            country,
            region,
            locale,
            isTrusted,
            email,
            mobileNumber,
            userId: defaultId !== '' ? defaultId : undefined
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, limit, role, username, isTrusted, email, mobileNumber, defaultId, country, region, locale]);

    //console.log(countries);

    const selectors = location
        ? selectorsArray(
              location.map(({ countryName, countryCode, region }) => ({
                  selectorName: countryName || '',
                  selectorCode: countryCode || '',
                  selectorType: 'country',
                  isFetched: true,
                  onFetch: value => locationEffects.loadListOfRegionsByCountry({ country: value }),
                  nestedSelectors: region
                      ? region.map(region => ({
                            selectorName: region,
                            selectorType: 'region'
                        }))
                      : undefined
              }))
          )
        : [];

    //console.log('FilterLayout', selectors[1].nestedSelectors);

    return (
        <>
            {!isMobile && (
                <SearchWrapperLayout alignCenter>
                    <FlexGrow flexGrow="1" marginRight={filterMargin}>
                        <SearchInput searchParameters={searchParameters} />
                    </FlexGrow>
                    <MarginWrapper /* marginBottom={filterMargin} */ marginRight={filterMargin}>
                        <Select
                            defaultIndex={sortTagsUsersValues.findIndex(item => item === role)}
                            selector={sortTagsUsersData}
                            width="182px"
                            onChange={onSortChange}
                        />
                    </MarginWrapper>
                    <MarginWrapper /* marginBottom={filterMargin} */ marginRight={filterMargin}>
                        <NestedSelect
                            defaultSelectedItem={country || region || locale || undefined}
                            defaultSelectedItemType={defaultSelectedItemType}
                            isLoading={regionsListIsLoading}
                            selector={selectors}
                            title="Filter by locale or country"
                            width="300px"
                            onSelect={onLocaleSelect}
                        />
                    </MarginWrapper>
                    <Row alignCenter marginRight="20px">
                        <CheckboxFilter defaultChecked={isTrusted || undefined} onChange={onTrustedChange}>
                            Is trusted
                        </CheckboxFilter>
                    </Row>

                    <ResetSearchButton onClick={resetFilters} />
                </SearchWrapperLayout>
            )}

            {isMobile && (
                <FilterMobileWrapper isClosed={!filterVisible}>
                    <MarginWrapper>
                        <Select
                            defaultIndex={sortTagsUsersValues.findIndex(item => item === role)}
                            selector={sortTagsUsersData}
                            width="182px"
                            onChange={onSortChange}
                        />
                    </MarginWrapper>
                    <MarginWrapper>
                        <NestedSelect
                            defaultSelectedItem={country || region || locale || undefined}
                            defaultSelectedItemType={defaultSelectedItemType}
                            isLoading={regionsListIsLoading}
                            selector={selectors}
                            title="Filter by locale or country"
                            width="300px"
                            onSelect={onLocaleSelect}
                        />
                    </MarginWrapper>
                    <MarginWrapper>
                        <Row alignCenter justifyEnd>
                            <CheckboxFilter defaultChecked={isTrusted || undefined} onChange={onTrustedChange}>
                                Is trusted
                            </CheckboxFilter>
                            <ResetSearchButton onClick={resetFilters} />
                        </Row>
                    </MarginWrapper>
                </FilterMobileWrapper>
            )}

            {isMobile && (
                <SearchMobileWrapper isClosed={!searchVisible || filterVisible} paddingTop="25px" width="100%">
                    <SearchInput searchParameters={searchParameters} />
                </SearchMobileWrapper>
            )}

            {/*<Section>*/}
            {/*    <SearchCell lg={6}>*/}
            {/*        <Search*/}
            {/*            defaultValue={username}*/}
            {/*            placeholder={usernameSearchPlaceholder}*/}
            {/*            onSearch={onUsernameSearch}*/}
            {/*        />*/}
            {/*    </SearchCell>*/}
            {/*    <SearchCell removePaddingRight lg={6}>*/}
            {/*        <Search defaultValue={defaultId} placeholder={userIdSearchPlaceholder} onSearch={onIdSearch} />*/}
            {/*    </SearchCell>*/}
            {/*</Section>*/}
            {/*<Section alignCenter>*/}
            {/*    <Radio*/}
            {/*        defaultValue={role}*/}
            {/*        tagsValues={sortTagsUsersValues}*/}
            {/*        title={sortTagsName + sortName1}*/}
            {/*        onChange={onSortChange}*/}
            {/*    />*/}
            {/*</Section>*/}
            {/*<Section>*/}
            {/*    <Button icon={<RedoOutlined />} type="primary" onClick={resetFilters}>*/}
            {/*        Reset filter settings*/}
            {/*    </Button>*/}
            {/*</Section>*/}
            {children}
            {withoutFooter ? (
                <TrendingsFooter>
                    <Pagination
                        currentIndex={pageIndex + 1}
                        defaultSize={limit}
                        height={paginationHeight}
                        pagesLimit={100}
                        totalItems={totalRecords}
                        onSizeChange={onCurrentPageChange}
                    />
                </TrendingsFooter>
            ) : (
                <Footer>
                    <Pagination
                        currentIndex={pageIndex + 1}
                        defaultSize={limit}
                        pagesLimit={100}
                        totalItems={totalRecords}
                        onSizeChange={onCurrentPageChange}
                    />
                </Footer>
            )}
        </>
    );
};
