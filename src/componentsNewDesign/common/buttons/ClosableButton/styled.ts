import { closableButtonDiameter } from 'componentsNewDesign/common/buttons/ClosableButton/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { buttonEffectMixin } from 'constants/styles/mixins';
import styled from 'styled-components';

export const ClosableButtonImg = styled(CustomImg)`
    ${buttonEffectMixin};
    height: ${closableButtonDiameter};
    width: ${closableButtonDiameter};
`;
