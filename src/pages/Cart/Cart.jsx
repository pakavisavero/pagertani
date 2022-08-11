import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "../../component/toast/Toast";
import { CartValue } from "../../state/CartState";
import styles from './Cart.module.css';
import ShowToast from "../../component/toast/ShowToast";
const { Component, Fragment, useContext, useState, useEffect } = require("react");

function Cart(props) {
    const {cart, setCart } = useContext(CartValue);
    const [toast, setToast] = useState([]);
    const [check, setCheck] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [note, setNote] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (check.length > 0 && note != "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

        console.log(check);
    }, [check, note, disabled]);

    const getCart = () => {
        axios.get("http://127.0.0.1:8000/api/v1/carts").then((res) => {
            setCart([...res.data["data"]]);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const deleteCart = (c) => {
        axios.post("http://127.0.0.1:8000/api/v1/delete-cart", {
            id: c.id

        }).then((res) => {
            setToast([ShowToast('success', "Delete data succeed!")]);
            setTotalPrice(prev => prev - (c.price * c.amount));
            getCart();

        }).catch(function (error) {
            console.log(error);
        })
    }

    const checkCart = (c) => { 
        const value = check.filter((x) => x.id == c.id);

        if (value.length > 0) {
            const value = check.filter((x) => x.id != c.id);
            setTotalPrice(prev => prev - (c.price * c.amount));
            setCheck(prevs => [...value]);

        } else {
            setTotalPrice(prev => prev + (c.price * c.amount));
            setCheck(prevs => [...prevs, {
                "id": c.id,
                "total_price": c.price * c.amount
            }]);
        }
    }

    const checkout = () => { 
        axios.post("http://127.0.0.1:8000/api/v1/checkout", {
            id: check,
            note: note,

        }).then((res) => {
            setToast([ShowToast('success', "Checkout succeed!")]);
            setCheck([]);
            setNote([]);
            getCart();

        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <Fragment>
            {cart.length > 0 ? (
                <div>
                    <table className="table table-responsive-sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((c) => {
                                    return (
                                        <tr key={c.id}>
                                            <td>
                                                <div className="form-check">
                                                    <input style={{ "width": "20px", "height": "20px" }} className="form-check-input" type="checkbox" onChange={() => checkCart(c)} />
                                                </div>
                                            </td>
                                            <td>
                                                <img style={{"width": "60px", "height": "60px"}} src={`/images/${c.image}`} alt="" />
                                            </td>
                                            <td>{c.name}</td>
                                            <td>Rp. {c.price}</td>
                                            <td>{c.amount}{c.type}</td>
                                            <td>Rp. {c.price * c.amount}</td>
                                            <td>
                                                <button onClick={() => deleteCart(c)} className="btn btn-secondary btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                        
                    {
                        check.length > 0 && (
                            <>
                                <div>
                                    <hr style={{ height: "1px", background: "gray" }} />
                                    <h4>Total Price : Rp. {totalPrice}</h4>
                                </div>
                                <div>
                                    <label style={{"width": "100%"}} className="mt-5 mb-2">Notes :</label>
                                    <textarea className="form-control" name="note" id="note" cols="30" rows="5" onChange={(e) => setNote(e.target.value)}></textarea>
                                </div>
                                <button className="btn btn-primary mt-4" disabled={disabled} onClick={() => checkout()}>Checkout</button>
                            </>
                        ) 
                    }

                </div>
            ) : (
                <h1>No data in Cart</h1>
                )}
            <Toast toastlist={toast} position="buttom-right" />
        </Fragment>
    )
}


export default Cart;