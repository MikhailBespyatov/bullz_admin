import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { commentsLink, error403Link, topicsLink, teamsLink, usersLink } from 'constants/routes';
import { baseURL, baseWomURL } from 'constants/services';
import { productsEvents } from 'stores/products/products';
import { teamsEvents } from 'stores/team';
import { userEvents, userStores } from 'stores/users/user';
import { usersEvents } from 'stores/users/users';
import { videosEvents } from 'stores/videos/videos';
import history from '../browserHistory';
import { commentsEvents } from '../stores/comments/comments';

const yeayAxiosInstance = axios.create();

yeayAxiosInstance.defaults.baseURL = baseURL;
yeayAxiosInstance.defaults.method = 'POST';
yeayAxiosInstance.interceptors.response.use(
    config => config.data,
    config => {
        const status = config.response.status;
        // console.log('CONFIG', config);
        // console.log('response', config.response);
        // console.log('BOOLEAN', config.response.request.responseURL.indexOf(baseWomURL) === -1);
        if (status === 403 && config.response.request.responseURL.indexOf(baseWomURL) === -1)
            history.push(error403Link);
        else if (status === 401) {
            switch (window.location.pathname) {
                case usersLink:
                    usersEvents.setIsFirstToTrue();
                    break;
                case topicsLink:
                    productsEvents.setIsFirstToTrue();
                    break;
                case teamsLink:
                    teamsEvents.setIsFirstToTrue();
                    break;
                case commentsLink:
                    commentsEvents.setIsFirstToTrue();
                    break;
                default:
                    videosEvents.setIsFirstToTrue();
            }
            userEvents.logout();
        }

        return Promise.reject(config.response);
    }
);

export default <T = void>(config: AxiosRequestConfig, withToken = true) => {
    const request: AxiosPromise<T> = yeayAxiosInstance({
        ...config,
        headers: withToken
            ? {
                  Authorization: `Bearer ${userStores.user.getState().token}`
              }
            : {}
    });

    return (request as any) as Promise<T>;
};
