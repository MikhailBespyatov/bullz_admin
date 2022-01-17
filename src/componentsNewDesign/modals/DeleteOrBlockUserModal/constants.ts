/* type UserDeletionReason = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

    Values:
    0 = None
    1 = Spamming
    2 = Copyright
    3 = Inappropriate
    4 = Collusion
    5 = FakeAccount
    6 = Requested
    7 = SelfDeletion
*/

export const deleteReasonsList: Array<{
    value: BULLZ.UserDisablingReason;
    data: string;
}> = [
    {
        value: 1,
        data: 'Spamming'
    },
    {
        value: 2,
        data: 'Copyright'
    },
    {
        value: 3,
        data: 'Inappropriate'
    },
    {
        value: 4,
        data: 'Collusion'
    },
    {
        value: 5,
        data: 'Fake Account'
    },
    {
        value: 6,
        data: 'Delete Request'
    }
];
