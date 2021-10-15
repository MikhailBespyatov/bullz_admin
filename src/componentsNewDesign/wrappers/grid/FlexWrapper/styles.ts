import { FlexGrowProps, FlexProps } from 'componentsNewDesign/wrappers/grid/FlexWrapper/types';
import { flexCenter, flexStart } from 'constants/styles/mixins';
import styled from 'styled-components';

const Flex = styled.div<FlexProps>`
    ${flexStart};
    ${({ widthMaxContent }) => widthMaxContent && 'width: max-content;'};
    ${({ alignCenter }) => alignCenter && `align-items: center;`};
    ${({ alignEnd }) => alignEnd && `align-items: flex-end;`};
    ${({ alignBaseline }) => alignBaseline && `align-items: baseline;`};
    ${({ alignContentAround }) => alignContentAround && `align-content: space-around;`};
    ${({ alignContentBetween }) => alignContentBetween && `align-content: space-between;`};
    ${({ justifyCenter }) => justifyCenter && `justify-content: center;`};
    ${({ justifyAround }) => justifyAround && `justify-content: space-around;`};
    ${({ justifyBetween }) => justifyBetween && `justify-content: space-between;`};
    ${({ justifyEvenly }) => justifyEvenly && `justify-content: space-evenly;`};
    ${({ justifyEnd }) => justifyEnd && `justify-content: flex-end;`};
    ${({ noWrap }) => noWrap !== 'unset' && `flex-wrap: ${noWrap ? 'nowrap' : 'wrap'}`};
    ${({ width }) => width && `width: ${width};`};
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`};
    ${({ height }) => height && `height: ${height};`};
    ${({ minHeight }) => minHeight && `min-height: ${minHeight};`};
    ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`};
    ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`};
    ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`};
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight};`};
    ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`};
    ${({ margin }) => margin && `margin: ${margin};`};
    ${({ zIndex }) => zIndex !== undefined && `z-index: ${zIndex};`};
    ${({ overflow }) => overflow && `overflow: ${overflow}`};
`;

export const Row = styled(Flex)`
    flex-direction: row;
`;

export const Column = styled(Flex)`
    flex-direction: column;
`;

export const Section = styled(Row)`
    width: 100%;
`;

export const FlexGrow = styled(Column)<FlexGrowProps>`
    flex-grow: ${({ flexGrow }) => flexGrow || `1`};
    ${({ flexShrink }) => flexShrink && `flex-shrink: ${flexShrink};`};
    ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`};
    ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`};
`;

export const AlignCenter = styled.div`
    ${flexCenter};
    width: 100%;
    height: 100%;
`;
