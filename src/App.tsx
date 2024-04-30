import { TokenInput } from './components/TokenInput.tsx';
import {
    getClockworkToken,
    watchClockworkTokenChanges,
} from './util/storage.ts';
import { useEffect, useState } from 'react';
import { TimerList } from './components/TimerList.tsx';

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
        <div
            className={
                'flex flex-col justify-center items-center h-screen min-w-64'
            }
        >
            {clockworkToken ? (
                <TimerList clockworkToken={clockworkToken} />
            ) : (
                <TokenInput />
            )}
        </div>
    );
}

export default App;
