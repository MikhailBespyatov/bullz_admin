import { environmentBASY } from 'constants/services';

export const primaryMargin = '16px';
export const inProcessModal = {
    title: 'Processing...',
    content: 'Please don’t close this window'
};
export const successModal = {
    title: 'Wait is over',
    content: 'CSV file is ready to download',
    buttonText: 'Download'
};

export const basyUrlToUser =
    environmentBASY === 'DEV'
        ? 'https://bullz.admin.dev.incodewetrust.online/users/'
        : 'https://bnasatap.bullz.com/users/';
