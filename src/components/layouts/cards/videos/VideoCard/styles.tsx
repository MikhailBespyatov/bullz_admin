import { CardRow } from 'components/grid/Card';
import {
    ProgressCellFontSize,
    ProgressCellLineHeight,
    quantityMargin
} from 'components/layouts/cards/videos/VideoCard/constants';
import { PinnedSphereProps, ProgressCellSpanProps } from 'components/layouts/cards/videos/VideoCard/types';
import { black, errorColor, grey, primaryColor, successColor, white } from 'constants/styles/colors';
import { borderMixin, flexCenter, flexStart, marginBottomMixin } from 'constants/styles/mixins';
import {
    featureHeight,
    iconsFontSIze,
    miniPlayerHeight,
    opacity,
    padding,
    pinnedSphereDiameter
} from 'constants/styles/sizes';
import styled from 'styled-components';

export const VideoWrapper = styled.div`
    width: 100%;
    height: ${miniPlayerHeight};
    position: relative;
    //border-bottom: 1px solid ${grey};
`;

export const PinnedSphere = styled.div<PinnedSphereProps>`
    position: absolute;
    right: ${padding};
    height: ${pinnedSphereDiameter};
    width: ${pinnedSphereDiameter};
    border-radius: 50%;
    ${borderMixin};
    ${({ average }) => (average ? `border-color: ${primaryColor};` : '')}
    background: ${white};
    opacity: ${opacity};
    ${flexCenter};
    top: ${({ top }) => (top ? `calc(${top} * ${padding} + ${top - 1} * ${pinnedSphereDiameter});` : padding)};
    right: ${({ right }) =>
        right ? `calc(${right} * ${padding} + ${right - 1} * ${pinnedSphereDiameter});` : padding};
`;

export const ContentWrapper = styled.div`
    width: 100%;
    height: calc(100% - ${miniPlayerHeight} - ${featureHeight});
    ${flexStart};
    flex-direction: column;
`;

export const VideoInfoComponent = styled.div`
    width: 100%;
    ${flexStart};
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: ${padding};
    ${marginBottomMixin};
`;

export const VideoInfoComponentCell = styled.div`
    width: 20%;
    ${flexCenter}
    flex-direction: row;
`;

export const VideoInfoIcon = styled.img`
    width: ${iconsFontSIze};
    height: ${iconsFontSIze};
    background-size: cover;
`;

export const Quantity = styled.span`
    margin-left: ${quantityMargin};
`;

export const CardRowProgress = styled(CardRow)`
    justify-content: space-around;
    margin-top: ${padding};
`;

export const ProgressCell = styled.div`
    ${flexCenter};
    flex-direction: column;
`;

export const ProgressCellSpan = styled.span<ProgressCellSpanProps>`
    color: ${({ status }) => (status === -2 ? black : status === -1 ? errorColor : status === 0 ? grey : successColor)};
    font-style: normal;
    font-weight: bold;
    font-size: ${ProgressCellFontSize};
    line-height: ${ProgressCellLineHeight};
    text-align: center;
`;
