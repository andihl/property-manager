import React, { ReactElement, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ContentCard from '../../components/Card/ContentCard';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Spinner } from '../../components/Spinner/Spinner';
import api from '../../shared/api';
import Contract from '../../types/Contract';
import Flat from '../../types/Flat';
import OperatingCosts from '../../types/OperatingCosts';
import ContractDetailTable from '../Contract/ContractDetailTable';
import css from './FlatDetails.module.scss';
import FlatDetailsTable from './FlatDetailsTable';
import OperatingCostsDetailTable from '../OperatingCosts/OperatingCostsDetailTable';
import OperatingCostsLineChart from '../../components/OperatingCosts/OperatingCostsLineChart';

const FlatDetails = (): ReactElement => {
    const params = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [flat, setFlat] = useState<Flat>();
    const [contract, setContract] = useState<Contract | null>(null);
    const [operatingCosts, setOperatingCosts] = useState<OperatingCosts[]>();

    useEffect(() => {
        setLoading(true);
        api<Flat>('GET', `/flat/${params.id}`, (flat) => {
            setFlat(flat);
            setLoading(false);
            api<Contract[]>('GET', `/contract?q={"$or":[{"endDate":{"$exists":false}},{"endDate":{"$gt":{"$date":"$now"}}}],"startDate":{"$lte":{"$date":"$now"}},"flat":{"_id":"5fce374f3439f0540003bfe8"}}`, (contracts) => {
                setContract(contracts?.length > 0 ? contracts[0] : null);
            });

            api<OperatingCosts[]>('GET', '/operatingcosts?q={"allocated":true}', (operatingCosts) => {
                setOperatingCosts(operatingCosts);
            });
        })
    }, [params.id])

    if (loading || !flat) return <Spinner />

    return (
        <>
            <PageHeader headline={`Wohnung ${flat.name}`} />

            <div className={`${css.infoSection}`}>
                <div className="ui grid">
                    <div className="row">
                        <div className="four wide column">
                            <div>
                                <ContentCard>
                                    <FlatDetailsTable flat={flat} />
                                </ContentCard>
                                <ContentCard>
                                    <ContractDetailTable contract={contract} />
                                </ContentCard>
                            </div>
                        </div>
                        <div className={`twelve wide column ${css.layoutContainer}`}>
                            <ContentCard>
                                <>
                                    {flat.layouts.map((layout, index) => (
                                        <Link to={`https://www.roomle.com/app/editor/${layout}`} target="_blank" key={index}>
                                            <img src={`https://uploads.roomle.com/plans/${layout}/thumbnail.png`} className={css.layout} />
                                        </Link>
                                    ))}
                                </>
                            </ContentCard>
                        </div>
                    </div>
                    {operatingCosts && (
                        <>
                            <div className="row">
                                <div className="sixteen wide column">
                                    <ContentCard>
                                        <OperatingCostsDetailTable operatingCosts={operatingCosts} flat={flat} />
                                    </ContentCard>
                                </div>
                            </div>
                            <div className="row">
                                <div className="sixteen wide column">
                                    <ContentCard>
                                        <OperatingCostsLineChart operatingCosts={operatingCosts} />
                                    </ContentCard>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </>
    )
}

export default FlatDetails;