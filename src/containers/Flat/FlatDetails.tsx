import React, { ReactElement } from 'react'
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Spinner } from '../../components/Spinner/Spinner';
import { useApi } from '../../shared/api';
import { useStore } from '../../store/store';
import Flat from '../../types/Flat';
import css from './FlatDetails.module.scss';

const FlatDetails = (): ReactElement => {
    const params = useParams<{ id: string }>();
    const { obj: flat, loading } = useApi<Flat>('GET', `/flat/${params.id}`);
    const { store } = useStore();

    if (loading || !flat) return <Spinner />

    return (
        <>
            <PageHeader headline={`Wohnung ${flat.name}`} />

            <div className={`${css.infoSection}`}>
                <div className="ui grid">
                    <div className="four wide column">
                        <div className={`ui card ${css.card}`}>
                            <div className="content">
                                <table className="ui very basic celled table">
                                    <thead>
                                        <tr>
                                            <th colSpan={2}><h3>Details</h3></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h4 className="ui header">Name</h4>
                                            </td>
                                            <td>{flat.name}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4 className="ui header">Größe</h4>
                                            </td>
                                            <td>{flat.size}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4 className="ui header">Größe</h4>
                                            </td>
                                            <td>{flat.size}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4 className="ui header">Anteilig</h4>
                                            </td>
                                            <td>{`${(flat.size / store.totalSize * 100).toFixed(2)}%`}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="twelve wide column">
                        <div className={`ui card ${css.card}`}>
                            <div className="content">
                                {flat.layouts.map((layout, index) => (
                                    <Link to={`https://www.roomle.com/app/editor/${layout}`} target="_blank" key={index}>
                                        <img src={`https://uploads.roomle.com/plans/${layout}/thumbnail.png`} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlatDetails;