import axios from './axios';

export const getValidationState = (data: BULLZ.GetValidationStateRequest) =>
    axios<BULLZ.ValidationStateResponse>({
        url: '/wom/get-validation-state',
        data
    });
