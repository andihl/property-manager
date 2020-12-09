import Flat from "../types/Flat";
import { Store } from "./store";


interface UpdateFlats {
    type: 'UPDATE_FLATS',
    payload: {
        flats: Flat[]
    }
}

export type Actions = UpdateFlats;

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
        default:
            return store;
    }
}