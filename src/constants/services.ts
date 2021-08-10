export const baseURL = process.env.REACT_APP_YEAY_API_URL as string;
export const appVersion = process.env.REACT_APP_VERSION as string;
export const nameProject = 'YEAY';

export const baseWomURL = process.env.REACT_APP_WOM_API_URL as string;

export const environmentYEAY = process.env.REACT_APP_YEAY_API_URL === 'https://yeay-dev.xc.io/' ? 'DEV' : 'PROD';
export const environmentWOM = process.env.REACT_APP_WOM_API_URL === 'https://wom-dev.xc.io/' ? 'DEV' : 'PROD';
