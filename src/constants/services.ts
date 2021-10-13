export const baseURL = process.env.REACT_APP_BASY_API_URL as string;
export const appVersion = process.env.REACT_APP_VERSION as string;
export const nameProject = 'BASY';

export const baseWomURL = process.env.REACT_APP_WOM_API_URL as string;

export const environmentBASY = process.env.REACT_APP_BASY_API_URL === 'https://bullz-dev.bullz.io/' ? 'DEV' : 'PROD';
export const environmentWOM = process.env.REACT_APP_WOM_API_URL === 'https://wom-dev.xc.io/' ? 'DEV' : 'PROD';

export const getRedirectUrlToWom = (id: string) =>
    environmentBASY !== 'DEV'
        ? `https://myobfoad.womprotocol.io/users?limit=10&pageIndex=0&userName=${id}`
        : `https://wom.wasy.dev.incodewetrust.online/users/${id}`;
