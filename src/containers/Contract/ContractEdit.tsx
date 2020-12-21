import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom';
import ContractForm from '../../components/Contract/ContractForm';
import Spinner from '../../components/Spinner/Spinner';
import { useApi } from '../../shared/api';
import Contract from '../../types/Contract';

const ContractEdit = (): ReactElement => {
    const params = useParams<{ id: string }>();
    const { obj: contract, loading } = useApi<Contract>('GET', `/contract/${params.id}`);

    if (loading) return <Spinner />

    return <ContractForm contract={contract} />
}

export default ContractEdit;