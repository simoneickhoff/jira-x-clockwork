const clockworkTokenStorageKey = 'CLOCKWORKK_TOKEN';

const storeClockworkToken = (token: string) => {
    console.log(token);
    chrome.storage.local.set({ [clockworkTokenStorageKey]: token }).then(() => {
        console.log('Value is set');
    });
};

const getClockworkToken = async (): Promise<string | undefined> => {
    try {
        const data = await chrome.storage.local.get([clockworkTokenStorageKey]);
        console.log('the token is: ', data);

        return data[clockworkTokenStorageKey];
    } catch (e) {
        console.log(e);
    }
};

const deleteClockworkToken = () => {
    chrome.storage.local.remove(clockworkTokenStorageKey).then(() => {
        console.log('Value is removed');
    });
};

const watchClockworkTokenChanges = (callback: (token: string) => void) => {
    chrome.storage.onChanged.addListener(changes => {
        if (changes[clockworkTokenStorageKey]) {
            callback(changes[clockworkTokenStorageKey].newValue);
        }
    });
};

export {
    storeClockworkToken,
    getClockworkToken,
    watchClockworkTokenChanges,
    deleteClockworkToken,
};
