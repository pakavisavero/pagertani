import axios from 'axios';
import { Component, Fragment, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProductCard from './ProductCard/ProductCard';

class Product extends Component {
	state = {
		products: []
	};

	constructor(props) {
		super(props);
		this.getProductAPI();
	}

	handleOnChangeVal = (id, num) => {
		let tempProduct = this.state.products;
		var data = this.state.products.filter((e, i) => {
			if (e.id == id) {
				if (num > 0) {
					tempProduct[i].cart = parseInt(num);
					this.setState({
						products: tempProduct
					});
				}
			}
		});
	};

	getProductAPI = () => {
		let tempProduct = [];
		axios
			.get('http://127.0.0.1:8000/api/v1/products')
			.then((res) => {
				res.data['data'].map((e) => {
					e['cart'] = 1;
					tempProduct.push(e);
				});
				this.setState({
					products: tempProduct
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	render() {
		return (
			<ProductCard
				products={(this, this.state.products)}
				onChangeInput={(id, num) => this.handleOnChangeVal(id, num)}
			/>
		);
	}
}

export default Product;
