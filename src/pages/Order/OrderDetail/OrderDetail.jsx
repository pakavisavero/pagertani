import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './Order.module.css';

const OrderDetail = (props) => {
	const [ order, setOrder ] = useState([]);
	const { state } = useLocation();

	const getOder = () => {
		axios
			.get(`http://127.0.0.1:8000/api/v1/order/${state.id}`)
			.then((res) => {
				setOrder([ ...res.data['data'][0]['detail'] ]);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	const getStatusBadge = (id) => {
		if (id == 1) {
			return 'success';
		} else if (id == 2) {
			return 'warning';
		} else {
			return 'secondary';
		}
	};

	useEffect(() => {
		getOder();
	}, []);

	return (
		<Fragment>
			<table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th>Gambar</th>
						<th>Jumlah</th>
						<th>Harga</th>
						<th>Produk</th>
						<th>Note</th>
						<th>Total Harga</th>
					</tr>
				</thead>
				<tbody>
					{order.map((od) => {
						return (
							<Fragment>
								<tr key={od.id}>
									<td>
										<img className={styles.product__image} src={`/images/${od.image}`} />
									</td>
									<td>{od.amount}</td>
									<td>{od.total_price}</td>
									<td>{od.product}</td>
									<td>
										<span class={`badge text-white bg-${getStatusBadge(od.priority_id)}`}>
											{od.priority}
										</span>
									</td>
									<td>Rp. {od.total_price * od.amount}</td>
								</tr>
							</Fragment>
						);
					})}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={5}>
							<h3>Total Harga</h3>
						</td>
						<td colSpan={1}>Rp. 100.000</td>
					</tr>
				</tfoot>
			</table>
		</Fragment>
	);
};

export default OrderDetail;
