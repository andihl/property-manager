import React, { ReactElement } from 'react';
import { Line } from 'react-chartjs-2';
import { useStore } from '../../store/store';
import Flat from '../../types/Flat';
import OperatingCosts, { calculateTotalOperatingCosts } from '../../types/OperatingCosts';

const OperatingCostsLineChart = (props: Props): ReactElement => {
    const { store } = useStore();

    let labels: string[] = [];
    let data: number[] = []

    const calculatePercentual = (value: number): number => value * (props.flat.size / store.totalSize);

    props.operatingCosts.map(oc => {
        labels.push(oc.year.toString());
        data.push(Math.floor(calculatePercentual(calculateTotalOperatingCosts(oc, props.mode))));
    });

    labels = labels.reverse();
    data = data.reverse();

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Verlauf der Betriebkosten',
                data: data,
                fill: false,
                backgroundColor: 'rgba(64,224,208,0.6)',
                borderColor: 'rgba(64,224,208,0.6)',
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return <Line data={chartData} options={options} />
}

interface Props {
    operatingCosts: OperatingCosts[],
    flat: Flat,
    mode: 'yearly' | 'monthly'
}

export default OperatingCostsLineChart
