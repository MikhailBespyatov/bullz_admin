import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import history from 'browserHistory';
import { UserImg } from 'components/common/imgComponents/UserImg';
import { Section } from 'components/grid/Section';
import { Tooltip } from 'components/modals/Tooltip';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { Roles } from 'constants/defaults/users';
import { usersLink } from 'constants/routes';
import { antdTrendingCardStyle, padding } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { userStores } from 'stores/users/user';
import { RemoveClick } from 'types/modals';

const { Meta } = Card;

interface Props extends YEAY.GetTrendingUserResponse, RemoveClick {}

export const TrendingUserCard = ({ profileImageUrl, userId, isTrusted, username, onRemove }: Props) => {
    const { access } = useStore(userStores.auth);

    const moreInfoHandleClick = () => history.push(usersLink + '/' + userId);

    // console.log('profileImageUrl', profileImageUrl);

    return (
        <Card
            hoverable
            actions={
                access < Roles.ContentManager
                    ? [
                          <Tooltip key="ellipsis" title="More info">
                              <EllipsisOutlined key="ellipsis" onClick={moreInfoHandleClick} />
                          </Tooltip>,
                          <Tooltip key="setting" title="Delete this user">
                              <DeleteOutlined onClick={onRemove} />
                          </Tooltip>
                      ]
                    : [<EllipsisOutlined key="ellipsis" onClick={moreInfoHandleClick} />]
            }
            cover={
                <Section alignCenter justifyCenter removeMarginBottom removeMarginRight>
                    <MarginWrapper marginTop={padding}>
                        <UserImg isTrusted={isTrusted} src={profileImageUrl || ''} />
                    </MarginWrapper>
                </Section>
            }
            style={{ ...antdTrendingCardStyle, height: undefined, cursor: 'inherit' }}
        >
            {/* <Meta avatar={<UserImg isTrusted={isTrusted} src={profileImageUrl || ''} />} /> */}
            <Meta title={username} />
            {/* <RelativeWrapper height={relativeWrapperHeight} /> */}
        </Card>
    );
};
