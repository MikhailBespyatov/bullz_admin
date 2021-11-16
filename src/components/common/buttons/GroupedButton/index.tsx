import dotsIcon from 'assets/icons/three_dot_icon.svg';
import { absoluteWrapperLeft, absoluteWrapperMarginTop } from 'components/common/buttons/GroupedButton/constants';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { useCloseClick } from 'hooks/closeClick';
import { useRefWidthAndHeight } from 'hooks/getRefProperty';
import { useModal } from 'hooks/modal';
import React, { ButtonHTMLAttributes, FC, useRef } from 'react';
import { Color } from 'types/styles';
import { GroupedButtonsWrapper, ItemGroupedButton, ItemStyledButton, StyledButton } from './styles';

interface GroupedButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>, Color {}

export const GroupedButton: FC<GroupedButtonProps> = ({ onClick, children, color }) => (
    <ItemGroupedButton>
        <ItemStyledButton color={color} width="100%" onClick={onClick}>
            {children}
        </ItemStyledButton>
    </ItemGroupedButton>
);

interface GroupedButtonsProps {}

export const GroupedButtons: FC<GroupedButtonsProps> = ({ children }) => {
    const { visible, open, close } = useModal();
    const componentRef = useRef<HTMLDivElement>(null);
    const [, componentHeight] = useRefWidthAndHeight(componentRef);

    const absoluteWrapperTop = componentHeight + parseInt(absoluteWrapperMarginTop) + 'px';

    useCloseClick(componentRef, close);

    return (
        <RelativeWrapper ref={componentRef}>
            <StyledButton width="fit-content" onClick={visible ? close : open}>
                <CustomImg alt="three dot icon" height="18px" src={dotsIcon} />
            </StyledButton>
            <GroupedButtonsWrapper left={absoluteWrapperLeft} top={absoluteWrapperTop} visible={visible}>
                {children}
            </GroupedButtonsWrapper>
        </RelativeWrapper>
    );
};
