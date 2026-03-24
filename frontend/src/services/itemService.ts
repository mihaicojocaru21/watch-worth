import { apiFetch } from './api';

export interface Item {
    id: number;
    name: string;
    description: string;
}

export const itemService = {
    getAll: async (): Promise<Item[]> => {
        return apiFetch<Item[]>('/Items');
    },

    getById: async (id: number): Promise<Item> => {
        return apiFetch<Item>(`/Items/${id}`);
    },
};