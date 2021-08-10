import { Tag } from 'antd';
import { initialState, testArray } from 'components/common/tags/Tags/constants';
import { Title } from 'components/common/typography/titles/Title';
import { noop } from 'constants/functions';
import { padding } from 'constants/styles/sizes';
import React, { FC, useState } from 'react';
import { Title as TitleProps } from 'types/data';

interface Props extends TitleProps {
    tagsData: string[];
    handleChange?: (tag: any, checked: any) => void;
    selectedTags?: string[];
    onTagsChange?: (tags: string[]) => void;
}

const { CheckableTag } = Tag;

export const Tags: FC<Props> = ({ tagsData = testArray, title = 'Categories: ', onTagsChange = noop }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(initialState);

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
        onTagsChange(nextSelectedTags);
    };

    return (
        <>
            <Title>{title}</Title>
            {tagsData.map(tag => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    style={{ marginBottom: padding }}
                    onChange={checked => handleChange(tag, checked)}
                >
                    {tag}
                </CheckableTag>
            ))}
        </>
    );
};
