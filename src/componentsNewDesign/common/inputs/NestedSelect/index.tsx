import { ArrowImg } from 'componentsNewDesign/common/imgComponents/ArrowImg';
import { BackArrowTitle } from 'componentsNewDesign/common/inputs/BackArrowTitle';
import {
    countryCodeCountryNameConverter,
    FilterParameters,
    findIndexOfSelector,
    findNestedSelectorsList,
    searchAvailableMinLength,
    SelectorsItemProps
} from 'componentsNewDesign/common/inputs/NestedSelect/constants';
import { NestedSelectItem } from 'componentsNewDesign/common/inputs/NestedSelectItem';
import {
    selectorLeftPadding,
    selectorRightPadding,
    selectorVerticalPadding,
    titleMarginBottom
} from 'componentsNewDesign/common/inputs/Select/constants';
import {
    ItemsAbsoluteWrapper,
    ItemSpan,
    SelectWrapper,
    SelectWrapperProps,
    TitleSpan
} from 'componentsNewDesign/common/inputs/Select/styles';
import { SelectSearchInput } from 'componentsNewDesign/common/inputs/SelectSearchInput';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { ClickWrapper } from 'componentsNewDesign/modals/MagnifyImage/styles';
import { ContentWrapperProps } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { noop } from 'constants/functions';
import { useRefWidthAndHeight } from 'hooks/getRefProperty';
import { useModal } from 'hooks/modal';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from 'types/data';

// interface DropdownListAbsoluteWrapperProps extends StyledAbsoluteWrapperProps {
//     backArrowTitle: string;
//     onBackArrowTitleClick: () => void;
//     isSearchable: boolean;
//     searchPlaceholder: string;
//     startSearch: (value: string) => void;
//     searchValue: (value: string) => void;
//     isLoading: boolean;
//     top: string;
// }

// export const DropdownListAbsoluteWrapper: FC<DropdownListAbsoluteWrapperProps> = ({
//     children,
//     backArrowTitle,
//     onBackArrowTitleClick,
//     isSearchable,
//     searchPlaceholder,
//     startSearch,
//     searchValue,
//     isLoading,
//     top,
//     visible
// }) => (
//     <StyledAbsoluteWrapper maxHeight="60vh" top={top} visible={visible}>
//         <AbsoluteWrapper left="0px" top="0px" width="100%">
//             {backArrowTitle && <BackArrowTitle value={backArrowTitle} onClick={() => onBackArrowTitleClick()} />}
//             {isSearchable && (
//                 <SelectSearchInput placeholder={searchPlaceholder} startSearch={startSearch} onChange={searchValue} />
//             )}

//             {isLoading && (
//                 <Section justifyCenter margin="5px 0">
//                     <ContentText fontWeight="700" padding="0 7px">
//                         Loading...
//                     </ContentText>
//                 </Section>
//             )}
//         </AbsoluteWrapper>
//         {children}
//     </StyledAbsoluteWrapper>
// );

// * calculation of top position depends on padding-bottom and top, not on a padding
export interface NestedSelectProps
    extends Omit<ContentWrapperProps, 'padding'>,
        // ReactKeyboard<HTMLInputElement>,
        Pick<Title, 'title'>,
        SelectWrapperProps {
    selector: SelectorsItemProps[];
    onSelect: ({ selectorType, selectorName }: FilterParameters) => void;
    defaultSelectedItem?: string;
    defaultSelectedItemType?: string;
    isLoading: boolean;
}

