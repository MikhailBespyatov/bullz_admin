import { contentWrapperBorderRadius } from 'componentsNewDesign/wrappers/ContentWrapper/constants';
import { black, white } from 'constants/styles/colors';

export const multiplier = -1;

export const animationPopoverTime = 0.4;

export const selectedColor = black;
export const hoveredColor = black;
export const selectedTextColor = white;

export const popoverBorderRadius = contentWrapperBorderRadius;

export const itemHeight = '55px';

export const popoverHeight = '410px';
export const popoverMinWidth = '265px';
export const popoverMaxWidth = '420px';
export const popoverDifference = parseInt(popoverMaxWidth) - parseInt(popoverMinWidth) + 'px';
export const popoverExpansionValue = parseInt(popoverMaxWidth) - parseInt(popoverMinWidth);
//to calculate the middle of the parent block popover
export const popoverHalfWidth = parseInt(popoverMinWidth) / 2 + 'px';
export const popoverBackgroundColor = white;

export const popoverVerticalMargin = '5px';

export const popoverArrowDiameter = '30px';
// 5 - coefficient at distortion of the length of the arrow block when rotating 45 degrees
export const popoverArrowVerticalMargin = parseInt(popoverArrowDiameter) / 5 + 'px';
export const popoverFinalVerticalMargin = parseInt(popoverVerticalMargin) + parseInt(popoverArrowVerticalMargin) + 'px';
export const popoverArrowHalfDiameter = parseInt(popoverArrowDiameter) / 2 + 'px';
export const popoverArrowTop = parseInt(popoverArrowDiameter) + parseInt(popoverFinalVerticalMargin) + 'px';

export const borderItemColor = 'rgba(0, 0, 0, 0.2)';

export const calculatePopoverLeft = (childrenHalfWidth: string, popoverWidth: string, popoverMarginLeftRight: number) =>
    multiplier * (parseInt(popoverWidth) / 2 - parseInt(childrenHalfWidth) - popoverMarginLeftRight) + 'px';

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

export const acceptedStatus = 0;

export const reasonRadioArray: Array<{
    value: YEAY.CurationEndedReason;
    data: string;
}> = [
    {
        value: 1,
        data: 'Decline Requested'
    },
    {
        value: 2,
        data: 'Inappropriate'
    },
    {
        value: 3,
        data: 'Graphic Content'
    },
    {
        value: 4,
        data: 'Violence'
    },
    {
        value: 5,
        data: 'Copyright'
    },
    {
        value: 6,
        data: 'Test Video'
    },
    {
        value: 7,
        data: 'Incorrect Format'
    },
    {
        value: 8,
        data: 'User Requested'
    },
    {
        value: 9,
        data: 'Other'
    },
    {
        value: 10,
        data: 'Not a Product Recommendation'
    },
    {
        value: 11,
        data: 'Wrong Language'
    }
];
