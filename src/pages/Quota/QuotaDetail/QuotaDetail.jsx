import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import CustomLabel from '../../../component/CustomLabel';
import styles from './QuotaDetail.module.css';

function QuotaDetail(props) {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [ quota, setQuota ] = useState([]);

	useEffect(
		() => {
			axios
				.get(`http://127.0.0.1:8000/api/v1/quota/${state.id}`)
				.then((res) => {
					setQuota([ ...res.data['data'] ]);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		[ quota ]
	);

	return (
		<Fragment>
			<CustomLabel name="Nama RT" />
			<input name="rt" type="text" className={`form-control mb-3`} defaultValue={state.rt} disabled />

			<h4 className="mt-5 mb-4">Quota Sayuran</h4>
			<table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th>Sayuran</th>
						<th>Quota</th>
						<th>Quota Tersisa</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{quota.map((q) => {
						return (
							<Fragment>
								<tr>
									<td>{q.product.name}</td>
									<td>
										<input className="form-control" type="number" value={q.product.amount} />
									</td>
									<td>{q.product.sisa} Pack</td>
									<td>
										<button className="btn btn-sm btn-primary">Update</button>
									</td>
								</tr>
							</Fragment>
						);
					})}
				</tbody>
			</table>

			{/* <button className={`btn btn-secondary  ${styles.buttonBack}`} onClick={() => navigate(-1)}>
				Back
			</button> */}
			{/* <button className={`btn btn-primary`} onClick={handleOnUpdate}>Update</button> */}
		</Fragment>
	);
}

export default QuotaDetail;
