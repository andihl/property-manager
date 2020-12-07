import Axios, { Method } from "axios";
import { useEffect, useState } from "react";

const instance = Axios.create();
instance.interceptors.request.use((config) => {
    config.baseURL = 'https://propertymanager-060e.restdb.io/rest';
    config.headers = {
        "content-type": "application/json",
        "x-apikey": "5fc64a814af3f9656800d151",
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

export function useApi<T>(method: Method, path: string): { obj: T | undefined, setObj: (obj: T) => void, loading: boolean } {
    const [obj, setObj] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        api(method, path, (data: T) => {
            setObj(data);
            setLoading(false);
        });
    }, [method, path]);

    return { obj, setObj, loading };
}