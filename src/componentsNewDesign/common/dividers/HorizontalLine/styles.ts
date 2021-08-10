import { hrHeight, hrWidth } from 'componentsNewDesign/common/dividers/HorizontalLine/constants';
import { HrProps } from 'componentsNewDesign/common/dividers/HorizontalLine/types';
import { grey3 } from 'constants/styles/colors';
import styled from 'styled-components';

export const HorizontalLine = styled.hr<HrProps>`
    width: ${({ width }) => width || hrWidth};
    height: ${({ height }) => height || hrHeight};
    border: none;
    background-color: ${({ background }) => background || grey3};
    margin: 0;
    ${({ opacity }) => opacity && `opacity: ${opacity};`};
`;
