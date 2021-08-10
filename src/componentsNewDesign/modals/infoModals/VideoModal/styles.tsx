import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import styled from 'styled-components';
import { Disabled } from 'types/form';
import { wrapperDisabledStyleMixin } from 'constants/styles/mixins';

export const VideoDescriptionWrapper = styled(ContentWrapper)<Disabled>`
    padding: 0;
    ${wrapperDisabledStyleMixin}
`;

export const ConfirmationText = styled.span`
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: center;
`;
