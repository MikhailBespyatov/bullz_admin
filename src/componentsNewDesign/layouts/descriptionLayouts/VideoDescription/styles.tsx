import { VideoCommentsWrapperProps } from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/types';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { black, grey28 } from 'constants/styles/colors';
import { wrapperDisabledStyleMixin } from 'constants/styles/mixins';
import { descriptionPadding, xs } from 'constants/styles/sizes';
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

export const DownloadPopupWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 418px;
    min-height: 329px;
    z-index: 101;
    padding: 6px 40px;

    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.0778245);
    border-radius: 16px;
    background: ${grey28};

    @media (max-width: ${xs}) {
        width: 300px;
        padding: 6px 6px;
    }
`;

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${black};
    opacity: 0.6;
    z-index: 100;
`;

export const HashtagsWrapper = styled.div`
    display: flex;
    flex-direction: row;

    @media (max-width: ${xs}) {
        flex-direction: column;
        width: 100%;
    }
`;
