import { Tag as AntTag } from 'antd';
import React, { FC } from 'react';

export const Tag: FC = ({ children }) => <AntTag color="green">{children}</AntTag>;
