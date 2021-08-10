import { adaptiveWidth, trendingVideoWrapperWidth } from 'pages/Trendings/constants';
import styled from 'styled-components';

export const TrendingVideoWrapper = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: ${trendingVideoWrapperWidth};

    @media (max-width: ${adaptiveWidth}) {
        width: 100%;
    }
`;
