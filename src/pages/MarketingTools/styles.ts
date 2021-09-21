import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { grey23 } from 'constants/styles/colors';
import { fullHeaderHeight } from 'constants/styles/sizes';
import styled from 'styled-components';

export const LayoutContentWrapper = styled.div`
    background: ${grey23};
    min-height: calc(100vh - ${fullHeaderHeight} - 125px);
    width: 100%;
    padding: 10px 25px 20px;
    border-radius: 25px;
    margin-top: 30px;
`;

export const TableWrapper = styled(ContentWrapper)`
    min-width: 650px;
    padding: 16px 30px;
    border-radius: 8px 8px 0px 0px;
`;
