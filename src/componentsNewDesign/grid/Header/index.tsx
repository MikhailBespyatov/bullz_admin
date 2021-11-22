import history from 'browserHistory';
import { GroupedButton, GroupedButtons } from 'components/common/buttons/GroupedButton';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import {
    createTopicLink,
    createTopicLinkName,
    createUserLink,
    createUserLinkName,
    deleteUserLink,
    deleteUserLinkName
} from 'constants/routes';
import { appVersion, environmentBASY } from 'constants/services';
import { errorColor } from 'constants/styles/colors';
import React from 'react';
import { HeaderWrapper, VersionSpan } from './styles';

export const Header = () => {
    const handleCreateUser = () => history.push(createUserLink);
    const handleDeleteUser = () => history.push(deleteUserLink);
    const handleCreateProduct = () => history.push(createTopicLink);

    return (
        <HeaderWrapper>
            <Row alignCenter>
                <VersionSpan>
                    {appVersion} BASY: {environmentBASY}
                    {/*{appVersion} BULLZ: {environmentBULLZ}*/}
                </VersionSpan>
                <AdministratorLayout>
                    <Row marginRight="20px">
                        <GroupedButtons>
                            <GroupedButton onClick={handleCreateProduct}>{createTopicLinkName}</GroupedButton>
                            <GroupedButton onClick={handleCreateUser}>{createUserLinkName}</GroupedButton>
                            <GroupedButton color={errorColor} onClick={handleDeleteUser}>
                                {deleteUserLinkName}
                            </GroupedButton>
                        </GroupedButtons>
                    </Row>
                </AdministratorLayout>
            </Row>
        </HeaderWrapper>
    );
};
