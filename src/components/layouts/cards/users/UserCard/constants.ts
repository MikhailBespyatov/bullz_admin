export const copyIdMessage = 'Video id copied!';
export const copyFacilitatorIdMessage = 'Facilitator id copied!';
export const copyUsernameMessage = 'Username copied!';

export const descAbsentMessage = 'No description';
export const rolesAbsentMessage = 'No roles';

export const assignRoleTitle = 'Assign role to a user';
export const assignRoleItems = ['Administrator', 'Curator'];

export const removeRoleTitle = 'Remove role from a user';
export const assigningTitle = 'assigning a new role to user';
export const disableTitle = 'disabling or activating a user';
export const verifyTitle = 'verify or unverify a user';

export const parseAssignRoleDescription: (username: string, role: string) => string = (username, role) =>
    `Do you want to assign a user ${username || 'anonymous'} a role ${role || 'unknown'}?`;

export const parseRemoveRoleDescription: (username: string, role: string) => string = (username, role) =>
    `Do you want to remove a role ${role || 'unknown'} from a user ${username || 'anonymous'}?`;

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

export const errorImageDiameter = '20px';
export const localMargin = '5px';
export const localWidth = '48px';
export const DataCellSpanFontSize = '12px';
export const DataCellSpanLineHeight = '14px';
