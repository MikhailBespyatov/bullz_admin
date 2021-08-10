import closeIcon from 'assets/close.svg';
import { VideoCurateEditableFields } from 'components/layouts/cards/videos/VideoCard/types';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { HorizontalLine } from 'componentsNewDesign/common/dividers/HorizontalLine';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import {
    acceptedStatus,
    animationPopoverTime,
    calculatePopoverArrowLeft,
    calculatePopoverFinalArrowTop,
    calculatePopoverLeft,
    calculatePopoverTop,
    popoverHeight,
    popoverMaxWidth,
    popoverMinWidth,
    reasonRadioArray
} from 'componentsNewDesign/modals/popovers/CuratePopover/constants';
import {
    AgreementSpan,
    ContentWrapper,
    ItemSpan,
    ItemWrapper,
    PopoverAbsoluteWrapper,
    PopoverArrow,
    TitleSpan,
    TitleWrapper
} from 'componentsNewDesign/modals/popovers/CuratePopover/styles';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { FlexGrow, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { closeIconDiameter } from 'componentsNewDesign/wrappers/ModalWrapper/constant';
import { noop } from 'constants/functions';
import { black } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { useCloseClick } from 'hooks/closeClick';
import { useRefWidthAndHeight } from 'hooks/getRefProperty';
import { useModal } from 'hooks/modal';
import { useShiftPopover } from 'hooks/shiftPopover';
import { useTimeout } from 'hooks/timeout';
import React, { FC, MouseEvent as MouseEventReact, useRef, useState } from 'react';
import { loadingStores } from 'stores/loading';
import { modalEffects } from 'stores/modals/asyncModal';
import { videosEvents } from 'stores/videos/videos';
import { Id, PopoverType, Title } from 'types/data';
import { Disabled } from 'types/form';
import { Sizes } from 'types/styles';
import { Roles } from 'constants/defaults/users';
import { RolesLayout } from 'components/layouts/RolesLayouts';
import curateFiller from 'assets/curate_filler.svg';

export interface CuratePopoverProps extends PopoverType, Pick<Title, 'title'>, Disabled, Id, Sizes {
    // onApply: noop;
    //onChange?: (fields: VideoCurateEditableFields) => void;
}

// TODO: improve
export const CuratePopover: FC<CuratePopoverProps> = ({
    id,
    type,
    title = 'Curate video',
    //onApply,
    //onChange,
    disabled,
    width,
    children
}) => {
    const { visible, close, open } = useModal();
    const loading = useStore(loadingStores.loading);
    const childrenRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const childrenProperty = useRefWidthAndHeight(childrenRef);
    // const popoverProperty = useRefWidthAndHeight(popoverRef, visible);
    const popoverMarginLeftRight = useShiftPopover(popoverRef, visible);

    const isTopType = type === 'top';

    const [checked, setChecked] = useState(false);
    const [isAcceptPage, setIsAcceptPage] = useState(true);
    const [rejectStatus, setRejectStatus] = useState<YEAY.CurationEndedReason>(acceptedStatus);
    const [visibleRejectsStatus, setVisibleRejectsStatus] = useState(false);
    const [timeoutVisibleRejectsStatus, setTimeoutVisibleRejectsStatus] = useState<null | number>(null);

    const childrenHalfWidth = childrenProperty[0] / 2 + 'px';
    const popoverArrowLeft = calculatePopoverArrowLeft(childrenHalfWidth);
    const popoverLeft = calculatePopoverLeft(childrenHalfWidth, '265px', popoverMarginLeftRight);
    const popoverArrowTop = calculatePopoverFinalArrowTop(isTopType, childrenProperty[1]);
    const popoverTop = calculatePopoverTop(isTopType, childrenProperty[1], parseInt(popoverHeight));

    useTimeout(() => setVisibleRejectsStatus(true), timeoutVisibleRejectsStatus);

    const openPopover = (e: MouseEventReact<HTMLDivElement>) => {
        e.stopPropagation();
        !disabled && !visible && open();
    };

    const closePopover = () => {
        setIsAcceptPage(true);
        setRejectStatus(acceptedStatus);
        setVisibleRejectsStatus(false);
        setTimeoutVisibleRejectsStatus(null);
        close();
    };

    const setAcceptPage = () => {
        setIsAcceptPage(true);
        setRejectStatus(acceptedStatus);
        setChecked(false);
        setVisibleRejectsStatus(false);
        setTimeoutVisibleRejectsStatus(null);
    };

    const setRejectPage = () => {
        if (isAcceptPage) {
            setIsAcceptPage(false);
            setChecked(false);
            setTimeoutVisibleRejectsStatus(animationPopoverTime * 1000);
        }
    };

    const validateCallBack = (fields: VideoCurateEditableFields) =>
        videosEvents.updateCurationStateById({
            id,
            curationState: fields.curationState,
            curationEndedReason: rejectStatus
        });
    const onApply = async (values: YEAY.SubmitVideoCurationRequest) => {
        try {
            await modalEffects.curateVideo({ onChange: validateCallBack, ...values, videoId: id });
            //setChecked(false);
            close();
        } catch {}
    };

    useCloseClick(childrenRef, closePopover);

    const applyClick = () => checked && onApply({ reason: rejectStatus });

    //const applyButtonDisabled = !checked || loading || (!isAcceptPage && rejectStatus === acceptedStatus)

    return (
        <RelativeWrapper ref={childrenRef} height="auto" width={width || 'auto'} onClick={openPopover}>
            {visible && (
                <>
                    <PopoverAbsoluteWrapper
                        ref={popoverRef}
                        left={popoverLeft}
                        top={popoverTop}
                        width={isAcceptPage ? popoverMinWidth : popoverMaxWidth}
                    >
                        <TitleWrapper alignCenter justifyCenter>
                            <TitleSpan>{title}</TitleSpan>
                        </TitleWrapper>
                        <AbsoluteWrapper right="15px" top="15px">
                            <CustomImg
                                pointer
                                height={closeIconDiameter}
                                src={closeIcon}
                                width={closeIconDiameter}
                                onClick={closePopover}
                            />
                        </AbsoluteWrapper>
                        <MarginWrapper marginBottom="10px">
                            <HorizontalLine background={black} opacity={0.1} />
                        </MarginWrapper>
                        <ContentWrapper>
                            <Section justifyCenter marginBottom="20px">
                                <MarginWrapper marginRight="10px">
                                    <CardButton blocked={!isAcceptPage} onClick={setAcceptPage}>
                                        Accept
                                    </CardButton>
                                </MarginWrapper>
                                <CardButton blocked={isAcceptPage} type="secondary" onClick={setRejectPage}>
                                    Reject
                                </CardButton>
                            </Section>
                            {!isAcceptPage && visibleRejectsStatus && (
                                <Section justifyCenter>
                                    {reasonRadioArray.map(({ value, data }) => (
                                        <ItemWrapper
                                            key={value}
                                            alignCenter
                                            justifyCenter
                                            active={value === rejectStatus}
                                            onClick={() => setRejectStatus(value)}
                                        >
                                            <ItemSpan>{data}</ItemSpan>
                                        </ItemWrapper>
                                    ))}
                                </Section>
                            )}
                            <FlexGrow justifyEnd flexGrow="1">
                                {isAcceptPage && (
                                    <FlexGrow alignCenter justifyCenter width="100%">
                                        <CustomImg src={curateFiller} width="135px" />
                                    </FlexGrow>
                                )}
                                <Section alignCenter justifyCenter noWrap marginBottom="10px">
                                    <MarginWrapper marginRight="12px">
                                        <BooleanCheckbox defaultChecked={checked} onChange={setChecked} />
                                    </MarginWrapper>
                                    <AgreementSpan>Are you sure ?</AgreementSpan>
                                </Section>
                                <Section justifyCenter>
                                    <CardButton
                                        disabled={
                                            !checked || loading || (!isAcceptPage && rejectStatus === acceptedStatus)
                                        }
                                        // !!! (!isAcceptPage && rejectStatus === acceptedStatus) disabled button, but it
                                        // !!! don't block function's call, I don't know why, may be it some kind of memory leak
                                        onClick={!isAcceptPage && rejectStatus === acceptedStatus ? noop : applyClick}
                                    >
                                        {loading ? 'Loading...' : 'Apply'}
                                    </CardButton>
                                </Section>
                            </FlexGrow>
                        </ContentWrapper>
                    </PopoverAbsoluteWrapper>
                    <PopoverArrow left={popoverArrowLeft} top={popoverArrowTop} type={type} />
                </>
            )}
            {children}
        </RelativeWrapper>
    );
};

export const CuratePopoverLayout: FC<CuratePopoverProps> = ({ children, ...props }) => (
    <RolesLayout accessList={[Roles.SuperAdministrator, Roles.Administrator, Roles.Curator]}>
        <CuratePopover {...props}>{children}</CuratePopover>
    </RolesLayout>
);
