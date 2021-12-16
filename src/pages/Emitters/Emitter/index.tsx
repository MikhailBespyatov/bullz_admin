import backArrowImg from 'assets/back_arrow.svg';
import history from 'browserHistory';
import { Loader } from 'components/common/dynamic/Loader';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { PropertyBlock } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import { copyUserIdMessage } from 'componentsNewDesign/layouts/cards/UserCard/constants';
import { backImgDiameter } from 'componentsNewDesign/layouts/descriptionLayouts/UserDescription/constants';
import { SingleMainLayout } from 'componentsNewDesign/layouts/SingleMainLayout';
import { AsyncDeleteEmitterModal } from 'componentsNewDesign/modals/AsyncDeleteEmitterModal';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Flex, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { errorColor, grey23, grey24, grey29, grey7, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { emittersEffects, emittersStores } from 'stores/emitters/emitters';
import { deleteEmitterModal } from 'stores/initialize/initialize.modal.store';
import {
    copyEmitIdMessage,
    copyVideIdMessage,
    emitterMarginRight,
    emitterPrimaryMargin,
    emitterSinglePadding,
    propertyBackground,
    propertyHeight,
    propertyWidth
} from './constants';

export const Emitter = () => {
    const emitterIdArr = history.location.pathname.split('/');
    const emitterId = emitterIdArr[emitterIdArr.length - 1];
    const emitter = useStore(emittersStores.emitterInfo);
    const {
        id: emitId,
        isActive,
        isPast,
        videoId,
        userId,
        utcCreated,
        utcUpdated,
        utcEmitStart,
        utcEmitEnd,
        viewsTotalTarget,
        viewsEmitted,
        viewsProgress,
        likesTotalTarget,
        likesEmitted,
        likesProgress,
        sharesTotalTarget,
        sharesEmitted,
        sharesProgress
    }: any = emitter;
    const loading = useStore(emittersStores.loading);

    useEffect(() => {
        emittersEffects.loadItemById(emitterId);
    }, [emitterId]);

    const onBack = () => history.goBack();

    return (
        <SingleMainLayout>
            <AsyncDeleteEmitterModal />
            <Section marginRight={emitterMarginRight}>
                <ContentWrapper
                    backgroundColor={grey29}
                    marginBottom={emitterPrimaryMargin}
                    marginRight={emitterMarginRight}
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
                                <Flex>
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
                                </Flex>
                                <Flex>
                                    <SimpleButton
                                        background={grey23}
                                        backgroundHover={grey24}
                                        color={grey7}
                                        marginRight="8px"
                                        padding="8px"
                                    >
                                        Edit
                                    </SimpleButton>
                                    <SimpleButton
                                        background={errorColor}
                                        backgroundHover={grey24}
                                        color={white}
                                        padding="8px"
                                        onClick={() => deleteEmitterModal.openModal({ emitterId })}
                                    >
                                        Delete
                                    </SimpleButton>
                                </Flex>
                            </Section>

                            <Section marginBottom="17px">
                                <PropertyBlock
                                    copiable
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={emitId || '-'}
                                    success={copyEmitIdMessage}
                                    title="emit id"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    copiable
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={videoId || '-'}
                                    success={copyVideIdMessage}
                                    title="video id"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    copiable
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={userId || '-'}
                                    success={copyUserIdMessage}
                                    title="user id"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    isDate
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${new Date(utcCreated).toLocaleString()}` || '-'}
                                    title="date created"
                                    width={propertyWidth}
                                />

                                <PropertyBlock
                                    isDate
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${utcUpdated ? new Date(utcUpdated).toLocaleString() : '-'}`}
                                    title="date updated"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    isDate
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${new Date(utcEmitStart).toLocaleString()}` || '-'}
                                    title="emit start date"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    isDate
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${new Date(utcEmitEnd).toLocaleString()}` || '-'}
                                    title="emit end date"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={isActive ? 'Yes' : 'No'}
                                    title="is active"
                                    width={propertyWidth}
                                />

                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={isPast ? 'Yes' : 'No'}
                                    title="is past"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${viewsTotalTarget}` || '-'}
                                    title="Total target views"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${viewsEmitted}` || '-'}
                                    title="views emitted"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${viewsProgress}` || '-'}
                                    title="progress views"
                                    width={propertyWidth}
                                />

                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${sharesTotalTarget}` || '-'}
                                    title="total target shares"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${sharesEmitted}` || '-'}
                                    title="shares emitted"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${sharesProgress}` || '-'}
                                    title="progress shares"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${likesTotalTarget}` || '-'}
                                    title="total target likes"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${likesEmitted}` || '-'}
                                    title="likes emitted"
                                    width={propertyWidth}
                                />
                                <PropertyBlock
                                    backgroundColor={propertyBackground}
                                    marginBottom={'16px'}
                                    marginRight={emitterPrimaryMargin}
                                    minHeight={propertyHeight}
                                    subtitle={`${likesProgress}` || '-'}
                                    title="progress likes"
                                    width={propertyWidth}
                                />
                            </Section>
                        </>
                    )}
                </ContentWrapper>
            </Section>
        </SingleMainLayout>
    );
};
