import arrow from 'assets/back_arrow_icon.svg';
import history from 'browserHistory';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { ToggleButton } from 'componentsNewDesign/common/buttons/ToggleButton';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { DateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { TextInput } from 'componentsNewDesign/common/inputs/TextInput';
import { RemovableHashtag } from 'componentsNewDesign/common/tags/RemovableHashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import {
    arrowDiameter,
    imageWrapperBorderRadius,
    imageWrapperHeight,
    imageWrapperWidth,
    inputBorderBottom,
    pageRoutePlaceholder,
    promotionNamePlaceholder,
    targetRegionsPlaceholder,
    wrapperBorderRadius,
    wrapperPadding
} from 'componentsNewDesign/layouts/cards/PromotionCard/constants';
import { ImageContainer } from 'componentsNewDesign/layouts/cards/PromotionCard/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { noop } from 'constants/functions';
import { marketingToolsLink } from 'constants/routes';
import { black, errorColor, grey23, grey28, white } from 'constants/styles/colors';
import { useToggle } from 'hooks/toggle';
import React, { KeyboardEvent, useState } from 'react';
//import { promotionsEffects } from 'stores/promotions/promotions';

// const {
// id,
// name,
// startDate,
// endDate,
//ageRanges,
//userGender,
// pageRoute,
// targetRegions,
//isPromotionActive,
// imageUrl
// } = forms.promotionForm.fields;

//const { createPromotion, updatePromotion } = promotionsEffects;

export interface PromotionCardProps {
    id?: string;
    name?: string;
    startDate?: string;
    endDate?: string;
    //ageRanges,
    //userGender,
    pageRoute?: string;
    targetRegions?: string[];
    isPromotionActive?: boolean;
    imageUrl?: string;
}

