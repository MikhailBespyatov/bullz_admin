import { message } from 'antd';
import { Button } from 'components/common/buttons/Button';
import { copyButtonType } from 'constants/styles/others';
import React, { FC } from 'react';
import { RemoveMarginRightBottom } from 'types/styles';
import { triggerCopy } from 'utils/usefulFunctions';

interface Props extends RemoveMarginRightBottom {
    subject?: string | null;
    success: string;
    grow?: boolean;
}

export const CopyButton: FC<Props> = ({ subject, success, grow, children, ...removeMarginRightBottom }) => {
    const triggerButtonCopy = () => {
        if (subject) {
            triggerCopy(subject);
            message.success(success);
        }
    };

    return (
        <Button
            disabled={!subject}
            grow={grow}
            type={copyButtonType}
            {...removeMarginRightBottom}
            onClick={triggerButtonCopy}
        >
            {children}
        </Button>
    );
};
