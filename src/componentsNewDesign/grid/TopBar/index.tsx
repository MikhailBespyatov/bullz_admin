import { ItemActiveBorder, ItemSpan } from 'componentsNewDesign/grid/TopBar/styles';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { hoverGrey3 } from 'constants/styles/colors';
import React, { useEffect, useState } from 'react';

export interface TopBarProps extends YEAY.AdminGetVideoResponse, YEAY.YeayValidationInfo {
    content: string[];
    onChange: (itemName: string) => void;
    defaultActiveItem?: string;
}

export const TopBar = ({ content, onChange, defaultActiveItem = content[0] }: TopBarProps) => {
    const [activeItemName, setActiveItemName] = useState(defaultActiveItem);

    const onChangeItem = (nameItem: string) => {
        setActiveItemName(nameItem);
        onChange(nameItem);
    };

    useEffect(() => setActiveItemName(defaultActiveItem), [defaultActiveItem]);

    // console.log('content', content);

    return (
        <Section marginBottom="16px">
            {content.map(item => {
                const isActive = item === activeItemName;

                return (
                    <MarginWrapper key={item} marginRight="40px">
                        <Column>
                            <MarginWrapper marginBottom="16px" marginTop="16px">
                                <ItemSpan
                                    pointer
                                    opacity={isActive ? 1 : 0.2}
                                    textHover={hoverGrey3}
                                    onClick={() => onChangeItem(item)}
                                >
                                    {item}
                                </ItemSpan>
                            </MarginWrapper>
                            {isActive && <ItemActiveBorder />}
                        </Column>
                    </MarginWrapper>
                );
            })}
        </Section>
    );
};
