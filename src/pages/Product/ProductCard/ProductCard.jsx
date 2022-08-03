import { Fragment, useContext, useEffect, useState } from 'react';
import styles from './ProductCart.module.css';
import { CartValue } from '../../../state/CartState';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductCard(props) {
    const { cart, setCart } = useContext(CartValue);
    const { products } = props;

    const onChangeVal = (id, num) => (event) => {
        if (!num) {
            num = event.target.value;
        }
        
        props.onChangeInput(id, num);
    }

    const getCart = () => {
        axios.get("http://127.0.0.1:8000/api/v1/carts").then((res) => {
            console.log(res.data["data"]);
            setCart([...res.data["data"]]);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const postCart = (id, val) => {
        axios.post("http://127.0.0.1:8000/api/v1/cart", {
            id: id,
            value: val,

        }).then((res) => {
            getCart();
        
        }).catch(function (error) {
            console.log(error);
        })
    }


    const onAddCart = (id, val) => {
        console.log(cart);
        let status = false;
        if (cart.length != 0) {
            cart.filter((c, i) => {
                let tempCart = cart;
                if (c.id == id) {
                    postCart(id, val);
                    status = true;
                }
            })
            
            if (status == false) {
                postCart(id, 1);
            }
        } else {
            postCart(id, 1);
        }

    }
    

    return (
        <Fragment>
            <div className="row">
            {
                products.map((p) => {
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
                                    <span className="input-group-text" onClick={onChangeVal(p.id, p.cart-1)}>-</span>
                                </div>
                                <input type="number" min={1} value={p.cart} className="form-control" onChange={onChangeVal(
                                    p.id
                                )} />
                                <div className="input-group-append">
                                    <span className="input-group-text" onClick={onChangeVal(p.id, p.cart+1)}>+</span>
                                </div>
                            </div>

                            <button style={{ width: '100%' }} className="btn btn-warning mb-2" onClick={() => onAddCart(p.id, p.cart)}>Add To Cart</button>

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

export default ProductCard;