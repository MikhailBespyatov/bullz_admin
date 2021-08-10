import { Popover as AntPopover } from 'antd';
import { PopoverProps } from 'antd/lib/popover';
import { MenuItem, PopoverMenu } from 'components/modals/Popover/styles';
import React, { FC, useState } from 'react';

interface Props extends PopoverProps {
    setSubject: (subject: string) => void;
    subjects: string[];
}

export const Popover: FC<Props> = ({ title, setSubject, subjects, children, trigger = 'click' }) => {
    const [visible, setVisible] = useState(false);

    const hide = (subject: string) => {
        setVisible(false);
        setSubject(subject);
    };

    const handleVisibleChange = (visible: boolean) => setVisible(visible);

    return (
        <AntPopover
            content={
                subjects?.length && (
                    <PopoverMenu>
                        {subjects.map((i: string) => (
                            <MenuItem key={i} onClick={() => hide(i)}>
                                {i}
                            </MenuItem>
                        ))}
                    </PopoverMenu>
                )
            }
            title={title}
            trigger={trigger}
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            {children}
        </AntPopover>
    );
};
