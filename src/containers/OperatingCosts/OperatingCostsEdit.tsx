import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom';
import OperatingCostsForm from '../../components/OperatingCosts/OperatingCostsForm';
import { Spinner } from '../../components/Spinner/Spinner';
import { useApi } from '../../shared/api';
import OperatingCosts from '../../types/OperatingCosts';

const OperatingCostsEdit = (): ReactElement => {

    const params = useParams<{ id: string }>();
    const { obj: operatingCosts, loading } = useApi<OperatingCosts>('GET', `/operatingcosts/${params.id}`);

    if (loading) return <Spinner />;

    return <OperatingCostsForm operatingCosts={operatingCosts} />
}

export default OperatingCostsEdit;