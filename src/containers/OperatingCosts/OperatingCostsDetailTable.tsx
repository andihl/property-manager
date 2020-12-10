import React, { ReactElement } from 'react'
import Currency from '../../components/Currency/Currency';
import { useStore } from '../../store/store';
import Flat from '../../types/Flat';
import OperatingCosts, { calculateTotalOperatingCosts } from '../../types/OperatingCosts';

const OperatingCostsDetailTable = (props: Props): ReactElement => {
    const { store } = useStore();

    const calculatePercentual = (value: number): number => value * (props.flat.size / store.totalSize);

    return (
        <>
            <h3>Anteilige Betriebskosten</h3>
            <table className="ui single line table">
                <thead>
                    <tr>
                        <th>Jahr</th>
                        <th>Wasser</th>
                        <th>Strom</th>
                        <th>Schornsteinfeger</th>
                        <th>Versicherung</th>
                        <th>Gehälter</th>
                        <th>Müllabfuhr</th>
                        <th>Garten</th>
                        <th>Steuern</th>
                        <th>Gesamt (jährl.)</th>
                        <th>Gesamt (monatl.)</th>
                    </tr>
                </thead>
                <tbody>
                    {props.operatingCosts.map(operatingCost => (
                        <tr key={operatingCost._id}>
                            <td><strong>{operatingCost.year}</strong></td>
                            <td><Currency value={calculatePercentual(operatingCost.water)} /></td>
                            <td><Currency value={calculatePercentual(operatingCost.electricity)} /></td>
                            <td><Currency value={calculatePercentual(operatingCost.chimneysweep)} /></td>
                            <td><Currency value={calculatePercentual(operatingCost.insurance)} /></td>
                            <td><Currency value={calculatePercentual(operatingCost.salary)} /></td>
                            <td><Currency value={calculatePercentual(operatingCost.garbagedisposal)} /></td>
                            <td><Currency value={calculatePercentual(operatingCost.garden)} /></td>
                            <td><Currency value={calculatePercentual(operatingCost.tax)} /></td>
                            <td>
                                <strong><Currency value={calculatePercentual(calculateTotalOperatingCosts(operatingCost))} /></strong>
                            </td>
                            <td>
                                <strong>
                                    <Currency value={calculatePercentual(calculateTotalOperatingCosts(operatingCost)) / 12} />
                                </strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

interface Props {
    operatingCosts: OperatingCosts[],
    flat: Flat
}

export default OperatingCostsDetailTable;