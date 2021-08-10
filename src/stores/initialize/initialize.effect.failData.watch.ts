import { asyncError } from 'constants/notifications';
import { Effect } from 'effector';
import { message } from 'stores/alerts';
import { parseStatusError } from 'utils/parsers';

// interface ErrorProps {
//     status?: number;
// }

// * any because type of these arguments doesn't matter
export const initializeEffectFailDataWatch = (effects: Array<Effect<any, any, Error>>) =>
    effects.map(i =>
        // TODO: any
        i.failData.watch(({ status }: any) => message.error(asyncError + parseStatusError(status)))
    );
