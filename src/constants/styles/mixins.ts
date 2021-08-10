import { css } from 'styled-components';
import { Expanded } from 'types/data';
import { Disabled } from 'types/form';
import { grey } from './colors';
import { borderWidth, lg, lg_1, padding } from './sizes';

export const marginBottomMixin = css`
    margin-bottom: ${padding};
`;

export const borderMixin = css`
    border: ${borderWidth} solid ${grey};
`;

export const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const flexStart = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const ellipsisMixin = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const ellipsisRowMixin = css`
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
`;

export const disableDefaultButtonStyleMixin = css`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
`;

export const disableDefaultInputStyleMixin = css`
    outline: none;
    appearance: none;
    border: none;
`;

export const disableDefaultHStyleMixin = css`
    padding: 0;
    margin: 0;
`;

export const buttonEffectMixin = css`
    :hover {
        opacity: 0.5;
    }
    :active {
        opacity: 0.8;
    }
`;

export const wrapperDisabledStyleMixin = css<Disabled>`
    ${({ disabled }) => disabled && ' opacity: 0.7;'};
`;

export const smallScreenDisplayNoneMixin = css<Expanded>`
    @media (max-width: ${lg_1}) {
        display: none;
    }
    @media (max-width: ${lg_1}) {
        ${({ isExpanded }) => isExpanded && `display: block`};
    }
`;

export const bigScreenDisplayNoneMixin = css`
    @media (min-width: ${lg}) {
        display: none;
    }
`;

export const disableScrollbarMixin = css`
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const absoluteCenterAlignmentMixin = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