export const PromotionCard = ({
    id,
    name,
    startDate,
    endDate,
    pageRoute,
    targetRegions,
    imageUrl,
    isPromotionActive = false
}: PromotionCardProps) => {
    //const {
    //id
    // userAgeRanges,
    // userGenders,
    // location,
    // icon,
    // isActive,
    // pageLocation
    //imageUrl: imageUrlValue
    //} = useStore(promotionsStores.promotion);

    //const { reset } = useForm(forms.promotionCardForm);
    //const { imageUrl: imageUrlValue } = useStore(promotionsStores.promotion);
    //const { promotionId } = useParams<ParamsProps>();
    //const onStateChange = (isActive: boolean) => isPromotionActive.onChange(isActive);
    const [location, setLocation] = useState<string>('');
    const [locations, setLocations] = useState<string[]>(targetRegions || []);
    const [isActive, setIsActive] = useToggle(isPromotionActive);

    const addNewLocation = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            !locations.some(item => e.currentTarget.value === item) &&
                setLocations([...locations, e.currentTarget.value]);
            setLocation('');
        }
    };
    const removeLocation = (name: string) => setLocations(state => state.filter(i => i !== name));

    //* GENDER  0 = NotGiven<br/>1 = Male<br/>2 = Female<br/>3 = NonBinary

    const onDateRangeClick = (/*dateRange: [string, string]*/) => {
        //setPromotionStartDate(dateRange[0]);
        //setPromotionEndDate(dateRange[1]);
    };

    const onBackArrowClick = () => history.push(marketingToolsLink);

    // const onCreateButtonClick = () => {
    //     createPromotion({
    //         name: promotionName //! There is no promotionName in create request?
    //         userAgeRanges: promotionAgeRanges, //! no in design
    //         userGenders: promotionUserGender, //! no in design
    //         location: targetRegions,
    //         pageLocation: pageRoute
    //         icon: undefined, //! There is no promotionImage in create request?
    //         isActive: isPromotionActive, //! There is no status in create request?
    //     });
    // };

    // const onUpdateButtonClick = () => {
    //     updatePromotion({
    //         id: id,
    //         name: promotionName //! is this possible to update Name
    //         userAgeRanges: promotionAgeRanges, //! no in design
    //         userGenders: promotionUserGender, //! no in design
    //         geoLocations: targetRegions,
    //         pageLocation: pageRoute,
    //         icon: undefined, //! is this possible to update image
    //         isActive: isPromotionActive
    //     });
    // };

    // useEffect(() => {
    //     isEditPage ? promotionsEffects.getItemById(promotionsId) : promotionsEffects.resetItem();
    //     isEditPage && imageUrlValue && imageUrl.set(imageUrlValue);

    //     reset();

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <ContentWrapper
            backgroundColor={grey28}
            borderRadius={wrapperBorderRadius}
            padding={wrapperPadding}
            width="745px"
        >
            <Section marginBottom="30px">
                <ClickableWrapper onClick={onBackArrowClick}>
                    <MarginWrapper marginRight="20px">
                        <CustomImage src={arrow} width={arrowDiameter} />
                    </MarginWrapper>
                    <ContentText fontSize="16px" fontWeight="700">
                        Create Promotion
                    </ContentText>
                </ClickableWrapper>
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
                    <ImageContainer>
                        {imageUrl ? (
                            <CustomImage src={imageUrl}></CustomImage>
                        ) : (
                            <ClickableWrapper onClick={noop}>
                                <ContentText fontSize="12px" fontWeight="500">
                                    Add Image
                                </ContentText>
                            </ClickableWrapper>
                        )}
                    </ImageContainer>
                </ContentWrapper>
                <Column marginLeft="25px" marginRight="25px" width="465px">
                    <ContentText fontSize="12px" fontWeight="500">
                        Promotion Name
                    </ContentText>
                    <Section marginBottom="16px" marginTop="5px">
                        <TextInput
                            borderBottom={inputBorderBottom}
                            placeholder={promotionNamePlaceholder}
                            value={name}
                        />
                    </Section>

                    <ContentText fontSize="12px" fontWeight="500">
                        Page Route
                    </ContentText>

                    <Section marginBottom="16px" marginTop="5px">
                        <TextInput
                            borderBottom={inputBorderBottom}
                            placeholder={pageRoutePlaceholder}
                            value={pageRoute || undefined}
                        />
                    </Section>

                    <ContentText fontSize="12px" fontWeight="500">
                        Target regions
                    </ContentText>
                    <Section marginTop="5px">
                        <TextInput
                            borderBottom={inputBorderBottom}
                            placeholder={targetRegionsPlaceholder}
                            value={location}
                            onChange={setLocation}
                            onKeyDown={addNewLocation}
                        />
                    </Section>
                    <Section marginBottom="16px">
                        {!!locations?.length && (
                            <ContentWrapper height="50px" padding=" 10px 13px 13px 0px" width="100%">
                                <ScrollableWrapper maxHeight="50px" overflowY="scroll" width="100%">
                                    {locations.map(item => (
                                        <RemovableHashtag
                                            key={item}
                                            subject={item}
                                            text={item}
                                            type="video"
                                            untouchable={false}
                                            onRemove={removeLocation}
                                        />
                                    ))}
                                </ScrollableWrapper>
                            </ContentWrapper>
                        )}
                    </Section>

                    <ContentText fontSize="12px" fontWeight="500">
                        Select Date
                    </ContentText>
                    <Row marginBottom="35px" marginTop="15px" maxWidth="400px">
                        <DateRangePicker dateRange={[startDate || '', endDate || '']} onChange={onDateRangeClick} />
                    </Row>
                    <Section marginBottom="16px">
                        <SimpleButton background={grey23}>
                            <Row alignCenter marginRight="16px">
                                <ToggleButton value={isActive} onChange={setIsActive} />
                            </Row>
                            <ContentText>{id ? 'Deactivate Promotion' : 'Activate Promotion'}</ContentText>
                        </SimpleButton>
                    </Section>

                    <Section>
                        {!id && (
                            <SimpleButton
                                background={white}
                                borderRadius="4px"
                                color={black}
                                fontWeight="400"
                                marginBottom="10px"
                                padding="8px"
                                onClick={noop}
                            >
                                Create Promotion
                            </SimpleButton>
                        )}

                        {id && (
                            <>
                                <SimpleButton
                                    background={black}
                                    borderRadius="4px"
                                    color={white}
                                    fontWeight="400"
                                    marginBottom="10px"
                                    marginRight="8px"
                                    padding="8px"
                                    onClick={noop}
                                >
                                    Update Promotion
                                </SimpleButton>
                                <SimpleButton
                                    background={errorColor}
                                    borderRadius="4px"
                                    color={white}
                                    fontWeight="400"
                                    marginBottom="10px"
                                    padding="8px"
                                    width="110px"
                                    onClick={noop}
                                >
                                    Delete
                                </SimpleButton>
                            </>
                        )}
                    </Section>
                </Column>
            </Section>
        </ContentWrapper>
    );
};
