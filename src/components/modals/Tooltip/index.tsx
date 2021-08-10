import { Tooltip as AntTooltip } from 'antd';
import React, { FC } from 'react';
import { TooltipProps } from 'antd/lib/tooltip';

export const Tooltip: FC<TooltipProps> = ({ children, title }) => <AntTooltip title={title}>{children}</AntTooltip>;
