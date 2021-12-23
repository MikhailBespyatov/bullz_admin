import copyIcon, { ReactComponent as CopyIcon } from 'assets/copy_icon.svg';
import greyCopyIcon from 'assets/grey_copy_icon.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultMongoDBId } from 'constants/defaults/formats';
import { grey23 } from 'constants/styles/colors';
import React, { FC } from 'react';
import { message } from 'stores/alerts';
import { Success } from 'types/data';
import { Disabled } from 'types/form';
import { triggerCopy } from 'utils/usefulFunctions';
import { Button, ButtonImg, HoveredButtonImg } from './styles';

export interface CopyButtonProps extends Success {
    subject?: string | null;
    customCopyIcon?: string;
    diameter?: string;
}

export const CopyButton = ({ subject, success, customCopyIcon, diameter }: CopyButtonProps) => {
    const disabled = subject === defaultMongoDBId || !subject;

    const triggerButtonCopy = () => {
        if (!disabled) {
            triggerCopy(subject || '');
            message.success(success);
        }
    };

    return (
        <ButtonImg
            pointer
            className={'copyButton'}
            disabled={disabled}
            height={diameter}
            src={customCopyIcon || copyIcon}
            width={diameter}
            onClick={triggerButtonCopy}
        />
    );
};

export const HoveredCopyButton = ({ subject, success, diameter }: CopyButtonProps) => {
    const disabled = subject === defaultMongoDBId || !subject;

    const triggerButtonCopy = () => {
        if (!disabled) {
            triggerCopy(subject || '');
            message.success(success);
        }
    };

    return (
        <HoveredButtonImg disabled={disabled} height={diameter} width={diameter} onClick={triggerButtonCopy}>
            <CopyIcon />
        </HoveredButtonImg>
    );
};

interface CopyTextButtonProps extends CopyButtonProps, Disabled {}

export const CopyTextButton: FC<CopyTextButtonProps> = ({
    subject,
    disabled,
    success,
    customCopyIcon,
    diameter,
    children
}) => {
    const disabledButton = subject === defaultMongoDBId || !subject || disabled;

    const triggerButtonCopy = () => {
        if (!disabled) {
            triggerCopy(subject || '');
            message.success(success);
        }
    };
    return (
        <Button background={grey23} disabled={disabledButton} padding="10px 14px 10px 12px" onClick={triggerButtonCopy}>
            <MarginWrapper marginRight="8px">
                <CustomImg height={diameter} src={customCopyIcon || greyCopyIcon} width={diameter} />
            </MarginWrapper>
            {children}
        </Button>
    );
};
