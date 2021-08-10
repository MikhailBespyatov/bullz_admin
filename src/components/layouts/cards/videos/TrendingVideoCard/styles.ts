import {
    featuresWrapperBorderRadius,
    featuresWrapperPadding,
    positionWrapperMinWidth
} from 'components/layouts/cards/videos/TrendingVideoCard/constants';
import { white } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import { padding } from 'constants/styles/sizes';
import styled from 'styled-components';
import { pixelsAddition } from 'utils/parsers';

export const FeaturesWrapper = styled.div`
    position: relative;
    display: inline-flex;
    border-radius: ${featuresWrapperBorderRadius};
    background-color: rgba(0, 0, 0, 0.3);
    padding: ${featuresWrapperPadding};
    padding-right: ${pixelsAddition(featuresWrapperPadding, '2px')};
    z-index: 8;
`;

export const PositionWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    ${flexCenter};
    min-width: ${positionWrapperMinWidth};
    border-radius: ${featuresWrapperBorderRadius};
    background-color: rgba(0, 0, 0, 0.3);
    padding: 4px ${featuresWrapperPadding};
    //padding-right: ${pixelsAddition(featuresWrapperPadding, '2px')};
    z-index: 8;
`;

export const AbsoluteImg = styled.img`
    position: absolute;
    top: -${padding};
    left: -${padding};
    width: calc(100% + 2 * ${padding});
    height: calc(100% + 2 * ${padding});
    object-fit: cover;
    z-index: 1;
`;

export const ViewsText = styled.span`
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: center;
    color: ${white};
`;
