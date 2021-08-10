import { primaryColor } from 'constants/styles/colors';
import { marginBottomMixin } from 'constants/styles/mixins';
import styled from 'styled-components';

export const H1 = styled.h1`
    color: ${primaryColor};
    ${marginBottomMixin}
`;
