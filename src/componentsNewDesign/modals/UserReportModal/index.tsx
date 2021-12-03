import { useMediaQuery } from '@material-ui/core';
import whiteCopyIcon from 'assets/copy_icon_white_transparent.svg';
import { ReportStatusBadge } from 'componentsNewDesign/common/badges/ReportStatusBadge';
import { SuggestionBadge } from 'componentsNewDesign/common/badges/SuggestionBadge';
import { CopyTextButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { HorizontalLine } from 'componentsNewDesign/common/dividers/HorizontalLine';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { TextLoader } from 'componentsNewDesign/dynamic/Loader';
import {
    blockSeparator,
    emptyValue,
    EngagementKey,
    generateEngagementTableWithSpaces,
    generateTitleColumnWithSpaces,
    getConfidentialValue,
    getDateValue,
    getPublicValue,
    modalHeight,
    modalWidth,
    stringsSeparator
} from 'componentsNewDesign/modals/UserReportModal/constants';
import { Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ModalCloseButton, ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { black } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import * as _ from 'lodash';
import React, { ReactNode, useEffect, useRef } from 'react';
import { userReportModal } from 'stores/initialize/initialize.modal.store';
import { userStores } from 'stores/users/user';
import { usersEffects, usersStores } from 'stores/users/users';
import { ModalHeader, Parameter, Report, ReportBody, SectionWithPadding, Subtitle, Title } from './styles';

interface TitleTableItem {
    title: string;
    value: ReactNode;
}
const TitleTable = (array: TitleTableItem[], shift = 1) => {
    const titles = generateTitleColumnWithSpaces(array.map(i => i.title));

    // return <>&nbsp;</>
    return array.map(({ value }, i) => (
        <Subtitle key={i.toString()}>{`${_.repeat(blockSeparator, shift)}${
            titles[i]
        }:${stringsSeparator}${value}`}</Subtitle>
    ));
};
interface EngagementTableItem {
    title: string;
    key: EngagementKey;
}
const EngagementTable = (engagement: BULLZ.EngagementsOnContent, array: EngagementTableItem[], subtitle: string) => {
    const titles = generateTitleColumnWithSpaces([subtitle, ...array.map(i => i.title)]);
    const values = generateEngagementTableWithSpaces(
        engagement,
        array.map(i => i.key)
    );

    return array.map((_, i) => (
        <Parameter
            key={i.toString()}
        >{`${blockSeparator}${blockSeparator}${titles[i]}:${stringsSeparator}${values[i]}`}</Parameter>
    ));
};

export const UserReportWrapper = () => {
    const { access } = useStore(userStores.auth);
    const reportRef = useRef<HTMLPreElement | null>(null);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);
    const copiedData = reportRef.current
        ? reportRef.current?.innerText.replaceAll('\n\n', '\n').replaceAll('_', ' ')
        : undefined;

    const [visible, { id }] = useStore(userReportModal.modal);
    const {
        email,
        phone,
        locale,
        location,
        isTrusted,
        isBlocked,
        createdAt,
        updatedAt,
        lastSeenAt,
        totalVideos,
        liveVideos,
        deletedVideos,
        engagements,
        spread,
        userLevel
    } = useStore(usersStores.userReport);
    const loading = useStore(usersEffects.generateUserReport.pending);
    console.log(userLevel);

    const onClose = () => {
        userReportModal.closeModal();
    };

    useEffect(() => {
        visible && usersEffects.generateUserReport(id || '');
    }, [visible, id]);

    return (
        <ModalWrapper
            expanded
            customHeader={
                <>
                    <ModalHeader>
                        <SectionWithPadding alignCenter justifyBetween noWrap marginBottom="10px">
                            {/*<MarginWrapper marginLeft={modalVerticalPadding}>*/}
                            <ReportStatusBadge level={userLevel} title="Report" />
                            {/*</MarginWrapper>*/}
                            <Row alignCenter noWrap={isMobile}>
                                <MarginWrapper marginRight={isMobile ? '20px' : '24px'}>
                                    <CopyTextButton
                                        customCopyIcon={whiteCopyIcon}
                                        diameter="25px"
                                        disabled={!copiedData}
                                        subject={copiedData}
                                        success={'Copied!'}
                                    >
                                        <Span fontSize="15px" fontWeight="500" lineHeight="18px">
                                            Copy All
                                        </Span>
                                    </CopyTextButton>
                                </MarginWrapper>
                                {/*<MarginWrapper marginRight={modalVerticalPadding}>*/}
                                <ModalCloseButton onClose={onClose} />
                                {/*</MarginWrapper>*/}
                            </Row>
                        </SectionWithPadding>
                        <HorizontalLine background={black} height="2px" opacity={0.1} width={'100%'} />
                    </ModalHeader>
                    <MarginWrapper marginBottom="40px" />
                </>
            }
            height={modalHeight}
            overflow="hidden"
            visible={visible}
            width={modalWidth}
            onClose={onClose}
        >
            {loading ? (
                <ReportBody alignCenter justifyCenter>
                    <TextLoader size="large">Please wait</TextLoader>
                </ReportBody>
            ) : (
                <ReportBody>
                    {userLevel && (
                        <Section marginBottom="18px">
                            <SuggestionBadge level={userLevel} text="Normal user" />
                        </Section>
                    )}

                    <Report ref={reportRef}>
                        <Title>User</Title>
                        {TitleTable([
                            {
                                title: 'id',
                                value: id || emptyValue
                            },
                            {
                                title: 'email',
                                value: getConfidentialValue(access, email).toString()
                            },
                            {
                                title: 'phone',
                                value: getConfidentialValue(access, phone).toString()
                            },
                            {
                                title: 'locale',
                                value: getPublicValue(locale).toString()
                            },
                            {
                                title: 'Location',
                                value: getPublicValue(location).toString()
                            }
                        ])}
                        {/*<Subtitle>id: {id || emptyValue}</Subtitle>*/}
                        {/*<Subtitle>email: {getConfidentialValue(access, email)}</Subtitle>*/}
                        {/*<Subtitle>phone: {getConfidentialValue(access, phone)}</Subtitle>*/}
                        {/*<Subtitle>locale: {getPublicValue(locale)}</Subtitle>*/}
                        {/*<Subtitle>Location: {getPublicValue(location)}</Subtitle>*/}
                        <br />

                        <Title>Account</Title>
                        {TitleTable([
                            {
                                title: 'Trusted',
                                value: String(isTrusted)
                            },
                            {
                                title: 'Blocked',
                                value: String(isBlocked)
                            },
                            {
                                title: 'Created',
                                value: getDateValue(createdAt).toString()
                            },
                            {
                                title: 'Updated',
                                value: getDateValue(updatedAt).toString()
                            },
                            {
                                title: 'Last seen',
                                value: getDateValue(lastSeenAt).toString()
                            }
                        ])}
                        {/*<Subtitle>Trusted: {String(isTrusted)}</Subtitle>*/}
                        {/*<Subtitle>Blocked: {String(isBlocked)}</Subtitle>*/}
                        {/*<Subtitle>Created: {getDateValue(createdAt)}</Subtitle>*/}
                        {/*<Subtitle>Updated: {getDateValue(updatedAt)}</Subtitle>*/}
                        {/*<Subtitle>Last seen: {getDateValue(lastSeenAt)}</Subtitle>*/}
                        <br />

                        <Title>Content</Title>
                        {TitleTable([
                            {
                                title: 'Total videos',
                                value: getPublicValue(totalVideos).toString()
                            },
                            {
                                title: 'Live videos',
                                value: getPublicValue(liveVideos).toString()
                            },
                            {
                                title: 'Deleted videos',
                                value: getPublicValue(deletedVideos).toString()
                            }
                        ])}
                        {/*<Subtitle>Total videos: {getPublicValue(totalVideos)}</Subtitle>*/}
                        {/*<Subtitle>Live videos: {getPublicValue(liveVideos)}</Subtitle>*/}
                        {/*<Subtitle>Deleted videos: {getPublicValue(deletedVideos)}</Subtitle>*/}
                        <br />

                        <Title>Engagement on content</Title>

                        {engagements && (
                            <>
                                {EngagementTable(
                                    engagements,
                                    [
                                        {
                                            title: 'Max views',
                                            key: 'maxViews'
                                        },
                                        {
                                            title: 'Min views',
                                            key: 'minViews'
                                        },
                                        {
                                            title: 'Spread',
                                            key: 'spreadViews'
                                        }
                                    ],

                                    'Views'
                                )}
                                {/*<Subtitle>Views (all | public | not public)</Subtitle>*/}
                                {/*<Parameter>Max views: {getEngagementValue(engagements, 'maxViews')}</Parameter>*/}
                                {/*<Parameter>Min views: {getEngagementValue(engagements, 'minViews')}</Parameter>*/}
                                {/*<Parameter>Spread: {getEngagementValue(engagements, 'spreadViews')}</Parameter>*/}
                                <br />

                                {EngagementTable(
                                    engagements,
                                    [
                                        {
                                            title: 'Max comments',
                                            key: 'maxComments'
                                        },
                                        {
                                            title: 'Min comments',
                                            key: 'minComments'
                                        },
                                        {
                                            title: 'Spread',
                                            key: 'spreadComments'
                                        }
                                    ],

                                    'Comments'
                                )}
                                {/*<Subtitle>Comments (all | public | not public)</Subtitle>*/}
                                {/*<Parameter>Max comments: {getEngagementValue(engagements, 'maxComments')}</Parameter>*/}
                                {/*<Parameter>Min comments: {getEngagementValue(engagements, 'minComments')}</Parameter>*/}
                                {/*<Parameter>Spread: {getEngagementValue(engagements, 'spreadComments')}</Parameter>*/}
                                <br />

                                {EngagementTable(
                                    engagements,
                                    [
                                        {
                                            title: 'Max shares',
                                            key: 'maxShares'
                                        },
                                        {
                                            title: 'Min shares',
                                            key: 'minShares'
                                        },
                                        {
                                            title: 'Spread',
                                            key: 'spreadShares'
                                        }
                                    ],

                                    'Shares'
                                )}
                                {/*<Subtitle>Shares (all | public | not public)</Subtitle>*/}
                                {/*<Parameter>Max shares: {getEngagementValue(engagements, 'maxShares')}</Parameter>*/}
                                {/*<Parameter>Min shares: {getEngagementValue(engagements, 'minShares')}</Parameter>*/}
                                {/*<Parameter>Spread: {getEngagementValue(engagements, 'spreadShares')}</Parameter>*/}
                                <br />
                            </>
                        )}
                        {spread && (
                            <>
                                <Subtitle>{blockSeparator}Spread on max views</Subtitle>
                                {TitleTable(
                                    [
                                        {
                                            title: 'Views',
                                            value: getPublicValue(spread.views.views).toString()
                                        },
                                        {
                                            title: 'Comment',
                                            value: getPublicValue(spread.views.comments).toString()
                                        },
                                        {
                                            title: 'Shares',
                                            value: getPublicValue(spread.views.shares).toString()
                                        }
                                    ],
                                    2
                                )}
                                {/*<Parameter>Views: {getPublicValue(spread.views.views)}</Parameter>*/}
                                {/*<Parameter>Comment: {getPublicValue(spread.views.comments)}</Parameter>*/}
                                {/*<Parameter>Shares: {getPublicValue(spread.views.shares)}</Parameter>*/}
                                <br />

                                <Subtitle>{blockSeparator}Spread on max comments</Subtitle>
                                {TitleTable(
                                    [
                                        {
                                            title: 'Views',
                                            value: getPublicValue(spread.comments.views).toString()
                                        },
                                        {
                                            title: 'Comment',
                                            value: getPublicValue(spread.comments.comments).toString()
                                        },
                                        {
                                            title: 'Shares',
                                            value: getPublicValue(spread.comments.shares).toString()
                                        }
                                    ],
                                    2
                                )}
                                {/*<Parameter>Views: {getPublicValue(spread.comments.views)}</Parameter>*/}
                                {/*<Parameter>Comment: {getPublicValue(spread.comments.comments)}</Parameter>*/}
                                {/*<Parameter>Shares: {getPublicValue(spread.comments.shares)}</Parameter>*/}
                                <br />

                                <Subtitle>{blockSeparator}Spread on max shares</Subtitle>
                                {TitleTable(
                                    [
                                        {
                                            title: 'Views',
                                            value: getPublicValue(spread.shares.views).toString()
                                        },
                                        {
                                            title: 'Comment',
                                            value: getPublicValue(spread.shares.comments).toString()
                                        },
                                        {
                                            title: 'Shares',
                                            value: getPublicValue(spread.shares.shares).toString()
                                        }
                                    ],
                                    2
                                )}
                                {/*<Parameter>Views: {getPublicValue(spread.shares.views)}</Parameter>*/}
                                {/*<Parameter>Comment: {getPublicValue(spread.shares.comments)}</Parameter>*/}
                                {/*<Parameter>Shares: {getPublicValue(spread.shares.shares)}</Parameter>*/}
                                <br />
                            </>
                        )}
                    </Report>
                </ReportBody>
            )}
        </ModalWrapper>
    );
};
