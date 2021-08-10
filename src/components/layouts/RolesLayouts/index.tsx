import React, { FC } from 'react';
import { AccessList } from 'types/data';
import { Roles } from 'constants/defaults/users';
import { useStore } from 'effector-react';
import { userStores } from 'stores/users/user';

interface RolesLayoutProps extends AccessList {}

export const RolesLayout: FC<RolesLayoutProps> = ({ children, accessList }) => {
    const { access } = useStore(userStores.auth);

    if (accessList.includes(access)) return <>{children}</>;
    else return null;
};

export const SuperAdministratorLayout: FC = ({ children }) => (
    <RolesLayout accessList={[Roles.SuperAdministrator]}>{children}</RolesLayout>
);

export const AdministratorLayout: FC = ({ children }) => (
    <RolesLayout accessList={[Roles.SuperAdministrator, Roles.Administrator]}>{children}</RolesLayout>
);

export const ManagerLayout: FC = ({ children }) => (
    <RolesLayout accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.ContentManager]}>
        {children}
    </RolesLayout>
);

export const CuratorLayout: FC = ({ children }) => <RolesLayout accessList={[Roles.Curator]}>{children}</RolesLayout>;

export const ContentManagerLayout: FC = ({ children }) => (
    <RolesLayout accessList={[Roles.ContentManager]}>{children}</RolesLayout>
);
