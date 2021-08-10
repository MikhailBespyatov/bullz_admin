import axios from './axios';

export const createAccountAnonymous = (data: YEAY.UserCreateAnonymousAccountRequest) =>
    axios<YEAY.UserJwtTokenResponse>(
        {
            url: '/user/create-account-anonymous',
            data
        },
        false
    );

export const authenticateUser = (data: YEAY.UserAuthChallengeEmailOrUsernameOrPhoneRequest) =>
    axios<YEAY.UserAuthorizeResponse>(
        {
            url: '/user/authenticate',
            data
        },
        false
    );

export const createUser = (data: YEAY.UserCreateAccountRequest) =>
    axios<YEAY.UserJwtTokenResponse>({
        url: '/user/create-account',
        data
    });
