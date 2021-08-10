import { ClearInputButton } from 'componentsNewDesign/common/buttons/ClearInputButton';
import { SearchButton } from 'componentsNewDesign/common/buttons/SearchButton';
import { InputWrapper } from 'componentsNewDesign/common/inputs/SearchInput/styles';
import { Select } from 'componentsNewDesign/common/inputs/Select';
import { IconWrapper, Input } from 'componentsNewDesign/common/inputs/TextInput/styles';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { useStore } from 'effector-react';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { userStores } from 'stores/users/user';
import { SearchParameters } from 'types/data';
import { OnStringChange } from 'types/form';
import { ReactClick, ReactKeyboard } from 'types/react';
import { BorderProperties, Padding } from 'types/styles';

export interface SearchInputProps
    extends Pick<Padding, 'padding'>,
        Pick<BorderProperties, 'border'>,
        OnStringChange,
        ReactKeyboard<HTMLInputElement>,
        ReactClick<HTMLButtonElement> {
    searchParameters: SearchParameters[];
    value?: string;
    disableClearButton?: boolean;
    disableEnterKeyDown?: boolean;
    selectPadding?: string;
    // byIdParameters?: string[];
}

export const SearchInput = ({
    border,
    padding,
    selectPadding,
    searchParameters,
    disableClearButton,
    disableEnterKeyDown
}: // byIdParameters
SearchInputProps) => {
    const { access } = useStore(userStores.auth);
    const filteredSearchParameters = searchParameters.filter(({ accessFilter }) =>
        accessFilter ? accessFilter.some(role => role === access) : true
    );

    const selectorItems = filteredSearchParameters.map(({ searchBy }) => searchBy);

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [isPressedEnter, setIsPressedEnter] = useState(false);

    const defaultValues = filteredSearchParameters.map(({ defaultValue }) => defaultValue || '');
    const onSearch = filteredSearchParameters[activeItemIndex].onSearch;

    const [values, setValues] = useState(defaultValues);

    const value = values[activeItemIndex];

    /* For setting selector to non empty value */
    const [isFirstUpdate, setIsFirstUpdate] = useState(true);

    useEffect(() => {
        /* If value have been changed - selector don't setting to old state (with non empty value) */
        if (isFirstUpdate && values.some(value => value !== '')) {
            values.forEach((value, i) => value !== '' && setActiveItemIndex(i));
            setIsFirstUpdate(false);
        }
    }, [values, isFirstUpdate]);

    const [isFocused, setIsFocused] = useState(false);

    const onInputFocus = () => {
        setIsFocused(true);
    };

    const onSearchClick = () => {
        value && onSearch(value);
        /* // TODO: refactor code*/
        setValues(() => {
            const returnedValues = filteredSearchParameters.map(_ => '');
            returnedValues[activeItemIndex] = value;
            return returnedValues;
        });
    };

    const onInputBlur = () => {
        setIsFocused(false);
        if (!isPressedEnter) {
            onSearchClick();
            setIsPressedEnter(true);
        }
    };

    const clearSearch = () => {
        setValues(filteredSearchParameters.map(_ => ''));
        onSearch('');
    };

    const onChangeSelector = (index: number) => {
        // clearSearch();
        setActiveItemIndex(index);
    };

    const onChange = (value: string) => {
        // const isIdParameter = byIdParameters?.some(idParameter => selectorItems[activeItemIndex] === idParameter);
        // /* Select search by id if input data it is objectId (id from mongoDb) */
        // byIdParameters &&
        //     isObjectId(value) &&
        //     !isIdParameter &&
        //     onChangeSelector(selectorItems.findIndex(parameter => parameter === byIdParameters[0]));
        filteredSearchParameters.forEach(({ regExp, searchBy }) => {
            if (regExp && regExp.test(value)) {
                const matchedSelectorIndex = selectorItems.findIndex(parameter => parameter === searchBy);
                /*TODO: refactor code*/
                setValues(values => {
                    const returnedValues = [...values];
                    returnedValues[matchedSelectorIndex] = value;
                    return returnedValues;
                });
                onChangeSelector(matchedSelectorIndex);
            }
        });

        /* //TODO: refactor code*/
        setValues(values => {
            const returnedValues = [...values];
            returnedValues[activeItemIndex] = value;
            return returnedValues;
        });

        value === '' && defaultValues[activeItemIndex] && onSearch('') && setIsPressedEnter(true);
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPressedEnter(false);
        onChange(e.currentTarget.value);
    };

    const searchStart = ({ key }: KeyboardEvent<HTMLInputElement>) => {
        if (key === 'Enter') {
            onSearchClick();
            setIsPressedEnter(true);
        } else if (key === 'Backspace') {
            value.length === 1 && clearSearch();
        }
    };

    useEffect(() => {
        setValues(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParameters]);

    return (
        <>
            <Section alignCenter noWrap marginBottom="0" marginRight="50px">
                {/* <RelativeWrapper height="fit-content"> */}
                {/* <AbsoluteWrapper left={searchButtonLeftMargin} top={closeButtonTopPadding}> */}
                <InputWrapper border={border} padding={padding}>
                    {/* <MarginWrapper marginRight={searchButtonRightMargin}> */}

                    <SearchButton active={isFocused} onClick={onSearchClick} />

                    {/* </MarginWrapper> */}

                    {/* </AbsoluteWrapper> */}
                    {/* <Input
                            paddingLeft={inputLeftPadding}
                            placeholder={searchParameters[activeItemIndex].placeholder}
                            type="text"
                            value={value}
                            onChange={onChange}
                            onKeyDown={searchStart}
                        />
                        {value && (
                            <AbsoluteWrapper right="10px" top={closeButtonTopPadding}>
                                <ClearInputButton onClick={clearSearch} />
                            </AbsoluteWrapper>
                        )} */}
                    {/*{filteredSearchParameters.map(({ placeholder, searchBy }, index) => (*/}
                    {/*    <Input*/}
                    {/*        key={searchBy}*/}
                    {/*        fontWeight="700"*/}
                    {/*        placeholder={placeholder}*/}
                    {/*        type="text"*/}
                    {/*        value={values[index]}*/}
                    {/*        visible={index === activeItemIndex}*/}
                    {/*        onBlur={onInputBlur}*/}
                    {/*        onChange={onInputChange}*/}
                    {/*        onFocus={onInputFocus}*/}
                    {/*        onKeyDown={disableEnterKeyDown ? undefined : searchStart}*/}
                    {/*    />*/}
                    {/*))}*/}
                    <Input
                        fontWeight="700"
                        placeholder={filteredSearchParameters[activeItemIndex].placeholder}
                        type="text"
                        value={value}
                        onBlur={onInputBlur}
                        onChange={onInputChange}
                        onFocus={onInputFocus}
                        onKeyDown={disableEnterKeyDown ? undefined : searchStart}
                    />
                    <IconWrapper>
                        {value && !disableClearButton && <ClearInputButton onClick={clearSearch} />}
                    </IconWrapper>
                    {/* <TextInput
                        fontWeight="700"
                        placeholder={searchParameters[activeItemIndex].placeholder}
                        value={value}
                        onChange={onChange}
                        onClick={clearSearch}
                        onKeyDown={searchStart}
                    /> */}
                </InputWrapper>
                {/* </RelativeWrapper> */}

                {/* <MarginWrapper marginLeft="2px" marginRight="2px">
                    <BorderInputBlock />
                </MarginWrapper> */}
                <Select
                    border={border}
                    defaultIndex={activeItemIndex}
                    minWidth="140px"
                    padding={selectPadding}
                    selector={selectorItems}
                    onChange={onChangeSelector}
                />
            </Section>
        </>
    );
};
