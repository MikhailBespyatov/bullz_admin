import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { grey23, grey29 } from 'constants/styles/colors';
import { fullHeaderHeight } from 'constants/styles/sizes';
import styled from 'styled-components';

export const BlacklistedLayoutWrapper = styled.div`
    background: ${grey23};
    min-height: calc(100vh - ${fullHeaderHeight} - 125px);
    width: 100%;
    padding: 20px 25px;
    margin-top: 70px;
    border-radius: 25px;
`;

//margin-top: ${fullHeaderHeight};

export const LayoutContentWrapper = styled(ContentWrapper)`
    min-height: calc(100vh - ${fullHeaderHeight} - 125px);
    width: 800px;
    padding: 16px 30px;
    border-radius: 8px 8px 0px 0px;
    background: ${grey29};
`;
