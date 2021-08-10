import { lastItemBorderRadius } from 'componentsNewDesign/common/inputs/Select/constants';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { blue } from 'constants/styles/colors';
import { defaultTextColor } from 'constants/styles/default';
import styled from 'styled-components';
import { Active } from 'types/global';
import { borderItemColor, hoveredColor, itemHeight, selectedColor, selectedTextColor } from './constants';

export const TitleSpan = styled(Span)`
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: ${blue};
`;

export const ItemSpan = styled(Span)`
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
`;

interface ItemWrapperProps extends Active {}

export const TitleWrapper = styled(Section)`
    height: ${itemHeight};
`;

export const ItemWrapper = styled(Row)<ItemWrapperProps>`
    height: ${itemHeight};
    width: 100%;
    background-color: ${({ active }) => (active ? selectedColor : 'none')};
    border-bottom: 1px solid ${borderItemColor};

    ${ItemSpan} {
        color: ${({ active }) => (active ? selectedTextColor : defaultTextColor)};
        z-index: 10;
    }

    :hover {
        background-color: ${hoveredColor};
        cursor: pointer;
        z-index: 10;
        ${ItemSpan} {
            color: ${selectedTextColor};
            z-index: 10;
        }
    }

    :last-child {
        border-bottom: 0;
        border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
    }
`;
