import {
    adaptiveWidth,
    trendingVideoWrapperHeight,
    trendingVideoWrapperPadding,
    trendingVideoWrapperWidth
} from 'componentsNewDesign/layouts/DraggableLayout/constants';
import { StyledDivProps } from 'componentsNewDesign/layouts/DraggableLayout/types';
import { xs } from 'constants/styles/sizes';
import styled from 'styled-components';

export const StyledDiv = styled.div<StyledDivProps>`
    ${({ isHovered }) => isHovered && 'opacity: 0.35;'};
    ${({ draggable }) => draggable && 'cursor: grab;'};
`;

export const TrendingVideoWrapper = styled.section`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /*margin-right: ${trendingVideoWrapperPadding};*/
    width: ${trendingVideoWrapperWidth};
    height: ${trendingVideoWrapperHeight};
    margin-right: 20px;
    margin-bottom: ${trendingVideoWrapperPadding};

    @media (max-width: ${adaptiveWidth}) {
        width: 100%;
        margin-bottom: 0;
    }

    @media (max-width: ${xs}) {
        margin-right: 0;
        justify-content: space-around;
        height: auto;
    }
`;
