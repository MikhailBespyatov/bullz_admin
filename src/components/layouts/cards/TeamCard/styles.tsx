import { CardRow } from 'components/grid/Card';
import { avatarDiameter } from 'components/layouts/cards/products/ProductCard/constants';
import { flexStart } from 'constants/styles/mixins';
import { padding } from 'constants/styles/sizes';
import styled from 'styled-components';

export const DescriptionWithAvatar = styled.div`
    width: calc(100% - ${avatarDiameter});
    padding-left: ${padding};
    ${flexStart};
    flex-direction: column;
`;

export const DataCardRow = styled(CardRow)`
    justify-content: space-between;
`;

export const DataCardCell = styled.div`
    ${flexStart};
    flex-direction: column;
`;
