// multiply pixels by number
export const multiplyPixels = (pixels: string, multiplier: number) => {
    const num = Number(pixels.slice(0, -2));
    if (pixels.slice(-2) !== 'px' || Number.isNaN(num)) return '0';

    return num * multiplier + 'px';
};

// divide pixels by number
export const dividePixels = (pixels: string, divider: number) => {
    const num = Number(pixels.slice(0, -2));
    if (pixels.slice(-2) !== 'px' || Number.isNaN(num) || divider === 0) return '0';

    return Math.round(num / divider) + 'px';
};

// addition two pixels
export const pixelsAddition = (pixels1: string, pixels2: string) => {
    const num1 = Number(pixels1.slice(0, -2));
    const num2 = Number(pixels2.slice(0, -2));
    if (pixels1.slice(-2) !== 'px' || Number.isNaN(num1) || pixels2.slice(-2) !== 'px' || Number.isNaN(num2))
        return '0';

    return num1 + num2 + 'px';
};

export const pixelsSubtraction = (pixels1: string, pixels2: string) => {
    const num1 = Number(pixels1.slice(0, -2));
    const num2 = Number(pixels2.slice(0, -2));
    if (pixels1.slice(-2) !== 'px' || Number.isNaN(num1) || pixels2.slice(-2) !== 'px' || Number.isNaN(num2))
        return '0';

    return num1 - num2 + 'px';
};

export const getDateBeforeAndReturnISO = (beforeDays = 0) =>
    new Date(Date.now() - beforeDays * 24 * 60 * 60 * 1000).toISOString();

export const getDateAfterAndReturnISO = (afterDays = 0) =>
    new Date(Date.now() + afterDays * 24 * 60 * 60 * 1000).toISOString();

export const parseCreateTrendingVideoPosition = (
    items: BULLZ.GetTrendingOverridesResponse[] | null | undefined,
    definedPosition?: number
) => {
    let position = 0;

    if (definedPosition === undefined) {
        const length = items?.length || 0;
        let isEmptyCardPositionFound = false;

        for (let i = 0; i < length; i++)
            if (i !== items?.[i]?.position) {
                position = i;
                isEmptyCardPositionFound = true;
                break;
            }

        !isEmptyCardPositionFound && (position = length);
    } else position = definedPosition;

    return position;
};

export const parseStatusError = (status: number | undefined | null) => !!status && ' .Error ' + status;
