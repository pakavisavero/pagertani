import axios from "axios";
import { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
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
                {/* <h1 className="my-4">Products</h1> */}
                <div className="row mt-5">
                {
                    this.state.products.map((p) => {
                        return (
                            <div className="card col-lg-3 product" key={p.id}>
                                <div className="card-body">
                                    <img className="product__image mb-4" src={p.image} alt="" />
                                    <hr />
                                    <p className="product__price">Harga : Rp. {p.price},00-</p>
                                    <hr />
                                    <p className="product__cap">Capacity : {p.capacity}{p.type}</p>
                                    <hr />
                                    <p className="product__title">{p.name}</p>
                                    <p className="product__desc">{p.desc}</p>
                                </div>
                                
                                <Link to={`/product/${p.id}`} state={ p }>
                                    <button style={{width: '100%'}} className="btn btn-primary">Detail</button>
                                </Link>
                            </div>
                        )
                    })
                }
                </div>
            </Fragment>
        )
    }
}

export default Product;