import React, { createContext, useContext, useState, useEffect } from 'react';


export const RedirectContext = createContext({
    redirected: false,
    setRedirected: (status) => {
        throw new Error();
    }
});

export function useRedirect() {
    return useContext(RedirectContext);
}

export const RedirectProvider = ({ children }) => {
    const [redirected, setRedirected] = useState(() => {
        if (typeof window !== "undefined") {
            const storedRedirected = localStorage.getItem('redirected');
            return storedRedirected === 'true';
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem('redirected', redirected);
    }, [redirected]);

    return (
        <RedirectContext.Provider value={{ redirected, setRedirected }}>
            {children}
        </RedirectContext.Provider>
    );
};
