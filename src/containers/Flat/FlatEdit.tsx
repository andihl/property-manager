import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom';
import FlatForm from '../../components/Flat/FlatForm';
import Spinner from '../../components/Spinner/Spinner';
import Flat from '../../types/Flat';
import { useApi } from '../../shared/api';
import { useTitle } from '../../shared/title';

const FlatEdit = (): ReactElement => {
    useTitle('Bearbeite Wohnung');

    const params = useParams<Params>();
    const { obj: flat, loading } = useApi<Flat>('GET', `/flat/${params.id}`);

    if (loading) return <Spinner />

    return <FlatForm flat={flat} />
}

interface Params {
    id: string
}

export default FlatEdit;