import { ManagerLayout } from 'components/layouts/RolesLayouts';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { TextInput } from 'componentsNewDesign/common/inputs/TextInput';
import { RemovableHashtag } from 'componentsNewDesign/common/tags/RemovableHashtag';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import {
    contentTextLineHeight,
    editButtonColor,
    editButtonFontSize,
    editButtonHeight,
    subTitleColor,
    subTitleFontWeight,
    titlePadding
} from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/constants';
import { ConfirmationText } from 'componentsNewDesign/layouts/descriptionLayouts/VideoDescription/styles';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, FlexGrow, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ScrollableWrapper } from 'componentsNewDesign/wrappers/ScrollableWrapper';
import { black, blue, grey23, white } from 'constants/styles/colors';
import { descriptionPadding } from 'constants/styles/sizes';
import { useToggle } from 'hooks/toggle';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { Loading } from 'types/data';
import { Sizes } from 'types/styles';
import { HashtagType } from '../../tags/RemovableHashtag/types';

export interface HashtagsInputProps extends Pick<Sizes, 'width'>, Loading, HashtagType {
    hashTags?: string[];
    onConfirm: (hashtag: string[]) => void;
}

export const HashtagsInput = ({ width = '100%', hashTags = [], loading, onConfirm, type }: HashtagsInputProps) => {
    const [isEdit, toggleIsEdit] = useToggle();
    const [isApplied, toggleIsApplied] = useToggle(false);

    const [hashtags, setHashtags] = useState<string[]>(hashTags);

    const resetHashtags = () => setHashtags(hashTags);

    const addNewHashtag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            !hashtags.some(hashtag => e.currentTarget.value === hashtag) &&
                setHashtags([...hashtags, e.currentTarget.value]);
            e.currentTarget.value = '';
        }
    };
    const removeHashtag = (name: string) => setHashtags(state => state.filter(i => i !== name));

    const onEditClick = () => {
        isEdit && resetHashtags();
        toggleIsEdit();
    };
    const onApply = () => toggleIsApplied();
    const onDecline = () => {
        toggleIsEdit();
        toggleIsApplied();
        resetHashtags();
    };

    const onConfirmClick = () => {
        onConfirm(hashtags);
        toggleIsEdit();
        toggleIsApplied();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => resetHashtags(), [hashTags]);

    return (
        <Column width={width}>
            <Row alignCenter marginBottom={descriptionPadding}>
                <ContentText
                    color={subTitleColor}
                    fontWeight={subTitleFontWeight}
                    lineHeight={contentTextLineHeight}
                    padding={titlePadding}
                >
                    Hashtags
                </ContentText>
                {type === 'product' ? (
                    <ManagerLayout>
                        <SimpleButton
                            background="transparent"
                            color={editButtonColor}
                            fontSize={editButtonFontSize}
                            height={editButtonHeight}
                            padding="0px 20px"
                            onClick={onEditClick}
                        >
                            {isEdit ? 'Cancel' : 'Edit'}
                        </SimpleButton>
                    </ManagerLayout>
                ) : (
                    <SimpleButton
                        background="transparent"
                        color={editButtonColor}
                        fontSize={editButtonFontSize}
                        height={editButtonHeight}
                        padding="0px 20px"
                        onClick={onEditClick}
                    >
                        {isEdit ? 'Cancel' : 'Edit'}
                    </SimpleButton>
                )}
            </Row>
            <ContentWrapper
                backgroundColor={grey23}
                height="116px"
                // marginBottom={descriptionPadding}
                padding=" 8px 6px 3px 10px"
                // width="370px"
            >
                <Column noWrap height="100%" width="100%">
                    <ScrollableWrapper overflowY="scroll" width="350px">
                        {hashtags?.length
                            ? hashtags.map(item => (
                                  <RemovableHashtag
                                      key={item}
                                      subject={item}
                                      text={item}
                                      type={type}
                                      untouchable={!isEdit}
                                      onRemove={removeHashtag}
                                  />
                              ))
                            : 'no hashtags'}
                    </ScrollableWrapper>
                    {isEdit && (
                        <FlexGrow alignEnd flexDirection="row" width="100%">
                            <Section alignCenter justifyBetween>
                                {!isApplied ? (
                                    <>
                                        <TextInput
                                            backgroundColor={grey23}
                                            placeholder="Add hashtag"
                                            width="60%"
                                            onKeyDown={addNewHashtag}
                                        />
                                        <MarginWrapper marginLeft="5px">
                                            <SimpleButton background={black} color={white} onClick={onApply}>
                                                Apply
                                            </SimpleButton>
                                        </MarginWrapper>
                                    </>
                                ) : (
                                    <>
                                        <ConfirmationText>Are you sure ?</ConfirmationText>
                                        <Row>
                                            <SimpleButton background={black} color={blue} onClick={onConfirmClick}>
                                                {loading ? 'Loading...' : 'Yes'}
                                            </SimpleButton>
                                            <SimpleButton background={black} color="#FF6767" onClick={onDecline}>
                                                No
                                            </SimpleButton>
                                        </Row>{' '}
                                    </>
                                )}
                            </Section>
                        </FlexGrow>
                    )}
                </Column>
            </ContentWrapper>
        </Column>
    );
};
