import { useState, useEffect } from 'react';

export const useSessionStorage = (key, defaultValue = {}) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const stored = window.sessionStorage.getItem(key, defaultValue);
        if (stored !== null) {
            setValue(JSON.parse(stored))
        }
    }, [key])

    useEffect(() => {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, setValue])

    return [value, setValue];
}
