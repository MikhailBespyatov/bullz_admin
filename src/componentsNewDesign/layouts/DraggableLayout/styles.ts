import {
    adaptiveWidth,
    plugWidth,
    trendingVideoWrapperHeight,
    trendingVideoWrapperPadding,
    trendingVideoWrapperWidth
} from 'componentsNewDesign/layouts/DraggableLayout/constants';
import { Loading, StyledDivProps } from 'componentsNewDesign/layouts/DraggableLayout/types';
import { padding } from 'constants/styles/sizes';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div<StyledDivProps>`
    ${({ isHovered }) => isHovered && 'opacity: 0.35;'};
    ${({ draggable }) => draggable && 'cursor: grab;'};
`;

export const TrendingVideoWrapper = styled.section<Loading>`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: ${trendingVideoWrapperWidth};
    height: ${trendingVideoWrapperHeight};
    /*margin-right: ${trendingVideoWrapperPadding};*/
    margin-right: 20px;
    margin-bottom: ${trendingVideoWrapperPadding};

    @media (max-width: ${adaptiveWidth}) {
        width: 100%;
        margin-bottom: 0;
    }

    ${({ loading }) =>
        loading &&
        css`
            &:after {
                position: absolute;
                top: 0;
                left: 0;
                content: '';
                width: ${plugWidth};
                height: calc(100% - ${padding});
                background: rgba(0, 0, 0, 0.8);
                z-index: 28;
            }
        `}
`;
