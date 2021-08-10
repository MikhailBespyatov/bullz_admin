import { Span } from 'componentsNewDesign/common/typography/Span';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteCenterAlignment } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { blue, white } from 'constants/styles/colors';
import { primaryBorderRadius } from 'constants/styles/sizes';
import styled from 'styled-components';

export const ModalAbsoluteWrapper = styled(AbsoluteCenterAlignment)`
    background-color: ${white};
    width: 30%;
    height: 400px;
    border-radius: ${primaryBorderRadius};
    z-index: ${sideBarZIndex + 1};
    display: flex;
    flex-direction: column;
`;

export const TitleWrapper = styled(Section)`
    height: 48px;
`;

export const TitleSpan = styled(Span)`
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    color: ${blue};
`;

export const HashtagsWrapper = styled(ContentWrapper)`
    box-sizing: border-box;
`;
