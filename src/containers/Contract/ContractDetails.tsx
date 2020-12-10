import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import ContentCard from '../../components/Card/ContentCard'
import Currency from '../../components/Currency/Currency'
import PageHeader from '../../components/PageHeader/PageHeader'
import { Spinner } from '../../components/Spinner/Spinner'
import { useApi } from '../../shared/api'
import Contract from '../../types/Contract'
import OperatingCosts from '../../types/OperatingCosts'
import ContractDetailTable from './ContractDetailTable'
import FlatDetailsTable from '../Flat/FlatDetailsTable'
import OperatingCostsDetailTable from '../OperatingCosts/OperatingCostsDetailTable'

const ContractDetails = (): ReactElement => {
    const params = useParams<{ id: string }>();
    const { obj: contract, loading } = useApi<Contract>('GET', `/contract/${params.id}`);
    const { obj: operatingCosts } = useApi<OperatingCosts[]>('GET', '/operatingcosts');


    if (loading || !contract) return <Spinner />

    const getCurrentFee = () => {
        const currentYear = new Date().getFullYear();
        let fee: number = contract.fee;

        contract.feesteps?.map(step => {
            if (step.year <= currentYear) {
                fee += step.amount;
            }
        });

        contract.advancedpaymentofoperatingcosts?.map(oc => {
            if (oc.year === currentYear) {
                fee += oc.amount;
            }
        })

        return fee;
    }

    return (
        <>
            <PageHeader headline="Vertragsdetails" />

            <div className="ui grid">
                <div className="row">
                    <div className="sixteen wide column">
                        <ContentCard>
                            <h3>Aktuelle Monatsmiete: <Currency value={getCurrentFee()} /></h3>
                        </ContentCard>
                    </div>
                </div>
                <div className="row">
                    <div className="eight wide column">
                        <ContentCard>
                            <ContractDetailTable contract={contract} />
                        </ContentCard>
                    </div>
                    <div className="eight wide column">
                        <ContentCard>
                            <FlatDetailsTable flat={contract.flat[0]} />
                        </ContentCard>
                    </div>
                </div>
                <div className="row">
                    <div className="eight wide column">
                        <ContentCard>
                            <table className="ui very basic celled table">
                                <thead>
                                    <tr>
                                        <th colSpan={2}><h3>Mietstaffeln</h3></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contract.feesteps ?
                                        contract.feesteps.map((step, index) => (
                                            <tr key={index}>
                                                <td>{step.year}</td>
                                                <td><Currency value={step.amount} /></td>
                                            </tr>
                                        ))
                                        :
                                        (
                                            <tr>
                                                <td colSpan={2}>
                                                    <i>Keine Staffeln vorhanden</i>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </ContentCard>
                    </div>
                    <div className="eight wide column">
                        <ContentCard>
                            <table className="ui very basic celled table">
                                <thead>
                                    <tr>
                                        <th colSpan={2}><h3>Beriebskostenvorauszahlungen</h3></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contract.advancedpaymentofoperatingcosts ?
                                        contract.advancedpaymentofoperatingcosts.map((step, index) => (
                                            <tr key={index}>
                                                <td>{step.year}</td>
                                                <td><Currency value={step.amount} /></td>
                                            </tr>
                                        ))
                                        :
                                        (
                                            <tr>
                                                <td colSpan={2}>
                                                    <i>Keine Vorauszahlungen vorhanden</i>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </ContentCard>
                    </div>
                </div>
                <div className="row">
                    <div className="sixteen wide column">
                        <ContentCard>
                            <>
                                {operatingCosts && <OperatingCostsDetailTable operatingCosts={operatingCosts} flat={contract.flat[0]} />}
                            </>
                        </ContentCard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContractDetails;