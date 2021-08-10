import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import avatarImg from 'assets/avatar.svg';
import logoImg from 'assets/yeay_logo.svg';
import history from 'browserHistory';
import { Button } from 'components/common/buttons/Button';
import {
    avatarDiameter,
    copyIconDiameter,
    headerMarginRight,
    logoHeight,
    logoWidth
} from 'components/grid/Header/constants';
import {
    CopyWrapper,
    HeaderLayout,
    IconWrapper,
    InfoBlock,
    LogoutBlock,
    PopupWrapper
} from 'components/grid/Header/styles';
import { DesktopWrapper } from 'components/grid/wrappers/DesktopWrapper';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import {
    authLinkName,
    createProductLink,
    createProductLinkName,
    createUserLink,
    createUserLinkName
} from 'constants/routes';
import { white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { userEvents, userStores } from 'stores/users/user';
import { NoopClick } from 'types/global';
import { triggerCopy } from 'utils/usefulFunctions';
import { AdministratorLayout } from 'components/layouts/RolesLayouts';

interface Props extends NoopClick {}

const PopupCopyWrapper: FC<Props> = ({ children, onClick }) => (
    <CopyWrapper>
        <InfoBlock>{children}</InfoBlock>
        <PopupWrapper>
            <IconWrapper onClick={onClick}>
                <CopyOutlined style={{ fontSize: copyIconDiameter, color: white, cursor: 'pointer' }} />
            </IconWrapper>
        </PopupWrapper>
    </CopyWrapper>
);

export const Header = () => {
    const { user } = useStore(userStores.user);

    const avatar = user?.profile?.profileImageUrl;
    const username = user?.username;
    const email = user?.email;

    const triggerCopyUsername = () => {
        if (username) {
            triggerCopy(username);
            message.success('You successfully copied username');
        }
    };

    const triggerCopyEmail = () => {
        if (email) {
            triggerCopy(email);
            message.success('You successfully copied email');
        }
    };

    const logout = () => userEvents.logout();
    const handleCreateUser = () => history.push(createUserLink);
    const handleCreateProduct = () => history.push(createProductLink);
    //const handleCreateTeam = () => history.push(createTeamLink);

    return (
        <HeaderLayout className="header">
            <Column marginRight={headerMarginRight}>
                <CustomImg alt="logo" height={logoHeight} src={logoImg} width={logoWidth} />
            </Column>
            <DesktopWrapper>
                <CustomImg
                    alt="avatar"
                    height={avatarDiameter}
                    src={avatar ? avatar : avatarImg}
                    width={avatarDiameter}
                />
            </DesktopWrapper>
            {username && <PopupCopyWrapper onClick={triggerCopyUsername}>{username}</PopupCopyWrapper>}
            {email && (
                <PopupCopyWrapper onClick={triggerCopyEmail}>
                    <InfoBlock>{email}</InfoBlock>
                </PopupCopyWrapper>
            )}
            <AdministratorLayout>
                <InfoBlock>
                    <Button removeMarginBottom type="primary" onClick={handleCreateUser}>
                        {createUserLinkName}
                    </Button>
                </InfoBlock>
                {/*<InfoBlock>*/}
                {/*    <Button removeMarginBottom type="primary" onClick={handleCreateTeam}>*/}
                {/*        {createTeamLinkName}*/}
                {/*    </Button>*/}
                {/*</InfoBlock>*/}
            </AdministratorLayout>
            <InfoBlock>
                <Button removeMarginBottom type="primary" onClick={handleCreateProduct}>
                    {createProductLinkName}
                </Button>
            </InfoBlock>
            <LogoutBlock onClick={logout}>{authLinkName}</LogoutBlock>
        </HeaderLayout>
    );
};
