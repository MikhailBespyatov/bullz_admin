import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const TeamNameSpan = styled(ContentText)`
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0em;
    padding-left: 10px;
    width: 245px;
`;

export const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
`;
