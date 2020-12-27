import { FlashMessageType } from "../components/FlashMessage/FlashMessage";
import { useStore } from "../store/store";

export const useFlashMessage = (): { setFlashMessage: (text: string, type: FlashMessageType, duration?: number) => void } => {
    const { dispatch } = useStore();

    const setFlashMessage = (text: string, type: FlashMessageType, duration?: number): void => {
        dispatch({
            type: 'SET_FLASH_MESSAGE', payload: {
                text: text,
                type: type,
                duration: duration || 7500
            }
        });
    }

    return { setFlashMessage };
}