// * a shell sort to sort faster
export const sortTrending = (array: BULLZ.GetTrendingOverridesResponse[]) => {
    const length = array.length;
    for (let i = 0; i < length; i++) if (array[i]?.position === undefined) return [];

    let gap = (length - (length % 2)) / 2;
    while (gap > 0) {
        for (let i = gap; i < length; i++) {
            const current = array[i];
            let j = i;
            // @ts-ignore
            while (j > 0 && array[j - gap]?.position > current?.position) {
                array[j] = array[j - gap];
                j -= gap;
            }
            array[j] = current;
        }
        gap = (gap - (gap % 2)) / 2;
    }

    return array;
};
