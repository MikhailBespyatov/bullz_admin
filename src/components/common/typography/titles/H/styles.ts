import styled from 'styled-components';
import { Color } from 'types/styles';

export const P = styled.p<Color>`
    ${({ color }) => (color ? `color: ${color};` : ``)};
`;
