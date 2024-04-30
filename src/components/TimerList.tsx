import { useQuery } from '@tanstack/react-query';
import { deleteClockworkToken } from '../util/storage.ts';

interface TimerListProps {
    clockworkToken: string;
}

const TimerList = ({ clockworkToken }: TimerListProps) => {
    useQuery({
        queryKey: ['getTimers'],
        queryFn: () =>
            fetch(
                'https://api.clockwork.report/v1/worklogs?expand=issues,worklogs',
                {
                    headers: {
                        Authorization: `Token ${clockworkToken}`,
                    },
                },
            ),
    });

    return (
        <>
            <h1>TimerList</h1>
            <strong>{clockworkToken}</strong>
            <button onClick={deleteClockworkToken}>Delete Token</button>
        </>
    );
};

export { TimerList };
