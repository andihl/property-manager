import { useState } from "react"

export function useSearch<T>(): { setList: (list: T[]) => void, filteredList: T[], search: (searchTerm: string, propertyName: keyof T) => void } {
    const [originalList, setOriginalList] = useState<T[]>([]);
    const [filteredList, setFilteredList] = useState<T[]>([]);

    const setList = (list: T[]): void => {
        setOriginalList(list);
        setFilteredList(list);
    }

    const search = (searchTerm: string, propertyName: keyof T): void => {
        searchTerm = searchTerm.toLowerCase();

        if (!originalList) {
            console.error('Original list isn\'t set.');
            return;
        }

        if (searchTerm === '') {
            setFilteredList(originalList);
        } else {
            const tmp = originalList.filter(object => {
                const value = object[propertyName];
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchTerm);
                }
            });
            setFilteredList(tmp);
        }
    }

    return { setList, filteredList, search };
}