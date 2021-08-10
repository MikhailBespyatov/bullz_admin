import styled from 'styled-components';
import { fullHeaderHeight } from 'constants/styles/sizes';

export const DashboardLayoutWrapper = styled.div`
    background: #f5f7f9;
    min-height: calc(100vh - ${fullHeaderHeight} - 125px);
    width: 100%;
    padding: 20px 30px;
    margin-top: ${fullHeaderHeight};
`;
