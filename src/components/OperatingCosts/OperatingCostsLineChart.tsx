import React, { ReactElement } from 'react';
import { Line } from 'react-chartjs-2';
import OperatingCosts, { calculateTotalOperatingCosts } from '../../types/OperatingCosts';

const OperatingCostsLineChart = (props: Props): ReactElement => {

    let labels: string[] = [];
    let data: number[] = []
    props.operatingCosts.reverse().map(oc => {
        labels.push(oc.year.toString());
        data.push(calculateTotalOperatingCosts(oc))
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
    operatingCosts: OperatingCosts[]
}

export default OperatingCostsLineChart
