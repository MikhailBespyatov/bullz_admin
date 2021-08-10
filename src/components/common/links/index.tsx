import React, { FC } from 'react';

interface Props {
    target?: string;
    href: string;
}

export const ExternalLink: FC<Props> = ({ children, target = '_blank', href }) => (
    <a href={href} rel="noreferrer" target={target}>
        {children}
    </a>
);
