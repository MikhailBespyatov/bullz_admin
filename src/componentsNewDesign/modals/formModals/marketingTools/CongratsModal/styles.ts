import {
    modalBorderRadius,
    triangleHorizontalBorder
} from 'componentsNewDesign/modals/formModals/marketingTools/CongratsModal/constants';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey28, white } from 'constants/styles/colors';
import { flexCenter } from 'constants/styles/mixins';
import styled from 'styled-components';
import { Visibility } from 'types/styles';

export const Wrapper = styled.div<Visibility>`
    position: fixed;
    top: 0;
    left: 0;
    ${flexCenter};
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.612407);
    padding: 0 63px;
    padding-bottom: 10px;
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    z-index: 100;
    overflow: auto;
`;

export const Modal = styled(Column)`
    position: relative;
    align-items: center;
    width: 420px;
    min-height: 440px;
    border-radius: ${modalBorderRadius};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.0778245);
    background: ${grey28};
    margin: auto;
    z-index: 10;
`;

export const Triangle = styled.div`
    position: relative;
    top: 1px;
    margin-top: 200px;
    width: 0px;
    height: 0px;
    border-left: ${triangleHorizontalBorder};
    border-right: ${triangleHorizontalBorder};
    border-bottom: 50px solid white;
`;

export const ModalContentWrapper = styled(Column)`
    width: inherit;
    height: 200px;
    padding: 0px 20px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    background-color: ${white};
    border-radius: ${modalBorderRadius};
`;
