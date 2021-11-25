import { Span } from 'componentsNewDesign/common/typography/Span';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { blue, grey23, grey27, grey29, white } from 'constants/styles/colors';
import { absoluteCenterAlignmentMixin, ellipsisMixin } from 'constants/styles/mixins';
import styled from 'styled-components';
import { Active } from 'types/global';

export const ModalContentWrapper = styled(ContentWrapper)`
    ${absoluteCenterAlignmentMixin};
    position: fixed;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    width: 264px;
    z-index: ${sideBarZIndex + 2};
    background-color: ${grey29};
`;

export const TitleSpan = styled(Span)`
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    color: ${blue};
    width: 170px;
    ${ellipsisMixin};
`;
export const SubtitleSpan = styled(Span)`
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

export const ItemSpan = styled(Span)`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    white-space: nowrap;
`;

export const StyledLabel = styled.label<Active>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 8px;
    border-radius: 2px;
    margin-bottom: 1px;
    ${({ active }) => active && `background-color: ${grey23}`};
    cursor: pointer;

    &:hover {
        background: ${grey27};
    }
`;

export const StyledTextArea = styled.textarea`
    width: 100%;
    height: 70px;
    padding: 5px;
    margin: 10px 0 15px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    color: ${white};
    border-radius: 4px;
    border: 1px solid ${white};
    background-color: transparent;
    resize: none;

    ::placeholder {
        color: #7c7c7c;
    }
`;

export const ConfirmationSpan = styled(Span)`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: ${white};
`;
