import Axios, { AxiosRequestConfig, Method } from "axios";
import { useEffect, useState } from "react";

export const instance = Axios.create();
instance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.baseURL = process.env.REACT_APP_API_URL;
    config.headers = {
        "content-type": "application/json",
        "x-apikey": process.env.REACT_APP_API_KEY,
        "cache-control": "no-cache"
    };

    return config;
});

export default function api<T>(method: Method, path: string, callback: (data: T) => void, data = {}): void {
    instance({
        method: method,
        url: path,
        data
    }).then((response) => callback(response.data));
}

export function useApi<T>(method: Method, path: string): { obj: T | undefined, setObj: (obj: T) => void, loading: boolean, setLoading: (loading: boolean) => void } {
    const [obj, setObj] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        api(method, path, (data: T) => {
            setObj(data);
            setLoading(false);
        });
    }, [method, path]);

    return { obj, setObj, loading, setLoading };
}