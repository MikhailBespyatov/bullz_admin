import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const useQueryParams = <T extends {}>(callback: (queryParams: T) => void): [T, (params: T) => void] => {
    const location = useLocation();
    const history = useHistory();

    const [queryParams, setQueryParams] = useState<T>(
        (queryString.parse(location.search, {
            arrayFormat: 'index',
            parseNumbers: true,
            parseBooleans: true
        }) as unknown) as T
    );

    const setURLQueryParams = (params: T) => {
        history.push({ search: queryString.stringify(params, { skipNull: true, arrayFormat: 'index' }) });
        setQueryParams(params);
    };

    useEffect(() => {
        callback(queryParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [queryParams, setURLQueryParams];
};
