import React, { ReactElement, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ContentCard from '../../components/Card/ContentCard';
import PageHeader from '../../components/PageHeader/PageHeader';
import Spinner from '../../components/Spinner/Spinner';
import api from '../../shared/api';
import Contract from '../../types/Contract';
import Flat from '../../types/Flat';
import OperatingCosts from '../../types/OperatingCosts';
import ContractDetailTable from '../../components/Contract/ContractDetailTable';
import css from './FlatDetails.module.scss';
import FlatDetailsTable from '../../components/Flat/FlatDetailsTable';
import OperatingCostsDetailTable from '../../components/OperatingCosts/OperatingCostsDetailTable';
import OperatingCostsLineChart from '../../components/OperatingCosts/OperatingCostsLineChart';
import { useTitle } from '../../shared/title';

const FlatDetails = (): ReactElement => {
    useTitle('Wohnungsdetails')

    const params = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [flat, setFlat] = useState<Flat>();
    const [contract, setContract] = useState<Contract | null>(null);
    const [isContractLoading, setContractLoading] = useState<boolean>(false);
    const [operatingCosts, setOperatingCosts] = useState<OperatingCosts[] | null>(null);
    const [isOperatingCostsLoading, setOperatingCostsLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        api<Flat>('GET', `/flat/${params.id}`, (flat) => {
            setFlat(flat);
            setLoading(false);
            setContractLoading(true);
            api<Contract[]>('GET', `/contract?q={"$or":[{"endDate":{"$exists":false}},{"endDate":{"$gt":{"$date":"$now"}}}],"startDate":{"$lte":{"$date":"$now"}},"flat":{"_id":"5fce374f3439f0540003bfe8"}}`, (contracts) => {
                setContractLoading(false);
                setContract(contracts?.length > 0 ? contracts[0] : null);
            });

            setOperatingCostsLoading(true);
            api<OperatingCosts[]>('GET', '/operatingcosts?q={"allocated":true}', (operatingCosts) => {
                setOperatingCostsLoading(false);
                setOperatingCosts(operatingCosts?.length > 0 ? operatingCosts : null);
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
                            <div className={`${css.dataContainer}`}>
                                <ContentCard>
                                    <FlatDetailsTable flat={flat} />
                                </ContentCard>
                                <ContentCard>
                                    <ContractDetailTable contract={contract} isLoading={isContractLoading} />
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
                    <>
                        <div className="row">
                            <div className="sixteen wide column">
                                <ContentCard>
                                    <OperatingCostsDetailTable operatingCosts={operatingCosts} flat={flat} isLoading={isOperatingCostsLoading} />
                                </ContentCard>
                            </div>
                        </div>
                        {operatingCosts && (
                            <div className="row">
                                <div className="sixteen wide column">
                                    <ContentCard>
                                        <OperatingCostsLineChart operatingCosts={operatingCosts} flat={flat} mode="monthly" />
                                    </ContentCard>
                                </div>
                            </div>
                        )}
                    </>
                </div>
            </div >
        </>
    )
}

export default FlatDetails;