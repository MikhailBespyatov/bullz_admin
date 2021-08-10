export function calculateBlockWidth(blocksQuantity: number, margin: number) {
    const marginWidthSum = (blocksQuantity - 1) * margin;
    return `calc((100% - ${marginWidthSum}px)/${blocksQuantity})`;
}

export const countHoverModalPosition = (containerSize: string, modalSize: string) =>
    `${(parseInt(containerSize) - parseInt(modalSize)) / 2}px`;
