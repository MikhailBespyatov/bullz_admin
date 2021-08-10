import styled from 'styled-components';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { Padding } from 'types/styles';
import { OverflowType } from 'types/types';

interface ScrollableWrapperProps extends Padding {
    overflowX?: OverflowType;
    overflowY?: OverflowType;
}

export const ScrollableWrapper = styled(Row)<ScrollableWrapperProps>`
    overflow-x: ${({ overflowX }) => overflowX || 'auto'};
    overflow-y: ${({ overflowY }) => overflowY || 'auto'};
    ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight}`};
    ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}`};
    ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop}`};
    ${({ paddingBottom }) => paddingBottom && `padding-bottom: ${paddingBottom}`};
    ${({ padding }) => padding && `padding: ${padding}`};
`;
