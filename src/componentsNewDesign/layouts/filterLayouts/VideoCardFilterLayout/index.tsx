import { ResetSearchButton } from 'componentsNewDesign/common/buttons/ResetButton';
import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { DateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { Select } from 'componentsNewDesign/common/inputs/Select';
import { SortSelector } from 'componentsNewDesign/common/inputs/SortSelector';
import { selectorWidth } from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout/constants';
import { ComponentWrapper } from 'componentsNewDesign/layouts/filterLayouts/VideosFilterLayout/styles';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit, defaultPage } from 'constants/defaults/filterSettings';
import { defaultUserVideosValuesWithoutDate } from 'constants/defaults/users';
import {
    sortModeTagsValues,
    sortPrefixArray,
    sortTagsCurationStateData,
    sortTagsCurationStateValues,
    sortTagsName,
    sortTagsValues
} from 'constants/filters/sorts';
import { useStore } from 'effector-react';
import { sortName1, sortName3 } from 'pages/Home/constants';
import { CheckboxWrapper } from 'pages/Users/User/styles';
import React, { FC } from 'react';
import { userVideosEvents, userVideosStores } from 'stores/users/userVideos';
import { TotalRecords } from 'types/data';

const { updateValues, setSortPostfix, setSortPrefix } = userVideosEvents;

interface VideoCardFilterLayoutProps extends TotalRecords {
    checkboxShowAll?: boolean;
    onChangeCheckbox?: () => void;
    defaultChecked?: boolean;
}

export const VideoCardFilterLayout: FC<VideoCardFilterLayoutProps> = ({
    totalRecords,
    checkboxShowAll,
    onChangeCheckbox,
    children,
    defaultChecked
}) => {
    const { pageIndex, limit, videoCurationState, fromCreatedDateTime, toCreatedDateTime, sort, creatorId } = useStore(
        userVideosStores.values
    );
    const sortPrefix = useStore(userVideosStores.sortPrefix);
    const sortPostfix = useStore(userVideosStores.sortPostfix);

    const onSortModeChange = (isAscending: boolean) => {
        if ((isAscending ? sortPostfix === '+asc' : sortPostfix === '+desc') && sort) {
            updateValues({
                creatorId,
                sort: undefined,
                pageIndex: defaultPage
            });
        } else {
            const mode = isAscending ? sortModeTagsValues[0] : sortModeTagsValues[1];
            setSortPostfix(mode);
            updateValues({
                creatorId,
                sort: sortPrefix + mode,
                pageIndex: defaultPage
            });
        }
    };

    const onSortChange = (index: number) => {
        const sortPrefix = sortPrefixArray[index];
        setSortPrefix(sortPrefix);

        sortPrefix !== 'none'
            ? updateValues({
                  creatorId,
                  sort: sortPrefix + sortPostfix,
                  pageIndex: defaultPage
              })
            : updateValues({
                  creatorId,
                  sort: undefined,
                  pageIndex: defaultPage
              });
    };

    const onSortCurationStateChange = (index: number) => {
        updateValues({ creatorId, videoCurationState: sortTagsCurationStateValues[index], pageIndex: defaultPage });
    };

    const onDateRangeClick = (dateRange: [string, string]) => {
        updateValues({
            creatorId,
            fromCreatedDateTime: dateRange[0],
            toCreatedDateTime: dateRange[1],
            pageIndex: defaultPage
        });
    };

    const resetFilters = () => {
        setSortPostfix('+asc');
        setSortPrefix('none');

        updateValues({
            ...defaultUserVideosValuesWithoutDate,
            creatorId
        });
    };

    const onCurrentPageChange = (page: number, pageSize: number | undefined) => {
        updateValues({
            creatorId,
            pageIndex: page,
            limit: pageSize || defaultLimit
        });
    };

    // useEffect(
    //     () => () => {
    //         updateValues({
    //             ...defaultVideosValues
    //         });
    //     },
    //     []
    // );

    return (
        <>
            <Section alignCenter justifyBetween /*noWrap*/>
                <ComponentWrapper>
                    <Select
                        defaultIndex={sortPrefixArray.findIndex(item => item === sortPrefix)}
                        disabled={defaultChecked}
                        selector={sortTagsValues}
                        title={sortTagsName + sortName1}
                        width={selectorWidth}
                        onChange={onSortChange}
                    />

                    <Select
                        defaultIndex={sortTagsCurationStateValues.findIndex(item => videoCurationState === item)}
                        disabled={defaultChecked}
                        selector={sortTagsCurationStateData}
                        title={sortTagsName + sortName3}
                        width={selectorWidth}
                        onChange={onSortCurationStateChange}
                    />

                    <DateRangePicker
                        dateRange={[fromCreatedDateTime || '', toCreatedDateTime || '']}
                        disabled={defaultChecked}
                        onChange={onDateRangeClick}
                    />
                </ComponentWrapper>
                <ComponentWrapper>
                    {checkboxShowAll && (
                        <CheckboxWrapper>
                            <BooleanCheckbox
                                defaultChecked={defaultChecked}
                                name="Show all videos"
                                onChange={() => {
                                    resetFilters();
                                    if (onChangeCheckbox) {
                                        onChangeCheckbox();
                                    }
                                }}
                            />
                        </CheckboxWrapper>
                    )}
                    <SortSelector type={sort ? sortPostfix : undefined} onChange={onSortModeChange} />
                    <ResetSearchButton onClick={resetFilters} />
                </ComponentWrapper>
            </Section>
            {children}
            <Pagination
                currentIndex={pageIndex + 1}
                defaultSize={limit}
                totalItems={totalRecords}
                onSizeChange={onCurrentPageChange}
            />
        </>
    );
};
