import { Modal as AntModal } from 'antd';
import React, { FC } from 'react';
import { StrictTitle } from 'types/data';
import { Visibility } from 'types/styles';
import { noop } from 'types/types';

interface Props extends StrictTitle, Visibility {
    setVisible: (state: boolean) => boolean;
    okHandler: noop;
}

export const Modal: FC<Props> = ({ title, visible, setVisible, children, okHandler }) => {
    const handleClose = () => setVisible(false);

    return (
        <AntModal title={title} visible={visible} onCancel={handleClose} onOk={okHandler}>
            {children}
        </AntModal>
    );
};
