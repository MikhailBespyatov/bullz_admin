import { headerHeight, headerPaddingTop } from 'componentsNewDesign/grid/Header/constants';
import { filterMargin, sideBarWidth } from 'constants/styles/sizes';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    /* position: fixed; */
    position: absolute;
    top: 0;
    right: 0;
    height: ${headerHeight};
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // padding-left: calc(${sideBarWidth} + ${filterMargin});
    padding-top: ${headerPaddingTop};
    z-index: 99;
`;

export const VersionSpan = styled.span`
    position: fixed;
    right: ${filterMargin};
    top: 2px;
    color: #ccc;
    font-size: 11px;
    box-sizing: border-box;
    padding-right: 5px;
    text-align: right;
`;
