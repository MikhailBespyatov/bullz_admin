import { MenuItemHeight, menuItemPadding } from 'components/modals/Popover/constants';
import { hoverGrey } from 'constants/styles/colors';
import { flexStart } from 'constants/styles/mixins';
import { borderRadius } from 'constants/styles/sizes';
import styled from 'styled-components';

export const PopoverMenu = styled.div`
    ${flexStart};
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: ${MenuItemHeight};
    border-radius: ${borderRadius};
    cursor: pointer;
    &:hover {
        background-color: ${hoverGrey};
    }
    padding: ${menuItemPadding};
    margin-bottom: ${menuItemPadding};
`;
