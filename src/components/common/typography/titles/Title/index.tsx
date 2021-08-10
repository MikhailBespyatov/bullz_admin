import { marginRight } from 'components/common/tags/Tags/constants';
import { primaryColor } from 'constants/styles/colors';
import styled from 'styled-components';
import { Color } from 'types/styles';

export const Title = styled.span<Color>`
    color: ${({ color }) => color || primaryColor};
    margin-right: ${marginRight};
`;
