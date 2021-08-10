import { DragEvent } from 'react';

export interface DraggableProps {
    onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (e: DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
    //onMouseOut?: (e: MouseEvent<HTMLDivElement>) => void;
}

export interface StyledDivProps {
    isHovered?: boolean;
}

export type onDragEndedType = (i: number, j: number) => void;

interface OnDragEnded {
    onDragEnded: onDragEndedType;
}

export interface WrapperProps extends OnDragEnded {
    items: JSX.Element[];
}

export interface DraggableTrendingVideoItemType {
    item: JSX.Element;
    position: number;
    isEmpty?: boolean;
}

export interface DraggableTrendingVideosProps extends OnDragEnded, Loading {
    items: DraggableTrendingVideoItemType[];
}

export interface Loading {
    loading?: boolean;
}

// export interface FreCardIndexesType {
//     blockOrderNumber: number;
//     cardOrderNumber: number;
// }
