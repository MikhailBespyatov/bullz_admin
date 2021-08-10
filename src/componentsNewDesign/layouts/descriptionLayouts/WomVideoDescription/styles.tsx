import {
    propertyBlockMarginBottom,
    propertyBlockMarginRight,
    propertyBlockMinWidth
} from 'componentsNewDesign/layouts/descriptionLayouts/WomVideoDescription/constants';
import { grey3 } from 'constants/styles/colors';
import styled from 'styled-components';
import { Background, MarginRightBottom, MinSizes, Padding, Sizes } from 'types/styles';

export interface WomPropertyBlockWrapperProps
    extends Background,
        Sizes,
        MarginRightBottom,
        Padding,
        Pick<MinSizes, 'minWidth'> {}

export const WomPropertyBlockWrapper = styled.div<WomPropertyBlockWrapperProps>`
    min-height: 62px;
    min-width: ${({ minWidth }) => minWidth || propertyBlockMinWidth};
    width: ${({ width }) => width || 'fit-content'};
    margin-bottom: ${({ marginBottom }) => marginBottom || propertyBlockMarginBottom};
    margin-right: ${({ marginRight }) => marginRight || propertyBlockMarginRight};
    padding: ${({ padding }) => padding || '8px'};
    border-radius: 8px;
    background-color: ${({ background }) => background || grey3};
`;
