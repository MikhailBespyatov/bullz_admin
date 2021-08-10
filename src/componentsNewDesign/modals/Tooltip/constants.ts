export const tooltipVerticalMargin = '20px';
export const tooltipHeight = '34px';
export const tooltipBorder = '1px';
export const tooltipArrowDiameter = '20px';
export const tooltipArrowHeight = Math.round(parseInt(tooltipArrowDiameter) * Math.sqrt(2)) + 'px';
export const tooltipArrowHalfDiameter = parseInt(tooltipArrowDiameter) / 2 + 'px';

export const calculateTooltipTop = (
    isTopType: boolean,
    childrenHeight: number,
    tooltipHeight: number,
    coordinatePopoverY: number
) =>
    isTopType
        ? coordinatePopoverY - tooltipHeight - parseInt(tooltipArrowHeight) / 2 + window.scrollY + 'px'
        : coordinatePopoverY +
          childrenHeight +
          parseInt(tooltipArrowHeight) -
          parseInt(tooltipVerticalMargin) +
          window.scrollY +
          'px';

export const calculateTooltipLeft = (childrenWidth: number, tooltipWidth: number, coordinatePopoverX: number) =>
    coordinatePopoverX + (childrenWidth / 2 - tooltipWidth / 2) + 'px';

// export const calculateTooltipLeft = (childrenHalfWidth: string, tooltipWidth: string, tooltipShift: number) =>
//     multiplier * (parseInt(tooltipWidth) / 2 - parseInt(childrenHalfWidth) - tooltipShift) + 'px';
// export const calculateTooltipTop = (isTopType: boolean, childrenHeight: number) =>
//     isTopType
//         ? multiplier * (parseInt(tooltipHeight) + parseInt(tooltipVerticalMargin)) + 'px'
//         : childrenHeight + parseInt(tooltipVerticalMargin) + 'px';
