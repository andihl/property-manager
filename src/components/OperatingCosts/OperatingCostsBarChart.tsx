import React, { ReactElement } from 'react'
import OperatingCosts from '../../types/OperatingCosts';
import { Bar } from 'react-chartjs-2';

const OperatingCostsBarChart = (props: Props): ReactElement => {

    const config: { [key: string]: { label: string, color: string } } = {
        'water': { label: 'Wasser', color: 'rgba(0,0,255,0.6)' },
        'electricity': { label: 'Strom', color: 'rgba(255,255,0,0.6)' },
        'chimneysweep': { label: 'Schornsteinfeger', color: 'rgba(160,160,160,0.6)' },
        'insurance': { label: 'Versicherung', color: 'rgba(153,51,255,0.6)' },
        'salary': { label: 'Gehälter', color: 'rgba(255,102,102,0.6)' },
        'garden': { label: 'Garten', color: 'rgba(0,204,102,0.6)' },
        'tax': { label: 'Steuern', color: 'rgba(255,102,255,0.6)' },
        'garbagedisposal': { label: 'Müllabfuhr', color: 'rgba(255,150,0,0.6)' }
    };
    const types: string[] = Object.keys(props.operatingCosts[0]).filter(type => !['_id', 'year', 'allocated'].includes(type));
    const data: { [key: string]: number[] } = types.reduce((acc, type) => ({ ...acc, [type]: [] }), {});

    props.operatingCosts.map(oc => {
        data['water'].push(oc.water);
        data['electricity'].push(oc.electricity);
        data['chimneysweep'].push(oc.chimneysweep);
        data['insurance'].push(oc.insurance);
        data['salary'].push(oc.salary);
        data['garden'].push(oc.garden);
        data['tax'].push(oc.tax);
        data['garbagedisposal'].push(oc.garbagedisposal);
    });

    const datasets: { label: string, data: number[], backgroundColor: string }[] = [];
    types.map(type => {
        datasets.push({
            label: config[type]['label'],
            data: data[type],
            backgroundColor: config[type]['color']
        })
    })


    const chartData = {
        labels: props.operatingCosts.map(oc => oc.year),
        datasets: datasets
    }

    const options = {
        scales: {
            yAxes: [
                {
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    }

    return <Bar data={chartData} options={options} />
}

interface Props {
    operatingCosts: OperatingCosts[]
}

export default OperatingCostsBarChart;
