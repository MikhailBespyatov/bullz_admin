import { CardRowSliderMargin, cardWidth } from 'components/grid/Card/constants';
import { CardProps, CardRowProps, DescriptionCellProps, PinnedBlockProps } from 'components/grid/Card/types';
import { cardBackgroundColor, grey, primaryColor } from 'constants/styles/colors';
import {
    borderMixin,
    ellipsisMixin,
    ellipsisRowMixin,
    flexCenter,
    flexStart,
    marginBottomMixin
} from 'constants/styles/mixins';
import { cardPaddingMultiplier, transitionTime } from 'constants/styles/others';
import {
    borderRadius,
    borderWidth,
    disabledOpacity,
    ellipsisRowWidth,
    featureHeight,
    hashtagsSliderHeight,
    lg,
    lg_1,
    padding,
    scrollBarWidth,
    xl,
    xl_1,
    xxl,
    xxl_1
} from 'constants/styles/sizes';
import styled from 'styled-components';
import { Quantity } from 'types/global';
import { adaptiveCard } from 'utils/usefulFunctions';

export const Card = styled.div<CardProps>`
    ${({ disabled }) => (disabled ? `opacity: ${disabledOpacity}` : '')};
    z-index: 1;
    background-color: ${cardBackgroundColor};
    margin-right: calc(${padding} * ${cardPaddingMultiplier});
    margin-bottom: calc(${padding} * ${cardPaddingMultiplier});
    min-height: 200px;
    ${borderMixin};
    border-radius: ${borderRadius};
    ${flexCenter};
    flex-direction: column;
    ${({ fixSize }) =>
        fixSize
            ? `width: ${cardWidth}`
            : `@media (min-width: ${xxl}) {
    width: calc(100% / 4 - ${cardPaddingMultiplier} * ${padding} * 4 / 4);
    // width: calc(100% / 4 - ${cardPaddingMultiplier} * ${padding} * 3 / 4);
    // &:nth-child(4n) {
    //   margin-right: 0;
    // }
  }
  ${adaptiveCard(3, xl, xxl_1)}
  ${adaptiveCard(2, lg, xl_1)}
  ${adaptiveCard(1, '0', lg_1)}`};
`;

export const PinnedBlock = styled.div<PinnedBlockProps>`
    position: absolute;
    ${({ left, right }) => (left ? `left: ${left}` : right ? `right: ${right}` : `left: ${padding}`)};
    ${({ top, bottom }) => (top ? `top: ${top}` : bottom ? `bottom: ${bottom}` : `top: 0`)};
    display: flex;
    flex-direction: column;
`;

export const PinnedInfo = styled.div`
    margin-bottom: ${padding};
    cursor: pointer;
`;

export const CardRow = styled.div<CardRowProps>`
    width: 100%;
    ${flexStart};
    ${({ alignCenter }) => (alignCenter ? `align-items: center;` : '')};
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 ${padding};
    ${({ marginTop }) => (marginTop ? `margin-top: ${padding};` : '')};
    ${({ removePaddingRight }) => (removePaddingRight ? 'padding-right: 0;' : '')};
    ${marginBottomMixin};
    ${({ removeMarginBottom }) => (removeMarginBottom ? 'margin-bottom: 0;' : '')};
`;

export const EllipsisRow = styled.span`
    width: ${ellipsisRowWidth};
    height: 20px;
    //${ellipsisRowMixin};
    text-align: start;
    ${ellipsisMixin};
    margin-bottom: ${padding};
`;

export const CardRowSlider = styled.div`
    width: 100%;
    height: calc(${hashtagsSliderHeight} + ${scrollBarWidth});
    ${flexStart};
    flex-wrap: nowrap;
    overflow: auto;
    padding: 0 ${padding};
    //margin-bottom: ${CardRowSliderMargin};
    ${marginBottomMixin};
`;

export const CardColumnSlider = styled.div`
    width: 100%;
    // height: calc(${hashtagsSliderHeight} + ${scrollBarWidth});
    height: 60px;
    ${flexStart};
    flex-wrap: wrap;
    overflow: auto;
    //padding: 0 ${padding};
    //margin-bottom: ${CardRowSliderMargin};
    ${marginBottomMixin};
`;

export const Description = styled.div`
    width: 100%;
    ${flexStart};
    flex-direction: column;
`;

export const DescriptionCell = styled.div<DescriptionCellProps>`
    width: 100%;
    height: ${({ height }) => (height ? height : '')};
    ${ellipsisMixin};
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const CardRowFeatures = styled.div<Quantity>`
    height: ${featureHeight};
    width: 100%;
    ${flexStart};
    border-top: ${borderWidth} solid ${grey};
    flex-direction: row;
    flex-wrap: wrap;
    & > button {
        width: calc(${({ quantity }) => '100% / ' + quantity});
    }
`;

export const FeatureCell = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    height: ${featureHeight};
    ${flexCenter};
    border-right: ${borderWidth} solid ${grey};
    cursor: pointer;
    &:last-child {
        border-right: none;
    }
    transition: ${transitionTime};
    &:hover:not(:disabled) {
        color: ${primaryColor};
    }
    &:disabled {
        background-color: ${grey};
    }
`;
