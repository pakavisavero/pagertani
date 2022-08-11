import axios from 'axios';
import { Component, Fragment, useEffect, useState } from 'react';
import './Quota.css';
import QuotaCard from './QuotaCard/QuotaCard';
import React from 'react';

const Quota = () => {
	const [ quota, setQuota ] = useState([]);
	const [ product, setProduct ] = useState([]);

	useEffect(() => {
		axios
			.get(`http://127.0.0.1:8000/api/v1/quotas`)
			.then((res) => {
				setQuota([ ...res.data['data'] ]);
			})
			.catch(function(error) {
				console.log(error);
			});

		axios
			.get(`http://127.0.0.1:8000/api/v1/products`)
			.then((res) => {
				setProduct([ ...res.data['data'] ]);
			})
			.catch(function(error) {
				console.log(error);
			});
	}, []);

	return (
		<table className="table table-bordered table-light table-striped">
			<thead>
				<tr>
					<th style={{ verticalAlign: 'middle', textAlign: 'center' }} rowSpan={2}>
						RT
					</th>
					<th style={{ textAlign: 'center' }} colSpan={product.length}>
						Sayuran (Pack)
					</th>
					<th style={{ verticalAlign: 'middle', textAlign: 'center' }} rowSpan={2}>
						Action
					</th>
				</tr>
				<tr>
					{product.map((p) => {
						return (
							<Fragment>
								<th className="text-center">{p.name}</th>
							</Fragment>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{quota.map((q) => {
					return (
						<Fragment>
							<tr className="text-center">
								<td>{q.rt.name}</td>
								{q.product.map((p) => {
									return <td>{p.amount}</td>;
								})}
								<td style={{ textAlign: 'center' }}>
									<button className="btn btn-sm btn-primary">Edit</button>
								</td>
							</tr>
						</Fragment>
					);
				})}
				<tr>
					<td />
					{product.map((p) => {
						return (
							<Fragment>
								<td className="text-center">Sisa : {p.capacity} Pack</td>
							</Fragment>
						);
					})}
					<td />
				</tr>
			</tbody>
		</table>
	);
};

export default Quota;
