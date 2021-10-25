import { copyButtonDiameter } from 'componentsNewDesign/common/buttons/CopyButton/constants';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { blue } from 'constants/styles/colors';
import { buttonEffectMixin } from 'constants/styles/mixins';
import styled, { css } from 'styled-components';
import { Sizes } from 'types/styles';

interface ButtonImgProps extends Sizes {
    disabled?: boolean;
}

export const ButtonImg = styled(CustomImg)<ButtonImgProps>`
    height: ${({ height }) => height || copyButtonDiameter};
    width: ${({ width }) => width || copyButtonDiameter};

    ${({ disabled }) => disabled && 'opacity: 0.4'};

    ${({ disabled }) =>
        !disabled
            ? buttonEffectMixin
            : css`
                  cursor: not-allowed;
              `};
`;

export const HoveredButtonImg = styled(ClickableWrapper)<ButtonImgProps>`
    height: ${({ height }) => height || copyButtonDiameter};
    width: ${({ width }) => width || copyButtonDiameter};

    ${({ disabled }) => disabled && 'opacity: 0.4'};

    &:hover svg path {
        stroke: ${blue};
    }
`;

export const Button = styled(SimpleButton)`
    ${({ disabled }) => disabled && 'opacity: 0.4'};

    ${({ disabled }) =>
        !disabled
            ? buttonEffectMixin
            : css`
                  cursor: not-allowed;
              `};
`;
