import { xs } from 'constants/styles/sizes';
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

export const TagsWrapper = styled.div`
    @media (max-width: ${xs}) {
        width: 100%;
        display: flex;
    }
`;
