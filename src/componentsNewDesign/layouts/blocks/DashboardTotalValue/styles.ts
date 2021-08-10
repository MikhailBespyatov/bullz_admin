import styled from 'styled-components';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';

export const Value = styled.span`
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 13px;
`;

export const TitleValue = styled(Value)`
    opacity: 0.4;
`;

export const DashboardValueContentWrapper = styled(ContentWrapper)`
    display: flex;
    flex-direction: column;
`;
