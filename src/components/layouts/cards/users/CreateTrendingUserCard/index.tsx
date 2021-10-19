import { PlusOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Loader } from 'components/common/dynamic/Loader';
import { UserImg } from 'components/common/imgComponents/UserImg';
import { Title } from 'components/common/typography/titles/Title';
import { Section } from 'components/grid/Section';
import { Tooltip } from 'components/modals/Tooltip';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { antdCardWidth, antdTrendingCardStyle, padding } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { trendingsEffects, trendingsStores } from 'stores/trendings';

// const { Meta } = Card;

interface Props extends BULLZ.AdminGetUserCommon {}

export const CreateTrendingUserCard = ({ profileImageUrl, username, id, isTrusted }: Props) => {
    const loading = useStore(trendingsStores.createLoading);

    const selectHandleClick = () => trendingsEffects.createItem({ userId: id });

    return (
        <Card
            hoverable
            actions={[
                loading ? (
                    <Loader size="small" />
                ) : (
                    <Tooltip key="select" title="Create this user as trending">
                        <PlusOutlined onClick={selectHandleClick} />
                    </Tooltip>
                )
            ]}
            cover={
                <Section alignCenter justifyCenter removeMarginBottom removeMarginRight>
                    <MarginWrapper marginTop={padding}>
                        <UserImg isTrusted={isTrusted} src={profileImageUrl || ''} />
                    </MarginWrapper>
                </Section>
            }
            style={{ ...antdTrendingCardStyle, height: undefined, width: antdCardWidth }}
        >
            {/* <Meta avatar={<UserImg isTrusted={isTrusted} src={profileImageUrl} />} title={username} /> */}
            {/* <Meta title={username} /> */}
            <Section justifyCenter removeMarginRight>
                <Title>{username}</Title>
            </Section>
            {/* <RelativeWrapper height={relativeWrapperHeight} /> */}
        </Card>
    );
};
