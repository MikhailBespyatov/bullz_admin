import { EmptyTrendingVideoCard } from 'components/layouts/cards/videos/TrendingVideoCard';
import {
    cardsInBlock,
    cardsInLastBlock,
    indexOfLastBlock
} from 'componentsNewDesign/layouts/DraggableLayout/constants';
import { StyledDiv, TrendingVideoWrapper } from 'componentsNewDesign/layouts/DraggableLayout/styles';
import {
    DraggableProps,
    DraggableTrendingVideoItemType,
    DraggableTrendingVideosProps,
    StyledDivProps,
    WrapperProps
} from 'componentsNewDesign/layouts/DraggableLayout/types';
import { trendingVideoLimit } from 'constants/defaults/trendings';
import React, { FC, useState } from 'react';

interface ItemProps extends DraggableProps, StyledDivProps {
    draggable?: boolean;
}

export const DraggableItem: FC<ItemProps> = ({ children, draggable = true, ...draggableProps }) => (
    <StyledDiv draggable={draggable} {...draggableProps}>
        {children}
    </StyledDiv>
);

export const DraggableItems = ({ items, onDragEnded }: WrapperProps) => {
    const [firstIndex, setIsFirstIndex] = useState<undefined | number>();
    const [secondIndex, setIsSecondIndex] = useState<undefined | number>();

    const onDragStart = (i: number) => setIsFirstIndex(i);
    const onDragEnd = () => {
        secondIndex !== undefined && secondIndex !== firstIndex && onDragEnded(firstIndex || 0, secondIndex);
        setIsFirstIndex(undefined);
        setIsSecondIndex(undefined);
    };
    const onDragOver = (i: number) => firstIndex !== undefined && setIsSecondIndex(i);
    //const onMouseOut = () => setIsSecondIndex(undefined);

    return (
        <>
            {items.map((item, i) => (
                <DraggableItem
                    key={i.toString()}
                    isHovered={i === secondIndex || i === firstIndex}
                    onDragEnd={onDragEnd}
                    onDragOver={() => onDragOver(i)}
                    onDragStart={() => onDragStart(i)}
                    //onMouseOut={onMouseOut}
                >
                    {item}
                </DraggableItem>
            ))}
        </>
    );
};

const TrendingVideoBlock: FC = ({ children }) => <TrendingVideoWrapper>{children}</TrendingVideoWrapper>;

//TODO: make it with display-grid
export const parseItemsByBlocksWithEmptyItems = (items: DraggableTrendingVideoItemType[]) => {
    //const lastPosition = items?.length ? items[items.length - 1].position : 0;
    const blocksQuantity = Math.ceil(trendingVideoLimit / cardsInBlock) || 1;

    //console.log('*******PARSE items from videos', items);

    let array: DraggableTrendingVideoItemType[][] = [];
    let i = 0;
    // let skippedCardIndexes: FreCardIndexesType[] = [];
    // let itemsWithDuplicatedPositions: DraggableTrendingVideoItemType[] = [];

    for (let blockOrderNumber = 0; blockOrderNumber < blocksQuantity; blockOrderNumber++) {
        let subArray: DraggableTrendingVideoItemType[] = [];

        for (
            let videoCardOrderNumber = 0;
            videoCardOrderNumber < (indexOfLastBlock - 1 === blockOrderNumber ? cardsInLastBlock : cardsInBlock);
            videoCardOrderNumber++
        ) {
            if (items[i]?.position === blockOrderNumber * cardsInBlock + videoCardOrderNumber) {
                // console.log(
                //     'Match __ item position',
                //     items[i]?.position,
                //     ' order number',
                //     blockOrderNumber * cardsInBlock + videoCardOrderNumber
                // );

                subArray.push(items[i]);
                i++;

                // if (items[i]?.position === items[i + 1]?.position) {
                //     itemsWithDuplicatedPositions.push(items[i + 1]);

                //     subArray[i + 1] = {
                //         item: (
                //             <EmptyTrendingVideoCard
                //                 position={blockOrderNumber * cardsInBlock + videoCardOrderNumber + 1}
                //             />
                //         ),
                //         position: blockOrderNumber * cardsInBlock + videoCardOrderNumber + 1,
                //         isEmpty: true
                //     };

                //     console.log('****subArray', subArray);

                //     i = i + 2;
                // } else {
                //     i++;
                // }
            } else {
                // console.log(
                //     'EMPTY __ item position',
                //     items[i]?.position,
                //     ' order number',
                //     blockOrderNumber * cardsInBlock + videoCardOrderNumber
                // );
                // skippedCardIndexes.push({
                //     blockOrderNumber: blockOrderNumber,
                //     cardOrderNumber: videoCardOrderNumber
                // });

                subArray.push({
                    item: <EmptyTrendingVideoCard position={blockOrderNumber * cardsInBlock + videoCardOrderNumber} />,
                    position: blockOrderNumber * cardsInBlock + videoCardOrderNumber,
                    isEmpty: true
                });
            }
        }
        //console.log('****subArray', subArray);

        array.push(subArray);
    }

    // console.log('itemsWithDuplicatedPositions', itemsWithDuplicatedPositions);
    // console.log('skippedCardIndexes', skippedCardIndexes);

    // itemsWithDuplicatedPositions.length &&
    //     skippedCardIndexes.forEach(({ blockOrderNumber, cardOrderNumber }, i) => {
    //         array[blockOrderNumber][cardOrderNumber] = itemsWithDuplicatedPositions[i];
    //     });

    //console.log('****final array', array);

    return array;
};

//TODO: make it with display-grid
export const DraggableTrendingVideos = ({ items, onDragEnded }: DraggableTrendingVideosProps) => {
    const [firstIndex, setIsFirstIndex] = useState<undefined | number>();
    const [secondIndex, setIsSecondIndex] = useState<undefined | number>();

    const onDragStart = (i: number) => {
        setIsFirstIndex(i);
    };
    const onDragEnd = () => {
        if (secondIndex !== undefined && secondIndex !== firstIndex) {
            onDragEnded(firstIndex || 0, secondIndex);
        }

        setIsFirstIndex(undefined);
        setIsSecondIndex(undefined);
    };
    const onDragOver = (i: number) => {
        firstIndex !== undefined && setIsSecondIndex(i);
    };
    //const onDragLeave = () => setIsSecondIndex(undefined);

    return (
        <>
            {parseItemsByBlocksWithEmptyItems(items).map((block, i) => (
                <TrendingVideoBlock key={i.toString()}>
                    {block.map(({ item, isEmpty }, blockOrderNumber) => (
                        <DraggableItem
                            key={blockOrderNumber.toString()}
                            draggable={!isEmpty}
                            isHovered={
                                i * cardsInBlock + blockOrderNumber === secondIndex ||
                                i * cardsInBlock + blockOrderNumber === firstIndex
                            }
                            onDragEnd={onDragEnd}
                            //onDragLeave={onDragLeave}
                            onDragOver={() => onDragOver(i * cardsInBlock + blockOrderNumber)}
                            onDragStart={() => onDragStart(i * cardsInBlock + blockOrderNumber)}
                        >
                            {item}
                        </DraggableItem>
                    ))}
                </TrendingVideoBlock>
            ))}
        </>
    );
};
