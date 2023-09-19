import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const $api = axios.create({
    baseURL: __API_URL__,
});

$api.interceptors.request.use((config) => {
    config.headers = {
        authorization: `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY || '')}`,
    };

    return config;
});
