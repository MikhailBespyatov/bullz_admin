import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import styled from 'styled-components';

export const TitleText = styled.span`
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
`;

export const UserPropertyWrapper = styled(Column)`
    margin-right: 8px;
    margin-bottom: 16px;
`;

export const BlockInformationText = styled.span`
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    color: #ff3333;
    letter-spacing: 0.06em;
    text-transform: uppercase;
`;
