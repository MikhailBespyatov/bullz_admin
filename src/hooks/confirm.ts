import { useState } from 'react';

const initialConfirm = false;

// * confirm action (e.g. delete)
export const useConfirm = () => {
    const [isConfirmed, setState] = useState(initialConfirm);

    const confirm = () => setState(true);
    const cancel = () => setState(initialConfirm);

    return { isConfirmed, confirm, cancel };
};
