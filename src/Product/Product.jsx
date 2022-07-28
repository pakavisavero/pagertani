import axios from "axios";
import { Component, Fragment } from "react";
import "./Product.css";

class Product extends Component {
    state = {
        products: []
    }

    getProductAPI = () => {
        axios.get("http://127.0.0.1:8000/api/v1/products").then((res) => {
            this.setState({
                products: res.data["data"]
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    componentDidMount() {
        this.getProductAPI();
    }

    render() {
        return (
            <Fragment>
                <h1>Products</h1>
                {
                    this.state.products.map((p) => {
                        return (
                            <div className="product" key={p.id}>
                                <img className="product__image" src={p.image} alt="" />
                                <p className="product__title">{p.name}</p>
                                <p className="product__desc">{p.desc}</p>
                                <p className="product__price">Rp. {p.price},00-</p>
                                <p className="product__cap">{p.capacity}{p.type}</p>
                                <hr />
                            </div>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default Product;