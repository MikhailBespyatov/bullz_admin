import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { Button } from 'components/common/buttons/Button';
import { Tooltip } from 'components/modals/Tooltip';
import { padding, xxl } from 'constants/styles/sizes';
import React, { FC } from 'react';
import { Grow, RemoveMarginRightBottom, Size } from 'types/styles';
import { ButtonWrapper, TooltipButtonWrapper, TooltipWrapper } from './styles';

interface Props extends ButtonProps, RemoveMarginRightBottom, Size, Grow {
    children: string;
}

export const AdaptiveTooltipButton: FC<Props> = ({ children, onClick, type = 'primary', sizes = xxl, ...props }) => (
    <TooltipWrapper>
        <ButtonWrapper sizes={sizes}>
            <Button {...props} type={type} onClick={onClick}>
                {children}
            </Button>
        </ButtonWrapper>
        <TooltipButtonWrapper sizes={sizes}>
            <Tooltip title={children}>
                <AntButton
                    icon={<ExclamationCircleOutlined />}
                    style={{
                        marginRight: padding,
                        marginBottom: padding
                    }}
                    type={type}
                    onClick={onClick}
                />
            </Tooltip>
        </TooltipButtonWrapper>
    </TooltipWrapper>
);
