import { VideoCommentsWrapperProps } from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/types';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { wrapperDisabledStyleMixin } from 'constants/styles/mixins';
import { descriptionPadding } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Disabled } from 'types/form';

export const VideoDescriptionWrapper = styled(ContentWrapper)<Disabled>`
    padding: 0;
    ${({ disabled }) => disabled && wrapperDisabledStyleMixin};
`;

export const ConfirmationText = styled.span`
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: center;
`;

export const VideoCommentsWrapper = styled(ContentWrapper)<VideoCommentsWrapperProps>`
    width: ${({ width, marginRight }) => width || `calc(100% - ${marginRight})`};
    padding: ${descriptionPadding};
    background-color: ${({ backgroundColor }) => backgroundColor};
`;
