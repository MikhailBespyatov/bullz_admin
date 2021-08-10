import { Tag } from 'antd';
import React, { FC } from 'react';
import { Closable } from 'types/data';
import { Color } from 'types/styles';

interface Props extends Closable, Color {
    role: string;
    onRemove: (role: string) => void;
}

// TODO: [any]
export const ClosableTag: FC<Props> = ({ onRemove, children, closable, role, color }) => {
    const onClose = (e: any) => {
        e.preventDefault();

        onRemove(role);
    };

    return (
        <Tag closable={closable} color={color} onClose={onClose}>
            {children}
        </Tag>
    );
};

export const DraggableClosableTag: FC<Props> = ({ onRemove, children, closable, role, color }) => {
    const onClose = (e: any) => {
        e.preventDefault();

        onRemove(role);
    };

    return (
        <div draggable="true">
            <Tag closable={closable} color={color} onClose={onClose}>
                {children}
            </Tag>
        </div>
    );
};
