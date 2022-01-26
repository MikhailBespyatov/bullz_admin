import arrow from 'assets/back_arrow_icon.svg';
import history from 'browserHistory';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { ToggleButton } from 'componentsNewDesign/common/buttons/ToggleButton';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { DateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { TextInput } from 'componentsNewDesign/common/inputs/TextInput';
import { RemovableHashtag } from 'componentsNewDesign/common/tags/RemovableHashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import {
    arrowDiameter,
    getTargetRegionsArray,
    imageRequiredMessage,
    imageWrapperBorderRadius,
    imageWrapperHeight,
    imageWrapperWidth,
    inputBorderBottom,
    pageRoutePlaceholder,
    promotionNamePlaceholder,
    regionTagsPadding,
    targetRegionsPlaceholder,
    textFontSize,
    textFontWeight,
    wrapperPadding
} from 'componentsNewDesign/layouts/cards/PromotionCard/constants';
import {
    ImageContainer,
    ItemClickableWrapper,
    LocationsListWrapper,
    PromotionCardButton
} from 'componentsNewDesign/layouts/cards/PromotionCard/styles';
import { UploadPromotionImgPopover } from 'componentsNewDesign/modals/popovers/marketingTools/UploadPromotionImgPopover';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { marketingToolsLink } from 'constants/routes';
import { black, errorColor, green2, grey23, grey28, white } from 'constants/styles/colors';
import { useField } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { promotionForm } from 'stores/forms/promotionForm';
import {
    confirmPromotionActivationModal,
    informationalModal,
    promotionCreatedCongratsModal
} from 'stores/initialize/initialize.modal.store';
import { locationEffects, locationStores } from 'stores/location/location';
import { promotionsEffects, promotionsEvents, promotionsStores } from 'stores/promotions/promotions';

const { /*createPromotion,*/ updatePromotion } = promotionsEffects;
const { invokeGetItems } = promotionsEvents;
const { openModal: openCongratsModal } = promotionCreatedCongratsModal;
const { openModal: openInfoModal } = informationalModal;
const { openModal: openConfirmActivationModal } = confirmPromotionActivationModal;
const { loadListOfCountries } = locationEffects;

interface ParamsProps {
    promotionId: string;
}

