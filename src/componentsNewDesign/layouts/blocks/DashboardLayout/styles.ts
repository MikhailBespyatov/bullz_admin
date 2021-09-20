import { fullHeaderHeight } from 'constants/styles/sizes';
import styled from 'styled-components';

export const DashboardLayoutWrapper = styled.div`
    background: rgba(255, 255, 255, 0.1);
    min-height: calc(100vh - ${fullHeaderHeight} - 125px);
    width: 100%;
    padding: 20px 30px;
    margin-top: ${fullHeaderHeight};
`;
