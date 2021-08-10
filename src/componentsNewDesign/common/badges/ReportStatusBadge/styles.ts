import styled from 'styled-components';
import { BackgroundColor, Color } from 'types/styles';
import { grey19 } from 'constants/styles/colors';
import { coloredDorDiameter } from 'componentsNewDesign/common/badges/ReportStatusBadge/constants';

export const ReportTitle = styled.span<Color>`
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: ${({ color }) => color || grey19};
`;

export const ColoredDot = styled.div<BackgroundColor>`
    width: ${coloredDorDiameter};
    height: ${coloredDorDiameter};
    border-radius: 50%;
    background-color: ${({ backgroundColor }) => backgroundColor || grey19};
`;
