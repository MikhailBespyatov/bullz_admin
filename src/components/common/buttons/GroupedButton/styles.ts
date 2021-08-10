import { buttonBorderRadius, buttonWidth, styledButtonWidth } from 'components/common/buttons/GroupedButton/constants';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { black } from 'constants/styles/colors';
import { buttonEffectMixin, disableDefaultButtonStyleMixin } from 'constants/styles/mixins';
import styled from 'styled-components';
import { Color, Sizes, Visibility } from 'types/styles';

export const StyledButton = styled.button<Pick<Sizes, 'width'>>`
    ${disableDefaultButtonStyleMixin};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width || styledButtonWidth};
`;

export const ItemStyledButton = styled(StyledButton)<Color>`
    ${buttonEffectMixin};
    padding: 5px 10px;
    background-color: #f0f0f0;
    border-radius: ${buttonBorderRadius};
    color: ${({ color }) => color || black};
    font-size: 11px;
`;

export const ItemGroupedButton = styled.div`
    width: 100%;
    border-radius: ${buttonBorderRadius};
`;

export const GroupedButtonsWrapper = styled(AbsoluteWrapper)<Visibility>`
    ${({ visible }) => !visible && 'visibility: hidden;'};
    background-color: #f0f0f0;
    width: ${buttonWidth};
    border-radius: ${buttonBorderRadius};
`;