export const NestedSelect = ({
    isLoading,
    selector,
    title,
    paddingBottom = selectorVerticalPadding,
    paddingLeft = selectorLeftPadding,
    paddingRight = selectorRightPadding,
    paddingTop = selectorVerticalPadding,
    backgroundColor,
    defaultSelectedItem = '',
    defaultSelectedItemType = '',
    onSelect = noop,
    ...wrapperStyles
}: NestedSelectProps) => {
    //const [isOpen, toggleIsOpened] = useToggle();
    //const openClick = () => !disabled && open();

    const { visible, close, open } = useModal();
    const componentRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const [, selectHeight] = useRefWidthAndHeight(selectRef);
    const top = selectHeight + parseInt(selectorVerticalPadding) + parseInt(selectorVerticalPadding) + 'px';

    const [searchInputValue, setSearchInputValue] = useState('');
    const [selectorsList, setSelectorsList] = useState(selector);
    const [backArrowTitle, setBackArrowTitle] = useState('');
    const [isSearchable, setIsSearchable] = useState(false);
    const [isNested, setIsNested] = useState(false);
    const [searchPlaceholder, setSearchPlaceholder] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemType, setSelectedItemType] = useState('');

    const [path, setPath] = useState<number[] | undefined>(undefined);

    const setCommonSelectorVariables = (selectorsItem?: SelectorsItemProps) => {
        if (!selectorsItem) {
            setSelectorsList(selector);
            setIsSearchable(false);
            setBackArrowTitle('');
            setPath(undefined);
            setIsNested(true);
        } else {
            const { nestedSelectors, searchPlaceholder, selectorName } = selectorsItem;
            const isSearchAvailable = (nestedSelectors?.length || 0) > searchAvailableMinLength;

            setSelectorsList(nestedSelectors || []);
            setSearchInputValue('');
            setIsSearchable(isSearchAvailable);
            setSearchPlaceholder(searchPlaceholder || '');
            setBackArrowTitle(nestedSelectors ? selectorName : '');
        }
    };

    const setSelectedItemAndSendRequest = (selectorName: string, selectorType: string, selectorCode?: string) => {
        // console.log(selectorType, selectorName, selectedItem);

        if (selectedItem === selectorName && selectedItemType === selectorType) {
            const selectorName = '';

            setSelectedItem('');
            setSelectedItemType('');
            onSelect({ selectorType, selectorName, selectorCode });
            setCommonSelectorVariables();
        } else {
            setSelectedItem(selectorName);
            setSelectedItemType(selectorType);
            onSelect({ selectorType, selectorName, selectorCode });
            setSearchInputValue('');
        }
    };

    const onSelectorClick = (item: SelectorsItemProps) => {
        const { selectorName, selectorType, selectorCode } = item;
        selectorCode
            ? selectorType && setSelectedItemAndSendRequest(selectorName, selectorType, selectorCode)
            : selectorType && setSelectedItemAndSendRequest(selectorName, selectorType);
    };

    const startSearch = (value: string) => {
        const currentSelector = path && findNestedSelectorsList(path, selector);
        const nestedSelectors = currentSelector?.nestedSelectors;

        if (nestedSelectors?.length) {
            const { selectorType } = nestedSelectors?.[0];
            // console.log('selectorType', selectorType);
            // console.log('currentSelector', currentSelector);
            // console.log('value', value);

            if (selectorType === 'country') {
                const array = findNestedSelectorsList(path, selector);
                const countryData =
                    array?.nestedSelectors &&
                    countryCodeCountryNameConverter(array?.nestedSelectors, { countryName: value });

                countryData?.countryName &&
                    setSelectedItemAndSendRequest(countryData?.countryName, selectorType, countryData?.countryCode);
            } else {
                selectorType && setSelectedItemAndSendRequest(value, selectorType);
            }
        }
    };

    const onArrowClick = async (item: SelectorsItemProps) => {
        //console.log('arrow clicked');

        const { nestedSelectors, selectorName, selectorCode, selectorType, isFetched, onFetch } = item;
        //console.log('selector', selector);

        const itemIndex = findIndexOfSelector(selectorName, selector);

        //console.log('func', findIndexOfSelector(selectorName, selector));

        itemIndex !== undefined && (path === undefined ? setPath([itemIndex]) : setPath([...path, itemIndex]));

        if (isFetched && onFetch) {
            await onFetch(selectorType === 'country' ? selectorCode : selectorName);
        } else {
            setCommonSelectorVariables(item);
            setIsNested(!!nestedSelectors);
        }
    };

    const onBackArrowTitleClick = () => {
        //findNestedSelectorsList(path?.slice(0, path.length - 1), selector);

        if (path?.length === 1) {
            setCommonSelectorVariables();
        } else {
            const previousSelector = findNestedSelectorsList(path?.slice(0, path.length - 1), selector);

            if (previousSelector) {
                setCommonSelectorVariables(previousSelector);
                setIsNested(!!previousSelector.nestedSelectors);
                setPath(path?.slice(0, path.length - 1));
            }
        }
    };

    const searchValue = (value: string) => {
        const currentSelector = path && findNestedSelectorsList(path, selector);

        if (currentSelector) {
            const { nestedSelectors } = currentSelector;

            const filteredList = nestedSelectors?.filter((item: SelectorsItemProps) =>
                item.selectorName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            );

            filteredList && setSelectorsList(filteredList);

            if (value === '') {
                nestedSelectors && setSelectorsList(nestedSelectors);
            }
        }
    };

    const onChange = (value: string) => {
        setSearchInputValue(value);
        searchValue(value);
    };

    //useCloseClick(componentRef, close);

    useEffect(() => {
        if (defaultSelectedItemType === 'country') {
            const array = path ? findNestedSelectorsList(path, selector) : selector[1];

            const countryData =
                array?.nestedSelectors &&
                countryCodeCountryNameConverter(array?.nestedSelectors, { countryCode: defaultSelectedItem });

            countryData?.countryName && setSelectedItem(countryData?.countryName);
        } else {
            setSelectedItem(defaultSelectedItem);
        }

        setSelectedItemType(defaultSelectedItemType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultSelectedItem, defaultSelectedItemType, selector]);

    useEffect(() => {
        /*selectedItem &&*/ visible && close();
        setPath(undefined);

        //console.log('useEffect selector', selector);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem]);

    useEffect(() => {
        !visible && setCommonSelectorVariables();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    useEffect(() => {
        const result = findNestedSelectorsList(path, selector);

        if (result) {
            setSelectorsList([result]);
            setCommonSelectorVariables(result);
        } else {
            setSelectorsList(selector);
        }

        !path && setIsNested(true);

        //console.log('use effect path ', path);
        //console.log('USE EFFECT selector[1].nestedSelectors', selector[1].nestedSelectors);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector]);

    //console.log(searchInputValue);
    //console.log('path', path);
    //console.log(visible);

    return (
        <SelectWrapper
            ref={componentRef}
            backgroundColor={backgroundColor}
            paddingBottom={title ? selectorRightPadding : paddingBottom}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            paddingTop={title ? selectorRightPadding : paddingTop}
            // onClick={!visible ? open : undefined /*visible ? close : openClick*/}
            {...wrapperStyles}
        >
            <ClickWrapper onClick={visible ? close : open}>
                <Column ref={selectRef} width="100%">
                    {title && (
                        <Row marginBottom={titleMarginBottom}>
                            <TitleSpan>{title}</TitleSpan>
                        </Row>
                    )}
                    <Section alignCenter justifyBetween noWrap>
                        <MarginWrapper marginRight="20px">
                            <ItemSpan fontStyle="bold" fontWeight="700">
                                {selectedItem || 'Not selected'}
                            </ItemSpan>
                        </MarginWrapper>
                        <ArrowImg rotate={visible ? 180 : 0} />
                    </Section>
                </Column>
            </ClickWrapper>
            <ItemsAbsoluteWrapper maxHeight="60vh" top={top} visible={visible}>
                <Column marginBottom="5px" /*marginTop={backArrowTitle ? '65px' : undefined}*/>
                    {backArrowTitle && (
                        <BackArrowTitle value={backArrowTitle} onClick={() => onBackArrowTitleClick()} />
                    )}
                    {isSearchable && (
                        <SelectSearchInput
                            placeholder={searchPlaceholder}
                            startSearch={startSearch}
                            value={searchInputValue}
                            onChange={onChange}
                        />
                    )}

                    {isLoading && (
                        <Section justifyCenter margin="10px 0">
                            <Loader size="middle" />
                        </Section>
                    )}

                    {/* <DropdownListAbsoluteWrapper
                backArrowTitle={backArrowTitle}
                isLoading={isLoading}
                isSearchable={isSearchable}
                searchPlaceholder={searchPlaceholder}
                searchValue={searchValue}
                startSearch={startSearch}
                top={top}
                visible={visible}
                onBackArrowTitleClick={() => onBackArrowTitleClick()}
            > */}

                    {!isLoading &&
                        selectorsList.map(item => {
                            const { selectorName, nestedSelectors, selectorType, isFetched } = item;

                            return (
                                <NestedSelectItem
                                    key={selectorName}
                                    active={selectorName === selectedItem && selectorType === selectedItemType}
                                    isNested={isFetched ? isNested : !!nestedSelectors}
                                    selectable={!selectorType}
                                    value={selectorName}
                                    onArrowClick={() => onArrowClick(item)}
                                    onSelectorClick={() => onSelectorClick(item)}
                                />
                            );
                        })}
                </Column>
                {/* </DropdownListAbsoluteWrapper> */}
            </ItemsAbsoluteWrapper>
        </SelectWrapper>
    );
};
