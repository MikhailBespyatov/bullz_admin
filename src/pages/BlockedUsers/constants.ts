import { grey12 } from 'constants/styles/colors';

export const defaultMessage = 'Search for Blocked Users by email address, username or by mobile number';
export const emptyStateImageWrapperDiameter = '96px';
export const searchInputPadding = '5px 16px';
export const selectPadding = '6px 20px';
export const searchInputBorder = `2px solid ${grey12}`;

export const columns = [
    { title: 'User ID' },
    { title: 'Email Address' },
    { title: 'Phone Number', field: 'mobileNumber', isSorted: true },
    { title: 'Deleted By', field: 'deleterName', isSorted: true },
    { title: 'Comment' },
    { title: 'Reason' }
];
export const columnSizes = ['191px', '189px', '191px', '191px', '256px', 'fit-content'];
export const tableDataFontSize = '13px';
export const tableDataLineHeight = '15px';
