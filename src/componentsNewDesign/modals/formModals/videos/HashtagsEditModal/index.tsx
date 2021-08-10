import closeIcon from 'assets/close.svg';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { HorizontalLine } from 'componentsNewDesign/common/dividers/HorizontalLine';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { RemovableHashtag } from 'componentsNewDesign/common/tags/RemovableHashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import {
    HashtagsWrapper,
    ModalAbsoluteWrapper,
    TitleSpan,
    TitleWrapper
} from 'componentsNewDesign/modals/formModals/videos/HashtagsEditModal/styles';
import { FixedWrapper } from 'componentsNewDesign/wrappers/FixedWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { FlexGrow, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { closeIconDiameter } from 'componentsNewDesign/wrappers/ModalWrapper/constant';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { black, grey3 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { default as React, KeyboardEvent, useEffect, useState } from 'react';
import { videoHashtagsEditorModal } from 'stores/initialize/initialize.modal.store';
import { loadingStores } from 'stores/loading';
import { videosEffects } from 'stores/videos/videos';

export const VideoHashtagsEditorModal = () => {
    const [visible, { hashTags, id }] = useStore(videoHashtagsEditorModal.modal);
    const [checked, setChecked] = useState(false);
    const loading = useStore(loadingStores.loading);
    const [hashtag, setHashtag] = useState('');

    const [hashtags, setHashtags] = useState<string[]>(hashTags);

    const resetHashtags = () => setHashtags(hashTags);

    const addNewHashtag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            !hashtags.some(hashtag => e.currentTarget.value === hashtag) &&
                setHashtags([...hashtags, e.currentTarget.value]);
            setHashtag('');
        }
    };
    const removeHashtag = (name: string) => setHashtags(state => state.filter(i => i !== name));

    // const changeInfoCallBack = (fields: VideoCardEditableFields) => videosEvents.updateItemById({ id, ...fields });

    // const onApply = () => toggleIsApplied();
    const onApply = (hashTags: string[]) => videosEffects.updateVideoTags({ id, tags: hashTags });

    const onClose = () => {
        setChecked(false);
        setHashtag('');
        videoHashtagsEditorModal.closeModal();
    };

    const closeEditHashTagsModal = () => {
        resetHashtags();
        onClose();
    };
    const applyClick = () => {
        onApply(hashtags);
        onClose();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => resetHashtags(), [hashTags]);

    if (!visible) return null;

    return (
        <FixedWrapper center backgroundColor="rgba(0,0,0,0.55)" /*visible={false}*/ zIndex="100">
            <ModalAbsoluteWrapper>
                <TitleWrapper alignCenter justifyCenter>
                    <TitleSpan>Edit Hashtags</TitleSpan>
                </TitleWrapper>
                <AbsoluteWrapper right="15px" top="18px">
                    <CustomImg
                        pointer
                        height={closeIconDiameter}
                        src={closeIcon}
                        width={closeIconDiameter}
                        onClick={closeEditHashTagsModal}
                    />
                </AbsoluteWrapper>

                <HorizontalLine background={black} opacity={0.1} />
                <FlexGrow margin="10px 14px 2px">
                    <Section alignCenter marginBottom="8px">
                        <ContentText>Hashtags</ContentText>
                    </Section>
                    <Section alignCenter marginBottom="8px">
                        <StyledTextInput
                            defaultValue={hashtag}
                            height="30px"
                            placeholder="Add hashtag"
                            onChange={setHashtag}
                            onKeyDown={addNewHashtag}
                        />
                    </Section>
                    <HashtagsWrapper
                        backgroundColor={grey3}
                        height="150px"
                        marginBottom="20px"
                        padding=" 13px 13px 13px 10px"
                        width="100%"
                    >
                        {/* <Column noWrap height="100%" width="100%"> */}
                        <ScrollableWrapper maxHeight="120px" overflowY="scroll" width="100%">
                            {hashtags?.length
                                ? hashtags.map(item => (
                                      <RemovableHashtag
                                          key={item}
                                          subject={item}
                                          text={item}
                                          type="video"
                                          untouchable={false}
                                          onRemove={removeHashtag}
                                      />
                                  ))
                                : 'no hashtags'}
                        </ScrollableWrapper>
                        {/* </Column> */}
                    </HashtagsWrapper>
                    <FlexGrow justifyEnd width="100%">
                        <Section alignCenter noWrap marginBottom="20px">
                            <MarginWrapper marginRight="12px">
                                <BooleanCheckbox defaultChecked={checked} onChange={setChecked} />
                            </MarginWrapper>

                            <ContentText>Are you sure you want to apply this info ?</ContentText>
                        </Section>
                        <Section justifyCenter>
                            <CardButton disabled={!checked || loading} onClick={applyClick}>
                                Apply
                            </CardButton>
                        </Section>
                    </FlexGrow>
                </FlexGrow>
            </ModalAbsoluteWrapper>
        </FixedWrapper>
    );
};
