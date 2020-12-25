import React, { ReactElement } from 'react'
import OperatingCostsForm from '../../components/OperatingCosts/OperatingCostsForm'
import { useTitle } from '../../shared/title'

const OperatingCostsCreate = (): ReactElement => {
    useTitle('Erstelle Betriebskosten');

    return <OperatingCostsForm />
}

export default OperatingCostsCreate