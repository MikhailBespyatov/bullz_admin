import tooltipIcon from 'assets/icons/tooltip_icon.svg';
import Axios from 'axios';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { HorizontalLine } from 'componentsNewDesign/common/dividers/HorizontalLine';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { DataPickerIcon } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { sideBarZIndex } from 'componentsNewDesign/grid/SideBar/constants';
import {
    BigQueryDescription,
    BigQueryTitle,
    ImageWrapper
} from 'componentsNewDesign/layouts/filterLayouts/UsersFilterLayout/BigQueryModal/styles';
import { StatusModal } from 'componentsNewDesign/modals/StatusModal';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteCenterAlignment, AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ModalCloseButton } from 'componentsNewDesign/wrappers/ModalWrapper';
import { ModalBackground } from 'componentsNewDesign/wrappers/ModalWrapper/styles';
import { blue, grey27, grey29 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { saveAs } from 'file-saver';
import { useToggle } from 'hooks/toggle';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { modalEvents } from 'stores/modals/asyncModal';
import { superAdminEffects, superAdminEvents, superAdminStores } from 'stores/superAdmin';
import { usersStores } from 'stores/users/users';
import { noop } from 'types/types';
import { convertToCSV, getDateFromString, getFilteredData } from 'utils/usefulFunctions';
import { basyUrlToUser, inProcessModal, PAGE_LIMIT, primaryMargin, successModal } from './constants';
interface Props {
    onClose: noop;
}

export const BigQueryModal = ({ onClose }: Props) => {
    const {
        role,
        isTrusted,
        country,
        locale,
        username,
        email,
        mobileNumber,
        region,
        fromUtcDateTime,
        toUtcDateTime,
        filterByDate
    } = useStore(usersStores.values);

    const { queryCount } = useStore(superAdminStores.bigQueryCount);
    const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
    const [checkboxActive, setCheckboxActive] = useState(false);
    const [withoutDisabledUsers, toggleWithoutDisabledUsers] = useToggle(false);
    const [withoutDeletedUsers, toggleWithoutDeletedUsers] = useState(false);
    const loading = useStore(superAdminStores.loading);
    const items = useStore(superAdminStores.bigQuery);

    const source = useMemo(() => Axios.CancelToken.source(), []);

    const data = useMemo(() => getFilteredData(items, withoutDeletedUsers, withoutDisabledUsers), [
        items,
        withoutDeletedUsers,
        withoutDisabledUsers
    ]);

    const csvData = useMemo(() => {
        const csv = convertToCSV(data);
        return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    }, [data]);

    const bigQueryValues = {
        role: role,
        username: username,
        isTrusted: isTrusted,
        email: email,
        mobileNumber: mobileNumber,
        country: country,
        region: region,
        locale: locale,
        limit: PAGE_LIMIT,
        pageIndex: 0,
        yasyUrlToUser: basyUrlToUser,
        fromUtcDateTime,
        toUtcDateTime,
        filterByDate
    };

    const onStatusModalClose = () => {
        setStatusModalIsOpen(false);
        source.cancel();
        superAdminEvents.resetBigQuery();
        onClose();
    };
    const onDownloadBigQuery = () => {
        saveAs(csvData, 'data.csv');
    };

    const memoizedOnStatusModalClose = useCallback(onStatusModalClose, [onClose, source]);
    const memoizedOnDownloadBigQuery = useCallback(onDownloadBigQuery, [csvData]);

    const onDownload = async () => {
        if (queryCount) {
            superAdminEvents.updateLoading();

            setStatusModalIsOpen(true);
            modalEvents.openStatusModal({ ...inProcessModal, status: 'inProcess', onCloseClick: onStatusModalClose });

            const pageCount = new Array(Math.ceil(queryCount / PAGE_LIMIT)).fill(null);

            await Promise.all(
                pageCount.map((_, index) =>
                    superAdminEffects.getBigQuery({
                        value: { ...bigQueryValues, pageIndex: index },
                        cancelToken: source.token
                    })
                )
            );

            superAdminEvents.updateLoading();
        }
    };

    useEffect(() => {
        if (statusModalIsOpen && !loading && items.length === queryCount) {
            modalEvents.openStatusModal({
                ...successModal,
                status: 'success',
                onCloseClick: memoizedOnStatusModalClose,
                onClick: memoizedOnDownloadBigQuery
            });
        }
    }, [loading, statusModalIsOpen, memoizedOnDownloadBigQuery, memoizedOnStatusModalClose, items, queryCount]);

    return statusModalIsOpen ? (
        <StatusModal />
    ) : (
        <>
            <ModalBackground onClick={onClose} />
            <AbsoluteCenterAlignment zIndex={`${sideBarZIndex + 1}`}>
                <ContentWrapper backgroundColor={grey29} minHeight="460px" paddingTop={primaryMargin} width="322px">
                    {!loading ? (
                        <>
                            <Section alignCenter justifyCenter marginBottom={primaryMargin}>
                                <Span color={blue} fontSize="14px" fontWeight="bold" lineHeight="16px">
                                    You have Selected
                                </Span>
                            </Section>
                            <HorizontalLine background="rgba(0, 0, 0, 0.1)" />
                            <ContentWrapper padding="16px 24px">
                                <Row marginBottom={primaryMargin}>
                                    <BigQueryTitle>Selected Count is {queryCount}</BigQueryTitle>
                                    <ImageWrapper>
                                        <CustomImage alt="tooltip icon" src={tooltipIcon} width="13px" />
                                    </ImageWrapper>
                                </Row>

                                <Row marginBottom={primaryMargin}>
                                    {role && (
                                        <Column marginRight="43px">
                                            <MarginWrapper marginBottom="8px">
                                                <BigQueryTitle>Role</BigQueryTitle>
                                            </MarginWrapper>
                                            <BigQueryDescription>{role}</BigQueryDescription>
                                        </Column>
                                    )}
                                    <Column>
                                        <MarginWrapper marginBottom="8px">
                                            <BigQueryTitle>Is trusted</BigQueryTitle>
                                        </MarginWrapper>
                                        <BigQueryDescription>{isTrusted ? 'Yes' : 'No'}</BigQueryDescription>
                                    </Column>
                                </Row>

                                <Row marginBottom={primaryMargin}>
                                    {filterByDate && (
                                        <Column marginRight="43px">
                                            <MarginWrapper marginBottom="8px">
                                                <BigQueryTitle>Date</BigQueryTitle>
                                            </MarginWrapper>
                                            <Section alignCenter noWrap>
                                                <Span fontSize="11px" fontWeight="700">
                                                    <BigQueryDescription>From </BigQueryDescription>
                                                    {getDateFromString(fromUtcDateTime)}
                                                </Span>
                                                <DataPickerIcon />
                                                <Span fontSize="11px" fontWeight="700">
                                                    <BigQueryDescription>To </BigQueryDescription>
                                                    {getDateFromString(toUtcDateTime)}
                                                </Span>
                                            </Section>
                                        </Column>
                                    )}
                                </Row>

                                <MarginWrapper marginBottom={primaryMargin}>
                                    <BigQueryTitle>Location</BigQueryTitle>
                                </MarginWrapper>
                                <ContentWrapper
                                    backgroundColor={grey27}
                                    marginBottom={primaryMargin}
                                    padding="8px"
                                    width="100%"
                                >
                                    <BigQueryDescription>{country || 'Not chosen'}</BigQueryDescription>
                                </ContentWrapper>

                                <MarginWrapper marginBottom={primaryMargin}>
                                    <BigQueryTitle>Locale</BigQueryTitle>
                                </MarginWrapper>
                                <ContentWrapper
                                    backgroundColor={grey27}
                                    marginBottom={primaryMargin}
                                    padding="8px"
                                    width="100%"
                                >
                                    <BigQueryDescription>{locale || 'Not chosen'}</BigQueryDescription>
                                </ContentWrapper>

                                <Section alignCenter>
                                    <Row alignCenter marginBottom={primaryMargin}>
                                        <BooleanCheckbox showName name="Deleted" onChange={toggleWithoutDeletedUsers} />
                                    </Row>
                                    <Row alignCenter marginBottom={primaryMargin} marginLeft={primaryMargin}>
                                        <BooleanCheckbox
                                            showName
                                            name="Disabled"
                                            onChange={toggleWithoutDisabledUsers}
                                        />
                                    </Row>
                                </Section>

                                <MarginWrapper marginBottom={primaryMargin}>
                                    <BooleanCheckbox
                                        showName
                                        name="Are you sure you want to make a BIG query?"
                                        onChange={setCheckboxActive}
                                    />
                                </MarginWrapper>

                                <Section justifyCenter>
                                    <SimpleButton
                                        background={grey27}
                                        color={blue}
                                        disabled={!checkboxActive}
                                        onClick={onDownload}
                                    >
                                        Download
                                    </SimpleButton>
                                </Section>
                            </ContentWrapper>
                        </>
                    ) : (
                        <Section alignCenter justifyCenter height="460px">
                            <Loader size="large" />
                        </Section>
                    )}
                </ContentWrapper>
                <AbsoluteWrapper right="19px" top="18px" zIndex="100">
                    <ModalCloseButton onClose={onClose} />
                </AbsoluteWrapper>
            </AbsoluteCenterAlignment>
        </>
    );
};
