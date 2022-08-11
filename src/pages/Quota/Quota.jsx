import axios from 'axios';
import { Component, Fragment, useEffect, useState } from 'react';
import './Quota.css';
import QuotaCard from './QuotaCard/QuotaCard';
import React from 'react';
import { Link } from 'react-router-dom';

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
		<table className="table table-light">
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
							<th key={p.id} className="text-center">
								{p.name}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{quota.map((q) => {
					return (
						<tr key={q.rt.id} className="text-center">
							<td>{q.rt.name}</td>
							{q.product.map((p) => {
								return <td>{p.amount}</td>;
							})}
							<td style={{ textAlign: 'center' }}>
								<Link to={`/quota/${q.rt.id}`} state={q}>
									<button className="btn btn-primary btn-sm">Detail</button>
								</Link>
							</td>
						</tr>
					);
				})}
				<tr>
					<td />
					{product.map((p) => {
						return (
							<td key={p.id} className="text-center">
								CAP/AV : {p.capacity}/{p.capacity}
							</td>
						);
					})}
					<td />
				</tr>
			</tbody>
		</table>
	);
};

export default Quota;
