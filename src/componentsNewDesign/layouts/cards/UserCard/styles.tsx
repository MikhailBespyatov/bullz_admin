import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NickNameSpan = styled(ContentText)`
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0em;
    padding-left: 10px;
    width: 100px;
`;

export const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
`;
