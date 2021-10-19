import axios from './axios';

export const createAccountAnonymous = (data: BULLZ.UserCreateAnonymousAccountRequest) =>
    axios<BULLZ.UserJwtTokenResponse>(
        {
            url: '/user/create-account-anonymous',
            data
        },
        false
    );

export const authenticateUser = (data: BULLZ.UserAuthChallengeEmailOrUsernameOrPhoneRequest) =>
    axios<BULLZ.UserAuthorizeResponse>(
        {
            url: '/user/authenticate',
            data
        },
        false
    );

export const createUser = (data: BULLZ.UserCreateAccountRequest) =>
    axios<BULLZ.UserJwtTokenResponse>({
        url: '/user/create-account',
        data
    });
