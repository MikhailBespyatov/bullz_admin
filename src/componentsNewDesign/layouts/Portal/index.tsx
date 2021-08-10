import { usePortal } from 'hooks/usePortal';
import { createPortal } from 'react-dom';
import { FC } from 'react';

export const Portal: FC = ({ children }) => {
    const target = usePortal('portal-root');
    return createPortal(children, target);
};
