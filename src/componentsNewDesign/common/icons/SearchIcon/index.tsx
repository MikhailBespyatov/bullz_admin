import searchIcon from 'assets/search_icon.svg';
import { searchIconWidthAndHeight } from 'componentsNewDesign/common/icons/SearchIcon/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import React from 'react';

export const SearchIcon = () => (
    <CustomImg alt="search icon" height={searchIconWidthAndHeight} src={searchIcon} width={searchIconWidthAndHeight} />
);
