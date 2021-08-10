import { ClosableButton } from 'componentsNewDesign/common/buttons/ClosableButton';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { noop } from 'constants/functions';
import React from 'react';
import { Disabled } from 'types/form';
import { MarginRightBottom } from 'types/styles';
import { ClosableTagSpan, ClosableTagWrapper } from './styled';

export interface ClosableTagProps extends Disabled, MarginRightBottom {
    subject: string;
    onClose?: (subject: string) => void;
    text?: string;
    untouchable?: boolean;
}

export const ClosableTag = ({ subject, text = subject, onClose = noop, untouchable, ...props }: ClosableTagProps) => (
    <ClosableTagWrapper {...props}>
        <Row alignCenter noWrap marginBottom="0">
            {!untouchable && (
                <MarginWrapper marginRight="10px">
                    <ClosableButton onClick={() => onClose(subject)} />
                </MarginWrapper>
            )}
            <ClosableTagSpan>{text}</ClosableTagSpan>
        </Row>
    </ClosableTagWrapper>
);
