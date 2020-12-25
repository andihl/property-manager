import React, { ReactElement } from 'react'
import FlatForm from '../../components/Flat/FlatForm'
import { useTitle } from '../../shared/title'

const FlatCreate = (): ReactElement => {
    useTitle('Erstelle Wohnung');

    return (
        <FlatForm />
    )
}

export default FlatCreate;