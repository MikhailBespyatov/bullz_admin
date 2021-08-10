import { H3 } from 'components/common/typography/titles/H3';
import { CardRow, DescriptionCell } from 'components/grid/Card';
import {
    DataCellSpanFontSize,
    DataCellSpanLineHeight,
    errorImageDiameter,
    localMargin,
    localWidth
} from 'components/layouts/cards/users/UserCard/constants';
import { textInfoColor } from 'constants/styles/colors';
import { flexStart } from 'constants/styles/mixins';
import { avatarDiameter, padding } from 'constants/styles/sizes';
import styled from 'styled-components';

export const DescriptionWithAvatar = styled.div`
    width: calc(100% - ${avatarDiameter});
    padding-left: ${padding};
    display: flex;

    flex-direction: column;
    position: relative;
`;

export const H3Local = styled(H3)`
    margin: 0 calc(3 * ${localMargin});
    margin-right: ${localMargin};
    min-width: ${localWidth};
`;

export const ImageWrapper = styled.div`
    margin-left: auto;
`;

export const DataCardRow = styled(CardRow)`
    justify-content: space-between;
`;

export const DescriptionCellWithAvatar = styled(DescriptionCell)`
    min-height: ${errorImageDiameter};
`;

export const DataCardCell = styled.div`
    ${flexStart}
    flex-direction: column;
`;

export const DataCellSpan = styled.span`
    font-style: normal;
    font-weight: bold;
    font-size: ${DataCellSpanFontSize};
    line-height: ${DataCellSpanLineHeight};
    text-align: center;

    color: ${textInfoColor};
`;
