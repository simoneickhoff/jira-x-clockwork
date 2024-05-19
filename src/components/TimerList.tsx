import { useQuery } from '@tanstack/react-query';
import { deleteClockworkToken } from '../util/storage.ts';
import { Worklog } from '../types/Worklog.ts';

interface TimerListProps {
    clockworkToken: string;
}

const TimerList = ({ clockworkToken }: TimerListProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['getTimers'],
        queryFn: async (): Promise<Worklog[]> => {
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
        <div className={'flex flex-col justify-center items-center min-w-64 text-gray-900'}>
            <h1>TimerList</h1>
            <button onClick={deleteClockworkToken}>Delete Token</button>
            {data?.map((worklog: Worklog) => {
                return (
                    <div className={'flex justify-between border-b p-2 w-full'}>
                        <div>
                            <div className={'text-xl'}>{worklog.issue.key}</div>
                            <div>{worklog.issue.fields.summary}</div>
                        </div>

                        <div>{worklog.timeSpent}</div>
                    </div>
                );
            })}
        </div>
    );
};

export { TimerList };
