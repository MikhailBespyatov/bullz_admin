import { Radio } from 'antd';
import { radioStyle } from 'components/common/inputs/CircleRadio/constants';
import React from 'react';

// * on future...
export const CircleRadio = () => (
    <Radio.Group>
        <Radio style={radioStyle} value={1}>
            Option A
        </Radio>
        <Radio style={radioStyle} value={2}>
            Option B
        </Radio>
        <Radio style={radioStyle} value={3}>
            Option C
        </Radio>
    </Radio.Group>
);
