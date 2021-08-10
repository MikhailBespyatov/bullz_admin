export const title = 'Create user page';

export const formName = 'basic';

export const loginLabel = 'Username';
export const loginName = 'username';
export const nameMessage = 'Please input a name!';
export const emailLabel = 'Email';
export const emailName = 'email';
export const emailMessage = 'Please input an email!';
export const emailErrorMessage = 'Please input correct email!';
export const passwordLabel = 'Password';
export const passwordName = 'password';
export const passwordMessage = 'Please input a password!';

export const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: '${label} is required!',
    types: {
        // eslint-disable-next-line no-template-curly-in-string
        email: '${label} is not valid ' + emailName + '!'
    }
};
