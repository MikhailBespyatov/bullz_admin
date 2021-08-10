import axios from './axios';

export const getValidationState = (data: YEAY.GetValidationStateRequest) =>
    axios<YEAY.ValidationStateResponse>({
        url: '/wom/get-validation-state',
        data
    });
