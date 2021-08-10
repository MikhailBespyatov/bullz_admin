import { Span } from 'componentsNewDesign/common/typography/Span';
import styled from 'styled-components';

export const TitleSpan = styled(Span)`
    font-style: normal;
    text-align: center;
    font-size: ${({ fontSize }) => fontSize || '20px'};
    font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
    line-height: ${({ lineHeight }) => lineHeight || '23px'};
`;
export const SubtitleSpan = styled(Span)`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    color: #b5b6b7;
`;
