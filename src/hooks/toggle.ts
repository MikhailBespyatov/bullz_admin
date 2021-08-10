import { useCallback, useState } from 'react';
import { noop } from 'types/types';

export const useToggle = (initialState = false): [boolean, noop] => {
    const [state, setState] = useState(initialState);

    return [state, useCallback(() => setState(state => !state), [])];
};
