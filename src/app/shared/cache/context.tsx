import React, { createContext, useContext } from 'react';
import { Cache } from './cache';

const cache = new Cache({
    maxAge: 3600000,
    maxItems: 1000
});

export const CacheContext = createContext<Cache>(cache);
export const CacheContainer: React.FC = ({children}) => {
    return (
        <CacheContext.Provider value={cache}>
            {children}
        </CacheContext.Provider>
    )
}

export function useCache(): Cache {
    const cache = useContext(CacheContext)
    return cache
}