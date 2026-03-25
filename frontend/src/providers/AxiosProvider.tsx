import React, { createContext, useContext } from 'react';
import { axiosClient } from '../lib/axios';
import type { AxiosInstance } from 'axios';

type AxiosContextType = AxiosInstance;

const AxiosContext = createContext<AxiosContextType | null>(null);

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AxiosContext.Provider value={axiosClient}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxios = (): AxiosInstance => {
    const ctx = useContext(AxiosContext);
    if (!ctx) throw new Error('useAxios must be used within AxiosProvider');
    return ctx;
};