import { black } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Active } from 'types/global';
import { PaddingLeft, TextProperties } from 'types/styles';

interface ItemWrapperProps extends PaddingLeft, Active, TextProperties {}

export const ItemWrapper = styled.div<ItemWrapperProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 27px;
    width: 100%;
    min-width: 170px;
    padding: 0 9px;

    :hover {
        background-color: ${black};
        cursor: pointer;
    }

    @media screen and (max-width: ${xs}) {
        min-width: 100%;
    }
`;
