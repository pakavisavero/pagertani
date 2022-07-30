import axios from "axios";
import { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Product.module.css";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        this.getProductAPI();
    }
    
    getProductAPI = () => {
        let tempProduct = []
        axios.get("http://127.0.0.1:8000/api/v1/products").then((res) => {
            res.data["data"].map((e) => {
                e["cart"] = 1;
                tempProduct.push(e);
            });
            this.setState({
                products: tempProduct
            })
            
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleOnChangeVal = (id, num) => {
        let tempProduct = this.state.products;
        var data = this.state.products.filter((e, i) => {
            if (e.id == id) {
                if (num > 0) {
                    tempProduct[i].cart = num;
                    this.setState({
                        products: tempProduct
                    })
                }
            }
        });
    }

    render() {
        return (
            <Fragment>
                {this.props.success ?
                    (<div className="row">
                        <div class="alert alert-success  mt-5" role="alert">
                            This is a success alert—check it out!
                        </div>
                    </div>) : (<div></div>)
                
                }
                <div className="row">
                {
                    this.state.products.map((p) => {
                        return (
                            <div className={`card col-lg-3 ${styles.product}`} key={p.id}>
                                <div className="card-body">
                                    <img className={styles.product__image} src={p.image} alt="" />
                                    <hr />
                                    <p className={styles.product__price}>Harga : Rp. {p.price},00-</p>
                                    <hr />
                                    <p className={styles.product__cap}>Capacity : {p.capacity}{p.type}</p>
                                    <hr />
                                    <p className={styles.product__title}>{p.name}</p>
                                    <p className={styles.product__desc}>{p.desc.substring(0, 100)+"..."}</p>
                                </div>
                                
                                <div className={`input-group mb-3 ${styles.productCart}`}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" onClick={() => this.handleOnChangeVal(p.id, p.cart-1)}>-</span>
                                    </div>
                                    <input type="number" min={1} defaultValue={p.cart} value={p.cart} className="form-control" aria-label="Amount (to the nearest dollar)" />
                                    <div className="input-group-append">
                                        <span className="input-group-text" onClick={() => this.handleOnChangeVal(p.id, p.cart+1)}>+</span>
                                    </div>
                                </div>

                                <button style={{ width: '100%' }} className="btn btn-warning mb-2">Add To Cart</button>
                                <Link to={`/product/${p.id}`} state={ p }>
                                    <button style={{ width: '100%' }} className="btn btn-primary">Detail</button>
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