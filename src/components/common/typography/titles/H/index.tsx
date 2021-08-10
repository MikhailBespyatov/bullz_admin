import { Typography } from 'antd';
import React, { FC } from 'react';

const { Title } = Typography;

export const H1: FC = ({ children }) => <Title>{children}</Title>;

export const H2: FC = ({ children }) => <Title level={2}>{children}</Title>;

export * from './styles';
