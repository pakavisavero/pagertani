import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function QuotaCard(props) {
	return (
		<Fragment>
			<table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th>RT</th>
						{/* <th>Quota</th> */}
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map((d) => {
						return (
							<tr key={d.id}>
								<td>{d.rt}</td>
								{/* <td>{d.amount}</td> */}
								<td>
									<Link to={`/quota/${d.rt_id}`} state={d}>
										<button className="btn btn-primary btn-sm">Edit</button>
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</Fragment>
	);
}

export default QuotaCard;
