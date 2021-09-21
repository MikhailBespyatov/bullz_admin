import { grey23 } from 'constants/styles/colors';
import { fullHeaderHeight } from 'constants/styles/sizes';
import styled from 'styled-components';

export const PromotionCardWrapper = styled.div`
    background: ${grey23};
    min-height: calc(100vh - ${fullHeaderHeight} - 125px);
    width: 100%;
    padding: 20px 25px;
    margin-top: 70px;
    border-radius: 25px;
`;
