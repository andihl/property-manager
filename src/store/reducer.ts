import Flat from "../types/Flat";
import { Store } from "./store";


interface UpdateFlats {
    type: 'UPDATE_FLATS',
    payload: {
        flats: Flat[]
    }
}

interface Login {
    type: 'LOGIN'
}

interface Logout {
    type: 'LOGOUT'
}

export type Actions = UpdateFlats | Login | Logout;

export default function reducer(store: Store, action: Actions): Store {
    switch (action.type) {
        case 'UPDATE_FLATS': {

            const totalSize = action.payload.flats.reduce((acc, flat) => {
                return acc + flat.size;
            }, 0);

            return {
                ...store,
                flats: action.payload.flats,
                totalSize: totalSize
            };
        }
        case 'LOGIN': {
            return {
                ...store,
                isLoggedIn: true
            }
        }
        case 'LOGOUT': {
            return {
                ...store,
                isLoggedIn: false
            }
        }
        default:
            return store;
    }
}