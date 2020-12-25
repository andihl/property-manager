import React, { ReactElement } from 'react'
import TenantForm from '../../components/Tenant/TenantForm'
import { useTitle } from '../../shared/title'

const TenantCreate = (): ReactElement => {
    useTitle('Erstelle Mieter');

    return <TenantForm />
}

export default TenantCreate;
