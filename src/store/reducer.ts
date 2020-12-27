import { FlashMessageType } from "../components/FlashMessage/FlashMessage";
import Flat from "../types/Flat";
import { Store } from "./store";

interface UpdateFlats {
    type: 'UPDATE_FLATS',
    payload: {
        flats: Flat[]
    }
}

interface SetFlashMessage {
    type: 'SET_FLASH_MESSAGE',
    payload: {
        text: string,
        type: FlashMessageType,
        duration: number | undefined
    }
}

export type Actions = UpdateFlats | SetFlashMessage;

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
        case 'SET_FLASH_MESSAGE': {
            return {
                ...store,
                flashMessage: {
                    text: action.payload.text,
                    type: action.payload.type,
                    duration: action.payload.duration
                }
            }
        }
        default:
            return store;
    }
}