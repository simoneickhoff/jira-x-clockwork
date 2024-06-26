import { TokenInput } from './components/TokenInput.tsx';
import { getClockworkToken, watchClockworkTokenChanges } from './util/storage.ts';
import { useEffect, useState } from 'react';
import { TimerList } from './components/TimerList.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    const [clockworkToken, setClockworkToken] = useState<string>();

    useEffect(() => {
        void checkForClockworkToken();
        watchClockworkTokenChanges(setClockworkToken);
    }, []);

    const checkForClockworkToken = async () => {
        const token = await getClockworkToken();

        if (token) {
            setClockworkToken(token);
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div>{clockworkToken ? <TimerList clockworkToken={clockworkToken} /> : <TokenInput />}</div>
        </QueryClientProvider>
    );
}

export default App;
