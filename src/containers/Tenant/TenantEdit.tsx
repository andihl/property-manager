import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import TenantForm from '../../components/Tenant/TenantForm';
import { useApi } from '../../shared/api';
import { useTitle } from '../../shared/title';
import Tenant from '../../types/Tenant';

const TenantEdit = (): ReactElement => {
    useTitle('Bearbeite Mieter')

    const params = useParams<Params>();
    const { obj: tenant, loading } = useApi<Tenant>('GET', `/tenant/${params.id}`)

    if (loading) return <Spinner />

    return (
        <TenantForm tenant={tenant} />
    )
}

interface Params {
    id: string
}

export default TenantEdit;
