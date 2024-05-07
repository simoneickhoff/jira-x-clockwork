import { useQuery } from '@tanstack/react-query';
import { deleteClockworkToken } from '../util/storage.ts';

interface TimerListProps {
    clockworkToken: string;
}

const TimerList = ({ clockworkToken }: TimerListProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['getTimers'],
        queryFn: async () => {
            const data = new URLSearchParams();

            data.set('user-query', 'simon.eickhoff@ontavio.de');
            data.set('starting_at', '2024-05-05');

            const response = await fetch(
                `https://api.clockwork.report/v1/worklogs?expand=worklogs,issues,authors,emails&${data}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Token ${clockworkToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!response.ok) {
                throw new Error('Network request failed');
            }
            return response.json();
        },
    });

    if (isLoading) {
        return 'Loading...';
    }

    if (error) {
        return error.message;
    }

    console.log(data);

    return (
        <div>
            <h1>TimerList</h1>
            <strong>{clockworkToken}</strong>
            <button onClick={deleteClockworkToken}>Delete Token</button>
            {JSON.stringify(data)}
        </div>
    );
};

export { TimerList };
