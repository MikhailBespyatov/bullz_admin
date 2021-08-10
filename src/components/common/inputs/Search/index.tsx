import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

const AntSearch: FC<SearchProps> = props => {
    const { Search } = Input;

    return <Search {...props} />;
};

export const Search: FC<SearchProps> = ({
    placeholder = 'input search text',
    disabled = false,
    id,
    //onChange,
    onSearch,
    //value,
    allowClear = true,
    defaultValue = '',
    ...rest
}) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    useEffect(() => setValue(defaultValue), [defaultValue]);

    return (
        <AntSearch
            enterButton
            allowClear={allowClear}
            disabled={disabled}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onSearch={onSearch}
            {...rest}
        />
    );
};
