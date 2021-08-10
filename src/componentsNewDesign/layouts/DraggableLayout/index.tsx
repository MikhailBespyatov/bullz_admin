import { Loader } from 'components/common/dynamic/Loader';
import { EmptyTrendingVideoCard } from 'components/layouts/cards/videos/TrendingVideoCard';
import {
    cardsInBlock,
    cardsInLastBlock,
    indexOfLastBlock,
    plugHeight,
    plugWidth
} from 'componentsNewDesign/layouts/DraggableLayout/constants';
import { StyledDiv, TrendingVideoWrapper } from 'componentsNewDesign/layouts/DraggableLayout/styles';
import {
    DraggableProps,
    DraggableTrendingVideoItemType,
    DraggableTrendingVideosProps,
    Loading,
    StyledDivProps,
    WrapperProps
} from 'componentsNewDesign/layouts/DraggableLayout/types';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
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

const TrendingVideoBlock: FC<Loading> = ({ children, loading }) => (
    <TrendingVideoWrapper loading={loading}>
        {loading && (
            <AbsoluteWrapper height={plugHeight} width={plugWidth} zIndex="29">
                <Column alignCenter justifyCenter height="100%" margin="auto" width="100%">
                    <Loader size="large" />
                </Column>
            </AbsoluteWrapper>
        )}
        {children}
    </TrendingVideoWrapper>
);

//TODO: make it with display-grid
export const parseItemsByBlocksWithEmptyItems = (items: DraggableTrendingVideoItemType[]) => {
    //const lastPosition = items?.length ? items[items.length - 1].position : 0;
    const blocksQuantity = Math.ceil(trendingVideoLimit / cardsInBlock) || 1;

    let array: DraggableTrendingVideoItemType[][] = [];
    let i = 0;
    for (let j = 0; j < blocksQuantity; j++) {
        let subArray: DraggableTrendingVideoItemType[] = [];
        for (let v = 0; v < (indexOfLastBlock - 1 === j ? cardsInLastBlock : cardsInBlock); v++) {
            if (items[i]?.position === j * cardsInBlock + v) {
                subArray.push(items[i]);
                i++;
            } else
                subArray.push({
                    item: <EmptyTrendingVideoCard position={j * cardsInBlock + v} />,
                    position: j * cardsInBlock + v,
                    isEmpty: true
                });
        }
        array.push(subArray);
    }

    return array;
};

//TODO: make it with display-grid
export const DraggableTrendingVideos = ({ items, onDragEnded, loading }: DraggableTrendingVideosProps) => {
    const [firstIndex, setIsFirstIndex] = useState<undefined | number>();
    const [secondIndex, setIsSecondIndex] = useState<undefined | number>();

    const onDragStart = (i: number) => {
        setIsFirstIndex(i);
    };
    const onDragEnd = () => {
        if (secondIndex !== undefined && secondIndex !== firstIndex) onDragEnded(firstIndex || 0, secondIndex);
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
                <TrendingVideoBlock key={i.toString()} loading={loading}>
                    {block.map(({ item, isEmpty }, j) => (
                        <DraggableItem
                            key={j.toString()}
                            draggable={!isEmpty}
                            isHovered={i * cardsInBlock + j === secondIndex || i * cardsInBlock + j === firstIndex}
                            onDragEnd={onDragEnd}
                            //onDragLeave={onDragLeave}
                            onDragOver={() => onDragOver(i * cardsInBlock + j)}
                            onDragStart={() => onDragStart(i * cardsInBlock + j)}
                        >
                            {item}
                        </DraggableItem>
                    ))}
                </TrendingVideoBlock>
            ))}
        </>
    );
};
