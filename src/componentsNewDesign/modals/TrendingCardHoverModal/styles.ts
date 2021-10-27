import { actionBlockPadding } from 'componentsNewDesign/modals/TrendingCardHoverModal/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { grey29 } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';

export const ActionBlockWrapper = styled(ContentWrapper)`
    height: 45px;
    width: 90px;
    min-width: 90px;
    background-color: ${grey29};
    padding: ${actionBlockPadding};
    ${flexCenter};
`;

export const Divider = styled.div`
    margin: 0px 5px;
    width: 1px;
    background-color: #cfcfcf;
    height: 20px;
    opacity: 0.8;
`;
