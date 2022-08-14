import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import CustomLabel from '../../../component/CustomLabel';
import ShowToast from '../../../component/toast/ShowToast';
import Toast from '../../../component/toast/Toast';
import styles from './QuotaDetail.module.css';

function QuotaDetail(props) {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [ quota, setQuota ] = useState([]);
	const [ product, setProduct ] = useState([]);
	const [ toast, setToast ] = useState([]);

	const getQuotaFromAPI = () => {
		axios
			.get(`http://127.0.0.1:8000/api/v1/quota/${state.rt.id}`)
			.then((res) => {
				setQuota([ ...res.data['data'] ]);
				setProduct([ ...res.data['data'] ]);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	useEffect(() => {
		getQuotaFromAPI();
	}, []);

	const handleOnChangeInput = (e) => {
		let id = parseInt(e.target.name);
		let amount = parseInt(e.target.value);
		const selected = product.filter((p) => p.id == id)[0];

		if (amount > selected.av) {
			setToast([ ShowToast('warning', `${selected.name} Out of stock!`) ]);
			document.getElementById(`product-${id}`).value = selected.amount;
		}

		if (amount < 0) {
			setToast([ ShowToast('danger', `Amount failed!`) ]);
			document.getElementById(`product-${id}`).value = selected.amount;
		}

		const newItem = product.filter((p) => p.id != id);
		setProduct([
			...newItem,
			{
				id: id,
				product_id: selected.product_id,
				name: selected.name,
				av: selected.av,
				amount: amount,
				used: selected.used
			}
		]);
	};

	const handleSubmit = () => {
		const finalProduct = product.map((p) => ({
			...p,
			av: p.av - p.amount
		}));

		axios
			.post(`http://127.0.0.1:8000/api/v1/quota`, {
				product: finalProduct
			})
			.then((res) => {
				getQuotaFromAPI();
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	return (
		<Fragment>
			<h4 className="mt-5 mb-4">Nama RT</h4>
			<input name="rt" type="text" className={`form-control mb-3`} defaultValue={state.rt.name} readOnly />

			<h4 className="mt-5 mb-4">Quota Sayuran</h4>
			<table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th>Sayuran</th>
						<th>AV</th>
						<th>Quota (Pack)</th>
						<th>Terpenuhi (Pack)</th>
						<th>Tersisa (Pack)</th>
					</tr>
				</thead>
				<tbody>
					{quota.map((q) => {
						return (
							<tr key={q.id}>
								<td>{q.name}</td>
								<td>{q.av}</td>
								<td>
									<input
										name={q.id}
										id={`product-${q.id}`}
										className="form-control"
										type="number"
										defaultValue={q.amount}
										onChange={handleOnChangeInput}
									/>
								</td>
								<td>{q.used}</td>
								<td>{q.amount - q.used}</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<div className="mt-5">
				<button className={`btn btn-secondary  ${styles.buttonBack}`} onClick={() => navigate(-1)}>
					Back
				</button>
				<button className={`btn btn-primary`} onClick={handleSubmit}>
					Update
				</button>
			</div>

			<Toast toastlist={toast} position="buttom-right" />
		</Fragment>
	);
}

export default QuotaDetail;
