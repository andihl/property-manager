import React, { createContext, Dispatch, ReactElement, useContext, useReducer } from "react";
import Flat from "../types/Flat";
import reducer, { Actions } from "./reducer";

export interface Store {
    flats: Flat[],
    totalSize: number,
    isLoggedIn: boolean
}

const initialStore = {
    flats: [],
    totalSize: 0,
    isLoggedIn: localStorage.getItem('loggedIn') === 'true'
}

interface ContextProps {
    store: Store,
    dispatch: Dispatch<Actions>
}

const Store = createContext({} as ContextProps);
export const useStore = (): ContextProps => useContext(Store);

export const StoreProvider = (props: { children: ReactElement }): ReactElement => {
    const [store, dispatch] = useReducer(reducer, initialStore);

    return (
        <Store.Provider value={{ store, dispatch }}>
            { props.children}
        </Store.Provider >
    );
}