export const PromotionCard = () => {
    /*isValid: isIdValid, validate: validateId* , onChange: onIdChange*/
    /*isValid: isNameValid ,validate: validateName*/
    /*isValid: isStartDateValid, validate: validateStartDate*/
    /*isValid: isEndDateValid ,validate: validateEndDate*/
    const { promotionId } = useParams<ParamsProps>();
    const { items: promotions } = useStore(promotionsStores.promotions);
    const { countries } = useStore(locationStores.countriesList);
    const [isCardLoading, setIsCardLoading] = useState(false);
    const isUpdatePending = useStore(updatePromotion.pending);
    const [currentlyActivePromotion, setCurrentlyActivePromotion] = useState<BULLZ.GetAdminPromotionResponse>({});

    const { value: id, set: setId } = useField(promotionForm.fields.id);
    const { value: promotionName, onChange: onNameChange } = useField(promotionForm.fields.name);
    const { value: imageUrl, set: setImageUrl } = useField(promotionForm.fields.imageUrl);
    const { value: startDate, onChange: onStartDateChange } = useField(promotionForm.fields.startDate);
    const { value: endDate, onChange: onEndDateChange } = useField(promotionForm.fields.endDate);
    const { value: ageRanges /*, onChange: onAgeRangesChange*/ } = useField(promotionForm.fields.ageRanges);
    const { value: userGenders /*, onChange: onUserGendersChange */ } = useField(promotionForm.fields.userGenders);

    const { value: pageRoute, onChange: onPageRouteChange, set: setPageRoute } = useField(
        promotionForm.fields.pageRoute
    );
    const { value: targetRegions, onChange: onTargetRegionsChange, set: setTargetRegions } = useField(
        promotionForm.fields.targetRegions
    );
    const { value: isPromotionActive, set: setIsPromotionActive } = useField(promotionForm.fields.isPromotionActive);

    const [toggleButtonIsActive, setToggleButtonIsActive] = useState(false);
    const [toggleButtonText, setToggleButtonText] = useState('Activate Promotion');

    const [location, setLocation] = useState<string>('');

    const [locationsList, setLocationsList] = useState<BULLZ.CountryResponse[]>();

    const onLocationChange = (value: string) => {
        setLocation(value);

        if (value.length > 1) {
            const locationsList = countries?.filter(item =>
                item.countryName?.toLowerCase().includes(value.toLowerCase())
            );
            setLocationsList(locationsList);
        }
    };

    const addNewLocation = ({ countryCode, countryName }: BULLZ.CountryResponse) => {
        !targetRegions.some(item => countryName === item.countryName) &&
            onTargetRegionsChange([...targetRegions, { countryCode, countryName }]);
        setLocation('');
    };

    const clearLocationInput = () => {
        setLocation('');
        setLocationsList([]);
    };

    // const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         addNewLocation(e.currentTarget.value);
    //         setLocationsList([]);
    //     }
    // };

    const onLocationSelect = (countryCode: string, countryName: string) => {
        addNewLocation({ countryCode, countryName });
        setLocationsList([]);
    };

    const removeLocation = (name: string) =>
        onTargetRegionsChange(targetRegions.filter(item => item.countryName !== name));

    const onDateRangeClick = (dateRange: [string, string]) => {
        onStartDateChange(dateRange[0]);
        onEndDateChange(dateRange[1]);
    };

    const onBackArrowClick = () => {
        history.push(marketingToolsLink);
        promotionForm.resetValues();
    };

    const onCreateButtonClick = () => {
        openInfoModal({ infoText: imageRequiredMessage });

        // promotionForm.resetValues();
        // createPromotion({
        //     userAgeRanges: ageRanges, //! no in design
        //     userGenders, //! no in design
        //     location: targetRegions,
        //     pageLocation: pageRoute
        //     //name: promotionName //! There is no promotionName in create request
        //     //isActive: isPromotionActive, //! There is no status in create request
        //     // startDate: startDate, //! There is no promotion duration in create request
        //     // endDate?: endDate,
        // });
        // onBackArrowClick();
    };

    const onUpdateButtonClick = async () => {
        const activatePromotion = !isPromotionActive && toggleButtonIsActive;

        if (!isPromotionActive && toggleButtonIsActive && currentlyActivePromotion) {
            await updatePromotion({
                id: currentlyActivePromotion.id,
                isActive: false
            });
        }

        const { isSuccess } = await updatePromotion({
            id: id,
            userAgeRanges: ageRanges.length ? ageRanges : undefined, //! no in design
            userGenders: userGenders.length ? userGenders : undefined, //! no in design
            geoLocations: targetRegions.length ? targetRegions.map(item => item.countryCode || '') : [],
            pageLocation: pageRoute,
            isActive: isPromotionActive ? !toggleButtonIsActive : toggleButtonIsActive
            //name: promotionName //! There is no name in update request
            //icon: imageUrl, //! There is no name in icon update request
            // startDate: startDate, //! There is no promotion duration in update request
            // endDate?: endDate,
        });

        if (activatePromotion && isSuccess) {
            openCongratsModal({ promotionId: id });
        }
    };

    const onToggleButtonClick = () => {
        if (!isPromotionActive && currentlyActivePromotion.id && id !== currentlyActivePromotion.id) {
            openConfirmActivationModal({
                promotionId: currentlyActivePromotion.id,
                onOk: () => setToggleButtonIsActive(!toggleButtonIsActive)
            });
        } else {
            setToggleButtonIsActive(!toggleButtonIsActive);
        }
    };

    useEffect(() => {
        if (promotionId) {
            setIsCardLoading(true);
            const selectedPromotion = promotions?.find(item => item.id === promotionId);

            setId(promotionId);
            selectedPromotion?.pageLocation && setPageRoute(selectedPromotion.pageLocation);
            selectedPromotion?.isActive !== undefined && setIsPromotionActive(selectedPromotion.isActive);
            selectedPromotion?.icon && setImageUrl(selectedPromotion?.icon);

            setToggleButtonIsActive(false);
            selectedPromotion?.isActive
                ? setToggleButtonText('Deactivate Promotion')
                : setToggleButtonText('Activate Promotion');

            if (selectedPromotion?.location?.length && countries?.length) {
                const targetRegions: BULLZ.CountryResponse[] = getTargetRegionsArray(
                    countries,
                    selectedPromotion.location
                );

                setTargetRegions(targetRegions);
            }

            setIsCardLoading(false);
        }

        const activePromotion = promotions?.find(item => item.isActive === true);
        activePromotion ? setCurrentlyActivePromotion(activePromotion) : setCurrentlyActivePromotion({});

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [promotionId, promotions]);

    useEffect(() => {
        invokeGetItems();
        setToggleButtonIsActive(false);
    }, [promotionId]);

    useEffect(() => {
        loadListOfCountries();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isCardLoading ? (
                <Section alignCenter justifyCenter height="70vh">
                    <Loader size="large" />
                </Section>
            ) : (
                <ContentWrapper backgroundColor={grey28} padding={wrapperPadding} width="745px">
                    <Section justifyBetween marginBottom="30px">
                        <ClickableWrapper onClick={onBackArrowClick}>
                            <MarginWrapper marginRight="20px">
                                <CustomImage src={arrow} width={arrowDiameter} />
                            </MarginWrapper>
                            <ContentText fontSize="16px" fontWeight="700">
                                {promotionId ? `Update Promotion` : 'Create Promotion'}
                            </ContentText>
                        </ClickableWrapper>
                        {isUpdatePending ? (
                            <Loader size="small" />
                        ) : (
                            <ContentWrapper
                                backgroundColor={isPromotionActive ? green2 : errorColor}
                                borderRadius="50%"
                                height={arrowDiameter}
                                minWidth={arrowDiameter}
                                width={arrowDiameter}
                            />
                        )}
                    </Section>
                    <Section noWrap>
                        <ContentWrapper
                            backgroundColor={grey23}
                            borderRadius={imageWrapperBorderRadius}
                            height={imageWrapperHeight}
                            marginLeft="35px"
                            padding="8px"
                            width={imageWrapperWidth}
                        >
                            <ImageContainer withDecoration={!imageUrl}>
                                {imageUrl ? (
                                    <Section alignCenter justifyCenter height="100%">
                                        <UploadPromotionImgPopover id={id} type="down">
                                            <CustomImage height="auto" src={imageUrl} width="100%" />
                                        </UploadPromotionImgPopover>
                                    </Section>
                                ) : (
                                    <UploadPromotionImgPopover id={id} type="down">
                                        <SimpleButton
                                            background="transparent"
                                            color={white}
                                            fontSize={textFontSize}
                                            fontWeight={textFontWeight}
                                            height="150px"
                                            width="100%"
                                        >
                                            Add Image
                                        </SimpleButton>
                                    </UploadPromotionImgPopover>
                                )}
                            </ImageContainer>
                        </ContentWrapper>

                        <Column marginLeft="25px" marginRight="25px" width="465px">
                            <ContentText fontSize={textFontSize} fontWeight={textFontWeight}>
                                Promotion Name
                            </ContentText>
                            <Section marginBottom="16px" marginTop="5px">
                                <TextInput
                                    borderBottom={inputBorderBottom}
                                    placeholder={promotionNamePlaceholder}
                                    value={promotionName}
                                    onChange={value => onNameChange(value)}
                                    onClick={() => onNameChange('')}
                                />
                            </Section>

                            <ContentText fontSize={textFontSize} fontWeight={textFontWeight}>
                                Page Route
                            </ContentText>

                            <Section marginBottom="16px" marginTop="5px">
                                <TextInput
                                    borderBottom={inputBorderBottom}
                                    placeholder={pageRoutePlaceholder}
                                    value={pageRoute}
                                    onChange={value => onPageRouteChange(value)}
                                    onClick={() => setPageRoute('')}
                                />
                            </Section>

                            <ContentText fontSize={textFontSize} fontWeight={textFontWeight}>
                                Target regions
                            </ContentText>
                            <Section marginTop="5px">
                                <RelativeWrapper>
                                    <TextInput
                                        borderBottom={inputBorderBottom}
                                        placeholder={targetRegionsPlaceholder}
                                        value={location}
                                        onChange={onLocationChange}
                                        onClick={clearLocationInput}
                                        //onKeyDown={onKeyDown}
                                    />
                                    {!!location && !!locationsList?.length && (
                                        <LocationsListWrapper>
                                            {locationsList?.map(item => {
                                                const { countryCode, countryName } = item;
                                                return countryName && countryCode ? (
                                                    <ItemClickableWrapper
                                                        key={countryCode}
                                                        onClick={() => onLocationSelect(countryCode, countryName)}
                                                    >
                                                        {countryName}
                                                    </ItemClickableWrapper>
                                                ) : undefined;
                                            })}
                                        </LocationsListWrapper>
                                    )}
                                </RelativeWrapper>
                            </Section>
                            <Section marginBottom="16px">
                                {!!targetRegions?.length && (
                                    <ContentWrapper height="50px" padding={regionTagsPadding} width="100%">
                                        <ScrollableWrapper maxHeight="50px" overflowY="scroll" width="100%">
                                            {targetRegions.map((item: BULLZ.CountryResponse) =>
                                                item.countryName ? (
                                                    <RemovableHashtag
                                                        key={item.countryName}
                                                        subject={item.countryName}
                                                        text={item.countryName}
                                                        type="video"
                                                        untouchable={false}
                                                        onRemove={removeLocation}
                                                    />
                                                ) : undefined
                                            )}
                                        </ScrollableWrapper>
                                    </ContentWrapper>
                                )}
                            </Section>

                            <ContentText fontSize={textFontSize} fontWeight={textFontWeight}>
                                Select Date
                            </ContentText>
                            <Row marginBottom="35px" marginTop="15px" maxWidth="400px">
                                <DateRangePicker
                                    dateRange={[startDate || '', endDate || '']}
                                    onChange={onDateRangeClick}
                                />
                            </Row>
                            <Section marginBottom="16px">
                                <SimpleButton background={grey23} backgroundHover="#383636">
                                    <Row alignCenter marginRight="16px">
                                        <ToggleButton value={toggleButtonIsActive} onChange={onToggleButtonClick} />
                                    </Row>

                                    <ContentText>{toggleButtonText}</ContentText>
                                </SimpleButton>
                            </Section>

                            <Section>
                                {!promotionId && (
                                    <PromotionCardButton background={white} color={black} onClick={onCreateButtonClick}>
                                        Create Promotion
                                    </PromotionCardButton>
                                )}

                                {promotionId && (
                                    <>
                                        <PromotionCardButton
                                            background={black}
                                            color={white}
                                            marginRight="8px"
                                            onClick={onUpdateButtonClick}
                                        >
                                            Update Promotion
                                        </PromotionCardButton>
                                        {/* <PromotionCardButton
                                            disabled
                                            background={errorColor}
                                            color={white}
                                            width="110px"
                                            onClick={noop}
                                        >
                                            Delete
                                        </PromotionCardButton> */}
                                    </>
                                )}
                            </Section>
                        </Column>
                    </Section>
                </ContentWrapper>
            )}
        </>
    );
};
