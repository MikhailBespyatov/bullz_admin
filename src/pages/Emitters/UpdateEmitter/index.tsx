import arrow from 'assets/back_arrow_icon.svg';
import history from 'browserHistory';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { DateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { Input, InputWrapper } from 'componentsNewDesign/common/inputs/TextInput/styles';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { PromotionCardButton } from 'componentsNewDesign/layouts/cards/PromotionCard/styles';
import { MainLayout } from 'componentsNewDesign/layouts/MainLayout';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { errorEmptyMessage } from 'constants/notifications';
import { black, grey28, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { message } from 'stores/alerts';
import { emittersEffects, emittersStores } from 'stores/emitters/emitters';
import {
    arrowDiameter,
    inputBorderBottom,
    textFontSize,
    textFontWeight,
    totalLikesPlaceholder,
    totalSharesPlaceholder,
    totalViewsPlaceholder,
    wrapperPadding
} from './constants';
import { EmitterCardWrapper } from './styles';

export const UpdateEmitter = () => {
    const [views, setViews] = useState<number>(0);
    const [shares, setShares] = useState<number>(0);
    const [likes, setLikes] = useState<number>(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const emitterIdArr = history.location.pathname.split('/');
    const emitterId = emitterIdArr[emitterIdArr.length - 1];
    const emitter = useStore(emittersStores.emitterInfo);

    const { utcEmitStart, utcEmitEnd, viewsTotalTarget, likesTotalTarget, sharesTotalTarget }: any = emitter;

    useEffect(() => {
        emittersEffects.loadItemById(emitterId);
    }, [emitterId]);

    useEffect(() => {
        setViews(viewsTotalTarget);
        setShares(sharesTotalTarget);
        setLikes(likesTotalTarget);
        setStartDate(utcEmitStart);
        setEndDate(utcEmitEnd);
    }, [emitter, likesTotalTarget, sharesTotalTarget, utcEmitEnd, utcEmitStart, viewsTotalTarget]);

    const onBackArrowClick = () => {
        history.goBack();
    };

    const onDateRangeClick = (dateRange: [string, string]) => {
        setStartDate(dateRange[0]);
        setEndDate(dateRange[1]);
    };

    const onUpdateButtonClick = () => {
        if (views && shares && likes && startDate && endDate) {
            const newEmit = {
                id: emitterId,
                totalViews: views,
                totalShares: shares,
                totalLikes: likes,
                utcStart: startDate,
                utcEnd: endDate
            };
            const res = emittersEffects.updateEmitter(newEmit);
            res.then(val => {
                if (val) {
                    history.goBack();
                    setViews(0);
                    setShares(0);
                    setLikes(0);
                    setStartDate('');
                    setEndDate('');
                }
            });
        } else {
            message.error(errorEmptyMessage);
        }
    };

    return (
        <MainLayout>
            <EmitterCardWrapper>
                <ContentWrapper backgroundColor={grey28} padding={wrapperPadding} width="745px">
                    <Section justifyBetween marginBottom="30px">
                        <ClickableWrapper onClick={onBackArrowClick}>
                            <MarginWrapper marginRight="20px">
                                <CustomImage src={arrow} width={arrowDiameter} />
                            </MarginWrapper>
                            <ContentText fontSize="16px" fontWeight="700">
                                Update Emitter
                            </ContentText>
                        </ClickableWrapper>
                    </Section>
                    <Section noWrap>
                        <Column marginLeft="25px" marginRight="25px" width="465px">
                            <ContentText fontSize={textFontSize} fontWeight={textFontWeight}>
                                Total Views
                            </ContentText>

                            <Section marginBottom="16px" marginTop="5px">
                                <InputWrapper borderBottom={inputBorderBottom}>
                                    <Input
                                        placeholder={totalViewsPlaceholder}
                                        type="number"
                                        value={views}
                                        onChange={e => setViews(parseInt(e.target.value))}
                                    />
                                </InputWrapper>
                            </Section>

                            <ContentText fontSize={textFontSize} fontWeight={textFontWeight}>
                                Total Shares
                            </ContentText>
                            <Section marginBottom="16px" marginTop="5px">
                                <InputWrapper borderBottom={inputBorderBottom}>
                                    <Input
                                        placeholder={totalSharesPlaceholder}
                                        type="number"
                                        value={shares}
                                        onChange={e => setShares(parseInt(e.target.value))}
                                    />
                                </InputWrapper>
                            </Section>

                            <ContentText fontSize={textFontSize} fontWeight={textFontWeight}>
                                Total Likes
                            </ContentText>
                            <Section marginBottom="16px" marginTop="5px">
                                <InputWrapper borderBottom={inputBorderBottom}>
                                    <Input
                                        placeholder={totalLikesPlaceholder}
                                        type="number"
                                        value={likes}
                                        onChange={e => setLikes(parseInt(e.target.value))}
                                    />
                                </InputWrapper>
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

                            <Section>
                                <PromotionCardButton background={white} color={black} onClick={onUpdateButtonClick}>
                                    Update Emitter
                                </PromotionCardButton>
                            </Section>
                        </Column>
                    </Section>
                </ContentWrapper>
            </EmitterCardWrapper>
        </MainLayout>
    );
};
