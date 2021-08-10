import { black } from 'constants/styles/colors';
import { ellipsisMixin } from 'constants/styles/mixins';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const UserNickName = styled(Link)`
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: ${black};
    ${ellipsisMixin};
    max-width: 100px;
`;
