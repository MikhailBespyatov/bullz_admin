import { contentWrapperBorderRadius } from 'componentsNewDesign/wrappers/ContentWrapper/constants';
import { white } from 'constants/styles/colors';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';

export const popoverZIndex = sideBarZIndex + 1;

export const multiplier = -1;

export const popoverBorderRadius = contentWrapperBorderRadius;

export const popoverDefaultWidth = '320px';
export const popoverDefaultHeight = '300px';

export const popoverHalfWidth = parseInt(popoverDefaultWidth) / 2 + 'px';
export const popoverBackgroundColor = white;

export const popoverVerticalMargin = '5px';

export const popoverArrowDiameter = '30px';
// 5 - coefficient at distortion of the length of the arrow block when rotating 45 degrees
export const popoverArrowVerticalMargin = parseInt(popoverArrowDiameter) / 5 + 'px';
export const popoverFinalVerticalMargin = parseInt(popoverVerticalMargin) + parseInt(popoverArrowVerticalMargin) + 'px';
export const popoverArrowHalfDiameter = parseInt(popoverArrowDiameter) / 2 + 'px';
export const popoverArrowTop = parseInt(popoverArrowDiameter) + parseInt(popoverFinalVerticalMargin) + 'px';

export const borderItemColor = 'rgba(0, 0, 0, 0.2)';

export const calculatePopoverLeft = (childrenHalfWidth: string, popoverWidth: string) =>
    multiplier * (parseInt(popoverWidth) / 2 - parseInt(childrenHalfWidth)) + 'px';

export const calculatePopoverArrowLeft = (childrenHalfWidth: string) =>
    parseInt(childrenHalfWidth) - parseInt(popoverArrowHalfDiameter) + 'px';

export const calculatePopoverTop = (isTopType: boolean, childrenHeight: number, popoverHeight: number) =>
    isTopType
        ? multiplier * (popoverHeight + parseInt(popoverArrowHalfDiameter) + parseInt(popoverFinalVerticalMargin)) +
          'px'
        : childrenHeight + parseInt(popoverFinalVerticalMargin) + parseInt(popoverArrowHalfDiameter) + 'px';

export const calculatePopoverFinalArrowTop = (isTopType: boolean, childrenHeight: number) =>
    isTopType
        ? multiplier * parseInt(popoverArrowTop) + 'px'
        : -1 * parseInt(popoverArrowHalfDiameter) +
          childrenHeight +
          parseInt(popoverArrowHalfDiameter) +
          parseInt(popoverFinalVerticalMargin) +
          'px';
