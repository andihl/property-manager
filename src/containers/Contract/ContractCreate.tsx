import React, { ReactElement } from 'react'
import ContractForm from '../../components/Contract/ContractForm'
import { useTitle } from '../../shared/title'

const ContractCreate = (): ReactElement => {
    useTitle('Erstelle Vertrag');

    return <ContractForm />
}

export default ContractCreate;