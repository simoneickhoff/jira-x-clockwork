import {useState} from 'react';
import {storeClockworkToken} from '../util/storage.ts';

const TokenInput = () => {
    const [token, setToken] = useState<string>();

    return (
        <>
            <h2>Put in Your Clockwork Token</h2>
            <input type={'text'} className={'border p-2 mt-4'} onChange={(event) => setToken(event.target.value)}/>
            <button disabled={!token} onClick={() => token && storeClockworkToken(token)}>Weiter</button>
        </>
    );
};

export {TokenInput};
