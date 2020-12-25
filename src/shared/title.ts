import { useEffect, useRef } from "react"

export const useTitle = (title: string): void => {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        title === ''
            ? document.title = `PropertyManager`
            : document.title = `${title} | PropertyManager` // eslint-disable-line no-irregular-whitespace
    }, [title])
}