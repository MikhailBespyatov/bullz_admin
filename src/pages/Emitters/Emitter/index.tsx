import backArrowImg from 'assets/back_arrow.svg';
import history from 'browserHistory';
import { Loader } from 'components/common/dynamic/Loader';
import { CopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { TrustedIcon } from 'componentsNewDesign/common/icons/TrustedIcon';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { BlockTitle } from 'componentsNewDesign/layouts/blocks/PropertyBlock/styles';
import { UserCard } from 'componentsNewDesign/layouts/cards/UserCard';
import { copyUserIdMessage } from 'componentsNewDesign/layouts/cards/UserCard/constants';
import { VideoCard } from 'componentsNewDesign/layouts/cards/VideoCard';
import { successMessageColor } from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import { backImgDiameter } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription/constants';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { AsyncDeleteEmitterModal } from 'componentsNewDesign/modals/AsyncDeleteEmitterModal';
import { Tooltip } from 'componentsNewDesign/modals/Tooltip';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Flex, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { errorColor, grey24, grey29, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { TableDataSpan } from 'pages/DeletedUsers/styles';
import React, { useEffect } from 'react';
import { emittersEffects, emittersStores } from 'stores/emitters/emitters';
import { deleteEmitterModal } from 'stores/initialize/initialize.modal.store';
import { usersEffects, usersStores } from 'stores/users/users';
import { videosEffects, videosStores } from 'stores/videos/videos';
import { formatDateISOString } from 'utils/usefulFunctions';
import {
    copyEmitIdMessage,
    copyVideoIdMessage,
    emitterMarginRight,
    emitterPrimaryMargin,
    emitterSinglePadding
} from './constants';

export const Emitter = () => {
    const emitterIdArr = history.location.pathname.split('/');
    const emitterId = emitterIdArr[emitterIdArr.length - 1];
    const emitter = useStore(emittersStores.emitterInfo);
    const user = useStore(usersStores.users);
    const video = useStore(videosStores.videos);

    const {
        id: emitId,
        isPast,
        videoId,
        userId,
        utcCreated,
        utcEmitStart,
        utcEmitEnd,
        isActive,
        viewsTotalTarget,
        viewsEmitted,
        viewsProgress,
        likesTotalTarget,
        likesEmitted,
        likesProgress,
        sharesTotalTarget,
        sharesEmitted,
        sharesProgress,
        user: userInfo
    }: any = emitter;
    const loading = useStore(emittersStores.loading);

    useEffect(() => {
        emittersEffects.loadItemById(emitterId);
    }, [emitterId]);

    useEffect(() => {
        userId && usersEffects.loadItemById(userId);
    }, [userId]);

    useEffect(() => {
        videoId && videosEffects.loadItemById(videoId);
    }, [videoId]);

    const onBack = () => history.goBack();

    return (
        <SingleMainLayout>
            <AsyncDeleteEmitterModal />
            <Section marginRight={emitterMarginRight}>
                <ContentWrapper
                    backgroundColor={grey29}
                    marginBottom={emitterPrimaryMargin}
                    padding={emitterSinglePadding}
                    width="100%"
                >
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <>
                            <Section alignCenter justifyBetween marginBottom="28px">
                                <Flex alignCenter>
                                    <MarginWrapper marginRight="24px">
                                        <CustomImg
                                            pointer
                                            height={backImgDiameter}
                                            src={backArrowImg}
                                            width={backImgDiameter}
                                            onClick={onBack}
                                        />
                                    </MarginWrapper>
                                    <Span color={white} fontSize="18px" fontWeight="600" lineHeight="21px">
                                        Emitter Info
                                    </Span>
                                    <MarginWrapper marginLeft="12px">
                                        <ContentText color="#999999">
                                            {`${new Date(utcEmitStart).toLocaleDateString('en-us', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })} - ${new Date(utcEmitEnd).toLocaleDateString('en-us', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}`}
                                        </ContentText>
                                    </MarginWrapper>
                                    <Row alignCenter justifyEnd /*maxWidth="212px"*/ width="50px">
                                        <ContentText uppercase color={isPast ? errorColor : successMessageColor}>
                                            {isPast && 'Past'}
                                            {isActive && 'Active'}
                                        </ContentText>
                                    </Row>
                                </Flex>
                                <Flex>
                                    {/* <SimpleButton
                                        background={grey23}
                                        backgroundHover={grey24}
                                        color={grey7}
                                        disabled={isPast ? true : false}
                                        height="45px"
                                        marginRight="8px"
                                        width="100px"
                                        onClick={() => history.push(`${emittersLink}/update_emitter/${emitterId}`)}
                                    >
                                        Edit
                                    </SimpleButton> */}
                                    <SimpleButton
                                        background={errorColor}
                                        backgroundHover={grey24}
                                        color={white}
                                        height="45px"
                                        width="100px"
                                        onClick={() => deleteEmitterModal.openModal({ emitterId })}
                                    >
                                        Delete
                                    </SimpleButton>
                                </Flex>
                            </Section>

                            <Section justifyBetween marginBottom="17px">
                                <ContentWrapper marginBottom="20px">
                                    <ContentWrapper marginBottom="10px">
                                        <BlockTitle>Video ID</BlockTitle>
                                    </ContentWrapper>
                                    <Row>
                                        <TableDataSpan>{videoId}</TableDataSpan>
                                        <MarginWrapper marginLeft="8px">
                                            <CopyButton subject={videoId} success={copyVideoIdMessage} />
                                        </MarginWrapper>
                                    </Row>
                                </ContentWrapper>

                                <ContentWrapper marginBottom="20px" minWidth="105px" width="105px">
                                    <ContentWrapper marginBottom="10px">
                                        <BlockTitle>Username</BlockTitle>
                                    </ContentWrapper>
                                    <Row>
                                        <TableDataSpan>{userInfo?.userName}</TableDataSpan>
                                        {userInfo?.isTrusted && (
                                            <MarginWrapper marginLeft="8px">
                                                <Tooltip title="Account is trusted">
                                                    <TrustedIcon />
                                                </Tooltip>
                                            </MarginWrapper>
                                        )}
                                    </Row>
                                </ContentWrapper>

                                <ContentWrapper marginBottom="20px">
                                    <ContentWrapper marginBottom="10px">
                                        <BlockTitle>User ID</BlockTitle>
                                    </ContentWrapper>
                                    <Row>
                                        <TableDataSpan>{userId}</TableDataSpan>
                                        <MarginWrapper marginLeft="8px">
                                            <CopyButton subject={userId} success={copyUserIdMessage} />
                                        </MarginWrapper>
                                    </Row>
                                </ContentWrapper>

                                <ContentWrapper marginBottom="20px">
                                    <ContentWrapper marginBottom="10px">
                                        <BlockTitle>Emit ID</BlockTitle>
                                    </ContentWrapper>
                                    <Row>
                                        <TableDataSpan>{emitId}</TableDataSpan>
                                        <MarginWrapper marginLeft="8px">
                                            <CopyButton subject={emitId} success={copyEmitIdMessage} />
                                        </MarginWrapper>
                                    </Row>
                                </ContentWrapper>

                                <ContentWrapper marginBottom="20px" minWidth="85px" width="85px">
                                    <ContentWrapper marginBottom="10px">
                                        <BlockTitle>Date Created</BlockTitle>
                                    </ContentWrapper>
                                    <Row>
                                        <TableDataSpan>{formatDateISOString(utcCreated)}</TableDataSpan>
                                    </Row>
                                </ContentWrapper>

                                {/* <ContentWrapper marginBottom="20px" minWidth="85px" width="85px">
                                    <ContentWrapper marginBottom="10px">
                                        <BlockTitle>Date Updated</BlockTitle>
                                    </ContentWrapper>
                                    <Row>
                                        <TableDataSpan>
                                            {utcUpdated ? formatDateISOString(utcUpdated) : '-'}
                                        </TableDataSpan>
                                    </Row>
                                </ContentWrapper> */}

                                <Section justifyBetween>
                                    <ContentWrapper marginBottom="20px">
                                        <ContentWrapper marginBottom="10px">
                                            <BlockTitle>Total Views Emitted</BlockTitle>
                                        </ContentWrapper>
                                        <Section justifyBetween marginBottom="10px" marginRight="30px">
                                            <TableDataSpan>{viewsEmitted}</TableDataSpan>
                                            <TableDataSpan color="#919195">{viewsTotalTarget}</TableDataSpan>
                                        </Section>
                                        <ContentWrapper backgroundColor="black" height="4px" minWidth="290px">
                                            <ContentWrapper
                                                backgroundColor="white"
                                                height="4px"
                                                minWidth={`${viewsProgress * 100}%`}
                                                width={`${viewsProgress * 100}%`}
                                            ></ContentWrapper>
                                        </ContentWrapper>
                                    </ContentWrapper>

                                    <ContentWrapper marginBottom="20px">
                                        <ContentWrapper marginBottom="10px">
                                            <BlockTitle>Total Shares Emitted</BlockTitle>
                                        </ContentWrapper>
                                        <Section justifyBetween marginBottom="10px" marginRight="30px">
                                            <TableDataSpan>{sharesEmitted}</TableDataSpan>
                                            <TableDataSpan color="#919195">{sharesTotalTarget}</TableDataSpan>
                                        </Section>
                                        <ContentWrapper backgroundColor="black" height="4px" minWidth="290px">
                                            <ContentWrapper
                                                backgroundColor="white"
                                                height="4px"
                                                minWidth={`${sharesProgress * 100}%`}
                                                width={`${sharesProgress * 100}%`}
                                            ></ContentWrapper>
                                        </ContentWrapper>
                                    </ContentWrapper>

                                    <ContentWrapper marginBottom="20px">
                                        <ContentWrapper marginBottom="10px">
                                            <BlockTitle>Total Likes Emitted</BlockTitle>
                                        </ContentWrapper>
                                        <Section justifyBetween marginBottom="10px" marginRight="30px">
                                            <TableDataSpan>{likesEmitted}</TableDataSpan>
                                            <TableDataSpan color="#919195">{likesTotalTarget}</TableDataSpan>
                                        </Section>
                                        <ContentWrapper backgroundColor="black" height="4px" minWidth="290px">
                                            <ContentWrapper
                                                backgroundColor="white"
                                                height="4px"
                                                minWidth={`${likesProgress * 100}%`}
                                                width={`${likesProgress * 100}%`}
                                            ></ContentWrapper>
                                        </ContentWrapper>
                                    </ContentWrapper>
                                </Section>
                            </Section>
                        </>
                    )}
                </ContentWrapper>
                {video.items?.length && <VideoCard {...video?.items[0]} />}
                {user.items?.length && <UserCard {...user?.items[0]} />}
            </Section>
        </SingleMainLayout>
    );
};
