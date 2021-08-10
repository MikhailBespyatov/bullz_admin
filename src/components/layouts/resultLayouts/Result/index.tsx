import { Result as AntResult } from 'antd';
import { ResultProps } from 'antd/lib/result';
import { Button } from 'components/common/buttons/Button';
import { homePageLink } from 'constants/routes';
import React from 'react';
import { userEvents } from 'stores/users/user';
import { useHistory } from 'react-router';

export const Result = ({
    status = 403,
    subTitle = '403',
    title = 'Sorry, you are not allowed to access this action.',
    ...rest
}: ResultProps) => {
    const history = useHistory();

    const logout = () => userEvents.logout();

    const goHomeLink = () => history.push(homePageLink);

    return (
        <AntResult
            extra={
                <>
                    <Button type="primary" onClick={goHomeLink}>
                        Back Home
                    </Button>

                    {status === 403 && (
                        <Button type="primary" onClick={logout}>
                            Log out
                        </Button>
                    )}
                </>
            }
            status={status}
            subTitle={subTitle}
            title={title}
            {...rest}
        />
    );
};
