import { hoveredColor, selectorRightPadding } from 'componentsNewDesign/common/inputs/Select/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const ButtonSpan = styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
`;

export const SortButtonWrapper = styled(ContentWrapper)`
    background-color: transparent;
    padding: 12px 5px;
    min-width: 115px;
    ${flexCenter};

    :hover {
        background-color: ${hoveredColor};
    }

    @media (min-width: 1270px) {
        padding: ${selectorRightPadding};
    }
`;
