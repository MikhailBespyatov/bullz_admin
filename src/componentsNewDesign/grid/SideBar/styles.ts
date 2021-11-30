import {
    ellipsisTextPadding,
    pageLinkLineHeight,
    sideBarZIndex,
    subPageLinkLineHeight
} from 'componentsNewDesign/grid/SideBar/constants';
import { SideBarProps } from 'componentsNewDesign/grid/SideBar/types';
import { paginationHeight } from 'componentsNewDesign/layouts/Pagination/constants';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey22, grey24, grey28, hoverGrey, white } from 'constants/styles/colors';
import {
    bigScreenDisplayNoneMixin,
    disableDefaultButtonStyleMixin,
    disableScrollbarMixin,
    ellipsisMixin,
    flexCenter,
    smallScreenDisplayNoneMixin
} from 'constants/styles/mixins';
import { transitionTime } from 'constants/styles/others';
import { lg_1, padding, sideBarWidth, smallSideBarWidth, xs } from 'constants/styles/sizes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Expanded, IsClosed } from 'types/data';
import { Active } from 'types/global';

export const Wrapper = styled.aside<SideBarProps>`
    position: fixed;
    top: 0;
    left: 0;
    ${flexCenter};
    justify-content: space-around;
    flex-direction: column;
    // flex-wrap: nowrap;
    width: ${sideBarWidth};
    height: 100%;
    background-color: ${grey28};
    margin-left: ${({ isExpanded }) => (isExpanded ? '0px' : padding)};
    padding-top: 40px;
    padding-bottom: ${paginationHeight};
    transition: transform ${transitionTime};
    z-index: ${sideBarZIndex};

    @media (max-width: ${lg_1}) {
        width: ${({ isExpanded }) => (isExpanded ? sideBarWidth : smallSideBarWidth)};
    }

    @media (max-width: ${xs}) {
        top: 80px;
        width: ${sideBarWidth};
        margin-left: 0;
        padding-top: 8px;

        transform: ${({ isClosed }) => (isClosed ? 'translateX(-100%)' : '')};
        transition: transform 0.3s;
    }
`;

export const PagesWrapper = styled(Column)`
    ${disableScrollbarMixin};
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    flex-wrap: noWrap;
`;

export const UsernameText = styled.span<Expanded>`
    max-width: calc(${sideBarWidth} - 2 * ${ellipsisTextPadding});
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    color: ${white};
    letter-spacing: 0em;
    text-align: center;
    padding: 0 ${ellipsisTextPadding};
    ${ellipsisMixin};

    @media (max-width: ${lg_1}) {
        max-width: calc(${smallSideBarWidth} - 2 * ${ellipsisTextPadding});
    }
    @media (max-width: ${lg_1}) {
        ${({ isExpanded }) => isExpanded && `max-width: calc(${sideBarWidth} - 2 * ${ellipsisTextPadding})`};
    }
`;

export const EmailText = styled.span<Expanded>`
    max-width: calc(${sideBarWidth} - 2 * ${ellipsisTextPadding});
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: ${white};
    letter-spacing: 0em;
    text-align: center;
    padding: 0 5px;
    opacity: 0.5;
    ${ellipsisMixin};

    @media (max-width: ${lg_1}) {
        max-width: calc(${smallSideBarWidth} - 2 * ${ellipsisTextPadding});
    }
    @media (max-width: ${lg_1}) {
        ${({ isExpanded }) => isExpanded && `max-width: calc(${sideBarWidth} - 2 * ${ellipsisTextPadding})`};
    }
`;

interface PageNameProps extends Active, Expanded {}

export const PageName = styled.span<PageNameProps>`
    //height: ${pageLinkLineHeight};
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    //line-height: ${pageLinkLineHeight};
    letter-spacing: 0em;
    text-align: left;
    //margin-top: 3px;
    opacity: ${({ active }) => (active ? 1 : 0.5)};
    color: ${({ active }) => (active ? `${white}` : `${grey22}`)};

    :hover {
        color: ${hoverGrey};
    }

    @media (max-width: ${xs}) {
        display: block;
    }
`;

export const AdaptiveAbsoluteWrapper = styled(AbsoluteWrapper)<Expanded>`
    display: flex;
    flex-direction: column;
    @media (max-width: ${lg_1}) {
        ${({ isExpanded }) => !isExpanded && `position: static;`};
    }
    @media (max-width: ${xs}) {
        position: absolute;
    }
`;

export const SubPageLink = styled.span`
    height: ${subPageLinkLineHeight};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: ${subPageLinkLineHeight};
    letter-spacing: 0em;
    text-align: center;
`;

export const LogoutButton = styled.button<Expanded>`
    ${disableDefaultButtonStyleMixin};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    color: ${grey22};
    opacity: 0.5;

    ${smallScreenDisplayNoneMixin};
    @media (max-width: ${xs}) {
        display: block;
        color: ${grey24};
        text-align: left;
    }
`;

export const FixedLogoutWrapper = styled(Row)<Expanded>`
    position: fixed;
    background-color: ${grey28};
    width: ${sideBarWidth};
    height: ${paginationHeight};
    bottom: 0;
    left: 0;

    @media (max-width: ${lg_1}) {
        ${({ isExpanded }) => !isExpanded && `width: ${smallSideBarWidth}`};
    }
    @media (max-width: ${xs}) {
        width: ${sideBarWidth};
        background-color: ${grey28};
        padding-left: 41px;
    }
`;

// interface SubPageIndicatorProps extends Active, Expanded {}

// export const SubPageIndicator = styled.div<SubPageIndicatorProps>`
//     height: 22px;
//     width: 20px;
//     ${({ active }) => active && `border-left: ${indicatorBorder}; border-bottom: ${indicatorBorder};`};
//     margin-right: 5px;
//     margin-bottom: 5px;
//     //margin-left: 30px;

//     ${smallScreenDisplayNoneMixin};
// `;

export const AdaptiveRow = styled(Link)<Expanded>`
    display: flex;
    align-items: center;
    margin-bottom: 55px;

    @media (max-width: ${lg_1}) {
        flex-direction: column;
    }
    @media (max-width: ${lg_1}) {
        flex-direction: ${({ isExpanded }) => (isExpanded ? `row` : 'column')};
    }
    @media (max-width: ${xs}) {
        flex-direction: row;
    }
`;

export const MenuRow = styled(Row)`
    ${bigScreenDisplayNoneMixin};
`;

export const BlackoutBackground = styled.div<IsClosed>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: ${sideBarZIndex - 1};

    transform: ${({ isClosed }) => (isClosed ? 'translateX(-100%)' : '')};
    transition: transform 0.3s;
`;

export const MobileSidebarWrapper = styled.div<IsClosed>`
    transform: ${({ isClosed }) => (isClosed ? 'translateX(-100%)' : '')};
    transition: transform 0.3s;
`;
