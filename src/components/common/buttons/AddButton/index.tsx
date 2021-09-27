import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import addIcon from 'assets/add_icon_white.svg';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { black } from 'constants/styles/colors';
import { padding } from 'constants/styles/sizes';
import React from 'react';
import { Grow, RemoveMarginRightBottom, Sizes } from 'types/styles';

interface Props extends ButtonProps, RemoveMarginRightBottom, Grow, Sizes {}

export const AddButton = ({ removeMarginRight, removeMarginBottom, grow, width, height, ...props }: Props) => (
    <Button
        style={{
            width: width || 100,
            height: height || 35,
            marginRight: removeMarginRight ? 0 : padding,
            marginBottom: removeMarginBottom ? 0 : padding,
            flexGrow: grow ? 1 : 'unset',
            backgroundColor: black,
            alignItems: 'center',
            justifyContent: 'center'
        }}
        {...props}
        type="dashed"
    >
        <AbsoluteWrapper left="50%" style={{ transform: 'translateX(-10px) translateY(-10px)' }} top="50%">
            <CustomImage alt="add video" height="20px" src={addIcon} width="20px" />
        </AbsoluteWrapper>
    </Button>
);
