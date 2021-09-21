import { white } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const AuthLayout = styled.div`
    width: 100%;
    height: 100%;
    ${flexCenter};
    flex-direction: column;
    background: ${white};
`;
