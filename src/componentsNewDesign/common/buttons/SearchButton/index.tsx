import searchIcon from 'assets/search_icon.svg';
import { searchIconWidthAndHeight } from 'componentsNewDesign/common/buttons/SearchButton/constants';
import { SearchButtonWrapper } from 'componentsNewDesign/common/buttons/SearchButton/styles';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';
import { Active } from 'types/global';
import { ReactClick } from 'types/react';

interface Props extends ReactClick<HTMLButtonElement>, Active {}

export const SearchButton = ({ active, ...props }: Props) => (
    <SearchButtonWrapper active={active} {...props}>
        <CustomImg
            alt="search button"
            height={searchIconWidthAndHeight}
            src={searchIcon}
            width={searchIconWidthAndHeight}
        />
    </SearchButtonWrapper>
);
