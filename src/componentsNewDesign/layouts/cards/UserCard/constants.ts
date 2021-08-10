import { calculateBlockWidth } from 'utils/calculators';

// export const userNicknameFontSize = '12px';
// export const userNicknameFontWeight = '700';
export const propertyBlockHalfWidth = calculateBlockWidth(2, 16);
export const propertyBlockFullWidth = '100%';
export const propertyBlockMarginBottom = '10px'; /* 20px; */

export const cardButtonWidth = calculateBlockWidth(2, 16);

export const copyUserIdMessage = 'User id copied!';
export const copyEmailMessage = 'Email copied!';
export const copyPhoneMessage = 'Phone copied!';
export const copyUsernameMessage = 'Username copied!';
export const copyFacilitatorIdMessage = 'Facilitator id copied!';

export const descAbsentMessage = 'No description';
export const rolesAbsentMessage = 'No roles';

export const assignRoleTitle = 'Assign role to user';
export const assignRoleItems = ['Administrator', 'Curator'];

export const removeRoleTitle = 'Remove Role';
export const assigningTitle = 'Assign Role';
export const disableTitle = 'disabling or activating a user';
export const verifyTitle = 'Verify the user';

export const parseVerifyTitle = (verified: boolean) => (verified ? 'Verify' : 'Unverify') + ' the user';

export const parseDisableTitle = (disabled: boolean) => (disabled ? 'Disable' : 'Activate') + ' the user';

export const parseAssignRoleDescription: (username: string, role: string) => string = (username, role) =>
    `Are you sure you want to assign a role ${role ? role : 'unknown'} to user ${username ? username : 'anonymous'}?`;

export const parseRemoveRoleDescription: (username: string, role: string) => string = (username, role) =>
    `Are you sure you want to remove a role ${role ? role : 'unknown'} from user ${username ? username : 'anonymous'}?`;

export const parseDisableDescription = (disabled: boolean, name: string) =>
    'Are you sure you want to ' + (disabled ? 'disable' : 'activate') + ' a user ' + name + '?';

export const parseVerifyDescription = (verified: boolean, name: string) =>
    'Are you sure you want to ' + (verified ? 'verify' : 'unverify') + ' a user ' + name + '?';

export const parseAssignSuccessMessage = (role: string, name: string) =>
    'A role ' + role + ' was successfully assigned to a user ' + name;

export const parseRemoveRoleSuccessMessage = (role: string, name: string) =>
    'A role ' + role + ' was successfully removed from a user ' + name;

export const parseDisableSuccessMessage = (disabled: boolean, name: string) =>
    'A user ' + name + ' has been successfully ' + (disabled ? 'disabled' : 'activated');

export const parseVerifySuccessMessage = (verified: boolean, name: string) =>
    'A user ' + name + ' has been successfully ' + (verified ? 'verified' : 'unverified');

// export const errorImageDiameter = '20px';
// export const localMargin = '5px';
// export const localWidth = '48px';
// export const DataCellSpanFontSize = '12px';
// export const DataCellSpanLineHeight = '14px';
