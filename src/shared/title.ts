import { useEffect } from "react"

export const useTitle = (title: string): void => {
    useEffect(() => {
        title === ''
            ? document.title = `PropertyManager`
            : document.title = `${title} | PropertyManager` // eslint-disable-line no-irregular-whitespace
    }, [title])
}