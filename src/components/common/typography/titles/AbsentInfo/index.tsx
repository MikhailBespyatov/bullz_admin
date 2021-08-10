import { Typography } from 'antd';
import React, { FC } from 'react';

const { Text } = Typography;

export const AbsentInfo: FC = ({ children }) => <Text disabled>{children}</Text>;
