export const baseURL = process.env.REACT_APP_BASY_API_URL as string;
export const appVersion = process.env.REACT_APP_VERSION as string;
export const nameProject = 'BASY';

export const baseWomURL = process.env.REACT_APP_WOM_API_URL as string;

export const environmentBASY = process.env.REACT_APP_BASY_API_URL === 'https://bullz-dev.bullz.io/' ? 'DEV' : 'PROD';
