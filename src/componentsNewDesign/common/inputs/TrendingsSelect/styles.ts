import {
    itemHeight,
    lastItemBorderHeight,
    lastItemBorderRadius,
    selectorRightPadding,
    selectPadding
} from 'componentsNewDesign/common/inputs/Select/constants';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { black, grey23, grey28, grey29, white } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import styled, { css } from 'styled-components';
import { Active } from 'types/global';
import {
    BackgroundColor,
    BorderProperties,
    MaxSizes,
    Padding,
    PaddingLeft,
    TextProperties,
    Visibility
} from 'types/styles';

export interface SelectWrapperProps
    extends Pick<Padding, 'padding'>,
        Pick<BorderProperties, 'border'>,
        BackgroundColor {
    disabled?: boolean;
}

export const SelectWrapper = styled(ContentWrapper)<SelectWrapperProps>`
    position: relative;
    min-width: 170px;
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
    ${({ border }) => border && `border: ${border}`};
    padding: ${({ padding }) => (padding ? padding : selectPadding)};
    color: ${white};

    :hover {
        background-color: ${grey23};
        cursor: pointer;
    }

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
            pointer-events: none;
        `}

    @media (min-width: 1270px) {
        padding: ${({ padding }) => (padding ? padding : selectorRightPadding)};
    }

    @media (max-width: ${xs}) {
        min-width: 0;
        padding: 25px 20px 7px;
        background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
        border-radius: 0;
        :hover {
            background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
        }
    }
`;

interface ItemsAbsoluteWrapperProps extends Visibility, MaxSizes {}

export const ItemsAbsoluteWrapper = styled(AbsoluteWrapper)<ItemsAbsoluteWrapperProps>`
    width: 100%;
    left: 0;
    background-color: ${black};
    max-height: ${({ maxHeight }) => maxHeight || `calc(${itemHeight} * 7)`};
    border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.24);
    overflow: auto;
    z-index: ${sideBarZIndex + 2};
    ${({ visible }) => !visible && 'visibility: hidden;'};

    @media (max-width: ${xs}) {
        background-color: 'transparent';
        top: 56px;
    }
`;

export const LastBorderRadiusBlock = styled.div`
    width: 100%;
    height: ${lastItemBorderHeight};
    border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
`;

interface ItemWrapperProps extends PaddingLeft, Active, TextProperties {}

export const TitleSpan = styled(Span)`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
    color: ${white};
    opacity: 0.4;

    @media (max-width: ${xs}) {
        font-size: 11px;
        line-height: 19px;
    }
`;

export const ItemSpan = styled.span<ItemWrapperProps>`
    font-size: 12px;
    font-style: ${({ fontStyle }) => fontStyle || 'normal'};
    font-weight: ${({ fontWeight }) => fontWeight || '400'};
    line-height: 13px;
    letter-spacing: 0em;
    text-align: left;

    @media (max-width: ${xs}) {
        font-size: 11px;
        line-height: 21px;
    }
`;

export const ItemWrapper = styled.div<ItemWrapperProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: ${itemHeight};
    width: 100%;
    padding: 0 12px;
    background-color: ${grey23};
    color: ${white};

    :hover {
        cursor: pointer;
        background-color: ${black};
    }

    :last-child {
        border-bottom: 0;
        border-radius: 0 0 ${lastItemBorderRadius} ${lastItemBorderRadius};
    }

    @media (max-width: ${xs}) {
        padding: 16px 20px;
        background-color: ${({ active }) => (active ? grey28 : grey29)};

        :last-child {
            border-radius: 0;
        }
    }
`;
