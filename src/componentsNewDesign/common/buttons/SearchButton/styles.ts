import { searchButtonWidthAndHeight } from 'componentsNewDesign/common/buttons/SearchButton/constants';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import styled from 'styled-components';
import { Active } from 'types/global';

export const SearchButtonWrapper = styled(ClickableWrapper)<Active>`
    opacity: 0.5;
    height: ${searchButtonWidthAndHeight};
    width: ${searchButtonWidthAndHeight};
    margin-right: 5px;

    :hover {
        opacity: 1;
    }

    ${({ active }) => active && `opacity: 1;`};
`;
