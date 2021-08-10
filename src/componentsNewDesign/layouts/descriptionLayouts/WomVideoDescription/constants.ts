import { black, errorColor } from 'constants/styles/colors';
import { calculateBlockWidth } from 'utils/calculators';

export const titleMarginBottom = '8px';

export const propertyBlockMarginBottom = '24px';
export const propertyBlockMarginRight = '8px';
export const propertyBlockHeight = '56px';
export const propertyBlockMinWidth = '185px';
export const propertyBlockWidth = calculateBlockWidth(5, 8);

export const engagementBlockMinWidth = '60px';
export const engagementBlockWidth = 'fit-content'; /*calculateBlockWidth(8, 8);*/
export const engagementBlockPadding = '0px 10px 0px 0px';

export const consensusBlockPadding = '0px';
export const consensusBlockMinWidth = '100px';
export const consensusSpanFontWeight = '700';
export const titleFontWeight = '700';
export const titleFontSize = '12px';
export const textFontWeight = '500';
export const textLineHeight = '14px';
export const textFontSize = '14px';
export const percentageGrowthFontSize = '13px';

export const indicatorDiameter = '44px';
export const svgContainerDiameter = '55px';
export const percentConversionCoefficient = 10; //   x * 100/10  as 10 is a maximal score
export const maxScore = 10;
export const zeroOffsetCoefficient = 25;

//export const indicatorBorderTop = `2px solid ${blue}`;
//export const degreeConversionCoefficient = 36;

export const roundToNumber = 1;

export const tableMarginBottom = '18px';

export const successMessageColor = '#03a400';
export const neutralMessageColor = '#9d41ac';

export const validationResultObject = {
    '0': { text: 'Not Processed', color: black },
    '1': { text: 'Accepted By Consensus', color: successMessageColor },
    '-1': { text: 'Rejected By Consensus', color: errorColor }
};

export const validationStageObject = {
    '0': { text: 'Not Started' },
    '1': { text: 'Processing' },
    '2': { text: 'Ended' },
    '3': { text: 'Held' }
};

export const endedReasonObject = {
    '0': { text: 'None', color: black },
    '1': { text: 'Completed Normally', color: successMessageColor },
    '2': { text: 'Consensus Not Reached', color: errorColor },
    '3': { text: 'Terminated In Hold', color: errorColor },
    '4': { text: 'Deleted', color: errorColor }
};

export const WomVideoValidationStatusesObject = {
    '0': { text: 'Not Processed', color: black },
    '1': { text: 'Accepted', color: successMessageColor },
    '2': { text: 'Processing', color: black },
    '-1': { text: 'Rejected', color: errorColor }
};
